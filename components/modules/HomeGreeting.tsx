import {useContext} from 'react';
import {useObserver} from 'mobx-react-lite';
import {ArticleStoreContext} from '../../stores/article';
import Greeting from '../ui/Greeting';

export default function HomeGreeting() {
    const articleStore = useContext(ArticleStoreContext);

    return useObserver(() =>
        (
            <div className="HomeGreeting">
                {articleStore.article &&
                    (
                        <Greeting {...articleStore.article}
                                  link={{id: "vm", title: "Vending Machine", href: "/vending-machine"}}/>
                    )
                }
            </div>
        )
    );
}
