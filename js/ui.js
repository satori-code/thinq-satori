var UI = UI || {};
window.addEventListener("load", function () {
  var objArr = [];
  Object.keys(UI).forEach(function (key) {
    objArr.push(key);
  });
  objArr.forEach(function (obj) {
    var _obj = obj;
    if (UI[_obj].onload) {
      UI[_obj].init();
    } else {
      return false;
    }
  });
});

UI.banner = {
  onload: true,
  vars: {
    wrap: null,
    img: null,
  },
  init: function () {
    this.vars.wrap = document.querySelector("#banner-wrap");
    this.vars.img = document.querySelector("#banner-wrap .banner-img img");
    this.vars.img && this.fn.animation();
  },
  fn: {
    animation: function () {
      var count = 0;
      var framesLength = 180;
      setInterval(function () {
        UI.banner.vars.img.src =
          "/images/mainBanner/" + (count % framesLength) + ".png";
        count = count + 1;
      }, 1000 / 20);
    },
  },
};

UI.onepage = {
  onload: false,
  vars: {
    section1: null,
    section2: null,
    section3: null,
    headerHeight: 75,
  },
  init: function () {
    this.vars.section1 = document.querySelector(".section-platform");
    this.vars.section2 = document.querySelector(".section-toolupdate");
    this.vars.section3 = document.querySelector(".section-notice");

    UI.onepage.fn.scrolling();
    window.addEventListener("scroll", function () {
      UI.onepage.fn.scrolling();
    });
  },
  fn: {
    scrolling: function () {
      UI.onepage.fn.actionCont1();

      var winY = window.pageYOffset;
      var actionPosY1 =
        winY +
        UI.onepage.vars.section1.getBoundingClientRect().top -
        UI.onepage.vars.headerHeight;
      var actionPosY2 =
        winY +
        UI.onepage.vars.section2.getBoundingClientRect().top -
        UI.onepage.vars.headerHeight;
      var actionPosY3 =
        winY +
        UI.onepage.vars.section3.getBoundingClientRect().top -
        UI.onepage.vars.headerHeight;
      if (winY >= actionPosY2 - 500) {
        UI.onepage.fn.actionCont2();
      }
      if (winY >= actionPosY3 - 500) {
        UI.onepage.fn.actionCont3();
      }
    },
    actionCont1: function () {
      var box1 = UI.onepage.vars.section1.querySelector("header");
      var box2 = UI.onepage.vars.section1.querySelector(
        ".grid-list > li:first-of-type"
      );
      var box3 = UI.onepage.vars.section1.querySelector(
        ".grid-list > li:nth-of-type(2n)"
      );
      var box4 = UI.onepage.vars.section1.querySelector(
        ".grid-list > li:nth-of-type(3n)"
      );
      var box5 = UI.onepage.vars.section1.querySelector(
        ".grid-list > li:last-of-type"
      );

      box1.classList.add("fadeIn");
      var actionTime1 = setTimeout(function () {
        box2.classList.add("fadeIn");
        box3.classList.add("fadeIn");
        clearTimeout(actionTime1);
      }, 200);
      var actionTime2 = setTimeout(function () {
        box4.classList.add("fadeIn");
        box5.classList.add("fadeIn");
        clearTimeout(actionTime2);
      }, 400);
    },
    actionCont2: function () {
      var box1 = UI.onepage.vars.section2.querySelector("header");
      var box2 = UI.onepage.vars.section2.querySelector(
        ".grid-list > li:first-of-type"
      );
      var box3 = UI.onepage.vars.section2.querySelector(
        ".grid-list > li:nth-of-type(2n)"
      );
      var box4 = UI.onepage.vars.section2.querySelector(
        ".grid-list > li:nth-of-type(3n)"
      );
      var box5 = UI.onepage.vars.section2.querySelector(
        ".grid-list > li:nth-of-type(4n)"
      );
      var box6 = UI.onepage.vars.section2.querySelector(
        ".grid-list > li:nth-of-type(5n)"
      );
      var box7 = UI.onepage.vars.section2.querySelector(
        ".grid-list > li:last-of-type"
      );
      box1.classList.add("fadeIn");
      var actionTime1 = setTimeout(function () {
        box2.classList.add("fadeIn");
        box3.classList.add("fadeIn");
        clearTimeout(actionTime1);
      }, 200);
      var actionTime2 = setTimeout(function () {
        box4.classList.add("fadeIn");
        box5.classList.add("fadeIn");
        clearTimeout(actionTime2);
      }, 400);
      var actionTime3 = setTimeout(function () {
        box6.classList.add("fadeIn");
        box7.classList.add("fadeIn");
        clearTimeout(actionTime3);
      }, 600);
    },
    actionCont3: function () {
      var box1 = UI.onepage.vars.section3.querySelector("header");
      var box2 = UI.onepage.vars.section3.querySelector(
        ".notice-list > li:first-of-type"
      );
      var box3 = UI.onepage.vars.section3.querySelector(
        ".notice-list > li:nth-of-type(2n)"
      );
      var box4 = UI.onepage.vars.section3.querySelector(
        ".notice-list > li:nth-of-type(3n)"
      );
      box1.classList.add("fadeIn");
      var actionTime1 = setTimeout(function () {
        box2.classList.add("fadeIn");
        clearTimeout(actionTime1);
      }, 200);
      var actionTime2 = setTimeout(function () {
        box3.classList.add("fadeIn");
        clearTimeout(actionTime2);
      }, 400);
      var actionTime3 = setTimeout(function () {
        box4.classList.add("fadeIn");
        clearTimeout(actionTime3);
      }, 600);
    },
  },
};

