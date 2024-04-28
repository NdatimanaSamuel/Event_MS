const Event = require("../models/event.model");

const addNewEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const viewAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById({ _id: id});
    if (!event) {
      return res.status(404).json(`No Event with this Id ${req.params.id} found`);
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const updateExistEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json(`No Event with this Id ${id} found`);
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json(`No Event with this Id ${id} found`);
    }
    res.status(200).send("Event Deleted Successfully");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  addNewEvent,
  viewAllEvents,
  getEventById,
  updateExistEvent,
  deleteEvent,
};
