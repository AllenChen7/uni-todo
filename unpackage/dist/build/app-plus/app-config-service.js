
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/js/index","pages/template/index","pages/login/index","pages/login/code","pages/login/index4","pages/index/show"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uView UI","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#909399","selectedColor":"#303133","backgroundColor":"#FFFFFF","borderStyle":"black","list":[{"pagePath":"pages/index/index","iconPath":"static/uview/example/component.png","selectedIconPath":"static/uview/example/component_select.png","text":"TODO"},{"pagePath":"pages/js/index","iconPath":"/static/uview/example/min_button.png","selectedIconPath":"/static/uview/example/min_button_select.png","text":"发布"},{"pagePath":"pages/template/index","iconPath":"static/uview/example/template.png","selectedIconPath":"static/uview/example/template_select.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"todo","compilerVersion":"2.9.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"TODO","enablePullDownRefresh":true}},{"path":"/pages/js/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"发布"}},{"path":"/pages/template/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/login/index","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/login/code","meta":{},"window":{"navigationBarTitleText":"登录获取验证码"}},{"path":"/pages/login/index4","meta":{},"window":{"titleNView":false}},{"path":"/pages/index/show","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
