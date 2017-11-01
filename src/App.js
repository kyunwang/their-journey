import React, { Component } from 'react';
import './App.css';

import Map from './component/Map';

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
				<Map
					svgHeight={screenHeight}
					svgWidth={screenWidth}
				/>
			</div>
		);
	}
}

export default App;
