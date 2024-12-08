import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunkConfig } from '../types/state';
import { AxiosInstance } from 'axios';

function createActionWithApi<TResult = void, TArg = undefined>(
  typePrefix: string,
  payloadCreator: (arg: TArg, api: AxiosInstance) => Promise<TResult>
) {
  return createAsyncThunk<TResult, TArg, AppThunkConfig>(
    typePrefix,
    (thunkArg, thunkApi) => payloadCreator(thunkArg, thunkApi.extra.api)
  );
}

export function createGetAction<TResult = void, TArg extends Record<string, string> | undefined = undefined>(
  typePrefix: string,
  url: string
) {
  return createActionWithApi<TResult, TArg>(typePrefix, async (arg, api) => {
    if (arg !== undefined) {
      url = Object.entries(arg).reduce((prevUrl, [key, value]) => prevUrl.replace(`:${key}`, value), url);
    }
    const { data } = await api.get<TResult>(url);
    return data;
  });
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function createPostAction<TResult = void, TArg extends PostArg = {}>(
  typePrefix: string,
  url: string
) {
  return createActionWithApi<TResult, TArg>(typePrefix, async (arg, api) => {
    if (arg && arg.params) {
      url = Object.entries(arg.params).reduce((prevUrl, [key, value]) => prevUrl.replace(`:${key}`, value), url);
    }
    const { data } = await api.post<TResult>(url, arg.data);
    return data;
  });
}

interface PostArg {
  params?: Record<string, string>;
  data?: object;
}

export function createDeleteAction<TResult = void, TArg = undefined>(
  typePrefix: string,
  url: string
) {
  return createActionWithApi<TResult, TArg>(typePrefix, async (_, api) => {
    const { data } = await api.delete<TResult>(url);
    return data;
  });
}
