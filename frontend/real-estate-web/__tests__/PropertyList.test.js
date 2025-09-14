import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import PropertyList from '../components/PropertyList';
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

describe('PropertyList Component', () => {
  test('renders empty state when no properties', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <PropertyList />
      </Provider>
    );

    expect(screen.getByText(/No properties found/i)).toBeInTheDocument();
  });

  test('renders properties correctly', () => {
    const mockProperties = [
      {
        id: '1',
        name: 'Modern Villa',
        addressProperty: 'Medellín',
        description: 'Beautiful modern villa',
        priceProperty: 800000,
        bedrooms: 4,
        bathrooms: 3,
        area: 200,
        propertyType: 'Villa',
        images: ['villa1.jpg', 'villa2.jpg'],
        amenities: ['Pool', 'Garden', 'Garage'],
        owner: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+57 300 987 6543',
          company: 'Premium Properties'
        },
        yearBuilt: 2021,
        isAvailable: true
      }
    ];

    const store = createMockStore({ 
      properties: mockProperties,
      filteredProperties: mockProperties
    });
    
    render(
      <Provider store={store}>
        <PropertyList />
      </Provider>
    );

    expect(screen.getByText('Modern Villa')).toBeInTheDocument();
    expect(screen.getByText('Medellín')).toBeInTheDocument();
    expect(screen.getByText(/800,000/)).toBeInTheDocument();
    expect(screen.getByText('4 beds')).toBeInTheDocument();
    expect(screen.getByText('3 baths')).toBeInTheDocument();
    expect(screen.getByText('200 m²')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    const store = createMockStore({ loading: true });
    
    render(
      <Provider store={store}>
        <PropertyList />
      </Provider>
    );

    expect(screen.getByText(/Loading properties/i)).toBeInTheDocument();
  });

  test('shows error state with retry button', () => {
    const store = createMockStore({ error: 'Network error' });
    
    render(
      <Provider store={store}>
        <PropertyList />
      </Provider>
    );

    expect(screen.getByText(/Error loading properties/i)).toBeInTheDocument();
    expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  test('renders property amenities', () => {
    const mockProperty = {
      id: '1',
      name: 'Luxury Apartment',
      addressProperty: 'Cartagena',
      amenities: ['WiFi', 'Pool', 'Gym', 'Parking'],
      owner: { name: 'Owner' },
      images: ['image.jpg']
    };

    const store = createMockStore({ 
      properties: [mockProperty],
      filteredProperties: [mockProperty]
    });
    
    render(
      <Provider store={store}>
        <PropertyList />
      </Provider>
    );

    expect(screen.getByText('WiFi')).toBeInTheDocument();
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
    expect(screen.getByText('Parking')).toBeInTheDocument();
  });
});