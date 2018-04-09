$(document).ready(function() {

    (function() {

        var json = [{
            id: 1,
            name: '上午',
            child: [{
                id: '1',
                name: 'job01',
                message: '时间信息轴1'
            }, {
                id: '2',
                name: 'job02',
                message: '时间信息轴2'
            }, {
                id: '3',
                name: 'job03',
                message: '时间信息轴3'
            }]
        }, {
            id: 2,
            name: '中午',
            child: [{
                id: '1',
                name: 'job04',
                message: '时间信息轴4'
            }, {
                id: '2',
                name: 'job05',
                message: '时间信息轴5'
            }, {
                id: '3',
                name: 'job06',
                message: '时间信息轴6'
            }]
        }, {
            id: 3,
            name: '下午',
            child: [{
                id: '1',
                name: 'job07',
                message: '时间信息轴7'
            }, {
                id: '2',
                name: 'job08',
                message: '时间信息轴8'
            }, {
                id: '3',
                name: 'job09',
                message: '时间信息轴9'
            }]
        }];

        (function() {
            var idPre = "selection";
            var flag = false; //默认不创建新的select  
            var flag2 = false; //默认新的select下的option不存在.  
            var jsonObject = [],
                num = 0;

            function guazai(index, id, $s) {

                if (index === 1) {
                    jsonObject = json;
                    flag = true;
                }
                if (index === 2) {
                    jsonObject = json[id - 1].child;
                }
                num = jsonObject.length;
                var tempId = "",
                    tempValue = "",
                    str = "";
                for (var i = 0; i < num; i++) {
                    tempValue = jsonObject[i].name;
                    tempId = idPre + index + jsonObject[i].id;
                    str += "<option value='" + tempValue + "' id = '" + tempId + "'>" + tempValue + "</option>";
                }
                $($s).append(str);


            }
            guazai(1, 0, '#sel1');
            $("#sel1").change(function() {
                var str = '';
                if (!flag) {
                    $("#sel2 > option[value!='default']").remove();
                    flag2 = true;
                }
                if (flag) {
                    if (!flag2) {
                        str = "<h4>JobId:</h4><select class='form-control' name='select2' id='sel2'></select>";
                        $(this).after(str);
                        flag2 = true;
                    }
                    str = "<option value='default' id='" + idPre + 2 + "'>----请选择-----</option>";
                    $("#sel2").append(str);
                    flag = false;
                }
                //获得当前对象的id  
                var id = $(this).find("option:selected").attr("id");
                var i = idPre.length + 1;
                id = parseInt(id.substring(i, id.length));
                guazai(2, id, '#sel2');


                var ssmessage = jsonObject;
                var ssmesshtml = '';
                for (var i = 0; i < ssmessage.length; i++) {
                    console.log(ssmessage[i]);
                    ssmesshtml += '<li value=' + ssmessage[i].id + '>' + ssmessage[i].message + '</li>';

                }
                $("#ssInfor ul").html(ssmesshtml);
                console.log(jsonObject);

                $("#sel2").on('change',function(){
                	$("#ap-message").css({'display':'none'});
	            	$("#ap-job").css({'display':'block'});
                    $("#content-title").css({'display':'block'})

                    // 内容title
                    var messageVss = $(this).val();
                    $("#content-title").html(messageVss);

                    // 加载流程图
	            	init();
	            })
            });

            

            $("#ssInfor ul").on('click', 'li', function() {

            	$("#ap-message").css({'display':'block'});
            	$("#ap-job").css({'display':'none'});
            	$("#select").css({'display':'block'});
            	$("#autoperLoading").css({'display':'none'});
                $("#content-title").css({'display':'block'});

                var messageVss = $(this).text();
                $("#content-title").html(messageVss);

                // 基于准备好的dom，初始化echarts实例
                var myChart1 = echarts.init(document.getElementById('main'), 'macarons');
                // 指定图表的配置项和数据

                var date = ['2016/11/1', '2016/11/2', '2016/11/3', '2016/11/4', '2016/11/5', '2016/11/6', '2016/11/7', '2016/11/8', '2016/11/9', '2016/11/10',
                    '2016/11/11', '2016/11/12', '2016/11/13', '2016/11/14', '2016/11/15', '2016/11/16', '2016/11/17', '2016/11/18', '2016/11/19', '2016/11/20', '2016/11/21', '2016/11/22', '2016/11/23', '2016/11/24', '2016/11/25', '2016/11/26', '2016/11/27', '2016/11/28', '2016/11/29', '2016/11/30', '2016/12/1'
                ];


                function my_data() {
                    var data = [];
                    for (var i = 0; i < 31; i++) {
                        data.push(Math.round(Math.random() * 30));
                    };
                    return data;
                }

                function ecdata(more) {

                    return {
                        tooltip: {
                            trigger: 'axis',
                        },
                        title: {
                            text: "",
                            /*subtext: '昨日新增：',
				        subtextStyle: {
							fontSize:14,
							color : '#ff4a84'
						}*/
                        },

                        toolbox: {
                            show: true,
                            feature: {
                                mark: { show: true },
                                dataView: { show: true, readOnly: false },
                                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        legend: {
                            data: ['队列1', '队列2', '队列3']
                        },
                        calculable: true,
                        xAxis: {
                            name: '时间轴',
                            type: 'category',
                            boundaryGap: false,
                            data: date
                        },
                        yAxis: {
                            name: more,
                            type: 'value',
                            boundaryGap: [0, '100%']
                        },
                        dataZoom: [{
                            type: 'inside',
                            start: 84,
                            end: 100
                        }, {
                            start: 84,
                            end: 100,
                            handleSize: '80%',
                            handleStyle: {
                                color: '#fff',
                                shadowBlur: 3,
                                shadowColor: 'rgba(0, 0, 0, 0.6)',
                                shadowOffsetX: 2,
                                shadowOffsetY: 2
                            }
                        }],
                        series: [{
                                name: '队列1',
                                type: 'line',
                                smooth: false,
                                stack: '总量',
                                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                                data: my_data()
                            },
                            {
                                name: '队列2',
                                type: 'line',
                                stack: '总量',
                                smooth: true,
                                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                                data: my_data()
                            },
                            {
                                name: '队列3',
                                type: 'line',
                                stack: '总量',
                                smooth: true,
                                itemStyle: { normal: { areaStyle: { type: 'default' } } },
                                data: my_data()
                            }
                        ]
                    };

                }

                //初始化图表
                var demo = "提交次数";
                myChart1.setOption(ecdata(demo));

                $(function() {
                    $('#select').on('change', function() {
                        var val = $(this).val();
                        // 使用刚指定的配置项和数据显示图表。
                        myChart1.setOption(ecdata(val));
                    });
                });

                // 控制台打印数据的名称 
                myChart1.on('click', function(params) {
                    $('#my_date_set2').html(params);
                    console.log(params.value);

                });


            })

        })();

    })();

});