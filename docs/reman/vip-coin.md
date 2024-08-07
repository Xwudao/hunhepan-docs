---
outline: deep
---


# VIP 会员及积分体系

感觉大家还是对 VIP 会员和积分体系比较感兴趣，所以这里介绍一下。


##  卡密系统 

首先，还是得介绍下卡密系统，因为这个卡密系统就包含了 VIP 会员、积分和注册邀请机制。

![](/images/vip-coin/2024-08-05_220319.png)

如上图所示，基本上 ReMan 的卡密系统已经集齐了所有要素：

- 可设置使用次数
- 可设置过期时间
- 可备注
- 等等...


目前 ReMan 通过卡密实现各种码的发放，暂不支持支付宝、微信支付等；

你可能需要过能第三方发卡平台来实现用户的自动购买；或者，你可以手动发卡；


## VIP 会员

可以在**详情页策略**中设置对于VIP会员的特权；

- 需要VIP：只有VIP才能查看资源
- VIP或积分：VIP或者花费积分都可以查看资源
- 需要登录：需要登录才能查看资源

![](/images/vip-coin/2024-08-05_220617.png)

## 积分

搜索策略和详情页策略中都可以设置积分；

- 可以设置搜索是否消耗积分
- 可以设置访问资源是否消耗积分

![](/images/vip-coin/2024-08-05_220808.png)

## 注意

搜索策略和详情页策略是独立的，互不影响；