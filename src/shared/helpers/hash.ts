import * as crypto from 'node:crypto';

export const generateSHA256 = (line: string, salt: string): string => {
  const hmac = crypto.createHmac('sha256', salt);
  return hmac.update(line).digest('hex');
};
