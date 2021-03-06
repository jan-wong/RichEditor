(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RichEditor"] = factory();
	else
		root["RichEditor"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/core/richEditor.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/builtins/imageScale.ts":
/*!************************************!*\
  !*** ./src/builtins/imageScale.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 内置图片缩放功能
 */
class ImageScale {
    constructor(editor) {
        this.image = null; // 持有当前img对象
        this.shadowImage = null; // 透明img对象
        this.editor = editor;
        this.createDot();
        this.createShadowImage();
        this.handleDot();
        document.addEventListener('click', (e) => this.onClickImage(e));
    }
    // 创建透明图片
    createShadowImage() {
        this.shadowImage = document.createElement('img');
        this.shadowImage.className = 'rd_shadow-image';
    }
    // 创建四个点
    createDot() {
        this.lt = document.createElement('div');
        this.lt.className = 'rd_image-scale-dot lt';
        this.lb = document.createElement('div');
        this.lb.className = 'rd_image-scale-dot lb';
        this.rt = document.createElement('div');
        this.rt.className = 'rd_image-scale-dot rt';
        this.rb = document.createElement('div');
        this.rb.className = 'rd_image-scale-dot rb';
    }
    handleDot() {
        let finalWidth;
        let finalHeight;
        let ratio = 1;
        let imageRect;
        let imageBoundingRect;
        let tag;
        const handleMouseMove = (e) => {
            const { left, top, right, bottom, width, height } = imageRect;
            const { leftc, topc, rightc, bottomc } = imageBoundingRect;
            let xratio;
            let yratio;
            if (tag === 'rb') {
                xratio = (e.clientX - leftc) / width;
                yratio = (e.clientY - topc) / height;
            }
            if (tag === 'lt') {
                xratio = (rightc - e.clientX) / width;
                yratio = (bottomc - e.clientY) / height;
            }
            if (tag === 'lb') {
                xratio = (rightc - e.clientX) / width;
                yratio = (e.clientY - topc) / height;
            }
            if (tag === 'rt') {
                xratio = (e.clientX - leftc) / width;
                yratio = (bottomc - e.clientY) / height;
            }
            ratio = Math.min(xratio, yratio);
            finalWidth = width * ratio;
            finalHeight = height * ratio;
            if (finalHeight > 20 && finalWidth > 20) {
                this.shadowImage.style.transform = 'scale(' + ratio + ')';
            }
        };
        this.rb.addEventListener('mousedown', () => {
            this.shadowImage.src = this.image.src;
            this.editor.el.appendChild(this.shadowImage);
            imageRect = this.getImageRect();
            imageBoundingRect = this.getImageBoundingRect();
            this.shadowImage.style.width = imageRect.width + 'px';
            this.shadowImage.style.height = imageRect.height + 'px';
            this.shadowImage.style.left = imageRect.left + 'px';
            this.shadowImage.style.top = imageRect.top + 'px';
            this.shadowImage.style.transformOrigin = 'left top';
            tag = 'rb';
            document.body.addEventListener('mousemove', handleMouseMove);
        });
        this.lt.addEventListener('mousedown', () => {
            this.shadowImage.src = this.image.src;
            this.editor.el.appendChild(this.shadowImage);
            imageRect = this.getImageRect();
            imageBoundingRect = this.getImageBoundingRect();
            this.shadowImage.style.width = imageRect.width + 'px';
            this.shadowImage.style.height = imageRect.height + 'px';
            this.shadowImage.style.left = imageRect.left + 'px';
            this.shadowImage.style.top = imageRect.top + 'px';
            this.shadowImage.style.transformOrigin = 'right bottom';
            tag = 'lt';
            document.body.addEventListener('mousemove', handleMouseMove);
        });
        this.lb.addEventListener('mousedown', () => {
            this.shadowImage.src = this.image.src;
            this.editor.el.appendChild(this.shadowImage);
            imageRect = this.getImageRect();
            imageBoundingRect = this.getImageBoundingRect();
            this.shadowImage.style.width = imageRect.width + 'px';
            this.shadowImage.style.height = imageRect.height + 'px';
            this.shadowImage.style.left = imageRect.left + 'px';
            this.shadowImage.style.top = imageRect.top + 'px';
            this.shadowImage.style.transformOrigin = 'right top';
            tag = 'lb';
            document.body.addEventListener('mousemove', handleMouseMove);
        });
        this.rt.addEventListener('mousedown', () => {
            this.shadowImage.src = this.image.src;
            this.editor.el.appendChild(this.shadowImage);
            imageRect = this.getImageRect();
            imageBoundingRect = this.getImageBoundingRect();
            this.shadowImage.style.width = imageRect.width + 'px';
            this.shadowImage.style.height = imageRect.height + 'px';
            this.shadowImage.style.left = imageRect.left + 'px';
            this.shadowImage.style.top = imageRect.top + 'px';
            this.shadowImage.style.transformOrigin = 'left bottom';
            tag = 'rt';
            document.body.addEventListener('mousemove', handleMouseMove);
        });
        document.body.addEventListener('mouseup', () => {
            if (this.editor.el.contains(this.shadowImage)) {
                this.shadowImage.removeAttribute('style');
                this.editor.el.removeChild(this.shadowImage);
            }
            if (finalWidth && finalHeight && this.image) {
                this.image.style.width = finalWidth + 'px';
                this.image.style.height = finalHeight + 'px';
            }
            document.body.removeEventListener('mousemove', handleMouseMove);
        });
    }
    // 获取image四个顶点的坐标位置
    getImageRect() {
        const offsetTop = this.image.offsetTop;
        const offsetLeft = this.image.offsetLeft;
        const offsetWidth = this.image.offsetWidth;
        const offsetHeight = this.image.offsetHeight;
        return {
            top: offsetTop,
            left: offsetLeft,
            right: offsetLeft + offsetWidth,
            bottom: offsetTop + offsetHeight,
            width: offsetWidth,
            height: offsetHeight
        };
    }
    getImageBoundingRect() {
        const { left, top, right, bottom } = this.image.getBoundingClientRect();
        return {
            leftc: left,
            topc: top,
            rightc: right,
            bottomc: bottom
        };
    }
    onClickImage(e) {
        const img = e.target;
        if (this.editor.el.contains(img) && img.tagName === 'IMG' && img !== this.shadowImage) {
            this.selectImage(img);
        }
        else {
            this.unselectImage();
        }
    }
    selectImage(img) {
        if (this.image) {
            this.image.removeAttribute('data-rd-selected');
        }
        this.image = img;
        this.image.setAttribute('data-rd-selected', "1");
        this.editor.range.selectNode(this.image);
        const { left, right, top, bottom } = this.getImageRect();
        this.editor.el.appendChild(this.lt);
        this.lt.style.left = (left - this.lt.offsetWidth / 2) + 'px';
        this.lt.style.top = (top - this.lt.offsetHeight / 2) + 'px';
        this.editor.el.appendChild(this.lb);
        this.lb.style.left = (left - this.lb.offsetWidth / 2) + 'px';
        this.lb.style.top = (bottom - this.lb.offsetHeight / 2) + 'px';
        this.editor.el.appendChild(this.rt);
        this.rt.style.left = (right - this.rt.offsetWidth / 2) + 'px';
        this.rt.style.top = (top - this.rt.offsetHeight / 2) + 'px';
        this.editor.el.appendChild(this.rb);
        this.rb.style.left = (right - this.rb.offsetWidth / 2) + 'px';
        this.rb.style.top = (bottom - this.rb.offsetHeight / 2) + 'px';
    }
    unselectImage() {
        if (this.image) {
            this.image.removeAttribute('data-rd-selected');
            this.image = null;
            this.editor.el.removeChild(this.lt);
            this.editor.el.removeChild(this.lb);
            this.editor.el.removeChild(this.rt);
            this.editor.el.removeChild(this.rb);
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ImageScale);


/***/ }),

/***/ "./src/controls/button.ts":
/*!********************************!*\
  !*** ./src/controls/button.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/emitter */ "./src/core/emitter.ts");
/**
 * 按钮类
 */

class Button extends _core_emitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(container) {
        super();
        this.el = document.createElement('div');
        this.el.className = 'richeditor_toolbarItem';
        container.appendChild(this.el);
        this.el.addEventListener('click', (e) => {
            this.fire('click', e);
        });
    }
    setIcon(svg) {
        this.el.innerHTML = svg;
    }
    setActive() {
        this.el.classList.add('active');
    }
    resetActive() {
        this.el.classList.remove('active');
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Button);


/***/ }),

/***/ "./src/controls/colorButton.ts":
/*!*************************************!*\
  !*** ./src/controls/colorButton.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/emitter */ "./src/core/emitter.ts");
/**
 * 颜色按钮类
 */

class ColorButton extends _core_emitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(container) {
        super();
        this.el = document.createElement('div');
        this.el.className = 'richeditor_toolbarItem';
        container.appendChild(this.el);
        this.el.addEventListener('click', (e) => {
            this.fire('click', e);
        });
    }
    setIcon(svg) {
        this.el.innerHTML = svg;
    }
    setColor(rgb) {
        const rect = this.el.querySelector('.color-underline');
        rect.setAttribute('fill', rgb);
        rect.setAttribute('stroke', rgb);
    }
    getColor() {
        const rect = this.el.querySelector('.color-underline');
        const fillColor = rect.getAttribute('fill');
        if (!fillColor)
            return 'rgb(0,0,0)';
        return fillColor;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ColorButton);


/***/ }),

/***/ "./src/controls/colorPicker.ts":
/*!*************************************!*\
  !*** ./src/controls/colorPicker.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "./src/util/util.ts");
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/emitter */ "./src/core/emitter.ts");
/**
 * 颜色拾取器
 * 领域知识：三种色彩模式
 * 1.RGB：通过组合红色(red)、绿色(green)、蓝色(blue)三种颜色通道的变化来表示颜色。取值范围0-255|0%-100%
 * 2.HEX：和RGB相同，不同的是取值范围00-FF
 * 3.HSV：通过色相(hub)、饱和度(saturation)、明度(lightness)三种颜色通道的变化来表示变化。
 * H [0-360] S [0-1] V [0-1]
 * 色相：在不同波长的光照射下，人眼所感觉不同的颜色。它是一个分段函数。通过三原色可以演变出形成6色环、12色环、24色环的色相环或色相条。
 * 原色之间是线性变化的。
 * 饱和度：和掺入白色的量相关，掺入越少，越饱和。反映在调色板上从左白色到右纯色线性变化。
 * 明度：和掺入黑色的量相关，掺入越少，越明亮。反映在调色板上从下黑色到上白色线性变化。
 * 4.HSL: 通过色相(hub)、饱和度(saturation)、明度(lightness)三种颜色通道的变化来表示变化。
 * H和HSV是一个意思，SL不是一个意思
 * H [0-360] S [0-1] L [0-1]
 */


// rgb to object
function rgb2object(rgb) {
    const rgbO = {};
    const rgbA = rgb.match(/[0-9\.]+/g);
    rgbO.value = rgb;
    rgbO.r = Number(rgbA[0]);
    rgbO.g = Number(rgbA[1]);
    rgbO.b = Number(rgbA[2]);
    rgbO.a = Number(rgbA[3] || 1);
    return rgbO;
}
// rgb to hsv
function rgb2hsv(r, g, b) {
    var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, h, s = (max === 0 ? 0 : d / max), v = max / 255;
    switch (max) {
        case min:
            h = 0;
            break;
        case r:
            h = (g - b) + d * (g < b ? 6 : 0);
            h /= 6 * d;
            break;
        case g:
            h = (b - r) + d * 2;
            h /= 6 * d;
            break;
        case b:
            h = (r - g) + d * 4;
            h /= 6 * d;
            break;
    }
    return { h, s, v, r, g, b };
}
// hsv to rgb
function hsv2rgb(h, s, v) {
    h = h * 6;
    var i = Math.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    var value = `rgb(${r}, ${g}, ${b})`;
    return { value, r, g, b, h: h / 6, s, v };
}
function hex2rgb(hex) {
    if (hex.indexOf('#') > -1)
        hex = hex.slice(1);
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
}
// 调色板
class Palette extends _core_emitter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(container, options) {
        super();
        this.width = parseInt(options.width);
        this.height = parseInt(options.height);
        this.x = options.x || this.width; // 默认值
        this.y = options.y || 0; // 默认值
        this.h = options.h || 0; // 默认值
        this.createElement(container);
        this.render();
        this.listenMouse();
    }
    // 创建基本元素
    createElement(container) {
        this.el = document.createElement('div');
        this.el.className = 'rd_color-palette';
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.canvas.setAttribute('width', this.width + 'px');
        this.canvas.setAttribute('height', this.height + 'px');
        this.canvasCtx = this.canvas.getContext('2d');
        this.el.appendChild(this.canvas);
        container.appendChild(this.el);
    }
    // 渲染
    render() {
        this.canvasCtx.clearRect(0, 0, this.width, this.height);
        this.drawPalette();
        this.drawPicker();
    }
    /**
     * 绘制调色板 HSV
     */
    drawPalette() {
        const rgb = hsv2rgb(this.h, 1, 1).value;
        this.canvasCtx.fillStyle = rgb;
        this.canvasCtx.fillRect(0, 0, this.width, this.height);
        this.createLinearGradient(0, 0, this.width, 0, '#fff', 'rgba(255,255,255,0)');
        this.createLinearGradient(0, 0, 0, this.height, 'rgba(255,255,255,0)', 'rgba(0,0,0)');
    }
    createLinearGradient(x1, y1, x2, y2, startColor, endColor) {
        const gradient = this.canvasCtx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);
        this.canvasCtx.beginPath();
        this.canvasCtx.fillStyle = gradient;
        this.canvasCtx.rect(0, 0, this.width, this.height);
        this.canvasCtx.fill();
    }
    // 绘制调色板选择器
    drawPicker() {
        this.canvasCtx.beginPath();
        this.canvasCtx.shadowColor = 'rgba(255,0,0,0.2)';
        this.canvasCtx.shadowOffsetX = 1;
        this.canvasCtx.shadowOffsetY = 1;
        this.canvasCtx.strokeStyle = '#fff';
        this.canvasCtx.arc(this.x, this.y, 6, 0, 2 * Math.PI);
        this.canvasCtx.stroke();
    }
    listenMouse() {
        const onMouseMove = e => {
            this.onMouseDown(e);
        };
        this.canvas.addEventListener('mousedown', e => {
            this.onMouseDown(e);
            document.addEventListener('mousemove', onMouseMove);
        });
        document.addEventListener('mouseup', e => {
            document.removeEventListener('mousemove', onMouseMove);
        });
        document.addEventListener('mouseleave', e => {
            document.removeEventListener('mousemove', onMouseMove);
        });
    }
    // 坐标转换为sv
    xy2sv() {
        return {
            s: this.x / this.width,
            v: (this.height - this.y) / this.height
        };
    }
    // 获取选择器选中的颜色
    getColor() {
        const { s, v } = this.xy2sv();
        return hsv2rgb(this.h, s, v);
    }
    onMouseDown(e) {
        // 鼠标点击的坐标
        const x = e.clientX;
        const y = e.clientY;
        const { top, bottom, left, right, width, height } = this.canvas.getBoundingClientRect();
        if (x > right)
            this.x = width;
        else if (x < left)
            this.x = 0;
        else
            this.x = x - left;
        if (y > bottom)
            this.y = height;
        else if (y < top)
            this.y = 0;
        else
            this.y = y - top;
        this.render();
        this.fire('sv-change', this.getColor());
    }
    updateHub(hub) {
        this.h = hub;
        this.render();
        this.fire('h-change', this.getColor());
    }
    updateRGB(r, g, b) {
        const { h, s, v } = rgb2hsv(r, g, b);
        this.h = h;
        this.x = s * this.width;
        this.y = (1 - v) * this.height;
        this.render();
        this.fire('hsv-change', this.getColor());
    }
}
// 色相
class Hub extends _core_emitter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(container) {
        super();
        this.right = 0; // 滑动按钮距离滑动条右侧的距离
        this.createElement(container);
        this.dragBtn();
    }
    createElement(container) {
        this.el = document.createElement('div');
        this.el.className = 'rd_hub';
        this.bar = document.createElement('div');
        this.bar.className = 'rd_hub-bar';
        this.btn = document.createElement('div');
        this.btn.className = 'rd_hub-btn';
        container.appendChild(this.el);
        this.el.appendChild(this.bar);
        this.bar.appendChild(this.btn);
    }
    dragBtn() {
        const onMouseMove = e => {
            this.onMousemoveBtn(e);
        };
        this.bar.addEventListener('mousedown', e => {
            this.onMouseDownBar(e);
        });
        this.btn.addEventListener('mousedown', e => {
            document.addEventListener('mousemove', onMouseMove);
        });
        document.addEventListener('mouseup', e => {
            document.removeEventListener('mousemove', onMouseMove);
        });
        document.addEventListener('mouseleave', e => {
            document.removeEventListener('mousemove', onMouseMove);
        });
    }
    onMouseDownBar(e) {
        if (e.target == this.bar) {
            const barWidth = this.bar.clientWidth;
            const offsetX = e.offsetX;
            this.btn.style.right = (barWidth - offsetX) + 'px';
            this.right = parseInt(this.btn.style.right);
            this.fire('change', this.getHub());
        }
    }
    onMousemoveBtn(e) {
        const barClientRect = this.bar.getBoundingClientRect();
        if (e.clientX < barClientRect.left) {
            this.btn.style.right = barClientRect.width + 'px';
        }
        else if (e.clientX > barClientRect.right) {
            this.btn.style.right = '0px';
        }
        else {
            this.btn.style.right = (barClientRect.right - e.clientX) + 'px';
        }
        this.right = parseInt(this.btn.style.right);
        this.fire('change', this.getHub());
    }
    // 计算色相条当前的hub值和转换的rgb值
    getHub() {
        return this.right / this.bar.clientWidth;
    }
    update(hub) {
        this.right = this.bar.clientWidth * hub;
        this.btn.style.right = this.right + 'px';
    }
}
// RGB
class RGBControl extends _core_emitter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(container) {
        super();
        this.createElement(container);
        this.listenDOM();
    }
    createElement(container) {
        this.el = document.createElement('div');
        this.el.className = 'rd_rgb-control';
        const html = `
    <div class="rd_rgb-control-list">
      <div class="rd_rgb-input">
        <input type="text" class="rd_rgb-rinput" />
        <div class="rd_rgb-control-label">R</div>
      </div>
      <div class="rd_rgb-input">
        <input type="text" class="rd_rgb-ginput" />
        <div class="rd_rgb-control-label">G</div>
      </div>
      <div class="rd_rgb-input">
        <input type="text" class="rd_rgb-binput" />
        <div class="rd_rgb-control-label">B</div>
      </div>
    </div>
    `;
        this.el.innerHTML = html;
        this.rinput = this.el.querySelector('.rd_rgb-rinput');
        this.ginput = this.el.querySelector('.rd_rgb-ginput');
        this.binput = this.el.querySelector('.rd_rgb-binput');
        this.rinput.value = '255';
        this.ginput.value = '0';
        this.binput.value = '0';
        container.appendChild(this.el);
    }
    listenDOM() {
        this.rinput.addEventListener('input', (e) => this.OnInput(e));
        this.ginput.addEventListener('input', (e) => this.OnInput(e));
        this.binput.addEventListener('input', (e) => this.OnInput(e));
    }
    OnInput(e) {
        if (this.checkValid([this.rinput, this.ginput, this.binput])) {
            const r = Number(this.rinput.value);
            const g = Number(this.ginput.value);
            const b = Number(this.binput.value);
            this.fire('change', { r, g, b });
        }
    }
    checkValid(inputs) {
        for (let i = 0; i < inputs.length; i++) {
            let value = inputs[i].value;
            if (_util_util__WEBPACK_IMPORTED_MODULE_0__["nonNumber"].test(value))
                return false;
            value = Number(value);
            if (value < 0 || value > 255)
                return false;
        }
        return true;
    }
    updateRGB(r, g, b) {
        this.rinput.value = String(r);
        this.ginput.value = String(g);
        this.binput.value = String(b);
    }
}
// 颜色显示器
class ColorDisplay extends _core_emitter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(container) {
        super();
        this.el = document.createElement('div');
        this.el.className = 'rd_color-display';
        container.appendChild(this.el);
    }
    update(rgb) {
        this.el.style.background = rgb;
        this.rgb = rgb;
    }
    getRgb() {
        return this.rgb;
    }
}
// 颜色选择列表
class ColorSelect extends _core_emitter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(container) {
        super();
        this.createElement(container);
        this.el.addEventListener('click', e => this.onClick(e));
    }
    createElement(container) {
        this.el = document.createElement('div');
        this.el.className = 'rd_color-select';
        const colorList = this.getColor();
        colorList.forEach(item => {
            const span = document.createElement('span');
            span.className = 'rd_color-select-item';
            span.style.background = item;
            this.el.appendChild(span);
        });
        container.appendChild(this.el);
    }
    onClick(e) {
        if (e.target.classList.contains('rd_color-select-item')) {
            const bgColor = e.target.style.backgroundColor;
            this.fire('change', rgb2object(bgColor));
        }
    }
    getColor() {
        return [
            'rgb(244, 67, 54)',
            'rgb(233, 30, 99)',
            'rgb(156, 39, 176)',
            'rgb(103, 58, 183)',
            'rgb(63, 81, 181)',
            'rgb(33, 150, 243)',
            'rgb(0, 188, 212)',
            'rgb(0, 150, 136)',
            'rgb(76, 175, 80)',
            'rgb(139, 195, 74)',
            'rgb(205, 220, 57)',
            'rgb(255, 235, 59)',
            'rgb(255, 193, 7)',
            'rgb(255, 152, 0)',
            'rgb(255, 87, 34)',
            'rgb(255, 87, 34)',
            'rgb(158, 158, 158)',
            'rgb(0, 0, 0)'
        ];
    }
}
// 拾取器的footer
class PickerFooter extends _core_emitter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(container) {
        super();
        this.createElement(container);
        this.cancel.addEventListener('click', e => this.sendMessage(false));
        this.confirm.addEventListener('click', e => this.sendMessage(true));
    }
    createElement(container) {
        this.el = document.createElement('div');
        this.el.className = 'rd_picker-footer';
        container.appendChild(this.el);
        this.cancel = document.createElement('button');
        this.cancel.className = 'rd_picker-cancel';
        this.cancel.textContent = '取消';
        this.el.appendChild(this.cancel);
        this.confirm = document.createElement('button');
        this.confirm.className = 'rd_picker-confirm';
        this.confirm.textContent = '确定';
        this.el.appendChild(this.confirm);
    }
    sendMessage(isOk) {
        this.fire('message', isOk);
    }
}
// 颜色拾取器
class ColorPicker extends _core_emitter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(element) {
        super();
        this.visible = false;
        this.el = document.createElement('div');
        this.el.className = 'rd_color-picker';
        this.palette = new Palette(this.el, { width: '180px', height: '125px' });
        this.hub = new Hub(this.el);
        this.box = document.createElement('div');
        this.box.className = 'rd_box';
        this.colorDisplay = new ColorDisplay(this.box);
        this.rgbControl = new RGBControl(this.box);
        this.el.appendChild(this.box);
        this.colorSelect = new ColorSelect(this.el);
        this.pickerFooter = new PickerFooter(this.el);
        this.hub.on('change', h => {
            this.palette.updateHub(h);
        });
        this.palette.on('hsv-change', color => {
            this.hub.update(color.h);
            this.colorDisplay.update(color.value);
            this.rgbControl.updateRGB(color.r, color.g, color.b);
        });
        this.palette.on('h-change', color => {
            this.colorDisplay.update(color.value);
            this.rgbControl.updateRGB(color.r, color.g, color.b);
        });
        this.palette.on('sv-change', color => {
            this.colorDisplay.update(color.value);
            this.rgbControl.updateRGB(color.r, color.g, color.b);
        });
        this.colorSelect.on('change', color => {
            this.palette.updateRGB(color.r, color.g, color.b);
        });
        this.rgbControl.on('change', color => {
            this.palette.updateRGB(color.r, color.g, color.b);
        });
        this.pickerFooter.on('message', isok => {
            if (isok) {
                this.fire('change', this.colorDisplay.getRgb());
            }
            this.hide();
        });
        // 根据点击元素定位
        const rect = element.getBoundingClientRect();
        this.el.style.top = rect.bottom + 'px';
        this.el.style.left = rect.left + 'px';
        this.el.style.display = 'none';
        document.body.appendChild(this.el);
        document.body.addEventListener('click', (e) => {
            const target = e.target;
            if (!this.el.contains(target) && this.el !== target && !element.contains(target) && element !== target) {
                this.hide();
            }
        });
    }
    show(rgb) {
        this.visible = true;
        this.el.style.display = 'block';
        console.log(rgb);
        if (_util_util__WEBPACK_IMPORTED_MODULE_0__["hexPattern"].test(rgb))
            rgb = hex2rgb(rgb);
        console.log(rgb);
        const rgbO = rgb2object(rgb);
        this.palette.updateRGB(rgbO.r, rgbO.g, rgbO.b);
    }
    hide() {
        this.el.style.display = 'none';
        this.visible = false;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ColorPicker);


