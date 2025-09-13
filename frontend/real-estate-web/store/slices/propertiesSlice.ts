import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Property {
  id: string;
  idOwner: string;
  name: string;
  addressProperty: string;
  description: string;
  priceProperty?: number;
  rentProperty?: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  images: string[];
  amenities: string[];
  owner: {
    name: string;
    email: string;
    phone: string;
    whatsApp: string;
    company: string;
    profileImage: string;
    isAgent: boolean;
    isVerified: boolean;
  };
  yearBuilt: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  image: string; // Legacy field
}

interface PropertiesState {
  properties: Property[];
  filteredProperties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: PropertiesState = {
  properties: [],
  filteredProperties: [],
  selectedProperty: null,
  loading: false,
  error: null,
  searchTerm: '',
};

// Async thunks
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (filters?: { name?: string; address?: string; minPrice?: number; maxPrice?: number }) => {
    const queryParams = new URLSearchParams();
    if (filters?.name) queryParams.append('name', filters.name);
    if (filters?.address) queryParams.append('address', filters.address);
    if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    return response.json();
  }
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchPropertyById',
  async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }
    return response.json();
  }
);

// Slice
const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      // Filter properties based on search term
      if (action.payload.trim() === '') {
        state.filteredProperties = state.properties;
      } else {
        const term = action.payload.toLowerCase();
        state.filteredProperties = state.properties.filter(
          property =>
            property.name.toLowerCase().includes(term) ||
            property.addressProperty.toLowerCase().includes(term) ||
            property.description.toLowerCase().includes(term) ||
            property.propertyType.toLowerCase().includes(term)
        );
      }
    },
    applyFilters: (state, action: PayloadAction<{
      propertyType?: string;
      minPrice?: number;
      maxPrice?: number;
      bedrooms?: number;
      amenities?: string[];
    }>) => {
      const { propertyType, minPrice, maxPrice, bedrooms, amenities } = action.payload;

      state.filteredProperties = state.properties.filter(property => {
        const matchesType = !propertyType || property.propertyType.toLowerCase() === propertyType.toLowerCase();
        const matchesMinPrice = !minPrice || (property.priceProperty !== undefined && property.priceProperty >= minPrice);
        const matchesMaxPrice = !maxPrice || (property.priceProperty !== undefined && property.priceProperty <= maxPrice);
        const matchesBedrooms = !bedrooms || property.bedrooms >= bedrooms;
        const matchesAmenities = !amenities?.length || amenities.every(amenity =>
          property.amenities.includes(amenity)
        );

        return matchesType && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesAmenities;
      });
    },
    clearFilters: (state) => {
      state.filteredProperties = state.properties;
      state.searchTerm = '';
    },
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        state.filteredProperties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch properties';
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch property';
      });
  },
});

export const { setSearchTerm, applyFilters, clearFilters, setSelectedProperty } = propertiesSlice.actions;

// Selectors
export const selectAllProperties = (state: { properties: PropertiesState }) => state.properties.properties;
export const selectFilteredProperties = (state: { properties: PropertiesState }) => state.properties.filteredProperties;
export const selectSelectedProperty = (state: { properties: PropertiesState }) => state.properties.selectedProperty;
export const selectPropertiesLoading = (state: { properties: PropertiesState }) => state.properties.loading;
export const selectPropertiesError = (state: { properties: PropertiesState }) => state.properties.error;
export const selectSearchTerm = (state: { properties: PropertiesState }) => state.properties.searchTerm;

export default propertiesSlice.reducer;
