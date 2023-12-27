/**
 *
 * Main file of Chart.Funnel.js
 * @author Jone Casper
 * @email xu.chenhui@live.com
 *
 */

/* global window */
// "use strict";

// var Chart = require('chart.js');
// Chart = typeof(Chart) === 'function' ? Chart : window.Chart;

// require('./elements/element.trapezium.js')(Chart);
// require("./controllers/controller.funnel.js")(Chart);

// module.exports = Chart;

import * as  Chart from 'chart.js';

import elementTrapezium from './elements/element.trapezium';
import controllerFunnel from './controllers/controller.funnel';

let chart = Chart;
chart = elementTrapezium(chart)
chart = controllerFunnel(chart)

export default chart;