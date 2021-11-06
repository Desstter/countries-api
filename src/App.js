import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, FloatingLabel } from "react-bootstrap";
function App() {  
  const fetchCountries = async () => {
    await fetch("https://restcountries.com/v3.1/all").then(res => {
      return res.json()
    }).then(data => {

      data.forEach(country => {

      

      });

    });
  };
  fetchCountries();
  return (
    <Container className="text-center">
      <h1>Where Are You From?</h1>
      <Form>
        <Form.Group>
          <FloatingLabel
            controlId="floatingInput"
            label="What is your name?"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Your name" />
          </FloatingLabel>
          <Form.Select aria-label="Default select example" options='hola?'>
            <option>Select Your Country</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default App;
