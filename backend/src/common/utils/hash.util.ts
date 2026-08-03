import * as crypto from 'crypto';

/**
 * Generates SHA-256 hash for an image buffer.
 * Used for Redis prediction caching.
 */
export function generateImageHash(
  buffer: Buffer,
): string {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest('hex');
}