/***/ }),

/***/ "./src/controls/dialog.ts":
/*!********************************!*\
  !*** ./src/controls/dialog.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/emitter */ "./src/core/emitter.ts");
/* harmony import */ var _core_svgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/svgs */ "./src/core/svgs.ts");
/**
 * 弹窗基类
 */


class Dialog extends _core_emitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(element, options) {
        super();
        this.visible = false;
        this.triggerEl = element;
        this.options = Object.assign({}, options);
        this.createSkeleton(element);
        this.createHeader();
        this.createFooter();
        document.body.appendChild(this.el);
    }
    createSkeleton(element) {
        this.el = document.createElement('div');
        this.el.className = 'rd_dialog';
        this.el.style.display = 'none';
        this.header = document.createElement('div');
        this.header.className = 'rd_dialog-header';
        this.el.appendChild(this.header);
        this.content = document.createElement('div');
        this.content.className = 'rd_dialog-content';
        this.el.appendChild(this.content);
        this.footer = document.createElement('div');
        this.footer.className = 'rd_dialog-footer';
        this.el.appendChild(this.footer);
        document.body.addEventListener('click', (e) => {
            if (!this.el.contains(e.target) && this.el !== e.target && !element.contains(e.target) && element !== e.target) {
                this.close();
            }
        });
    }
    createHeader() {
        const title = document.createElement('p');
        title.className = 'rd_dialog-title';
        title.textContent = this.options.title;
        this.header.appendChild(title);
        const close = document.createElement('button');
        close.className = 'rd_dialog-close';
        close.innerHTML = _core_svgs__WEBPACK_IMPORTED_MODULE_1__["default"].close;
        this.header.appendChild(close);
        close.addEventListener('click', (e) => this.close());
    }
    createFooter() {
        this.cancelBtn = document.createElement('button');
        this.cancelBtn.className = 'rd_dialog-cancel-btn';
        this.cancelBtn.textContent = '取消';
        this.footer.appendChild(this.cancelBtn);
        this.confirmBtn = document.createElement('button');
        this.confirmBtn.className = 'rd_dialog-confirm-btn';
        this.confirmBtn.textContent = '确认';
        this.footer.appendChild(this.confirmBtn);
        this.cancelBtn.addEventListener('click', (e) => this.close());
    }
    // 计算位置
    calcPos() {
        const bounding = this.triggerEl.getBoundingClientRect();
        const elWidth = this.el.clientWidth;
        const elHeight = this.el.clientHeight;
        const bodyWidth = document.body.clientWidth;
        let left = bounding.left;
        let top = bounding.bottom;
        if ((elWidth + bounding.left) > bodyWidth) {
            left = bodyWidth - elWidth;
        }
        this.el.style.left = left + 'px';
        this.el.style.top = top + 'px';
    }
    close() {
        this.el.style.display = 'none';
        this.visible = false;
    }
    open() {
        this.el.style.display = 'block';
        this.visible = true;
        this.calcPos();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Dialog);


/***/ }),

/***/ "./src/controls/imageDialog.ts":
/*!*************************************!*\
  !*** ./src/controls/imageDialog.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialog */ "./src/controls/dialog.ts");
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tab */ "./src/controls/tab.ts");
/* harmony import */ var _uploadImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uploadImage */ "./src/controls/uploadImage.ts");
/**
 * 图片弹窗
 */



class ImageDialog extends _dialog__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(element, options) {
        super(element, options);
        this.tab = new _tab__WEBPACK_IMPORTED_MODULE_1__["default"](this.content);
        this.createNetImageContent();
        this.tab.appendChild({ title: '网络图片', content: this.netImageContent });
        this.createLocalImageContent();
        this.tab.appendChild({ title: '本地图片', content: this.localImageContent });
        this.confirmBtn.addEventListener('click', (e) => {
            this.fire('confirm', this.url.value, this.alt.value);
            this.close();
        });
    }
    createNetImageContent() {
        this.netImageContent = document.createElement('div');
        this.netImageContent.className = 'rd_imagedialog-net';
        const form = `
    <div class="rd_form-group">
      <input class="rd_form-input rd_form-url" placeholder="链接地址" />
    </div>
    <div class="rd_form-group">
      <input class="rd_form-input rd_form-alt" placeholder="图片描述" />
    </div>
    `;
        this.netImageContent.innerHTML = form;
        this.url = this.netImageContent.querySelector('.rd_form-url');
        this.alt = this.netImageContent.querySelector('.rd_form-alt');
    }
    createLocalImageContent() {
        this.localImageContent = document.createElement('div');
        this.localImageContent.className = 'rd_imagedialog-local';
        const uploadImage = new _uploadImage__WEBPACK_IMPORTED_MODULE_2__["default"](this.localImageContent);
        uploadImage.on('change', result => {
            this.tab.setActive(0);
            this.url.value = result;
        });
    }
    setValue(url, alt) {
        this.url.value = url;
        this.alt.value = alt;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ImageDialog);


/***/ }),

/***/ "./src/controls/linkDialog.ts":
/*!************************************!*\
  !*** ./src/controls/linkDialog.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialog */ "./src/controls/dialog.ts");
/**
 * 链接弹窗
 */

class LinkDialog extends _dialog__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(element, options) {
        super(element, options);
        this.createContent();
        this.confirmBtn.addEventListener('click', (e) => {
            this.fire('confirm', this.href.value, this.text.value, this.title.value);
            this.close();
        });
    }
    createContent() {
        const content = `
    <div class="rd_form-group">
      <input class="rd_form-input rd_form-href" placeholder="链接地址" />
    </div>
    <div class="rd_form-group">
      <input class="rd_form-input rd_form-text" placeholder="显示文字" />
    </div>
    <div class="rd_form-group">
      <input class="rd_form-input rd_form-title" placeholder="标题" />
    </div>
    `;
        this.content.innerHTML = content;
        this.href = this.content.querySelector('.rd_form-href');
        this.text = this.content.querySelector('.rd_form-text');
        this.title = this.content.querySelector('.rd_form-title');
    }
    setValue(href, text, title) {
        this.href.value = href;
        this.text.value = text;
        this.title.value = title;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (LinkDialog);


/***/ }),

/***/ "./src/controls/select.ts":
/*!********************************!*\
  !*** ./src/controls/select.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/emitter */ "./src/core/emitter.ts");
/* harmony import */ var _selectButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectButton */ "./src/controls/selectButton.ts");
/* harmony import */ var _selectMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectMenu */ "./src/controls/selectMenu.ts");
/**
 * 选择器
 * @param
 * container: HTMLELEMENT
 * list: Item[]
 * @method
 * @event
 * itemClick selectText:string
 */



class Select extends _core_emitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(container, list) {
        super();
        this.selectButton = new _selectButton__WEBPACK_IMPORTED_MODULE_1__["default"](container);
        this.selectMenu = new _selectMenu__WEBPACK_IMPORTED_MODULE_2__["default"](list);
        this.selectMenu.inside = (e) => {
            return this.selectButton.el.contains(e.target) || this.selectButton === e.target;
        };
        this.selectButton.on('click', (e, coordinate, label) => {
            if (!this.selectMenu.isShow) {
                const index = list.findIndex(item => item.label === label);
                this.selectMenu.setActive(index);
                this.selectMenu.show(coordinate);
            }
            else {
                this.selectMenu.hide();
            }
        });
        this.selectMenu.on('itemClick', (item) => {
            this.selectButton.setText(item.label);
            this.fire('itemClick', item);
            this.selectMenu.hide();
        });
    }
    setValue(text) {
        this.selectButton.setText(text);
    }
    setCustomClass(style) {
        this.selectButton.el.classList.add(style);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Select);


/***/ }),

/***/ "./src/controls/selectButton.ts":
/*!**************************************!*\
  !*** ./src/controls/selectButton.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/emitter */ "./src/core/emitter.ts");
/* harmony import */ var _core_svgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/svgs */ "./src/core/svgs.ts");
/**
 * 选择按钮
 * @param
 * container: HTMLELEMENT
 * @method
 * setText(text: string): void;
 * @event
 * click  e, isShow: boolean, coordinate: Coordinate
 */


class SelectButton extends _core_emitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(container) {
        super();
        this.el = document.createElement('div');
        this.textSpan = document.createElement('div');
        this.icon = document.createElement('div');
        this.el.className = 'richeditor_toolbarItem rd_select-btn';
        this.textSpan.className = 'rd_select-btn-text';
        this.icon.className = 'rd_select-btn-icon';
        container.appendChild(this.el);
        this.el.appendChild(this.textSpan);
        this.el.appendChild(this.icon);
        this.setIcon(_core_svgs__WEBPACK_IMPORTED_MODULE_1__["default"]["chevron-down"]);
        this.el.addEventListener('click', (e) => {
            var coordinate = this.el.getBoundingClientRect();
            this.fire('click', e, coordinate, this.textSpan.textContent);
        });
    }
    setIcon(svg) {
        this.icon.innerHTML = svg;
    }
    setText(text) {
        this.textSpan.textContent = text;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (SelectButton);


/***/ }),

/***/ "./src/controls/selectMenu.ts":
/*!************************************!*\
  !*** ./src/controls/selectMenu.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/emitter */ "./src/core/emitter.ts");
/**
 * 选择菜单
 * @param
 * list: Item[]
 * first: boolean
 * @method
 * show(coordinate: Coordinate): void;
 * hide(): void;
 * @event
 * itemClick item:Item
 */

class SelectMenu extends _core_emitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(list) {
        super();
        this.isShow = false;
        this.list = list;
        this.createElement(list);
        this.el.addEventListener('click', this.onClick.bind(this));
        document.body.addEventListener('click', (e) => {
            var insideMenu = this.el.contains(e.target) || this.el === e.target;
            if (!insideMenu && !this.inside(e))
                this.hide();
        });
    }
    createElement(list) {
        this.el = document.createElement('div');
        this.el.className = 'rd_select-menu';
        const ul = document.createElement('ul');
        this.el.appendChild(ul);
        for (let i = 0; i < list.length; i++) {
            const li = document.createElement('li');
            li.textContent = list[i].label;
            ul.appendChild(li);
        }
    }
    onClick(e) {
        if (e.target.tagName.toLowerCase() === 'li') {
            this.selectItem(e.target);
            const index = [].slice.call(this.el.querySelectorAll('li')).findIndex(item => item === e.target);
            this.fire('itemClick', this.list[index]);
        }
    }
    selectItem(li) {
        const lis = this.el.querySelectorAll('li');
        lis.forEach(item => {
            if (item === li)
                item.className = 'selected';
            item.className = '';
        });
    }
    show(coordinate) {
        this.el.style.left = coordinate.left + 'px';
        this.el.style.top = coordinate.bottom + 'px';
        this.el.style.display = 'block';
        this.isShow = true;
        document.body.appendChild(this.el);
    }
    hide() {
        this.el.style.display = 'none';
        this.isShow = false;
    }
    inside(e) {
        return false;
    }
    setActive(n) {
        [].slice.call(this.el.querySelectorAll('li')).forEach((item, index) => {
            if (index === n)
                return item.classList.add('active');
            item.classList.remove('active');
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (SelectMenu);


/***/ }),

/***/ "./src/controls/tab.ts":
/*!*****************************!*\
  !*** ./src/controls/tab.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/emitter */ "./src/core/emitter.ts");
/**
 * tab 切换控件
 */

class Tab extends _core_emitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(container) {
        super();
        this.tabList = [];
        this.createElement(container);
        this.header.addEventListener('click', (e) => this.onHeaderClick(e));
    }
    createElement(container) {
        this.el = document.createElement('div');
        this.el.className = 'rd_tab';
        container.appendChild(this.el);
        this.header = document.createElement('div');
        this.header.className = 'rd_tab-header';
        this.el.appendChild(this.header);
        this.content = document.createElement('div');
        this.content.className = 'rd_tab-content';
        this.el.appendChild(this.content);
    }
    appendChild(child) {
        this.tabList.push(child);
        const titleNode = document.createElement('div');
        titleNode.className = 'rd_tab-header-item';
        if (this.tabList.length === 1)
            titleNode.classList.add('active');
        titleNode.textContent = child.title;
        this.header.appendChild(titleNode);
        const contentNode = document.createElement('div');
        contentNode.className = 'rd_tab-content-item';
        if (this.tabList.length === 1)
            contentNode.classList.add('active');
        contentNode.appendChild(child.content);
        this.content.appendChild(contentNode);
    }
    onHeaderClick(e) {
        const target = e.target;
        if (!this.header.contains(target) || this.header === target)
            return;
        const children = Array.from(this.header.children);
        const index = children.findIndex(node => node === target);
        this.setActive(index);
    }
    setActive(index) {
        this.state = index;
        this.tabList.forEach((item, i) => {
            if (i === index) {
                this.header.children[i].classList.add('active');
                this.content.children[i].classList.add('active');
                return;
            }
            this.header.children[i].classList.remove('active');
            this.content.children[i].classList.remove('active');
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Tab);


/***/ }),

/***/ "./src/controls/uploadImage.ts":
/*!*************************************!*\
  !*** ./src/controls/uploadImage.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/emitter */ "./src/core/emitter.ts");
/**
 * 上传图片
 */

class UploadImage extends _core_emitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(container) {
        super();
        this.createElement(container);
        this.uploadBtn.addEventListener('click', (e) => this.upload(e));
        this.fileElem.addEventListener('change', (e) => this.onFileChange(e));
        this.el.addEventListener('dragenter', (e) => this.onDragEnter(e));
        this.el.addEventListener('dragleave', (e) => this.onDragLeave(e));
        this.el.addEventListener('dragover', (e) => this.onDragOver(e));
        this.el.addEventListener('drop', (e) => this.onDrop(e));
    }
    createElement(container) {
        this.el = document.createElement('div');
        this.el.className = 'rd_upload-image';
        const desc = document.createElement('div');
        desc.className = 'rd_upload-image-desc';
        desc.textContent = '拖拽一张图片至此';
        this.el.appendChild(desc);
        this.uploadBtn = document.createElement('button');
        this.uploadBtn.className = 'rd_upload-button';
        this.uploadBtn.innerHTML = '上传图片<input type="file" accept="image/*" style="display:none">';
        this.fileElem = this.uploadBtn.querySelector('input');
        this.el.appendChild(this.uploadBtn);
        container.appendChild(this.el);
    }
    upload(e) {
        this.fileElem.click();
    }
    onFileChange(e) {
        const file = this.fileElem.files[0];
        this.handleFile(file);
    }
    onDragEnter(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    onDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
        const target = e.target;
        if (target === this.el || this.el.contains(target))
            this.el.classList.add('active');
    }
    onDragLeave(e) {
        e.stopPropagation();
        e.preventDefault();
        const target = e.target;
        if (target === this.el)
            this.el.classList.remove('active');
    }
    onDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        const target = e.target;
        if (target === this.el)
            this.el.classList.remove('active');
        const file = e.dataTransfer.files[0];
        this.handleFile(file);
    }
    handleFile(file) {
        const render = new FileReader();
        render.onload = (e) => {
            this.fire('change', e.target.result);
        };
        render.readAsDataURL(file);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (UploadImage);


/***/ }),

/***/ "./src/core/builtin.ts":
/*!*****************************!*\
  !*** ./src/core/builtin.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registry */ "./src/core/registry.ts");
/* harmony import */ var _builtins_imageScale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../builtins/imageScale */ "./src/builtins/imageScale.ts");
/**
 * 控件管理类
 */


class Builtin {
    constructor(editor) {
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerComponent('imageScale', new _builtins_imageScale__WEBPACK_IMPORTED_MODULE_1__["default"](editor));
    }
    register(name, component) {
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerComponent(name, component);
    }
    require(name) {
        return _registry__WEBPACK_IMPORTED_MODULE_0__["default"].requireComponent(name);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Builtin);


/***/ }),

