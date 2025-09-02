import { describe, expect, test } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCounter } from './useCounter'
import { act } from 'react'


describe('Pruebas en customHook useCounter', () => {

    test('Should initialize with default value of 10', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.counter).toBe(10);
    })

    test('Should initialize with value reported (20)', () => {
        const { result } = renderHook(() => useCounter(20));
        expect(result.current.counter).toBe(20);
    })

    test('Should increment counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {result.current.handleAdd()});
        expect(result.current.counter).toBe(11)
    })

    test('Should decrement counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {result.current.handleSustract()});
        expect(result.current.counter).toBe(9)
    })

    test('Should reset counter when handleReset is called', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {result.current.handleAdd()});
        act(() => {result.current.handleAdd()});
        expect(result.current.counter).toBe(12)
        act(() => {result.current.handleReset()});
        expect(result.current.counter).toBe(10)
    })

})