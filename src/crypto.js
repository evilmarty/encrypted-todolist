const base64js = require('base64-js');

const utf8Encoder = new TextEncoder('utf-8');
const utf8Decoder = new TextDecoder('utf-8');
const salt        = utf8Encoder.encode(navigator.userAgent);
const vectorSize  = 16;
const iterations  = 1000;

export async function deriveKey(password) {
  const buffer     = utf8Encoder.encode(password);
  const key        = await crypto.subtle.importKey('raw', buffer, {name: 'PBKDF2'}, false, ['deriveKey']);
  const privateKey = crypto.subtle.deriveKey({name: 'PBKDF2', hash: {name: 'SHA-256'}, iterations, salt}, key, {name: 'AES-GCM', length: 256}, false, ['encrypt', 'decrypt']);

  return privateKey;
}

export async function encrypt(key, data) {
  const json      = JSON.stringify(data);
  const buffer    = utf8Encoder.encode(json);
  const vector    = crypto.getRandomValues(new Uint8Array(vectorSize));
  const encrypted = await crypto.subtle.encrypt({name: 'AES-GCM', iv: vector}, key, buffer);
  const bytes     = new Uint8Array(encrypted);
  const array     = new Uint8Array(vector.byteLength + bytes.byteLength);

  array.set(vector, 0);
  array.set(bytes, vector.byteLength);

  return base64js.fromByteArray(array);
}

export async function decrypt(key, encryptedData) {
  const array  = base64js.toByteArray(encryptedData);
  const vector = array.slice(0, vectorSize);
  const bytes  = array.slice(vector.byteLength);
  const buffer = await crypto.subtle.decrypt({name: 'AES-GCM', iv: vector}, key, bytes);
  const json   = utf8Decoder.decode(buffer);

  return JSON.parse(json);
}
