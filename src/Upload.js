
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setStudentData } from './helpers';
import { useNavigate } from "react-router-dom";

function Upload() {
    const [data, setData] = useState([]);

    const [validated, setValidated] = useState(false);

    const fileHandler = (event) => {
        setData(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() !== false) {
            if (data.name.endsWith(".txt")) {
                const fr = new FileReader();
                fr.addEventListener('load', (event) => {
                    setStudentData(event.target.result);
                    navigate("/success");
                });
                fr.readAsText(data);

                setValidated(true);
            } else {
                alert("File must be .txt");
            }
        }
    };

    return (
        <Form className="mx-2 my-2" validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>
                    Upload names of students here in the following format:
                    <ul>
                        <li>Last name, First name each on a seperate line</li>
                        <li>Saved as a .txt file</li>
                        <li>No blank lines</li>
                    </ul>
                </Form.Label>
                <Form.Control required type="file" size="sm" onChange={fileHandler} />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    label="I understand that uploading this file will overwrite ALL current data"
                    required />
            </Form.Group>
            <Button variant="primary" type="submit" className="my-2">
                Submit
            </Button>
        </Form>
    );
}

export default Upload;