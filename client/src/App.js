import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import validator from 'validator';

import './App.css';

export default function App() {
  const [url, setUrl] = useState('');
  const [link, setLink] = useState('');

  const handleChange = (e) => {
    e.persist();
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validURL = validator.isURL(url, { require_protocol: true });

    if (!validURL) {
      alert(
        'Please ensure this url is correct and includes the http(s) protocol'
      );
    } else {
      console.log(`URL is: ${url}`);

      // Post values
      axios
        .post('http://localhost:5000/api/shorten', { url })
        .then((res) => {
          console.log(res.data.hash);
          setLink(`http://shortlink.sh/${res.data.hash}`);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <div className="App">
      <Container>
        <Row className="align-items-center vertical-center">
          <Col>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col xs={6} className="text-center">
                  <input
                    className="w-100"
                    type="text"
                    name="url"
                    placeholder="Enter URL including the http protocol"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={3}>
                  <input type="submit" value="Shorten" />
                </Col>
                <Col xs={12} className="text-center">
                  <span id="result">{link}</span>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
