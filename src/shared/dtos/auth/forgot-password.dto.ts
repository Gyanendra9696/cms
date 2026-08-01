export interface ForgotPasswordResponseDTO {
  success: boolean;
  code?: 'SUCCESS' | 'USER_NOT_FOUND' | 'ACCOUNT_INACTIVE' | 'ACCOUNT_LOCKED' | 'SERVER_ERROR' | 'SERVICE_UNAVAILABLE';
  message: string;
}
