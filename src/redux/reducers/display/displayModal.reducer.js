const initState = {
  beerModal: false,
};

export default function displayModalReducer(state = initState, action) {
  switch (action.type) {
    case 'DISPLAY_BEER_MODAL':
      return {
        beerModal: true,
      };
    case 'CLOSE_ALL_MODALS':
      return initState;
    default:
      return state;
  }
}
