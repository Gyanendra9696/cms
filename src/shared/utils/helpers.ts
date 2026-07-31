export const formatDate = (date: Date): string => date.toISOString();

export const generateId = (): string => Math.random().toString(36).substring(2, 9);
