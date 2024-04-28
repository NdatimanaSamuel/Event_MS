const dotenv = require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db.config");
const userRouter = require("./routes/user.route");
const eventRouter = require("./routes/event.route");
const ticketBooking = require("./routes/booking.route");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// routers

app.get("/", (req, res) => {
  res.send("Event Management System");
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//about my routes

app.use("/api/v1/users", userRouter);

app.use("/api/v1/event", eventRouter);
app.use("/api/v1/ticket", ticketBooking);
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {}
};

startServer();
