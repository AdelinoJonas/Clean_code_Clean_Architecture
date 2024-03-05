export default class Passenger {

  constructor (readonly name: string, readonly email: string, readonly document: string) {

  }

  static create (name: string, email: string, document: string) {
    return new Passenger(name,email,document);
  }
}