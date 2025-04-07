class DataVisible {
    /**
     * 构造器
     */
    constructor(isStandard) {
        this.tip = ""
        this.isStandard = false
        this.option1 = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '0%',
                left: 'center'
            },
            series: [{
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [{
                        value: 1048,
                        name: '盐'
                    },
                    {
                        value: 735,
                        name: '水'
                    },
                    {
                        value: 580,
                        name: '蛋白质'
                    },
                    {
                        value: 484,
                        name: '脂肪'
                    },
                    {
                        value: 300,
                        name: '膳食纤维'
                    },
                    {
                        value: 300,
                        name: '多种维生素'
                    },
                    {
                        value: 300,
                        name: '碳水化合物'
                    },
                    {
                        value: 300,
                        name: '矿物质'
                    },
                    {
                        value: 300,
                        name: '常量元素'
                    },
                ]
            }]
        };

        // 指定图表的配置项和数据
        this.option2 = {
            title: {
                text: "历史摄入"
            },
            tooltip: {},
            legend: {
                data: ['摄入']
            },
            xAxis: {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#595C61'
                    },
                    rotate: 45
                },
                data: ["盐","水", "蛋白质", "脂肪", "膳食纤维", "多种维生素", "碳水化合物", "矿物质", "常量元素"]
            },
            yAxis: {},
            series: [{
                name: '摄入',
                type: 'bar',
                data: [100, 200, 360, 100, 100, 200, 100, 700, 200]
            }]
        };
    }

    /**
     * 初始化图标
     */
    initEcharts1() {
        console.log("init1");
        var myChart1 = echarts.init(document.getElementById('echart1'));
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(this.option1);
    }

    /**
     * 初始化图标
     */
    initEcharts2() {
        var myChart2 = echarts.init(document.getElementById('echart2'));
        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(this.option2);
    }

    //获取图表1
    getGrf1() {
        $.get(URL.getGRF1, (res) => {
            res = JSON.parse(res)[0];
            if (res.code == 1) {
                this.option1.series[0].data = res.data
                console.log(this.option1);
                this.initEcharts1()
            }
        })
    }
    getGrf2() {
        $.get(URL.getGRF2, (res) => {
            res = JSON.parse(res)[0];
            if (res.code == 1) {
                this.option2.series[0].data = res.data
                console.log(this.option2);
                this.initEcharts2()
            }
        })
    }

    getJudge() {
        $.ajax({
            url: URL.judgeHealth,
            async: false,
            data: {
                user_id: userID
            },
            success: (res) => {
                res = JSON.parse(res)[0]
                console.log(res);
                if (!this.code) {
                    this.tip = res.data.suggestion;
                } else {
                    this.tip = res.msg;
                }
            }
        })
    }

    /**
     * 生成路由导航的html字符串
     * @returns 路由导航栏的字符串
     */
    appendDataVisible() {
        console.log("hahah");
        let str = ""
        str += "<div class=\"userCenterCon\">" //<!-- 用户中心大容器 -->
        str += "<div class=\"tipsCon\">" //<!-- 提示语容器 -->
        if (this.isStandard) {
            str += "<p class=\"tip1\">您今日膳食符合膳食标准，真是太棒啦</p>"
            str += "<img src=\"./static/images/good.svg\" >"
        } else {
            str += "<p class=\"tip2\">" + this.tip + "</p>"
            str += "<img src=\"./static/images/up.svg\" >"

        }
        str += "</div>" //<!--  提示语容器 end -->
        str += "<div class=\"echartsCon\">" //<!-- 图标容器 -->
        str += "<div id=\"echart1\"></div>"
        str += "<div id=\"echart2\"></div>"
        str += "</div>" //<!-- 图标容器 end -->
        str += "</div>" //<!-- 用户中心大容器 end -->


        return str
    }
}