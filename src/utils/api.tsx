import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

import { errors } from '@/constants/error';

class API {
  readonly baseUrl: string = Config.API_URL;

  async getJWTToken() {
    return await AsyncStorage.getItem('@Key');
  }

  async isJWTToken() {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes('@Key');
  }

  async post(url: string, data?: any) {
    const token = await this.getJWTToken();
    return fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        errorChecker(response);
        return response;
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  }

  async get(url: string) {
    const token = await AsyncStorage.getItem('@Key');
    return await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(response => {
        errorChecker(response);
        return response;
      })
      .catch(err => {
        throw err;
      });
  }
}

const errorChecker = (response: any) => {
  console.log(response);
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
