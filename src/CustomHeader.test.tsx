import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CustomHeader } from './shared/components/CustomHeader'


describe('CustomHeader', () => {

    const propsTest = {
        title: 'Titulo',
        description: ''
    }


    test('should render component properly', () => {
        render(<CustomHeader {...propsTest} />)
        screen.debug();
        expect(screen.getByText('Titulo')).toBeDefined();
    })

    test('should render the description when provided', () => {
        propsTest.description = 'description'
        render(<CustomHeader {...propsTest} />)
        expect(screen.getByText('description')).toBeTruthy();

    })

    test('should not render description when not provided', () => {
        propsTest.description = ''
        const {container} = render(<CustomHeader {...propsTest} />)
        screen.debug();
        const divElement = container.querySelector('.content-center');
        expect(divElement?.querySelector('p')).toBeNull();
    })
})  