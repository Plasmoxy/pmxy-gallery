import axios from 'axios'

export const APPHOST = process.env.NODE_ENV === 'development' ? 'http://localhost:8089' : 'https://shardbytes.com:10044'

export async function apiGet<T = any>(path: string) {
  return (await axios.get<T>(`${APPHOST}/${path}`))?.data
}

export async function apiPost<T = any>(path: string, data: any) {
  return (await axios.post<T>(`${APPHOST}/${path}`, data))?.data
}

export async function apiDelete<T = any>(path: string) {
  return (await axios.delete<T>(`${APPHOST}/${path}`))?.data
}
