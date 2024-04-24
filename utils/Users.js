export class Users {
  static all() {
    return fetch("http://10.0.2.2:3000/users").then((response) => {
      return response.json();
    });
  }
}
