import { AssertionConcern } from 'src/common';

export class FullName extends AssertionConcern {
  private _firstName: string;
  private _lastName: string;

  constructor(firstName: string, lastName: string) {
    super();

    this.setFirstName(firstName);
    this.setLastName(lastName);
  }

  firstName() {
    return this._firstName;
  }

  lastName() {
    return this._lastName;
  }

  asFormattedName() {
    return this.firstName() + ' ' + this.lastName();
  }

  withChangedFirstName(firstName: string): FullName {
    return new FullName(firstName, this.lastName());
  }

  withChangedLastName(lastName: string) {
    return new FullName(this.firstName(), lastName);
  }

  private setFirstName(firstName: string) {
    this.assertArgumentNotEmpty(firstName, 'First name is required');
    this.assertArgumentLength(firstName, 1, 50, 'First name must be required.');
    this.assertArgumentTrue(
      /[A-Z][a-z]*/.test(firstName),
      'First name must be at least one character in length, starting with capital letter.',
    );

    this._firstName = firstName;
  }

  private setLastName(lastName: string) {
    this.assertArgumentNotEmpty(lastName, 'Last name is required');
    this.assertArgumentLength(lastName, 1, 50, 'Last name must be required.');
    this.assertArgumentTrue(
      /[a-zA-Z][a-zA-z]*[a-zA-Z]?/.test(lastName),
      'Last name must be at least one character in length.',
    );

    this._lastName = lastName;
  }
}
