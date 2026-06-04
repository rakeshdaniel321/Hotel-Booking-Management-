// src/features/menu/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    // Starters
    { id: 1, name: 'Crispy Spring Rolls', price: 180, category: 'Starters', description: 'Fresh vegetables wrapped in crispy pastry sheets served with sweet chili sauce.' },
    { id: 2, name: 'Garlic Parmesan Wings', price: 280, category: 'Starters', description: 'Tender chicken wings tossed in rich garlic butter and aged parmesan.' },
    
    // Main Course
    { id: 3, name: 'Truffle Mushroom Pasta', price: 420, category: 'Main Course', description: 'Creamy fettuccine infused with white truffle oil and wild porcini mushrooms.' },
    { id: 4, name: 'Grilled Atlantic Salmon', price: 590, category: 'Main Course', description: 'Perfectly seared salmon served with asparagus and lemon butter sauce.' },
    
    // Beverages
    { id: 5, name: 'Mint Lime Mojito', price: 120, category: 'Beverages', description: 'Refreshing blend of fresh mint leaves, lime juice, white sugar, and soda.' },
    { id: 6, name: 'Iced Vanilla Latte', price: 150, category: 'Beverages', description: 'Double shot of espresso mixed with chilled milk and premium vanilla syrup.' }
  ],
  loading: false,
  error: null
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {} // Future CRUD modifications go here
});

export default menuSlice.reducer;