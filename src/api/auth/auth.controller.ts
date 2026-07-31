import { Controller, Post, Get, Body, Req, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from '../../core/auth/services/auth.service';
import type { 
  LoginRequestDTO, 
  LoginResponseDTO, 
  RefreshTokenRequestDTO, 
  RefreshTokenResponseDTO,
  CurrentUserDTO,
  LogoutRequestDTO
} from '@shared/dtos/auth';
import type { Request } from 'express';
import type { TenantContext, AuthenticatedUser } from '../../core/rbac/interfaces/middleware.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginRequestDTO, @Req() req: Request): Promise<LoginResponseDTO> {
    try {
      const tenantContext = (req as unknown as { tenant: TenantContext }).tenant;
      return await this.authService.login(dto, tenantContext);
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        throw new UnauthorizedException(error.message);
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenRequestDTO): RefreshTokenResponseDTO {
    try {
      return this.authService.refreshSession(dto);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  @Get('me')
  async getMe(@Req() req: Request): Promise<CurrentUserDTO> {
    try {
      const user = (req as unknown as { user: AuthenticatedUser }).user;
      const tenantContext = (req as unknown as { tenant: TenantContext }).tenant;
      return await this.authService.getMe(user.id, tenantContext);
    } catch {
      throw new UnauthorizedException('Authentication required');
    }
  }

  @Post('logout')
  logout(@Body() dto: LogoutRequestDTO): void {
    try {
      this.authService.logout(dto);
    } catch {
      throw new BadRequestException('Logout failed');
    }
  }
}
