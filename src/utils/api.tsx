import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

class API {
  readonly baseUrl: string = Config.API_URL;

  async post(url: string, data?: any) {
    const token = await AsyncStorage.getItem('@Key');

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
        console.log(response);
        if (
          response.statusCode === 400 ||
          response.statusCode === 401 ||
          response.statusCode === 404 ||
          response.statusCode === 500
        ) {
          let message = '';
          if (response.message.count > 0) {
            response.message.forEach(err => (message += `${err}`));
          } else {
            message += `${response.message}`;
          }
          throw message;
        }
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
        if (
          response.statusCode === 400 ||
          response.statusCode === 401 ||
          response.statusCode === 404
        ) {
          let message = `[${response.error}]`;
          if (response.message.count > 0) {
            response.message.forEach(err => (message += `${err}`));
          } else {
            message += `${response.message}`;
          }
          throw message;
        }

        return response;
      })
      .catch(err => {
        throw err;
      });
  }
}

export default API;
