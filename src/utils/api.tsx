import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

import { errors } from '@/constants/error';

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

  async post(url: string, data?: any) {
    return fetch(`${this.baseUrl}${url}`, {
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
      .catch(err => {
        console.error(err);
        throw err;
      });
  }

  async get(url: string) {
    return fetch(`${this.baseUrl}${url}`, {
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
    let message = `[${response.error}]`;
    if (response.message.count > 0) {
      response.message.forEach(err => (message += `${err}`));
    } else {
      message += `${response.message}`;
    }
    throw message;
  }
};

export default API;
