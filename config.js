const config = {
  host: "free-tier14.aws-us-east-1.cockroachlabs.cloud",
  database: "bright-digger-161.social_events_db",
  port: 26257,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.CERT
  }
};
exports.config = config;
