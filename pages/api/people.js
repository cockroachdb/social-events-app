const { Pool } = require("pg");
const { config } = require("../../config");
const pool = new Pool(config);

export default async function handler(request, response) {
  const { eventId } = request.query;
  console.log(eventId);
  const query = `SELECT * FROM people WHERE event_id='${eventId}';`;

  try {
    const people = [];
    const client = await pool.connect();
    const res = await client.query(query);
    if (res.rows.length > 0) {
      res.rows.forEach((row) => {
        people.push(row);
      });
    }
    response.json({
      people: people
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      message: err.message
    });
  }
}
