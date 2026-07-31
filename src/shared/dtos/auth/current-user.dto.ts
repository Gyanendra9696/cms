export interface CurrentUserDTO {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
  tenantId: string;
}
