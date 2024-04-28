const express = require("express");
const router = express.Router();
const {
  addNewEvent,
  viewAllEvents,
  getEventById,
  updateExistEvent,
  deleteEvent,
} = require("../controllers/event.controller");

const { protect, checkRole } = require("../Middleware/auth.middleware");
router.post("/create", protect, checkRole(["admin"]), addNewEvent);
router.get("/viewEvents", viewAllEvents);
router.get("/getEvent/:id", getEventById);
router.put("/update/:id", protect, checkRole(["admin"]), updateExistEvent);
router.delete("/delete/:id", protect, checkRole(["admin"]), deleteEvent);
module.exports = router;
