import {useContext, useState} from 'react';
import {useObserver} from 'mobx-react-lite';
import {ProductsContext} from '../../../stores/products';
import {Modal, CardColumns, Card, Button, Spinner} from 'react-bootstrap';
import {SessionContext} from '../../../stores/session';

export default function VendingMachine() {
    const productsStore = useContext(ProductsContext);
    const sessionStore = useContext(SessionContext);

    const [currentProductId, setCurrentProductId] = useState<string>('');
    const [showDialog, setShowDialog] = useState<boolean>(false);
    let dialogMessage = '';

    async function buyProduct(id: string, price: number, title: string) {
        setCurrentProductId(id);
        try {
            await productsStore.buy(id);
        } catch(e) {
            setShowDialog(true);
            dialogMessage = 'Server error: cannot buy product';
        }
        try {
            await sessionStore.charge(price);
        } catch (e) {
            setShowDialog(true);
            dialogMessage = 'Server error: save session';
        }
        setShowDialog(true);
        dialogMessage = `You bought ${title}!`;
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
                                            disabled={!sessionStore.session || sessionStore.session.funds < price}>
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
            </React.Fragment>
        )
    );
}
