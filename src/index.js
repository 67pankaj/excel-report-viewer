import React from 'react';
import {render} from 'react-dom';
import Main from './components/Main';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import report from './store/reducers';

const store = createStore(report);

render(<Provider store={store}><Main /></Provider>, document.getElementById('app'));