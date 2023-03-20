import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getStudentData } from './helpers';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Data() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const options = await getStudentData();
            setData(options);
        }
        getData();
    }, []);

    return (
        <Col className="mx-2">
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th># Questions answered</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((data, i) => (
                            <tr key={i}>
                                <td>{data.student}</td>
                                <td>{data.questions}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Row className="my-2">
                <Link to="/upload">
                    <Button>
                        Upload student names
                    </Button>
                </Link>
            </Row>
        </Col>
    );
}

export default Data;