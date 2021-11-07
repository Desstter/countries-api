import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import Axios from "axios";
import { useState } from "react";

function App() {
  const countries = [{}];
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

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

  fetchCountries();
  
  const sendData = () => {
    if (name === "" || country === "") {
      alert("Must fill both fields :'( plis");
    } else {
      Axios.post("http://localhost:3001/add", {
        name: name,
        country: country,
      }).then(() => {
        console.log(name);
        console.log(country);
      });
      alert('Yee :), thanks for u submit <3')
    }
  };

  const handleChange = (e) => {
    setCountry(e.value);
  };

  return (
    <Container>
      <h1>Where Are You From?</h1>
      <Form>
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
            />
          </FloatingLabel>
          <Select
            className="form-select"
            options={countries}
            value={countries.find((obj) => obj.value === country)}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="success" size="lg" onClick={sendData}>
          Submit
        </Button>{" "}
      </Form>
    </Container>
  );
}

export default App;
