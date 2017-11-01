import React, { Component } from 'react';
import './App.css';

import Map from './component/Map';

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

	componentDidMount() {
		window.addEventListener('resize', this.onResize, false)
		this.onResize()
	}

	render() {
		const {
			screenHeight,
			screenWidth,
		} = this.state;

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
