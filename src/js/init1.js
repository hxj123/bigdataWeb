// var echarts = require('echarts');

var chart = echarts.init(document.getElementById('chart-area'));
var option1,option2,option3;

$(function () {
    var href = decodeURI(location.href);
    if(href.indexOf('area')!=-1){
        temp = href.split('?')[1].split('&');
        var res = {}
        for(i = 0;i < temp.length;i++){
            res[temp[i].split('=')[0]] = temp[i].split('=')[1]
        }
        getData(res['index'], res['area'])
        $('.select1 .select-div').text(res['index'])
        $('.select2 .select-div').text(res['area'])
    }else{
        getData('地区生产总值', '北京市');
    }
});

function getData(index, area){
    var urlName;
    if(areaIndex == 0){
        urlName = province_api[index]
    }else{
        urlName = city_api[index]
    }
    $.ajax({
        url: 'http://cxyxh.top:8888/'+urlName+'/'+area,
        type: 'GET',
        success: function(res){
            resJson = $.parseJSON(res)
            data = resJson.data;
            unit = resJson.unit;
            expr = resJson.expr;
            key = [];
            value = [];
            for(d in data){
                if(d == '2018')
                    continue;
                key.push(d);
                value.push(data[d]);
            }
            $('.index-name').text(index);
            if(expr == null || expr.length == ''){
                expr = '暂无介绍';
                $('.index-introduction').css({textIndent:0})
            }else{
                $('.index-introduction').css({textIndent:'30px'})
            }
            if(expr.length > 150){
                expr = expr.substring(0, 150) + '..';
            }
            $('.index-introduction').text(expr);
            generateOption(key,value,unit,area,index);
            setOption();
        }
    })
}

function generateOption(key,value,unit,area,index){
    option1 = {
        title: {
            text: area+index,
            textStyle: {
                color: '#fff'
            },
            top:'5%',
            left:'10%'
        },
        color:['#ffffff'],
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data:[index],
            textStyle: {
                color: '#fff'
            },
            top: '5%'
        },
        grid: {
            left: '10%',
            right: '10%',
            top: '20%',
            containLabel: true
        },
        xAxis : [
            {
                name: '年',
                type : 'category',
                boundaryGap : false,
                data : key,
                axisLine: {
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
                name: unit,
                type : 'value',
                axisLine: {
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
                name:index,
                type:'line',
                stack: '总量',
                areaStyle: {},
                itemStyle: {
                    normal: {
                        barBorderColor: '#A0D5F8',
                        color: '#A0D5F8'
                    },
                    emphasis: {
                        color: '#A0D5F8'
                    },
                },
                data:value
            }
        ]
    };
    option2 = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            top:'5%',
            left:'10%'
        },
        grid: {
            left: '10%',
            right: '10%',
            top: '20%',
            containLabel: true
        },
        legend: {
            data:[index],
            textStyle: {
                color: '#fff'
            },
            top: '5%'
        },
        xAxis : [
            {
                name:'年',
                type : 'category',
                data : key,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
            }
        ],
        yAxis : [
            {
                name : unit,
                type: 'value',
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
            }
        ],
        series : [
            {
                name: index,
                type:'bar',
                barWidth: '60%',
                data: value,
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
    option3 = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            top:'5%',
            left:'10%'
        },
        grid: {
            left: '10%',
            right: '10%',
            top: '20%',
            containLabel: true
        },
        xAxis : [
            {
                name: unit,
                type: 'value',
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
            }
        ],
        yAxis : [
            {
                name: '年',
                type : 'category',
                data : key,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
            }
        ],
        series : [
            {
                name: index,
                type:'bar',
                barWidth: '60%',
                data: value,
                itemStyle:{
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
        ]
    };
}

function setOption(){
    var option;
    if(chartIndex == 0){
        option = option1;
    }else if(chartIndex == 1){
        option = option2;
    }else{
        option = option3;
    }
    chart.setOption(option);
}