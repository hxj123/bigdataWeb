import './select.js';
import {chart} from './chart.js'

console.log(chart.getOption()['dataset'])
console.log(chart.getOption()['dataset']['source'][0])
option = chart.getOption['dataset']['source'][0].splice(4,1);
console.log(option)
chart.setOption(option)