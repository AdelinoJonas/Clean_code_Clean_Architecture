//@ts-nocheck
import express from "express";
import CalculateRide from "./application/usecase/CalculateRide";
import CreateDriver from "./application/usecase/CreateDriver";
import CreatePassenger from "./application/usecase/CreatePassenger";
import GetDriver from "./application/usecase/GetDriver";
import GetPassenger from "./application/usecase/GetPassenger";
import DriverRepositoryDataBase from "./infra/repository/DriverRepositoryDataBase";
import PassengerRepositoryDataBase from "./infra/repository/PassengerRepositoryDataBase";

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
    const useCase = new CreatePassenger(new PassengerRepositoryDataBase());
    const output = await useCase.execute(req.body);
    return res.json(output);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.get("/passengers/:passengerId",async function (req, res) {
  try {
    const useCase = new GetPassenger(new PassengerRepositoryDataBase());
    const output = await useCase.execute({ passengerId: req.params.passengerId });    
    console.log('PASSENGER API',output);
    if (!output) {
      return res.status(404).json({ error: "passenger not found" });
    }
    return res.json(output);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.post("/driver", async function (req, res) {
  try {
    const useCase = new CreateDriver(new DriverRepositoryDataBase());
    const output = await useCase.execute(req.body);  
    return res.json(output);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.get("/driver/:driverId",async function (req, res) {
  try {
    const usecase = new GetDriver(new DriverRepositoryDataBase());
    const output = await usecase.execute({ driverId: req.params.driverId });
    if (!output) {
      return res.status(404).json({ error: "driver not found" });
    }
    return res.json(output);
  } catch (e: any) {
    return res.status(422).send(e.message);
  }
});

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta http://localhost:3000/`);
});
