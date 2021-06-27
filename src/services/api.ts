import axios from 'axios'
import { useStore } from '../model/Store'

export const APPHOST = process.env.NODE_ENV === 'development' ? 'http://localhost:8089' : 'https://shardbytes.com:10044'

export async function apiGet<T = any>(path: string) {
  return (await axios.get<T>(`${APPHOST}/${path}`, {auth: useStore.getState().auth}))?.data
}

export async function apiPost<T = any>(path: string, data: any) {
  return (await axios.post<T>(`${APPHOST}/${path}`, data, {auth: useStore.getState().auth}))?.data
}

export async function apiDelete<T = any>(path: string) {
  return (await axios.delete<T>(`${APPHOST}/${path}`, {auth: useStore.getState().auth}))?.data
}
