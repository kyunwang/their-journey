import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import {
	select,
	selectAll,
} from 'd3-selection';

import ReactDOM from 'react-dom';

class DotCenter extends Component {
	componentDidMount() {

	}

	componentDidUpdate() {
		console.log(this.props.directionMapping);
		const item = select(ReactDOM.findDOMNode(this.props.svgContainer)).selectAll('circle')
			.data(this.props.directionMapping, d => {
				console.log(d); return d.key;
			});
		// const item = select(this.getDOMNode()).selectAll('circle')
		// 	.data(this.props.directionMapping, d => {
		// 		console.log(); return d.key;
		// 	});

		// 	item.enter().append('circle')
		// 		.attr('class', 'item')
		// 		.attr('r', function (d) { return r(d.r); })
		// 		.attr('cx', function (d) { return x(d.x); })
		// 		.attr('cy', 0)
		// 		.style('stroke', '#3E6E9C')
		// 		.transition().duration(1000)
		// 		.attr('cy', function (d) { return y(d.y); })
		// 		.style('stroke', '#81E797');

		// 	item.exit().filter(':not(.exiting)') // Don't select already exiting nodes
		// 		.classed('exiting', true)
		// 		.transition().duration(1000)
		// 		.attr('cy', height)
		// 		.style('stroke', '#3E6E9C')
		// 		.remove();
	}

	render() {
		// const {

		// } = props;
		console.log(this.refs.test, this.props);
		return (
			// <text></text>
			<text
				x="0"
				y="35"
				fontFamily="Verdana"
				fontSize="35"
			>
				Hello, out there
			</text>
		);
	}
}

export default DotCenter;
