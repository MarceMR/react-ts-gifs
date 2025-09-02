import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";

import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from "../api/giphy.api";
import { giphyResponseDataMock } from "../../mock-data/giphy.response.data";


describe('GetGifsByQueyy', () => {

    let mock = new AxiosMockAdapter(giphyApi);

    // Reseteamos el mock antes de cada test
    beforeEach(() => {
        mock = new AxiosMockAdapter(giphyApi);
    })

    // test('Should return a gif list', async() => {
    //     const gifsList = await getGifsByQuery('Ginga');
    //     const [gif1] = gifsList; 
    //     expect(gif1).toStrictEqual({
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String)
    //     })
    // })
    test('Should return a gif list', async() => {
        mock.onGet('/search').reply(200, giphyResponseDataMock);
        const gifsList = await getGifsByQuery('goku');
        
        expect(gifsList.length).toBe(50);
     gifsList.forEach(gif => {  
            expect(gif).toStrictEqual({
                id: expect.any(String),
                height: expect.any(Number),
                width: expect.any(Number),
                title: expect.any(String),
                url: expect.any(String)
            })
        }) 
    })

     test('Should return a empty list if query parameter is not provided', async() => {
        mock.restore()
        const gifsList = await getGifsByQuery('');
        
        expect(gifsList.length).toBe(0);
    
    })

    test('Should handle error when the PAI returns an error', async() => {
       
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
            return console.log("Ha ocurrido un error"); // No hace nada
        });

        mock.onGet('/search').reply(400, {  data: { message: 'Error from Giphy API' } });
        const gifsList = await getGifsByQuery('goku');
        expect(gifsList.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
    })
})