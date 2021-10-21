export const displayBeerModal = (id) => (dispatch) => {
  dispatch({
    type: 'DISPLAY_BEER_MODAL',
  });

  dispatch({
    type: 'STORE_BEER_ID',
    id,
  });
};

export const closeAllModals = () => ({
  type: 'CLOSE_ALL_MODALS',
});
