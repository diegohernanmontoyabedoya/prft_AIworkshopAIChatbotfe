/*import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom'; // For toBeInTheDocument matcher
import App from './App'; // Adjust path if your App.js is in a different location

describe('App component', () => {
  /*test('renders "Start the conversation!" text', () => {
    render(<App />);
    const startElement = screen.getByText(/Start the conversation!/i); // Case-insensitive match
    expect(helloWorldElement).toBeInTheDocument();
  });*/

  test('renders "Hello World" text', () => {
    const { getByText } = render(<App />);
    const helloWorldElement = getByText("Start the conversation!");
    expect(helloWorldElement).toBeInTheDocument();
  });
});
