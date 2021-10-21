import api from './beerApi';

export const getAllBeers = async () => (await api.get('/beers')).data;

export const getBeerById = async (id) => (await api.get(`/beers/${id}`)).data[0];
