const chart1 = echarts.init(document.getElementById('data-bottom-left'));
const chart2 = echarts.init(document.getElementById('data-bottom-center'));
const chart3 = echarts.init(document.getElementById('data-bottom-right'));
const chart4 = echarts.init(document.getElementById('data-top-right'));
const buildChart = echarts.init(document.getElementById('build'));
$(function () {
    (function () {
        let r = function (max) {
            let m = max || 10;
            return Math.floor(Math.random() * m);
        };

        let roofs = [
            /*三角形*/
            [1, 2, 3, 4, 5, 4, 3, 2, 1],
            /*凸*/
            [2, 2, 2, 4, 4, 4, 2, 2, 2],
            [2, 2, 2, 4, 20, 4, 2, 2, 2],
            [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
            [6, 6, 6, 6, 6, 5, 4, 3, 2, 1],
            [0.3, 1, 1.6, 2.5, 3, 3.5, 3.6, 3.7, 3.7, 3.6, 3.5, 3, 2.5, 1.6, 1, 0.3],
            [6, 6, 6, 6, 6, 2, 2, 2],
            [6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5],
            [1, 1, 1, 1, 1, 1.5, 2, 2.5, 3, 3.5, 4],
            [1, 1, 1, 1, 1, 1, 1],
            [4, 4, 4, 2, 2, 2, 4, 4, 4]

        ];
        let build = function (height) {
            let arr = [100];
            let l = 14;
            let h = height || 50;
            let addFloor = function (arr, l) {
                let a = [];
                for (let i = 0; i < arr.length; i++) {
                    a.push(arr[i] + l);
                }
                return a;
            };
            for (let i = 0; i < l; i++) {
                let newRoof = addFloor(roofs[r(11)], r(h));
                if (Math.random() < .5) {
                    newRoof.reverse()
                }
                arr = arr.concat(newRoof);
                if (Math.random() < .5) {
                    arr.push(0)
                }
            }
            return arr;
        };
        let building = build();
        let building2 = (function () {
            let b = build(100);
            for (let i = 0; i < b.length; i++) {
                if (b[i] > building[i]) {
                    b[i] = b[i] - building[i];
                }
            }
            return b;
        })()

        option = {
            stack: true,
            grid: {
                bottom: 0,
                top: 0,
                left: -10,
                right: -10
            },
            xAxis: {
                data: [],
                silent: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            yAxis: {
                silent: true,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            series: [{
                type: 'bar',
                data: building,
                itemStyle: {
                    normal: {
                        color: '#87CEFA'
                    }
                },
                animationDelay: function (idx) {
                    return idx * 10;
                }
            },
            {
                type: 'bar',
                data: building2,
                itemStyle: {
                    normal: {
                        color: '#1874CD'
                    }
                },
                animationDelay: function (idx) {
                    return idx * 10 + 300;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        };
        buildChart.setOption(option);
    })();
});

function setChart1Option(data1,data2,data3){
    option1 = {
        title : {
            text: '产业占比',
            x:'center',
            textStyle:{
                color:'#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color:['#4c75a1','#b74444','#dba662'],
        legend: {
            orient: 'vertical',
            x: 'left',
            top: '5',
            data:['第一产业增加值','第二产业增加值','第三产业增加值'],
            textStyle:{
                color: '#ffffff'
            }
        },
        series: [
            {
                name:'产业占比',
                type:'pie',
                radius: ['50%', '70%'],
                center: ['55%', '60%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: true,
                        position: 'outside'
                    },
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data:[
                    {value:data1, name:'第一产业增加值'},
                    {value:data2, name:'第二产业增加值'},
                    {value:data3, name:'第三产业增加值'},
                ]
            }
        ]
    }
    chart1.setOption(option1);
}

function setChart2Option(data1, data2){
    option2 = {
        title : {
            text: 'GDP占比',
            x:'center',
            textStyle:{
                color:'#fff'
            }
        },
        color:['#639fa9', '#91c7af'],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['地区生产总值', '其它生产总值'],
            textStyle:{
                color:'#fff'
            }
        },
        series : [
            {
                name: 'GDP占比',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:data1, name:'地区生产总值'},
                    {value:data2, name:'其它生产总值'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    chart2.setOption(option2);
}

function setChart3Option(max, datas){
    option3 = {
        title: {
            text: '省市雷达图',
            textStyle:{
                color:'#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params){
                values = params.data.value;
                var label = ['住房','工资','养老','经济','医疗'];
                var res = '';
                for(var i = 0;i < values.length;i++){
                    res += label[i] + '排名:' + (max - values[i] + 1) + '<br/>' 
                }
                return res;
            },
            textStyle:{
                align: 'left'
            },
            padding: 10,
        },
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
               }
            },
            center:['50%','55%'],
            indicator: [
               { name: '住房', max: max},
               { name: '工资', max: max},
               { name: '养老', max: max},
               { name: '经济', max: max},
               { name: '医疗', max: max},
            ]
        },
        series: [{
            name: '省市雷达图',
            type: 'radar',
            color:['#33efff'],
            data : datas
        }]
    };
    chart3.setOption(option3);
}

function setChart4Option(years, datas, title){
    var legend = title;
    if(title == '消费压力'){
        title += '(可支配收入/商品零售价格)'
    }else{
        title += '(平均工资/房价)'
    }
    option4 = {
        title : {
            text: title,
            x:'center',
            textStyle:{
                color:'#fff'
            }
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:'18%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : years,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine:{
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        series : [
            {
                name: legend,
                type:'bar',
                barWidth: '40%',
                data:datas,
                shadowColor: 'rgba(0, 0, 0, 0.4)',
                itemStyle:{
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#99d9ea'
                    }, {
                        offset: 1,
                        color: '#3fa7dc'
                    }]),
                    shadowColor: 'rgba(0, 0, 0, 0.4)',
                }
            }
        ]
    };
    chart4.setOption(option4);
}