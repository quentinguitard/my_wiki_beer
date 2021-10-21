import React from 'react';
import { Provider } from 'react-redux';
import BeersTable from './components/BeersTable/BeersTable';
import store from './redux/store';
import ModalManager from './components/modals/ModalManager';
import PageHeader from './components/PageHeader/PageHeader';
import BackgroundBeer from './components/BackgroundBeer/BackgroundBeer';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BackgroundBeer />
        <PageHeader />
        <BeersTable />
        <ModalManager />
      </div>
    </Provider>

  );
}

export default App;
