import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { geoPath } from 'd3-geo';

class Border extends Component {
	static propTypes = {
		worldData: PropTypes.array.isRequired,
		projection: PropTypes.func.isRequired,
	}

	componentDidMount() {
	}

	render() {
		const {
			worldData,
			projection,
		} = this.props;

		return (
			<g className="countries">
				{
					worldData.map(d =>
						(<path
							// onMouseEnter={() => { console.log('enterrerd'); }}
							key={d.properties.ADMIN}
							d={geoPath().projection(projection())(d)}
							className="country"
							fill={'#a3a3a3'}
						// fill={`rgba(38,50,56,${1 / worldData.length * i})`}
						/>),
					)
				}
			</g>
		);
	}
}

export default Border;