/***/ "./src/core/command.ts":
/*!*****************************!*\
  !*** ./src/core/command.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (editor, commandName, showDefaultUI, ...args) {
    if (commandName === 'createLink') {
        let range = editor.range;
        let startContainer = editor.range.startContainer;
        let parentNode = startContainer.parentNode;
        // 光标不在a标签内，先通过document.execCommand创建链接
        if (parentNode.tagName !== 'A') {
            document.execCommand(commandName, showDefaultUI, args[0]);
            range = editor.selection.getRangeAt(0); // 内部range对象是异步更新的，所以直接获取最新range
            startContainer = range.startContainer;
            parentNode = startContainer.parentNode;
        }
        // 设置属性、链接、文字
        parentNode.setAttribute('href', args[0]);
        parentNode.setAttribute('title', args[2]);
        parentNode.textContent = args[1];
        // 设置范围对象起始点
        const node = parentNode.firstChild;
        range.setStart(node, 0);
        range.setEnd(node, node.length);
        return;
    }
    if (commandName === 'insertImage') {
        const img = document.createElement('img');
        img.src = args[0];
        img.alt = args[1];
        editor.range.insertNode(img);
        img.onload = function () {
            editor.selectImage(img);
        };
        return;
    }
    document.execCommand(commandName, showDefaultUI, args[0]);
});


/***/ }),

/***/ "./src/core/control.ts":
/*!*****************************!*\
  !*** ./src/core/control.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registry */ "./src/core/registry.ts");
/* harmony import */ var _controls_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controls/button */ "./src/controls/button.ts");
/* harmony import */ var _controls_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controls/select */ "./src/controls/select.ts");
/* harmony import */ var _controls_selectButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controls/selectButton */ "./src/controls/selectButton.ts");
/* harmony import */ var _controls_selectMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controls/selectMenu */ "./src/controls/selectMenu.ts");
/* harmony import */ var _controls_colorButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controls/colorButton */ "./src/controls/colorButton.ts");
/* harmony import */ var _controls_colorPicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controls/colorPicker */ "./src/controls/colorPicker.ts");
/* harmony import */ var _controls_linkDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controls/linkDialog */ "./src/controls/linkDialog.ts");
/* harmony import */ var _controls_imageDialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../controls/imageDialog */ "./src/controls/imageDialog.ts");
/* harmony import */ var _controls_uploadImage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../controls/uploadImage */ "./src/controls/uploadImage.ts");
/**
 * 控件管理类
 */










class Control {
    constructor() {
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerControl('button', _controls_button__WEBPACK_IMPORTED_MODULE_1__["default"]);
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerControl('select', _controls_select__WEBPACK_IMPORTED_MODULE_2__["default"]);
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerControl('selectButton', _controls_selectButton__WEBPACK_IMPORTED_MODULE_3__["default"]);
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerControl('selectMenu', _controls_selectMenu__WEBPACK_IMPORTED_MODULE_4__["default"]);
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerControl('colorPicker', _controls_colorPicker__WEBPACK_IMPORTED_MODULE_6__["default"]);
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerControl('colorButton', _controls_colorButton__WEBPACK_IMPORTED_MODULE_5__["default"]);
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerControl('linkDialog', _controls_linkDialog__WEBPACK_IMPORTED_MODULE_7__["default"]);
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerControl('imageDialog', _controls_imageDialog__WEBPACK_IMPORTED_MODULE_8__["default"]);
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerControl('uploadImage', _controls_uploadImage__WEBPACK_IMPORTED_MODULE_9__["default"]);
    }
    register(name, control) {
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerControl(name, control);
    }
    require(name) {
        return _registry__WEBPACK_IMPORTED_MODULE_0__["default"].requireControl(name);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Control);


/***/ }),

/***/ "./src/core/editor.ts":
/*!****************************!*\
  !*** ./src/core/editor.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emitter */ "./src/core/emitter.ts");
/* harmony import */ var _command__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./command */ "./src/core/command.ts");
/* harmony import */ var _builtin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./builtin */ "./src/core/builtin.ts");
/**
 * 编辑器区域类
 */



class Editor extends _emitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(container) {
        super();
        this.selection = null;
        this.range = null;
        this.createElement(container);
        this.builtin = new _builtin__WEBPACK_IMPORTED_MODULE_2__["default"](this);
        this.saveSelection();
        // 使用keyup监听，使用keydown的话函数执行会超前一步
        this.el.addEventListener('keyup', this.handleLine.bind(this));
    }
    createElement(container) {
        const areaContainer = document.createElement('div');
        areaContainer.className = 'rd_area-container';
        this.el = document.createElement('div');
        this.el.className = 'richeditor_area';
        this.el.setAttribute('contenteditable', 'true');
        areaContainer.appendChild(this.el);
        container.appendChild(areaContainer);
        this.appendP();
    }
    // 使编辑器内部填充p标签
    appendP() {
        const p = document.createElement('p');
        const br = document.createElement('br');
        p.appendChild(br);
        this.el.appendChild(p);
    }
    // 使编辑器内部始终存在一个p标签
    handleLine(e) {
        if (e.keyCode === 8 && this.el.querySelectorAll('p').length === 0) {
            this.appendP();
        }
    }
    // 通过mouseup和selectionchange事件将最后的选区范围对象保存在编辑器中
    saveSelection() {
        this.selection = window.getSelection();
        this.el.addEventListener('mouseup', () => {
            this.range = this.selection.getRangeAt(0);
        });
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            this.selection = selection;
            if (!selection.rangeCount)
                return;
            const range = selection.getRangeAt(0);
            if (!this.el.contains(range.startContainer))
                return;
            this.range = range;
            this.fireRangeChange();
        });
    }
    // 选区范围对象发生变化
    fireRangeChange() {
        this.fire('rangechange', this.range);
    }
    // 恢复选区
    // 当编辑区会失去焦点(比如点击toolbar), selection持有的range对象不指向编辑区
    restoreSelection() {
        if (this.range) {
            this.selection.removeAllRanges();
            this.selection.addRange(this.range);
        }
    }
    // 当执行document.execCommand时，选区对象中的范围对象被改变，需要重新保存范围对象
    saveRange() {
        this.range = this.selection.getRangeAt(0);
    }
    // 使用document.execCommand命令时，需要一些额外的操作
    // 1.先focus文本编辑区
    // 2.恢复选区范围对象
    // 3.执行document.execCommand之后，选区对象中的范围对象被改变，需要重新保存范围对象
    execCommand(commandName, showDefaultUI = false, ...args) {
        this.el.focus();
        this.restoreSelection();
        Object(_command__WEBPACK_IMPORTED_MODULE_1__["default"])(this, commandName, showDefaultUI, ...args);
        this.saveRange();
        this.fireRangeChange();
    }
    // 获取选中的范围对象回溯的节点链
    getNodeChain() {
        const range = this.range;
        if (!range)
            return [];
        // 获取节点链
        const startContainer = range.startContainer;
        let node = startContainer;
        const nodeChain = []; // 点击位置往上搜集的节点链
        while (node.nodeType === 3 || node !== this.el) {
            if (node.nodeType !== 3)
                nodeChain.push(node); // 排除text节点
            node = node.parentNode;
        }
        return nodeChain;
    }
    // 选中选区是否与工具栏模式匹配
    match(matchPattern) {
        const range = this.range;
        if (!range)
            return false;
        // 获取节点链
        const startContainer = range.startContainer;
        let node = startContainer;
        let nodeChain = []; // 点击位置往上搜集的节点链
        while (node.nodeType === 3 || node !== this.el) {
            if (node.nodeType !== 3)
                nodeChain.push(node); // 排除text节点
            node = node.parentNode;
        }
        const value = matchPattern.value;
        // value: string | array
        if (matchPattern.type === 'tagName') {
            if (typeof value === 'string') {
                return nodeChain.some(node => node.tagName === value);
            }
            else {
                return value.some(name => {
                    return nodeChain.some(node => node.tagName === name);
                });
            }
            // value: object
        }
        else if (matchPattern.type === 'style') {
            if (value) {
                return Object.keys(value).some(key => {
                    return nodeChain.some(node => node.style[key] === value[key]);
                });
            }
            else {
                for (let i = 0; i < nodeChain.length; i++) {
                    const styleValue = nodeChain[i].style[matchPattern.styleName];
                    if (styleValue) {
                        return styleValue;
                    }
                }
            }
            // value: object
        }
        else if (matchPattern.type === 'tagNameAttribute') {
            const node = nodeChain.find(node => node.tagName === matchPattern.tagName);
            if (!node)
                return null;
            if (value) {
                let attrValAttr = (typeof value === 'string') ? [value] : value;
                let val = attrValAttr.find(val => node.getAttribute(matchPattern.attribute) === val);
                return val;
            }
            else {
                let attr = matchPattern.attribute;
                return node.getAttribute(attr);
            }
        }
        return false;
    }
    // 选中编辑区的图片，使其可以拖拽大小
    selectImage(img) {
        const imageScale = this.builtin.require('imageScale');
        imageScale.selectImage(img);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Editor);


/***/ }),

/***/ "./src/core/emitter.ts":
/*!*****************************!*\
  !*** ./src/core/emitter.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 事件系统：管理事件的触发和监听
 */
class Emitter {
    constructor() {
        this.events = {};
    }
    on(type, fn) {
        (this.events[type] || (this.events[type] = [])).push(fn);
    }
    once(type, fn) {
        (this.events[type] || (this.events[type] = [])).push((...args) => {
            fn(...args);
            this.off(type, fn);
        });
    }
    off(type, fn) {
        if (this.events[type]) {
            const index = this.events[type].indexOf(fn);
            if (index !== -1)
                this.events[type].splice(index, 1);
        }
    }
    fire(type, ...args) {
        this.events[type] && this.events[type].forEach(fn => {
            fn(...args);
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Emitter);


/***/ }),

/***/ "./src/core/registry.ts":
/*!******************************!*\
  !*** ./src/core/registry.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 插件注册器：微核通过此注册器来管理工具插件
 */
// 插件管理器类
class Registry {
    constructor() {
        this.components = {}; // 内置的组件
        this.plugins = []; // 扩展的工具栏
        this.controls = {}; // UI控件
    }
    registerComponent(name, component) {
        this.components[name] = component;
    }
    requireComponent(name) {
        return this.components[name];
    }
    registerPlugin(name, toolbar) {
        this.plugins.push({
            name,
            module: toolbar
        });
    }
    requirePlugin(name) {
        return this.plugins.find(plugin => plugin[name]);
    }
    registerControl(name, control) {
        this.controls[name] = control;
    }
    requireControl(name) {
        return this.controls[name];
    }
}
/* harmony default export */ __webpack_exports__["default"] = (new Registry());


/***/ }),

/***/ "./src/core/richEditor.ts":
/*!********************************!*\
  !*** ./src/core/richEditor.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolbar */ "./src/core/toolbar.ts");
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control */ "./src/core/control.ts");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor */ "./src/core/editor.ts");
/* harmony import */ var _svgs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./svgs */ "./src/core/svgs.ts");
/**
 * 富文本编辑器类
 */




class RichEditor {
    constructor(options) {
        if (!options.el)
            throw Error('el option is must');
        this.el = options.el;
        this.svgs = _svgs__WEBPACK_IMPORTED_MODULE_3__["default"];
        this.control = new _control__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.toolbar = new _toolbar__WEBPACK_IMPORTED_MODULE_0__["default"](this.el);
        this.editor = new _editor__WEBPACK_IMPORTED_MODULE_2__["default"](this.el);
        // 注册内置工具栏插件
        this.toolbar.registerPlugins(this);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (RichEditor);


/***/ }),

/***/ "./src/core/svgs.ts":
/*!**************************!*\
  !*** ./src/core/svgs.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 管理图标
 */
