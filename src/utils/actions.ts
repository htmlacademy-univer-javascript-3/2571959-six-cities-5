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

export function createGetAction<TResult = void, TArg = undefined>(
  typePrefix: string,
  url: string
) {
  return createActionWithApi<TResult, TArg>(typePrefix, async (arg, api) => {
    const { data } = await api.get<TResult>(url);
    return data;
  });
}
