import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalDisplay from '../ModalDisplay/ModalDisplay';
import ModalContainer from '../ModalContainer/ModalContainer';
import { getBeerById } from '../../../services/beersService';
import Loader from '../../Loader/Loader';
import useComponentVisible from '../../../hooks/useComponentVisible';
import { closeAllModals } from '../../../redux/actions/display/displayModal.action';
import './BeerModal.scss';
import CloseModalButton from '../CloseModalButton/CloseModalButton';

export default function BeerModal() {
  const dispatch = useDispatch();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);
  const beerId = useSelector((state) => state.beer.id);
  const displayBeerModal = useSelector((state) => state.display.beerModal);
  const [loadingState, setLoadingState] = useState(false);
  const [beer, setBeer] = useState({});

  useEffect(() => {
    if (displayBeerModal) {
      setIsComponentVisible(true);
    }
    if (!displayBeerModal) {
      setIsComponentVisible(false);
    }
  }, [displayBeerModal]);

  useEffect(() => {
    if (!isComponentVisible && displayBeerModal) {
      dispatch(closeAllModals());
    }
  }, [isComponentVisible]);

  useEffect(() => {
    const fetchBeer = async () => {
      setLoadingState(true);

      const timer = setTimeout(async () => {
        setBeer(await getBeerById(beerId));
        setLoadingState(false);
      }, 1000);
      return () => clearTimeout(timer);
    };

    fetchBeer();
  }, [beerId]);

  const NumbersDisplay = ({ label, value }) => (
    <p className="label">
      {label}
      <span className="color-dark">
        {value}
      </span>
    </p>
  );

  const beerDisplay = (
    <div className="beer-display">
      <div className="main-information">
        <img src={beer.image_url} alt="" className="beer-image" />
        <div className="beer-info">
          <h3 className="beer-title">
            {beer.name}
          </h3>
          <p className="beer-author">{beer.contributed_by}</p>
          <p className="beer-description">
            {beer.description}
          </p>
        </div>
      </div>
      <div className="numbers-info">
        <NumbersDisplay value={`${beer.abv}%`} label="Vol. :" />
        <NumbersDisplay value={beer.ibu} label="IBU :" />
        <NumbersDisplay value={beer.ph} label="Ph. :" />
        <NumbersDisplay value={beer.ebc} label="EBC :" />
      </div>
      <div className="more-beer-info">
        <div className="additional-info">
          <p className="label">Useful Tips :</p>
          <p className="text">{beer.brewers_tips}</p>
        </div>
        <div className="additional-info">
          <p className="label">Food pairing :</p>
          {beer.food_pairing?.map((v) => <p key={v} className="text">{v}</p>)}
        </div>
      </div>
    </div>
  );

  return (
    <ModalDisplay>
      <CloseModalButton action={() => { dispatch(closeAllModals()); }} />
      <div className="beer-modal z-depth-3" ref={ref}>
        <ModalContainer>
          {loadingState ? <Loader />
            : beerDisplay }
        </ModalContainer>
      </div>
    </ModalDisplay>
  );
}
