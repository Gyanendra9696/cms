export class BaseError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'BaseError';
  }
}

export class ValidationError extends BaseError {
  constructor(message: string, public details: Record<string, string>) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class BusinessError extends BaseError {
  constructor(message: string) {
    super(message, 'BUSINESS_ERROR');
    this.name = 'BusinessError';
  }
}

export class AuthorizationError extends BaseError {
  constructor(message = 'Unauthorized') {
    super(message, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends BaseError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND_ERROR');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends BaseError {
  constructor(message: string) {
    super(message, 'CONFLICT_ERROR');
    this.name = 'ConflictError';
  }
}
