var currentFeature = "地区生产总值";
var isProvinceFeature = true;

$(function () {
    $('.toggle-nav').click(function () {
        toggleNavigation();
    });
    $('.toggle-nav1').click(function () {
        toggleNavigation1();
    });
    $('.bar_word').click(function () {
        toggleNavigation();
    });
    $('.bar1_word').click(function () {
        toggleNavigation1();
    });
    $('#ulBox li').click(function () {
        currentFeature = $(this).text();
        isProvinceFeature = true;
        $.get(`${baseUrl}${provinceApi[$(this).text()]}`, function (res) {
            isProvinceFeature = true;
            var result = valueFormat(res, true);
            generateProvinceMap(result, currentFeature);
            generateRank(result, currentFeature);
        })
    });
    $('#ulBox1 li').click(function () {
        currentFeature = $(this).text();
        isProvinceFeature = false;
        $.get(`${baseUrl}${cityApi[$(this).text()]}`, function (res) {
            isProvinceFeature = false;
            var result = valueFormat(res, false);
            generateCityMap(result, currentFeature);
            generateRank(result, currentFeature);
        })
    });
});

// The toggleNav function itself
function toggleNavigation() {
    if ($('#container').hasClass('high-priority')) {
        // Close Nav
        $('#container').removeClass('high-priority');
        $('#container').addClass('low-priority');
    } else {
        // Open Nav
        $('#container').removeClass('low-priority');
        $('#container').addClass('high-priority');
    }
    if ($('#container').hasClass('display-nav')) {
        // Close Nav
        $('#container').removeClass('display-nav');
    } else {
        // Open Nav
        $('#container').addClass('display-nav');
    }
}
function toggleNavigation1() {
    if ($('#container1').hasClass('high-priority')) {
        // Close Nav
        $('#container1').removeClass('high-priority');
        $('#container1').addClass('low-priority');
    } else {
        // Open Nav
        $('#container1').removeClass('low-priority');
        $('#container1').addClass('high-priority');
    }
    if ($('#container1').hasClass('display-nav1')) {

        // Close Nav
        $('#container1').removeClass('display-nav1');
    } else {
        // Open Nav
        $('#container1').addClass('display-nav1');
    }
}
var data = {
    city_data: ['国内生产总值', '在岗职工平均工资', '商品房平均销售价格',
        '第一产业增加值', '第二产业增加值', '第三产业增加值',
        '总人口', '医院、卫生院数', '社会商品零售总额','市GDP增长率',
        '市购房压力', '市GDP占省比例', '市医疗覆盖率'],
    province_data: ['地区生产总值', '第一产业增加值', '第二产业增加值', '第三产业增加值',
        '在岗职工平均工资', '商品房平均销售价格', '城市绿地面积',
        '平均寿命', '年末常住人口', '城镇人口', '乡村人口', '医院数量',
        '零售业销售总额', '居民人均可支配收入', '社会福利企业机构数',
        '居民消费水平', '省GDP增长率']
}

const ul = document.getElementById('ulBox')

for (var i = 0; i < data.province_data.length; i++) {
    var li = document.createElement('li');
    li.innerText = data.province_data[i];
    ul.appendChild(li);
}

const ul1 = document.getElementById('ulBox1')

for (var i = 0; i < data.city_data.length; i++) {
    var li = document.createElement('li');
    li.innerText = data.city_data[i];
    ul1.appendChild(li);
}

mapChart.on("click", function (params) {
    console.log(params)
    if(params.componentType == "geo" && !isProvinceFeature || params.componentSubType == "scatter" && isProvinceFeature)
        return;
    if(params.componentType == "timeline") {
        console.log(params.event);
        return;
    }
    console.log(regionReverseMap[params.name]);
    let regionName = regionReverseMap[params.name];
    if(typeof(regionName) == "undefined")
        regionName = params.name;
    window.location.href = `index.html?area=${regionName}&index=${currentFeature}`;
})

function getQueryVariable(variable) {
    var query = decodeURI(window.location.search.substring(1));
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable)
            return pair[1];
    }
    return false;
}


$(this).ready(function () {
    isProvinceFeature = Boolean(Number(getQueryVariable("isProvince")));
    let feature = getQueryVariable("zb");
    if(feature === false) {
        feature = "国内生产总值";
        isProvinceFeature = false;
    }
    let apiSrc = [];
    if(isProvinceFeature)
        apiSrc = provinceApi;
    else
        apiSrc = cityApi;
    console.log(apiSrc);
    $.get(`${baseUrl}${apiSrc[feature]}`, function (res) {
        var result = valueFormat(res, false);
        if(isProvinceFeature)
            generateProvinceMap(result, feature);
        else
            generateCityMap(result, feature);
        generateRank(result, feature);
    })
})