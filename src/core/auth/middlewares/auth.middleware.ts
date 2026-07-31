import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/token.util';
import type { JwtPayload } from 'jsonwebtoken';
import type { AuthenticatedUser, TenantContext } from '../../rbac/interfaces/middleware.types';

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
  tenant: TenantContext;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: { code: 'UNAUTHORIZED', message: 'Missing or invalid authorization header' } 
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ 
            error: { code: 'UNAUTHORIZED', message: 'Missing token' } 
        });
    }

    try {
      const payload = verifyAccessToken(token) as JwtPayload;

      // Attach user context to request
      const authReq = req as AuthenticatedRequest;

      authReq.user = {
        id: payload.userId as string,
        email: payload.email as string,
        isSystem: payload.isSystem ? true : false,
      };

      // Extract tenant context from headers
      const organizationId = req.headers['x-organization-id'] as string;
      const businessUnitId = req.headers['x-business-unit-id'] as string;
      const campusId = req.headers['x-campus-id'] as string;

      if (!organizationId) {
        return res.status(401).json({ 
            error: { code: 'UNAUTHORIZED', message: 'Missing tenant context' } 
        });
      }

      authReq.tenant = {
        organizationId,
        businessUnitId,
        campusId,
      };

      next();
    } catch {
      return res.status(401).json({ 
        error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' } 
      });
    }
  }
}
