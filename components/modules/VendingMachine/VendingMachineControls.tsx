import {useContext} from 'react';
import {useObserver} from 'mobx-react-lite';
import {SessionContext} from '../../../stores/session';
import VendingMachineControlsForm from './VendingMachineControlsForm';
import {Button} from 'react-bootstrap';

export default function VendingMachine() {
    const sessionStore = useContext(SessionContext);

    return useObserver(() => {
        return (
            <div className="VendingMachineControls">
                {!sessionStore.session && (
                    <Button onClick={()=>sessionStore.createSession()}>Make A Deposit</Button>
                )}
                {sessionStore.session && (
                    <VendingMachineControlsForm />
                )}
            </div>
        )
    }
    );
}
