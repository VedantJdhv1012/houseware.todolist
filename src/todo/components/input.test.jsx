import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from './input';
import '@testing-library/jest-dom'

describe('Input Component', () => {

  test('renders with provided props', () => {
    const onSubmit = jest.fn();
    const placeholder = 'Enter todo';
    const label = '';
    const defaultValue = '';
    const { getByLabelText, getByTestId } = render(
      <Input onSubmit={onSubmit} placeholder={placeholder} label={label} defaultValue={defaultValue} />
    );

    const input = getByTestId('text-input');
    const labelElement = getByLabelText(label);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', placeholder);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(label);
  });

  test('sanitizes input value and submits on Enter key press', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Input onSubmit={onSubmit} />);
    const input = getByTestId('text-input');

    fireEvent.change(input, { target: { value: '<script>alert("XSS attack")</script>' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSubmit).toHaveBeenCalledWith('&lt;script&gt;alert(&quot;XSS attack&quot;)&lt;&#x2F;script&gt;');
  });
  test('resets input value after submit', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Input onSubmit={onSubmit} />);
    const input = getByTestId('text-input');

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(input.value).toBe('');
});

  test('does not call onSubmit for whitespace input', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Input onSubmit={onSubmit} />);
    const input = getByTestId('text-input');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSubmit).not.toHaveBeenCalled();
});

  test('does not submit if input value does not meet minimum length', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Input onSubmit={onSubmit} />);
    const input = getByTestId('text-input');

    fireEvent.change(input, { target: { value: 'b' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('does not submit if input value does not meet minimum length', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Input onSubmit={onSubmit} />);
    const input = getByTestId('text-input');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSubmit).not.toHaveBeenCalled();
  });
  test('submit if input value does meet minimum length', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Input onSubmit={onSubmit} />);
    const input = getByTestId('text-input');

    fireEvent.change(input, { target: { value: 'aa' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSubmit).toHaveBeenCalled();
  });
  
  test('calls onBlur callback when input loses focus', () => {
    const onBlur = jest.fn();
    const { getByTestId } = render(<Input onBlur={onBlur} />);
    const input = getByTestId('text-input');

    fireEvent.blur(input);

    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
