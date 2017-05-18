import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  compose,
  setDisplayName,
  setPropTypes,
  withState,
  withHandlers,
} from 'recompose';

import rootReducer from 'reducers';
import 'styles/main.scss';

const enhance = compose(
  setDisplayName('User'),
  setPropTypes({
    name: PropTypes.string.isRequired,
    status: PropTypes.string,
  }),
  connect()
);

const withToggle = compose(
  withState('toggledOn', 'toggle', false),
  withHandlers({
    show: ({ toggle }) => e => toggle(true),
    hide: ({ toggle }) => e => toggle(false),
    toggle: ({ toggle }) => e => toggle(current => !current),
  })
);

const StatusList = () => (
  <ul>
    <li>pending</li>
    <li>inactive</li>
    <li>active</li>
  </ul>
);

const Status = withToggle(({ status, toggledOn, toggle }) => (
  <span onClick={toggle}>
    {status}
    {toggledOn && <StatusList />}
  </span>
));

const Tooltip = withToggle(({ text, children, toggledOn, show, hide }) => (
  <span>
    {toggledOn &&
      <div className="tooltip">
        {text}
      </div>}
    <div style={{ display: 'inline' }} onMouseEnter={show} onMouseLeave={hide}>
      {children}
    </div>
  </span>
));

const User = enhance(({ name, status = 'idle', dispatch }) => (
  <div className="user" onClick={() => dispatch({ type: 'USER_SELECTED' })}>
    <Tooltip text="Now you see me!">{name}</Tooltip>:
    <Status status={status} />
  </div>
));

const App = () => (
  <div className="root">
    <User name="Tim" status="active" />
  </div>
);

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
