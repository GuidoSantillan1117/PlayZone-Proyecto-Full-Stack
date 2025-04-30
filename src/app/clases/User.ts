export class User {
    constructor(
      private _id: string,
      private _name: string,
      private _sur_name: string,
      private _age: number,
      private _mail: string
    ) {}
  
    get id(): string {
      return this._id;
    }
  
    set id(value: string) {
      this._id = value;
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      this._name = value;
    }
  
    get sur_name(): string {
      return this._sur_name;
    }
  
    set sur_name(value: string) {
      this._sur_name = value;
    }
  
    get age(): number {
      return this._age;
    }
  
    set age(value: number) {
      this._age = value;
    }
  
    get mail(): string {
      return this._mail;
    }
  
    set mail(value: string) {
      this._mail = value;
    }
  }
  