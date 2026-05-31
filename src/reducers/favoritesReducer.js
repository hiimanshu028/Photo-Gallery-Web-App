export const initialFavoritesState = JSON.parse(localStorage.getItem('favourites')) || [];

export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const isFavourite = state.some(photo => photo.id === action.payload.id);
      
      const newState = isFavourite
        ? state.filter(photo => photo.id !== action.payload.id)
        : [...state, action.payload];

      localStorage.setItem('favourites', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};