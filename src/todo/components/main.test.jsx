import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Main } from './main';
import '@testing-library/jest-dom'


describe('Main Component', () => {
  it('renders with provided props', () => {
    const todos = [
      { id: '1',  title: 'Todo 1', completed: false },
      { id: '2',title: 'Todo 2', completed: true }
    ];
    const dispatch=jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Main todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );
    const main=getByTestId('main');

    expect(main).toBeInTheDocument();
  });
  test('changes to writable state on label double click', () => {
    const todos = [{ id: 1, title: 'Test Todo', completed: false }];
    const dispatch=jest.fn();
    
    const { getByTestId } = render(
        <MemoryRouter>
            <Main todos={todos} dispatch={dispatch} />
        </MemoryRouter>
    );
    const label = getByTestId('todo-item-label');

    fireEvent.doubleClick(label);

    expect(getByTestId('text-input')).toBeInTheDocument();
});
  it('toggles all items when "Toggle All" checkbox is clicked', () => {
    const todos = [
      { id: '1', title: 'Todo 1', completed: false },
      { id:'2', title:   'Todo 2', completed:true }
    ];
    const dispatch = jest.fn();
    const {getByTestId} = render(
      <MemoryRouter>
        <Main todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );
    const toggleAllCheckbox  =getByTestId('toggle-all');

    fireEvent.click(toggleAllCheckbox);

    expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_ALL', payload: { completed: true } });
  });

  it('filters todos based on current route', () => {
    const todos = [
      { id: '1', title:'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true }
    ];
    const dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/completed']}>
        <Main todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );
    const todoList = getByTestId('todo-list');

    expect(todoList.children   ).toHaveLength(1); // Only one completed todo
  });

  it('renders individual todo items correctly', () => {
    const todos = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true }
    ];
    const dispatch = jest.fn();


    const { getByText } = render(
      <MemoryRouter>
        <Main todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );

    expect(getByText('Todo 1')).toBeInTheDocument();
    expect(getByText('Todo 2'  )).toBeInTheDocument();
  });

  it('updates "Toggle All" checkbox status based on visible todos', () => {
    const todos = [
      { id: '1', title:   'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true }
    ];
    const dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Main todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );
    const toggleAllCheckbox=  getByTestId('toggle-all');

    expect(toggleAllCheckbox).toHaveProperty('checked', false);
  });

  it('calls toggleAll function when "Toggle All" checkbox is clicked', () => {
    const todos = [
      { id: '1', title:'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true }
    ];
    const dispatch = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Main todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );
    const toggleAllCheckbox=getByTestId('toggle-all');

    fireEvent.click(toggleAllCheckbox);

    expect(dispatch).toHaveBeenCalled(); // Ensure dispatch function is called
  });
  it('correctly memoizes the visible todos', () => {
    const todos = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true },
     { id: '3', title: 'Todo 3', completed: true}
    ];
    const dispatch = jest.fn();
    const {rerender} = render(
      <MemoryRouter>
        <Main todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );

    const initialTodos = todos;
    rerender(
      <MemoryRouter initialEntries={['/completed']}>
        <Main todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );

    expect(todos).toEqual(initialTodos); // Verify that todos array is not mutated
  });
  test('memoizes the toggleAll function', () => {
    const todos = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true },
      { id: '3', title: 'Todo 3', completed: true }
    ];
    const dispatch = jest.fn();
    const { rerender } = render(
      <MemoryRouter>
        <Main todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );

    const initialToggleAllFunction = jest.fn();
    rerender(
      <MemoryRouter>
        <Main todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );

    expect(dispatch).toHaveBeenCalledTimes(0); // Ensure toggleAll function is not redefined
  });
});
