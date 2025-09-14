import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import Home from '../app/page';
import propertiesReducer from '../store/slices/propertiesSlice';

// Mock store setup
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      properties: propertiesReducer
    },
    preloadedState: {
      properties: {
        properties: [],
        filteredProperties: [],
        selectedProperty: null,
        loading: false,
        error: null,
        searchTerm: '',
        ...initialState
      }
    }
  });
};

// Mock fetch globally
global.fetch = jest.fn();

describe('Property Filters', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders search filters', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Search by name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Max Price/i)).toBeInTheDocument();
  });

  test('updates search term when typing in name filter', async () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText(/Search by name/i);
    fireEvent.change(nameInput, { target: { value: 'Penthouse' } });

    expect(nameInput.value).toBe('Penthouse');
  });

  test('updates address filter when typing', async () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const addressInput = screen.getByPlaceholderText(/Search by address/i);
    fireEvent.change(addressInput, { target: { value: 'Bogotá' } });

    expect(addressInput.value).toBe('Bogotá');
  });

  test('updates price filters when typing', async () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const minPriceInput = screen.getByPlaceholderText(/Min Price/i);
    const maxPriceInput = screen.getByPlaceholderText(/Max Price/i);

    fireEvent.change(minPriceInput, { target: { value: '100000' } });
    fireEvent.change(maxPriceInput, { target: { value: '500000' } });

    expect(minPriceInput.value).toBe('100000');
    expect(maxPriceInput.value).toBe('500000');
  });

  test('shows loading state', () => {
    const store = createMockStore({ loading: true });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/Loading properties/i)).toBeInTheDocument();
  });

  test('shows error state', () => {
    const store = createMockStore({ error: 'Failed to fetch properties' });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/Error: Failed to fetch properties/i)).toBeInTheDocument();
  });

  test('displays properties when loaded', () => {
    const mockProperties = [
      {
        id: '1',
        name: 'Luxury Penthouse',
        addressProperty: 'Bogotá Centro',
        description: 'Beautiful penthouse with amazing views',
        priceProperty: 500000,
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        propertyType: 'Penthouse',
        images: ['image1.jpg'],
        amenities: ['Pool', 'Gym'],
        owner: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+57 300 123 4567'
        },
        yearBuilt: 2020,
        isAvailable: true,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01'
      }
    ];

    const store = createMockStore({
      properties: mockProperties,
      filteredProperties: mockProperties
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('Luxury Penthouse')).toBeInTheDocument();
    expect(screen.getByText('Bogotá Centro')).toBeInTheDocument();
    expect(screen.getByText(/500,000/)).toBeInTheDocument();
  });
});
