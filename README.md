# QUI移动端框架

## 下拉刷新

### 介绍

qui的下拉样式使用js动态添加，只需要 引入js文件，并为想要设置下拉样式的html的容器添加drop-down类名，即可成功加载下拉样式  
![image](https://github.com/queuecat/qui-app/blob/main/image/%E4%B8%8B%E6%8B%89%E6%A0%B7%E5%BC%8F%E6%80%BB%E8%A7%88.gif?raw=true)

例如，以CSDN主页为例：

1. 为html容器添加类名  
![image](https://github.com/queuecat/qui-app/blob/main/image/%E4%B8%8B%E6%8B%89%E4%BB%8B%E7%BB%8D_%E6%B7%BB%E5%8A%A0%E7%B1%BB%E5%90%8D.png?raw=true)  
2. 引入DropDown.js文件  
3. 使用其中的构造函数*DropDown*实例化下拉对象，并调用对象的init()方法初始化  
4. 使用样式  
![image](https://github.com/queuecat/qui-app/blob/main/image/%E4%B8%8B%E6%8B%89%E6%A0%B7%E5%BC%8F%E4%BB%8B%E7%BB%8D.gif?raw=true)

### 使用

为html容器添加类名drop-down，并且引入DropDown.js文件，使用其中的构造函数*DropDown*实例化下拉对象

例如：

```html
<script src="./js/DropDown.js"></script>
<div class="drop-down"></div>
```

```javascript
new DropDown({
            obj: document.querySelector(".drop-down"),
        }).init();
```

构造函数接收一个option选项作为参数：

**obj**

- 类型：element
- 详情：接收类名drop-down的HTML容器dom对象

**color**

- 类型：color_name | color_name | rgb_number
- 默认值：rgb(0,0,0)
- 详情：下拉元素的颜色

**callback**

- 类型：function
- 详情：在下拉到到一定程度时，释放完成后将会执行该回调函数，在执行过程中，下拉样式将会保留一部分，直到执行完成后才会消失

## 模态框

![image-20210129235131645](https://github.com/queuecat/qui-app/blob/main/image/模态框.png?raw=true)

### 使用

1. 引入Modal.js文件，引入后将会获得Modal构造函数，使用new关键字构造即可获得模态框

```javascript
var modal = new Modal({
    type: "single", //single:单按钮,double:双按钮
    buttonInfo: [{
        name: "知道了",
        callback: function() {
            console.log("调用回调函数");
        }
    }], //格式：{name:按钮的文本信息,callback点击后回调函数}，单按钮取第一个，双按钮取前两个
    title: "分享给朋友", //标题
    data: ["Modal body text goes here.", "Woohoo, you're reading this text in a modal!"] //模态框内容信息，每个数组元素占用一行
});
```

2. 模态框对象函数
   - show：新构造的对象默认没有显现，需要使用show函数将其显现出来
   - hide：显现出来的模态框使用hide函数隐藏
   - clear：将模态框从页面中清理出去