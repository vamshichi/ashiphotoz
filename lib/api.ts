// lib/api.ts
const API_BASE_URL = '/api'; // Since your API is in the same Next.js app

export async function fetchData(model: string, id?: string) {
  const url = id ? `${API_BASE_URL}/data?model=${model}&id=${id}` : `${API_BASE_URL}/data?model=${model}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export async function createData<T>(model: string, data: T)
{
  const response = await fetch(`${API_BASE_URL}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, data }),
  });
  if (!response.ok) {
    throw new Error('Failed to create data');
  }
  return response.json();
}

// Add similar functions for update and delete if needed