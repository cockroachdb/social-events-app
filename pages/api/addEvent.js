const { Pool } = require("pg");
const { config } = require("../../config");
const pool = new Pool(config);

module.exports = async (request, response) => {
  const { title, description, date, time } = request.body;
  const query = `INSERT INTO events (title, description, event_date, event_time)
VALUES ('${title}', '${description}', '${date}', '${time}');`;
  const client = await pool.connect();
  await client.query(query, (err, res) => {
    if (err) {
      response.status(500).json({
        message: err.message
      });
    }
    response.json({
      message: "Success!"
    });
  });
};
