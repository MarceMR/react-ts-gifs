import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();


vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        counter: 20,
        handleAdd: handleAddMock,
        handleSubtract: handleSubtractMock,
        handleReset: handleResetMock,
    })
}));

describe('MyCounterApp usando mocks de hooks', () => {

    test('Should render the component', () => {
        render(<MyCounterApp></MyCounterApp>)
        screen.debug();
        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain('counter: 20');

        expect(screen.getByRole('button', { name: '+1' }).innerHTML).toBeDefined();
        expect(screen.getByRole('button', { name: '-1' }).innerHTML).toBeDefined();
        expect(screen.getByRole('button', { name: 'Reset' }).innerHTML).toBeDefined();
    })

    test('Should call handeAdd if button is clicked', () => {
        render(<MyCounterApp></MyCounterApp>)
        const button = screen.getByRole('button', { name: '+1' });
        fireEvent.click(button);
        expect(handleAddMock).toHaveBeenCalled();
        expect(handleSubtractMock).not.toHaveBeenCalled();
        expect(handleResetMock).not.toHaveBeenCalled();
    })

})