const svgs = {
    'bold': '<svg width="24" height="24"><path d="M7.8 19c-.3 0-.5 0-.6-.2l-.2-.5V5.7c0-.2 0-.4.2-.5l.6-.2h5c1.5 0 2.7.3 3.5 1 .7.6 1.1 1.4 1.1 2.5a3 3 0 0 1-.6 1.9c-.4.6-1 1-1.6 1.2.4.1.9.3 1.3.6s.8.7 1 1.2c.4.4.5 1 .5 1.6 0 1.3-.4 2.3-1.3 3-.8.7-2.1 1-3.8 1H7.8zm5-8.3c.6 0 1.2-.1 1.6-.5.4-.3.6-.7.6-1.3 0-1.1-.8-1.7-2.3-1.7H9.3v3.5h3.4zm.5 6c.7 0 1.3-.1 1.7-.4.4-.4.6-.9.6-1.5s-.2-1-.7-1.4c-.4-.3-1-.4-2-.4H9.4v3.8h4z" fill-rule="evenodd"/></svg>',
    'accessibility-check': '<svg width="24" height="24"><path d="M12 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2zm8 7h-5v12c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-5c0-.6-.4-1-1-1a1 1 0 0 0-1 1v5c0 .6-.4 1-1 1a1 1 0 0 1-1-1V9H4a1 1 0 1 1 0-2h16c.6 0 1 .4 1 1s-.4 1-1 1z" fill-rule="nonzero"/></svg>',
    'action-next': '<svg width="24" height="24"><path fill-rule="nonzero" d="M5.7 7.3a1 1 0 0 0-1.4 1.4l7.7 7.7 7.7-7.7a1 1 0 1 0-1.4-1.4L12 13.6 5.7 7.3z"/></svg>',
    'action-prev': '<svg width="24" height="24"><path fill-rule="nonzero" d="M18.3 15.7a1 1 0 0 0 1.4-1.4L12 6.6l-7.7 7.7a1 1 0 0 0 1.4 1.4L12 9.4l6.3 6.3z"/></svg>',
    'align-center': '<svg width="24" height="24"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm3 4h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 1 1 0-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2zm-3-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
    'align-justify': '<svg width="24" height="24"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
    'align-left': '<svg width="24" height="24"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 4h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2zm0-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
    'align-none': '<svg width="24" height="24"><path d="M14.2 5L13 7H5a1 1 0 1 1 0-2h9.2zm4 0h.8a1 1 0 0 1 0 2h-2l1.2-2zm-6.4 4l-1.2 2H5a1 1 0 0 1 0-2h6.8zm4 0H19a1 1 0 0 1 0 2h-4.4l1.2-2zm-6.4 4l-1.2 2H5a1 1 0 0 1 0-2h4.4zm4 0H19a1 1 0 0 1 0 2h-6.8l1.2-2zM7 17l-1.2 2H5a1 1 0 0 1 0-2h2zm4 0h8a1 1 0 0 1 0 2H9.8l1.2-2zm5.2-13.5l1.3.7-9.7 16.3-1.3-.7 9.7-16.3z" fill-rule="evenodd"/></svg>',
    'align-right': '<svg width="24" height="24"><path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm6 4h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm-6-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
    'arrow-left': '<svg width="24" height="24"><path d="M5.6 13l12 6a1 1 0 0 0 1.4-1V6a1 1 0 0 0-1.4-.9l-12 6a1 1 0 0 0 0 1.8z" fill-rule="evenodd"/></svg>',
    'arrow-right': '<svg width="24" height="24"><path d="M18.5 13l-12 6A1 1 0 0 1 5 18V6a1 1 0 0 1 1.4-.9l12 6a1 1 0 0 1 0 1.8z" fill-rule="evenodd"/></svg>',
    'bookmark': '<svg width="24" height="24"><path d="M6 4v17l6-4 6 4V4c0-.6-.4-1-1-1H7a1 1 0 0 0-1 1z" fill-rule="nonzero"/></svg>',
    'border-width': '<svg width="24" height="24"><path d="M5 14.8h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm-.5 3.7h15c.3 0 .5.2.5.5s-.2.5-.5.5h-15a.5.5 0 1 1 0-1zm.5-8.3h14c.6 0 1 .4 1 1v1c0 .5-.4 1-1 1H5a1 1 0 0 1-1-1v-1c0-.6.4-1 1-1zm0-5.7h14c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1v-2c0-.6.4-1 1-1z" fill-rule="evenodd"/></svg>',
    'brightness': '<svg width="24" height="24"><path d="M12 17c.3 0 .5.1.7.3.2.2.3.4.3.7v1c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7v-1c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3zm0-10a1 1 0 0 1-.7-.3A1 1 0 0 1 11 6V5c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3.3 0 .5.1.7.3.2.2.3.4.3.7v1c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3zm7 4c.3 0 .5.1.7.3.2.2.3.4.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3h-1a1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h1zM7 12c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3H5a1 1 0 0 1-.7-.3A1 1 0 0 1 4 12c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h1c.3 0 .5.1.7.3.2.2.3.4.3.7zm10 3.5l.7.8c.2.1.3.4.3.6 0 .3-.1.6-.3.8a1 1 0 0 1-.8.3 1 1 0 0 1-.6-.3l-.8-.7a1 1 0 0 1-.3-.8c0-.2.1-.5.3-.7a1 1 0 0 1 1.4 0zm-10-7l-.7-.8a1 1 0 0 1-.3-.6c0-.3.1-.6.3-.8.2-.2.5-.3.8-.3.2 0 .5.1.7.3l.7.7c.2.2.3.5.3.8 0 .2-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.8-.3zm10 0a1 1 0 0 1-.8.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.3.1-.6.3-.8l.8-.7c.1-.2.4-.3.6-.3.3 0 .6.1.8.3.2.2.3.5.3.8 0 .2-.1.5-.3.7l-.7.7zm-10 7c.2-.2.5-.3.8-.3.2 0 .5.1.7.3a1 1 0 0 1 0 1.4l-.8.8a1 1 0 0 1-.6.3 1 1 0 0 1-.8-.3 1 1 0 0 1-.3-.8c0-.2.1-.5.3-.6l.7-.8zM12 8a4 4 0 0 1 3.7 2.4 4 4 0 0 1 0 3.2A4 4 0 0 1 12 16a4 4 0 0 1-3.7-2.4 4 4 0 0 1 0-3.2A4 4 0 0 1 12 8zm0 6.5c.7 0 1.3-.2 1.8-.7.5-.5.7-1.1.7-1.8s-.2-1.3-.7-1.8c-.5-.5-1.1-.7-1.8-.7s-1.3.2-1.8.7c-.5.5-.7 1.1-.7 1.8s.2 1.3.7 1.8c.5.5 1.1.7 1.8.7z" fill-rule="evenodd"/></svg>',
    'browse': '<svg width="24" height="24"><path d="M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4v-2h4V8H5v10h4v2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14zm-8 9.4l-2.3 2.3a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L13 13.4V20a1 1 0 0 1-2 0v-6.6z" fill-rule="nonzero"/></svg>',
    'cancel': '<svg width="24" height="24"><path d="M12 4.6a7.4 7.4 0 1 1 0 14.8 7.4 7.4 0 0 1 0-14.8zM12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 8L14.8 8l1 1.1-2.7 2.8 2.7 2.7-1.1 1.1-2.7-2.7-2.7 2.7-1-1.1 2.6-2.7-2.7-2.7 1-1.1 2.8 2.7z" fill-rule="nonzero"/></svg>',
    'change-case': '<svg width="24" height="24"><path d="M18.4 18.2v-.6c-.5.8-1.3 1.2-2.4 1.2-2.2 0-3.3-1.6-3.3-4.8 0-3.1 1-4.7 3.3-4.7 1.1 0 1.8.3 2.4 1.1v-.6c0-.5.4-.8.8-.8s.8.3.8.8v8.4c0 .5-.4.8-.8.8a.8.8 0 0 1-.8-.8zm-2-7.4c-1.3 0-1.8.9-1.8 3.2 0 2.4.5 3.3 1.7 3.3 1.3 0 1.8-.9 1.8-3.2 0-2.4-.5-3.3-1.7-3.3zM10 15.7H5.5l-.8 2.6a1 1 0 0 1-1 .7h-.2a.7.7 0 0 1-.7-1l4-12a1 1 0 1 1 2 0l4 12a.7.7 0 0 1-.8 1h-.2a1 1 0 0 1-1-.7l-.8-2.6zm-.3-1.5l-2-6.5-1.9 6.5h3.9z" fill-rule="evenodd"/></svg>',
    'character-count': '<svg width="24" height="24"><path d="M4 11.5h16v1H4v-1zm4.8-6.8V10H7.7V5.8h-1v-1h2zM11 8.3V9h2v1h-3V7.7l2-1v-.9h-2v-1h3v2.4l-2 1zm6.3-3.4V10h-3.1V9h2.1V8h-2.1V6.8h2.1v-1h-2.1v-1h3.1zM5.8 16.4c0-.5.2-.8.5-1 .2-.2.6-.3 1.2-.3l.8.1c.2 0 .4.2.5.3l.4.4v2.8l.2.3H8.2v-.1-.2l-.6.3H7c-.4 0-.7 0-1-.2a1 1 0 0 1-.3-.9c0-.3 0-.6.3-.8.3-.2.7-.4 1.2-.4l.6-.2h.3v-.2l-.1-.2a.8.8 0 0 0-.5-.1 1 1 0 0 0-.4 0l-.3.4h-1zm2.3.8h-.2l-.2.1-.4.1a1 1 0 0 0-.4.2l-.2.2.1.3.5.1h.4l.4-.4v-.6zm2-3.4h1.2v1.7l.5-.3h.5c.5 0 .9.1 1.2.5.3.4.5.8.5 1.4 0 .6-.2 1.1-.5 1.5-.3.4-.7.6-1.3.6l-.6-.1-.4-.4v.4h-1.1v-5.4zm1.1 3.3c0 .3 0 .6.2.8a.7.7 0 0 0 1.2 0l.2-.8c0-.4 0-.6-.2-.8a.7.7 0 0 0-.6-.3l-.6.3-.2.8zm6.1-.5c0-.2 0-.3-.2-.4a.8.8 0 0 0-.5-.2c-.3 0-.5.1-.6.3l-.2.9c0 .3 0 .6.2.8.1.2.3.3.6.3.2 0 .4 0 .5-.2l.2-.4h1.1c0 .5-.3.8-.6 1.1a2 2 0 0 1-1.3.4c-.5 0-1-.2-1.3-.6a2 2 0 0 1-.5-1.4c0-.6.1-1.1.5-1.5.3-.4.8-.5 1.4-.5.5 0 1 0 1.2.3.4.3.5.7.5 1.2h-1v-.1z" fill-rule="evenodd"/></svg>',
    'checklist-rtl': '<svg width="24" height="24"><path d="M5 17h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm14.2 11c.2-.4.6-.5.9-.3.3.2.4.6.2 1L18 20c-.2.3-.7.4-1 0l-1.3-1.3a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8zm0-6c.2-.4.6-.5.9-.3.3.2.4.6.2 1L18 14c-.2.3-.7.4-1 0l-1.3-1.3a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8zm0-6c.2-.4.6-.5.9-.3.3.2.4.6.2 1L18 8c-.2.3-.7.4-1 0l-1.3-1.3a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8z" fill-rule="evenodd"/></svg>',
    'checklist': '<svg width="24" height="24"><path d="M11 17h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0-6h8a1 1 0 0 1 0 2h-8a1 1 0 0 1 0-2zM7.2 16c.2-.4.6-.5.9-.3.3.2.4.6.2 1L6 20c-.2.3-.7.4-1 0l-1.3-1.3a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8zm0-6c.2-.4.6-.5.9-.3.3.2.4.6.2 1L6 14c-.2.3-.7.4-1 0l-1.3-1.3a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8zm0-6c.2-.4.6-.5.9-.3.3.2.4.6.2 1L6 8c-.2.3-.7.4-1 0L3.8 6.9a.7.7 0 0 1 0-1c.3-.2.7-.2 1 0l.7.9 1.7-2.8z" fill-rule="evenodd"/></svg>',
    'checkmark': '<svg width="24" height="24"><path d="M18.2 5.4a1 1 0 0 1 1.6 1.2l-8 12a1 1 0 0 1-1.5.1l-5-5a1 1 0 1 1 1.4-1.4l4.1 4.1 7.4-11z" fill-rule="nonzero"/></svg>',
    'chevron-down': '<svg width="10" height="10"><path d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z" fill-rule="nonzero"/></svg>',
    'chevron-left': '<svg width="10" height="10"><path d="M7.8 1.3L4 5l3.8 3.7c.3.3.3.8 0 1-.4.4-.9.4-1.2 0L2.2 5.7a.8.8 0 0 1 0-1.2L6.6.2C7 0 7.4 0 7.8.2c.3.3.3.8 0 1.1z" fill-rule="nonzero"/></svg>',
    'chevron-right': '<svg width="10" height="10"><path d="M2.2 1.3a.8.8 0 0 1 0-1c.4-.4.9-.4 1.2 0l4.4 4.1c.3.4.3.9 0 1.2L3.4 9.8c-.3.3-.8.3-1.2 0a.8.8 0 0 1 0-1.1L6 5 2.2 1.3z" fill-rule="nonzero"/></svg>',
    'chevron-up': '<svg width="10" height="10"><path d="M8.7 7.8L5 4 1.3 7.8c-.3.3-.8.3-1 0a.8.8 0 0 1 0-1.2l4.1-4.4c.3-.3.9-.3 1.2 0l4.2 4.4c.3.3.3.9 0 1.2-.3.3-.8.3-1.1 0z" fill-rule="nonzero"/></svg>',
    'close': '<svg width="24" height="24"><path d="M17.3 8.2L13.4 12l3.9 3.8a1 1 0 0 1-1.5 1.5L12 13.4l-3.8 3.9a1 1 0 0 1-1.5-1.5l3.9-3.8-3.9-3.8a1 1 0 0 1 1.5-1.5l3.8 3.9 3.8-3.9a1 1 0 0 1 1.5 1.5z" fill-rule="evenodd"/></svg>',
    'code-sample': '<svg width="24" height="26"><path d="M7.1 11a2.8 2.8 0 0 1-.8 2 2.8 2.8 0 0 1 .8 2v1.7c0 .3.1.6.4.8.2.3.5.4.8.4.3 0 .4.2.4.4v.8c0 .2-.1.4-.4.4-.7 0-1.4-.3-2-.8-.5-.6-.8-1.3-.8-2V15c0-.3-.1-.6-.4-.8-.2-.3-.5-.4-.8-.4a.4.4 0 0 1-.4-.4v-.8c0-.2.2-.4.4-.4.3 0 .6-.1.8-.4.3-.2.4-.5.4-.8V9.3c0-.7.3-1.4.8-2 .6-.5 1.3-.8 2-.8.3 0 .4.2.4.4v.8c0 .2-.1.4-.4.4-.3 0-.6.1-.8.4-.3.2-.4.5-.4.8V11zm9.8 0V9.3c0-.3-.1-.6-.4-.8-.2-.3-.5-.4-.8-.4a.4.4 0 0 1-.4-.4V7c0-.2.1-.4.4-.4.7 0 1.4.3 2 .8.5.6.8 1.3.8 2V11c0 .3.1.6.4.8.2.3.5.4.8.4.2 0 .4.2.4.4v.8c0 .2-.2.4-.4.4-.3 0-.6.1-.8.4-.3.2-.4.5-.4.8v1.7c0 .7-.3 1.4-.8 2-.6.5-1.3.8-2 .8a.4.4 0 0 1-.4-.4v-.8c0-.2.1-.4.4-.4.3 0 .6-.1.8-.4.3-.2.4-.5.4-.8V15a2.8 2.8 0 0 1 .8-2 2.8 2.8 0 0 1-.8-2zm-3.3-.4c0 .4-.1.8-.5 1.1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5-.4-.3-.5-.7-.5-1.1 0-.5.1-.9.5-1.2.3-.3.7-.4 1.1-.4.4 0 .8.1 1.1.4.4.3.5.7.5 1.2zM12 13c.4 0 .8.1 1.1.5.4.3.5.7.5 1.1 0 1-.1 1.6-.5 2a3 3 0 0 1-1.1 1c-.4.3-.8.4-1.1.4a.5.5 0 0 1-.5-.5V17a3 3 0 0 0 1-.2l.6-.6c-.6 0-1-.2-1.3-.5-.2-.3-.3-.7-.3-1 0-.5.1-1 .5-1.2.3-.4.7-.5 1.1-.5z" fill-rule="evenodd"/></svg>',
    'color-levels': '<svg width="24" height="24"><path d="M17.5 11.4A9 9 0 0 1 18 14c0 .5 0 1-.2 1.4 0 .4-.3.9-.5 1.3a6.2 6.2 0 0 1-3.7 3 5.7 5.7 0 0 1-3.2 0A5.9 5.9 0 0 1 7.6 18a6.2 6.2 0 0 1-1.4-2.6 6.7 6.7 0 0 1 0-2.8c0-.4.1-.9.3-1.3a13.6 13.6 0 0 1 2.3-4A20 20 0 0 1 12 4a26.4 26.4 0 0 1 3.2 3.4 18.2 18.2 0 0 1 2.3 4zm-2 4.5c.4-.7.5-1.4.5-2a7.3 7.3 0 0 0-1-3.2c.2.6.2 1.2.2 1.9a4.5 4.5 0 0 1-1.3 3 5.3 5.3 0 0 1-2.3 1.5 4.9 4.9 0 0 1-2 .1 4.3 4.3 0 0 0 2.4.8 4 4 0 0 0 2-.6 4 4 0 0 0 1.5-1.5z" fill-rule="evenodd"/></svg>',
    'color-picker': '<svg width="24" height="24"><path d="M12 3a9 9 0 0 0 0 18 1.5 1.5 0 0 0 1.1-2.5c-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill-rule="nonzero"/></svg>',
    'color-swatch-remove-color': '<svg width="24" height="24"><path stroke="#000" stroke-width="2" d="M21 3L3 21" fill-rule="evenodd"/></svg>',
    'color-swatch': '<svg width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="1" fill-rule="evenodd"/></svg>',
    'comment-add': '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M9 19l3-2h7c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h4v2zm-2 4v-4H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-6.4L7 23z"/><path d="M13 10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V8a1 1 0 0 1 2 0v2z"/></g></svg>',
    'comment': '<svg width="24" height="24"><path fill-rule="nonzero" d="M9 19l3-2h7c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h4v2zm-2 4v-4H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-6.4L7 23z"/></svg>',
    'contrast': '<svg width="24" height="24"><path d="M12 4a7.8 7.8 0 0 1 5.7 2.3A8 8 0 1 1 12 4zm-6 8a6 6 0 0 0 6 6V6a6 6 0 0 0-6 6z" fill-rule="evenodd"/></svg>',
    'copy': '<svg width="24" height="24"><path d="M16 3H6a2 2 0 0 0-2 2v11h2V5h10V3zm1 4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9c0-1.2.9-2 2-2h7zm0 12V9h-7v10h7z" fill-rule="nonzero"/></svg>',
    'crop': '<svg width="24" height="24"><path d="M17 8v7h2c.6 0 1 .4 1 1s-.4 1-1 1h-2v2c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-2H7V9H5a1 1 0 1 1 0-2h2V5c0-.6.4-1 1-1s1 .4 1 1v2h7l3-3 1 1-3 3zM9 9v5l5-5H9zm1 6h5v-5l-5 5z" fill-rule="evenodd"/></svg>',
    'cut': '<svg width="24" height="24"><path d="M18 15c.6.7 1 1.4 1 2.3 0 .8-.2 1.5-.7 2l-.8.5-1 .2c-.4 0-.8 0-1.2-.3a3.9 3.9 0 0 1-2.1-2.2c-.2-.5-.3-1-.2-1.5l-1-1-1 1c0 .5 0 1-.2 1.5-.1.5-.4 1-.9 1.4-.3.4-.7.6-1.2.8l-1.2.3c-.4 0-.7 0-1-.2-.3 0-.6-.3-.8-.5-.5-.5-.8-1.2-.7-2 0-.9.4-1.6 1-2.2A3.7 3.7 0 0 1 8.6 14H9l1-1-4-4-.5-1a3.3 3.3 0 0 1 0-2c0-.4.3-.7.5-1l6 6 6-6 .5 1a3.3 3.3 0 0 1 0 2c0 .4-.3.7-.5 1l-4 4 1 1h.5c.4 0 .8 0 1.2.3.5.2.9.4 1.2.8zm-8.5 2.2l.1-.4v-.3-.4a1 1 0 0 0-.2-.5 1 1 0 0 0-.4-.2 1.6 1.6 0 0 0-.8 0 2.6 2.6 0 0 0-.8.3 2.5 2.5 0 0 0-.9 1.1l-.1.4v.7l.2.5.5.2h.7a2.5 2.5 0 0 0 .8-.3 2.8 2.8 0 0 0 1-1zm2.5-2.8c.4 0 .7-.1 1-.4.3-.3.4-.6.4-1s-.1-.7-.4-1c-.3-.3-.6-.4-1-.4s-.7.1-1 .4c-.3.3-.4.6-.4 1s.1.7.4 1c.3.3.6.4 1 .4zm5.4 4l.2-.5v-.4-.3a2.6 2.6 0 0 0-.3-.8 2.4 2.4 0 0 0-.7-.7 2.5 2.5 0 0 0-.8-.3 1.5 1.5 0 0 0-.8 0 1 1 0 0 0-.4.2 1 1 0 0 0-.2.5 1.5 1.5 0 0 0 0 .7v.4l.3.4.3.4a2.8 2.8 0 0 0 .8.5l.4.1h.7l.5-.2z" fill-rule="evenodd"/></svg>',
    'document-properties': '<svg width="24" height="24"><path d="M14.4 3H7a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7.6L14.4 3zM17 19H7V5h6v4h4v10z" fill-rule="nonzero"/></svg>',
    'drag': '<svg width="24" height="24"><path d="M13 5h2v2h-2V5zm0 4h2v2h-2V9zM9 9h2v2H9V9zm4 4h2v2h-2v-2zm-4 0h2v2H9v-2zm0 4h2v2H9v-2zm4 0h2v2h-2v-2zM9 5h2v2H9V5z" fill-rule="evenodd"/></svg>',
    'duplicate': '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M16 3v2H6v11H4V5c0-1.1.9-2 2-2h10zm3 8h-2V9h-7v10h9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9c0-1.2.9-2 2-2h7a2 2 0 0 1 2 2v2z"/><path d="M17 14h1a1 1 0 0 1 0 2h-1v1a1 1 0 0 1-2 0v-1h-1a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 2 0v1z"/></g></svg>',
    'edit-block': '<svg width="24" height="24"><path fill-rule="nonzero" d="M19.8 8.8l-9.4 9.4c-.2.2-.5.4-.9.4l-5.4 1.2 1.2-5.4.5-.8 9.4-9.4c.7-.7 1.8-.7 2.5 0l2.1 2.1c.7.7.7 1.8 0 2.5zm-2-.2l1-.9v-.3l-2.2-2.2a.3.3 0 0 0-.3 0l-1 1L18 8.5zm-1 1l-2.5-2.4-6 6 2.5 2.5 6-6zm-7 7.1l-2.6-2.4-.3.3-.1.2-.7 3 3.1-.6h.1l.4-.5z"/></svg>',
    'edit-image': '<svg width="24" height="24"><path d="M18 16h2V7a2 2 0 0 0-2-2H7v2h11v9zM6 17h15a1 1 0 0 1 0 2h-1v1a1 1 0 0 1-2 0v-1H6a2 2 0 0 1-2-2V7H3a1 1 0 1 1 0-2h1V4a1 1 0 1 1 2 0v13zm3-5.3l1.3 2 3-4.7 3.7 6H7l2-3.3z" fill-rule="nonzero"/></svg>',
    'embed-page': '<svg width="24" height="24"><path d="M19 6V5H5v14h2A13 13 0 0 1 19 6zm0 1.4c-.8.8-1.6 2.4-2.2 4.6H19V7.4zm0 5.6h-2.4c-.4 1.8-.6 3.8-.6 6h3v-6zm-4 6c0-2.2.2-4.2.6-6H13c-.7 1.8-1.1 3.8-1.1 6h3zm-4 0c0-2.2.4-4.2 1-6H9.6A12 12 0 0 0 8 19h3zM4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1zm11.8 9c.4-1.9 1-3.4 1.8-4.5a9.2 9.2 0 0 0-4 4.5h2.2zm-3.4 0a12 12 0 0 1 2.8-4 12 12 0 0 0-5 4h2.2z" fill-rule="nonzero"/></svg>',
    'embed': '<svg width="24" height="24"><path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1zm1 2v14h14V5H5zm4.8 2.6l5.6 4a.5.5 0 0 1 0 .8l-5.6 4A.5.5 0 0 1 9 16V8a.5.5 0 0 1 .8-.4z" fill-rule="nonzero"/></svg>',
    'emoji': '<svg width="24" height="24"><path d="M9 11c.6 0 1-.4 1-1s-.4-1-1-1a1 1 0 0 0-1 1c0 .6.4 1 1 1zm6 0c.6 0 1-.4 1-1s-.4-1-1-1a1 1 0 0 0-1 1c0 .6.4 1 1 1zm-3 5.5c2.1 0 4-1.5 4.4-3.5H7.6c.5 2 2.3 3.5 4.4 3.5zM12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" fill-rule="nonzero"/></svg>',
    'fill': '<svg width="24" height="26"><path d="M16.6 12l-9-9-1.4 1.4 2.4 2.4-5.2 5.1c-.5.6-.5 1.6 0 2.2L9 19.6a1.5 1.5 0 0 0 2.2 0l5.5-5.5c.5-.6.5-1.6 0-2.2zM5.2 13L10 8.2l4.8 4.8H5.2zM19 14.5s-2 2.2-2 3.5c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.3-2-3.5-2-3.5z" fill-rule="nonzero"/></svg>',
    'flip-horizontally': '<svg width="24" height="24"><path d="M14 19h2v-2h-2v2zm4-8h2V9h-2v2zM4 7v10c0 1.1.9 2 2 2h3v-2H6V7h3V5H6a2 2 0 0 0-2 2zm14-2v2h2a2 2 0 0 0-2-2zm-7 16h2V3h-2v18zm7-6h2v-2h-2v2zm-4-8h2V5h-2v2zm4 12a2 2 0 0 0 2-2h-2v2z" fill-rule="nonzero"/></svg>',
    'flip-vertically': '<svg width="24" height="24"><path d="M5 14v2h2v-2H5zm8 4v2h2v-2h-2zm4-14H7a2 2 0 0 0-2 2v3h2V6h10v3h2V6a2 2 0 0 0-2-2zm2 14h-2v2a2 2 0 0 0 2-2zM3 11v2h18v-2H3zm6 7v2h2v-2H9zm8-4v2h2v-2h-2zM5 18c0 1.1.9 2 2 2v-2H5z" fill-rule="nonzero"/></svg>',
    'format-painter': '<svg width="24" height="24"><path d="M18 5V4c0-.5-.4-1-1-1H5a1 1 0 0 0-1 1v4c0 .6.5 1 1 1h12c.6 0 1-.4 1-1V7h1v4H9v9c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-7h8V5h-3z" fill-rule="nonzero"/></svg>',
    'fullscreen': '<svg width="24" height="24"><path d="M15.3 10l-1.2-1.3 2.9-3h-2.3a.9.9 0 1 1 0-1.7H19c.5 0 .9.4.9.9v4.4a.9.9 0 1 1-1.8 0V7l-2.9 3zm0 4l3 3v-2.3a.9.9 0 1 1 1.7 0V19c0 .5-.4.9-.9.9h-4.4a.9.9 0 1 1 0-1.8H17l-3-2.9 1.3-1.2zM10 15.4l-2.9 3h2.3a.9.9 0 1 1 0 1.7H5a.9.9 0 0 1-.9-.9v-4.4a.9.9 0 1 1 1.8 0V17l2.9-3 1.2 1.3zM8.7 10L5.7 7v2.3a.9.9 0 0 1-1.7 0V5c0-.5.4-.9.9-.9h4.4a.9.9 0 0 1 0 1.8H7l3 2.9-1.3 1.2z" fill-rule="nonzero"/></svg>',
    'gallery': '<svg width="24" height="24"><path fill-rule="nonzero" d="M5 15.7l2.3-2.2c.3-.3.7-.3 1 0L11 16l5.1-5c.3-.4.8-.4 1 0l2 1.9V8H5v7.7zM5 18V19h3l1.8-1.9-2-2L5 17.9zm14-3l-2.5-2.4-6.4 6.5H19v-4zM4 6h16c.6 0 1 .4 1 1v13c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V7c0-.6.4-1 1-1zm6 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM4.5 4h15a.5.5 0 1 1 0 1h-15a.5.5 0 0 1 0-1zm2-2h11a.5.5 0 1 1 0 1h-11a.5.5 0 0 1 0-1z"/></svg>',
    'gamma': '<svg width="24" height="24"><path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1zm1 2v14h14V5H5zm6.5 11.8V14L9.2 8.7a5.1 5.1 0 0 0-.4-.8l-.1-.2H8 8v-1l.3-.1.3-.1h.7a1 1 0 0 1 .6.5l.1.3a8.5 8.5 0 0 1 .3.6l1.9 4.6 2-5.2a1 1 0 0 1 1-.6.5.5 0 0 1 .5.6L13 14v2.8a.7.7 0 0 1-1.4 0z" fill-rule="nonzero"/></svg>',
    'help': '<svg width="24" height="24"><g fill-rule="evenodd"><path d="M12 5.5a6.5 6.5 0 0 0-6 9 6.3 6.3 0 0 0 1.4 2l1 1a6.3 6.3 0 0 0 3.6 1 6.5 6.5 0 0 0 6-9 6.3 6.3 0 0 0-1.4-2l-1-1a6.3 6.3 0 0 0-3.6-1zM12 4a7.8 7.8 0 0 1 5.7 2.3A8 8 0 1 1 12 4z"/><path d="M9.6 9.7a.7.7 0 0 1-.7-.8c0-1.1 1.5-1.8 3.2-1.8 1.8 0 3.2.8 3.2 2.4 0 1.4-.4 2.1-1.5 2.8-.2 0-.3.1-.3.2a2 2 0 0 0-.8.8.8.8 0 0 1-1.4-.6c.3-.7.8-1 1.3-1.5l.4-.2c.7-.4.8-.6.8-1.5 0-.5-.6-.9-1.7-.9-.5 0-1 .1-1.4.3-.2 0-.3.1-.3.2v-.2c0 .4-.4.8-.8.8z" fill-rule="nonzero"/><circle cx="12" cy="16" r="1"/></g></svg>',
    'highlight-bg-color': '<svg width="24" height="24"><g fill-rule="evenodd"><path class="color-underline" d="M3 18h18v3H3z"/><path fill-rule="nonzero" d="M7.7 16.7H3l3.3-3.3-.7-.8L10.2 8l4 4.1-4 4.2c-.2.2-.6.2-.8 0l-.6-.7-1.1 1.1zm5-7.5L11 7.4l3-2.9a2 2 0 0 1 2.6 0L18 6c.7.7.7 2 0 2.7l-2.9 2.9-1.8-1.8-.5-.6"/></g></svg>',
    'home': '<svg width="24" height="24"><path fill-rule="nonzero" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
    'horizontal-rule': '<svg width="24" height="24"><path d="M4 11h16v2H4z" fill-rule="evenodd"/></svg>',
    'image-options': '<svg width="24" height="24"><path d="M6 10a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2zm12 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2zm-6 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z" fill-rule="nonzero"/></svg>',
    'image': '<svg width="24" height="24"><path d="M5 15.7l3.3-3.2c.3-.3.7-.3 1 0L12 15l4.1-4c.3-.4.8-.4 1 0l2 1.9V5H5v10.7zM5 18V19h3l2.8-2.9-2-2L5 17.9zm14-3l-2.5-2.4-6.4 6.5H19v-4zM4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1zm6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill-rule="nonzero"/></svg>',
    'indent': '<svg width="24" height="24"><path d="M7 5h12c.6 0 1 .4 1 1s-.4 1-1 1H7a1 1 0 1 1 0-2zm5 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm0 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm-5 4h12a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2zm-2.6-3.8L6.2 12l-1.8-1.2a1 1 0 0 1 1.2-1.6l3 2a1 1 0 0 1 0 1.6l-3 2a1 1 0 1 1-1.2-1.6z" fill-rule="evenodd"/></svg>',
    'info': '<svg width="24" height="24"><path d="M12 4a7.8 7.8 0 0 1 5.7 2.3A8 8 0 1 1 12 4zm-1 3v2h2V7h-2zm3 10v-1h-1v-5h-3v1h1v4h-1v1h4z" fill-rule="evenodd"/></svg>',
    'insert-character': '<svg width="24" height="24"><path d="M15 18h4l1-2v4h-6v-3.3l1.4-1a6 6 0 0 0 1.8-2.9 6.3 6.3 0 0 0-.1-4.1 5.8 5.8 0 0 0-3-3.2c-.6-.3-1.3-.5-2.1-.5a5.1 5.1 0 0 0-3.9 1.8 6.3 6.3 0 0 0-1.3 6 6.2 6.2 0 0 0 1.8 3l1.4.9V20H4v-4l1 2h4v-.5l-2-1L5.4 15A6.5 6.5 0 0 1 4 11c0-1 .2-1.9.6-2.7A7 7 0 0 1 6.3 6C7.1 5.4 8 5 9 4.5c1-.3 2-.5 3.1-.5a8.8 8.8 0 0 1 5.7 2 7 7 0 0 1 1.7 2.3 6 6 0 0 1 .2 4.8c-.2.7-.6 1.3-1 1.9a7.6 7.6 0 0 1-3.6 2.5v.5z" fill-rule="evenodd"/></svg>',
    'insert-time': '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0 2a9 9 0 1 1 0-18 9 9 0 0 1 0 18z"/><path d="M16 12h-3V7c0-.6-.4-1-1-1a1 1 0 0 0-1 1v7h5c.6 0 1-.4 1-1s-.4-1-1-1z"/></g></svg>',
    'invert': '<svg width="24" height="24"><path d="M18 19.3L16.5 18a5.8 5.8 0 0 1-3.1 1.9 6.1 6.1 0 0 1-5.5-1.6A5.8 5.8 0 0 1 6 14v-.3l.1-1.2A13.9 13.9 0 0 1 7.7 9l-3-3 .7-.8 2.8 2.9 9 8.9 1.5 1.6-.7.6zm0-5.5v.3l-.1 1.1-.4 1-1.2-1.2a4.3 4.3 0 0 0 .2-1v-.2c0-.4 0-.8-.2-1.3l-.5-1.4a14.8 14.8 0 0 0-3-4.2L12 6a26.1 26.1 0 0 0-2.2 2.5l-1-1a20.9 20.9 0 0 1 2.9-3.3L12 4l1 .8a22.2 22.2 0 0 1 4 5.4c.6 1.2 1 2.4 1 3.6z" fill-rule="evenodd"/></svg>',
    'italic': '<svg width="24" height="24"><path d="M16.7 4.7l-.1.9h-.3c-.6 0-1 0-1.4.3-.3.3-.4.6-.5 1.1l-2.1 9.8v.6c0 .5.4.8 1.4.8h.2l-.2.8H8l.2-.8h.2c1.1 0 1.8-.5 2-1.5l2-9.8.1-.5c0-.6-.4-.8-1.4-.8h-.3l.2-.9h5.8z" fill-rule="evenodd"/></svg>',
    'line': '<svg width="24" height="24"><path d="M15 9l-8 8H4v-3l8-8 3 3zm1-1l-3-3 1-1h1c-.2 0 0 0 0 0l2 2s0 .2 0 0v1l-1 1zM4 18h16v2H4v-2z" fill-rule="evenodd"/></svg>',
    'link': '<svg width="24" height="24"><path d="M6.2 12.3a1 1 0 0 1 1.4 1.4l-2.1 2a2 2 0 1 0 2.7 2.8l4.8-4.8a1 1 0 0 0 0-1.4 1 1 0 1 1 1.4-1.3 2.9 2.9 0 0 1 0 4L9.6 20a3.9 3.9 0 0 1-5.5-5.5l2-2zm11.6-.6a1 1 0 0 1-1.4-1.4l2-2a2 2 0 1 0-2.6-2.8L11 10.3a1 1 0 0 0 0 1.4A1 1 0 1 1 9.6 13a2.9 2.9 0 0 1 0-4L14.4 4a3.9 3.9 0 0 1 5.5 5.5l-2 2z" fill-rule="nonzero"/></svg>',
    'list-bull-circle': '<svg width="48" height="48"><g fill-rule="evenodd"><path d="M11 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM11 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM11 36a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill-rule="nonzero"/><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/></g></svg>',
    'list-bull-default': '<svg width="48" height="48"><g fill-rule="evenodd"><circle cx="11" cy="14" r="3"/><circle cx="11" cy="24" r="3"/><circle cx="11" cy="34" r="3"/><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/></g></svg>',
    'list-bull-square': '<svg width="48" height="48"><g fill-rule="evenodd"><path d="M8 11h6v6H8zM8 21h6v6H8zM8 31h6v6H8z"/><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/></g></svg>',
    'list-num-default-rtl': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M8 12h22v4H8zM8 22h22v4H8zM8 32h22v4H8z"/><path d="M37.4 17v-4.8l-1.6 1v-1.1l1.6-1h1.2V17zM33.3 17.1c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zm1.7 5.7c0-1.2 1-2 2.2-2 1.3 0 2.1.8 2.1 1.8 0 .7-.3 1.2-1.3 2.2l-1.2 1v.2h2.6v1h-4.3v-.9l2-1.9c.8-.8 1-1.1 1-1.5 0-.5-.4-.8-1-.8-.5 0-.9.3-.9.9H35zm-1.7 4.3c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zm3.2 7.3v-1h.7c.6 0 1-.3 1-.8 0-.4-.4-.7-1-.7s-1 .3-1 .8H35c0-1.1 1-1.8 2.2-1.8 1.2 0 2.1.6 2.1 1.6 0 .7-.4 1.2-1 1.3v.1c.7.1 1.3.7 1.3 1.4 0 1-1 1.9-2.4 1.9-1.3 0-2.2-.8-2.3-2h1.2c0 .6.5 1 1.1 1 .6 0 1-.4 1-1 0-.5-.3-.8-1-.8h-.7zm-3.3 2.7c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .8.3.8.7 0 .4-.3.7-.8.7z"/></g></svg>',
    'list-num-default': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M10 17v-4.8l-1.5 1v-1.1l1.6-1h1.2V17h-1.2zm3.6.1c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .7.3.7.7 0 .4-.2.7-.7.7zm-5 5.7c0-1.2.8-2 2.1-2s2.1.8 2.1 1.8c0 .7-.3 1.2-1.4 2.2l-1.1 1v.2h2.6v1H8.6v-.9l2-1.9c.8-.8 1-1.1 1-1.5 0-.5-.4-.8-1-.8-.5 0-.9.3-.9.9H8.5zm6.3 4.3c-.5 0-.7-.3-.7-.7 0-.4.2-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zM10 34.4v-1h.7c.6 0 1-.3 1-.8 0-.4-.4-.7-1-.7s-1 .3-1 .8H8.6c0-1.1 1-1.8 2.2-1.8 1.3 0 2.1.6 2.1 1.6 0 .7-.4 1.2-1 1.3v.1c.8.1 1.3.7 1.3 1.4 0 1-1 1.9-2.4 1.9-1.3 0-2.2-.8-2.3-2h1.2c0 .6.5 1 1.1 1 .7 0 1-.4 1-1 0-.5-.3-.8-1-.8h-.7zm4.7 2.7c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .8.3.8.7 0 .4-.3.7-.8.7z"/></g></svg>',
    'list-num-lower-alpha-rtl': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M8 12h22v4H8zM8 22h22v4H8zM8 32h22v4H8z"/><path d="M36.5 16c-.9 0-1.5-.5-1.5-1.3s.6-1.3 1.8-1.4h1v-.4c0-.4-.2-.6-.7-.6-.4 0-.7.1-.8.4h-1.1c0-.8.8-1.4 2-1.4S39 12 39 13V16h-1.2v-.6c-.3.4-.8.7-1.4.7zm.4-.8c.6 0 1-.4 1-.9V14h-1c-.5.1-.7.3-.7.6 0 .4.3.6.7.6zM33.1 16.1c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .8.3.8.7 0 .4-.3.7-.8.7zM37.7 26c-.7 0-1.2-.2-1.5-.7v.7H35v-6.3h1.2v2.5c.3-.5.8-.9 1.5-.9 1.1 0 1.8 1 1.8 2.4 0 1.5-.7 2.4-1.8 2.4zm-.5-3.6c-.6 0-1 .5-1 1.3s.4 1.4 1 1.4c.7 0 1-.6 1-1.4 0-.8-.3-1.3-1-1.3zM33.2 26.1c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .8.3.8.7 0 .4-.3.7-.8.7zm6 7h-1c-.1-.5-.4-.8-1-.8s-1 .5-1 1.4c0 1 .4 1.4 1 1.4.5 0 .9-.2 1-.7h1c0 1-.8 1.7-2 1.7-1.4 0-2.2-.9-2.2-2.4s.8-2.4 2.2-2.4c1.2 0 2 .7 2 1.7zm-6.1 3c-.5 0-.7-.3-.7-.7 0-.4.2-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z"/></g></svg>',
    'list-num-lower-alpha': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M10.3 15.2c.5 0 1-.4 1-.9V14h-1c-.5.1-.8.3-.8.6 0 .4.3.6.8.6zm-.4.9c-1 0-1.5-.6-1.5-1.4 0-.8.6-1.3 1.7-1.4h1.1v-.4c0-.4-.2-.6-.7-.6-.5 0-.8.1-.9.4h-1c0-.8.8-1.4 2-1.4 1.1 0 1.8.6 1.8 1.6V16h-1.1v-.6h-.1c-.2.4-.7.7-1.3.7zm4.6 0c-.5 0-.7-.3-.7-.7 0-.4.2-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zm-3.2 10c-.6 0-1.2-.3-1.4-.8v.7H8.5v-6.3H10v2.5c.3-.5.8-.9 1.4-.9 1.2 0 1.9 1 1.9 2.4 0 1.5-.7 2.4-1.9 2.4zm-.4-3.7c-.7 0-1 .5-1 1.3s.3 1.4 1 1.4c.6 0 1-.6 1-1.4 0-.8-.4-1.3-1-1.3zm4 3.7c-.5 0-.7-.3-.7-.7 0-.4.2-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zm-2.2 7h-1.2c0-.5-.4-.8-.9-.8-.6 0-1 .5-1 1.4 0 1 .4 1.4 1 1.4.5 0 .8-.2 1-.7h1c0 1-.8 1.7-2 1.7-1.4 0-2.2-.9-2.2-2.4s.8-2.4 2.2-2.4c1.2 0 2 .7 2 1.7zm1.8 3c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z"/></g></svg>',
    'list-num-lower-greek-rtl': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M8 12h22v4H8zM8 22h22v4H8zM8 32h22v4H8z"/><path d="M37.4 16c-1.2 0-2-.8-2-2.3 0-1.5.8-2.4 2-2.4.6 0 1 .4 1.3 1v-.9H40v3.2c0 .4.1.5.4.5h.2v.9h-.6c-.6 0-1-.2-1-.7h-.2c-.2.4-.7.8-1.3.8zm.3-1c.6 0 1-.5 1-1.3s-.4-1.3-1-1.3-1 .5-1 1.3.4 1.4 1 1.4zM33.3 16.1c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zM36 21.9c0-1.5.8-2.3 2.1-2.3 1.2 0 2 .6 2 1.6 0 .6-.3 1-.9 1.3.9.3 1.3.8 1.3 1.7 0 1.2-.7 1.9-1.8 1.9-.6 0-1.1-.3-1.4-.8v2.2H36V22zm1.8 1.2v-1h.3c.5 0 .9-.2.9-.7 0-.5-.3-.8-.9-.8-.5 0-.8.3-.8 1v2.2c0 .8.4 1.3 1 1.3s1-.4 1-1-.4-1-1.2-1h-.3zM33.3 26.1c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zM37.1 34.6L34.8 30h1.4l1.7 3.5 1.7-3.5h1.1l-2.2 4.6v.1c.5.8.7 1.4.7 1.8 0 .4-.2.8-.4 1-.2.2-.6.3-1 .3-.9 0-1.3-.4-1.3-1.2 0-.5.2-1 .5-1.7l.1-.2zm.7 1a2 2 0 0 0-.4.9c0 .3.1.4.4.4.3 0 .4-.1.4-.4 0-.2-.1-.6-.4-1zM33.3 36.1c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z"/></g></svg>',
    'list-num-lower-greek': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M10.5 15c.7 0 1-.5 1-1.3s-.3-1.3-1-1.3c-.5 0-.9.5-.9 1.3s.4 1.4 1 1.4zm-.3 1c-1.1 0-1.8-.8-1.8-2.3 0-1.5.7-2.4 1.8-2.4.7 0 1.1.4 1.3 1h.1v-.9h1.2v3.2c0 .4.1.5.4.5h.2v.9h-.6c-.6 0-1-.2-1.1-.7h-.1c-.2.4-.7.8-1.4.8zm5 .1c-.5 0-.8-.3-.8-.7 0-.4.3-.7.7-.7.5 0 .8.3.8.7 0 .4-.3.7-.8.7zm-4.9 7v-1h.3c.6 0 1-.2 1-.7 0-.5-.4-.8-1-.8-.5 0-.8.3-.8 1v2.2c0 .8.4 1.3 1.1 1.3.6 0 1-.4 1-1s-.5-1-1.3-1h-.3zM8.6 22c0-1.5.7-2.3 2-2.3 1.2 0 2 .6 2 1.6 0 .6-.3 1-.8 1.3.8.3 1.3.8 1.3 1.7 0 1.2-.8 1.9-1.9 1.9-.6 0-1.1-.3-1.3-.8v2.2H8.5V22zm6.2 4.2c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .7.3.7.7 0 .4-.2.7-.7.7zm-4.5 8.5L8 30h1.4l1.7 3.5 1.7-3.5h1.1l-2.2 4.6v.1c.5.8.7 1.4.7 1.8 0 .4-.1.8-.4 1-.2.2-.6.3-1 .3-.9 0-1.3-.4-1.3-1.2 0-.5.2-1 .5-1.7l.1-.2zm.7 1a2 2 0 0 0-.4.9c0 .3.1.4.4.4.3 0 .4-.1.4-.4 0-.2-.1-.6-.4-1zm4.5.5c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z"/></g></svg>',
    'list-num-lower-roman-rtl': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M8 12h22v4H8zM8 22h22v4H8zM8 32h22v4H8z"/><path d="M32.9 16v-1.2h-1.3V16H33zm0 10v-1.2h-1.3V26H33zm0 10v-1.2h-1.3V36H33z"/><path fill-rule="nonzero" d="M36 21h-1.5v5H36zM36 31h-1.5v5H36zM39 21h-1.5v5H39zM39 31h-1.5v5H39zM42 31h-1.5v5H42zM36 11h-1.5v5H36zM36 19h-1.5v1H36zM36 29h-1.5v1H36zM39 19h-1.5v1H39zM39 29h-1.5v1H39zM42 29h-1.5v1H42zM36 9h-1.5v1H36z"/></g></svg>',
    'list-num-lower-roman': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M15.1 16v-1.2h1.3V16H15zm0 10v-1.2h1.3V26H15zm0 10v-1.2h1.3V36H15z"/><path fill-rule="nonzero" d="M12 21h1.5v5H12zM12 31h1.5v5H12zM9 21h1.5v5H9zM9 31h1.5v5H9zM6 31h1.5v5H6zM12 11h1.5v5H12zM12 19h1.5v1H12zM12 29h1.5v1H12zM9 19h1.5v1H9zM9 29h1.5v1H9zM6 29h1.5v1H6zM12 9h1.5v1H12z"/></g></svg>',
    'list-num-upper-alpha-rtl': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M8 12h22v4H8zM8 22h22v4H8zM8 32h22v4H8z"/><path d="M39.3 17l-.5-1.4h-2l-.5 1.4H35l2-6h1.6l2 6h-1.3zm-1.6-4.7l-.7 2.3h1.6l-.8-2.3zM33.4 17c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .7.3.7.7 0 .4-.2.7-.7.7zm4.7 9.9h-2.7v-6H38c1.2 0 1.9.6 1.9 1.5 0 .6-.5 1.2-1 1.3.7.1 1.3.7 1.3 1.5 0 1-.8 1.7-2 1.7zm-1.4-5v1.5h1c.6 0 1-.3 1-.8 0-.4-.4-.7-1-.7h-1zm0 4h1.1c.7 0 1.1-.3 1.1-.8 0-.6-.4-.9-1.1-.9h-1.1V26zM33 27.1c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zm4.9 10c-1.8 0-2.8-1.1-2.8-3.1s1-3.1 2.8-3.1c1.4 0 2.5.9 2.6 2.2h-1.3c0-.7-.6-1.1-1.3-1.1-1 0-1.6.7-1.6 2s.6 2 1.6 2c.7 0 1.2-.4 1.4-1h1.2c-.1 1.3-1.2 2.2-2.6 2.2zm-4.5 0c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z"/></g></svg>',
    'list-num-upper-alpha': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M12.6 17l-.5-1.4h-2L9.5 17H8.3l2-6H12l2 6h-1.3zM11 12.3l-.7 2.3h1.6l-.8-2.3zm4.7 4.8c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.5 0 .7.3.7.7 0 .4-.2.7-.7.7zM11.4 27H8.7v-6h2.6c1.2 0 1.9.6 1.9 1.5 0 .6-.5 1.2-1 1.3.7.1 1.3.7 1.3 1.5 0 1-.8 1.7-2 1.7zM10 22v1.5h1c.6 0 1-.3 1-.8 0-.4-.4-.7-1-.7h-1zm0 4H11c.7 0 1.1-.3 1.1-.8 0-.6-.4-.9-1.1-.9H10V26zm5.4 1.1c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zm-4.1 10c-1.8 0-2.8-1.1-2.8-3.1s1-3.1 2.8-3.1c1.4 0 2.5.9 2.6 2.2h-1.3c0-.7-.6-1.1-1.3-1.1-1 0-1.6.7-1.6 2s.6 2 1.6 2c.7 0 1.2-.4 1.4-1h1.2c-.1 1.3-1.2 2.2-2.6 2.2zm4.5 0c-.5 0-.8-.3-.8-.7 0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7z"/></g></svg>',
    'list-num-upper-roman-rtl': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M8 12h22v4H8zM8 22h22v4H8zM8 32h22v4H8z"/><path d="M31.6 17v-1.2H33V17h-1.3zm0 10v-1.2H33V27h-1.3zm0 10v-1.2H33V37h-1.3z"/><path fill-rule="nonzero" d="M34.5 20H36v7h-1.5zM34.5 30H36v7h-1.5zM37.5 20H39v7h-1.5zM37.5 30H39v7h-1.5zM40.5 30H42v7h-1.5zM34.5 10H36v7h-1.5z"/></g></svg>',
    'list-num-upper-roman': '<svg width="48" height="48"><g fill-rule="evenodd"><path opacity=".2" d="M18 12h22v4H18zM18 22h22v4H18zM18 32h22v4H18z"/><path d="M15.1 17v-1.2h1.3V17H15zm0 10v-1.2h1.3V27H15zm0 10v-1.2h1.3V37H15z"/><path fill-rule="nonzero" d="M12 20h1.5v7H12zM12 30h1.5v7H12zM9 20h1.5v7H9zM9 30h1.5v7H9zM6 30h1.5v7H6zM12 10h1.5v7H12z"/></g></svg>',
    'lock': '<svg width="24" height="24"><path d="M16.3 11c.2 0 .3 0 .5.2l.2.6v7.4c0 .3 0 .4-.2.6l-.6.2H7.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6v-7.4c0-.3 0-.4.2-.6l.5-.2H8V8c0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9h2c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v3h.3zM10 8v3h4V8a1 1 0 0 0-.3-.7A1 1 0 0 0 13 7h-2a1 1 0 0 0-.7.3 1 1 0 0 0-.3.7z" fill-rule="evenodd"/></svg>',
    'ltr': '<svg width="24" height="24"><path d="M11 5h7a1 1 0 0 1 0 2h-1v11a1 1 0 0 1-2 0V7h-2v11a1 1 0 0 1-2 0v-6c-.5 0-1 0-1.4-.3A3.4 3.4 0 0 1 7.8 10a3.3 3.3 0 0 1 0-2.8 3.4 3.4 0 0 1 1.8-1.8L11 5zM4.4 16.2L6.2 15l-1.8-1.2a1 1 0 0 1 1.2-1.6l3 2a1 1 0 0 1 0 1.6l-3 2a1 1 0 1 1-1.2-1.6z" fill-rule="evenodd"/></svg>',
    'more-drawer': '<svg width="24" height="24"><path d="M6 10a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2zm12 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2zm-6 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z" fill-rule="nonzero"/></svg>',
    'new-document': '<svg width="24" height="24"><path d="M14.4 3H7a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7.6L14.4 3zM17 19H7V5h6v4h4v10z" fill-rule="nonzero"/></svg>',
    'new-tab': '<svg width="24" height="24"><path d="M15 13l2-2v8H5V7h8l-2 2H7v8h8v-4zm4-8v5.5l-2-2-5.6 5.5H10v-1.4L15.5 7l-2-2H19z" fill-rule="evenodd"/></svg>',
    'non-breaking': '<svg width="24" height="24"><path d="M11 11H8a1 1 0 1 1 0-2h3V6c0-.6.4-1 1-1s1 .4 1 1v3h3c.6 0 1 .4 1 1s-.4 1-1 1h-3v3c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-3zm10 4v5H3v-5c0-.6.4-1 1-1s1 .4 1 1v3h14v-3c0-.6.4-1 1-1s1 .4 1 1z" fill-rule="evenodd"/></svg>',
    'notice': '<svg width="24" height="24"><path d="M17.8 9.8L15.4 4 20 8.5v7L15.5 20h-7L4 15.5v-7L8.5 4h7l2.3 5.8zm0 0l2.2 5.7-2.3-5.8zM13 17v-2h-2v2h2zm0-4V7h-2v6h2z" fill-rule="evenodd"/></svg>',
    'ordered-list-rtl': '<svg width="24" height="24"><path d="M6 17h8a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2zm0-6h8a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2zm0-6h8a1 1 0 0 1 0 2H6a1 1 0 1 1 0-2zm13-1v3.5a.5.5 0 1 1-1 0V5h-.5a.5.5 0 1 1 0-1H19zm-1 8.8l.2.2h1.3a.5.5 0 1 1 0 1h-1.6a1 1 0 0 1-.9-1V13c0-.4.3-.8.6-1l1.2-.4.2-.3a.2.2 0 0 0-.2-.2h-1.3a.5.5 0 0 1-.5-.5c0-.3.2-.5.5-.5h1.6c.5 0 .9.4.9 1v.1c0 .4-.3.8-.6 1l-1.2.4-.2.3zm2 4.2v2c0 .6-.4 1-1 1h-1.5a.5.5 0 0 1 0-1h1.2a.3.3 0 1 0 0-.6h-1.3a.4.4 0 1 1 0-.8h1.3a.3.3 0 0 0 0-.6h-1.2a.5.5 0 1 1 0-1H19c.6 0 1 .4 1 1z" fill-rule="evenodd"/></svg>',
    'ordered-list': '<svg width="24" height="24"><path d="M10 17h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 1 1 0-2zM6 4v3.5c0 .3-.2.5-.5.5a.5.5 0 0 1-.5-.5V5h-.5a.5.5 0 0 1 0-1H6zm-1 8.8l.2.2h1.3c.3 0 .5.2.5.5s-.2.5-.5.5H4.9a1 1 0 0 1-.9-1V13c0-.4.3-.8.6-1l1.2-.4.2-.3a.2.2 0 0 0-.2-.2H4.5a.5.5 0 0 1-.5-.5c0-.3.2-.5.5-.5h1.6c.5 0 .9.4.9 1v.1c0 .4-.3.8-.6 1l-1.2.4-.2.3zM7 17v2c0 .6-.4 1-1 1H4.5a.5.5 0 0 1 0-1h1.2c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.4a.4.4 0 1 1 0-.8h1.3c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.5a.5.5 0 1 1 0-1H6c.6 0 1 .4 1 1z" fill-rule="evenodd"/></svg>',
    'orientation': '<svg width="24" height="24"><path d="M7.3 6.4L1 13l6.4 6.5 6.5-6.5-6.5-6.5zM3.7 13l3.6-3.7L11 13l-3.7 3.7-3.6-3.7zM12 6l2.8 2.7c.3.3.3.8 0 1-.3.4-.9.4-1.2 0L9.2 5.7a.8.8 0 0 1 0-1.2L13.6.2c.3-.3.9-.3 1.2 0 .3.3.3.8 0 1.1L12 4h1a9 9 0 1 1-4.3 16.9l1.5-1.5A7 7 0 1 0 13 6h-1z" fill-rule="nonzero"/></svg>',
    'outdent': '<svg width="24" height="24"><path d="M7 5h12c.6 0 1 .4 1 1s-.4 1-1 1H7a1 1 0 1 1 0-2zm5 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm0 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm-5 4h12a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2zm1.6-3.8a1 1 0 0 1-1.2 1.6l-3-2a1 1 0 0 1 0-1.6l3-2a1 1 0 0 1 1.2 1.6L6.8 12l1.8 1.2z" fill-rule="evenodd"/></svg>',
    'page-break': '<svg width="24" height="24"><g fill-rule="evenodd"><path d="M5 11c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zm3 0h1c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2zm4 0c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zm3 0h1c.6 0 1 .4 1 1s-.4 1-1 1h-1a1 1 0 0 1 0-2zm4 0c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zM7 3v5h10V3c0-.6.4-1 1-1s1 .4 1 1v7H5V3c0-.6.4-1 1-1s1 .4 1 1zM6 22a1 1 0 0 1-1-1v-7h14v7c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-5H7v5c0 .6-.4 1-1 1z"/></g></svg>',
    'paragraph': '<svg width="24" height="24"><path d="M10 5h7a1 1 0 0 1 0 2h-1v11a1 1 0 0 1-2 0V7h-2v11a1 1 0 0 1-2 0v-6c-.5 0-1 0-1.4-.3A3.4 3.4 0 0 1 6.8 10a3.3 3.3 0 0 1 0-2.8 3.4 3.4 0 0 1 1.8-1.8L10 5z" fill-rule="evenodd"/></svg>',
    'paste-text': '<svg width="24" height="24"><path d="M18 9V5h-2v1c0 .6-.4 1-1 1H9a1 1 0 0 1-1-1V5H6v13h3V9h9zM9 20H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.2A3 3 0 0 1 12 1a3 3 0 0 1 2.8 2H18a2 2 0 0 1 2 2v4h1v12H9v-1zm1.5-9.5v9h9v-9h-9zM12 3a1 1 0 0 0-1 1c0 .5.4 1 1 1s1-.5 1-1-.4-1-1-1zm0 9h6v2h-.5l-.5-1h-1v4h.8v1h-3.6v-1h.8v-4h-1l-.5 1H12v-2z" fill-rule="nonzero"/></svg>',
    'paste': '<svg width="24" height="24"><path d="M18 9V5h-2v1c0 .6-.4 1-1 1H9a1 1 0 0 1-1-1V5H6v13h3V9h9zM9 20H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.2A3 3 0 0 1 12 1a3 3 0 0 1 2.8 2H18a2 2 0 0 1 2 2v4h1v12H9v-1zm1.5-9.5v9h9v-9h-9zM12 3a1 1 0 0 0-1 1c0 .5.4 1 1 1s1-.5 1-1-.4-1-1-1z" fill-rule="nonzero"/></svg>',
    'permanent-pen': '<svg width="24" height="24"><path d="M10.5 17.5L8 20H3v-3l3.5-3.5a2 2 0 0 1 0-3L14 3l1 1-7.3 7.3a1 1 0 0 0 0 1.4l3.6 3.6c.4.4 1 .4 1.4 0L20 9l1 1-7.6 7.6a2 2 0 0 1-2.8 0l-.1-.1z" fill-rule="nonzero"/></svg>',
    'plus': '<svg width="24" height="24"><g fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#000" stroke-width="2"><path d="M12 5v14M5 12h14"/></g></svg>',
    'preferences': '<svg width="24" height="24"><path d="M20.1 13.5l-1.9.2a5.8 5.8 0 0 1-.6 1.5l1.2 1.5c.4.4.3 1 0 1.4l-.7.7a1 1 0 0 1-1.4 0l-1.5-1.2a6.2 6.2 0 0 1-1.5.6l-.2 1.9c0 .5-.5.9-1 .9h-1a1 1 0 0 1-1-.9l-.2-1.9a5.8 5.8 0 0 1-1.5-.6l-1.5 1.2a1 1 0 0 1-1.4 0l-.7-.7a1 1 0 0 1 0-1.4l1.2-1.5a6.2 6.2 0 0 1-.6-1.5l-1.9-.2a1 1 0 0 1-.9-1v-1c0-.5.4-1 .9-1l1.9-.2a5.8 5.8 0 0 1 .6-1.5L5.2 7.3a1 1 0 0 1 0-1.4l.7-.7a1 1 0 0 1 1.4 0l1.5 1.2a6.2 6.2 0 0 1 1.5-.6l.2-1.9c0-.5.5-.9 1-.9h1c.5 0 1 .4 1 .9l.2 1.9a5.8 5.8 0 0 1 1.5.6l1.5-1.2a1 1 0 0 1 1.4 0l.7.7c.3.4.4 1 0 1.4l-1.2 1.5a6.2 6.2 0 0 1 .6 1.5l1.9.2c.5 0 .9.5.9 1v1c0 .5-.4 1-.9 1zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill-rule="evenodd"/></svg>',
    'preview': '<svg width="24" height="24"><path d="M3.5 12.5c.5.8 1.1 1.6 1.8 2.3 2 2 4.2 3.2 6.7 3.2s4.7-1.2 6.7-3.2a16.2 16.2 0 0 0 2.1-2.8 15.7 15.7 0 0 0-2.1-2.8c-2-2-4.2-3.2-6.7-3.2a9.3 9.3 0 0 0-6.7 3.2A16.2 16.2 0 0 0 3.2 12c0 .2.2.3.3.5zm-2.4-1l.7-1.2L4 7.8C6.2 5.4 8.9 4 12 4c3 0 5.8 1.4 8.1 3.8a18.2 18.2 0 0 1 2.8 3.7v1l-.7 1.2-2.1 2.5c-2.3 2.4-5 3.8-8.1 3.8-3 0-5.8-1.4-8.1-3.8a18.2 18.2 0 0 1-2.8-3.7 1 1 0 0 1 0-1zm12-3.3a2 2 0 1 0 2.7 2.6 4 4 0 1 1-2.6-2.6z" fill-rule="nonzero"/></svg>',
    'print': '<svg width="24" height="24"><path d="M18 8H6a3 3 0 0 0-3 3v6h2v3h14v-3h2v-6a3 3 0 0 0-3-3zm-1 10H7v-4h10v4zm.5-5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm.5-8H6v2h12V5z" fill-rule="nonzero"/></svg>',
    'quote': '<svg width="24" height="24"><path d="M7.5 17h.9c.4 0 .7-.2.9-.6L11 13V8c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h2l-1.3 2.7a1 1 0 0 0 .8 1.3zm8 0h.9c.4 0 .7-.2.9-.6L19 13V8c0-.6-.4-1-1-1h-4a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h2l-1.3 2.7a1 1 0 0 0 .8 1.3z" fill-rule="nonzero"/></svg>',
    'redo': '<svg width="24" height="24"><path d="M17.6 10H12c-2.8 0-4.4 1.4-4.9 3.5-.4 2 .3 4 1.4 4.6a1 1 0 1 1-1 1.8c-2-1.2-2.9-4.1-2.3-6.8.6-3 3-5.1 6.8-5.1h5.6l-3.3-3.3a1 1 0 1 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3z" fill-rule="nonzero"/></svg>',
    'reload': '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M5 22.1l-1.2-4.7v-.2a1 1 0 0 1 1-1l5 .4a1 1 0 1 1-.2 2l-2.2-.2a7.8 7.8 0 0 0 8.4.2 7.5 7.5 0 0 0 3.5-6.4 1 1 0 1 1 2 0 9.5 9.5 0 0 1-4.5 8 9.9 9.9 0 0 1-10.2 0l.4 1.4a1 1 0 1 1-2 .5zM13.6 7.4c0-.5.5-1 1-.9l2.8.2a8 8 0 0 0-9.5-1 7.5 7.5 0 0 0-3.6 7 1 1 0 0 1-2 0 9.5 9.5 0 0 1 4.5-8.6 10 10 0 0 1 10.9.3l-.3-1a1 1 0 0 1 2-.5l1.1 4.8a1 1 0 0 1-1 1.2l-5-.4a1 1 0 0 1-.9-1z"/></g></svg>',
    'remove-formatting': '<svg width="24" height="24"><path d="M13.2 6a1 1 0 0 1 0 .2l-2.6 10a1 1 0 0 1-1 .8h-.2a.8.8 0 0 1-.8-1l2.6-10H8a1 1 0 1 1 0-2h9a1 1 0 0 1 0 2h-3.8zM5 18h7a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm13 1.5L16.5 18 15 19.5a.7.7 0 0 1-1-1l1.5-1.5-1.5-1.5a.7.7 0 0 1 1-1l1.5 1.5 1.5-1.5a.7.7 0 0 1 1 1L17.5 17l1.5 1.5a.7.7 0 0 1-1 1z" fill-rule="evenodd"/></svg>',
    'remove': '<svg width="24" height="24"><path d="M16 7h3a1 1 0 0 1 0 2h-1v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9H5a1 1 0 1 1 0-2h3V6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1zm-2 0V6c0-.6-.4-1-1-1h-2a1 1 0 0 0-1 1v1h4zm2 2H8v9c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V9zm-7 3a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0v-4zm4 0a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0v-4z" fill-rule="nonzero"/></svg>',
    'resize-handle': '<svg width="10" height="10"><g fill-rule="nonzero"><path d="M8.1 1.1A.5.5 0 1 1 9 2l-7 7A.5.5 0 1 1 1 8l7-7zM8.1 5.1A.5.5 0 1 1 9 6l-3 3A.5.5 0 1 1 5 8l3-3z"/></g></svg>',
    'resize': '<svg width="24" height="24"><path d="M4 5c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h6c.3 0 .5.1.7.3.2.2.3.4.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3H7.4L18 16.6V13c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3.3 0 .5.1.7.3.2.2.3.4.3.7v6c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3h-6a1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h3.6L6 7.4V11c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3A1 1 0 0 1 4 11V5z" fill-rule="evenodd"/></svg>',
    'restore-draft': '<svg width="24" height="24"><g fill-rule="evenodd"><path d="M17 13c0 .6-.4 1-1 1h-4V8c0-.6.4-1 1-1s1 .4 1 1v4h2c.6 0 1 .4 1 1z"/><path d="M4.7 10H9a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v3l2.5-2.4a9.2 9.2 0 0 1 10.8-1.5A9 9 0 0 1 13.4 21c-2.4.1-4.7-.7-6.5-2.2a1 1 0 1 1 1.3-1.5 7.2 7.2 0 0 0 11.6-3.7 7 7 0 0 0-3.5-7.7A7.2 7.2 0 0 0 8 7L4.7 10z" fill-rule="nonzero"/></g></svg>',
    'rotate-left': '<svg width="24" height="24"><path d="M4.7 10H9a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v3l2.5-2.4a9.2 9.2 0 0 1 10.8-1.5A9 9 0 0 1 13.4 21c-2.4.1-4.7-.7-6.5-2.2a1 1 0 1 1 1.3-1.5 7.2 7.2 0 0 0 11.6-3.7 7 7 0 0 0-3.5-7.7A7.2 7.2 0 0 0 8 7L4.7 10z" fill-rule="nonzero"/></svg>',
    'rotate-right': '<svg width="24" height="24"><path d="M20 8V5a1 1 0 0 1 2 0v6c0 .6-.4 1-1 1h-6a1 1 0 0 1 0-2h4.3L16 7A7.2 7.2 0 0 0 7.7 6a7 7 0 0 0 3 13.1c1.9.1 3.7-.5 5-1.7a1 1 0 0 1 1.4 1.5A9.2 9.2 0 0 1 2.2 14c-.9-3.9 1-8 4.5-9.9 3.5-1.9 8-1.3 10.8 1.5L20 8z" fill-rule="nonzero"/></svg>',
    'rtl': '<svg width="24" height="24"><path d="M8 5h8v2h-2v12h-2V7h-2v12H8v-7c-.5 0-1 0-1.4-.3A3.4 3.4 0 0 1 4.8 10a3.3 3.3 0 0 1 0-2.8 3.4 3.4 0 0 1 1.8-1.8L8 5zm12 11.2a1 1 0 1 1-1 1.6l-3-2a1 1 0 0 1 0-1.6l3-2a1 1 0 1 1 1 1.6L18.4 15l1.8 1.2z" fill-rule="evenodd"/></svg>',
    'save': '<svg width="24" height="24"><path d="M5 16h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2zm0 2v2h14v-2H5zm10 0h2v2h-2v-2zm-4-6.4L8.7 9.3a1 1 0 1 0-1.4 1.4l4 4c.4.4 1 .4 1.4 0l4-4a1 1 0 1 0-1.4-1.4L13 11.6V4a1 1 0 0 0-2 0v7.6z" fill-rule="nonzero"/></svg>',
    'search': '<svg width="24" height="24"><path d="M16 17.3a8 8 0 1 1 1.4-1.4l4.3 4.4a1 1 0 0 1-1.4 1.4l-4.4-4.3zm-5-.3a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" fill-rule="nonzero"/></svg>',
    'select-all': '<svg width="24" height="24"><path d="M3 5h2V3a2 2 0 0 0-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2a2 2 0 0 0-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8a2 2 0 0 0 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z" fill-rule="nonzero"/></svg>',
    'selected': '<svg width="24" height="24"><path fill-rule="nonzero" d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm3.6 10.9L7 12.3a.7.7 0 0 0-1 1L9.6 17 18 8.6a.7.7 0 0 0 0-1 .7.7 0 0 0-1 0l-7.4 7.3z"/></svg>',
    'settings': '<svg width="24" height="24"><path d="M11 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8v.3c0 .2 0 .3-.2.5l-.6.2H7.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6V8H5a1 1 0 1 1 0-2h2v-.3c0-.2 0-.3.2-.5l.5-.2h2.5c.3 0 .4 0 .6.2l.2.5V6zM8 8h2V6H8v2zm9 2.8v.2h2c.6 0 1 .4 1 1s-.4 1-1 1h-2v.3c0 .2 0 .3-.2.5l-.6.2h-2.4c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6V13H5a1 1 0 0 1 0-2h8v-.3c0-.2 0-.3.2-.5l.6-.2h2.4c.3 0 .4 0 .6.2l.2.6zM14 13h2v-2h-2v2zm-3 2.8v.2h8c.6 0 1 .4 1 1s-.4 1-1 1h-8v.3c0 .2 0 .3-.2.5l-.6.2H7.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6V18H5a1 1 0 0 1 0-2h2v-.3c0-.2 0-.3.2-.5l.5-.2h2.5c.3 0 .4 0 .6.2l.2.6zM8 18h2v-2H8v2z" fill-rule="evenodd"/></svg>',
    'sharpen': '<svg width="24" height="24"><path d="M16 6l4 4-8 9-8-9 4-4h8zm-4 10.2l5.5-6.2-.1-.1H12v-.3h5.1l-.2-.2H12V9h4.6l-.2-.2H12v-.3h4.1l-.2-.2H12V8h3.6l-.2-.2H8.7L6.5 10l.1.1H12v.3H6.9l.2.2H12v.3H7.3l.2.2H12v.3H7.7l.3.2h4v.3H8.2l.2.2H12v.3H8.6l.3.2H12v.3H9l.3.2H12v.3H9.5l.2.2H12v.3h-2l.2.2H12v.3h-1.6l.2.2H12v.3h-1.1l.2.2h.9v.3h-.7l.2.2h.5v.3h-.3l.3.2z" fill-rule="evenodd"/></svg>',
    'sourcecode': '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M9.8 15.7c.3.3.3.8 0 1-.3.4-.9.4-1.2 0l-4.4-4.1a.8.8 0 0 1 0-1.2l4.4-4.2c.3-.3.9-.3 1.2 0 .3.3.3.8 0 1.1L6 12l3.8 3.7zM14.2 15.7c-.3.3-.3.8 0 1 .4.4.9.4 1.2 0l4.4-4.1c.3-.3.3-.9 0-1.2l-4.4-4.2a.8.8 0 0 0-1.2 0c-.3.3-.3.8 0 1.1L18 12l-3.8 3.7z"/></g></svg>',
    'spell-check': '<svg width="24" height="24"><path d="M6 8v3H5V5c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h2c.3 0 .5.1.7.3.2.2.3.4.3.7v6H8V8H6zm0-3v2h2V5H6zm13 0h-3v5h3v1h-3a1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7V5c0-.3.1-.5.3-.7.2-.2.4-.3.7-.3h3v1zm-5 1.5l-.1.7c-.1.2-.3.3-.6.3.3 0 .5.1.6.3l.1.7V10c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3h-3V4h3c.3 0 .5.1.7.3.2.2.3.4.3.7v1.5zM13 10V8h-2v2h2zm0-3V5h-2v2h2zm3 5l1 1-6.5 7L7 15.5l1.3-1 2.2 2.2L16 12z" fill-rule="evenodd"/></svg>',
    'strike-through': '<svg width="24" height="24"><g fill-rule="evenodd"><path d="M15.6 8.5c-.5-.7-1-1.1-1.3-1.3-.6-.4-1.3-.6-2-.6-2.7 0-2.8 1.7-2.8 2.1 0 1.6 1.8 2 3.2 2.3 4.4.9 4.6 2.8 4.6 3.9 0 1.4-.7 4.1-5 4.1A6.2 6.2 0 0 1 7 16.4l1.5-1.1c.4.6 1.6 2 3.7 2 1.6 0 2.5-.4 3-1.2.4-.8.3-2-.8-2.6-.7-.4-1.6-.7-2.9-1-1-.2-3.9-.8-3.9-3.6C7.6 6 10.3 5 12.4 5c2.9 0 4.2 1.6 4.7 2.4l-1.5 1.1z"/><path d="M5 11h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z" fill-rule="nonzero"/></g></svg>',
    'subscript': '<svg width="24" height="24"><path d="M10.4 10l4.6 4.6-1.4 1.4L9 11.4 4.4 16 3 14.6 7.6 10 3 5.4 4.4 4 9 8.6 13.6 4 15 5.4 10.4 10zM21 19h-5v-1l1-.8 1.7-1.6c.3-.4.5-.8.5-1.2 0-.3 0-.6-.2-.7-.2-.2-.5-.3-.9-.3a2 2 0 0 0-.8.2l-.7.3-.4-1.1 1-.6 1.2-.2c.8 0 1.4.3 1.8.7.4.4.6.9.6 1.5s-.2 1.1-.5 1.6a8 8 0 0 1-1.3 1.3l-.6.6h2.6V19z" fill-rule="nonzero"/></svg>',
    'superscript': '<svg width="24" height="24"><path d="M15 9.4L10.4 14l4.6 4.6-1.4 1.4L9 15.4 4.4 20 3 18.6 7.6 14 3 9.4 4.4 8 9 12.6 13.6 8 15 9.4zm5.9 1.6h-5v-1l1-.8 1.7-1.6c.3-.5.5-.9.5-1.3 0-.3 0-.5-.2-.7-.2-.2-.5-.3-.9-.3l-.8.2-.7.4-.4-1.2c.2-.2.5-.4 1-.5.3-.2.8-.2 1.2-.2.8 0 1.4.2 1.8.6.4.4.6 1 .6 1.6 0 .5-.2 1-.5 1.5l-1.3 1.4-.6.5h2.6V11z" fill-rule="nonzero"/></svg>',
    'table-cell-properties': '<svg width="24" height="24"><path d="M4 5h16v14H4V5zm10 10h-4v3h4v-3zm0-8h-4v3h4V7zM9 7H5v3h4V7zm-4 4v3h4v-3H5zm10 0v3h4v-3h-4zm0-1h4V7h-4v3zM5 15v3h4v-3H5zm10 3h4v-3h-4v3z" fill-rule="evenodd"/></svg>',
    'table-cell-select-all': '<svg width="24" height="24"><path d="M12.5 5.5v6h6v-6h-6zm-1 0h-6v6h6v-6zm1 13h6v-6h-6v6zm-1 0v-6h-6v6h6zm-7-14h15v15h-15v-15z" fill-rule="nonzero"/></svg>',
    'table-cell-select-inner': '<svg width="24" height="24"><g fill-rule="nonzero"><path d="M5.5 5.5v13h13v-13h-13zm-1-1h15v15h-15v-15z" opacity=".2"/><path d="M11.5 11.5v-7h1v7h7v1h-7v7h-1v-7h-7v-1h7z"/></g></svg>',
    'table-delete-column': '<svg width="24" height="24"><path d="M9 11.2l1 1v.2l-1 1v-2.2zm5 1l1-1v2.2l-1-1v-.2zM20 5v14H4V5h16zm-1 2h-4v.8l-.2-.2-.8.8V7h-4v1.4l-.8-.8-.2.2V7H5v11h4v-1.8l.5.5.5-.4V18h4v-1.8l.8.8.2-.3V18h4V7zm-3.9 3.4l-1.8 1.9 1.8 1.9c.4.3.4.9 0 1.2-.3.3-.8.3-1.2 0L12 13.5l-1.8 1.9a.8.8 0 0 1-1.2 0 .9.9 0 0 1 0-1.2l1.8-1.9-1.9-2a.9.9 0 0 1 1.2-1.2l2 2 1.8-1.8c.3-.4.9-.4 1.2 0a.8.8 0 0 1 0 1.1z" fill-rule="evenodd"/></svg>',
    'table-delete-row': '<svg width="24" height="24"><path d="M16.7 8.8l1.1 1.2-2.4 2.5L18 15l-1.2 1.2-2.5-2.5-2.4 2.5-1.3-1.2 2.5-2.5-2.5-2.5 1.2-1.3 2.6 2.6 2.4-2.5zM4 5h16v14H4V5zm15 5V7H5v3h4.8l1 1H5v3h5.8l-1 1H5v3h14v-3h-.4l-1-1H19v-3h-1.3l1-1h.3z" fill-rule="evenodd"/></svg>',
    'table-delete-table': '<svg width="24" height="26"><path d="M4 6h16v14H4V6zm1 2v11h14V8H5zm11.7 8.7l-1.5 1.5L12 15l-3.3 3.2-1.4-1.5 3.2-3.2-3.3-3.2 1.5-1.5L12 12l3.2-3.2 1.5 1.5-3.2 3.2 3.2 3.2z" fill-rule="evenodd"/></svg>',
    'table-insert-column-after': '<svg width="24" height="24"><path d="M14.3 9c.4 0 .7.3.7.6v2.2h2.1c.4 0 .7.3.7.7 0 .4-.3.7-.7.7H15v2.2c0 .3-.3.6-.7.6a.7.7 0 0 1-.6-.6v-2.2h-2.2a.7.7 0 0 1 0-1.4h2.2V9.6c0-.3.3-.6.6-.6zM4 5h16v14H4V5zm5 13v-3H5v3h4zm0-4v-3H5v3h4zm0-4V7H5v3h4zm10 8V7h-9v11h9z" fill-rule="evenodd"/></svg>',
    'table-insert-column-before': '<svg width="24" height="24"><path d="M9.7 16a.7.7 0 0 1-.7-.6v-2.2H6.9a.7.7 0 0 1 0-1.4H9V9.6c0-.3.3-.6.7-.6.3 0 .6.3.6.6v2.2h2.2c.4 0 .8.3.8.7 0 .4-.4.7-.8.7h-2.2v2.2c0 .3-.3.6-.6.6zM4 5h16v14H4V5zm10 13V7H5v11h9zm5 0v-3h-4v3h4zm0-4v-3h-4v3h4zm0-4V7h-4v3h4z" fill-rule="evenodd"/></svg>',
    'table-insert-row-above': '<svg width="24" height="24"><path d="M14.8 10.5c0 .3-.2.5-.5.5h-1.8v1.8c0 .3-.2.5-.5.5a.5.5 0 0 1-.5-.6V11H9.7a.5.5 0 0 1 0-1h1.8V8.3c0-.3.2-.6.5-.6s.5.3.5.6V10h1.8c.3 0 .5.2.5.5zM4 5h16v14H4V5zm5 13v-3H5v3h4zm5 0v-3h-4v3h4zm5 0v-3h-4v3h4zm0-4V7H5v7h14z" fill-rule="evenodd"/></svg>',
    'table-insert-row-after': '<svg width="24" height="24"><path d="M9.2 14.5c0-.3.2-.5.5-.5h1.8v-1.8c0-.3.2-.5.5-.5s.5.2.5.6V14h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8v1.7c0 .3-.2.6-.5.6a.5.5 0 0 1-.5-.6V15H9.7a.5.5 0 0 1-.5-.5zM4 5h16v14H4V5zm6 2v3h4V7h-4zM5 7v3h4V7H5zm14 11v-7H5v7h14zm0-8V7h-4v3h4z" fill-rule="evenodd"/></svg>',
    'table-left-header': '<svg width="24" height="24"><path d="M4 5h16v13H4V5zm10 12v-3h-4v3h4zm0-4v-3h-4v3h4zm0-4V6h-4v3h4zm5 8v-3h-4v3h4zm0-4v-3h-4v3h4zm0-4V6h-4v3h4z" fill-rule="evenodd"/></svg>',
    'table-merge-cells': '<svg width="24" height="24"><path d="M4 5h16v14H4V5zm6 13h9v-7h-9v7zm4-11h-4v3h4V7zM9 7H5v3h4V7zm-4 4v3h4v-3H5zm10-1h4V7h-4v3zM5 15v3h4v-3H5z" fill-rule="evenodd"/></svg>',
    'table-row-properties': '<svg width="24" height="24"><path d="M4 5h16v14H4V5zm10 10h-4v3h4v-3zm0-8h-4v3h4V7zM9 7H5v3h4V7zm6 3h4V7h-4v3zM5 15v3h4v-3H5zm10 3h4v-3h-4v3z" fill-rule="evenodd"/></svg>',
    'table-split-cells': '<svg width="24" height="24"><path d="M4 5h16v14H4V5zm6 2v3h4V7h-4zM9 18v-3H5v3h4zm0-4v-3H5v3h4zm0-4V7H5v3h4zm10 8v-7h-9v7h9zm0-8V7h-4v3h4zm-3.5 4.5l1.5 1.6c.3.2.3.7 0 1-.2.2-.7.2-1 0l-1.5-1.6-1.6 1.5c-.2.3-.7.3-1 0a.7.7 0 0 1 0-1l1.6-1.5-1.5-1.6a.7.7 0 0 1 1-1l1.5 1.6 1.6-1.5c.2-.3.7-.3 1 0 .2.2.2.7 0 1l-1.6 1.5z" fill-rule="evenodd"/></svg>',
    'table-top-header': '<svg width="24" height="24"><path d="M4 5h16v13H4V5zm5 12v-3H5v3h4zm0-4v-3H5v3h4zm5 4v-3h-4v3h4zm0-4v-3h-4v3h4zm5 4v-3h-4v3h4zm0-4v-3h-4v3h4z" fill-rule="evenodd"/></svg>',
    'table': '<svg width="24" height="24"><path d="M4 5h16v14H4V5zm6 9h4v-3h-4v3zm4 1h-4v3h4v-3zm0-8h-4v3h4V7zM9 7H5v3h4V7zm-4 4v3h4v-3H5zm10 0v3h4v-3h-4zm0-1h4V7h-4v3zM5 15v3h4v-3H5zm10 3h4v-3h-4v3z" fill-rule="evenodd"/></svg>',
    'template': '<svg width="24" height="24"><path d="M19 19v-1H5v1h14zM9 16v-4a5 5 0 1 1 6 0v4h4a2 2 0 0 1 2 2v3H3v-3c0-1.1.9-2 2-2h4zm4 0v-5l.8-.6a3 3 0 1 0-3.6 0l.8.6v5h2z" fill-rule="nonzero"/></svg>',
    'temporary-placeholder': '<svg width="24" height="24"><g fill-rule="evenodd"><path d="M9 7.6V6h2.5V4.5a.5.5 0 1 1 1 0V6H15v1.6a8 8 0 1 1-6 0zm-2.6 5.3a.5.5 0 0 0 .3.6c.3 0 .6 0 .6-.3l.1-.2a5 5 0 0 1 3.3-2.8c.3-.1.4-.4.4-.6-.1-.3-.4-.5-.6-.4a6 6 0 0 0-4.1 3.7z"/><circle cx="14" cy="4" r="1"/><circle cx="12" cy="2" r="1"/><circle cx="10" cy="4" r="1"/></g></svg>',
    // 'text-color': '<svg width="24" height="24"><g fill-rule="evenodd"><path d="M3 18h18v3H3z"/><path d="M8.7 16h-.8a.5.5 0 0 1-.5-.6l2.7-9c.1-.3.3-.4.5-.4h2.8c.2 0 .4.1.5.4l2.7 9a.5.5 0 0 1-.5.6h-.8a.5.5 0 0 1-.4-.4l-.7-2.2c0-.3-.3-.4-.5-.4h-3.4c-.2 0-.4.1-.5.4l-.7 2.2c0 .3-.2.4-.4.4zm2.6-7.6l-.6 2a.5.5 0 0 0 .5.6h1.6a.5.5 0 0 0 .5-.6l-.6-2c0-.3-.3-.4-.5-.4h-.4c-.2 0-.4.1-.5.4z"/></g></svg>',
    'text-color': '<svg width="24" height="24"><path id="lineAB" d="M 6 15 L 12 2M 12 2 L 18 15M 8 10 l 8 0" stroke-width="2" stroke="rgb(0,0,0)" fill="none" /><rect class="color-underline" x="3" y="18" width="18" height="2"></rect></svg>',
    'toc': '<svg width="24" height="24"><path d="M5 5c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 1 1 0-2zm3 0h11c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 1 1 0-2zm-3 8c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zm3 0h11c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2zm0-4c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 1 1 0-2zm3 0h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm-3 8c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zm3 0h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
    'translate': '<svg width="24" height="24"><path d="M12.7 14.3l-.3.7-.4.7-2.2-2.2-3.1 3c-.3.4-.8.4-1 0a.7.7 0 0 1 0-1l3.1-3A12.4 12.4 0 0 1 6.7 9H8a10.1 10.1 0 0 0 1.7 2.4c.5-.5 1-1.1 1.4-1.8l.9-2H4.7a.7.7 0 1 1 0-1.5h4.4v-.7c0-.4.3-.8.7-.8.4 0 .7.4.7.8v.7H15c.4 0 .8.3.8.7 0 .4-.4.8-.8.8h-1.4a12.3 12.3 0 0 1-1 2.4 13.5 13.5 0 0 1-1.7 2.3l1.9 1.8zm4.3-3l2.7 7.3a.5.5 0 0 1-.4.7 1 1 0 0 1-1-.7l-.6-1.5h-3.4l-.6 1.5a1 1 0 0 1-1 .7.5.5 0 0 1-.4-.7l2.7-7.4a1 1 0 1 1 2 0zm-2.2 4.4h2.4L16 12.5l-1.2 3.2z" fill-rule="evenodd"/></svg>',
    'underline': '<svg width="24" height="24"><path d="M16 5c.6 0 1 .4 1 1v5.5a4 4 0 0 1-.4 1.8l-1 1.4a5.3 5.3 0 0 1-5.5 1 5 5 0 0 1-1.6-1c-.5-.4-.8-.9-1.1-1.4a4 4 0 0 1-.4-1.8V6c0-.6.4-1 1-1s1 .4 1 1v5.5c0 .3 0 .6.2 1l.6.7a3.3 3.3 0 0 0 2.2.8 3.4 3.4 0 0 0 2.2-.8c.3-.2.4-.5.6-.8l.2-.9V6c0-.6.4-1 1-1zM8 17h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2z" fill-rule="evenodd"/></svg>',
    'undo': '<svg width="24" height="24"><path d="M6.4 8H12c3.7 0 6.2 2 6.8 5.1.6 2.7-.4 5.6-2.3 6.8a1 1 0 0 1-1-1.8c1.1-.6 1.8-2.7 1.4-4.6-.5-2.1-2.1-3.5-4.9-3.5H6.4l3.3 3.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 1.4L6.4 8z" fill-rule="nonzero"/></svg>',
    'unlink': '<svg width="24" height="24"><path d="M6.2 12.3a1 1 0 0 1 1.4 1.4l-2 2a2 2 0 1 0 2.6 2.8l4.8-4.8a1 1 0 0 0 0-1.4 1 1 0 1 1 1.4-1.3 2.9 2.9 0 0 1 0 4L9.6 20a3.9 3.9 0 0 1-5.5-5.5l2-2zm11.6-.6a1 1 0 0 1-1.4-1.4l2.1-2a2 2 0 1 0-2.7-2.8L11 10.3a1 1 0 0 0 0 1.4A1 1 0 1 1 9.6 13a2.9 2.9 0 0 1 0-4L14.4 4a3.9 3.9 0 0 1 5.5 5.5l-2 2zM7.6 6.3a.8.8 0 0 1-1 1.1L3.3 4.2a.7.7 0 1 1 1-1l3.2 3.1zM5.1 8.6a.8.8 0 0 1 0 1.5H3a.8.8 0 0 1 0-1.5H5zm5-3.5a.8.8 0 0 1-1.5 0V3a.8.8 0 0 1 1.5 0V5zm6 11.8a.8.8 0 0 1 1-1l3.2 3.2a.8.8 0 0 1-1 1L16 17zm-2.2 2a.8.8 0 0 1 1.5 0V21a.8.8 0 0 1-1.5 0V19zm5-3.5a.7.7 0 1 1 0-1.5H21a.8.8 0 0 1 0 1.5H19z" fill-rule="nonzero"/></svg>',
    'unlock': '<svg width="24" height="24"><path d="M16 5c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v3h-2V8a1 1 0 0 0-.3-.7A1 1 0 0 0 16 7h-2a1 1 0 0 0-.7.3 1 1 0 0 0-.3.7v3h.3c.2 0 .3 0 .5.2l.2.6v7.4c0 .3 0 .4-.2.6l-.6.2H4.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6v-7.4c0-.3 0-.4.2-.6l.5-.2H11V8c0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9h2z" fill-rule="evenodd"/></svg>',
    'unordered-list': '<svg width="24" height="24"><path d="M11 5h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zM4.5 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1z" fill-rule="evenodd"/></svg>',
    'unselected': '<svg width="24" height="24"><path fill-rule="nonzero" d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 1a1 1 0 0 0-1 1v12c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H6z"/></svg>',
    'upload': '<svg width="24" height="24"><path d="M18 19v-2a1 1 0 0 1 2 0v3c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 2 0v2h12zM11 6.4L8.7 8.7a1 1 0 0 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.4L13 6.4V16a1 1 0 0 1-2 0V6.4z" fill-rule="nonzero"/></svg>',
    'user': '<svg width="24" height="24"><path d="M12 24a12 12 0 1 1 0-24 12 12 0 0 1 0 24zm-8.7-5.3a11 11 0 0 0 17.4 0C19.4 16.3 14.6 15 12 15c-2.6 0-7.4 1.3-8.7 3.7zM12 13c2.2 0 4-2 4-4.5S14.2 4 12 4 8 6 8 8.5 9.8 13 12 13z" fill-rule="nonzero"/></svg>',
    'warning': '<svg width="24" height="24"><path d="M19.8 18.3c.2.5.3.9 0 1.2-.1.3-.5.5-1 .5H5.2c-.5 0-.9-.2-1-.5-.3-.3-.2-.7 0-1.2L11 4.7l.5-.5.5-.2c.2 0 .3 0 .5.2.2 0 .3.3.5.5l6.8 13.6zM12 18c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7a1 1 0 0 0-.3-.7 1 1 0 0 0-.7-.3 1 1 0 0 0-.7.3 1 1 0 0 0-.3.7c0 .3.1.5.3.7.2.2.4.3.7.3zm.7-3l.3-4a1 1 0 0 0-.3-.7 1 1 0 0 0-.7-.3 1 1 0 0 0-.7.3 1 1 0 0 0-.3.7l.3 4h1.4z" fill-rule="evenodd"/></svg>',
    'zoom-in': '<svg width="24" height="24"><path d="M16 17.3a8 8 0 1 1 1.4-1.4l4.3 4.4a1 1 0 0 1-1.4 1.4l-4.4-4.3zm-5-.3a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm-1-9a1 1 0 0 1 2 0v6a1 1 0 0 1-2 0V8zm-2 4a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2H8z" fill-rule="nonzero"/></svg>',
    'zoom-out': '<svg width="24" height="24"><path d="M16 17.3a8 8 0 1 1 1.4-1.4l4.3 4.4a1 1 0 0 1-1.4 1.4l-4.4-4.3zm-5-.3a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm-3-5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2H8z" fill-rule="nonzero"/></svg>'
};
/* harmony default export */ __webpack_exports__["default"] = (svgs);


