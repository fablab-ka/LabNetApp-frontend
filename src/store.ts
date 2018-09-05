import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

import { rootEpic } from 'src/state/rootEpic';
import { rootReducer, RootState } from 'src/state/rootReducers';

const composeEnhancers = (
    process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
        compose
);

export function configureStore(initialState?: RootState): Store<RootState> {
    // configure middlewares
    const epicMidleWare = createEpicMiddleware({
        dependencies: { ajax, sendBeacon: navigator.sendBeacon }
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
