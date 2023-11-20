//@ts-nocheck
import express from "express";
import Ride from "./Ride";
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '0.0.0.0',
    port : 3318,
    user : 'jonas',
    password : '123456',
    database : 'my_uber_db'
  },
  useNullAsDefault: true
});

const app = express();
app.use(express.json());

app.post("/calculate_ride", function (req, res) {
  try {
    const ride = new Ride();
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date));
    }
    const price = ride.calculate();
    return res.json({ price });
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

app.post("/passengers", async function (req, res) {
  try {
    const { name, email, document } = req.body;

    await knex('passenger').insert({
      name,
      email,
      document,
    });
    return res.json({ message: 'Created successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
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
