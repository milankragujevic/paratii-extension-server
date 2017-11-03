'use strict'

const $ = require('jquery')

$(() => {
	let data = {
		type: 'PARATII_COMM',
		payload: {
			action: 'start',
			uri: window.location.hash.replace(/#/g, '')
		}
	}
	window.postMessage(data, '*')
	window.addEventListener('message', (event) => {
		if (event.data.type && event.data.type == 'PARATII_RESP') {
			console.log('Received message from extension...')
			console.log(event.data)
		}
		if (event.data.type && event.data.type == 'PARATII_DATA') {
			console.log('Received chunk data from extension...')
			let chunk = event.data.data
		}
	})
})
