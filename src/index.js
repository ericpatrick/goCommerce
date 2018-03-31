import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Routes from 'routes';
import numeral from 'numeral';
import 'numeral/locales';

import 'config/ReactotronConfig';
import 'config/DevtoolsConfig';

import store from 'store';

export default class App extends Component {
  constructor() {
    super();
    numeral.locale('pt-br');
  }
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
