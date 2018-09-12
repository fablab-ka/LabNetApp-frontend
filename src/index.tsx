import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';

import App from 'src/components/app/App';
import ControlCenter from 'src/components/controlcenter/controlcenter';
import MusicControl from 'src/components/musicControl/musicControl';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';


const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Route path="/app/controlcenter" component={ControlCenter} />
        <Route path="/app/music" component={MusicControl} />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
