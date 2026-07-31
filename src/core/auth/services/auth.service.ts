import { UserRepository } from '../../repositories/user.repository';
import { RbacService } from '../../rbac/services/rbac.service';
import { comparePasswords } from '../utils/password.util';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/token.util';
import type { 
  LoginRequestDTO, 
  LoginResponseDTO, 
  RefreshTokenRequestDTO, 
  RefreshTokenResponseDTO,
  CurrentUserDTO
} from '../../../shared/dtos/auth';
import type { JwtPayload } from 'jsonwebtoken';
import type { TenantContext } from '../../rbac/interfaces/middleware.types';

export class AuthService {
  private userRepo: UserRepository;
  private rbacService: RbacService;

  constructor() {
    this.userRepo = new UserRepository();
    this.rbacService = new RbacService();
  }

  private mapTenant(tenant: TenantContext) {
    return {
      orgId: tenant.organizationId,
      buId: tenant.businessUnitId ?? '',
      campusId: tenant.campusId ?? ''
    };
  }

  async login(dto: LoginRequestDTO, tenantContext: TenantContext): Promise<LoginResponseDTO> {
    const user = await this.userRepo.findByEmail(dto.identifier);
    if (!user || !(await comparePasswords(dto.password, user.password_hash))) {
      throw new Error('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const tenant = this.mapTenant(tenantContext);
    
    // Fetching user details
    const roles = await this.rbacService.getUserRoles(user.id, tenant);
    const permissions = await this.rbacService.getUserPermissions(user.id, tenant);

    const currentUser: CurrentUserDTO = {
      id: user.id,
      email: user.email,
      roles: roles.map(r => r.role_id),
      permissions: permissions.map(p => p.code),
      tenantId: tenant.orgId
    };

    return { accessToken, refreshToken, user: currentUser };
  }

  async getMe(userId: string, tenantContext: TenantContext): Promise<CurrentUserDTO> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const tenant = this.mapTenant(tenantContext);
    const roles = await this.rbacService.getUserRoles(userId, tenant);
    const permissions = await this.rbacService.getUserPermissions(userId, tenant);

    return {
      id: user.id,
      email: user.email,
      roles: roles.map(r => r.role_id),
      permissions: permissions.map(p => p.code),
      tenantId: tenant.orgId
    };
  }

  refreshSession(dto: RefreshTokenRequestDTO): RefreshTokenResponseDTO {
    const decoded = verifyRefreshToken(dto.refreshToken) as JwtPayload;
    
    const userId = decoded.userId as string;
    const email = decoded.email as string;
    
    const accessToken = generateAccessToken({ userId, email });
    return { accessToken };
  }

  logout(dto: { refreshToken: string }): void {
    // Invalidate refresh token in database
    void dto;
  }
}
