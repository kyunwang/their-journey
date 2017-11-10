import React from 'react';
import PropTypes from 'prop-types';

function Trajectory(props) {
	const {
		refugees,
		countryCenter,
		projection,
	} = props;
	return (

		refugees.map(item => {
			if (
				countryCenter[item.Destination] !== undefined
				&&
				countryCenter[item.Origin] !== undefined
			) {
				return (
					<line
						x1={projection()(countryCenter[item.Origin])[0]}
						y1={projection()(countryCenter[item.Origin])[1]
						}
						x2={projection()(countryCenter[item.Destination])[0]}
						y2={projection()(countryCenter[item.Destination])[1]}
						stroke="red"
						strokeWidth={2}
					/>
				);
			}
			return null;
		})

	);
}

Trajectory.propTypes = {
	refugees: PropTypes.array.isRequired,
	countryCenter: PropTypes.object.isRequired,
	projection: PropTypes.func.isRequired,
};

export default Trajectory;
