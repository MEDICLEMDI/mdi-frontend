import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

import { ErrorResponse } from '@/interfaces/api';
import eventEmitter from '@/utils/eventEmitter';
import { clearStorage, getStorageData } from '@/utils/localStorage';

const baseUrl = Config.API_URL;
// interface ErrorObject {
//   code: number;
//   message: string;
// }

// interface APIResponse<T, E = ErrorObject> {
//   ok: boolean;
//   data?: T;
//   error?: E;
// }

export const createHeaders = () => {
  const header = new Headers();
  header.append('Content-Type', 'application/json');
  return header;
};

export const get = async (url: string, auth?: boolean) => {
  const headers = await createHeaders();
  if (auth) {
    const accessToken = await getStorageData('@AuthKey');
    headers.append('Authorization', `Bearer ${accessToken}`);
  }
  return await _get({ url: url, headers: headers });
};

export const post = async ({
  url,
  key,
  auth = true,
  body,
}: {
  url: string;
  key?: string;
  auth?: boolean;
  body?: Record<string, unknown>;
}) => {
  const headers = await createHeaders();
  if (auth) {
    let key_ = await getStorageData('@AuthKey');
    if (key !== undefined) {
      key_ = key;
    }
    headers.append('Authorization', `Bearer ${key_}`);
  }
  return await _post({ url: url, body: body, headers: headers });
};

const jwtTokenExpireInterceptor = async (
  input: RequestInfo,
  init: RequestInit
): Promise<Response> => {
  try {
    // 기존 요청대로 백엔드에 데이터를 요청
    let response = await fetch(input, init);
    if (!response.ok) {
      if (response.status !== 401) {
        throw new Error('Network Error!');
      }
      const e: ErrorResponse = await response.json();
      switch (e.type) {
        case 'token':
          await refreshAccessToken();

          const headers = await createHeaders();
          const accessToken = await getStorageData('@AuthKey');
          headers.append('Authorization', `Bearer ${accessToken}`);
          const newInit = { ...init, headers };
          response = await fetch(input, newInit);
          break;
        default:
          throw new Error(e.message);
      }
    }
    return response;
  } catch (e) {
    throw e;
  }
};

const refreshAccessToken = async () => {
  try {
    const refreshToken = await getStorageData('@RefreshKey');
    const headers = createHeaders();
    headers.append('Authorization', `Bearer ${refreshToken}`);
    const response = await fetch(`${baseUrl}/auth/refreshtoken`, {
      method: 'POST',
      headers: headers,
    });

    if (!response.ok && response.status === 401) {
      await clearStorage();
      eventEmitter.emit('autoLoggedOut');
    }

    const { data } = await response.json();
    await AsyncStorage.setItem('@User', JSON.stringify(data.user));
    await AsyncStorage.setItem('@AuthKey', data.access_token);
  } catch (e) {
    throw e;
  }
};

const _get = async ({
  url,
  headers,
}: {
  url: string;
  headers?: Headers;
}): Promise<any> => {
  try {
    const response = await jwtTokenExpireInterceptor(`${baseUrl}${url}`, {
      method: 'GET',
      headers: headers,
    });
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      return { ok: false, error: responseData?.error };
    }
  } catch (e: any) {
    throw { ok: false, error: e.message };
  }
};

const _post = async ({
  url,
  body,
  headers,
}: {
  url: string;
  body?: Record<string, unknown>;
  headers?: Headers;
}): Promise<any> => {
  try {
    const response = await jwtTokenExpireInterceptor(`${baseUrl}${url}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      return responseData;
    } else {
      return { ok: false, error: responseData?.error };
    }
  } catch (e: any) {
    console.error('API Error:', e.message);
    throw { ok: false, error: e.message };
  }
};
