/**
 * Normalizes and validates permission code formats.
 * Expected formats: "resource:action" or "module:resource:action".
 * Returns a normalized array of parts [module, resource, action] or [null, resource, action].
 */
export const normalizePermissionCode = (code: string): (string | null)[] => {
  const parts = code.split(':');
  if (parts.length < 2 || parts.length > 3) {
    throw new Error(`Invalid permission code format: ${code}`);
  }
  
  // Ensure we always have 3 parts: [module, resource, action]
  // If only 2 parts, module is null (or implied as 'core')
  return parts.length === 2 ? [null, ...parts] : parts;
};

/**
 * Validates if a user's permission matches the required permission,
 * supporting wildcard (*) matching.
 * 
 * @param requiredCode The specific permission required (e.g., "inventory:item:create")
 * @param userPermission The permission the user has (e.g., "inventory:item:*")
 */
export const matchesPermission = (requiredCode: string, userPermission: string): boolean => {
  if (userPermission === '*') {
    return true;
  }
  
  const requiredParts = requiredCode.split(':');
  const userParts = userPermission.split(':');

  for (let i = 0; i < requiredParts.length; i++) {
    const userPart = userParts[i];
    
    // If the user's permission part is '*', it matches all remaining parts
    if (userPart === '*') {
      return true;
    }
    
    // If we run out of user parts but haven't finished required parts, no match
    if (userPart === undefined) {
      return false;
    }
    
    // If parts don't match, it's not a match
    if (userPart !== requiredParts[i]) {
      return false;
    }
  }
  
  return true;
};
