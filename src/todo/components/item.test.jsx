import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Item } from './item';
import '@testing-library/jest-dom'


  describe('Item', () => {
    const todo = { id: '1', title: 'Test Todo', completed: false };
    const dispatch = jest.fn();
  
    test('renders correctly', () => {
      const { getByTestId } = render(<Item todo={todo} dispatch={dispatch} />);
      expect(getByTestId('todo-item')).toBeInTheDocument();
    });
  
    test('toggles completed state when checkbox is clicked', () => {
      const { getByTestId } = render(<Item todo={todo} dispatch={dispatch} />);
      const checkbox = getByTestId('todo-item-toggle');
      fireEvent.click(checkbox);
      expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_ITEM', payload: { id: '1' } });
    });
  
    test('removes item when delete button is clicked', () => {
      const { getByTestId } = render(<Item todo={todo} dispatch={dispatch} />);
      const deleteButton = getByTestId('todo-item-button');
      fireEvent.click(deleteButton);
      expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_ITEM', payload: { id: '1' } });
    });
  
    // test('enters edit mode on double click', () => {
    //   const { getByTestId } = render(<Item todo={todo} dispatch={dispatch} />);
    //   const label = getByTestId('todo-item-label');
    //   fireEvent.doubleClick(label);
    //   expect(getByTestId('todo-item')).toHaveClass('editing');
    // });
  
    test('exits edit mode on blur', () => {
      const { getByTestId } = render(<Item todo={todo} dispatch={dispatch} />);
      const label = getByTestId('todo-item-label');
      fireEvent.doubleClick(label);
      fireEvent.blur(label);
      expect(getByTestId('todo-item')).not.toHaveClass('editing');
    });
  
    // test('updates item title when edit is submitted', () => {
    //   const { getByTestId } = render(<Item todo={todo} dispatch={dispatch} />);
    //   const label = getByTestId('todo-item-label');
    //   fireEvent.doubleClick(label);
    //   const input = getByTestId('todo-item-edit-input');
    //   fireEvent.change(input, { target: { value: 'Updated Todo' } });
    //   fireEvent.blur(input);
    //   expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_ITEM', payload: { id: '1', title: 'Updated Todo' } });
    // });
  
    // test('does not update item title when edit is submitted with empty value', () => {
    //   const { getByTestId } = render(<Item todo={todo} dispatch={dispatch} />);
    //   const label = getByTestId('todo-item-label');
    //   fireEvent.doubleClick(label);
    //   const input = getByTestId('todo-item-edit-input');
    //   fireEvent.change(input, { target: { value: '' } });
    //   fireEvent.blur(input);
    //   expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_ITEM', payload: { id: '1' } });
    // });
  });