import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { Container, Form, FloatingLabel, Button, Spinner, Alert } from "react-bootstrap";
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .map((c) => ({ value: c.name.common, label: c.name.common }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountries(sorted);
      })
      .catch(() => setAlert({ type: "danger", msg: "Failed to load countries list." }))
      .finally(() => setLoading(false));
  }, []);

  const sendData = async () => {
    if (!name.trim() || !country) {
      setAlert({ type: "warning", msg: "Please fill in both fields." });
      return;
    }
    setSubmitting(true);
    try {
      await Axios.post("/add", { name: name.trim(), country });
      setAlert({ type: "success", msg: `Thanks ${name.trim()}! Your submission was saved.` });
      setName("");
      setCountry("");
    } catch {
      setAlert({ type: "danger", msg: "Could not submit. Make sure the server is running." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <h1>Where Are You From?</h1>
      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)} className="mb-3">
          {alert.msg}
        </Alert>
      )}
      <Form>
        <Form.Group>
          <FloatingLabel controlId="nameInput" label="What is your name?" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>

          {loading ? (
            <div className="d-flex align-items-center gap-2 mb-3 loading-countries">
              <Spinner animation="border" size="sm" variant="light" />
              <span>Loading countries...</span>
            </div>
          ) : (
            <Select
              className="mb-3"
              classNamePrefix="country-select"
              options={countries}
              value={countries.find((c) => c.value === country) || null}
              onChange={(opt) => setCountry(opt.value)}
              placeholder="Select your country..."
              isSearchable
            />
          )}
        </Form.Group>

        <Button
          variant="success"
          size="lg"
          onClick={sendData}
          disabled={submitting || loading}
        >
          {submitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default App;
