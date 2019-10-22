/**
 * @format
 */

import 'react-native';
import React from 'react';
//import App from '../App';
import Routes from '../src/Routes';
//import Home from '../src/screens/Home';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Routes/>);
});
