import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import { Header } from './header';
import '@testing-library/jest-dom'


describe('Header Component', () => {
  test('renders with provided props', () => {
    const dispatch = jest.fn();
    const { getByTestId, getByLabelText } = render(<Header dispatch={dispatch} />);

    const header = getByTestId('header');
    const input = getByLabelText('New Todo Input');

    expect(header).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

test('dispatches ADD_ITEM action with input value when Enter key is pressed', () => {
    const dispatch = jest.fn();
    const { getByLabelText } = render(<Header dispatch={dispatch} />);
    const input = getByLabelText('New Todo Input');
    const testValue = 'Test Todo';

    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_ITEM', payload: { title: testValue } });
  });
});
// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import { Header } from './header';
// import { ADD_ITEM } from '../constants';

// describe('Header', () => {
//   it('renders correctly', () => {
//     const dispatch = jest.fn();
//     const { getByTestId, getByPlaceholderText } = render(<Header dispatch={dispatch} />);
//     const header = getByTestId('header');
//     const input = getByPlaceholderText('What needs to be done?');

//     expect(header).toBeInTheDocument();
//     expect(input).toBeInTheDocument();
//   });

//   it('adds a new todo item when the input is submitted', () => {
//     const dispatch = jest.fn();
//     const { getByPlaceholderText } = render(<Header dispatch={dispatch} />);
//     const input = getByPlaceholderText('What needs to be done?');

//     fireEvent.change(input, { target: { value: 'New Todo' } });
//     fireEvent.submit(input);

//     expect(dispatch).toHaveBeenCalledWith({ type: ADD_ITEM, payload: { title: 'New Todo' } });
//   });
// });