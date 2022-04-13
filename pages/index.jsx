import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Card, Button, Form } from "react-bootstrap";

const Home = ({ error, events }) => {
  const [name, setName] = React.useState("");
  const onRSVP = async (eventId) => {
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        eventId: eventId
      })
    });
    if (response.status == 200) {
      alert("RSVP'd!");
    } else {
      alert("Error!");
    }
  };

  return (
    <Container className="md-container">
      <Head>
        <title>Social Events</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
        <h1>Social Events</h1>
        <p>
          <Link href="add-event">Share</Link> and attend events..
        </p>
        <Link href="add-event">
          <Button variant="primary">Add event &rarr;</Button>
        </Link>
        <Container>
          <Row className="justify-content-md-between">
            {events.map((event) => (
              <Card key={event.id} className="sml-card">
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>
                  <Card.Text>Date: {event.event_date}</Card.Text>
                  <Card.Text>Time: {event.event_time}</Card.Text>
                  <Form.Control
                    type="text"
                    placeholder="Write your name to RSVP.."
                    value={name}
                    onInput={(e) => setName(e.target.value)}
                  />
                  <Button variant="primary" onClick={() => onRSVP(event.id)}>
                    RSVP &rarr;
                  </Button>
                  <Link href={"" + event.id}>
                    <Button variant="primary">People who have RSVP'd</Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      </Container>

      <footer className="cntr-footer">
        <p>Social Events (c) 2022</p>
      </footer>
    </Container>
  );
};

Home.getInitialProps = async (ctx) => {
  try {
    const response = await fetch("/api/events");
    const events = await response.json();
    return events;
  } catch (error) {
    return { error };
  }
};

export default Home;
