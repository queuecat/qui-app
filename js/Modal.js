//为对象插入CSS样式
function insertStyle(obj, attrs) {
    for (const attr in attrs) {
        obj.style[attr] = attrs[attr];
    }
}

function Modal(option) {
    this.init = function() {
        if (!option.title) {
            throw "title is not undefined"
        }
        if (!option.buttonInfo) {
            throw "buttonInfo is not undefined"
        } else {
            if (option.buttonInfo.length <= 0) {
                throw "buttonInfo.length < 0"
            }
            for (let index = 0; index < option.buttonInfo.length; index++) {
                if (typeof(option.buttonInfo[index]) !== 'object') {
                    throw "buttonInfo index:" + index + "  is not object"
                } else if (!option.buttonInfo[index].name) {
                    throw "buttonInfo.name is not undefined"
                } else if (!option.buttonInfo[index].callback) {
                    throw "buttonInfo.callback is not undefined"
                }
            }
        }
        var modal = document.createElement("div");
        insertStyle(modal, {
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.2)",
            display: "none",
            top: 0
        });
        var content = `
        <div id="modal-main" style="position: absolute;bottom: 0;width: 100%;border-radius: 15px 15px 0 0;background-color: #fff;transition: transform .5s;transform: translateY(100%);">
        <h4 style="padding: 20px 0 15px 0;text-align: center;">${option.title}</h4>
        <div style="padding: 15px;display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
        `;
        var data = option.data;
        for (let index = 0; index < data.length; index++) {

            content += `<p style="margin-bottom: 10px;">${data[index]}</p>`;
        }
        content += `
            </div>
        <div style="display: flex;justify-content: center;align-items: center;padding: 10px;">
            <button id="modal-button" style="background-color: #4395ff;color: #fff;font-size: 15px;margin: 5px;-webkit-tap-highlight-color: transparent;border: none;outline: none;padding: 10px 0;width: 70%;border-radius: 20px;">${option.buttonInfo[0].name}</button>
        </div>
    </div>
        `;
        modal.innerHTML = content;
        modal.querySelector("#modal-button").onclick = option.buttonInfo[0].callback;
        this.modal = modal;
        document.body.appendChild(modal);
    }
    this.show = function() {
        var modal = this.modal;
        modal.style.display = "block";
        setTimeout(() => {
            modal.querySelector("#modal-main").style.transform = "translateY(0)";
        }, 0)
    }
    this.hide = function() {
        var modal = this.modal;
        modal.querySelector("#modal-main").style.transform = "translateY(100%)";
        setTimeout(() => {
            modal.style.display = "none";
        }, 500)
    }
    this.clear = function() {
        var modal = this.modal;
        modal.querySelector("#modal-main").style.transform = "translateY(100%)";
        setTimeout(() => {
            document.body.removeChild(this.modal);
        }, 500)
    }
    this.obj = this.init();
}