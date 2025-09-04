// packages/frontend/editor-ui/src/utils/safeApi.ts

import { makeRestApiRequest } from '@n8n/rest-api-client';
import type { IRestApiContext } from '@n8n/rest-api-client';

export class ApiError extends Error {
	statusCode?: number;
	response?: unknown;

	constructor(message: string, statusCode?: number, response?: unknown) {
		super(message);
		this.name = 'ApiError';
		this.statusCode = statusCode;
		this.response = response;
	}
}

/**
 * Wrapper around makeRestApiRequest with standardized error handling.
 * @param context - API request context (authentication, etc.)
 * @param method - HTTP method (GET, POST, PATCH, DELETE)
 * @param path - API path (e.g. '/projects')
 * @param body - Request body for POST/PATCH requests
 * @param queryParams - Query parameters for GET requests
 * @returns Parsed API response on success
 * @throws ApiError with details on failure
 */
export async function safeApiRequest<T>(
	context: IRestApiContext,
	method: string,
	path: string,
	body?: unknown,
	queryParams?: Record<string, unknown>,
): Promise<T> {
	try {
		const response = await makeRestApiRequest<T>(context, method, path, body, queryParams);
		return response;
	} catch (error: any) {
		// Extract status code and message if available
		const statusCode = error?.status || error?.response?.status;
		const message =
			error?.response?.data?.message ||
			error?.message ||
			'An unknown error occurred while processing the API request.';

		// Log detailed error (can be replaced with any logging or toast notification)
		console.error(`[API Error] ${method} ${path} - ${statusCode}:`, message, error);

		// Throw a custom error for easier handling by callers
		throw new ApiError(message, statusCode, error?.response?.data);
	}
}
