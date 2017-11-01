// From https://medium.com/@zimrick/how-to-create-pure-react-svg-maps-with-topojson-and-d3-geo-e4a6b6848a98

import React, { Component } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import PropTypes from 'prop-types';

class WorldMap extends Component {
	static propTypes = {
		svgHeight: PropTypes.number.isRequired,
		svgWidth: PropTypes.number.isRequired,
	}

	static defaultProps = {
		svgHeight: 800,
		svgWidth: 800,
	}

	constructor() {
		super();
		this.state = {
			worldData: [],
		};
	}

	componentDidMount() {
		// fetch("/europe.json") // objects.europe
		// fetch("/world-110m.json")
		fetch('/ne_10m_admin_0_countries.json')
			.then(response => {
				if (response.status !== 200) {
					console.log(`There was a problem: ${response.status}`);
					return;
				}

				response.json().then(worldData => {
					console.log(worldData);
					this.setState({
						worldData: feature(worldData, worldData.objects.countries).features,
					});
				});
			});
	}


	projection() {
		const lo = 26.2206322; // x
		const la = 46.0485818; // y
		return geoMercator()
			.center([0, la])
			.rotate([-lo, 0])
			.scale(this.props.svgWidth * 0.55)
			// .scale(this.props.svgHeight / 2)
			.translate([this.props.svgWidth / 2, this.props.svgHeight / 2]);
	}

	render() {
		const {
			svgHeight,
			svgWidth,
		} = this.props;

		// console.log('props', this.props);


		return (
			// <svg width={svgWidth} height={svgHeight} viewBox={`0 0 800 450`}>
			// <svg width={1000} height={800}>
			<svg
				height={svgHeight}
				width={svgWidth}
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			>

				<g className="countries">
					{
						this.state.worldData.map((d, i) => (
							<path
								key={`path-${i}`}
								d={geoPath().projection(this.projection())(d)}
								className="country"
								fill={`rgba(38,50,56,${1 / this.state.worldData.length * i})`}
								stroke="#FFFFFF"
								strokeWidth={0.5}
							/>
						))
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

export default WorldMap;
