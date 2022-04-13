const { Pool } = require("pg");
const { config } = require("../../config");
const pool = new Pool(config);

export default async function handler(request, response) {
  try {
    const events = [];
    const client = await pool.connect();
    const res = await client.query("SELECT * FROM events;");
    if (res.rows.length > 0) {
      res.rows.forEach((row) => {
        console.log(row);
        events.push(row);
      });
    }
    response.json({
      events: events
    });
  } catch (err) {
    response.status(500).json({
      message: err.message
    });
  }
}
