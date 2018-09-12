import * as React from 'react';
import { NavLink } from 'react-router-dom';

import logo from 'src/assets/images/logo.png';

import './App.css';

export default class App extends React.Component {
  public render() {
    return (
      <main className="app">
        <header className="app__header">
          <img src={logo} className="app__logo" alt="logo" />
          <h1 className="app__header__title">LabNetApp</h1>
          <nav>
            <NavLink to="/app/controlcenter">Steuerung</NavLink>
            <NavLink to="/app/music">Musik</NavLink>
          </nav>
        </header>

        <section className="app__intro">
          {this.props.children}
        </section>
      </main>
    );
  }
}
