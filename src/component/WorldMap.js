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
import Trajectory from './Trajectory';

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
			countryCenter: null,
		};
	}

	componentDidMount() {
		d3Json('/ne_50m_admin_0_countries_lakes.json', this.loadMap);
		d3Text('/to_germany_2014.csv', this.loadRefugee);

		// d3Text('/all_refugees12-17.csv', this.loadRefugee);

		// d3Text('/all_refugees12-17.csv').on('progress', evt => {
		// 	console.log(`Amount loaded: ${evt.loaded}`);
		// })
		// 	.get(data => {
		// 		console.timeEnd('totalTime:');
		// 		this.loadRefugee(null, data);
		// 	});
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
					countryCenter: {
						...prevState.countryCenter,
						[item.properties.ADMIN]: geoCentroid(item),
					},
				}));
			});
		});
	}

	loadRefugee = (err, res) => {
		// console.log(err, res);
		// console.table(res);
		this.setState({ refugeeData: cleanRefugee(res) });
	}

	// The projection fo the map
	projection = () => {
		const lo = 26.2206322; // x
		const la = 46.0485818; // y

		return geoMercator()
			.center([0, la])
			.rotate([-lo, 0])
			.scale(this.props.svgWidth * 0.55)
			.translate([this.props.svgWidth / 2, this.props.svgHeight / 2]);
	}

	renderCenter = () => (
		this.state.directionMapping.map(data => {
			{ /* console.log(data); */ }
			return (
				<DotCenter
					key={data.name}
					directionMapping={this.state.directionMapping}
					projection={this.projection}
					coords={data.coords}
					name={data.name}
				/>

			);
		})
	);

	renderTraject = () => (
		<Trajectory
			refugees={this.state.refugeeData}
			countryCenter={this.state.countryCenter}
			projection={this.projection}
		/>
	)

	render() {
		const {
			svgHeight,
			svgWidth,
		} = this.props;

		const {
			worldData,
			directionMapping,
			countryCenter,
			refugeeData,
		} = this.state;

		// console.log(this.state.directionMapping);
		// console.log('center', this.state.countryCenter);

		// Show loader if our required data has yet to be loaded
		if (!worldData || !countryCenter || !directionMapping) {
			console.log('in', this.state);
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
					projection={this.projection}
					worldData={worldData}
				/>

				{this.renderCenter()}

				{refugeeData && this.renderTraject()}

			</svg>
		);
	}
}

export default WorldMap;
