import { Country } from "./country"

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
export function getAllCountries(): Promise<Country[]> {
        return fetcher(`${baseURL}/countries`)
             .then((rawCountries: any[]) :Country[] => rawCountries.map(transformCountry))
}

function transformCountry(rawCountry: any) :Country {
    const { name, cca3: code, flag, region, subregion, currency: currencies, languages, nativeLanguage } = rawCountry
    const {common: commonName, native} = name
    const {common: nativeName} = native

    return { 
        commonName, 
        nativeName, 
        code, 
        flag, 
        region, 
        subregion, 
        currencies, 
        languages: Object.values(languages),
        nativeLanguage: languages[nativeLanguage]  
    }
}