/***/ }),

/***/ "./src/core/toolbar.ts":
/*!*****************************!*\
  !*** ./src/core/toolbar.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registry */ "./src/core/registry.ts");
/* harmony import */ var _tools_undo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/undo */ "./src/tools/undo.ts");
/* harmony import */ var _tools_redo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools/redo */ "./src/tools/redo.ts");
/* harmony import */ var _tools_bold__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tools/bold */ "./src/tools/bold.ts");
/* harmony import */ var _tools_italic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/italic */ "./src/tools/italic.ts");
/* harmony import */ var _tools_underline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tools/underline */ "./src/tools/underline.ts");
/* harmony import */ var _tools_strikeThrough__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tools/strikeThrough */ "./src/tools/strikeThrough.ts");
/* harmony import */ var _tools_justifyLeft__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tools/justifyLeft */ "./src/tools/justifyLeft.ts");
/* harmony import */ var _tools_justifyCenter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../tools/justifyCenter */ "./src/tools/justifyCenter.ts");
/* harmony import */ var _tools_justifyRight__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tools/justifyRight */ "./src/tools/justifyRight.ts");
/* harmony import */ var _tools_orderedList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../tools/orderedList */ "./src/tools/orderedList.ts");
/* harmony import */ var _tools_unorderedList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../tools/unorderedList */ "./src/tools/unorderedList.ts");
/* harmony import */ var _tools_fontsize__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../tools/fontsize */ "./src/tools/fontsize.ts");
/* harmony import */ var _tools_fontname__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../tools/fontname */ "./src/tools/fontname.ts");
/* harmony import */ var _tools_foreColor__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../tools/foreColor */ "./src/tools/foreColor.ts");
/* harmony import */ var _tools_textBgColor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../tools/textBgColor */ "./src/tools/textBgColor.ts");
/* harmony import */ var _tools_link__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../tools/link */ "./src/tools/link.ts");
/* harmony import */ var _tools_insertImage__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../tools/insertImage */ "./src/tools/insertImage.ts");
/**
 * 工具栏类
 */


















