//@ts-nocheck
import express from "express";
import Ride from "./Ride";
import { validate } from "./CpfValidator";
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
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.post("/passengers", async function (req, res) {
  try {
    const { name, email, document } = req.body;
    if (!validate(req.body.document)) throw new Error("Invalid cpf");
    const passengerData = await knex('passenger').insert({
        name,
        email,
        document,
      });
    return res.status(201).json(passengerData);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.get("/passengers/:passengerId",async function (req, res) {
  try {
    const passengerId = req.params.passengerId;
    const passengerData = await knex('passenger')
      .select()
      .where('passenger_id', passengerId)
      .first();
    if (!passengerData) {
      return res.status(404).json({ error: "Passenger not found" });
    }
    return res.json(passengerData);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.post("/driver", async function (req, res) {
  try {
    const { name, email, document, car_plate } = req.body;
    if (!validate(req.body.document)) throw new Error("Invalid cpf");
    const driverData = await knex('driver').insert({
        name,
        email,
        document,
        car_plate
      });
    return res.status(201).json(driverData);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.get("/driver/:driverId",async function (req, res) {
  try {
    const driverId = req.params.driverId;
    const driverData = await knex('driver')
      .select()
      .where('driver_id', driverId)
      .first();
    if (!driverData) {
      return res.status(404).json({ error: "driver not found" });
    }
    return res.json(driverData);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta http://localhost:3000/`);
});
