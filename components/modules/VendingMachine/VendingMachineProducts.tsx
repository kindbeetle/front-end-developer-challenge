import {useContext} from 'react';
import {useObserver} from 'mobx-react-lite';
import {ProductsContext} from '../../../stores/products';
import {CardColumns, Card, Button} from 'react-bootstrap';

export default function VendingMachine() {
    const productsStore = useContext(ProductsContext);

    return useObserver(() =>
        (
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
                            <Button>{`Buy "${title}"`}</Button>
                        </Card.Footer>
                    </Card>
                ))}
            </CardColumns>
        )
    );
}
