const { Pool } = require("pg");
const { config } = require("../../config");
const pool = new Pool(config);

module.exports = async (request, response) => {
  const events = [];
  const client = await pool.connect();
  await client.query("SELECT * FROM events;", (err, res) => {
    if (err) {
      response.status(500).json({
        message: err.message
      });
    }
    if (res.rows.length > 0) {
      res.rows.forEach((row) => {
        console.log(row);
        events.push(row);
      });
    }
    response.json({
      events: events
    });
  });
};
