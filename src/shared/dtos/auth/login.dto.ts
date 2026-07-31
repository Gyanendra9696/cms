import type { CurrentUserDTO } from './current-user.dto';

export interface LoginRequestDTO {
  identifier: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: CurrentUserDTO;
}
