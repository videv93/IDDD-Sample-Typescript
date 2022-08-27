import { AssertionConcern } from 'src/common';

export class PasswordService extends AssertionConcern {
  private DIGITS = '0123456789';
  private LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private STRONG_THRESHOLD = 20;
  private SYMBOLS = '"`!?$?%^&*()_-+={[}]:;@\'~#|\\<,>.?/';
  private VERY_STRONG_THRESHOLD = 40;

  constructor() {
    super();
  }

  generateStrongPassword(): string {
    let generatedPassword = null;
    let password = '';
    let isStrong = false;
    let index = 0;
    while (!isStrong) {
      let opt = Math.random() * 4;
      switch (opt) {
        case 0:
          index = Math.random() * this.LETTERS.length;
          password.concat(this.LETTERS.substr(index, index + 1));
          break;
        case 1:
          index = Math.random() * this.LETTERS.length;
          password.concat(
            this.LETTERS.substring(index, index + 1).toLowerCase(),
          );
          break;
        case 2:
          index = Math.random() * this.DIGITS.length;
          password.concat(this.DIGITS.substr(index, index + 1));
          break;
        case 3:
          index = Math.random() * this.SYMBOLS.length;
          password.concat(this.SYMBOLS.substr(index, index + 1));
          break;
      }
      generatedPassword = password;
      if (generatedPassword.length >= 7) {
        isStrong = this.isStrong(generatedPassword);
      }
    }
    return generatedPassword;
  }

  isStrong(plainTextPassword: string) {
    return (
      this.calculatePasswordStrength(plainTextPassword) >= this.STRONG_THRESHOLD
    );
  }

  isVeryStrong(plainTextPassword: string) {
    return (
      this.calculatePasswordStrength(plainTextPassword) >=
      this.VERY_STRONG_THRESHOLD
    );
  }

  isWeak(plainTextPassword: string) {
    return (
      this.calculatePasswordStrength(plainTextPassword) < this.STRONG_THRESHOLD
    );
  }

  calculatePasswordStrength(plainTextPassword: string) {
    this.assertArgumentNotNull(
      plainTextPassword,
      'Password strength cannot be tested on null',
    );
    let strength = 0;
    let length = plainTextPassword.length;

    if (length > 7) {
      strength += 10;
      strength += length - 7;
    }

    let digitCount = 0;
    let letterCount = 0;
    let lowerCount = 0;
    let upperCount = 0;
    let symbolCount = 0;

    for (let idx = 0; idx < length; ++idx) {
      let ch = plainTextPassword[idx];

      if (this.isLetter(ch)) {
        ++letterCount;
        if (this.isUpperCase(ch)) {
          ++upperCount;
        } else {
          ++lowerCount;
        }
      } else if (this.isDigit(ch)) {
        ++digitCount;
      } else {
        ++symbolCount;
      }
    }

    strength += upperCount + lowerCount + symbolCount;

    if (letterCount >= 2 && digitCount >= 2) {
      strength += letterCount + digitCount;
    }

    return strength;
  }

  isLetter(s: string) {
    return s.length === 1 && s.match(/[a-z]/i);
  }

  isUpperCase(s: string) {
    return s.toUpperCase() == s;
  }

  isDigit(s: string) {
    return s.length === 1 && s.match(/[0-9]/);
  }
}
