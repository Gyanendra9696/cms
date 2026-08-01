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
import { DEVELOPMENT_AUTH } from '../config/auth.config';
import { authenticateDevelopmentUser } from '../mocks/development-auth';

export class AuthFrontendService {
  private getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async login(dto: LoginRequestDTO, tenant: TenantHeaders): Promise<LoginResponseDTO> {
    if (DEVELOPMENT_AUTH) {
      // TODO: Remove development authentication after backend integration.
      const user = authenticateDevelopmentUser(dto.identifier, dto.password);
      
      if (user) {
        const mockResponse: LoginResponseDTO = {
          accessToken: 'fake-token',
          refreshToken: 'fake-refresh-token',
          user: {
            id: 'mock-user-id',
            email: user.email,
            roles: [user.roleCode], // Storing roleCode as role
            permissions: [],
            tenantId: tenant['x-tenant-id'] || user.tenantId
          }
        };
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockResponse.accessToken);
        this.saveCurrentUser(mockResponse.user);
        return mockResponse;
      } else {
        throw new Error('Invalid credentials');
      }
    } else {
      const response = await apiClient.post<LoginRequestDTO, LoginResponseDTO>('/auth/login', dto, tenant);
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.accessToken);
      this.saveCurrentUser(response.user);
      return response;
    }
  }

  saveCurrentUser(user: CurrentUserDTO): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
  }

  getCurrentUser(): CurrentUserDTO | null {
    const user = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    return user ? JSON.parse(user) : null;
  }

  clearCurrentUser(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
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
