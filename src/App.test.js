import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './pages/Admin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Admin />, div);
  ReactDOM.unmountComponentAtNode(div);
});