class Toolbar {
    constructor(container) {
        this.el = document.createElement('div');
        this.el.className = 'richeditor_toolbar';
        container.appendChild(this.el);
    }
    // 注册插件列表
    registerPlugins(editor) {
        const plugins = [
            {
                name: 'undo',
                module: new _tools_undo__WEBPACK_IMPORTED_MODULE_1__["default"]()
            },
            {
                name: 'redo',
                module: new _tools_redo__WEBPACK_IMPORTED_MODULE_2__["default"]()
            },
            {
                name: 'bold',
                module: new _tools_bold__WEBPACK_IMPORTED_MODULE_3__["default"]()
            },
            {
                name: 'italic',
                module: new _tools_italic__WEBPACK_IMPORTED_MODULE_4__["default"]()
            },
            {
                name: 'underline',
                module: new _tools_underline__WEBPACK_IMPORTED_MODULE_5__["default"]()
            },
            {
                name: 'strike-through',
                module: new _tools_strikeThrough__WEBPACK_IMPORTED_MODULE_6__["default"]()
            },
            {
                name: 'ordered-list',
                module: new _tools_orderedList__WEBPACK_IMPORTED_MODULE_10__["default"]()
            },
            {
                name: 'unordered-list',
                module: new _tools_unorderedList__WEBPACK_IMPORTED_MODULE_11__["default"]()
            },
            {
                name: 'justify-left',
                module: new _tools_justifyLeft__WEBPACK_IMPORTED_MODULE_7__["default"]()
            },
            {
                name: 'justify-center',
                module: new _tools_justifyCenter__WEBPACK_IMPORTED_MODULE_8__["default"]()
            },
            {
                name: 'justify-right',
                module: new _tools_justifyRight__WEBPACK_IMPORTED_MODULE_9__["default"]()
            },
            {
                name: 'fontsize',
                module: new _tools_fontsize__WEBPACK_IMPORTED_MODULE_12__["default"]()
            },
            {
                name: 'fontname',
                module: new _tools_fontname__WEBPACK_IMPORTED_MODULE_13__["default"]()
            },
            {
                name: 'forecolor',
                module: new _tools_foreColor__WEBPACK_IMPORTED_MODULE_14__["default"]()
            },
            {
                name: 'text-bg-color',
                module: new _tools_textBgColor__WEBPACK_IMPORTED_MODULE_15__["default"]()
            },
            {
                name: 'link',
                module: new _tools_link__WEBPACK_IMPORTED_MODULE_16__["default"]()
            },
            {
                name: 'insert-image',
                module: new _tools_insertImage__WEBPACK_IMPORTED_MODULE_17__["default"]()
            }
        ];
        plugins.forEach(plugin => {
            this.register(plugin.name, plugin.module);
            if (plugin.module.install)
                plugin.module.install(editor);
        });
    }
    register(name, toolbar) {
        _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerPlugin(name, toolbar);
    }
    require(name) {
        return _registry__WEBPACK_IMPORTED_MODULE_0__["default"].requirePlugin(name);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Toolbar);


/***/ }),

