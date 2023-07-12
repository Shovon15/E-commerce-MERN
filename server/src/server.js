const app = require("./app.js");
const connectDB = require("./config/db.js");
const { serverPort } = require("./secret.js");

app.listen(serverPort, async () => {
  console.log(`E-commerce server running on ${serverPort}`);
  await connectDB();
});
