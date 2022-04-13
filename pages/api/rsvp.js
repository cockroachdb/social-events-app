const { Pool } = require("pg");
const { config } = require("../../config");
const pool = new Pool(config);

module.exports = async (request, response) => {
  const { name, eventId } = request.body;
  const query = `INSERT INTO people (name, event_id) VALUES ('${name}',
'${eventId}');`;
  const client = await pool.connect();
  await client.query(query, (err, res) => {
    if (err) {
      response.status(500).json({
        message: err.message
      });
    }
    console.log(res);
    response.json({
      message: "Success!"
    });
  });
};