/***/ "./src/tools/bold.ts":
/*!***************************!*\
  !*** ./src/tools/bold.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Bold {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs.bold);
        this.button.on('click', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick() {
        // this.editor.restoreSelection();
        // document.execCommand('bold');
        this.editor.execCommand('bold');
    }
    onRangeChange() {
        const isMatch = this.editor.match({
            type: 'tagName',
            value: 'B'
        });
        isMatch ? this.button.setActive() : this.button.resetActive();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Bold);


/***/ }),

/***/ "./src/tools/fontname.ts":
/*!*******************************!*\
  !*** ./src/tools/fontname.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class FontName {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        this.options = [
            { label: '微软雅黑', value: 'Microsoft-YaHei' },
            { label: '仿宋', value: 'FangSong' },
            { label: '楷体', value: 'KaiTi' },
            { label: '宋体', value: 'SimSun' },
            { label: '黑体', value: 'SimHei' },
            { label: 'Arial', value: 'arial' },
            { label: 'Courier New', value: 'courier new' },
            { label: 'Helvetica', value: 'helvetica' },
            { label: 'sans-serif', value: 'sans-serif' },
        ];
        const Select = control.require('select');
        this.select = new Select(toolbar.el, this.options);
        this.select.setCustomClass('rd_select-ft-btn');
        this.select.setValue('字体');
        this.select.on('itemClick', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick(item) {
        // this.editor.restoreSelection();
        // document.execCommand('fontName', false, item.value);
        this.editor.execCommand('fontName', false, item.value);
    }
    onRangeChange() {
        var values = this.options.map(item => item.value);
        const size = this.editor.match({
            type: 'tagNameAttribute',
            tagName: 'FONT',
            attribute: 'face',
            value: values
        });
        if (size) {
            const item = this.options.find(it => it.value === size);
            this.select.setValue(item.label);
        }
        else {
            this.select.setValue('字体');
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FontName);


/***/ }),

