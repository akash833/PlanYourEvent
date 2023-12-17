import * as EmailValidator from 'email-validator';

export function isValidEmail(email: string): boolean {
  return EmailValidator.validate(email);
}