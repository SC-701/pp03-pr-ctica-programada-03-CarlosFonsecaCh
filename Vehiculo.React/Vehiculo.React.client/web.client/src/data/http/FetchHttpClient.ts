// FetchHttpClient - Implementación concreta usando Fetch API nativa

import { HttpClient } from './HttpClient';

export class FetchHttpClient implements HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Si es 204 No Content, retornar array vacío
    if (response.status === 204) {
      return [] as T;
    }

    return await response.json();
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Si es 201/204 sin contenido, retornar un objeto con el Location header
    const contentLength = response.headers.get('Content-Length');
    if (response.status === 201 && contentLength === '0') {
      const location = response.headers.get('Location');
      const id = location?.split('/').pop();
      return { id } as T;
    }

    if (response.status === 204 || contentLength === '0') {
      return {} as T;
    }

    return await response.json();
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Si no hay contenido, retornar objeto vacío
    const contentLength = response.headers.get('Content-Length');
    if (response.status === 204 || contentLength === '0') {
      return {} as T;
    }

    return await response.json();
  }

  async delete(url: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}
