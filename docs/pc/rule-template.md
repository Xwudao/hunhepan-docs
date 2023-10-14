---
outline: deep
---


# 规则说明


在【开发】界面里面【新建规则】即可！

![](/images/rule-template/image.png)


里面有模板，下面就模板仔细说明； 



## 搜索规则


**总体：**

```js

// 搜索规则

// 此函数可选，用以告诉引擎，可以设置哪些过滤参数
// 其中，filed的值为传递给search方法作为全局变量名，该全局变量的值为field_value或default
function filter() {
  return [{
    "label": "排序",
    "field": "order",
    "default": "asc",
    "values": [{
        "field_label": "升序",
        "field_value": "asc"
      },
      {
        "field_label": "降序",
        "field_value": "desc"
      }
    ]
  }]
}

// 此函必须存在，且返回List<rtnObj>
function search(keyword, page) {
  var rtnList = []
  /*
    // item 如下
    var rtnObj = {}
    rtnObj.title = 'disk_name'
    rtnObj.detail_url = 'url'
    rtnObj.other_info = 'other_info'
    rtnObj.image = 'https://example.com/example.png'
    rtnObj.tags = ['阿里', '百度'] 
    rtnList.push(rtnObj)
  */


  return rtnList
}

// 此函必须存在，且返回List<rtnObj>
function detail() {
  var rtnList = [];

  /*
   // item 如下
    var rtnObj = {}
    rtnObj.url = searchData.detail_url
    rtnObj.title = searchData.title
    rtnObj.pass = searchData.pass
    rtnObj.other_info = searchData.other_info
    
    rtnList.push(rtnObj)
  */
  return rtnList
}

```

需要有3个函数：

- `filter`
- `search`
- `detail`

用途分别是：告诉系统可以设置哪些过滤参数（filter）、进行搜索，将搜索结果返回（search）、以及解析出链接的解析函数（detail）


### filter

::: tip
`filter`函数在旧版中没有，该功能预计在混合盘pc版本`v0.1.8`添加
:::

`filter`函数返回举例：

```js
{
    "label": "排序", // 过滤选项名称
    "field": "order", // 过滤字段名
    "default": "asc", // 默认值
    "values": [{ // 过滤可选项列表
        "field_label": "升序", // 提示名称
        "field_value": "asc" // 过滤值
      },
      {
        "field_label": "降序",
        "field_value": "desc"
      }
    ]
  }
```


filter函数就需要返回上述字段的数组； 

**其中，`field`字段的值（上述也即order）会作为`search`函数作用域内的全局变量**



### search


`search`函数模板如下：

```js
// 此函必须存在，且返回List<rtnObj>
function search(keyword, page) {
  var rtnList = []
  /*
    // item 如下
    var rtnObj = {}
    rtnObj.title = 'disk_name'
    rtnObj.detail_url = 'url'
    rtnObj.other_info = 'other_info'
    rtnObj.image = 'https://example.com/example.png'
    rtnObj.tags = ['阿里', '百度'] 
    rtnList.push(rtnObj)
  */
  return rtnList
}
```

如上所示，简单解释一下：

1、该函数接收keyword(关键词)、page(页码)参数；应返回一个数组，数组元素应为一个对象(我们这里就把它叫做SearchData)，该对象可以**设置**如上一些属性；

2、该函数内可以使用从`filter`函数里面设置的一些全局变量，变量名是`field`字段的值



### detail


```js
// 此函必须存在，且返回List<rtnObj>
function detail() {
  var rtnList = [];

  /*
   // item 如下
    var rtnObj = {}
    rtnObj.url = searchData.detail_url
    rtnObj.title = searchData.title
    rtnObj.pass = searchData.pass
    rtnObj.other_info = searchData.other_info
    
    rtnList.push(rtnObj)
  */
  return rtnList
}
```

如上所示，简单解释一下：

1、该函数不接收任何参数；但应返回一个数组，数组元素应为一个对象，该对象可以**使用**如上一些属性；

2、在该函数内可以使用一个全局变量：`searchData`，注意search中的s是小写；这个`searchData`就是`search`函数返回的数组元素对象



## 发现规则


**总体**


```js

//发现规则，该规则内，必须有如下3个方法

// 此函必须存在，且返回List<tab>
function getTabs() {
  var rtnList = []

  /*
    var tab = {}
    //可设置如下属性
    tab.title = ''
    tab.params = {
      k1:v1,
      k2:v2,
    }
    tab.weight=1
    //其中data.params对象中的key-value，key会被注入到getList方法内当成全局变量
    rtnList.push(tab)
  
  */

  return rtnList;
}

// 此函必须存在，且返回List<object>
// 该方法内，可以访问由getTabs返回的ExploreTabData.params中的key-value（key是变量名）
function getList(page) {
  var rtnList = []

  /*
    var object = {}
    object.detail_url=''
    object.other_info=''
    object.title=''
    object.pass=''
    object.copy_text=['str1','str2']
    object.image=''
    object.tags = ['str1','str2']
    rtnList.push(listData)
  */

  return rtnList;
}


// 此函必须存在，且返回List<object>
// 该方法内会注入`exploreListData`变量，可以获取ExploreListData上面的属性
function detail() {
  var rtnList = []

  /*
    var object = {}
    object.other_info=''
    object.title=''
    object.url=''
    object.pass=''
    object.from_url='' // 暂时没用
    object.copy_text=['str1','str2']
    rtnList.push(detailData)
  */

  return rtnList;
}

```

同样需要有3个函数：

- `getTabs`
- `getList`
- `detail`

用途分别是：告诉系统有哪些分类Tab（getTabs）、由分类返回结果列表（getList）、以及解析出链接的解析函数（detail）



### getTabs

```js
// 此函必须存在，且返回List<tab>
function getTabs() {
  var rtnList = []

  /*
    var tab = {}
    //可设置如下属性
    tab.title = ''
    tab.params = {
      k1:v1,
      k2:v2,
    }
    tab.weight=1
    //其中data.params对象中的key-value，key会被注入到getList方法内当成全局变量
    rtnList.push(tab)
  
  */

  return rtnList;
}
```

说明：

1、返回数组，数组元素是tab，tab可以设置`title`, `params`, `weight`这些属性；

2、其中，params中`key`(上述是k1,k2)会被注入到`getList`当做全局变量名，其值是v1,v2


### getList

```js
// 此函必须存在，且返回List<object>
// 该方法内，可以访问由getTabs返回的ExploreTabData.params中的key-value（key是变量名）
function getList(page) {
  var rtnList = []

  /*
    var object = {}
    object.detail_url=''
    object.other_info=''
    object.title=''
    object.pass=''
    object.copy_text=['str1','str2']
    object.image=''
    object.tags = ['str1','str2']
    rtnList.push(listData)
  */

  return rtnList;
}
```

说明：

1、该函数需要接收一个页码参数(page)，返回结果数组，数组元素可以设置一些属性（见上述代码）

2、该函数内可使用由`getTabs`函数返回的全局变量


### detail

```js
// 此函必须存在，且返回List<object>
// 该方法内会注入`exploreListData`变量，可以获取ExploreListData上面的属性
function detail() {
  var rtnList = []

  /*
    var object = {}
    object.other_info=''
    object.title=''
    object.url=''
    object.pass=''
    object.from_url='' // 暂时没用
    object.copy_text=['str1','str2']
    rtnList.push(detailData)
  */

  return rtnList;
}
```

说明：

1、该函数需要返回数组，数组元素可以设置的属性见上述代码；

2、该函数内可以使用全局变量`exploreListData`，这个变量有一些属性可供使用，具体属性就是在`getList`函数里设置的属性