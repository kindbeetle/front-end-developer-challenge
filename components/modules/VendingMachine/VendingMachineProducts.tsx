import React, {useContext, useState} from 'react';
import {useObserver} from 'mobx-react-lite';
import {ProductsContext} from '../../../stores/products';
import {Modal, CardColumns, Card, Button, Spinner} from 'react-bootstrap';
import {SessionContext} from '../../../stores/session';

export default function VendingMachine() {
    const productsStore = useContext(ProductsContext);
    const sessionStore = useContext(SessionContext);

    const [currentProductId, setCurrentProductId] = useState<string>('');
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogMessage, setDialogMessage] = useState<string>('');

    async function buyProduct(id: string, price: number, title: string) {
        setCurrentProductId(id);
        const buyResponse = await productsStore.buy(id);
        if (buyResponse.error) {
            setDialogMessage('Server error: cannot buy product. Please try again.');
            setShowDialog(true);
            return false;
        }
        const chargeResponse = await sessionStore.charge(price);
        if (chargeResponse.error) {
            setDialogMessage('Server error: cannot save session. Please try again.');
            setShowDialog(true);
            return false;
        }
        setDialogMessage(`You bought ${title}!`);
        setShowDialog(true);
    }

    return useObserver(() =>
        (
            <React.Fragment>
                <CardColumns>
                    {productsStore &&
                     productsStore.products &&
                     productsStore.products.map(({id, picture, title, quantity, price}: IProduct)=> (
                        <Card key={id}>
                            <Card.Img variant="top" src={picture} />
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>{`Items: ${quantity}`}</Card.Text>
                                <Card.Text>{`Price: ${price}$`}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                {!(currentProductId === id && productsStore.isLoading) && (
                                    <Button onClick={() => buyProduct(id, price, title)}
                                            disabled={!sessionStore.session || sessionStore.session.funds < price || sessionStore.isLoading}>
                                        {`Buy "${title}"`}
                                    </Button>
                                )}
                                {currentProductId === id && productsStore.isLoading && (
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                )}
                            </Card.Footer>
                        </Card>
                    ))}
                </CardColumns>
                <Modal show={showDialog} onHide={() => setShowDialog(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Vending Machine Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{dialogMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDialog(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    );
}
