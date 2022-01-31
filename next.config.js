const prod = process.env.NODE_ENV === "production";

module.exports = {
  env: {
    API_URL: process.env.API_URL,
  },
};
