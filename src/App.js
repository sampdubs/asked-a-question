import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || selectedOption == null) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container className="mx-2">
      <Row className="my-3">
        <Col><h1>I asked a question!</h1></Col>
      </Row>
      <Form validated={validated} onSubmit={handleSubmit}>
      <Row className="my-2">
        Please enter your name:
      </Row>
      <Row>
        <Select
          required
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </Row>
      <Row className="my-2">
        <Form.Check
          type="checkbox"
          label="I asked a question in class today"
          required />
      </Row>
      <Row className="my-2">
        <Button type="submit">Submit</Button>
      </Row>
      </Form>
    </Container>
  );
}

export default App;
