import { Ed25519KeyIdentity } from '@dfinity/identity';
import { Principal } from '@dfinity/principal';
import * as bip39 from 'bip39';
import * as CryptoJS from 'crypto-js';
import HDKey from 'hdkey';
import * as Keychain from 'react-native-keychain';

const ICP_DERIVATION_PATH = "m/44'/223'/0'/0/0";

export const createICPWalletWithMnemonic = async (password: string) => {
  try {
    // 니모닉 생성 (12개 단어)
    const mnemonic = bip39.generateMnemonic(128);
    console.log('니모닉');
    // 니모닉을 시드로 변환
    const seed = await bip39.mnemonicToSeed(mnemonic);
    console.log('seed');

    // BIP32 master 키 생성
    const masterKey = HDKey.fromMasterSeed(seed);
    console.log('마스터키');
    // ICP 지갑 키 생성
    const icpKeyPair = masterKey.derive(ICP_DERIVATION_PATH);
    console.log('키페어');
    //에러부분
    const identity = Ed25519KeyIdentity.fromSecretKey(icpKeyPair.privateKey);
    console.log('아이덴티티');
    const publicKey = identity.getPublicKey();
    console.log('퍼블릭키');

    // PublicKey 형식을 Uint8Array 형식으로 변환
    const publicKeyArray = new Uint8Array(publicKey.toDer());
    console.log('퍼블릭어레이');
    const principal = Principal.selfAuthenticating(publicKeyArray);
    console.log('프린시펄');
    // Keyring 저장
    const encryptedMnemonic = CryptoJS.AES.encrypt(
      mnemonic,
      password
    ).toString();
    await Keychain.setGenericPassword(principal.toText(), encryptedMnemonic);

    console.log('ICP 지갑이 생성되었습니다.');
    console.log('Principal:', principal.toText());
    console.log('Mnemonic:', mnemonic);

    return { mnemonic, principal };
  } catch (error) {
    console.error('ICP 지갑 생성 중 오류가 발생했습니다.', error);
    throw error;
  }
};

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
