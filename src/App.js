import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";


function App() {  
  const countries = [{}];
  const fetchCountries = async () => {
    await fetch("https://restcountries.com/v3.1/all").then(res => {
      return res.json()
    }).then(data => { 
      data.forEach(country => {
        countries.push({value: country.name.common, label: country.name.common})        
      });
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
            <Form.Control type="text" placeholder="Your name" required/>
          </FloatingLabel>
          <Select className='form-select' aria-label="Default select example" options={countries}/>  
        </Form.Group>
        <Button type='submit' variant="success" size='lg' required>Success</Button>{' '}
      </Form>
    </Container>
  );
}

export default App;