UI.nav = {
  onload: true,
  vars: {
    toggleBtn: null,
    box: null,
    navEl: null,
    navList: null,
    navListHeight: 56,
    navBtn: null,
    itemHeight: null,
    itemBottomSpace: 15,
    maxHeight: [],
  },
  init: function () {
    this.vars.toggleBtn = document.querySelectorAll(".nav-drop button");
    this.vars.box = document.querySelectorAll(".nav-drop-box");
    this.vars.navEl = document.querySelectorAll("#sub-navigator > nav");
    this.vars.navList = document.querySelectorAll(".nav-list > li");
    this.vars.navBtn = document.createElement("button");
    if (this.vars.navEl.length) {
      if (UI.nav.vars.box.length) {
        UI.nav.fn.dropSetHeight();
        UI.nav.fn.dropAni();
        // UI.nav.fn.navToggle();
      }
      this.vars.navEl[0].classList.add("scroll-content");
    }
  },
  fn: {
    navToggle: function () {
      var navBtnIcon = document.createElement("i");
      navBtnIcon.classList.add("icon", "fas", "fa-angle-double-right");
      UI.nav.vars.navBtn.appendChild(navBtnIcon);
      UI.nav.vars.navBtn.classList.add("btn-nav-toggle");
      UI.nav.vars.navEl[0].insertBefore(UI.nav.vars.navBtn, null);
      UI.nav.vars.navBtn.addEventListener("click", function (e) {
        if (UI.nav.vars.navEl[0].classList.contains("hide")) {
          UI.nav.vars.navEl[0].classList.add("hide");
        } else {
          UI.nav.vars.navEl[0].classList.remove("hide");
        }
      });
    },
    dropSetHeight: function () {
      Array.prototype.forEach.call(UI.nav.vars.box, function (item, index) {
        var list = item.querySelectorAll("li");
        for (var i = 0; i < list.length; i++) {
          UI.nav.vars.itemHeight = list[i].getBoundingClientRect().height;
          item.style.height = (i + 1) * parseInt(UI.nav.vars.itemHeight) + "px";
          item.style["transition"] = "height 0.4s ease";
        }
        UI.nav.vars.maxHeight.push(parseInt(item.style.height));
      });
    },
    dropAni: function () {
      Array.prototype.forEach.call(
        UI.nav.vars.toggleBtn,
        function (item, index) {
          var nextEl = item.nextElementSibling;
          if (!item.classList.contains("on")) {
            nextEl.style.height = "0px";
            item.classList.remove("show");
          } else {
            item.classList.add("show");
            nextEl.style.height =
              UI.nav.vars.maxHeight[index] + UI.nav.vars.itemBottomSpace + "px";
          }
          item.addEventListener("click", function (e) {
            e.stopPropagation();
            if (e.target.classList.contains("show")) {
              e.target.classList.remove("show");
              nextEl.style.height = "0px";
            } else {
              e.target.classList.add("show");
              nextEl.style.height =
                UI.nav.vars.maxHeight[index] +
                UI.nav.vars.itemBottomSpace +
                "px";
            }
          });
        }
      );
    },
  },
};

