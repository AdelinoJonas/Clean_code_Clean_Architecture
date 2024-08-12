import CarPlate from "./CarPlate";
import Cpf from "./Cpf";
import Email from "./Email";
import Name from "./Name";

export default class Driver {
  driverId?: string | null;
  name: Name;
  email: Email;
  document: Cpf;
	carPlate: CarPlate;

  constructor(driverId: string, name: string, email: string, document: string, carPlate: string) {
    if (!name) {
      throw new Error("Invalid name");
    }
    if (!email) {
      throw new Error("Invalid email");
    }
    if (!document) {
      throw new Error("Invalid document");
    }
    if (!carPlate) {
      throw new Error("Invalid document");
    }

    this.driverId = driverId;
    this.name = new Name(name);;
    this.email = new Email(email);
    this.document = new Cpf(document);
    this.carPlate = new CarPlate(carPlate);
  }

  static create(builder: DriverBuilder) {
    return new Driver(builder.driverId, builder.name, builder.email, builder.document, builder.carPlate);
  }
}

export class DriverBuilder {
  driverId = "";
  name = "";
  email = "";
  document = "";
  carPlate = "";

  build() {
    return Driver.create(this);
  }
}