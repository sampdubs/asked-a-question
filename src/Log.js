import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { dateToString, generateNameOptions, logQuestion } from './helpers';
import { useNavigate } from "react-router-dom";

function Log() {
  const [options, setOptions] = useState([]);
  
  useEffect(() => {
    async function getOptions() {
      const options = await generateNameOptions();
      setOptions(options);
    }
    getOptions();
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);

  const [date, setDate] = useState(dateToString(new Date()));

  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() !== false && selectedOption != null) {
      setValidated(true);
      if (logQuestion(selectedOption, Date.parse(date))) {
        navigate("/success");
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <Container className="mx-2">
    <Row className="my-3">
      <Col><h1>D4: Drug Design, Development, and Delivery</h1></Col>
    </Row>
      <Row className="my-3">
        <Col><h3>I asked a question or made a comment!</h3></Col>
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
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required />
        </Row>
        <Row className="my-2">
          <Form.Check
            type="checkbox"
            label="I asked a question in class on this date"
            required />
        </Row>
        <Row className="my-2">
          <Button type="submit">Submit</Button>
        </Row>
      </Form>
    </Container>
  );
}

export default Log;
