var chart1Option = [{value:335, name:'第一产业增加值'},
{value:310, name:'第二产业增加值'},
{value:234, name:'第三产业增加值'}];
var chart2Option = {};
var chart3Option = {};
var chart4Option = {};
getProvinceData('北京市','2017')
function getProvinceData(area, year){
    $.ajax({
        url: 'http://cxyxh.top:8888/getProvData/'+area+'/'+year,
        type: 'GET',
        success: function(res){
            resJson = $.parseJSON(res)
            setChart1Option(resJson['第一产业增加值'],
                resJson['第二产业增加值'],resJson['第三产业增加值']);
            setChart2Option(resJson['地区生产总值'], resJson['其它生产总值']);
            let t1 = resJson['省医疗覆盖率'],t2 = resJson['省消费压力'];
            let data1 = [],data2 = [],value1 = [],value2 = [];
            for(k in t1){
                data1.push(k);
                value1.push(t1[k]);
            }
            for(k in t2){
                data2.push(k);
                value2.push(t2[k]);
            }
            setChart3Option(data1, value1);
            setChart4Option(data2, value2, '消费压力');
        }
    });
}

function getCityData(area, year){
    $.ajax({
        url: 'http://cxyxh.top:8888/getCityData/'+area+'/'+year,
        type: 'GET',
        success: function(res){
            resJson = $.parseJSON(res)
            setChart1Option(resJson['第一产业增加值'],
                resJson['第二产业增加值'],resJson['第三产业增加值']);
            setChart2Option(resJson['国内生产总值'], resJson['其它生产总值']);
            let t1 = resJson['市医疗覆盖率'],t2 = resJson['市购房压力'];
            let data1 = [],data2 = [],value1 = [],value2 = [];
            for(k in t1){
                data1.push(k);
                value1.push(t1[k]);
            }
            for(k in t2){
                data2.push(k);
                value2.push(t2[k]);
            }
            setChart3Option(data1, value1);
            setChart4Option(data2, value2, '购房压力');
        }
    });
}
