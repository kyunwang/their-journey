import {
	csvParseRows,
} from 'd3-dsv';

function cleanRefugee(res) {
	let keys = [];

	const header = res.indexOf('"Country');
	res = res.slice(header);

	const allData = csvParseRows(res, map);
	return allData;

	function map(d, i) {
		if (i === 0) {
			keys = d;
			return;
		}
		return {
			[keys[0]]: d[0],
			[keys[1]]: d[1],
			[keys[2]]: d[2],
			[keys[3]]: d[3],
			[keys[4]]: d[4],
		};
	}
}

export { cleanRefugee };
