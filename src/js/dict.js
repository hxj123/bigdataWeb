var chartIndex = 0;
var areaIndex = 0;
var province_api = {
    '地区生产总值': 'getRegionGDP',
    '第一产业增加值': 'getPrimaryIndustryIncr',
    '第二产业增加值': 'getSecondaryIndustryIncr',
    '第三产业增加值': 'getThirdIndustryIncr',
    '在岗职工平均工资':'getProvAverageSalary',
    '商品房平均销售价格':'getProvAverageHousePrice',
    '城市绿地面积':'getProvGreenArea',
    '平均寿命':'getAverageExpectedLifetime',
    '年末常住人口':'getPermResident',
    '城镇人口':'getTownPopulation',
    '乡村人口':'getCountryPopulation',
    '医院数量': 'getNumOfHospital',
    '零售业销售总额':'getRetailTotalSale',
    '居民人均可支配收入':'getDisposableIncome',
    '社会福利企业机构数':'getNumOfWelfareFirm',
    '居民消费水平':'getConsumptionLevel',
    '省GDP增长率': 'getProvGDPGrowthRate'
}

var city_api = {
    "市GDP增长率": "getCityGDPGrowthRate",
    "市GDP平均": "getCityGDPAverage",
    "市购房压力": "getHousePressure",
    "市GDP占省比例": "getCityGDPRatioOfProv",
    "市医疗覆盖率": "getCityMedicalCoverage",
    "国内生产总值": "getCityGDP",
    "在岗职工平均工资": "getCityAverageSalary",
    "商品房平均销售价格": "getCityAverageHousePrice",
    "第一产业增加值": "getCityPrimaryIndustryIncr",
    "第二产业增加值": "getCitySecondaryIndustryIncr",
    "第三产业增加值": "getCityThirdIndustryIncr",
    "总人口": "getCityPopulation",
    "医院、卫生院数": "getCityNumOfHospital",
    "社会商品零售总额": "getCityRetailTotalSale"
}