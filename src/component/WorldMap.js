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

	constructor() {
		super();
		this.state = {
			worldData: null,
			refugeeData: null,
			directionMapping: null,
		};
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
					directionMapping: {
						...prevState.directionMapping,
						[item.properties.ADMIN]: geoCentroid(item),
					},
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
			worldData,
		} = this.state;

		// Can set a loader here
		if (!worldData) {
			return (
				<p>Loading</p>
			);
		}

		return (
			<div>
				<Border
					{...this.props}
					projection={this.projection}
					worldData={worldData}
				/>
			</div>
		);
	}
}

export default WorldMap;
