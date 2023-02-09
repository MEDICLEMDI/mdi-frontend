import { createSlice } from '@reduxjs/toolkit';

// import { TabDisplayState } from '@/interfaces/redux';

// const INITIAL_STATE: TabDisplayState = {
//   display: true,
// };

export const setDisplaySlice = createSlice({
  name: 'display',
  initialState: {
    display: true,
  },
  reducers: {
    setTabDisplay: (state, action) => {
      state.display = action.payload;
    },
  },
});

export const { setTabDisplay } = setDisplaySlice.actions;
export default setDisplaySlice.reducer;
