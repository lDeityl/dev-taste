const bcrypt = require('bcrypt');
const saltRounds = 10;
var CryptoJS = require('crypto-js');

export const EncryptPass = (data: string) => {
  const hash = bcrypt.hashSync(data, saltRounds);
  return hash;
};
export const Encrypt = (data: string) => {
  var ciphertext = CryptoJS.AES.encrypt(
    data,
    process.env.SECRET_KEY_FOR_ENCRYPTION,
  ).toString();
  return ciphertext;
};
export const Decrypt = (data: string) => {
  var bytes = CryptoJS.AES.decrypt(
    data,
    process.env.SECRET_KEY_FOR_ENCRYPTION,
  );
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};