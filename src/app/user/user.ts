export class User {
      username: string;
      password: string;
      firstName: string;
      lastName: string;
      constructor(username?: string, password?: string, firstName?: string, lastName?: string
        ) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
      }
}
