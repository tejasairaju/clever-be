const express = require("express");
const { Contact } = require("../models");

const app = express.Router();
// get all contacts

app.get("/", async (req, res) => {
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 5;

  // calculate offset and limit for pagination
  const offset = (page - 1) * limit;
  try {
    const result = await Contact.findAndCountAll({
      offset,
      limit,
      order: [["id", "ASC"]],
    });
    res.send({
      contacts: result.rows,
      count: result.count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// get contact by id
app.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (contact) {
      res.send(contact);
    } else {
      res.status(404).send("Contact not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// add contact
app.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    if (contact) {
      res.send("Contact added");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// update contact by id
app.put("/:id", async (req, res) => {
  try {
    const result = await Contact.update(req.body, {
      where: { id: req.params.id },
    });
    if (result[0] > 0) {
      res.send("Contact updated");
    } else {
      res.status(404).send("Contact not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// delete contact by id
app.delete("/:id", async (req, res) => {
  try {
    const result = await Contact.destroy({ where: { id: req.params.id } });
    if (result > 0) {
      res.send("Contact deleted");
    } else {
      res.status(404).send("Contact not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = app;