/***/ "./src/tools/fontsize.ts":
/*!*******************************!*\
  !*** ./src/tools/fontsize.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class FontSize {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        this.options = [
            { label: 'x-small', value: '1' },
            { label: 'small', value: '2' },
            { label: 'medium', value: '3' },
            { label: 'large', value: '4' },
            { label: 'x-large', value: '5' },
            { label: 'xx-large', value: '6' },
            { label: 'xxx-large', value: '7' },
        ];
        const Select = control.require('select');
        this.select = new Select(toolbar.el, this.options);
        this.select.setValue('字号');
        this.select.on('itemClick', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick(item) {
        // this.editor.restoreSelection();
        // document.execCommand('fontSize', false, item.value);
        this.editor.execCommand('fontSize', false, item.value);
    }
    onRangeChange() {
        const size = this.editor.match({
            type: 'tagNameAttribute',
            tagName: 'FONT',
            attribute: 'size',
            value: ['1', '2', '3', '4', '5', '6', '7']
        });
        if (size) {
            const item = this.options.find(it => it.value === size);
            this.select.setValue(item.label);
        }
        else {
            this.select.setValue('字号');
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FontSize);


/***/ }),

/***/ "./src/tools/foreColor.ts":
/*!********************************!*\
  !*** ./src/tools/foreColor.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class ForeColor {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const ColorButton = control.require('colorButton');
        this.colorButton = new ColorButton(toolbar.el);
        this.colorButton.setIcon(svgs["text-color"]);
        const ColorPicker = control.require('colorPicker');
        this.colorPicker = new ColorPicker(this.colorButton.el);
        this.colorButton.on('click', e => this.onClick(e));
        this.colorPicker.on('change', color => this.onPickerChange(color));
        editor.on('rangechange', () => this.onRangeChange());
    }
    onClick(e) {
        if (!this.colorPicker.visible)
            this.colorPicker.show(this.colorButton.getColor());
        else
            this.colorPicker.hide();
    }
    onPickerChange(rgb) {
        this.colorButton.setColor(rgb);
        this.editor.execCommand('foreColor', false, rgb);
    }
    onRangeChange() {
        const color = this.editor.match({
            type: 'tagNameAttribute',
            tagName: 'FONT',
            attribute: 'color'
        });
        if (color) {
            this.colorButton.setColor(color);
        }
        else {
            this.colorButton.setColor('rgb(0, 0, 0)');
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ForeColor);


/***/ }),

/***/ "./src/tools/insertImage.ts":
/*!**********************************!*\
  !*** ./src/tools/insertImage.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 插入图片插件
 */
class InsertImage {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs.image);
        this.button.on('click', (e) => this.onClick(e));
        const ImageDialog = control.require('imageDialog');
        this.imageDialog = new ImageDialog(this.button.el, {
            title: '编辑图片'
        });
        this.imageDialog.on('confirm', (url, alt) => this.insertUrl(url, alt));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick(e) {
        if (this.imageDialog.visible)
            return this.imageDialog.close();
        this.imageDialog.open();
    }
    insertUrl(url, alt) {
        this.editor.execCommand('insertImage', false, url, alt);
    }
    onRangeChange() {
        // const nodeChain = this.editor.getNodeChain();
        // const node = nodeChain.find(node => node.tagName === 'A');
        // if (!node) return this.imageDialog.setValue('', '');
        // const href = node.getAttribute('href');
        // const text = node.textContent;
        // const title = node.getAttribute('title');
        // this.imageDialog.setValue(href, text);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (InsertImage);


/***/ }),

/***/ "./src/tools/italic.ts":
/*!*****************************!*\
  !*** ./src/tools/italic.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 斜体
 */
class Italic {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs.italic);
        this.button.on('click', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick() {
        // this.editor.restoreSelection();
        // document.execCommand('italic');
        this.editor.execCommand('italic');
    }
    onRangeChange() {
        const isMatch = this.editor.match({
            type: 'tagName',
            value: ['I', 'EM']
        });
        isMatch ? this.button.setActive() : this.button.resetActive();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Italic);


/***/ }),

/***/ "./src/tools/justifyCenter.ts":
/*!************************************!*\
  !*** ./src/tools/justifyCenter.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class JustifyCenter {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs["align-center"]);
        this.button.on('click', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick() {
        // this.editor.restoreSelection();
        // document.execCommand('JustifyCenter');
        this.editor.execCommand('JustifyCenter');
    }
    onRangeChange() {
        const isMatch = this.editor.match({
            type: 'style',
            value: {
                textAlign: 'center'
            }
        });
        isMatch ? this.button.setActive() : this.button.resetActive();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (JustifyCenter);


/***/ }),

/***/ "./src/tools/justifyLeft.ts":
/*!**********************************!*\
  !*** ./src/tools/justifyLeft.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class JustifyLeft {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs["align-left"]);
        this.button.on('click', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick() {
        // this.editor.restoreSelection();
        // document.execCommand('JustifyLeft');
        this.editor.execCommand('JustifyLeft');
    }
    onRangeChange() {
        const isMatch = this.editor.match({
            type: 'style',
            value: {
                textAlign: 'left'
            }
        });
        isMatch ? this.button.setActive() : this.button.resetActive();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (JustifyLeft);


/***/ }),

/***/ "./src/tools/justifyRight.ts":
/*!***********************************!*\
  !*** ./src/tools/justifyRight.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class JustifyRight {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs["align-right"]);
        this.button.on('click', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick() {
        // this.editor.restoreSelection();
        // document.execCommand('JustifyRight');
        this.editor.execCommand('JustifyRight');
    }
    onRangeChange() {
        const isMatch = this.editor.match({
            type: 'style',
            value: {
                textAlign: 'right'
            }
        });
        isMatch ? this.button.setActive() : this.button.resetActive();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (JustifyRight);


/***/ }),

/***/ "./src/tools/link.ts":
/*!***************************!*\
  !*** ./src/tools/link.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Link {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs.link);
        this.button.on('click', (e) => this.onClick(e));
        const LinkDialog = control.require('linkDialog');
        this.linkDialog = new LinkDialog(this.button.el, {
            title: '编辑链接'
        });
        this.linkDialog.on('confirm', (href, text, title) => this.insertHref(href, text, title));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick(e) {
        if (this.linkDialog.visible)
            return this.linkDialog.close();
        this.linkDialog.open();
    }
    insertHref(href, text, title) {
        this.editor.execCommand('createLink', false, href, text, title);
    }
    onRangeChange() {
        const nodeChain = this.editor.getNodeChain();
        const node = nodeChain.find(node => node.tagName === 'A');
        if (!node)
            return this.linkDialog.setValue('', '', '');
        const href = node.getAttribute('href');
        const text = node.textContent;
        const title = node.getAttribute('title');
        this.linkDialog.setValue(href, text, title);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Link);


/***/ }),

/***/ "./src/tools/orderedList.ts":
/*!**********************************!*\
  !*** ./src/tools/orderedList.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 有序列表
 */
class OrderedList {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs["ordered-list"]);
        this.button.on('click', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick() {
        // this.editor.restoreSelection();
        // document.execCommand('insertOrderedList');
        this.editor.execCommand('insertOrderedList');
    }
    onRangeChange() {
        const isMatch = this.editor.match({
            type: 'tagName',
            value: 'OL'
        });
        isMatch ? this.button.setActive() : this.button.resetActive();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (OrderedList);


/***/ }),

/***/ "./src/tools/redo.ts":
/*!***************************!*\
  !*** ./src/tools/redo.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 恢复
 */
class Redo {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs.redo);
        this.button.on('click', this.onClick.bind(this));
    }
    onClick() {
        // document.execCommand('redo');
        // this.editor.fireRangeChange();
        this.editor.execCommand('redo');
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Redo);


/***/ }),

/***/ "./src/tools/strikeThrough.ts":
/*!************************************!*\
  !*** ./src/tools/strikeThrough.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class StrikeThrough {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs["strike-through"]);
        this.button.on('click', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick() {
        // this.editor.restoreSelection();
        // document.execCommand('strikeThrough');
        this.editor.execCommand('strikeThrough');
    }
    onRangeChange() {
        const isMatch = this.editor.match({
            type: 'tagName',
            value: 'STRIKE'
        });
        isMatch ? this.button.setActive() : this.button.resetActive();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (StrikeThrough);


/***/ }),

/***/ "./src/tools/textBgColor.ts":
/*!**********************************!*\
  !*** ./src/tools/textBgColor.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class TextBgColor {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const ColorButton = control.require('colorButton');
        this.colorButton = new ColorButton(toolbar.el);
        this.colorButton.setIcon(svgs["highlight-bg-color"]);
        const ColorPicker = control.require('colorPicker');
        this.colorPicker = new ColorPicker(this.colorButton.el);
        this.colorButton.on('click', e => this.onClick(e));
        this.colorPicker.on('change', color => this.onPickerChange(color));
        editor.on('rangechange', () => this.onRangeChange());
    }
    onClick(e) {
        if (!this.colorPicker.visible)
            this.colorPicker.show(this.colorButton.getColor());
        else
            this.colorPicker.hide();
    }
    onPickerChange(rgb) {
        this.colorButton.setColor(rgb);
        this.editor.execCommand('hiliteColor', false, rgb);
    }
    onRangeChange() {
        const color = this.editor.match({
            type: 'style',
            styleName: 'backgroundColor'
        });
        if (color) {
            this.colorButton.setColor(color);
        }
        else {
            this.colorButton.setColor('rgb(0, 0, 0)');
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (TextBgColor);


/***/ }),

/***/ "./src/tools/underline.ts":
/*!********************************!*\
  !*** ./src/tools/underline.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 下划线
 */
class Underline {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs.underline);
        this.button.on('click', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick() {
        // this.editor.restoreSelection();
        // document.execCommand('underline');
        this.editor.execCommand('underline');
    }
    onRangeChange() {
        const isMatch = this.editor.match({
            type: 'tagName',
            value: 'U'
        });
        isMatch ? this.button.setActive() : this.button.resetActive();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Underline);


/***/ }),

/***/ "./src/tools/undo.ts":
/*!***************************!*\
  !*** ./src/tools/undo.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 撤销
 */
class Undo {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs.undo);
        this.button.on('click', this.onClick.bind(this));
    }
    onClick() {
        // document.execCommand('undo');
        // this.editor.fireRangeChange();
        this.editor.execCommand('undo');
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Undo);


/***/ }),

/***/ "./src/tools/unorderedList.ts":
/*!************************************!*\
  !*** ./src/tools/unorderedList.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 无序列表
 */
class UnorderedList {
    install(context) {
        const { editor, svgs, toolbar, control } = context;
        this.editor = editor;
        const Button = control.require('button');
        this.button = new Button(toolbar.el);
        this.button.setIcon(svgs["unordered-list"]);
        this.button.on('click', this.onClick.bind(this));
        editor.on('rangechange', this.onRangeChange.bind(this));
    }
    onClick() {
        // this.editor.restoreSelection();
        // document.execCommand('insertUnorderedList');
        this.editor.execCommand('insertUnorderedList');
    }
    onRangeChange() {
        const isMatch = this.editor.match({
            type: 'tagName',
            value: 'UL'
        });
        isMatch ? this.button.setActive() : this.button.resetActive();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (UnorderedList);


/***/ }),

/***/ "./src/util/util.ts":
/*!**************************!*\
  !*** ./src/util/util.ts ***!
  \**************************/
/*! exports provided: nonNumber, hexPattern */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonNumber", function() { return nonNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexPattern", function() { return hexPattern; });
/**
 * 工具函数
 */
// 含有非数字字符
const nonNumber = /[^0-9]/g;
// hex 颜色
const hexPattern = /#[0-9a-fA-F]+$/;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=richEditor.js.map