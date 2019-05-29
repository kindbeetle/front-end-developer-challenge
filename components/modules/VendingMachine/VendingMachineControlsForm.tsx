import {useContext, ReactNode, SyntheticEvent, useState} from 'react';
import {useObserver} from 'mobx-react-lite';
import {AppStoreContext} from '../../../stores/app';
import {SessionContext} from '../../../stores/session';
import {Alert, Button, Form, Spinner} from 'react-bootstrap';

const DEFAULT_SELECT_OPTION = 'Select available currency...';

export default function VendingMachineControlsForm() {
    const {stores: {userStore, currenciesStore}} = useContext(AppStoreContext);
    const sessionStore = useContext(SessionContext);

    const [selectedCurrency, setSelectedCurrecny] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [amountError, setAmountError] = useState<string>('Enter value greater than 0');
    const [formError, setFormError] = useState<string>('');

    function onSelectChange (e: SyntheticEvent) {
        const target = e.target as HTMLSelectElement;
        setSelectedCurrecny(target.value);
    }

    function onAmountChange (e: SyntheticEvent)  {
        const target = e.target as HTMLInputElement;
        if (parseInt(target.value ,10) < 0) {
            return setAmountError('Enter value greater than 0');
        }
        if (selectedCurrency) {
            if (userStore.user && userStore.user.funds[selectedCurrency] < parseInt(target.value ,10)) {
                setAmount(0);
                setAmountError('You do not have enough money. Check your account please.');
            } else {
                setAmountError('');
                setAmount(parseInt(target.value ,10));
            }
        }
    }

    async function submitForm(e: SyntheticEvent) {
        e.preventDefault();
        try {
            await userStore.charge(selectedCurrency, amount);
        } catch(e) {
            setAmount(0);
            setFormError(e.message);
        }
        try {
            const dollars = currenciesStore.convertToDollars(selectedCurrency, amount);
            if (dollars) {
                await sessionStore.apply(dollars);
            }
        } catch (e) {
            setAmount(0);
            setFormError(e.message);
            // Rolling back user's charge
            await userStore.charge(selectedCurrency, -amount);
        }
        setAmount(0);
    }

    return useObserver(() => {
        if (userStore.isLoading) {
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            );
        }

        if (formError) {
            return (
                <div className="VendingMachineControlsFormError">
                    <Alert variant="danger">
                        {formError}
                    </Alert>
                    <Button variant="primary" onClick={() => setFormError('')}>
                        Try again
                    </Button>
                </div>
            )
        }
        return (
            <Form className="VendingMachineControlsForm" onSubmit={submitForm}>
                {sessionStore && sessionStore.session && !sessionStore.isLoading && (
                    <Form.Group controlId="deposit">
                        <Form.Text>Deposit: {sessionStore.session.funds}</Form.Text>
                    </Form.Group>
                )}

                {sessionStore.isLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}

                <Form.Group controlId="selectCurrency">
                    <Form.Label>Currency</Form.Label>
                    <Form.Control as="select" onChange={onSelectChange}>
                        <option>{DEFAULT_SELECT_OPTION}</option>
                        {userStore && userStore.user && Object.keys(userStore.user.funds).map((currencyName: string, i: number): ReactNode => (
                            <option key={i}>{currencyName}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {selectedCurrency && selectedCurrency !== DEFAULT_SELECT_OPTION && (
                    <Form.Group controlId="inputAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" onChange={onAmountChange} placeholder="Enter how much you want to deposit" />
                        {amountError && (
                            <Form.Text className="text-muted">{amountError}</Form.Text>
                        )}
                    </Form.Group>
                )}

                <Button disabled={!amount} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
    );
}
