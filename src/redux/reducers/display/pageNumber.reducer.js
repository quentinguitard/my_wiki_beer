const initState = 1;

export default function pageNumberReducer(state = initState, action) {
  switch (action.type) {
    case 'STORE_PAGE_NUMBER':
      return action.nbr;

    default:
      return state;
  }
}
