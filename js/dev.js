/*********
 * public/js/ui.js 에서 필요한 코드를 추출하여 적용
 *********/
var UI = UI || {};
window.addEventListener('load', function() {
    var objArr = [];
    Object.keys(UI).forEach(function(key) {
        objArr.push(key);
    });
    objArr.forEach(function(obj) {
        var _obj = obj;
        if (UI[_obj].onload) {
            UI[_obj].init();
        } else {
            return false;
        }
    });
    console.log('TCM!');
});

UI.layerPopup = {
    onload: false,
    vars: {
        wrap: null,
        cont: null,
    },
    init: function() {
        this.vars.wrap = document.querySelector('#popup-wrap');
        this.vars.cont = document.querySelectorAll('.layer-popup');
        UI.layerPopup.fn.pos();
        Array.prototype.forEach.call(UI.layerPopup.vars.cont, function (item, index) {
            var btnClose = item.querySelector('.btn-close');
            if (btnClose) {
                btnClose.addEventListener('click', function (e) {
                    e.stopPropagation();
                    var layerWrap = e.target.closest('#popup-wrap');
                    var layerCont = e.target.closest('.layer-popup');
                    if (layerWrap.classList.contains('show')) {
                        layerWrap.classList.remove('show');
                    }
                    if (layerCont.classList.contains('show')) {
                        layerCont.classList.remove('show');
                    }
                });
            }
        });
    },
    fn: {
        open: function(layerId) {
            UI.layerPopup.init();
            var target = UI.layerPopup.vars.wrap.querySelector(layerId);
            if (!UI.layerPopup.vars.wrap.classList.contains('show')) {
                UI.layerPopup.vars.wrap.classList.add('show');
            }
            if (!target.classList.contains('show')) {
                target.classList.add('show');
            }
        },
        close: function(layerId) {
            var target = UI.layerPopup.vars.wrap.querySelector(layerId);
            if (UI.layerPopup.vars.wrap.classList.contains('show')) {
                UI.layerPopup.vars.wrap.classList.remove('show');
            }
            if (target.classList.contains('show')) {
                target.classList.remove('show');
            }
        },
        pos: function() {
            Array.prototype.forEach.call(UI.layerPopup.vars.cont, function (item, index) {
                var contWidth = item.getAttribute('attr-w');
                var contHeight = item.getAttribute('attr-h');
                item.style.width = contWidth + 'px';
                item.style.height = contHeight + 'px';
                item.style.marginLeft = '-' + contWidth / 2 + 'px';
                item.style.marginTop = '-' + contHeight / 2 + 'px';
            });
        }
    }
}

UI.feedback = {
    onload: false,
    vars: {
        box: null,
        btn: null
    },
    init: function() {
        this.vars.box = document.querySelector('.site-feedback');
        this.vars.btn = UI.feedback.vars.box.querySelectorAll('.btn-thumb');
        UI.feedback.fn.setting();
    },
    fn: {
        setting: function() {
            var iconUp = document.createElement('i');
            var iconDown = document.createElement('i');
            iconUp.classList.add('icon', 'far', 'fa-thumbs-up');
            iconDown.classList.add('icon', 'far', 'fa-thumbs-down');
            Array.prototype.forEach.call(UI.feedback.vars.btn, function (item, index) {
                if (item.classList.contains('up')) {
                    item.insertBefore(iconUp, null);
                }
                if (item.classList.contains('down')) {
                    item.insertBefore(iconDown, null);
                }
                item.addEventListener('mouseenter', function (e) {
                    if (!e.target.classList.contains('hover')) {
                        e.target.classList.add('hover');
                    }
                });
                item.addEventListener('mouseleave', function (e) {
                    if (e.target.classList.contains('hover')) {
                        e.target.classList.remove('hover');
                    }
                });
            });
        },
        toggle: function(target) {
            var btn = target.parentNode.querySelectorAll('.btn-thumb');
            Array.prototype.forEach.call(btn, function (item, index) {
                item.classList.remove('on');
            });
            if (!target.classList.contains('on')) {
                target.classList.add('on');
            } else {
                target.classList.remove('on');
            }
        },
        reset: function() {
            Array.prototype.forEach.call(UI.feedback.vars.btn, function (item, index) {
                if (item.classList.contains('on')) {
                    item.classList.remove('on');
                }
            });
        }
    }
}