UI.aside = {
  onload: true,
  vars: {
    cont: null,
    list: null,
    activeLink: null,
    bodyHeight: null,
    headerHeight: 75,
    subNavigatorPdTop: 50,
  },
  init: function () {
    this.vars.cont = document.querySelector(".sub-aside");
    if (this.vars.cont) {
      this.vars.list = UI.aside.vars.cont.querySelector(".aside-list");
      this.vars.activeLink =
        UI.aside.vars.cont.querySelectorAll(".active-link");
      this.vars.bodyHeight = document.querySelector("body").scrollHeight;

      UI.aside.vars.list.classList.add("scroll-content");
      UI.aside.fn.scrollPos();
      UI.aside.fn.scrollAction();
      window.addEventListener("scroll", function () {
        UI.aside.fn.scrollPos();
        UI.aside.fn.scrollAction();
      });
      UI.aside.fn.scrollLInk();
    }
  },
  fn: {
    scrollPos: function () {
      var winY = window.pageYOffset;
      var fixTop = parseInt(
        document.querySelector("#sub-navigator").getBoundingClientRect().top -
          UI.aside.vars.subNavigatorPdTop +
          winY
      );
      if (winY > fixTop) {
        UI.aside.vars.cont.classList.add("fix");
      } else {
        UI.aside.vars.cont.classList.remove("fix");
      }
    },
    scrollLInk: function () {
      Array.prototype.forEach.call(
        UI.aside.vars.activeLink,
        function (item, index) {
          var activeCont = document.querySelectorAll(
            "#action-cont" + (index + 1)
          );
          item.addEventListener("click", function (e) {
            e.stopPropagation();
            var winY = window.pageYOffset;
            var activeContTop = Math.floor(
              winY +
                activeCont[0].getBoundingClientRect().top -
                UI.aside.vars.headerHeight
            );
            window.scrollTo({
              left: 0,
              top: activeContTop,
              behavior: "smooth",
            });
          });
        }
      );
    },
    scrollAction: function () {
      var winY = window.pageYOffset;
      var activeContArr = [];
      Array.prototype.forEach.call(
        UI.aside.vars.activeLink,
        function (item, index) {
          var activeCont = document.querySelectorAll(
            "#action-cont" + (index + 1)
          );
          var activeContTop = Math.floor(
            winY +
              activeCont[0].getBoundingClientRect().top -
              UI.aside.vars.headerHeight
          );
          activeContArr.push(activeContTop);
        }
      );

      for (i = 0; i < activeContArr.length; i++) {
        var minY = activeContArr[i];
        var maxY = activeContArr[i + 1]
          ? activeContArr[i + 1]
          : UI.aside.vars.bodyHeight;
        if (winY >= minY && window.pageYOffset < maxY) {
          UI.aside.vars.activeLink[i].classList.add("on");
        } else {
          UI.aside.vars.activeLink[i].classList.remove("on");
        }
      }
    },
  },
};

UI.layerPopup = {
  onload: false,
  vars: {
    wrap: null,
    cont: null,
  },
  init: function () {
    this.vars.wrap = document.querySelector("#popup-wrap");
    this.vars.cont = document.querySelectorAll(".layer-popup");
    UI.layerPopup.fn.pos();
    Array.prototype.forEach.call(
      UI.layerPopup.vars.cont,
      function (item, index) {
        var btnClose = item.querySelector(".btn-close");
        if (btnClose) {
          btnClose.addEventListener("click", function (e) {
            e.stopPropagation();
            var layerWrap = e.target.closest("#popup-wrap");
            var layerCont = e.target.closest(".layer-popup");
            if (layerWrap.classList.contains("show")) {
              layerWrap.classList.remove("show");
            }
            if (layerCont.classList.contains("show")) {
              layerCont.classList.remove("show");
            }
          });
        }
      }
    );
  },
  fn: {
    open: function (layerId) {
      UI.layerPopup.init();
      var target = UI.layerPopup.vars.wrap.querySelector(layerId);
      if (!UI.layerPopup.vars.wrap.classList.contains("show")) {
        UI.layerPopup.vars.wrap.classList.add("show");
      }
      if (!target.classList.contains("show")) {
        target.classList.add("show");
      }
    },
    close: function (layerId) {
      var target = UI.layerPopup.vars.wrap.querySelector(layerId);
      if (UI.layerPopup.vars.wrap.classList.contains("show")) {
        UI.layerPopup.vars.wrap.classList.remove("show");
      }
      if (target.classList.contains("show")) {
        target.classList.remove("show");
      }
    },
    pos: function () {
      Array.prototype.forEach.call(
        UI.layerPopup.vars.cont,
        function (item, index) {
          var contWidth = item.getAttribute("attr-w");
          var contHeight = item.getAttribute("attr-h");
          item.style.width = contWidth + "px";
          item.style.height = contHeight + "px";
          item.style.marginLeft = "-" + contWidth / 2 + "px";
          item.style.marginTop = "-" + contHeight / 2 + "px";
        }
      );
    },
  },
};

