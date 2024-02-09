import React from 'react';
import { render, fireEvent ,screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { Footer } from './footer';

describe('Footer Component', () => {
  test('renders with provided props', () => {
    const todos = [{ id: 1, title: 'Todo 1', completed: false }];
    const dispatch = jest.fn();
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Footer todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );

    const footer = getByTestId('footer');
    const filterLinks = getByTestId('footer-navigation');
    const clearCompletedButton =screen.getByText('Clear completed')

    expect(footer).toBeInTheDocument();
    expect(filterLinks).toBeInTheDocument();
    expect(getByText('Clear completed')).toBeInTheDocument()
  });

  test('navigates to the correct route when filter link is clicked', () => {
    const todos = [{ id: 1, title: 'Todo 1', completed: false }];
    const dispatch = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <Footer todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Active'));
    expect(window.location.hash).toEqual('');
  });

  test('dispatches REMOVE_COMPLETED_ITEMS action when "Clear completed" button is clicked', () => {
    const todos = [{ id: 1, title: 'Todo 1', completed: true }];
    const dispatch = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <Footer todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Clear completed'));
    expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_COMPLETED_ITEMS' });
  });

  test('>>disables the "Clear completed" button when there are no completed todos', () => {
    const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: false },
    ];
    const dispatch = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <Footer todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );

    expect(getByText('Clear completed')).toBeDisabled();
});
  it('displays the correct number of active todos', () => {
    const dispatch = jest.fn();
    const todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
        { id: 2, title: 'Todo 2', completed: true },
    ];
    const { getByText } = render(
      <MemoryRouter>
        <Footer todos={todos} dispatch={dispatch} />
      </MemoryRouter>
    );
    expect(getByText('1 item left!')).toBeInTheDocument();
});

it('displays the correct number of active todos', () => {
  const dispatch = jest.fn();
  const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
  ];
  const { getByText } = render(
    <MemoryRouter>
      <Footer todos={todos} dispatch={dispatch} />
    </MemoryRouter>
  );
  expect(getByText('2 items left!')).toBeInTheDocument();
});

it('displays the correct number of active todos', () => {
  const dispatch = jest.fn();
  const todos = [
      { id: 1, title: 'Todo 1', completed: true  },
      { id: 2, title: 'Todo 2', completed: true  },
      { id: 2, title: 'Todo 2', completed: true },
  ];
  const { getByText } = render(
    <MemoryRouter>
      <Footer todos={todos} dispatch={dispatch} />
    </MemoryRouter>
  );
  expect(getByText('0 items left!')).toBeInTheDocument();
});

it('does not render when there are no todos', () => {
  const dispatch = jest.fn();
  const todos = [];
  const { queryByTestId } = render(
    <MemoryRouter>
      <Footer todos={todos} dispatch={dispatch} />
    </MemoryRouter>
  );
  expect(queryByTestId('footer')).toBeNull();
});

});
