import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import {
	select,
	selectAll,
} from 'd3-selection';

import {
	geoMercator,
	geoCentroid,
} from 'd3-geo';

import ReactDOM from 'react-dom';

class DotCenter extends Component {
	static propTypes = {
		svgContainer: PropTypes.object.isRequired,
		directionMapping: PropTypes.array.isRequired,
		projection: PropTypes.func.isRequired,
	}


	componentDidMount() {

	}

	componentDidUpdate() {

	}

	render() {
		const {
			projection,
			coords,
			directionMapping,
		} = this.props;
		console.log(this.props);
		return (
			// <text></text>
			// <text
			// 	x="0"
			// 	y="35"
			// 	fontFamily="Verdana"
			// 	ontSize="35"
			// >
			// 	Hello, out there
			// </text>
			<circle
				cx={projection()(coords)[0]}
				cy={projection()(coords)[1]}
				// r={city.population / 3000000}
				r={8}
				fill="#E91E63"
				stroke="#FFFFFF"
				className="marker"
			// onClick={() => this.handleMarkerClick(i)}
			/>

		);
	}
}

export default DotCenter;
