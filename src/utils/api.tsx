import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "@/components/Api";

class API {
  readonly baseUrl: string = 'http://192.168.50.125:3000';

  async post(url: string, data?: any) {
    const token = await AsyncStorage.getItem('@Key');

    return fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      if(
        response.statusCode === 400 ||
        response.statusCode === 401 ||
        response.statusCode === 404
      ) {
        let message = `[${response.error}]`;
        if(response.message.count > 0) {
          response.message.forEach(err => message += `${err}`);
        } else {
          message += `${response.message}`
        }
        throw message;
      }
      return response;
    })
    .catch((err) => {
      throw err;
    });
  }

  async get(url: string) {
    return await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(response => {
      if(
        response.statusCode === 400 ||
        response.statusCode === 401 ||
        response.statusCode === 404
      ) {
        let message = `[${response.error}]`;
        if(response.message.count > 0) {
          response.message.forEach(err => message += `${err}`);
        } else {
          message += `${response.message}`
        }
        throw message;
      }

      return response;
    })
    .catch((err) => {
      throw err;
    });
  }
}

export default API;
