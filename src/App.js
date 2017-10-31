import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			screenWidth: 1000,
			screenHeight: 1000,
		}
	}

	onResize = () => {
		this.setState({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight - 120
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
        </p>
			</div>
		);
	}
}

export default App;
