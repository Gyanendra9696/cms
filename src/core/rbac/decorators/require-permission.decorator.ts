import 'reflect-metadata';

/**
 * Metadata key for storing required permissions.
 */
export const REQUIRED_PERMISSIONS_KEY = Symbol('rbac:permissions');

/**
 * Decorator to require specific permissions for a class or method.
 * @param permissions The required permission codes (e.g., 'resource:action')
 */
export function RequirePermissions(...permissions: string[]) {
  return (
    target: object,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ): void => {
    // If propertyKey is present, we are decorating a method; otherwise, a class
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const targetObject = propertyKey ? descriptor?.value : target;

    if (targetObject) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Reflect.defineMetadata(REQUIRED_PERMISSIONS_KEY, permissions, targetObject);
    }
  };
}
