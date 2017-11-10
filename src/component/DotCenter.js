import React, { Component } from 'react';
import PropTypes from 'prop-types';


class DotCenter extends Component {
	static propTypes = {
		projection: PropTypes.func.isRequired,
		coords: PropTypes.array.isRequired,
	}


	componentDidMount() {
	}

	render() {
		const {
			projection,
			coords,
		} = this.props;

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
				r={5}
				fill="#00CC99"
				stroke="#FFFFFF"
				className="marker"
			// onClick={() => this.handleMarkerClick(i)}
			/>

		);
	}
}

export default DotCenter;
