import Cpf from "../person/Cpf";
import Email from "../person/Email";
import CarPlate from "../driver/CarPlate";

export default class Driver {
  document: Cpf;
  email: Email;
  carPlate: CarPlate;

  constructor (readonly name: string, email: string, document: string, carPlate: string) {
    this.document = new Cpf(document);
    this.email = new Email(email);
    this.carPlate = new CarPlate(carPlate);
  }

  static create(name: string, email: string, document: string, carPlate: string) {
    return new Driver(name, email, document, carPlate);
  }
}