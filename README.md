# 微前端实现思路简介

微前端解决特定问题：技术栈无关

https://micro-frontends.org/

https://martinfowler.com/articles/micro-frontends.html

https://qiankun.umijs.org/zh



![A diagram showing 3 applications independently going from source control, through build, test and deployment to production](https://martinfowler.com/articles/micro-frontends/deployment.png)



![img](https://pic1.zhimg.com/v2-2efaa89ac52b38913bdcc0f3603c8e58_1440w.jpg?source=172ae18b)




## 微前端原理

1. 加载应用 （html-loader）
   1. 通过html，解析出页面加载的css，js，和容器html
2. css污染
   1. 每个子应用改在，用不同的css前缀
   2. 动态样式表
   3. shadow dom
   4. 。。。css in js
   5. scroped css
   6. 。。。。
3. js沙箱
   1. Eval(function(){js content})内部执行加载的js  完成了封装
   2. window.xx = 123
      1. proxy window
   3. window 快照
      1. 每次应用加载前，记录一下，应用写在的时候，恢复一下
4. 路由切换
   1. 拦截一下addEventListener， 拦截一下hashchage，popstate（history）记录



子应用生命周期

通信方案



## qiankun的实战









