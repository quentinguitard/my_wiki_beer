const initState = { id: null };

export default function beerReducer(state = initState, action) {
  switch (action.type) {
    case 'STORE_BEER_ID':
      return { id: action.id };
    default:
      return state;
  }
}
