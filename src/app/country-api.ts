const baseURL = 'https://country-api.kubernetes.pwstaging.tech/api/v1'

function fetcher(url: RequestInfo, init?: RequestInit): any {
	const checkStatus = (response: Response): Response => {
		if(response.ok) return response
		else throw new Error('Not ok')
	}

	const parseJson = (response: Response): Promise<any> => response.json()

	return fetch(url, init)
		.then(checkStatus)
		.then(parseJson)
}

/**
 * Get a list of all the countries and their in the API
 * @returns an object containing all the countries with their info
 */
export function getAllCountries(): Promise<any> {
	return fetcher(`${baseURL}/countries`)
}