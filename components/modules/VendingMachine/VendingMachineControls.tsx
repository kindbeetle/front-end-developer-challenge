import {useContext} from 'react';
import {useObserver} from 'mobx-react-lite';
import {AppStoreContext} from '../../../stores/app';
import {SessionContext} from '../../../stores/session';
import {Button, Spinner} from 'react-bootstrap';

export default function VendingMachine() {
    const {stores: {userStore}} = useContext(AppStoreContext);
    const sessionStore = useContext(SessionContext);

    return useObserver(() => {
        if (sessionStore.isLoading) {
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }

        return (
            <div className="VendingMachineControls">
                {!sessionStore.session && (
                    <Button onClick={()=>sessionStore.createSession()}>Make A Deposit</Button>
                )}
                {sessionStore.session && (
                    <div>Deposit form</div>
                )}
            </div>
        )
    }
    );
}
