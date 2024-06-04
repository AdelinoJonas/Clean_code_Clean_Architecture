import PassengerRepository from "../repository/PassengerRepository";

export default class GetPassenger {
  constructor (readonly passengerRepository: PassengerRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const passenger = await this.passengerRepository.get(input.passengerId);
    
    return {
      passengerId: passenger.passenger_id,
      name: passenger.name,
      email: passenger.email,
      document:passenger.document
    }
  }
}

type Input = {
  passengerId: string,
}

type Output = {
  passengerId: string,
  name: string,
  email: string,
  document: string
}