import * as React from 'react';
import Head from 'next/head';
import Header from '../ui/Header';

type PropsType = {
    title: string,
    children?: React.ReactNode
};

export default ((props: PropsType): any => (
    <div>
        <Head>
            <title>{props.title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <Header title="Vending Machine"/>
        <div className="content">
            {props.children}
        </div>
    </div>
));
