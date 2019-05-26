import {useContext} from 'react';
import {useObserver} from 'mobx-react-lite';

export default function HomeGreeting() {
    return useObserver(() =>
        (
            <div className="VendingMachime">

            </div>
        )
    );
}
