import Cpf from "../person/Cpf";
import Email from "../person/Email";

export default class Passenger {
  document: Cpf;
  email: Email;

  constructor (readonly name: string, email: string, document: string) {
    this.document = new Cpf(document);
    this.email = new Email(email);
  }

  static create (name: string, email: string, document: string) {
    return new Passenger(name, email, document);
  }
}