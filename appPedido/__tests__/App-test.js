/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../src/screens/Home';
import Produto from '../src/screens/Produto';
import renderer from 'react-test-renderer';


/*it('renders correctly', () => {
  renderer.create(<Routes/>);
});*/

beforeAll(() => { 
  jest.mock('@react-native-community/async-storage');
});

it('renders correctly', ()=> {
  renderer.create(<Routes/>);
});




