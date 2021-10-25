import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllBeers } from '../../services/beersService';
import Beer from '../Beer/Beer';
import Pagination from '../Pagination/Pagination';
import './BeersTable.scss';
import Loader from '../Loader/Loader';
import storePageNumber from '../../redux/actions/display/pageNumber.action';
import { sortBeersAsc, sortBeersDesc } from '../../services/sortBeersArray';

export default function BeersTable() {
  const dispatch = useDispatch();
  const [beers, setBeers] = useState([]);
  const [sortBeers, setSortBeers] = useState({ param: '', asc: true, desc: false });
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
        setBeers(sortBeersAsc((await getAllBeers()), 'name'));
        setSortBeers({ param: 'name', asc: true, desc: false });
        setLoadingState(false);
      }, 1000);
      return () => clearTimeout(timer);
    };

    fetchAllBeers();
  }, []);

  useEffect(() => {
    dispatch(storePageNumber(pageNumber));
  }, [pageNumber]);

  const SortArrow = ({ asc, desc }) => (
    <>
      {asc && <i className="fas fa-chevron-up" />}
      {desc && <i className="fas fa-chevron-down" />}
    </>
  );

  const setStateSort = (selectedParam) => {
    setPageNumber(1);
    setSortBeers(((prevState) => {
      if (prevState.param !== selectedParam) {
        setBeers((prevBeersState) => sortBeersAsc(prevBeersState, selectedParam));
        return { param: selectedParam, asc: true, desc: false };
      } if (prevState.asc) {
        setBeers((prevBeersState) => sortBeersDesc(prevBeersState, selectedParam));
        return { ...prevState, asc: false, desc: true };
      } if (prevState.desc) {
        setBeers((prevBeersState) => sortBeersAsc(prevBeersState, selectedParam));
        return { ...prevState, asc: true, desc: false };
      }
      return { ...prevState };
    }));
  };

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
      ebc={beer.ebc}
    />
  ));

  const beersTableDisplay = (
    <div>
      <table className="highlight">
        <thead>
          <tr>
            <th onClick={() => setStateSort('name')}>
              Beer Name
              {sortBeers.param === 'name' && <SortArrow asc={sortBeers.asc} desc={sortBeers.desc} /> }
            </th>
            <th onClick={() => setStateSort('abv')}>
              Alcohol by volume
              {sortBeers.param === 'abv' && <SortArrow asc={sortBeers.asc} desc={sortBeers.desc} /> }
            </th>
            <th onClick={() => setStateSort('ibu')}>
              Int. Bitterness Unit
              {sortBeers.param === 'ibu' && <SortArrow asc={sortBeers.asc} desc={sortBeers.desc} /> }
            </th>
            <th onClick={() => setStateSort('ebc')}>
              Eu. Brewery Convention
              {sortBeers.param === 'ebc' && <SortArrow asc={sortBeers.asc} desc={sortBeers.desc} /> }
            </th>
          </tr>
        </thead>

        <tbody>
          {beersList}
        </tbody>
      </table>

      <Pagination
        pageCount={totalPages}
        actionOnPageChange={onPageChange}
        pageNumber={pageNumber - 1}
      />
    </div>
  );

  return (
    <div className="container beers-table z-depth-3">
      {loadingState ? <Loader /> : beersTableDisplay}
    </div>
  );
}
