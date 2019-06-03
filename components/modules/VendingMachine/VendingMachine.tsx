import {Container, Row, Col} from 'react-bootstrap';
import VendingMachineProducts from './VendingMachineProducts';
import VendingMachineControls from './VendingMachineControls';

export default function VendingMachine() {
    return (
        <Container fluid className="p-3">
            <Row>
                <Col xs={12} md={12} lg={9}>
                    <VendingMachineProducts />
                </Col>
                <Col xs={12} md={12} lg={3}>
                    <VendingMachineControls />
                </Col>
            </Row>
        </Container>
    )
}
