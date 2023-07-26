const es = require("../services/eventoService");

async function getEvents(req, res) {
  try {
    const eventos = await es.getEvents();

    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getEventById(req, res) {
  try {
    let { id } = req.params;
    console.log(req.params);

    // if (id) {
    const evento = await es.getEventById(id);
    res.status(200).json(evento);
    // } else {
    //   res.status(400).json({ message: "Data error, id is not found" });
    // }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function createEvent(req, res) {
  try {
    const {
      name,
      category,
      date,
      description,
      image,
      place,
      price,
      capacity,
      assistance,
      estimate,
    } = req.body;

    const eventoCreado = await es.createEvent(
      name,
      category,
      date,
      description,
      image,
      place,
      price,
      capacity,
      assistance,
      estimate
    );
    if (eventoCreado) {
      res.status(201).json(eventoCreado);
    } else {
      res.status(400).json({ message: "the event was not created" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message + " /Internal Server error" });
  }
}

async function createMasiveEvents(req, res) {
  try {
    const eventosCreados = await es.createMasiveEvents();
    res.status(200).json(eventosCreados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteEvent(req, res) {
  try {
    const { _id } = req.body;

    const eventoEliminado = await es.deleteEvent(_id);
    if (eventoEliminado) {
      res.status(200).json(eventoEliminado);
    } else {
      res.status(400).json({ message: "the event was not deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message + " /Internal Server error" });
  }
}

async function updateEvent(req, res) {
  try {
    const { _id, name, category, description, place, price } = req.body;

    if (_id) {
      const eventoActualizado = await es.updateEvent(_id, {
        name,
        category,
        description,
        place,
        price,
      });
      if (eventoActualizado) {
        res.status(200).json(eventoActualizado);
      } else {
        res.status(400).json({ message: "the event was not update" });
      }
    } else {
      res.status(404).json({ message: "Data error: id is not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message + " /Internal Server error" });
  }
}

async function updateCompleteEvent(req, res) {
  try {
    const {
      _id,
      name,
      category,
      date,
      description,
      image,
      place,
      price,
      capacity,
      assistance,
      estimate,
    } = req.body;

    let eventoActualizado = await es.updateEvent(_id, {
      name,
      category,
      date,
      description,
      image,
      place,
      price,
      capacity,
      assistance,
      estimate,
    });
    if (eventoActualizado) {
      res.status(200).json(eventoActualizado);
    } else {
      res.status(400).json({ message: "the event was not update" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message + " /Internal Server error" });
  }
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  createMasiveEvents,
  deleteEvent,
  updateEvent,
  updateCompleteEvent,
};
