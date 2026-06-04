
  import { configureStore } from '@reduxjs/toolkit';
  import themeReducer from './features/theme/themeSlice';
  import menuReducer from './features/menu/menuSlice';
  import authReducer from './features/auth/authSlice';

  export const store = configureStore({
    reducer: {
      theme:themeReducer,
      menu:menuReducer,
      auth:authReducer,
      
    },
  });