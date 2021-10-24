export const sortBeersDesc = (beers, key) => beers.sort((a, b) => {
  if (a[key] > b[key]) {
    return -1;
  }
  if (b[key] > a[key]) {
    return 1;
  }
  return 0;
});

export const sortBeersAsc = (beers, key) => beers.sort((a, b) => {
  if (a[key] > b[key]) {
    return 1;
  }
  if (b[key] > a[key]) {
    return -1;
  }
  return 0;
});
