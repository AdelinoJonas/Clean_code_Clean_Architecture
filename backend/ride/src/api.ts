//@ts-nocheck
import express from "express";
import CalculateRide from "./application/usecase/CalculateRide";
import CreatePassenger from "./application/usecase/CreatePassenger";
import CreateDriver from "./application/usecase/CreateDriver";
import GetPassenger from "./application/usecase/GetPassenger";

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

app.post("/calculate_ride", async function (req, res) {
  try {
    const useCase = new CalculateRide();
    const output = await useCase.execute(req.body);
    return res.json(output);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.post("/passengers", async function (req, res) {
  try {
    const useCase = new CreatePassenger();
    const output = await useCase.execute(req.body);
    return res.json(output);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.get("/passengers/:passengerId",async function (req, res) {
  try {
    const useCase = new GetPassenger();
    const output = await useCase.execute({ passengerId: req.params.passengerId });
    return res.json(output);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.post("/driver", async function (req, res) {
  try {
    const useCase = new CreateDriver();
    const output = await useCase.execute(req.body);  
    return res.json(output);
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
