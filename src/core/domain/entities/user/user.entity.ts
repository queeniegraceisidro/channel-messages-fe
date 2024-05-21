export interface IUser {
  id: number
  username: string
  email?: string
  firstName: string
  lastName: string
}

export default class UserEntity {
  id: number;
  username: string;
  email?: string;
  firstName: string;
  lastName: string;

  constructor(model: IUser) {
    this.id = model.id;
    this.username = model.username;
    this.email = model.email ?? undefined;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
  }

  getCurrentValuesAsJSON(): IUser {
    return Object.assign({}, this);
  }

  static mock(username: string = 'Test Channel', email: string = 'test@test.com', firstName: string = 'First Name', lastName: string = 'Last Name'): UserEntity {
    const channel = new UserEntity({
      'id': 1,
      'username': username,
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
    })
    return channel
  }
}