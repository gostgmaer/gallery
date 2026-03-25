export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 400, details);
    this.name = "ValidationError";
  }
}

export class AuthError extends ApiError {
  constructor(message: string, statusCode: number = 401, details?: any) {
    super(message, statusCode, details);
    this.name = "AuthError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found", details?: any) {
    super(message, 404, details);
    this.name = "NotFoundError";
  }
}

export class ServerError extends ApiError {
  constructor(message: string = "Internal server error", details?: any) {
    super(message, 500, details);
    this.name = "ServerError";
  }
}
