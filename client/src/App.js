import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import Axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = e => {
    setSelectedValue(e.value);
  }
  const countries = [{}];
  const fetchCountries = async () => {
    await fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((country) => {
          countries.push({
            value: country.name.common,
            label: country.name.common,
          });
        });
      });
  };

  const sendData = () => {
    Axios.post("http://localhost:3001/add", {
      name: name,
      country: selectedValue,
    }).then(() => {
      console.log(name);
      console.log(selectedValue);
    });
  };

  fetchCountries();

  
  return (
    <Container>
      <h1>Where Are You From?</h1>
      <Form validated>
        <Form.Group>
          <FloatingLabel
            controlId="floatingInput"
            label="What is your name?"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Your name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
            />
          </FloatingLabel>
          <Select className="form-select" options={countries}
          value={countries.find(obj => obj.value === selectedValue)} onChange={handleChange}/>
        </Form.Group>
        <Button variant="success" size="lg" onClick={sendData}>
          Success
        </Button>{" "}
      </Form>
    </Container>
  );
}

export default App;
