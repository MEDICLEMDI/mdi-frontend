import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

import { errors } from '@/constants/error';
import eventEmitter from '@/utils/eventEmitter';

class API {
  readonly baseUrl: string = Config.API_URL;
  token: string | null = null;

  async getJWTToken() {
    const authKey = await AsyncStorage.getItem('@AuthKey');
    const refreshKey = await AsyncStorage.getItem('@RefreshKey');

    return {
      authKey: authKey,
      refreshKey: refreshKey,
    };
  }

  async setAuthToken(): Promise<void> {
    const { authKey } = await this.getJWTToken();
    this.token = authKey;
  }

  async setRefreshToken(): Promise<void> {
    const { refreshKey } = await this.getJWTToken();
    this.token = refreshKey;
  }

  async isJWTToken() {
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys);
    return keys.includes('@AuthKey') && keys.includes('@RefreshKey');
  }

  async refreshToken() {
    await this.setRefreshToken();

    return this.post('/auth/refreshtoken')
      .then(async response => {
        if (response.result) {
          // set new token
          const { data } = response;
          await AsyncStorage.setItem('@User', JSON.stringify(data.user));
          await AsyncStorage.setItem('@AuthKey', data.access_token);
          // await AsyncStorage.setItem('@RefreshKey', data.refresh_token);
          await this.setAuthToken();
        } else {
          throw 'logout';
        }
      })
      .catch(async err => {
        throw err;
      });
  }

  async fetchInterceptor(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    const response = await fetch(input, init);
    const resp = response;
    if (response.status === 401) {
      let _response = await response.json();
      let _message = _response.message;
      if (_message === '토큰이 만료되었습니다.') {
        await this.refreshToken();
        const updatedInit = {
          ...init,
          headers: {
            ...init?.headers,
            Authorization: 'Bearer ' + this.token,
          },
        };
        const refreshResponse = await fetch(input, updatedInit);
        return refreshResponse;
      } else {
        throw 'logout';
      }
    }
    return resp;
  }

  async post(url: string, data?: any) {
    return this.fetchInterceptor(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        errorChecker(response);
        this.setAuthToken();
        return response;
      })
      .catch(async err => {
        if (err === 'logout') {
          await resetStorage();
          eventEmitter.emit('loggedOut');
        }
        throw err;
      });
  }

  async get(url: string) {
    return this.fetchInterceptor(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
    })
      .then(response => response.json())
      .then(response => {
        errorChecker(response);
        this.setAuthToken();
        return response;
      })
      .catch(err => {
        throw err;
      });
  }
}

const errorChecker = (response: any) => {
  if (errors.includes(response.statusCode)) {
    let message = '';
    if (response.message.count > 0) {
      response.message.forEach(err => (message += `${err}`));
    } else {
      message += `${response.message}`;
    }
    throw message;
  }
};

const resetStorage = async () => {
  await AsyncStorage.removeItem('@AuthKey');
  await AsyncStorage.removeItem('@RefreshKey');
  await AsyncStorage.removeItem('@User');
};

export default API;
