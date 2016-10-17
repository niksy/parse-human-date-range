'use strict';

const parse = require('date.js');
const dateRange = require('date-range');
const days = require('days');

const quantifiers = ['day', 'week', 'month', 'year', 'second', 'minute', 'hour'];
const travelPast = ['last', 'previous'];
const travelFuture = ['next'];

const regex = new RegExp(`^(${travelFuture.join('|')}|${travelPast.join('|')}) (\\d{1,}) (${quantifiers.join('s?|')}s?|${days.join('s?|')}s?)$`, 'i');

/**
 * @param  {String} quantifier
 *
 * @return {Object}
 */
function getRangeData ( quantifier ) {

	let rangeType = dateRange.DAY;
	let startRange = 'day';

	if ( /seconds?/i.test(quantifier) ) {
		rangeType = dateRange.SEC;
		startRange = 'second';
	} else if ( /minutes?/i.test(quantifier) ) {
		rangeType = dateRange.MIN;
		startRange = 'minute';
	} else if ( /hours?/i.test(quantifier) ) {
		rangeType = dateRange.HOUR;
		startRange = 'hour';
	} else if ( new RegExp(`${days.join('s?|')}s?`, 'i').test(quantifier) ) {
		rangeType = dateRange.DAY * 7;
		startRange = quantifier;
	}

	return {
		rangeType: rangeType,
		startRange: startRange
	};

}

/**
 * @param  {String} str
 * @param  {Date} offset
 *
 * @return {Date[]}
 */
module.exports = ( str, offset ) => {

	offset = offset || new Date();

	const res = regex.exec(str.trim());
	let range = [offset];

	if ( res === null ) {
		return range;
	}

	const travel = res[1];
	const number = res[2];
	const quantifier = res[3];

	const rangeData = getRangeData(quantifier);
	const rangeType = rangeData.rangeType;
	const startRange = rangeData.startRange;

	if ( travelPast.indexOf(travel) !== -1 ) {
		range = dateRange(parse(`${number} ${quantifier} ago`, offset), parse(`1 ${startRange} ago`, offset), rangeType);
	} else if ( travelFuture.indexOf(travel) !== -1 ) {
		range = dateRange(parse(`in 1 ${startRange}`, offset), parse(`in ${number} ${quantifier}`, offset), rangeType);
	}

	return range;

};
