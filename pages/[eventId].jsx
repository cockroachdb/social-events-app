import React from "react";
import { Card, Container, Row } from "react-bootstrap";
const { Pool } = require("pg");
const { config } = require("../config");
const pool = new Pool(config);

const PeoplePage = ({ people }) => {
  return (
    <Container>
      <Row className="justify-content-md-between">
        {people.map((p) => (
          <Card key={p.id} className="sml-card">
            <Card.Body>
              <Card.Text>{p.name}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { eventId } = context.params;
  console.log(eventId);
  const query = `SELECT * FROM people WHERE event_id='${eventId}';`;

  const people = [];
  const client = await pool.connect();
  const res = await client.query(query);
  if (res.rows.length > 0) {
    res.rows.forEach((row) => {
      people.push(row);
    });
  }
  return {
    props: { people }
  };
}

export default PeoplePage;
