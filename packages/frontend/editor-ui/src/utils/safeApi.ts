import { makeRestApiRequest, type IRestApiContext } from '@n8n/rest-api-client';

export async function safeApiRequest<T>(
  context: IRestApiContext,
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  try {
    return await makeRestApiRequest<T>(context, method, path, body);
  } catch (error: unknown) {
    // Normalize error format from the REST API
    if (Array.isArray(error) && typeof error[1] === 'string') {
      const [, message] = error;
      throw new Error(message);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown API error');
  }
}
