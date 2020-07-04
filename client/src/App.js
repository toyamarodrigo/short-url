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

  const handleLinkChange = (e) => {
    e.persist();
    setLink(e.target.value);
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
          // Example
          // setLink(`http://shortlink.sh/${res.data.hash}`);
          // console.log(res.data.hash);
          setLink(`http://localhost:5000/${res.data.hash}`);
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
            <Form onSubmit={handleSubmit} className="form-group">
              <Container>
                <Row className="justify-content-center">
                  <Col xs={12} md={6} className="text-center my-2 p-0">
                    <input
                      className="form-control w-100 inputStyle"
                      type="text"
                      name="url"
                      placeholder="Enter URL including the http protocol"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12} md={2} className="text-center my-2 p-0">
                    <input
                      className="btn btn-warning btn-block btnStyle"
                      type="submit"
                      value="Shorten"
                    />
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row
                  className={
                    link !== ''
                      ? 'display-result justify-content-center'
                      : 'hide-result'
                  }
                >
                  <Col xs={12} md={9} className="text-center py-5">
                    <a href={link} target="_blank">
                      <span id="result" onChange={handleLinkChange}>
                        {link}
                      </span>
                    </a>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
