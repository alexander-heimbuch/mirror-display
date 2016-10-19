import Bluebird from 'bluebird'
import Horseman from 'node-horseman'
import config from 'config'

function parseLinks() {
	var results = [];
	$ = window.$ || window.jQuery

	$('.timelink a').each(function () {
		results.push($(this).attr('href'))
	})

	return results
}

function parseDetails() {
	$ = window.$ || window.jQuery
	var route = []

	var result = {}
	$('.rline').each(function () {
		var $step = $(this)

		if ($step.hasClass('mot_inter')) {
			route.push(result)
			result = {}
			return
		}

		if ($step.hasClass('routeEnd') || $step.hasClass('routeChange__IV')) {
			result.arrival = parseTime($step)
			return
		}

		if ($step.hasClass('routeStart') || $step.hasClass('routeChange')) {
			result.departure = parseTime($step)
			return
		}

		if ($step.hasClass('mot')) {
			result.product = parseProduct($step)
			return
		}
	})

	route.push(result);

	return {
		departure: parseTime($('.routeStart')),
		arrival: parseTime($('.routeEnd')),
		route: route
	}

	function parseTime($time) {
		var trimmed;
		$time.find('.bold').remove()
		trimmed = $time.text().trim()
		return trimmed.match(/([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/)[0]
	}

	function parseProduct($product) {
		return $product.text().trim()
	}
}

const connections = (start, destination) => new Bluebird((resolve, reject) => {
	new Horseman()
		.open(config.get('travel.query'))
		.type('input[name="REQ0JourneyStopsS0G"]', start)
		.type('input[name="REQ0JourneyStopsZ0G"]', destination)
		.click('.hauptbtn')
		.waitForNextPage()
		.evaluate(parseLinks)
		.then(resolve)
		.close()
		.catch(reject);
})

const details = (url) => new Bluebird((resolve, reject) => {
	new Horseman()
		.open(url)
		.evaluate(parseDetails)
		.then(resolve)
		.close()
		.catch(reject);
})

export default () =>
	connections(config.get('travel.start'), config.get('travel.destination'))
		.then((links) => Bluebird.resolve(links.slice(0, 2)))
		.map(details)
		.then((departures) => {
      let id = 1

      departures = departures.map((departure) => {
        departure.id = id++
        return departure
      })

      return Bluebird.resolve(departures)
    })
