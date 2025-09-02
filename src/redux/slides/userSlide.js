import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  avatar: '',
  access_token: '',
  refresh_token: '',
  isAdmin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id = '',
        name = '',
        email = '',
        phone = '',
        address = '',
        city = '',
        avatar = '',
        access_token = '',
        isAdmin,
      } = action.payload;
      state.id = _id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.city = city;
      state.avatar = avatar;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.isAdmin = isAdmin; // Ensure isAdmin is set correctly
    },
    resetUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.city = '';
      state.avatar = '';
      state.access_token = '';
      state.refresh_token = '';
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
