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
        const chargeResponse = await userStore.charge(selectedCurrency, amount);
        if (chargeResponse.error) {
            setAmount(0);
            setFormError(chargeResponse.error);
            return false;
        }
        const dollars = currenciesStore.convertToDollars(selectedCurrency, amount);
        let applyResponse = {};
        if (dollars) {
            applyResponse = await sessionStore.apply(dollars);
        }
        if (applyResponse.error) {
            setAmount(0);
            setFormError(e.message);
            // Rolling back user's charge
            await userStore.charge(selectedCurrency, -amount);
            return false;
        }
        setAmount(0);
    }

    async function getChangeBack(e: SyntheticEvent) {
        e.preventDefault();
        const dollars = sessionStore.session.funds;
        let applyResponse = {};
        if (dollars) {
            applyResponse = await sessionStore.apply(-dollars);
        }
        if (applyResponse.error) {
            setFormError(e.message);
            return false;
        }
        const chargeResponse = await userStore.charge('USD', -dollars);
        if (chargeResponse.error) {
            setFormError(chargeResponse.error);
            // Rolling back session
            await sessionStore.apply(dollars);
            return false;
        }
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
                        <Form.Text>Deposit: {sessionStore.session.funds.toFixed(2)} $</Form.Text>
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
                <Button style={ {marginLeft: 10} } disabled={!sessionStore.session.funds} variant="secondary" onClick={getChangeBack}>
                    Get my money back
                </Button>
            </Form>
        )
    }
    );
}
