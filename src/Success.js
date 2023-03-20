import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Success() {
    return (
        <Container className="mx-2">
            <Row className="my-3">
                <Col><h1>Success!</h1></Col>
            </Row>
        </Container>
    );
}

export default Success;