import Passenger from "../../domain/Passenger";
import PassengerRepository from "../repository/PassengerRepository";

export default class CreatePassenger {
  constructor ( readonly passengerRepository: PassengerRepository) {
  }

  async execute (input: Input): Promise<Output> {
    const passenger = Passenger.create(input.name, input.email, input.document);
    const data = await this.passengerRepository.save(passenger);
    
    return {passenger_id: data};
  }
}

type Input = {
  name: string,
  email: string,
  document: string
}

type Output = {
  passenger_id: any
}