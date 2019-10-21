import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import DropFile from './components/DropFile';

function App() {
  return (
    <AppContainer>
      <MainPage>
        <DropFile />
      </MainPage>
      <ToastContainer />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled('div')`
  text-align: center;
`;
const MainPage = styled('div')`
  margin-top: 50px;
`;
