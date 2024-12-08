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

export function createPostAction<TResult = void, TArg = undefined>(
  typePrefix: string,
  url: string
) {
  return createActionWithApi<TResult, TArg>(typePrefix, async (arg, api) => {
    const { data } = await api.post<TResult>(url, arg);
    return data;
  });
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