UI.feedback = {
  onload: false,
  vars: {
    box: null,
    btn: null,
  },
  init: function () {
    this.vars.box = document.querySelector(".site-feedback");
    this.vars.btn = UI.feedback.vars.box.querySelectorAll(".btn-thumb");
    UI.feedback.fn.setting();
  },
  fn: {
    setting: function () {
      var iconUp = document.createElement("i");
      var iconDown = document.createElement("i");
      iconUp.classList.add("icon", "far", "fa-thumbs-up");
      iconDown.classList.add("icon", "far", "fa-thumbs-down");
      Array.prototype.forEach.call(
        UI.feedback.vars.btn,
        function (item, index) {
          if (item.classList.contains("up")) {
            item.insertBefore(iconUp, null);
          }
          if (item.classList.contains("down")) {
            item.insertBefore(iconDown, null);
          }
          item.addEventListener("mouseenter", function (e) {
            if (!e.target.classList.contains("hover")) {
              e.target.classList.add("hover");
            }
          });
          item.addEventListener("mouseleave", function (e) {
            if (e.target.classList.contains("hover")) {
              e.target.classList.remove("hover");
            }
          });
        }
      );
    },
    toggle: function (target) {
      var btn = target.parentNode.querySelectorAll(".btn-thumb");
      Array.prototype.forEach.call(btn, function (item, index) {
        item.classList.remove("on");
      });
      if (!target.classList.contains("on")) {
        target.classList.add("on");
      } else {
        target.classList.remove("on");
      }
    },
    reset: function () {
      Array.prototype.forEach.call(
        UI.feedback.vars.btn,
        function (item, index) {
          if (item.classList.contains("on")) {
            item.classList.remove("on");
          }
        }
      );
    },
  },
};

UI.dropbox = {
  onload: true,
  vars: {
    box: null,
  },
  init: function () {
    this.vars.box = document.querySelectorAll(".drop-box");
    UI.dropbox.fn.toggle();
  },
  fn: {
    toggle: function () {
      if (UI.dropbox.vars.box.length) {
        Array.prototype.forEach.call(
          UI.dropbox.vars.box,
          function (item, index) {
            var btn = item.querySelector(".btn-drop");
            var icon = item.querySelector(".far");
            btn.addEventListener("click", function (e) {
              e.stopPropagation();
              var target = e.target;
              var parent = target.closest(".drop-box");
              if (!parent.classList.contains("on")) {
                parent.classList.add("on");
                icon.classList.remove("fa-plus-square");
                icon.classList.add("fa-minus-square");
              } else {
                parent.classList.remove("on");
                icon.classList.remove("fa-minus-square");
                icon.classList.add("fa-plus-square");
              }
            });
          }
        );
      }
    },
  },
};

UI.iframe = {
  onload: true,
  vars: {
    iframeHTML: null,
  },
  init: function () {
    this.vars.iframeHTML = document.querySelector(".has-iframe");
    if (this.vars.iframeHTML) {
      UI.iframe.fn.layout(UI.iframe.vars.iframeHTML);
      setTimeout(function () {
        UI.iframe.fn.toggleFooter();
      });
    }
  },
  fn: {
    layout: function (el) {
      var iframeWrap = el.querySelector(".iframe-wrap");
      if (iframeWrap) {
        var iframeEl = el.querySelector(".iframe-wrap iframe");
        var frameDOM = iframeEl.contentWindow.document;
        var frameHtml = frameDOM.querySelector("html");
        var frameBody = frameDOM.querySelector("body");

        setTimeout(function () {
          var iframeTcm = frameBody.querySelector("#main>.core");
          if (iframeTcm) {
            iframeTcm.style.overflowY = "auto";
            iframeTcm.style.overflowX = "hidden";
          }
          iframeWrap.style.marginTop = "74px";
        }, 10);
      }
    },
    toggleFooter: function () {
      if (UI.iframe.vars.iframeHTML) {
        var footer = UI.iframe.vars.iframeHTML.querySelector(".footer-toggle");
        var btnToggle = document.createElement("button");
        var btnToggleIcon = document.createElement("i");

        btnToggle.classList.add("btn-toggle");
        btnToggleIcon.classList.add("icon", "fas", "fa-chevron-up");

        footer.classList.add("off");
        footer.appendChild(btnToggle);
        btnToggle.appendChild(btnToggleIcon);

        btnToggle.addEventListener("click", function (e) {
          var target = e.target;
          var parent = target.closest(".footer-toggle");
          if (parent.classList.contains("off")) {
            parent.classList.remove("off");
            parent.classList.add("on");
          } else {
            parent.classList.add("off");
            parent.classList.remove("on");
          }
        });
      }
    },
  },
};

UI.scrollTarget = {
  onload: false,
  vars: {
    html: null,
  },
  init: function () {},
  fn: {
    top: function (target) {
      var targetEl = document.querySelector("#" + target);
      var targetPos = window.pageYOffset + targetEl.getBoundingClientRect().top;
      window.scrollTo({
        left: 0,
        top: targetPos,
        behavior: "smooth",
      });
    },
  },
};
