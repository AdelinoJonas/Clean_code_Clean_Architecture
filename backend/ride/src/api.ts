//@ts-nocheck
import express from "express";
import Ride from "./Ride";
const knex = require('knex');

const app = express();
app.use(express.json());

app.post("/calculate_ride", function (req, res) {
  try {
    const ride = new Ride();
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date));
    }
    const price = ride.calculate();
    res.json({ price });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.post("/passengers", async function (req, res) {
  try {
    const { name, email, document } = req.body;
    await knex('my_uber_db').insert({
      name,
      email,
      document,
    });
    res.json({ passengerId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/passengers/:passengerId", function (req, res) {
  try {
   
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta 3000`);
});
