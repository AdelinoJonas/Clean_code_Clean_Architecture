export default class Cpf {
  value: string;

  constructor (value: string) {
    if(!this.validate(value)) throw new Error("Invalid cpf");
    this.value = value;
  }
  
  private validate(cpf: string) {
    if (!cpf) return false;
    cpf = this.clean(cpf);
    if (this.isValidLength(cpf)) return false;
    if (this.hasDigitsEqual(cpf)) return false;
    let dg1 = this.calculateDigit(cpf, 10);
    let dg2 = this.calculateDigit(cpf, 11);
    return this.extractCheckDigit(cpf) === `${dg1}${dg2}`;
  }
  
  private calculateDigit (cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total%11;
    return (rest < 2) ? 0 : 11 - rest;
  }

  private clean(cpf: string) {
    return cpf.replace(/\D/g, "");
  }
  
  private isValidLength(cpf: string) {
    return cpf.length !== 11;
  }
  
  private hasDigitsEqual(cpf: string) { 
    const [firstDigit] = cpf;
    return [...cpf].every(digit => digit === firstDigit);
  }
  
  private extractCheckDigit(cpf: string) {
    return cpf.slice(9);
  }
 
}