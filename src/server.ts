import app from "./app";

// Config
const { server } = require('./config');

// Create server
app.listen(server.port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${server.port}`);
  console.log(`🎉 [server]: Ready to handle and perform requests`);
});