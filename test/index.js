'use strict';

const assert = require('assert');
const timekeeper = require('timekeeper');
const fn = require('../');

const dates = [
	{
		query: 'jasper',
		list: [
			'2016-10-17T12:00:00.000Z'
		]
	},
	{
		query: 'last 1 second',
		list: [
			'2016-10-17T11:59:59.000Z'
		]
	},
	{
		query: 'last 1 minute',
		list: [
			'2016-10-17T11:59:00.000Z'
		]
	},
	{
		query: 'last 1 hour',
		list: [
			'2016-10-17T11:00:00.000Z'
		]
	},
	{
		query: 'last 1 day',
		list: [
			'2016-10-16T12:00:00.000Z'
		]
	},
	{
		query: 'last 1 week',
		list: [
			'2016-10-10T12:00:00.000Z',
			'2016-10-11T12:00:00.000Z',
			'2016-10-12T12:00:00.000Z',
			'2016-10-13T12:00:00.000Z',
			'2016-10-14T12:00:00.000Z',
			'2016-10-15T12:00:00.000Z',
			'2016-10-16T12:00:00.000Z'
		]
	},
	{
		query: 'last 2 seconds',
		list: [
			'2016-10-17T11:59:58.000Z',
			'2016-10-17T11:59:59.000Z'
		]
	},
	{
		query: 'last 2 minutes',
		list: [
			'2016-10-17T11:58:00.000Z',
			'2016-10-17T11:59:00.000Z'
		]
	},
	{
		query: 'last 2 hours',
		list: [
			'2016-10-17T10:00:00.000Z',
			'2016-10-17T11:00:00.000Z'
		]
	},
	{
		query: 'last 2 days',
		list: [
			'2016-10-15T12:00:00.000Z',
			'2016-10-16T12:00:00.000Z'
		]
	},
	{
		query: 'last 2 weeks',
		list: [
			'2016-10-03T12:00:00.000Z',
			'2016-10-04T12:00:00.000Z',
			'2016-10-05T12:00:00.000Z',
			'2016-10-06T12:00:00.000Z',
			'2016-10-07T12:00:00.000Z',
			'2016-10-08T12:00:00.000Z',
			'2016-10-09T12:00:00.000Z',
			'2016-10-10T12:00:00.000Z',
			'2016-10-11T12:00:00.000Z',
			'2016-10-12T12:00:00.000Z',
			'2016-10-13T12:00:00.000Z',
			'2016-10-14T12:00:00.000Z',
			'2016-10-15T12:00:00.000Z',
			'2016-10-16T12:00:00.000Z'
		]
	},
	{
		query: 'next 1 second',
		list: [
			'2016-10-17T12:00:01.000Z'
		]
	},
	{
		query: 'next 1 minute',
		list: [
			'2016-10-17T12:01:00.000Z'
		]
	},
	{
		query: 'next 1 hour',
		list: [
			'2016-10-17T13:00:00.000Z'
		]
	},
	{
		query: 'next 1 day',
		list: [
			'2016-10-18T12:00:00.000Z'
		]
	},
	{
		query: 'next 1 week',
		list: [
			'2016-10-18T12:00:00.000Z',
			'2016-10-19T12:00:00.000Z',
			'2016-10-20T12:00:00.000Z',
			'2016-10-21T12:00:00.000Z',
			'2016-10-22T12:00:00.000Z',
			'2016-10-23T12:00:00.000Z',
			'2016-10-24T12:00:00.000Z'
		]
	},
	{
		query: 'next 2 seconds',
		list: [
			'2016-10-17T12:00:01.000Z',
			'2016-10-17T12:00:02.000Z'
		]
	},
	{
		query: 'next 2 minutes',
		list: [
			'2016-10-17T12:01:00.000Z',
			'2016-10-17T12:02:00.000Z'
		]
	},
	{
		query: 'next 2 hours',
		list: [
			'2016-10-17T13:00:00.000Z',
			'2016-10-17T14:00:00.000Z'
		]
	},
	{
		query: 'next 2 days',
		list: [
			'2016-10-18T12:00:00.000Z',
			'2016-10-19T12:00:00.000Z'
		]
	},
	{
		query: 'next 2 weeks',
		list: [
			'2016-10-18T12:00:00.000Z',
			'2016-10-19T12:00:00.000Z',
			'2016-10-20T12:00:00.000Z',
			'2016-10-21T12:00:00.000Z',
			'2016-10-22T12:00:00.000Z',
			'2016-10-23T12:00:00.000Z',
			'2016-10-24T12:00:00.000Z',
			'2016-10-25T12:00:00.000Z',
			'2016-10-26T12:00:00.000Z',
			'2016-10-27T12:00:00.000Z',
			'2016-10-28T12:00:00.000Z',
			'2016-10-29T12:00:00.000Z',
			'2016-10-30T12:00:00.000Z',
			'2016-10-31T12:00:00.000Z'
		]
	},
	{
		query: 'last 2 tuesdays',
		list: [
			'2016-10-04T12:00:00.000Z',
			'2016-10-11T12:00:00.000Z'
		]
	},
	{
		query: 'next 2 tuesdays',
		list: [
			'2016-10-18T12:00:00.000Z',
			'2016-10-25T12:00:00.000Z'
		]
	}
];

describe('', function () {

	before(function () {
		timekeeper.freeze(new Date('2016-10-17T12:00:00.000Z'));
	});

	after(function () {
		timekeeper.reset();
	});

	it('should properly create date ranges', function () {
		dates.forEach(( date ) => {
			assert.deepEqual(fn(date.query).map(( d ) => { return d.toISOString(); }), date.list);
		});
	});

});

describe('', function () {

	const offset = new Date('2016-10-17T12:00:00.000Z');

	it('should properly create date ranges with offset', function () {
		dates.forEach(( date ) => {
			assert.deepEqual(fn(date.query, offset).map(( d ) => { return d.toISOString(); }), date.list);
		});
	});

});
