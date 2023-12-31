---
outline: deep
---



# 运行多个程序实例


场景：我想建立多个网站，对于授权码，该怎么办？


## 所有网站在同一台服务器上

你可以在同一台服务器上，运行多个程序实例，每个程序实例使用相同的授权码，这样就可以了

`ReMan`程序本身占用内存很低，基本是<100MB

对于es,mysql,redis是可以共用的，不需要重复安装，只需要在配置文件中，注意几点：

`config.yml`


```yml{3,5,10}
app:
  mode: debug # 程序运行的模式
  port: 4677 # 程序监听的端口
  license: your license code # 授权码
  metatag: unique-tag # 这里是程序的唯一标识，不同程序实例，必须不同
  # ...省略其他配置
es:
  enable: true # 目前必须为true
  address: http://127.0.0.1:9200 # elasticsearch的地址
  diskIndex: reman-disk-v1 # 索引名称，可改可不改
```

所以，目前有3个地方需要注意：

- 每个程序实例的`metatag`必须不同，这和redis的key有关，如果相同，会导致一些统计信息错误
- 每个程序实例的`port`必须不同，否则会导致端口冲突
- 每个程序实例的`diskIndex`必须不同，否则会导致索引冲突


## 在不同服务器上

如果你想在不同服务器上，运行多个网站，那么你需要购买多个授权码，每个程序实例使用不同的授权码即可

对于此点，我们提供增值授权码服务，在购买时，可以选择购买多个授权码，价格会有优惠：

第1个授权码：正常价格

第2-3个授权码：每个授权码`￥100`


至多可以购买2个增值授权码（因为增值授权码和正常授权码是等价的），即最多可以购买3个授权码。