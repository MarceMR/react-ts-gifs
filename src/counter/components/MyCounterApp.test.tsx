import { describe, expect, test} from "vitest";
import { fireEvent, render, screen } from '@testing-library/react'
import { MyCounterApp } from "./MyCounterApp";

describe('MyConterApp', () => {
      test('Should render the component MyCounterApp', () => {
        render(<MyCounterApp/>);
        expect(screen.getByRole('heading', {level: 1}).innerHTML).toContain('counter: 10');

        expect(screen.getByRole('button', {name: '+1'}).innerHTML).toBeDefined();
        expect(screen.getByRole('button', {name: '-1'}).innerHTML).toBeDefined();
        expect(screen.getByRole('button', {name: 'Reset'}).innerHTML).toBeDefined();
      
    })

      test('Should increment the component counter', () => {
        render(<MyCounterApp/>);
        const labelH1 = screen.getByRole('heading', {level: 1});
        const addButton = screen.getByRole('button', {name: '+1'});
        fireEvent.click(addButton);
        expect(labelH1.innerHTML).toContain('counter: 11');
    })

    test('Should decrement the component counter', () => {
        render(<MyCounterApp/>);
        const labelH1 = screen.getByRole('heading', {level: 1});
        const substractButton = screen.getByRole('button', {name: '-1'});
        fireEvent.click(substractButton);
        expect(labelH1.innerHTML).toContain('counter: 9');
    })
})