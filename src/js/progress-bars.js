window.onload = function() {

    // 从API取值
    var r = new XMLHttpRequest();
    r.open("GET", "https://pb-api.herokuapp.com/bars", true);
    r.send(null);

    r.onreadystatechange = function() {
        if (r.readyState == 4 && r.status == 200) {
            var data = JSON.parse(r.responseText);
            var btns = data.buttons;
            var bars = data.bars;
            var limit = data.limit;

            // 设置限值
            setLimitValue(limit);

            // 设置进度条
            setBars(bars);

            // 排序后添加按钮
            btns.sort((a, b) => a - b);
            setBtns(btns);
        }
    };
}

/**
 * 设置限值
 * @param {*} limit_value 
 */
function setLimitValue(limit_value) {
    var tag_limit = document.getElementById('limit_value');
    tag_limit.innerHTML = limit_value;
}

/**
 * 设置进度条
 * @param {Array} bars 
 */
function setBars(bars) {
    for (i = 0; i < bars.length; i++) {
        // 初始化进度条样式
        var progress_div = document.createElement('div');
        progress_div.classList.add("progress")

        var bar_div = document.createElement('div');
        bar_div.classList.add("progress-bar", "progress-bar-striped", "active");

        var bar_div_role = document.createAttribute("role");
        bar_div_role.value = "progressbar";
        bar_div.setAttributeNode(bar_div_role);

        var bar_div_valuenow = document.createAttribute("aria-valuenow");
        bar_div_valuenow.value = bars[i];
        bar_div.setAttributeNode(bar_div_valuenow);

        var bar_div_valuemin = document.createAttribute("aria-valuemin");
        bar_div_valuemin.value = 0;
        bar_div.setAttributeNode(bar_div_valuemin);

        var bar_div_valuemax = document.createAttribute("aria-valuemax");
        bar_div_valuemax.value = 100;
        bar_div.setAttributeNode(bar_div_valuemax);

        var bar_div_style = document.createAttribute("style");
        bar_div_style.value = "width:" + bars[i] + "%";
        bar_div.setAttributeNode(bar_div_style);

        bar_div.id = "bar" + i;
        bar_div.innerHTML = bars[i] + "%";

        var col_bars = document.querySelector(".col-bars");
        progress_div.appendChild(bar_div);
        col_bars.appendChild(progress_div);

        // 添加选择框
        var progress_select = document.getElementById('col-select');
        progress_value = i + 1;
        progress_select.options.add(new Option("#progress" + progress_value, progress_value));
    }
}

/**
 * 设置按钮
 * @param {Array} btns 
 */
function setBtns(btns) {
    for (i = 0; i < btns.length; i++) {
        var btn = document.createElement('button');
        var col_btns = document.querySelector(".col-btns");
        var btn_value = btns[i]
        btn.innerText = (btn_value > 0) ? "+" + btn_value : btn_value;
        btn.value = btn_value;

        // 添加点击事件
        var btn_onclick = document.createAttribute("onclick");
        btn_onclick.value = "calc(" + btn_value + ")";
        btn.setAttributeNode(btn_onclick);
        col_btns.appendChild(btn);
    }
}

/**
 * 计算进度
 * @param {int} btn_value 
 */
function calc(btn_value) {
    var tag_limit = document.getElementById('limit_value');
    var limit = parseInt(tag_limit.innerText);
    var progress_select = document.getElementById('col-select');
    var index = progress_select.selectedIndex;

    var bar_div = document.getElementById("bar" + index);
    var bar_new_value = parseInt(bar_div.ariaValueNow) + btn_value;

    // 设置进度条颜色
    if (bar_new_value > limit) {
        bar_div.style.backgroundColor = "#dc3545";
    } else {
        bar_div.style.backgroundColor = "#007bff";
    }

    // 设置超限时宽度
    if (bar_new_value > 100) {
        bar_div.style.width = "100%";
    } else if (bar_new_value < 0) {
        bar_new_value = 0;
        bar_div.style.width = "0%";
    } else {
        bar_div.style.width = bar_new_value + "%";
    }

    // 设置数值和百分比
    bar_div.ariaValueNow = bar_new_value;
    bar_div.innerHTML = bar_new_value + "%";
}