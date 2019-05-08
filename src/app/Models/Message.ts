export class Message {
  id: number;
  name: string;
  title: string;
  email: string;
  status: boolean;
  message: string;

  constructor( name: string, title: string, email: string, message: string) {
    this.name    = name;
    this.title   = title;
    this.email   = email;
    this.message = message;
    this.status  = false;
  }
}
