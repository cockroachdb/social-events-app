const { Pool } = require("pg");
const { config } = require("../../config");
const pool = new Pool(config);

export default async function handler(request, response) {
  const { title, description, date, time } = request.body;
  const query = `INSERT INTO events (title, description, event_date, event_time)
VALUES ('${title}', '${description}', '${date}', '${time}');`;

  try {
    const client = await pool.connect();
    await client.query(query);
    response.json({
      message: "Success!"
    });
  } catch (err) {
    response.status(500).json({
      message: err.message
    });
  }
}
