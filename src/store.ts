import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { RxSocket } from 'rx-socket.io-client/dist/index';
import { ajax } from 'rxjs/ajax';

import { rootEpic } from 'src/state/rootEpic';
import { rootReducer, RootState } from 'src/state/rootReducers';

import config from './config';

const composeEnhancers = (
    process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
        compose
);

export function configureStore(initialState?: RootState): Store<RootState> {
    const socket = new RxSocket(config.socketServerUrl);

    // configure middlewares
    const epicMidleWare = createEpicMiddleware({
        dependencies: { ajax, sendBeacon: navigator.sendBeacon, socket }
    });
    const middlewares = [
        epicMidleWare,
        createLogger()
    ];

    // compose enhancers
    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares)
    );

    const result = createStore(
        rootReducer,
        initialState || {},
        enhancer
    );

    epicMidleWare.run(rootEpic);

    return result;
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
