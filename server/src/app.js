const express = require("express");
const morgan = require("morgan");
const xssClean = require("xss-clean");
const expressRateLimit = require("express-rate-limit");
const createError = require("http-errors");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const { errorResponse } = require("./controllers/responseController");

const app = express();

const rateLimiter = expressRateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
  //   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  //   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many request.please try after a minute",
});

// middleware
// app.use(cors());
app.use(rateLimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

// const isLogedin = (req, res, next) => {
//   const login = true;
//   if (login) {
//     req.body.id = 101;
//     next();
//   } else {
//     res.status(401).json({ message: "unauthorized" });
//   }
//   next();
// };

// -------------------------------------------------------------------
app.get("/", (req, res) => {
  res.status(200).send({
    message: "welcome to E-commerce server!!!",
  });
});

app.use((req, res, next) => {
  next(createError(404, "Route not found!!!"));
});

app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
