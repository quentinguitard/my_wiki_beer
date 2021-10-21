import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalDisplay from '../ModalDisplay/ModalDisplay';
import ModalContainer from '../ModalContainer/ModalContainer';
import './BeerModal.scss';
import { getBeerById } from '../../../services/beersService';
import Loader from '../../Loader/Loader';
import useComponentVisible from '../../../hooks/useComponentVisible';
import { closeAllModals } from '../../../redux/actions/display/displayModal.action';

export default function BeerModal() {
  const dispatch = useDispatch();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);
  const beerId = useSelector((state) => state.beer.id);
  const displayBeerModal = useSelector((state) => state.display.beerModal);
  const [loadingState, setLoadingState] = useState(false);
  const [beer, setBeer] = useState({});
  console.log(beer);
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

  return (
    <ModalDisplay>
      <div className="beer-modal z-depth-3" ref={ref}>
        <ModalContainer>
          <p>coucou</p>
          {loadingState ? <Loader />
            : (
              <div>lol</div>
            ) }

        </ModalContainer>
      </div>
    </ModalDisplay>
  );
}
