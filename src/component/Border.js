import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { geoPath } from 'd3-geo';


import * as d3 from 'd3';


import DotCenter from './DotCenter';

class Border extends Component {
	componentDidMount() {
		d3.selectAll('path')
			.data(this.props.worldData)
			.enter()
			.append('path')
			.attr('d', this.props.mapPath);
	}

	Plotting() {
		return (
			d3.selectAll('path')
				.data(this.props.worldData)
				.enter()
				.append('path')
				.attr('d', this.props.mapPath)
		);
	}

	render() {
		const {
			svgHeight,
			svgWidth,
			projection,
			worldData,
			mapPath,
			svgContainer,

			directionMapping,
		} = this.props;

		// console.log(this.props);
		return (
			<g>
				<g className="countries">
					{
						worldData.map((d, i) =>
							// { /* console.log(d); */ }
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


				<g className="markers">
					<circle
						cx={projection()([8, 48])[0]}
						cy={projection()([8, 48])[1]}
						r={10}
						fill="#E91E63"
						className="marker"
					/>

					{/* {
						directionMapping.map(data => {
							console.log(data);
							return (
								<DotCenter
									key={data.name}
									directionMapping={directionMapping}
									projection={projection}
									coords={data.coords}
									name={data.name}
								/>

							);
						})
					} */}
				</g>
			</g>
		);
	}
}

export default Border;
