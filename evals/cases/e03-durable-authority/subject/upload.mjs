export function isAllowedUpload(bytes, mime) { return bytes <= 5 * 1024 * 1024 && ['image/png','image/jpeg'].includes(mime); }
