import { createSlice } from '@reduxjs/toolkit';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';

const initialState = {
  slides: [
    { id: 1, url: slider1, name: 'Slide 1', isDefault: true },
    { id: 2, url: slider2, name: 'Slide 2', isDefault: true },
  ],
};

export const slideSlice = createSlice({
  name: 'slide',
  initialState,
  reducers: {
    // Add new slide
    addSlide: (state, action) => {
      const newSlide = {
        id: Date.now(),
        url: action.payload.url,
        name: action.payload.name,
        isDefault: false,
      };
      state.slides.push(newSlide);
    },

    // Delete slide
    deleteSlide: (state, action) => {
      const slideId = action.payload;
      state.slides = state.slides.filter((slide) => slide.id !== slideId);
    },

    // Update slide order (for drag & drop later)
    reorderSlides: (state, action) => {
      state.slides = action.payload;
    },

    // Reset to default slides
    resetSlides: (state) => {
      state.slides = [
        { id: 1, url: slider1, name: 'Slide 1', isDefault: true },
        { id: 2, url: slider2, name: 'Slide 2', isDefault: true },
      ];
    },
  },
});

// Action creators
export const { addSlide, deleteSlide, reorderSlides, resetSlides } = slideSlice.actions;

// Selectors
export const selectSlides = (state) => state.slide.slides;
export const selectSlidesUrls = (state) => state.slide.slides.map((slide) => slide.url);
export const selectSlidesCount = (state) => state.slide.slides.length;

export default slideSlice.reducer;
