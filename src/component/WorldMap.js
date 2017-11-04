// Base worldmap from  https://medium.com/@zimrick/how-to-create-pure-react-svg-maps-with-topojson-and-d3-geo-e4a6b6848a98

import React, { Component } from 'react';
import {
	geoMercator,
	geoPath,
	geoCentroid,
} from 'd3-geo';
import {
	json as d3Json,
	csv as d3Csv,
	text as d3Text,
} from 'd3-request';

import { feature } from 'topojson-client';
import PropTypes from 'prop-types';

import Border from './Border';
import DotCenter from './DotCenter';

import { cleanRefugee } from '../cleanData';

class WorldMap extends Component {
	static propTypes = {
		svgHeight: PropTypes.number.isRequired,
		svgWidth: PropTypes.number.isRequired,
	}

	static defaultProps = {
		svgHeight: 800,
		svgWidth: 800,
	}

	constructor(props) {
		super(props);
		this.state = {
			worldData: null,
			refugeeData: null,
			directionMapping: [],
		};

		const lo = 26.2206322; // x
		const la = 46.0485818; // y

		this.geo = geoMercator();
		this.mapPath = geoPath().projection(this.geo);
		this.geo
			.center([0, la])
			.rotate([-lo, 0])
			.scale(props.svgWidth * 0.55)
			.translate([props.svgWidth / 2, props.svgHeight / 2]);
	}

	async componentDidMount() {
		await d3Json('/ne_50m_admin_0_countries_lakes.json', this.loadMap);
		await d3Text('/to_germany_2014.csv', this.loadRefugee);
	}

	loadMap = (err, res) => {
		this.setState({
			worldData: feature(res, res.objects.countries).features,
		}, () => {
			this.state.worldData.map(item => {
				this.setState(prevState => ({
					directionMapping: [
						...prevState.directionMapping,
						{
							name: item.properties.ADMIN,
							coords: geoCentroid(item),
						},
					],
				}));
			});
		});
	}

	loadRefugee = (err, res) => {
		this.setState({ refugeeData: cleanRefugee(res) });
	}

	projection = () => {
		const lo = 26.2206322; // x
		const la = 46.0485818; // y

		return geoMercator()
			.center([0, la])
			.rotate([-lo, 0])
			.scale(this.props.svgWidth * 0.55)
			.translate([this.props.svgWidth / 2, this.props.svgHeight / 2]);
	}

	render() {
		const {
			svgHeight,
			svgWidth,
		} = this.props;

		const {
			worldData,
			directionMapping,
		} = this.state;

		// Can set a loader here
		if (!worldData) {
			return (
				<p>Loading</p>
			);
		}

		return (
			<svg
				ref={el => (this.svgContainer = el)}
				height={svgHeight}
				width={svgWidth}
				viewBox={`0 0 ${svgWidth - 200} ${svgHeight + 400}`
				}
			>
				<Border
					{...this.props}
					svgContainer={this.svgContainer}
					projection={this.projection}
					// projection={this.geo}
					worldData={worldData}
					mapPath={this.mapPath}
					directionMapping={directionMapping}
				/>
				{
					directionMapping.map(data => {
						{ /* console.log(data); */ }
						return (
							<DotCenter
								key={data.name}
								directionMapping={directionMapping}
								projection={this.projection}
								coords={data.coords}
								name={data.name}
							/>

						);
					})
				}
			</svg>
		);
	}
}

export default WorldMap;
