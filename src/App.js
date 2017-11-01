import React, { Component } from 'react';
import './App.css';

import WorldMap from './component/WorldMap';

class App extends Component {
	constructor() {
		super();
		this.state = {
			screenWidth: 1000,
			screenHeight: 1000,
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.onResize, false);
		this.onResize();
	}

	onResize = () => {
		this.setState({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
		});
	}


	render() {
		const {
			screenHeight,
			screenWidth,
		} = this.state;

		// console.log('state', this.state);

		return (
			<div className="App">
				<WorldMap
					svgHeight={screenHeight}
					svgWidth={screenWidth}
				/>
			</div>
		);
	}
}

export default App;
