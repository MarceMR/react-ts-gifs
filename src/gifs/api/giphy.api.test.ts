import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe('giphyapi', () => {

    test('Should be configured correctly', () => {
        console.log(giphyApi.defaults);
        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs'); 

        const params = giphyApi.defaults.params;
        // Usamos toStrictEqual para objetos
        expect(params).toStrictEqual({ lang: 'es', api_key: import.meta.env.VITE_GIPHY_API_KEY }); 

    })
})