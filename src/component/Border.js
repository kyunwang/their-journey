import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { geoPath } from 'd3-geo';

class Border extends Component {
	render() {
		const {
			svgHeight,
			svgWidth,
			projection,
			worldData,
		} = this.props;

		console.log(this.props);
		return (
			<svg
				height={svgHeight}
				width={svgWidth}
				viewBox={`0 0 ${svgWidth - 200} ${svgHeight + 400}`}
			>

				<g className="countries">
					{
						worldData.map((d, i) => {
							{ /* console.log(d); */ }
							return (<path
								// onMouseEnter={() => { console.log('enterrerd'); }}
								key={d.properties.ADMIN}
								d={geoPath().projection(this.props.projection())(d)}
								className="country"
								fill={'#a3a3a3'}
								// fill={`rgba(38,50,56,${1 / worldData.length * i})`}
								stroke="#FFFFFF"
								strokeWidth={0.5}
							/>);
						})
					}
				</g>

				{/*
			<g className="markers">
				<circle
					cx={this.projection()([8, 48])[0]}
					cy={this.projection()([8, 48])[1]}
					r={10}
					fill="#E91E63"
					className="marker"
				/>
			</g> */}
			</svg>
		);
	}
}

export default Border;
