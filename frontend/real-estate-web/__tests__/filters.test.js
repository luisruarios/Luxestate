import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../app/page';

test('renders filters', () => {
  render(<Home />);
  expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Address/i)).toBeInTheDocument();
});
