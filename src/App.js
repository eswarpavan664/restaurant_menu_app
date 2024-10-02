import React from 'react';
import './App.css';

import MainNavigation from './navigations/main_navigation';
import DisableRightClick from './helpers/DisableRightClick';
import DetectDevTools from './helpers/DetectDevTools';

function App() {
  return (
    <MainNavigation/>
  );
}

export default DetectDevTools(DisableRightClick(App));
