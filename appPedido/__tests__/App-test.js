/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../src/screens/Home';
import renderer from 'react-test-renderer';


/*it('renders correctly', () => {
  renderer.create(<Routes/>);
});*/

it('renders correctly', ()=> {
  renderer.create(<Home/>);
});




