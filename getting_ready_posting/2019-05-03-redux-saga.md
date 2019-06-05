---
layout: post
title: Redux-saga를 통해 비동기 통신하기
author: Yangeok
categories: React
comments: true
cover:
---

디렉토리 구조

```sh
│  index.js
│
├─components
│  │  App.js
│  │  index.js
│  └─test
│          index.js
│          TestForm.js
├─containers
│  │  index.js
│  │
│  └─test
│          index.js
│          TestContainer.js
├─lib
│      config.js
│      getTests.js
├─pages
│      Home.js
│      index.js
├─routes
│      index.js
└─store
    │  constants.js
    │  index.js
    ├─actions
    │      index.js
    │      test.js
    ├─reducers
    │      index.js
    │      test.js
    └─sagas
           index.js
           test.js
```

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '/components';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
```

```js
// components/App.js
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { route } from 'routes';
import { TestContainer } from 'containers';

class App extends Component {
  render() {
    return (
      <>
        <TestContainer />
        <Switch>{route}</Switch>
      </>
    );
  }
}

export default App;

// components/index.js
export { default as App } from 'components/App';
export { default as TestForm } from 'components/test

// components/test/index.js
export { default } from './TestForm';

// components/test/TestForm.js
import React from 'react';
import { getTests } from 'store/actions';

const TestForm = ({ isLoading, people }) => {
  return (
    <>
      <h2>TestForm</h2>
      <ul>{people && people.map(person => <li>{person.name}</li>)}</ul>
    </>
  );
};

export default TestForm;
```

```js
// container/index.js
export { default as TestContainer } from 'containers/test';

// container/test/index.js
export { default } from './TestContainer';

// container/test/TestContainer.js
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTests } from 'store/actions';
import React, { Component } from 'react';
import { TestForm } from 'components';
import * as api from 'lib/getLists';

class TestContainer extends Component {
  componentDidMount() {
    // this.props.getTests('blog/1/100');
    this._getLists();
  }

  _getLists = async () => {
    const a = await this.props.getTests('blog/1/100');
    // const a = await api.getLists('blog/1/100');
  };

  render() {
    const { isLoading, people } = this.props;
    return (
      <>
        <h3>TestContainer</h3>
        <TestForm isLoading={isLoading} people={people} />
        {isLoading === true ? <div>true</div> : <div>false</div>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.test.isLoading,
  people: state.test.payload
});

const mapDispatchToProps = dispatch => ({
  getTests: url => dispatch(getTests.request(url))
});

const connectModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestContainer);

export default withRouter(connectModule);
```

```js
// lib/getTests.js
import axios from 'axios';

export const getLists = async url => {
  const repsonse = await axios.get(url);
  const people = repsonse.data.data;

  return people;
};
```

```js
// page/index.js
export { default as Home } from './Home';

// page/Home.js
import React from 'react';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
```

```js
// routes/index.js
import React from 'react';
import { Route } from 'react-router-dom';

import { Home } from 'pages';

const obj = [
  {
    path: '/',
    page: Home,
    name: 'Home'
  }
];

export const route = obj.map(({ path, page }) => (
  <Route exact={true} path={path} component={page} />
));
```

```js
// store/index.js
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from 'store/reducers';
import rootSaga from 'store/sagas';
import logger from 'redux-logger';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware, logger));
  const store = createStore(rootReducer, enhancers);

  rootSaga.map(sagaMiddleware.run);

  return store;
};

const rootStore = configureStore();

export default rootStore;

// store/constants.js
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const GET_TESTS = createRequestTypes('GET_TESTS');
```

```js
// store/actions/index.js
export { getTests } from 'store/actions/test';

// store/actions/test.js
import * as types from 'store/constants';

export const getTests = {
  request: url => {
    return {
      type: types.GET_TESTS[types.REQUEST],
      url
    };
  },
  success: payload => {
    return {
      type: types.GET_TESTS[types.SUCCESS],
      payload
    };
  },
  failure: error => {
    return {
      type: types.GET_TESTS[types.SUCCESS],
      error: error.message
    };
  }
};
```

```js
// store/reducer/index.js
import { combineReducers } from 'redux';
import test from 'store/reducers/test';

export const rootReducer = combineReducers({
  test
});

// store/reducer/test.js
import { GET_TESTS, REQUEST, SUCCESS, FAILURE } from 'store/constants';

const defaultState = {
  isLoading: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_TESTS[REQUEST]:
      return { ...state, isLoading: true };
    case GET_TESTS[SUCCESS]:
      return { ...state, isLoading: false, payload: action.payload };
    case GET_TESTS[FAILURE]:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};
```

```js
// store/sagas/index.js
import test from 'store/sagas/test';

export default [test];

// store/sagas/test.js
import { call, put, take, all, fork } from 'redux-saga/effects';
import * as api from 'lib/getLists';
import * as types from 'store/constants';
import { getTests } from 'store/actions';

export function* fetchTests(url) {
  try {
    const data = yield call(api.getLists, url);
    // yield put({ type: types.GET_TESTS[types.SUCCESS], data });
    yield put(getTests.success(data));
  } catch (e) {
    yield put({ type: types.GET_TESTS[types.FAILURE] });
    // yield put(getTests.failure(e));
  }
}

export function* watchFetchTests() {
  while (true) {
    const { url } = yield take(types.GET_TESTS[types.REQUEST]);
    yield fork(fetchTests, url);
  }
}

export default function*() {
  yield all([fork(watchFetchTests)]);
}
```
