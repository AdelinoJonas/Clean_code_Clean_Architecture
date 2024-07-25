import Cpf from "./Cpf";
import Email from "./Email";
import Name from "./Name";

export default class Passenger {
  passengerId?: string | null;
  name: Name;
  email: Email;
  document: Cpf;

  constructor(passengerId: string, name: string, email: string, document: string) {
    if (!name) {
      throw new Error("Invalid name");
    }
    if (!email) {
      throw new Error("Invalid email");
    }
    if (!document) {
      throw new Error("Invalid document");
    }

    this.passengerId = passengerId;
    this.name = new Name(name);;
    this.email = new Email(email);
    this.document = new Cpf(document);
  }

  static create(builder: PassengerBuilder) {
    return new Passenger(builder.passengerId, builder.name, builder.email, builder.document);
  }
}

export class PassengerBuilder {
  passengerId = "";
  name = "";
  email = "";
  document = "";

  build() {
    return Passenger.create(this);
  }
}