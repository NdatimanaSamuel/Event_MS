import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/event/";

// Create new event
const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/create", eventData, config);

  return response.data;
};

const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/viewEvents", config);

  return response.data;
};

// get  event by id
const getEventById = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/getEvent/" + eventId, config);
  return response.data;
};

//delete event
const removeEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "delete/" + eventId, config);
  return response.data;
};

//update event
const updateEvent = async (eventId, eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "update/" + eventId,
    eventData,
    config
  );
  return response.data;
};

const eventService = {
  createEvent,
  getEvents,
  getEventById,
  removeEvent,
  updateEvent,
};

export default eventService;
