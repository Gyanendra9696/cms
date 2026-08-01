import { apiClient } from '../../api/api-client';
import type { TenantHeaders } from '../../api/request-builder';
import type { 
  LoginRequestDTO, 
  LoginResponseDTO, 
  RefreshTokenRequestDTO, 
  RefreshTokenResponseDTO,
  CurrentUserDTO,
  LogoutRequestDTO,
  ForgotPasswordResponseDTO
} from '@shared/dtos/auth';
import { STORAGE_KEYS } from '@shared/constants/app';

export class AuthFrontendService {
  private getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async login(dto: LoginRequestDTO, tenant: TenantHeaders): Promise<LoginResponseDTO> {
    const response = await apiClient.post<LoginRequestDTO, LoginResponseDTO>('/auth/login', dto, tenant);
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.accessToken);
    return response;
  }

  async refresh(dto: RefreshTokenRequestDTO, tenant: TenantHeaders): Promise<RefreshTokenResponseDTO> {
    const response = await apiClient.post<RefreshTokenRequestDTO, RefreshTokenResponseDTO>('/auth/refresh', dto, tenant);
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.accessToken);
    return response;
  }

  async getMe(tenant: TenantHeaders): Promise<CurrentUserDTO> {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    return apiClient.get<CurrentUserDTO>('/auth/me', tenant, token);
  }

  async logout(dto: LogoutRequestDTO, tenant: TenantHeaders): Promise<void> {
    await apiClient.post<LogoutRequestDTO, unknown>('/auth/logout', dto, tenant);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async forgotPassword(identifier: string): Promise<ForgotPasswordResponseDTO> {
    // TODO: Connect to real API: POST /api/auth/forgot-password
    // return await apiClient.post<any, ForgotPasswordResponseDTO>('/api/auth/forgot-password', { identifier });

    // Placeholder until backend is available
    return {
      success: false,
      code: 'SERVICE_UNAVAILABLE',
      message: 'Forgot Password service is currently unavailable. This feature will be enabled after authentication backend integration.'
    };
  }
}
