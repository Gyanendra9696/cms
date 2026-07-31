import {
  ApiError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  NetworkError,
} from './api-error';
import { HttpStatus } from './http-status';

export const handleApiError = async (error: unknown): Promise<never> => {
  if (!(error instanceof Response)) {
    throw new NetworkError(error instanceof Error ? error.message : 'Unknown network error');
  }

  const status = error.status;
  let payload: unknown;
  try {
    payload = await error.json();
  } catch {
    payload = null;
  }

  const message = (typeof payload === 'object' && payload !== null && 'message' in payload && typeof payload.message === 'string') 
    ? payload.message 
    : 'An error occurred';

  switch (status) {
    case HttpStatus.BAD_REQUEST:
      throw new ValidationError(message, payload);
    case HttpStatus.UNAUTHORIZED:
      throw new UnauthorizedError(message);
    case HttpStatus.FORBIDDEN:
      throw new ForbiddenError(message);
    case HttpStatus.NOT_FOUND:
      throw new NotFoundError(message);
    case HttpStatus.CONFLICT:
      throw new ConflictError(message);
    default:
      throw new ApiError(message, status, payload);
  }
};
