import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllBeers } from '../../services/beersService';
import Beer from '../Beer/Beer';
import Pagination from '../Pagination/Pagination';
import './BeersTable.scss';
import Loader from '../Loader/Loader';
import storePageNumber from '../../redux/actions/display/pageNumber.action';

export default function BeersTable() {
  const dispatch = useDispatch();
  const [beers, setBeers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingState, setLoadingState] = useState(false);
  const itemPerPage = 5;
  const totalPages = Math.ceil(beers.length / itemPerPage);
  const paginateEventList = beers.slice(
    (pageNumber - 1) * itemPerPage,
    pageNumber * itemPerPage,
  );

  useEffect(() => {
    const fetchAllBeers = async () => {
      setLoadingState(true);

      const timer = setTimeout(async () => {
        setBeers(await getAllBeers());
        setLoadingState(false);
      }, 1000);
      return () => clearTimeout(timer);
    };

    fetchAllBeers();
  }, []);

  useEffect(() => {
    dispatch(storePageNumber(pageNumber));
  }, [pageNumber]);

  const onPageChange = (page) => {
    setPageNumber(page.selected + 1);
  };

  const beersList = paginateEventList.map((beer) => (
    <Beer
      key={beer.id}
      id={beer.id}
      name={beer.name}
      abv={beer.abv}
      ibu={beer.ibu}
      firstBrewed={beer.first_brewed}
    />
  ));

  const beersTableDisplay = (
    <div>
      <table className="highlight">
        <thead>
          <tr>
            <th>Beer Name</th>
            <th>Alcohol by volume</th>
            <th>IBU</th>
            <th>Creation date</th>
          </tr>
        </thead>

        <tbody>
          {beersList}
        </tbody>
      </table>

      <Pagination pageCount={totalPages} actionOnPageChange={onPageChange} />
    </div>
  );

  return (
    <div className="container beers-table z-depth-3">
      {loadingState ? <Loader /> : beersTableDisplay}
    </div>
  );
}
