import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from './store';

export interface GatorEntry {
    id: number;
    wb_id: number;
    barcode: string;
    title_no: number;
    title_desc: string;
    mpm_number: number;
    ep_title: string;
    episode_number: string;
    med_fmt: string;
    content: string;
    film_aspect: string;
    file_type: string;
    asset_set_id: number;
    set_no: number;
    set_total: number;
    title_no_episodic_mpm: number;
}

interface EntriesState {
    entries: GatorEntry[];
    loading: boolean;
    error: string | null;
}

const initialState: EntriesState = {
    entries: [],
    loading: false,
    error: null,
}

export const fetchEntries = createAsyncThunk<GatorEntry[], void>(
    'entries/fetchEntries',
    async () => {
      const response = await fetch('http://35.95.239.56/api/gator/');
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      return (await response.json()) as GatorEntry[]; // Ensure the returned JSON matches the GatorEntry structure
    }
  );
  
  // Create the slice
  const entriesSlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchEntries.pending, (state) => {
          state.loading = true; // Indicate loading state
          state.error = null;   // Reset any previous error
        })
        .addCase(fetchEntries.fulfilled, (state, action) => {
          state.loading = false; // Loading completed
          state.entries = action.payload; // Store the fetched entries
        })
        .addCase(fetchEntries.rejected, (state, action) => {
          state.loading = false; // Loading completed with error
          state.error = action.error.message || 'Failed to fetch entries'; // Handle error
        });
    },
  });
  
  // Export the reducer as default
  export default entriesSlice.reducer;
  
  // Optional: Selector to access entries in a typed way
  export const selectEntries = (state: RootState) => state.entries.entries;