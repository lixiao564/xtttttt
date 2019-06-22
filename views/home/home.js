
$('#page').tabs({
    border: false,
    fit: true,
});
var data = [{
        parent: {
            title: '主页',
            url: '/views/home/mainpage.html'
        },
        // 怎么有的地方是数组，有的地方又是对象
        children: []
    },
    {
        parent: {
            title: '系统管理'
        },
        children: [{
                name: '角色',
                url: '/views/hero/hero.html'
            },
            {
                name: '用户',
                url: '/views/hero/user.html'
            }
        ]
    },
    {
        parent: {
            title: '基础信息管理'
        },
        children: [{
                name: '角色',
                url: '/views/user/user.html'
            },
            {
                name: '用户',
                url: '/views/user/user.html'
            }
        ]
    },
    {
        parent: {
            title: '客户管理'
        },
        children: [{
                name: '客户列表',
                url: '/views/customer/custom.html'
            },
            {
                name: '客户管理',
                url: '/views/customer/custom.html'
            }
        ]
    }
]
var i = 0;
var k = 0;
for (let ele of data) {

    var item = document.createElement("div");
    item.id = i;
    $('#menu').append(item);
    for (let n of ele.children) {
        var tt = document.createElement("p");
        tt.innerText = n.name;
        tt.id = 'p' + k;
        item.appendChild(tt);
        $('#p' + k).click(function () {
            if ($('#page').tabs('exists', n.name)) {
                $('#page').tabs('select', n.name);
            } else {
                $('#page').tabs('add', {
                    title: n.name,
                    href: n.url,
                    closable: true,
                })
            }
        })
        k++;
    }
    // 第一个问题：'#i'这个选择器是选择id='i'，不是变量
    // 第二个问题：你这个地方只是增加了一个html片段，没有加入到页面中，所以这个时候jquery取不到你想要的元素
    if (i == 0) {
        $('#' + i).panel({
            width: 120,
            height: 0,
            iconCls: 'icon-',
            title: ele.parent.title,
            collapsible: true,
            collapsed: true
        });
    } else {
        $('#' + i).panel({
            width: 120,
            height: 120,
            title: ele.parent.title,
            collapsible: true,
            collapsed: true
        });
    }
    i++;
}
$('#page').tabs('add', {
    title: '欢迎使用',
    href: '/views/home/mainpage.html',
    selected: true,
});
$('div.panel-header:first').click(function () {
    if ($('#page').tabs('exists', '欢迎使用')) {
        $('#page').tabs('select', '欢迎使用');
    } else {
        $('#page').tabs('add', {
            title: '欢迎使用',
            href: '/views/home/mainpage.html',
            selected: true,
        });
    }
})

var myEchart =  echarts.init(document.getElementById('echa'));
myEchart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  });
// 第三个问题：这是动态生成的，要重新渲染一下easyui的样式
$.parser.parse();
