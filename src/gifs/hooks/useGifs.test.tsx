import { renderHook } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import type { Gif } from "../interfaces/gif.interface";
import { useGifs } from "./useGifs";
import { act } from "react";
import * as  gifActions from "../actions/get-gifs-by-query.action";

describe('useGifs', () => {

    test('Should return default values and methods', () => {
        const { result } = renderHook(() => useGifs());
        expect(result.current.gifs).toBeDefined();
        expect(result.current.gifs).toBeInstanceOf(Array<Gif>);
        expect(result.current.previousTerms).toBeInstanceOf(Array<string>);
        expect(typeof result.current.handleSearch).toBe('function');
        expect(typeof result.current.handleTermClicked).toBe('function');
    })

    test('Should return a gif list', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => { await result.current.handleSearch('goku') });
        console.log(result);
        expect(result.current.gifs.length).toBeGreaterThan(0);
    })

    test('Should return a gif list when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => { await result.current.handleSearch('goku') });
        expect(result.current.gifs.length).toBeGreaterThan(0);
        await act(async () => { await result.current.handleTermClicked('goku') });
        expect(result.current.gifs.length).toBeGreaterThan(0);
    })

    test('Should return a gif list from cache', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => { await result.current.handleSearch('goku') });
        expect(result.current.gifs.length).toBeGreaterThan(0);
        vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(new Error('Should not be called')); // Orientados a uasrlos en promesas
        expect(result.current.gifs.length).toBeGreaterThan(0);
    })

    test('Should return no more than 8 previousTerms', async () => {
        const { result } = renderHook(() => useGifs());
        vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]); // Orientados a uasrlos en promesas
        await act(async () => { await result.current.handleSearch('goku') });
        await act(async () => { await result.current.handleSearch('vegeta') });
        await act(async () => { await result.current.handleSearch('trunks') }); 
        await act(async () => { await result.current.handleSearch('piccolo') });
        await act(async () => { await result.current.handleSearch('gohan') });
        await act(async () => { await result.current.handleSearch('krillin') });
        await act(async () => { await result.current.handleSearch('yamcha') });
        await act(async () => { await result.current.handleSearch('ten shin han') });
        await act(async () => { await result.current.handleSearch('chaotzu') });
        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).not.toContain('goku');
    });

})