// import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Redirect, Route } from 'react-router-dom';

import App from 'src/components/app/App';
import ControlCenter from 'src/components/controlcenter/controlcenter';
import MusicControl from 'src/components/musicControl/musicControl';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';


// const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App>
        <Redirect from="/" to="/controlcenter" />
        <Route path="/controlcenter" component={ControlCenter} />
        <Route path="/music" component={MusicControl} />
      </App>
    </HashRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
