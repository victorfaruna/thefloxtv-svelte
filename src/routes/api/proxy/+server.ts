import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, fetch }) => {
	let targetUrl = url.searchParams.get('url');
	if (!targetUrl) {
		throw error(400, 'Missing `url` query param');
	}

	// Parse custom headers if provided
	let customHeaders = {};
	const headersParam = url.searchParams.get('headers');
	if (headersParam) {
		try {
			customHeaders = JSON.parse(headersParam);
		} catch (e) {
			console.error('Failed to parse headers param:', headersParam, e);
			throw error(400, 'Invalid `headers` query param');
		}
	}

	// Set default headers and merge with custom
	const headers: Record<string, string> = {
		referer: 'https://vidlink.pro',
		origin: 'https://vidlink.pro',
		'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		Accept: '*/*',
		'Accept-Encoding': 'gzip, deflate, br',
		'Accept-Language': 'en-US,en;q=0.9',
		Connection: 'keep-alive',
		...customHeaders
	};

	// Parse custom cookies if provided
	const cookiesParam = url.searchParams.get('cookies');
	if (cookiesParam) {
		try {
			headers['Cookie'] = cookiesParam;
		} catch (e) {
			console.error('Failed to set cookies param:', cookiesParam, e);
			throw error(400, 'Invalid `cookies` query param');
		}
	}

	// Optionally override host header
	const hostParam = url.searchParams.get('host');
	if (hostParam) {
		headers['host'] = hostParam.replace(/^https?:\/\//, '');
	}

	try {
		const response = await fetch(targetUrl, {
			headers
		});

		if (!response.ok) {
			throw error(response.status, 'Failed to fetch target stream');
		}

		const contentType = response.headers.get('content-type') ?? 'application/octet-stream';

		// If it's HTML content, we need to modify the response
		if (contentType.includes('text/html')) {
			const html = await response.text();

			// Create a new URL object from the target URL to get the base URL
			const baseUrl = new URL(targetUrl);

			// Function to rewrite URLs to go through our proxy
			const rewriteUrl = (url: string) => {
				try {
					// Use URL constructor to handle both absolute and relative URLs
					const resolvedUrl = new URL(url, baseUrl).toString();
					// Proxy the resolved absolute URL
					return `/api/proxy?url=${encodeURIComponent(resolvedUrl)}`;
				} catch (e) {
					console.error('Failed to rewrite URL:', url, e);
					return url; // Return original URL if rewriting fails
				}
			};

			// Rewrite CSS and script URLs
			const modifiedHtml = html
				.replace(/<link[^>]+href="([^"]+)"[^>]*>/g, (match: string, href: string) => {
					if (href.includes('.css')) {
						return match.replace(href, rewriteUrl(href));
					}
					return match;
				})
				.replace(/<script[^>]+src="([^"]+)"[^>]*>/g, (match: string, src: string) => {
					return match.replace(src, rewriteUrl(src));
				});

			return new Response(modifiedHtml, {
				status: 200,
				headers: {
					'Content-Type': contentType
				}
			});
		}

		// For non-HTML content (like CSS, JS, images), just forward the response
		// Remove Referer and Origin headers for static assets
		const headersWithoutRefererOrigin = { ...headers };
		delete headersWithoutRefererOrigin.referer;
		delete headersWithoutRefererOrigin.origin;

		const stream = response.body;
		return new Response(stream, {
			status: 200,
			headers: {
				'Content-Type': contentType
			}
		});
	} catch (err: any) {
		console.error('Proxy error:', err, err?.stack);
		throw error(500, 'Proxy failed');
	}
};
