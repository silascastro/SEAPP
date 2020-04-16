import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import Login from './screens/Login';
import Home from './screens/Home';
import AuthLoading from './screens/AuthLoading';
import Request from './screens/Request';
import Cliente from './screens/Cliente';
import ClienteContas from './screens/ClienteContas';
import Pedido from './screens/Pedido';
import Produto from './screens/Produto';
import Settings from './screens/Settings';

const Routes = createAppContainer(
  createStackNavigator(
    {AuthLoading: AuthLoading,
      Login: Login,
      Home: Home,
      Request: Request , 
      Cliente: Cliente, 
      ClienteContas: ClienteContas,
      Pedido: Pedido,
      Produto: Produto,
      Settings: Settings
    },{

}));

export default Routes;
