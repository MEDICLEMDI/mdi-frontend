import { blobFromUint8Array } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import * as bip39 from 'bip39';
import crypto from 'crypto';
import HDKey from 'hdkey';
import Secp256k1 from 'secp256k1';

import Secp256k1PublicKey from './Secp256k1PublicKey';

const ICP_DERIVATION_PATH = "m/44'/223'/0'/0/0";

// export const createICPWalletWithMnemonic = async (password: string) => {
//   try {
//     // 니모닉 생성 (12개 단어)
//     const mnemonic = bip39.generateMnemonic(128);
//     // 니모닉을 시드로 변환
//     const seed = bip39.mnemonicToSeedSync(mnemonic);

//     // BIP32 master 키 생성
//     const masterKey = HDKey.fromMasterSeed(seed);
//     console.log('gd');
//     const { privateKey } = masterKey.derive(ICP_DERIVATION_PATH);
//     console.log('gd');
//     const publicKey = Secp256k1.publicKeyCreate(privateKey, false);
//     const publicKey2 = Secp256k1PublicKey.fromRaw(
//       blobFromUint8Array(publicKey)
//     );

//     console.log('gd');
//     const icpIdentity = Ed25519KeyIdentity.fromSecretKey(privateKey);
//     console.log('gd');
//     const principal = Principal.fromUint8Array(
//       icpIdentity.getPublicKey().toDer()
//     );
//     const address = principal.toText();

//     const encryptedWalletInfo = CryptoJS.AES.encrypt(
//       JSON.stringify({ mnemonic, privateKey, publicKey2 }),
//       password
//     ).toString();

//     await Keychain.setGenericPassword(address, encryptedWalletInfo, {
//       service: 'ICPWallet',
//     });

//     return 'gd';
//   } catch (error) {
//     console.error('ICP 지갑 생성 중 오류가 발생했습니다.', error);
//     throw error;
//   }
// };

// export const createICPWalletWithMnemonic2 = () => {
//   try {
//     // 니모닉 생성 (12개 단어)
//     const mnemonic = bip39.generateMnemonic(128);
//     // 니모닉을 시드로 변환
//     const seed = bip39.mnemonicToSeedSync(mnemonic);

//     // BIP32 master 키 생성
//     const masterKey = HDKey.fromMasterSeed(seed);

//     // ICP 지갑 생성
//     const { privateKey } = masterKey.derive(ICP_DERIVATION_PATH);
//     const publicKey = Secp256k1.publicKeyCreate(privateKey, false);
//     const secp256k1PublicKey = Secp256k1PublicKey.fromRaw(
//       blobFromUint8Array(publicKey)
//     );
//     const principal = principalFromPublicKey(secp256k1PublicKey.toRaw());
//     const address = principal.toText();

//     return {
//       mnemonic,
//       address,
//       privateKey,
//       publicKey: secp256k1PublicKey.toDer(),
//     };
//   } catch (error) {
//     console.error('ICP 지갑 생성 중 오류가 발생했습니다.', error);
//     throw error;
//   }
// };

export const unlockKeyring = async (principal: Principal, password: string) => {
  try {
    const storedCredentials = await Keychain.getGenericPassword({
      service: principal.toText(),
    });

    if (!storedCredentials) {
      throw new Error('Keyring에 저장된 ICP 지갑이 없습니다.');
    }

    const { password: encryptedMnemonic } = storedCredentials;
    const decryptedMnemonic = CryptoJS.AES.decrypt(
      encryptedMnemonic,
      password
    ).toString(CryptoJS.enc.Utf8);

    if (!decryptedMnemonic) {
      throw new Error('잘못된 비밀번호입니다.');
    }

    // 니모닉으로부터 ICP 지갑 키 가져오기
    const seed = await bip39.mnemonicToSeed(decryptedMnemonic);
    const masterKey = HDKey.fromMasterSeed(seed);
    const icpKeyPair = masterKey.derive(ICP_DERIVATION_PATH);
    const identity = Ed25519KeyIdentity.fromSecretKey(icpKeyPair.privateKey);

    console.log('Keyring에서 ICP 지갑이 해제되었습니다.');
    return identity;
  } catch (error) {
    console.error('ICP 지갑 해제 중 오류가 발생했습니다.', error);
    throw error;
  }
};

const principalFromPublicKey = publicKey => {
  const crypto = require('crypto');
  const sha256 = data => crypto.createHash('sha256').update(data).digest();
  const sha224 = data => crypto.createHash('sha224').update(data).digest();

  const array = new Uint8Array([...sha256(publicKey).slice(0, 28), 2]);
  return Principal.fromUint8Array(sha224(array));
};
