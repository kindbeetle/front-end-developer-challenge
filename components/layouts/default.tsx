import {ReactNode, useContext} from 'react';
import Head from 'next/head';
import Header from '../modules/Header';
import {useObserver} from 'mobx-react-lite';
import {Spinner, Alert, Button} from 'react-bootstrap';
import {AppStoreContext} from '../../stores/app';

type IDefaultLayoutProps = {
    title: string,
    children?: ReactNode
};

export default function DefaultLayout(props: IDefaultLayoutProps) {
    const {stores: {globalState: {isLoading, error}}} = useContext(AppStoreContext);

    return (
        <div>
            <Head>
                <title>{props.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Header title="Vending Machine"/>
            {
                useObserver(() => {
                    if (isLoading) {
                        return (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        )
                    }
                    if (error) {
                        return (
                            <div className="error-container">
                                <Alert variant="danger">
                                    {`Following error has been occurred: "${error}"`}
                                </Alert>
                                <Button onClick={() => window.location.reload()}>REFRESH PAGE</Button>
                            </div>
                        )
                    }
                    return (
                        <div className="content">
                            {props.children}
                        </div>
                    )
                })
            }
            <style jsx>
                {`
                   .error-container {
                       padding: 2rem;
                       display: flex;
                       flex-direction: column;
                       justify-content: center;
                   } 
                `}
            </style>
        </div>
    );
};
