const { Pool } = require("pg");
const { config } = require("../../config");
const pool = new Pool(config);

module.exports = async (request, response) => {
  const people = [];
  const { eventId } = request.query;
  const query = `SELECT * FROM people WHERE event_id=${eventId};`;
  const client = await pool.connect();
  await client.query(query, (err, res) => {
    if (err) {
      response.status(500).json({
        message: err.message
      });
    }
    if (res.rows.length > 0) {
      res.rows.forEach((row) => {
        people.push(row);
      });
    }
    response.json({
      people: people
    });
  });
};
