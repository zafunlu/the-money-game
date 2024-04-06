export const VALID_NAME_PATTEN = /^[a-zA-Z]+(?:-[a-zA-Z]+)?(?:'[a-zA-Z]+)?$/;
export const INVALID_NAME_MESSAGE = "must contain only letters";

export function isValidName(name: string): boolean {
  return VALID_NAME_PATTEN.test(name);
}

export const VALID_USERNAME_PATTERN = /^[a-zA-Z0-9]*$/;
export const INVALID_USERNAME_MESSAGE = "can only contain letters and numbers";

export function isValidUsername(username: string): boolean {
  return VALID_USERNAME_PATTERN.test(username);
}

export const MIN_PASSWORD_LENGTH = 6;
export const INVALID_PASSWORD_MESSAGE = "must be at least 6 characters";
export const VALID_PASSWORD_PATTERN = new RegExp(`.{${MIN_PASSWORD_LENGTH},}`);

export function isValidPassword(password: string): boolean {
  return VALID_PASSWORD_PATTERN.test(password);
}

export const VALID_EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const INVALID_EMAIL_MESSAGE = "invalid e-mail address";

export function isValidEmail(email: string): boolean {
  return VALID_EMAIL_PATTERN.test(email);
}

export const VALID_PIN_PATTERN = /^[0-9]{4,6}$/;
export const INVALID_PIN_MESSAGE = "PINs must be 4 to 6 digits";
export function isValidPin(pin: string): boolean {
  return VALID_PIN_PATTERN.test(pin);
}

export const VALID_BANK_NAME_PATTERN = /^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/;
export const INVALID_BANK_NAME_MESSAGE = "Bank names can only contain letters, numbers, and spaces";
export function isValidBankName(name: string): boolean {
  return VALID_BANK_NAME_PATTERN.test(name);
}

export const AMOUNT_TOO_LARGE = "Must be less than or equal to $250,000,000";

export function isTheSame(value1: string, value2: string): boolean {
  return value1 === value2;
}

export function hasErrors(formErrors: any): boolean {
  return Object.values(formErrors).some(Boolean);
}

export function isToday(date: string): boolean {
  const today = new Date();
  const dayOfMonth = today.getDate().toString().padStart(2, "0");
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const year = today.getFullYear();
  return `${year}-${month}-${dayOfMonth}` === date.slice(0, 10);
}
