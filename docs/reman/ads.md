---
outline: deep
---


# Google `Adsense`

介绍：[Google Adsense](https://adsense.google.com/start/) 是谷歌公司的一项在线广告服务，它可以让网站发布商在其网站上显示谷歌公司的广告，并从中赚取收入。



## ads.txt

Google Adsense 需要在网站根目录下放置一个 `ads.txt` 文件，内容类似：

```txt
google.com, pub-5992841380729226, DIRECT, f08c47fec0942fa0
```

当然，在 `ReMan` 中，你不需要手动创建这个文件，只需要在后台【站点配置】=>【广告联盟】中填写 `ads.txt` 项的内容即可。

> ads.txt是一个IAB（Interactive Advertising Bureau）提出的用于防止广告欺诈的标准，旨在通过公开发布广告交易授权文件，来保护广告买卖双方的权益。

## 站点验证代码

如果，Google Adsense 需要你在网站中放置一个验证代码，那么你可以在后台【站点配置】=>【基本配置】中填写 `统计代码` 项的内容即可。


::: warning

Google Adsense 是需要 ads.txt, 所以如果你想使用Google Adsense的话，需要填写ads.txt的内容； 其余国内广告联盟，不太熟悉，若有特殊要求，请联系；

Google Adsense 是有自动广告的，所以目前ReMan不支持自定义广告位，如果你有这方面的需求，请联系交流；

:::
