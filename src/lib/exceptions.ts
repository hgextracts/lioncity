// Base error interface
export interface AppError {
  name: string;
  message: string;
}

export class UnknownError extends Error {
  constructor(message = "An unknown error occurred") {
    super(message);
    this.name = "UnknownError";
  }
}

// Custom error classes implementing the interface
export class AuthRequiredError extends Error implements AppError {
  constructor(message = "Auth is required to access this page.") {
    super(message);
    this.name = "AuthRequiredError";
  }
}

export class WalletConnectionError extends Error implements AppError {
  constructor(message = "Failed to connect the wallet.") {
    super(message);
    this.name = "WalletConnectionError";
  }
}
