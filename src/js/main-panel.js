var minData = 0;
var maxData = 0
var range = 0;
var normalizedRange = 0;
var sqrtOptimizer = false;

/*
 * Transform the data form like {city: {year: val,...},...}
 * to the from like {year: [{name: city, value: val},...],...}
 */
function valueFormat(regionObj, isProvinceFeature) {
    let res = {};
    regionObj = JSON.parse(regionObj);
    regionObj = regionObj.data;
    for (let region in regionObj) {
        let yearObj = regionObj[region];
        if (isProvinceFeature)
            region = regionMap[region];
        for (let year in yearObj) {
            if(year == '2018')
                break;
            if (res[year] === undefined) {
                res[year] = new Array();
            }
            let val = yearObj[year];
            // if (val == 0 || val == -1) {
            //     continue;
            // }
            if(val == -1)
                val = 0;
            res[year].push({
                name: region,
                value: val
            });
        }
    }
    // filterate
    for (let year in res) {
        if (res[year].length === 0) {
            delete res[year];
            continue;
        }
        res[year].sort((x, y) => (x.value - y.value));
    }
    return res;
}

var mapOption = {
    baseOption: {
        timeline: {
            label: {
                formatter: (s => (new Date(s)).getFullYear())
            },
            x: '10%',
            width: '80%',
            tooltip: {
                show: false
            },
            autoPlay: false,
            axisType: 'category',
            playInterval: 3000,
            // currentIndex: ,
        },
        tooltip: {
            trigger: 'item'
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: 'rgba(120, 197, 237, 1)',
                    borderColor: '#1874CD',
                },
                emphasis: {
                    areaColor: 'rgb(108, 190, 251)',
                    borderColor: 'rgb(111, 146, 238)'
                }
            }
        },
    }
};


rankOption = {
    baseOption: {
        timeline: {
            show: false,
        },
        tooltip: {
            show: true
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: '#99d9ea'
            }, {
                offset: 1,
                color: '#3fa7dc'
            }]),
            shadowColor: 'rgba(0, 0, 0, 0.4)',
        }
    }
}

function findMinMax(data) {
    minData = Math.pow(2,31) - 1;
    maxData = 0;
    for(year in data) {
        for(let i = 0; i < data[year].length; i++) {
            cityVal = Number((data[year])[i].value);
            if(cityVal < minData)
                minData = cityVal;
            if(cityVal > maxData)
                maxData = cityVal;
        }
    }
    range = maxData - minData;
    normalizedRange = (maxData-minData) / range;
    if(normalizedRange > 0.9)
        sqrtOptimizer = true;
}

function generateCityMap(cityData, title) {
    findMinMax(cityData);
    var convertCityData = function (data) {
        var res = [];
        for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(Number(data[i].value))
                });
            }
        }
        return res;
    }
    let timeline = Object.keys(cityData);
    delete mapOption.options;
    mapOption.options = new Array();
    mapOption.options[0] = {
        timeline: {
            data: timeline
        },
        title: {
            text: title,
            subtext: '',
            x: 'center'
        },
        series: {
            name: title,
            type: 'scatter',
            mapType: 'china',
            coordinateSystem: 'geo',
            data: convertCityData(cityData[timeline[0]]),
            tooltip: {
                trigger: 'item',
                formatter: function (val) {
                    return val.data.name + '：' + val.value[2];
                }
            },
            symbolSize: function (val) {
                // console.log((val[2]-minData) / range);
                // let normalizedVal = (val[2]-minData) / range;
                // if(sqrtOptimizer)
                //     normalizedVal = Math.sqrt(normalizedRange);
                // return normalizedVal * 100;
                return 10
            },
        }
    };
    mapOption.options[0].timeline.currentIndex = -3;
    for (let i = 1; i < timeline.length; i++) {
        mapOption.options.push({
            series: {
                data: convertCityData(cityData[timeline[i]])
            }
        });
    }
    mapChart.setOption(mapOption, true);
}

function generateProvinceMap(provinceData, title) {
    findMinMax(provinceData);
    let timeline = Object.keys(provinceData);
    delete mapOption.options;
    mapOption.options = new Array();
    mapOption.options[0] = {
        timeline: {
            data: timeline,
            axisType: 'category',
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
        },
        title: {
            text: title,
            subtext: '',
            x: 'center'
        },
        dataRange: {
            min: minData,
            max: maxData * normalizedRange,
            x: "left",
            y: "bottom",
            calculable: true
        },
        series: {
            data: provinceData[timeline[0]],
            name: '数据',
            type: 'map',
            mapType: 'china',
            roam: false,
        },
        tooltip: {
            trigger: 'item',
            formatter: function (val) {
                // console.log(val.value);
                return val.data.name + '：' + val.value;
            }
        }
    };
    for (let i = 1; i < timeline.length; i++) {
        mapOption.options.push({
            series: {
                data: provinceData[timeline[i]]
            }
        });
    }
    // console.log(mapOption);
    mapChart.setOption(mapOption, true);
}

function generateRank(rankData, title) {
    let nameMap = k => k.name;
    let timeline = Object.keys(rankData);
    delete rankOption.options;
    rankOption.options = new Array();
    rankOption.options[0] = {
        timeline: {
            data: timeline
        },
        title: {
            text: `${title}排行榜`,
        },
        yAxis: {
            type: 'category',
            data: rankData[timeline[0]].map(nameMap)
        },
        series: {
            type: 'bar',
            data: rankData[timeline[0]]
        }
    };
    for (let i = 1; i < timeline.length; i++) {
        rankOption.options.push({
            yAxis: {
                data: rankData[timeline[i]].map(nameMap)
            },
            series: {
                data: rankData[timeline[i]]
            }
        });
    }
    rankChart.setOption(rankOption, true);
    rankChart.resize();
}

var mapChart = echarts.init(document.getElementById("map"), "walden");
var rankChart = echarts.init(document.getElementById("table"), "walden");
echarts.connect([mapChart, rankChart]);

window.onresize = function () {
    mapChart.resize();
    rankChart.resize();
};