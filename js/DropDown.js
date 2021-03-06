window.onload = function() {
    //为对象插入CSS样式
    function insertStyle(obj, attrs) {
        for (const attr in attrs) {
            obj.style[attr] = attrs[attr];
        }
    }

    //构造函数
    function DropDown(option) {
        //选项参数
        this.obj = option.obj; //容器对象
        this.callback = option.callback; //刷新回调函数
        this.color = option.color ? option.color : "#000";


        this.movePosition = 0; //计算移动距离
        this.opacity = 0; //计算透明度
        this.moveEnd = (obj) => {
            var target = 0;
            var info = this.info;
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                var height = parseInt(obj.style.height.split("px")[0]);
                var width = parseInt(obj.style.width.split("px")[0]);
                var marginTop = parseInt(obj.style.marginTop.split("px")[0]);
                var infoHeight = parseInt(info.style.height.split("px")[0]);

                var y = (target - height) / 10;
                y = y > 0 ? Math.ceil(y) : Math.floor(y);
                var x = (target - width) / 10;
                x = x > 0 ? Math.ceil(x) : Math.floor(x);
                var m = (0 - marginTop) / 10;
                m = m > 0 ? Math.ceil(m) : Math.floor(m);

                var iy = (target - infoHeight) / 10;
                iy = iy > 0 ? Math.ceil(iy) : Math.floor(iy);

                info.style.height = infoHeight + iy + "px";
                obj.style.width = width + x + "px";
                obj.style.height = height + y + "px";
                if (height < 20) {
                    obj.style.opacity = height < 10 ? 0 : height / 40;
                }
                if (height < 25) {
                    info.style.opacity = height < 10 ? 0 : height / 40;
                }
                if (height < 10) {
                    obj.style.marginTop = marginTop + m + "px";
                }
                if (height == target) {
                    clearInterval(obj.timer);
                    obj.style.marginTop = "0px";
                    obj.style.display = "none";
                }

            }, 15)
        }
        this.move = (obj, callback) => {
            var moveEndObj = this;
            var target = callback ? 20 : 0;
            var info = this.info;
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                var height = parseInt(obj.style.height.split("px")[0]);
                var width = parseInt(obj.style.width.split("px")[0]);
                var marginTop = parseInt(obj.style.marginTop.split("px")[0]);
                var infoHeight = parseInt(info.style.height.split("px")[0]);

                var y = (target - height) / 10;
                y = y > 0 ? Math.ceil(y) : Math.floor(y);
                var x = (target - width) / 10;
                x = x > 0 ? Math.ceil(x) : Math.floor(x);
                var m = (0 - marginTop) / 10;
                m = m > 0 ? Math.ceil(m) : Math.floor(m);


                var iy = (target - infoHeight) / 10;
                iy = iy > 0 ? Math.ceil(iy) : Math.floor(iy);

                info.style.height = infoHeight + iy + "px";
                obj.style.width = width + x + "px";
                obj.style.height = height + y + "px";
                //改变字体内容
                if (obj.style.height > 100) {
                    info.innerHTML = "松开刷新";
                } else {
                    info.innerHTML = "下拉刷新";
                }
                if (height < 25) {
                    info.style.opacity = height < 10 ? 0 : height / 40;
                }
                if (height < 20) {
                    obj.style.opacity = height < 10 ? 0 : height / 40;
                }
                if (height < 10) {
                    obj.style.marginTop = marginTop + m + "px";
                }
                if (height == target) {
                    clearInterval(obj.timer);
                    callback && callback();
                    moveEndObj.moveEnd(obj);
                    console.log("test");

                }

            }, 15)
        }
        this.dropTouchStartFun = (event) => {
            clearInterval(this.circ.timer);
            this.movePosition = event.targetTouches[0].pageY;
            // this.circ.style.marginTop = "10px";
        }
        this.dropTouchMoveFun = (event) => {

            var move = event.targetTouches[0].pageY - this.movePosition;
            move = move > 5 ? 5 : move;
            this.opacity += move;
            //圆的长宽变化
            this.circ.style.width = parseInt(this.circ.style.width.split("px")[0]) + move + "px";
            this.circ.style.height = parseInt(this.circ.style.height.split("px")[0]) + move + "px";
            //圆容器的margin-top
            if (parseInt(this.circ.style.width.split("px")[0]) <= 0 && move < 0 && parseInt(this.circ.style.marginTop) > 0) {
                this.circ.style.marginTop = parseInt(this.circ.style.marginTop) + move + "px";
            }
            if (move > 0 && parseInt(this.circ.style.marginTop) < 10) {
                this.circ.style.marginTop = parseInt(this.circ.style.marginTop) + move + "px";
            }
            //文字长度及透明度变化
            if (parseInt(this.circ.style.width.split("px")[0]) > 20 && move > 0) {
                this.info.style.height = parseInt(this.info.style.height.split("px")[0]) + (parseInt(this.info.style.height.split("px")[0]) > 25 ? 0 : move) + "px";
                this.info.style.opacity = parseInt(this.info.style.opacity) + (this.opacity - 20) > 20 ? 1 : (this.opacity - 20) / 20;
            }
            if (parseInt(this.circ.style.width.split("px")[0]) < 45 && move < 0) {
                this.info.style.height = parseInt(this.info.style.height.split("px")[0]) + (parseInt(this.info.style.height.split("px")[0]) >= 0 ? move : 0) + "px";
                this.info.style.opacity = parseInt(this.info.style.opacity) - (this.opacity - 20) > 20 ? 0 : (this.opacity - 20) / 20;

            }
            //改变字体内容
            if (parseInt(this.circ.style.width.split("px")[0]) > 100) {
                this.info.innerHTML = "松开刷新";
            } else {
                this.info.innerHTML = "下拉刷新";
            }
            //圆的透明变化
            if (parseInt(this.circ.style.width.split("px")[0]) > 5) {
                this.circ.style.opacity = parseInt(this.circ.style.opacity) + this.opacity > 40 ? 1 : this.opacity / 40;
            } else {
                this.circ.style.opacity = 0;
                this.opacity = 0;
            }

            this.movePosition = event.targetTouches[0].pageY;
            if (this.obj.scrollTop === 0 && move > 0) {
                if (parseInt(this.circ.style.width.split("px")[0]) > 1) {
                    this.circ.style.display = "block";
                }
            }
        }
        this.dropTouchEndFun = (event) => {
            event.preventDefault();
            if (parseInt(this.circ.style.width.split("px")[0]) <= 0) {
                this.circ.style.display = "none";
            }
            if (parseInt(this.circ.style.width.split("px")[0]) > 100) {
                this.move(this.circ, this.callback);
            } else {
                this.move(this.circ);
            }
            this.movePosition = 0;
            this.opacity = 0;
        }
        this.init = function() {
            var circBox = document.createElement("div");
            this.circBox = circBox;
            insertStyle(circBox, {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            });
            var circ = document.createElement("div");
            this.circ = circ;
            insertStyle(circ, {
                maxWidth: "20px",
                width: "0px",
                height: "0px",
                border: this.color + " solid 1px",
                borderRadius: "20px",
                display: "none",
                opacity: "0",
                marginTop: "0px"

            });
            var info = document.createElement("div");
            this.info = info;
            info.innerHTML = "下拉刷新"
            insertStyle(info, {
                width: "100%",
                height: "0px",
                textAlign: "center",
                overflow: "hidden",
                fontSize: "15px",
                // display: "none",
                opacity: "0",
                // margin: "0px"

            });
            this.circBox.appendChild(circ);
            this.obj.insertBefore(info, this.obj.children[0]);
            this.obj.insertBefore(circBox, this.obj.children[0]);
            this.obj.addEventListener("touchstart", this.dropTouchStartFun);
            this.obj.addEventListener("touchmove", this.dropTouchMoveFun);
            this.obj.addEventListener("touchend", this.dropTouchEndFun);
        }
    }
    new DropDown({
        obj: document.querySelector(".drop-down"),
        callback: () => {
            console.log(123);
        }
    }).init();
}