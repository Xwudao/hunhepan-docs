---
outline: deep
---

# 开放API


这里提供一部分开放API，方便开发者使用。


## 获取Tab列表



`https://api.hunhepan.com/v1/extab/list_all`

`GET`

返回示例：

```json
{
    "code": 200,
    "msg": "请求成功",
    "data": [
        {
            "id": 14,
            "create_time": "2023-08-07T14:58:26+08:00",
            "update_time": "2023-09-20T14:16:01+08:00",
            "name": "最新热门",
            "key": "latest-hot",
            "desc": "最新热门",
            "item_order": 58,
            "show": true,
            "edges": {}
        }
    ]
}
```

## 通过TabID获取资源列表

`https://api.hunhepan.com/v1/extab/raw_disks/14?page=1&size=15`

`GET`

**解释：**

- `page`：页码
- `size`：每页数量
- `14`：TabID


返回示例：

```json
{
  "code": 200,
  "msg": "ok",
  "data": {
    "list": [
      {
        "create_time": "2023-09-22T15:22:43+08:00",
        "disk_id": "b10b7d3e1a4e",
        "disk_name": "嫌疑犯X的献身",
        "disk_pass": "",
        "disk_type": "QUARK",
        "doc_id": "clmu9ydg601wizid3qjb9uoxo",
        "edges": {},
        "enabled": true,
        "ex_tab_id": 14,
        "files": [
          "file:嫌疑犯X的献身印度版.Jaane.Jaan.2023.HD1080P.官方中字.霸王龙压制组T-Rex.mp4"
        ],
        "id": 596457,
        "key_cate_id": 0,
        "link": "https://pan.quark.cn/s/b10b7d3e1a4e?entry=ujuso&from=index",
        "share_user": "未***域",
        "shared_time": "1695358691",
        "update_time": "2023-09-22T15:22:43+08:00"
      }
    ],
    "total": 25
  }
}
```


## 获取最新入库资源列表

`https://api.hunhepan.com/v1/raw_disk/latest_with_extab?page=1&size=15`


`GET`

返回示例：

```json
{
  "code": 200,
  "msg": "ok",
  "data": {
    "list": [
      {
        "create_time": "2023-09-22T15:22:43+08:00",
        "disk_id": "b10b7d3e1a4e",
        "disk_name": "嫌疑犯X的献身",
        "disk_pass": "",
        "disk_type": "QUARK",
        "doc_id": "clmu9ydg601wizid3qjb9uoxo",
        "edges": {},
        "enabled": true,
        "ex_tab_id": 14,
        "files": [
          "file:嫌疑犯X的献身印度版.Jaane.Jaan.2023.HD1080P.官方中字.霸王龙压制组T-Rex.mp4"
        ],
        "id": 596457,
        "key_cate_id": 0,
        "link": "https://pan.quark.cn/s/b10b7d3e1a4e?entry=ujuso&from=index",
        "share_user": "未***域",
        "shared_time": "1695358691",
        "update_time": "2023-09-22T15:22:43+08:00"
      }
    ],
    "total": 25
  }
}
```