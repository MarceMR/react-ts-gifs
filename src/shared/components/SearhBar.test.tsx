import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe('Pruebas en SearhBar', () => {

    test('Should render component properly', () => {
        const { container } = render(<SearchBar onQuery={() => { }} />)
        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    })


    test('Should call onQuery when form is submitted', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />)
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');

        }
        );
    });

    test('Should call only once with the same value', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />)
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't' } });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('t');
        })
    });

    test('Should call onQuery when button clicked with the input value', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />)
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't' } });

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('t');

    });

    test('The input has the correct placeHolder', () => {
        render(<SearchBar onQuery={() => { }} placeholder="Buscar gif" />)
        expect(screen.getByPlaceholderText('Buscar gif')).toBeDefined();

    });


})