# ionicApp


Hybrid App

ionic、cordova 、AngularJs、nodejs

Ionic

Ionic是一个新的、可以使用HTML5构建混合移动应用的用户界面框架，它自称为是“本地与HTML5的结合”。该框架提供了很多基本的移动用户界面范例，例如像列表（lists）、标签页栏（tabbars）和触发开关（toggleswitches）这样的简单条目。它还提供了更加复杂的可视化布局示例，例如在下面显示内容的滑出式菜单。

Ionic宣称他们极度强调性能，并且通过限制DOM交互、完全移除jQuery以及使用像translate(z)这种特定的硬件加速的CSS滤镜触发移动设备上GPU——与由动力不足的移动浏览器提供的交互相比这种方式提供了硬件加速的交互——等方式使速度最大化。


Cordova

Cordova是一个行动设备的API接口集，利用JavaScript存取这些接口可以调用诸如摄影机、罗盘等硬件系统资源。配合上一些基于HTML5、CSS3技术的UI框架，如jQueryMobile、DojoMobile或SenchaTouch，开发者得以快速地开发跨平台App而不需要编写任何的原生代码


Install

sudo npm install -g cordova ionic



ionic start myApp tabs|sidemenu|blank

ionic platform  add|remove    android|ios

ionic build android|ios

ionic emulate android|ios


# Start server

ionic serve 


![](https://github.com/EvanSole/ionicApp/blob/master/app.png)





