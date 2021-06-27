import axios from 'axios'

export const APPHOST = process.env.NODE_ENV === 'development' ? 'http://localhost:8089' : 'https://shardbytes.com:10044'

/* Helpers */

async function apiGet<T = any>(path: string) {
  return (await axios.get<T>(`${APPHOST}/${path}`))?.data
}

async function apiPost<T = any>(path: string, data: any) {
  return (await axios.post<T>(`${APPHOST}/${path}`, data))?.data
}

async function apiDelete<T = any>(path: string) {
  return (await axios.delete<T>(`${APPHOST}/${path}`))?.data
}

/* Api */

export async function getStatus() {
  return await apiGet<{status: string}>("/");
}

export function getImageUrl(imageName: string) {
  return `${APPHOST}/images/${encodeURI(imageName)}`
}

export function getThumbnailUrl(thumbName: string) {
  return `${APPHOST}/thumbs/${encodeURI(thumbName)}`
}

export async function createGallery(name: string) {
  return await apiPost("gallery", {name})
}

export async function fetchGallery(path: string) {
  return await apiGet(`gallery/${path}`)
}

export async function fetchAllGalleries() {
  return await apiGet("gallery")
}

export async function deleteGallery(path: string) {
  return await apiDelete(`gallery/${path}`)
}

export async function uploadImage(galleryPath: string, file: any) {
  const url = `${APPHOST}/gallery/${galleryPath}`
  const formData = new FormData();
  formData.append('image', file)
  const config = {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  }
  
  return axios.post(url, formData, config)
}

export async function deleteImageFromGallery(galleryPath: string, imagePath: string) {
  return await apiDelete(`gallery/${galleryPath}/${imagePath}`)
}

