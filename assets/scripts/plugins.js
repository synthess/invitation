/*
    Template Name:      Enabled Mobile Templates
    Theme URL:          http://enableds.com
    Author:             Enabled
    Author URI:         http://themeforest.net/user/Enabled?ref=Enabled 
    Version:            10.0
    Envato License:     Regular or Extended via ThemeForest
    Plugin Licenses:    Each Plugin has it's indivudal license attached
*/

(function($) {
    /* @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.  * @codingstandard ftlabs-jsv2     * @copyright The Financial Times Limited [All Rights Reserved]     * @license MIT License   */
    !function() {
        "use strict";
        function t(e, o) {
            function i(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            }
            var r;
            if (o = o || {},
            this.trackingClick = !1,
            this.trackingClickStart = 0,
            this.targetElement = null,
            this.touchStartX = 0,
            this.touchStartY = 0,
            this.lastTouchIdentifier = 0,
            this.touchBoundary = o.touchBoundary || 10,
            this.layer = e,
            this.tapDelay = o.tapDelay || 200,
            this.tapTimeout = o.tapTimeout || 700,
            !t.notNeeded(e)) {
                for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; u > s; s++)
                    c[a[s]] = i(c[a[s]], c);
                n && (e.addEventListener("mouseover", this.onMouse, !0),
                e.addEventListener("mousedown", this.onMouse, !0),
                e.addEventListener("mouseup", this.onMouse, !0)),
                e.addEventListener("click", this.onClick, !0),
                e.addEventListener("touchstart", this.onTouchStart, !1),
                e.addEventListener("touchmove", this.onTouchMove, !1),
                e.addEventListener("touchend", this.onTouchEnd, !1),
                e.addEventListener("touchcancel", this.onTouchCancel, !1),
                Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, o) {
                    var i = Node.prototype.removeEventListener;
                    "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o)
                }
                ,
                e.addEventListener = function(t, n, o) {
                    var i = Node.prototype.addEventListener;
                    "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function(t) {
                        t.propagationStopped || n(t)
                    }
                    ), o) : i.call(e, t, n, o)
                }
                ),
                "function" == typeof e.onclick && (r = e.onclick,
                e.addEventListener("click", function(t) {
                    r(t)
                }, !1),
                e.onclick = null)
            }
        }
        var e = navigator.userAgent.indexOf("Windows Phone") >= 0
          , n = navigator.userAgent.indexOf("Android") > 0 && !e
          , o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e
          , i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent)
          , r = o && /OS [6-7]_\d/.test(navigator.userAgent)
          , a = navigator.userAgent.indexOf("BB10") > 0;
        t.prototype.needsClick = function(t) {
            switch (t.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (t.disabled)
                    return !0;
                break;
            case "input":
                if (o && "file" === t.type || t.disabled)
                    return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
            }
            return /\bneedsclick\b/.test(t.className)
        }
        ,
        t.prototype.needsFocus = function(t) {
            switch (t.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !n;
            case "input":
                switch (t.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                    return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
            }
        }
        ,
        t.prototype.sendClick = function(t, e) {
            var n, o;
            document.activeElement && document.activeElement !== t && document.activeElement.blur(),
            o = e.changedTouches[0],
            n = document.createEvent("MouseEvents"),
            n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null),
            n.forwardedTouchEvent = !0,
            t.dispatchEvent(n)
        }
        ,
        t.prototype.determineEventType = function(t) {
            return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
        }
        ,
        t.prototype.focus = function(t) {
            var e;
            o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length,
            t.setSelectionRange(e, e)) : t.focus()
        }
        ,
        t.prototype.updateScrollParent = function(t) {
            var e, n;
            if (e = t.fastClickScrollParent,
            !e || !e.contains(t)) {
                n = t;
                do {
                    if (n.scrollHeight > n.offsetHeight) {
                        e = n,
                        t.fastClickScrollParent = n;
                        break
                    }
                    n = n.parentElement
                } while (n)
            }
            e && (e.fastClickLastScrollTop = e.scrollTop)
        }
        ,
        t.prototype.getTargetElementFromEventTarget = function(t) {
            return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
        }
        ,
        t.prototype.onTouchStart = function(t) {
            var e, n, r;
            if (t.targetTouches.length > 1)
                return !0;
            if (e = this.getTargetElementFromEventTarget(t.target),
            n = t.targetTouches[0],
            o) {
                if (r = window.getSelection(),
                r.rangeCount && !r.isCollapsed)
                    return !0;
                if (!i) {
                    if (n.identifier && n.identifier === this.lastTouchIdentifier)
                        return t.preventDefault(),
                        !1;
                    this.lastTouchIdentifier = n.identifier,
                    this.updateScrollParent(e)
                }
            }
            return this.trackingClick = !0,
            this.trackingClickStart = t.timeStamp,
            this.targetElement = e,
            this.touchStartX = n.pageX,
            this.touchStartY = n.pageY,
            t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(),
            !0
        }
        ,
        t.prototype.touchHasMoved = function(t) {
            var e = t.changedTouches[0]
              , n = this.touchBoundary;
            return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
        }
        ,
        t.prototype.onTouchMove = function(t) {
            return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1,
            this.targetElement = null),
            !0) : !0
        }
        ,
        t.prototype.findControl = function(t) {
            return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }
        ,
        t.prototype.onTouchEnd = function(t) {
            var e, a, c, s, u, l = this.targetElement;
            if (!this.trackingClick)
                return !0;
            if (t.timeStamp - this.lastClickTime < this.tapDelay)
                return this.cancelNextClick = !0,
                !0;
            if (t.timeStamp - this.trackingClickStart > this.tapTimeout)
                return !0;
            if (this.cancelNextClick = !1,
            this.lastClickTime = t.timeStamp,
            a = this.trackingClickStart,
            this.trackingClick = !1,
            this.trackingClickStart = 0,
            r && (u = t.changedTouches[0],
            l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l,
            l.fastClickScrollParent = this.targetElement.fastClickScrollParent),
            c = l.tagName.toLowerCase(),
            "label" === c) {
                if (e = this.findControl(l)) {
                    if (this.focus(l),
                    n)
                        return !1;
                    l = e
                }
            } else if (this.needsFocus(l))
                return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null,
                !1) : (this.focus(l),
                this.sendClick(l, t),
                o && "select" === c || (this.targetElement = null,
                t.preventDefault()),
                !1);
            return o && !i && (s = l.fastClickScrollParent,
            s && s.fastClickLastScrollTop !== s.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(),
            this.sendClick(l, t)),
            !1)
        }
        ,
        t.prototype.onTouchCancel = function() {
            this.trackingClick = !1,
            this.targetElement = null
        }
        ,
        t.prototype.onMouse = function(t) {
            return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0,
            t.stopPropagation(),
            t.preventDefault(),
            !1) : !0 : !0
        }
        ,
        t.prototype.onClick = function(t) {
            var e;
            return this.trackingClick ? (this.targetElement = null,
            this.trackingClick = !1,
            !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t),
            e || (this.targetElement = null),
            e)
        }
        ,
        t.prototype.destroy = function() {
            var t = this.layer;
            n && (t.removeEventListener("mouseover", this.onMouse, !0),
            t.removeEventListener("mousedown", this.onMouse, !0),
            t.removeEventListener("mouseup", this.onMouse, !0)),
            t.removeEventListener("click", this.onClick, !0),
            t.removeEventListener("touchstart", this.onTouchStart, !1),
            t.removeEventListener("touchmove", this.onTouchMove, !1),
            t.removeEventListener("touchend", this.onTouchEnd, !1),
            t.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }
        ,
        t.notNeeded = function(t) {
            var e, o, i, r;
            if ("undefined" == typeof window.ontouchstart)
                return !0;
            if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!n)
                    return !0;
                if (e = document.querySelector("meta[name=viewport]")) {
                    if (-1 !== e.content.indexOf("user-scalable=no"))
                        return !0;
                    if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth)
                        return !0
                }
            }
            if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),
            i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
                if (-1 !== e.content.indexOf("user-scalable=no"))
                    return !0;
                if (document.documentElement.scrollWidth <= window.outerWidth)
                    return !0
            }
            return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1],
            r >= 27 && (e = document.querySelector("meta[name=viewport]"),
            e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
        }
        ,
        t.attach = function(e, n) {
            return new t(e,n)
        }
        ,
        "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
            return t
        }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach,
        module.exports.FastClick = t) : window.FastClick = t
    }();
}(jQuery));

(function($) {
    /*** Owl Carousel v2.2.1 * Copyright 2013-2017 David Deutsch * Licensed under  () */
    !function(a, b, c, d) {
        function e(b, c) {
            this.settings = null,
            this.options = a.extend({}, e.Defaults, c),
            this.$element = a(b),
            this._handlers = {},
            this._plugins = {},
            this._supress = {},
            this._current = null,
            this._speed = null,
            this._coordinates = [],
            this._breakpoint = null,
            this._width = null,
            this._items = [],
            this._clones = [],
            this._mergers = [],
            this._widths = [],
            this._invalidated = {},
            this._pipe = [],
            this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: {
                    start: null,
                    current: null
                },
                direction: null
            },
            this._states = {
                current: {},
                tags: {
                    initializing: ["busy"],
                    animating: ["busy"],
                    dragging: ["interacting"]
                }
            },
            a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
                this._handlers[c] = a.proxy(this[c], this)
            }, this)),
            a.each(e.Plugins, a.proxy(function(a, b) {
                this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
            }, this)),
            a.each(e.Workers, a.proxy(function(b, c) {
                this._pipe.push({
                    filter: c.filter,
                    run: a.proxy(c.run, this)
                })
            }, this)),
            this.setup(),
            this.initialize()
        }
        e.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: b,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            refreshClass: "owl-refresh",
            loadedClass: "owl-loaded",
            loadingClass: "owl-loading",
            rtlClass: "owl-rtl",
            responsiveClass: "owl-responsive",
            dragClass: "owl-drag",
            itemClass: "owl-item",
            stageClass: "owl-stage",
            stageOuterClass: "owl-stage-outer",
            grabClass: "owl-grab"
        },
        e.Width = {
            Default: "default",
            Inner: "inner",
            Outer: "outer"
        },
        e.Type = {
            Event: "event",
            State: "state"
        },
        e.Plugins = {},
        e.Workers = [{
            filter: ["width", "settings"],
            run: function() {
                this._width = this.$element.width()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(a) {
                a.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                this.$stage.children(".cloned").remove()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(a) {
                var b = this.settings.margin || ""
                  , c = !this.settings.autoWidth
                  , d = this.settings.rtl
                  , e = {
                    width: "auto",
                    "margin-left": d ? b : "",
                    "margin-right": d ? "" : b
                };
                !c && this.$stage.children().css(e),
                a.css = e
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(a) {
                var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin
                  , c = null
                  , d = this._items.length
                  , e = !this.settings.autoWidth
                  , f = [];
                for (a.items = {
                    merge: !1,
                    width: b
                }; d--; )
                    c = this._mergers[d],
                    c = this.settings.mergeFit && Math.min(c, this.settings.items) || c,
                    a.items.merge = c > 1 || a.items.merge,
                    f[d] = e ? b * c : this._items[d].width();
                this._widths = f
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                var b = []
                  , c = this._items
                  , d = this.settings
                  , e = Math.max(2 * d.items, 4)
                  , f = 2 * Math.ceil(c.length / 2)
                  , g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0
                  , h = ""
                  , i = "";
                for (g /= 2; g--; )
                    b.push(this.normalize(b.length / 2, !0)),
                    h += c[b[b.length - 1]][0].outerHTML,
                    b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
                    i = c[b[b.length - 1]][0].outerHTML + i;
                this._clones = b,
                a(h).addClass("cloned").appendTo(this.$stage),
                a(i).addClass("cloned").prependTo(this.$stage)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b; )
                    d = f[c - 1] || 0,
                    e = this._widths[this.relative(c)] + this.settings.margin,
                    f.push(d + e * a);
                this._coordinates = f
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                var a = this.settings.stagePadding
                  , b = this._coordinates
                  , c = {
                    width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                    "padding-left": a || "",
                    "padding-right": a || ""
                };
                this.$stage.css(c)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(a) {
                var b = this._coordinates.length
                  , c = !this.settings.autoWidth
                  , d = this.$stage.children();
                if (c && a.items.merge)
                    for (; b--; )
                        a.css.width = this._widths[this.relative(b)],
                        d.eq(b).css(a.css);
                else
                    c && (a.css.width = a.items.width,
                    d.css(a.css))
            }
        }, {
            filter: ["items"],
            run: function() {
                this._coordinates.length < 1 && this.$stage.removeAttr("style")
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(a) {
                a.current = a.current ? this.$stage.children().index(a.current) : 0,
                a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)),
                this.reset(a.current)
            }
        }, {
            filter: ["position"],
            run: function() {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"],
            run: function() {
                var a, b, c, d, e = this.settings.rtl ? 1 : -1, f = 2 * this.settings.stagePadding, g = this.coordinates(this.current()) + f, h = g + this.width() * e, i = [];
                for (c = 0,
                d = this._coordinates.length; c < d; c++)
                    a = this._coordinates[c - 1] || 0,
                    b = Math.abs(this._coordinates[c]) + f * e,
                    (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
                this.$stage.children(".active").removeClass("active"),
                this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"),
                this.settings.center && (this.$stage.children(".center").removeClass("center"),
                this.$stage.children().eq(this.current()).addClass("center"))
            }
        }],
        e.prototype.initialize = function() {
            if (this.enter("initializing"),
            this.trigger("initialize"),
            this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
            this.settings.autoWidth && !this.is("pre-loading")) {
                var b, c, e;
                b = this.$element.find("img"),
                c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d,
                e = this.$element.children(c).width(),
                b.length && e <= 0 && this.preloadAutoWidthImages(b)
            }
            this.$element.addClass(this.options.loadingClass),
            this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'),
            this.$element.append(this.$stage.parent()),
            this.replace(this.$element.children().not(this.$stage.parent())),
            this.$element.is(":visible") ? this.refresh() : this.invalidate("width"),
            this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),
            this.registerEventHandlers(),
            this.leave("initializing"),
            this.trigger("initialized")
        }
        ,
        e.prototype.setup = function() {
            var b = this.viewport()
              , c = this.options.responsive
              , d = -1
              , e = null;
            c ? (a.each(c, function(a) {
                a <= b && a > d && (d = Number(a))
            }),
            e = a.extend({}, this.options, c[d]),
            "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()),
            delete e.responsive,
            e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s","g"), "$1" + d))) : e = a.extend({}, this.options),
            this.trigger("change", {
                property: {
                    name: "settings",
                    value: e
                }
            }),
            this._breakpoint = d,
            this.settings = e,
            this.invalidate("settings"),
            this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            })
        }
        ,
        e.prototype.optionsLogic = function() {
            this.settings.autoWidth && (this.settings.stagePadding = !1,
            this.settings.merge = !1)
        }
        ,
        e.prototype.prepare = function(b) {
            var c = this.trigger("prepare", {
                content: b
            });
            return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)),
            this.trigger("prepared", {
                content: c.data
            }),
            c.data
        }
        ,
        e.prototype.update = function() {
            for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
                return this[a]
            }, this._invalidated), e = {}; b < c; )
                (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e),
                b++;
            this._invalidated = {},
            !this.is("valid") && this.enter("valid")
        }
        ,
        e.prototype.width = function(a) {
            switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
            }
        }
        ,
        e.prototype.refresh = function() {
            this.enter("refreshing"),
            this.trigger("refresh"),
            this.setup(),
            this.optionsLogic(),
            this.$element.addClass(this.options.refreshClass),
            this.update(),
            this.$element.removeClass(this.options.refreshClass),
            this.leave("refreshing"),
            this.trigger("refreshed")
        }
        ,
        e.prototype.onThrottledResize = function() {
            b.clearTimeout(this.resizeTimer),
            this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
        }
        ,
        e.prototype.onResize = function() {
            return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"),
            this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"),
            !1) : (this.invalidate("width"),
            this.refresh(),
            this.leave("resizing"),
            void this.trigger("resized")))))
        }
        ,
        e.prototype.registerEventHandlers = function() {
            a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)),
            this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize),
            this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass),
            this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
            this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
                return !1
            })),
            this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)),
            this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
        }
        ,
        e.prototype.onDragStart = function(b) {
            var d = null;
            3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","),
            d = {
                x: d[16 === d.length ? 12 : 4],
                y: d[16 === d.length ? 13 : 5]
            }) : (d = this.$stage.position(),
            d = {
                x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
                y: d.top
            }),
            this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
            this.invalidate("position")),
            this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type),
            this.speed(0),
            this._drag.time = (new Date).getTime(),
            this._drag.target = a(b.target),
            this._drag.stage.start = d,
            this._drag.stage.current = d,
            this._drag.pointer = this.pointer(b),
            a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)),
            a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
                var d = this.difference(this._drag.pointer, this.pointer(b));
                a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)),
                Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"))
            }, this)))
        }
        ,
        e.prototype.onDragMove = function(a) {
            var b = null
              , c = null
              , d = null
              , e = this.difference(this._drag.pointer, this.pointer(a))
              , f = this.difference(this._drag.stage.start, e);
            this.is("dragging") && (a.preventDefault(),
            this.settings.loop ? (b = this.coordinates(this.minimum()),
            c = this.coordinates(this.maximum() + 1) - b,
            f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()),
            c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()),
            d = this.settings.pullDrag ? -1 * e.x / 5 : 0,
            f.x = Math.max(Math.min(f.x, b + d), c + d)),
            this._drag.stage.current = f,
            this.animate(f.x))
        }
        ,
        e.prototype.onDragEnd = function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b))
              , e = this._drag.stage.current
              , f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
            a(c).off(".owl.core"),
            this.$element.removeClass(this.options.grabClass),
            (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
            this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
            this.invalidate("position"),
            this.update(),
            this._drag.direction = f,
            (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
                return !1
            })),
            this.is("dragging") && (this.leave("dragging"),
            this.trigger("dragged"))
        }
        ,
        e.prototype.closest = function(b, c) {
            var d = -1
              , e = 30
              , f = this.width()
              , g = this.coordinates();
            return this.settings.freeDrag || a.each(g, a.proxy(function(a, h) {
                return "left" === c && b > h - e && b < h + e ? d = a : "right" === c && b > h - f - e && b < h - f + e ? d = a + 1 : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a),
                d === -1
            }, this)),
            this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())),
            d
        }
        ,
        e.prototype.animate = function(b) {
            var c = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(),
            c && (this.enter("animating"),
            this.trigger("translate")),
            a.support.transform3d && a.support.transition ? this.$stage.css({
                transform: "translate3d(" + b + "px,0px,0px)",
                transition: this.speed() / 1e3 + "s"
            }) : c ? this.$stage.animate({
                left: b + "px"
            }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
                left: b + "px"
            })
        }
        ,
        e.prototype.is = function(a) {
            return this._states.current[a] && this._states.current[a] > 0
        }
        ,
        e.prototype.current = function(a) {
            if (a === d)
                return this._current;
            if (0 === this._items.length)
                return d;
            if (a = this.normalize(a),
            this._current !== a) {
                var b = this.trigger("change", {
                    property: {
                        name: "position",
                        value: a
                    }
                });
                b.data !== d && (a = this.normalize(b.data)),
                this._current = a,
                this.invalidate("position"),
                this.trigger("changed", {
                    property: {
                        name: "position",
                        value: this._current
                    }
                })
            }
            return this._current
        }
        ,
        e.prototype.invalidate = function(b) {
            return "string" === a.type(b) && (this._invalidated[b] = !0,
            this.is("valid") && this.leave("valid")),
            a.map(this._invalidated, function(a, b) {
                return b
            })
        }
        ,
        e.prototype.reset = function(a) {
            a = this.normalize(a),
            a !== d && (this._speed = 0,
            this._current = a,
            this.suppress(["translate", "translated"]),
            this.animate(this.coordinates(a)),
            this.release(["translate", "translated"]))
        }
        ,
        e.prototype.normalize = function(a, b) {
            var c = this._items.length
              , e = b ? 0 : this._clones.length;
            return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2),
            a
        }
        ,
        e.prototype.relative = function(a) {
            return a -= this._clones.length / 2,
            this.normalize(a, !0)
        }
        ,
        e.prototype.maximum = function(a) {
            var b, c, d, e = this.settings, f = this._coordinates.length;
            if (e.loop)
                f = this._clones.length / 2 + this._items.length - 1;
            else if (e.autoWidth || e.merge) {
                for (b = this._items.length,
                c = this._items[--b].width(),
                d = this.$element.width(); b-- && (c += this._items[b].width() + this.settings.margin,
                !(c > d)); )
                    ;
                f = b + 1
            } else
                f = e.center ? this._items.length - 1 : this._items.length - e.items;
            return a && (f -= this._clones.length / 2),
            Math.max(f, 0)
        }
        ,
        e.prototype.minimum = function(a) {
            return a ? 0 : this._clones.length / 2
        }
        ,
        e.prototype.items = function(a) {
            return a === d ? this._items.slice() : (a = this.normalize(a, !0),
            this._items[a])
        }
        ,
        e.prototype.mergers = function(a) {
            return a === d ? this._mergers.slice() : (a = this.normalize(a, !0),
            this._mergers[a])
        }
        ,
        e.prototype.clones = function(b) {
            var c = this._clones.length / 2
              , e = c + this._items.length
              , f = function(a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
            return b === d ? a.map(this._clones, function(a, b) {
                return f(b)
            }) : a.map(this._clones, function(a, c) {
                return a === b ? f(c) : null
            })
        }
        ,
        e.prototype.speed = function(a) {
            return a !== d && (this._speed = a),
            this._speed
        }
        ,
        e.prototype.coordinates = function(b) {
            var c, e = 1, f = b - 1;
            return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
                return this.coordinates(b)
            }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1,
            f = b + 1),
            c = this._coordinates[b],
            c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0,
            c = Math.ceil(c))
        }
        ,
        e.prototype.duration = function(a, b, c) {
            return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
        }
        ,
        e.prototype.to = function(a, b) {
            var c = this.current()
              , d = null
              , e = a - this.relative(c)
              , f = (e > 0) - (e < 0)
              , g = this._items.length
              , h = this.minimum()
              , i = this.maximum();
            this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g),
            a = c + e,
            d = ((a - h) % g + g) % g + h,
            d !== a && d - e <= i && d - e > 0 && (c = d - e,
            a = d,
            this.reset(c))) : this.settings.rewind ? (i += 1,
            a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)),
            this.speed(this.duration(c, a, b)),
            this.current(a),
            this.$element.is(":visible") && this.update()
        }
        ,
        e.prototype.next = function(a) {
            a = a || !1,
            this.to(this.relative(this.current()) + 1, a)
        }
        ,
        e.prototype.prev = function(a) {
            a = a || !1,
            this.to(this.relative(this.current()) - 1, a)
        }
        ,
        e.prototype.onTransitionEnd = function(a) {
            if (a !== d && (a.stopPropagation(),
            (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)))
                return !1;
            this.leave("animating"),
            this.trigger("translated")
        }
        ,
        e.prototype.viewport = function() {
            var d;
            return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."),
            d
        }
        ,
        e.prototype.replace = function(b) {
            this.$stage.empty(),
            this._items = [],
            b && (b = b instanceof jQuery ? b : a(b)),
            this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)),
            b.filter(function() {
                return 1 === this.nodeType
            }).each(a.proxy(function(a, b) {
                b = this.prepare(b),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
            }, this)),
            this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
            this.invalidate("items")
        }
        ,
        e.prototype.add = function(b, c) {
            var e = this.relative(this._current);
            c = c === d ? this._items.length : this.normalize(c, !0),
            b = b instanceof jQuery ? b : a(b),
            this.trigger("add", {
                content: b,
                position: c
            }),
            b = this.prepare(b),
            0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b),
            0 !== this._items.length && this._items[c - 1].after(b),
            this._items.push(b),
            this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b),
            this._items.splice(c, 0, b),
            this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
            this._items[e] && this.reset(this._items[e].index()),
            this.invalidate("items"),
            this.trigger("added", {
                content: b,
                position: c
            })
        }
        ,
        e.prototype.remove = function(a) {
            a = this.normalize(a, !0),
            a !== d && (this.trigger("remove", {
                content: this._items[a],
                position: a
            }),
            this._items[a].remove(),
            this._items.splice(a, 1),
            this._mergers.splice(a, 1),
            this.invalidate("items"),
            this.trigger("removed", {
                content: null,
                position: a
            }))
        }
        ,
        e.prototype.preloadAutoWidthImages = function(b) {
            b.each(a.proxy(function(b, c) {
                this.enter("pre-loading"),
                c = a(c),
                a(new Image).one("load", a.proxy(function(a) {
                    c.attr("src", a.target.src),
                    c.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") && !this.is("initializing") && this.refresh()
                }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
            }, this))
        }
        ,
        e.prototype.destroy = function() {
            this.$element.off(".owl.core"),
            this.$stage.off(".owl.core"),
            a(c).off(".owl.core"),
            this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer),
            this.off(b, "resize", this._handlers.onThrottledResize));
            for (var d in this._plugins)
                this._plugins[d].destroy();
            this.$stage.children(".cloned").remove(),
            this.$stage.unwrap(),
            this.$stage.children().contents().unwrap(),
            this.$stage.children().unwrap(),
            this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s","g"), "")).removeData("owl.carousel")
        }
        ,
        e.prototype.op = function(a, b, c) {
            var d = this.settings.rtl;
            switch (b) {
            case "<":
                return d ? a > c : a < c;
            case ">":
                return d ? a < c : a > c;
            case ">=":
                return d ? a <= c : a >= c;
            case "<=":
                return d ? a >= c : a <= c
            }
        }
        ,
        e.prototype.on = function(a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
        }
        ,
        e.prototype.off = function(a, b, c, d) {
            a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
        }
        ,
        e.prototype.trigger = function(b, c, d, f, g) {
            var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            }
              , i = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase())
              , j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, h, c));
            return this._supress[b] || (a.each(this._plugins, function(a, b) {
                b.onTrigger && b.onTrigger(j)
            }),
            this.register({
                type: e.Type.Event,
                name: b
            }),
            this.$element.trigger(j),
            this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)),
            j
        }
        ,
        e.prototype.enter = function(b) {
            a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
                this._states.current[b] === d && (this._states.current[b] = 0),
                this._states.current[b]++
            }, this))
        }
        ,
        e.prototype.leave = function(b) {
            a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
                this._states.current[b]--
            }, this))
        }
        ,
        e.prototype.register = function(b) {
            if (b.type === e.Type.Event) {
                if (a.event.special[b.name] || (a.event.special[b.name] = {}),
                !a.event.special[b.name].owl) {
                    var c = a.event.special[b.name]._default;
                    a.event.special[b.name]._default = function(a) {
                        return !c || !c.apply || a.namespace && a.namespace.indexOf("owl") !== -1 ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                    }
                    ,
                    a.event.special[b.name].owl = !0
                }
            } else
                b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags,
                this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
                    return a.inArray(c, this._states.tags[b.name]) === d
                }, this)))
        }
        ,
        e.prototype.suppress = function(b) {
            a.each(b, a.proxy(function(a, b) {
                this._supress[b] = !0
            }, this))
        }
        ,
        e.prototype.release = function(b) {
            a.each(b, a.proxy(function(a, b) {
                delete this._supress[b]
            }, this))
        }
        ,
        e.prototype.pointer = function(a) {
            var c = {
                x: null,
                y: null
            };
            return a = a.originalEvent || a || b.event,
            a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a,
            a.pageX ? (c.x = a.pageX,
            c.y = a.pageY) : (c.x = a.clientX,
            c.y = a.clientY),
            c
        }
        ,
        e.prototype.isNumeric = function(a) {
            return !isNaN(parseFloat(a))
        }
        ,
        e.prototype.difference = function(a, b) {
            return {
                x: a.x - b.x,
                y: a.y - b.y
            }
        }
        ,
        a.fn.owlCarousel = function(b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var d = a(this)
                  , f = d.data("owl.carousel");
                f || (f = new e(this,"object" == typeof b && b),
                d.data("owl.carousel", f),
                a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                    f.register({
                        type: e.Type.Event,
                        name: c
                    }),
                    f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                        a.namespace && a.relatedTarget !== this && (this.suppress([c]),
                        f[c].apply(this, [].slice.call(arguments, 1)),
                        this.release([c]))
                    }, f))
                })),
                "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
            })
        }
        ,
        a.fn.owlCarousel.Constructor = e
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c, d) {
        var e = function(b) {
            this._core = b,
            this._interval = null,
            this._visible = null,
            this._handlers = {
                "initialized.owl.carousel": a.proxy(function(a) {
                    a.namespace && this._core.settings.autoRefresh && this.watch()
                }, this)
            },
            this._core.options = a.extend({}, e.Defaults, this._core.options),
            this._core.$element.on(this._handlers)
        };
        e.Defaults = {
            autoRefresh: !0,
            autoRefreshInterval: 500
        },
        e.prototype.watch = function() {
            this._interval || (this._visible = this._core.$element.is(":visible"),
            this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
        }
        ,
        e.prototype.refresh = function() {
            this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible,
            this._core.$element.toggleClass("owl-hidden", !this._visible),
            this._visible && this._core.invalidate("width") && this._core.refresh())
        }
        ,
        e.prototype.destroy = function() {
            var a, c;
            b.clearInterval(this._interval);
            for (a in this._handlers)
                this._core.$element.off(a, this._handlers[a]);
            for (c in Object.getOwnPropertyNames(this))
                "function" != typeof this[c] && (this[c] = null)
        }
        ,
        a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c, d) {
        var e = function(b) {
            this._core = b,
            this._loaded = [],
            this._handlers = {
                "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
                    if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                        for (var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items, f = c.center && e * -1 || 0, g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f, h = this._core.clones().length, i = a.proxy(function(a, b) {
                            this.load(b)
                        }, this); f++ < e; )
                            this.load(h / 2 + this._core.relative(g)),
                            h && a.each(this._core.clones(this._core.relative(g)), i),
                            g++
                }, this)
            },
            this._core.options = a.extend({}, e.Defaults, this._core.options),
            this._core.$element.on(this._handlers)
        };
        e.Defaults = {
            lazyLoad: !1
        },
        e.prototype.load = function(c) {
            var d = this._core.$stage.children().eq(c)
              , e = d && d.find(".owl-lazy");
            !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
                var e, f = a(d), g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
                this._core.trigger("load", {
                    element: f,
                    url: g
                }, "lazy"),
                f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                    f.css("opacity", 1),
                    this._core.trigger("loaded", {
                        element: f,
                        url: g
                    }, "lazy")
                }, this)).attr("src", g) : (e = new Image,
                e.onload = a.proxy(function() {
                    f.css({
                        "background-image": 'url("' + g + '")',
                        opacity: "1"
                    }),
                    this._core.trigger("loaded", {
                        element: f,
                        url: g
                    }, "lazy")
                }, this),
                e.src = g)
            }, this)),
            this._loaded.push(d.get(0)))
        }
        ,
        e.prototype.destroy = function() {
            var a, b;
            for (a in this.handlers)
                this._core.$element.off(a, this.handlers[a]);
            for (b in Object.getOwnPropertyNames(this))
                "function" != typeof this[b] && (this[b] = null)
        }
        ,
        a.fn.owlCarousel.Constructor.Plugins.Lazy = e
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c, d) {
        var e = function(b) {
            this._core = b,
            this._handlers = {
                "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                    a.namespace && this._core.settings.autoHeight && this.update()
                }, this),
                "changed.owl.carousel": a.proxy(function(a) {
                    a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
                }, this),
                "loaded.owl.lazy": a.proxy(function(a) {
                    a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
                }, this)
            },
            this._core.options = a.extend({}, e.Defaults, this._core.options),
            this._core.$element.on(this._handlers)
        };
        e.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        },
        e.prototype.update = function() {
            var b = this._core._current
              , c = b + this._core.settings.items
              , d = this._core.$stage.children().toArray().slice(b, c)
              , e = []
              , f = 0;
            a.each(d, function(b, c) {
                e.push(a(c).height())
            }),
            f = Math.max.apply(null, e),
            this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)
        }
        ,
        e.prototype.destroy = function() {
            var a, b;
            for (a in this._handlers)
                this._core.$element.off(a, this._handlers[a]);
            for (b in Object.getOwnPropertyNames(this))
                "function" != typeof this[b] && (this[b] = null)
        }
        ,
        a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c, d) {
        var e = function(b) {
            this._core = b,
            this._videos = {},
            this._playing = null,
            this._handlers = {
                "initialized.owl.carousel": a.proxy(function(a) {
                    a.namespace && this._core.register({
                        type: "state",
                        name: "playing",
                        tags: ["interacting"]
                    })
                }, this),
                "resize.owl.carousel": a.proxy(function(a) {
                    a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
                }, this),
                "refreshed.owl.carousel": a.proxy(function(a) {
                    a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
                }, this),
                "changed.owl.carousel": a.proxy(function(a) {
                    a.namespace && "position" === a.property.name && this._playing && this.stop()
                }, this),
                "prepared.owl.carousel": a.proxy(function(b) {
                    if (b.namespace) {
                        var c = a(b.content).find(".owl-video");
                        c.length && (c.css("display", "none"),
                        this.fetch(c, a(b.content)))
                    }
                }, this)
            },
            this._core.options = a.extend({}, e.Defaults, this._core.options),
            this._core.$element.on(this._handlers),
            this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
                this.play(a)
            }, this))
        };
        e.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        },
        e.prototype.fetch = function(a, b) {
            var c = function() {
                return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
            }()
              , d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id")
              , e = a.attr("data-width") || this._core.settings.videoWidth
              , f = a.attr("data-height") || this._core.settings.videoHeight
              , g = a.attr("href");
            if (!g)
                throw new Error("Missing video URL.");
            if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
            d[3].indexOf("youtu") > -1)
                c = "youtube";
            else if (d[3].indexOf("vimeo") > -1)
                c = "vimeo";
            else {
                if (!(d[3].indexOf("vzaar") > -1))
                    throw new Error("Video URL not supported.");
                c = "vzaar"
            }
            d = d[6],
            this._videos[g] = {
                type: c,
                id: d,
                width: e,
                height: f
            },
            b.attr("data-video", g),
            this.thumbnail(a, this._videos[g])
        }
        ,
        e.prototype.thumbnail = function(b, c) {
            var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "", h = b.find("img"), i = "src", j = "", k = this._core.settings, l = function(a) {
                e = '<div class="owl-video-play-icon"></div>',
                d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>',
                b.after(d),
                b.after(e)
            };
            if (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
            this._core.settings.lazyLoad && (i = "data-src",
            j = "owl-lazy"),
            h.length)
                return l(h.attr(i)),
                h.remove(),
                !1;
            "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg",
            l(f)) : "vimeo" === c.type ? a.ajax({
                type: "GET",
                url: "//vimeo.com/api/v2/video/" + c.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(a) {
                    f = a[0].thumbnail_large,
                    l(f)
                }
            }) : "vzaar" === c.type && a.ajax({
                type: "GET",
                url: "//vzaar.com/api/videos/" + c.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(a) {
                    f = a.framegrab_url,
                    l(f)
                }
            })
        }
        ,
        e.prototype.stop = function() {
            this._core.trigger("stop", null, "video"),
            this._playing.find(".owl-video-frame").remove(),
            this._playing.removeClass("owl-video-playing"),
            this._playing = null,
            this._core.leave("playing"),
            this._core.trigger("stopped", null, "video")
        }
        ,
        e.prototype.play = function(b) {
            var c, d = a(b.target), e = d.closest("." + this._core.settings.itemClass), f = this._videos[e.attr("data-video")], g = f.width || "100%", h = f.height || this._core.$stage.height();
            this._playing || (this._core.enter("playing"),
            this._core.trigger("play", null, "video"),
            e = this._core.items(this._core.relative(e.index())),
            this._core.reset(e.index()),
            "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="//www.youtube.com/embed/' + f.id + "?autoplay=1&rel=0&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type ? c = '<iframe src="//player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === f.type && (c = '<iframe frameborder="0"height="' + h + '"width="' + g + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + f.id + '/player?autoplay=true"></iframe>'),
            a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")),
            this._playing = e.addClass("owl-video-playing"))
        }
        ,
        e.prototype.isInFullScreen = function() {
            var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
            return b && a(b).parent().hasClass("owl-video-frame")
        }
        ,
        e.prototype.destroy = function() {
            var a, b;
            this._core.$element.off("click.owl.video");
            for (a in this._handlers)
                this._core.$element.off(a, this._handlers[a]);
            for (b in Object.getOwnPropertyNames(this))
                "function" != typeof this[b] && (this[b] = null)
        }
        ,
        a.fn.owlCarousel.Constructor.Plugins.Video = e
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c, d) {
        var e = function(b) {
            this.core = b,
            this.core.options = a.extend({}, e.Defaults, this.core.options),
            this.swapping = !0,
            this.previous = d,
            this.next = d,
            this.handlers = {
                "change.owl.carousel": a.proxy(function(a) {
                    a.namespace && "position" == a.property.name && (this.previous = this.core.current(),
                    this.next = a.property.value)
                }, this),
                "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                    a.namespace && (this.swapping = "translated" == a.type)
                }, this),
                "translate.owl.carousel": a.proxy(function(a) {
                    a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                }, this)
            },
            this.core.$element.on(this.handlers)
        };
        e.Defaults = {
            animateOut: !1,
            animateIn: !1
        },
        e.prototype.swap = function() {
            if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
                this.core.speed(0);
                var b, c = a.proxy(this.clear, this), d = this.core.$stage.children().eq(this.previous), e = this.core.$stage.children().eq(this.next), f = this.core.settings.animateIn, g = this.core.settings.animateOut;
                this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
                d.one(a.support.animation.end, c).css({
                    left: b + "px"
                }).addClass("animated owl-animated-out").addClass(g)),
                f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
            }
        }
        ,
        e.prototype.clear = function(b) {
            a(b.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
            this.core.onTransitionEnd()
        }
        ,
        e.prototype.destroy = function() {
            var a, b;
            for (a in this.handlers)
                this.core.$element.off(a, this.handlers[a]);
            for (b in Object.getOwnPropertyNames(this))
                "function" != typeof this[b] && (this[b] = null)
        }
        ,
        a.fn.owlCarousel.Constructor.Plugins.Animate = e
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c, d) {
        var e = function(b) {
            this._core = b,
            this._timeout = null,
            this._paused = !1,
            this._handlers = {
                "changed.owl.carousel": a.proxy(function(a) {
                    a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
                }, this),
                "initialized.owl.carousel": a.proxy(function(a) {
                    a.namespace && this._core.settings.autoplay && this.play()
                }, this),
                "play.owl.autoplay": a.proxy(function(a, b, c) {
                    a.namespace && this.play(b, c)
                }, this),
                "stop.owl.autoplay": a.proxy(function(a) {
                    a.namespace && this.stop()
                }, this),
                "mouseover.owl.autoplay": a.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this),
                "mouseleave.owl.autoplay": a.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
                }, this),
                "touchstart.owl.core": a.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this),
                "touchend.owl.core": a.proxy(function() {
                    this._core.settings.autoplayHoverPause && this.play()
                }, this)
            },
            this._core.$element.on(this._handlers),
            this._core.options = a.extend({}, e.Defaults, this._core.options)
        };
        e.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        },
        e.prototype.play = function(a, b) {
            this._paused = !1,
            this._core.is("rotating") || (this._core.enter("rotating"),
            this._setAutoPlayInterval())
        }
        ,
        e.prototype._getNextTimeout = function(d, e) {
            return this._timeout && b.clearTimeout(this._timeout),
            b.setTimeout(a.proxy(function() {
                this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
            }, this), d || this._core.settings.autoplayTimeout)
        }
        ,
        e.prototype._setAutoPlayInterval = function() {
            this._timeout = this._getNextTimeout()
        }
        ,
        e.prototype.stop = function() {
            this._core.is("rotating") && (b.clearTimeout(this._timeout),
            this._core.leave("rotating"))
        }
        ,
        e.prototype.pause = function() {
            this._core.is("rotating") && (this._paused = !0)
        }
        ,
        e.prototype.destroy = function() {
            var a, b;
            this.stop();
            for (a in this._handlers)
                this._core.$element.off(a, this._handlers[a]);
            for (b in Object.getOwnPropertyNames(this))
                "function" != typeof this[b] && (this[b] = null)
        }
        ,
        a.fn.owlCarousel.Constructor.Plugins.autoplay = e
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        var e = function(b) {
            this._core = b,
            this._initialized = !1,
            this._pages = [],
            this._controls = {},
            this._templates = [],
            this.$element = this._core.$element,
            this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            },
            this._handlers = {
                "prepared.owl.carousel": a.proxy(function(b) {
                    b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
                }, this),
                "added.owl.carousel": a.proxy(function(a) {
                    a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
                }, this),
                "remove.owl.carousel": a.proxy(function(a) {
                    a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
                }, this),
                "changed.owl.carousel": a.proxy(function(a) {
                    a.namespace && "position" == a.property.name && this.draw()
                }, this),
                "initialized.owl.carousel": a.proxy(function(a) {
                    a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"),
                    this.initialize(),
                    this.update(),
                    this.draw(),
                    this._initialized = !0,
                    this._core.trigger("initialized", null, "navigation"))
                }, this),
                "refreshed.owl.carousel": a.proxy(function(a) {
                    a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"),
                    this.update(),
                    this.draw(),
                    this._core.trigger("refreshed", null, "navigation"))
                }, this)
            },
            this._core.options = a.extend({}, e.Defaults, this._core.options),
            this.$element.on(this._handlers)
        };
        e.Defaults = {
            nav: !1,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        },
        e.prototype.initialize = function() {
            var b, c = this._core.settings;
            this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),
            this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
                this.prev(c.navSpeed)
            }, this)),
            this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
                this.next(c.navSpeed)
            }, this)),
            c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),
            this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),
            this._controls.$absolute.on("click", "div", a.proxy(function(b) {
                var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
                b.preventDefault(),
                this.to(d, c.dotsSpeed)
            }, this));
            for (b in this._overrides)
                this._core[b] = a.proxy(this[b], this)
        }
        ,
        e.prototype.destroy = function() {
            var a, b, c, d;
            for (a in this._handlers)
                this.$element.off(a, this._handlers[a]);
            for (b in this._controls)
                this._controls[b].remove();
            for (d in this.overides)
                this._core[d] = this._overrides[d];
            for (c in Object.getOwnPropertyNames(this))
                "function" != typeof this[c] && (this[c] = null)
        }
        ,
        e.prototype.update = function() {
            var a, b, c, d = this._core.clones().length / 2, e = d + this._core.items().length, f = this._core.maximum(!0), g = this._core.settings, h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
            if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
            g.dots || "page" == g.slideBy)
                for (this._pages = [],
                a = d,
                b = 0,
                c = 0; a < e; a++) {
                    if (b >= h || 0 === b) {
                        if (this._pages.push({
                            start: Math.min(f, a - d),
                            end: a - d + h - 1
                        }),
                        Math.min(f, a - d) === f)
                            break;
                        b = 0,
                        ++c
                    }
                    b += this._core.mergers(this._core.relative(a))
                }
        }
        ,
        e.prototype.draw = function() {
            var b, c = this._core.settings, d = this._core.items().length <= c.items, e = this._core.relative(this._core.current()), f = c.loop || c.rewind;
            this._controls.$relative.toggleClass("disabled", !c.nav || d),
            c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)),
            this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))),
            this._controls.$absolute.toggleClass("disabled", !c.dots || d),
            c.dots && (b = this._pages.length - this._controls.$absolute.children().length,
            c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
        }
        ,
        e.prototype.onTrigger = function(b) {
            var c = this._core.settings;
            b.page = {
                index: a.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
            }
        }
        ,
        e.prototype.current = function() {
            var b = this._core.relative(this._core.current());
            return a.grep(this._pages, a.proxy(function(a, c) {
                return a.start <= b && a.end >= b
            }, this)).pop()
        }
        ,
        e.prototype.getPosition = function(b) {
            var c, d, e = this._core.settings;
            return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages),
            d = this._pages.length,
            b ? ++c : --c,
            c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()),
            d = this._core.items().length,
            b ? c += e.slideBy : c -= e.slideBy),
            c
        }
        ,
        e.prototype.next = function(b) {
            a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
        }
        ,
        e.prototype.prev = function(b) {
            a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
        }
        ,
        e.prototype.to = function(b, c, d) {
            var e;
            !d && this._pages.length ? (e = this._pages.length,
            a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
        }
        ,
        a.fn.owlCarousel.Constructor.Plugins.Navigation = e
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        var e = function(c) {
            this._core = c,
            this._hashes = {},
            this.$element = this._core.$element,
            this._handlers = {
                "initialized.owl.carousel": a.proxy(function(c) {
                    c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
                }, this),
                "prepared.owl.carousel": a.proxy(function(b) {
                    if (b.namespace) {
                        var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                        if (!c)
                            return;
                        this._hashes[c] = b.content
                    }
                }, this),
                "changed.owl.carousel": a.proxy(function(c) {
                    if (c.namespace && "position" === c.property.name) {
                        var d = this._core.items(this._core.relative(this._core.current()))
                          , e = a.map(this._hashes, function(a, b) {
                            return a === d ? b : null
                        }).join();
                        if (!e || b.location.hash.slice(1) === e)
                            return;
                        b.location.hash = e
                    }
                }, this)
            },
            this._core.options = a.extend({}, e.Defaults, this._core.options),
            this.$element.on(this._handlers),
            a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
                var c = b.location.hash.substring(1)
                  , e = this._core.$stage.children()
                  , f = this._hashes[c] && e.index(this._hashes[c]);
                f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
            }, this))
        };
        e.Defaults = {
            URLhashListener: !1
        },
        e.prototype.destroy = function() {
            var c, d;
            a(b).off("hashchange.owl.navigation");
            for (c in this._handlers)
                this._core.$element.off(c, this._handlers[c]);
            for (d in Object.getOwnPropertyNames(this))
                "function" != typeof this[d] && (this[d] = null)
        }
        ,
        a.fn.owlCarousel.Constructor.Plugins.Hash = e
    }(window.Zepto || window.jQuery, window, document),
    function(a, b, c, d) {
        function e(b, c) {
            var e = !1
              , f = b.charAt(0).toUpperCase() + b.slice(1);
            return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
                if (g[b] !== d)
                    return e = !c || b,
                    !1
            }),
            e
        }
        function f(a) {
            return e(a, !0)
        }
        var g = a("<support>").get(0).style
          , h = "Webkit Moz O ms".split(" ")
          , i = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        }
          , j = {
            csstransforms: function() {
                return !!e("transform")
            },
            csstransforms3d: function() {
                return !!e("perspective")
            },
            csstransitions: function() {
                return !!e("transition")
            },
            cssanimations: function() {
                return !!e("animation")
            }
        };
        j.csstransitions() && (a.support.transition = new String(f("transition")),
        a.support.transition.end = i.transition.end[a.support.transition]),
        j.cssanimations() && (a.support.animation = new String(f("animation")),
        a.support.animation.end = i.animation.end[a.support.animation]),
        j.csstransforms() && (a.support.transform = new String(f("transform")),
        a.support.transform3d = j.csstransforms3d())
    }(window.Zepto || window.jQuery, window, document);
}(jQuery));

(function($) {
    /*Prefetch Owl Images*/
    !function(t, e, o, i) {
        var r = function(e) {
            this._core = e,
            this._loaded = [],
            this._handlers = {
                "initialized.owl.carousel change.owl.carousel": t.proxy(function(e) {
                    if (e.namespace && this._core.settings && !1 !== this._core.settings.lazyLoad && (e.property && "position" === e.property.name || "initialized" === e.type)) {
                        var o = e.property && e.property.value || this._core.current()
                          , i = this.positions(o)
                          , r = this._core.clones().length
                          , s = i.length
                          , n = t.proxy(function(t, e) {
                            this.load(e)
                        }, this);
                        for (console.log(); s--; )
                            this.load(r / 2 + i[s]),
                            r && t.each(this._core.clones(i[s]), n)
                    }
                }, this)
            },
            this._core.options = t.extend({}, r.Defaults, this._core.options),
            this._core.$element.on(this._handlers)
        };
        r.Defaults = {
            lazyLoad: !1,
            lazyPrefetch: "page"
        },
        r.prototype.positions = function(t) {
            for (var e = [], o = this._core.settings, i = this._core.relative(t), r = o.loop || o.center && i > 0, s = o.center && (i > 0 || o.loop), n = o.items + (s && o.items % 2 == 0 ? 1 : 0), a = "page" === o.lazyPrefetch ? n : o.lazyPrefetch, l = n, c = s ? -Math.ceil(o.items / 2) : 0; a--; )
                r && e.unshift(this._core.relative(t - a + c - 1)),
                e.unshift(this._core.relative(t + n + a + c));
            for (; l--; )
                e.unshift(this._core.relative(t + l + c));
            return e
        }
        ,
        r.prototype.load = function(o) {
            var i = this._core.$stage.children().eq(o)
              , r = i && i.find(".owl-lazy");
            !r || t.inArray(i.get(0), this._loaded) > -1 || (r.each(t.proxy(function(o, i) {
                var r = t(i)
                  , s = e.devicePixelRatio > 1 && r.attr("data-src-retina") || r.attr("data-src");
                this._core.trigger("load", {
                    element: r,
                    url: s
                }, "lazy"),
                r.is("img") ? r.one("load.owl.lazy", t.proxy(function() {
                    r.css("opacity", 1),
                    this._core.trigger("loaded", {
                        element: r,
                        url: s
                    }, "lazy"),
                    this._core.settings.autoWidth && (this._core.invalidate("width"),
                    this._core.update())
                }, this)).attr("src", s) : t(new Image).one("load.owl.lazy", t.proxy(function() {
                    r.css({
                        "background-image": "url(" + s + ")",
                        opacity: "1"
                    }),
                    this._core.trigger("loaded", {
                        element: r,
                        url: s
                    }, "lazy")
                }, this)).attr("src", s)
            }, this)),
            this._loaded.push(i.get(0)))
        }
        ,
        r.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers)
                this._core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this))
                "function" != typeof this[e] && (this[e] = null)
        }
        ,
        t.fn.owlCarousel.Constructor.Plugins.Lazy = r
    }(window.Zepto || window.jQuery, window, document);
}(jQuery));

(function($) {
    /*! Sortable 1.6.1 - MIT | https://rubaxa.github.io/Sortable/ */
    !function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(t) : "undefined" != typeof module && void 0 !== module.exports ? module.exports = t() : window.Sortable = t()
    }(function() {
        "use strict";
        function t(t, e) {
            if (!t || !t.nodeType || 1 !== t.nodeType)
                throw "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(t);
            this.el = t,
            this.options = e = b({}, e),
            t[z] = this;
            var n = {
                group: Math.random(),
                sort: !0,
                disabled: !1,
                store: null,
                handle: null,
                scroll: !0,
                scrollSensitivity: 30,
                scrollSpeed: 10,
                draggable: /[uo]l/i.test(t.nodeName) ? "li" : ">*",
                ghostClass: "sortable-ghost",
                chosenClass: "sortable-chosen",
                dragClass: "sortable-drag",
                ignore: "a, img",
                filter: null,
                preventOnFilter: !0,
                animation: 150,
                setData: function(t, e) {
                    t.setData("Text", e.textContent)
                },
                dropBubble: !1,
                dragoverBubble: !1,
                dataIdAttr: "data-id",
                delay: 0,
                forceFallback: !1,
                fallbackClass: "sortable-fallback",
                fallbackOnBody: !1,
                fallbackTolerance: 0,
                fallbackOffset: {
                    x: 0,
                    y: 0
                }
            };
            for (var o in n)
                !(o in e) && (e[o] = n[o]);
            ct(e);
            for (var i in this)
                "_" === i.charAt(0) && "function" == typeof this[i] && (this[i] = this[i].bind(this));
            this.nativeDraggable = !e.forceFallback && et,
            r(t, "mousedown", this._onTapStart),
            r(t, "touchstart", this._onTapStart),
            r(t, "pointerdown", this._onTapStart),
            this.nativeDraggable && (r(t, "dragover", this),
            r(t, "dragenter", this)),
            lt.push(this._onDragOver),
            e.store && this.sort(e.store.get(this))
        }
        function e(t, e) {
            "clone" !== t.lastPullMode && (e = !0),
            x && x.state !== e && (s(x, "display", e ? "none" : ""),
            e || x.state && (t.options.group.revertClone ? (N.insertBefore(x, k),
            t._animate(C, x)) : N.insertBefore(x, C)),
            x.state = e)
        }
        function n(t, e, n) {
            if (t) {
                n = n || Q;
                do {
                    if (">*" === e && t.parentNode === n || m(t, e))
                        return t
                } while (t = o(t))
            }
            return null
        }
        function o(t) {
            var e = t.host;
            return e && e.nodeType ? e : t.parentNode
        }
        function i(t) {
            t.dataTransfer && (t.dataTransfer.dropEffect = "move"),
            t.preventDefault()
        }
        function r(t, e, n) {
            t.addEventListener(e, n, tt)
        }
        function a(t, e, n) {
            t.removeEventListener(e, n, tt)
        }
        function l(t, e, n) {
            if (t)
                if (t.classList)
                    t.classList[n ? "add" : "remove"](e);
                else {
                    var o = (" " + t.className + " ").replace(V, " ").replace(" " + e + " ", " ");
                    t.className = (o + (n ? " " + e : "")).replace(V, " ")
                }
        }
        function s(t, e, n) {
            var o = t && t.style;
            if (o) {
                if (void 0 === n)
                    return Q.defaultView && Q.defaultView.getComputedStyle ? n = Q.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle),
                    void 0 === e ? n : n[e];
                e in o || (e = "-webkit-" + e),
                o[e] = n + ("string" == typeof n ? "" : "px")
            }
        }
        function c(t, e, n) {
            if (t) {
                var o = t.getElementsByTagName(e)
                  , i = 0
                  , r = o.length;
                if (n)
                    for (; i < r; i++)
                        n(o[i], i);
                return o
            }
            return []
        }
        function d(t, e, n, o, i, r, a, l) {
            t = t || e[z];
            var s = Q.createEvent("Event")
              , c = t.options
              , d = "on" + n.charAt(0).toUpperCase() + n.substr(1);
            s.initEvent(n, !0, !0),
            s.to = i || e,
            s.from = r || e,
            s.item = o || e,
            s.clone = x,
            s.oldIndex = a,
            s.newIndex = l,
            e.dispatchEvent(s),
            c[d] && c[d].call(t, s)
        }
        function h(t, e, n, o, i, r, a, l) {
            var s, c, d = t[z], h = d.options.onMove;
            return (s = Q.createEvent("Event")).initEvent("move", !0, !0),
            s.to = e,
            s.from = t,
            s.dragged = n,
            s.draggedRect = o,
            s.related = i || e,
            s.relatedRect = r || e.getBoundingClientRect(),
            s.willInsertAfter = l,
            t.dispatchEvent(s),
            h && (c = h.call(d, s, a)),
            c
        }
        function u(t) {
            t.draggable = !1
        }
        function f() {
            ot = !1
        }
        function p(t, e) {
            var n = t.lastElementChild.getBoundingClientRect();
            return e.clientY - (n.top + n.height) > 5 || e.clientX - (n.left + n.width) > 5
        }
        function g(t) {
            for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, o = 0; n--; )
                o += e.charCodeAt(n);
            return o.toString(36)
        }
        function v(t, e) {
            var n = 0;
            if (!t || !t.parentNode)
                return -1;
            for (; t && (t = t.previousElementSibling); )
                "TEMPLATE" === t.nodeName.toUpperCase() || ">*" !== e && !m(t, e) || n++;
            return n
        }
        function m(t, e) {
            if (t) {
                var n = (e = e.split(".")).shift().toUpperCase()
                  , o = new RegExp("\\s(" + e.join("|") + ")(?=\\s)","g");
                return !("" !== n && t.nodeName.toUpperCase() != n || e.length && ((" " + t.className + " ").match(o) || []).length != e.length)
            }
            return !1
        }
        function _(t, e) {
            var n, o;
            return function() {
                void 0 === n && (n = arguments,
                o = this,
                J(function() {
                    1 === n.length ? t.call(o, n[0]) : t.apply(o, n),
                    n = void 0
                }, e))
            }
        }
        function b(t, e) {
            if (t && e)
                for (var n in e)
                    e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
        }
        function D(t) {
            return $ && $.dom ? $.dom(t).cloneNode(!0) : K ? K(t).clone(!0)[0] : t.cloneNode(!0)
        }
        function y(t) {
            for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
                var o = e[n];
                o.checked && at.push(o)
            }
        }
        function w(t) {
            return J(t, 0)
        }
        function T(t) {
            return clearTimeout(t)
        }
        if ("undefined" == typeof window || !window.document)
            return function() {
                throw new Error("Sortable.js requires a window with a document")
            }
            ;
        var C, S, E, x, N, k, B, Y, O, X, I, A, M, P, R, L, F, U, j, H, W = {}, V = /\s+/g, q = /left|right|inline/, z = "Sortable" + (new Date).getTime(), G = window, Q = G.document, Z = G.parseInt, J = G.setTimeout, K = G.jQuery || G.Zepto, $ = G.Polymer, tt = !1, et = "draggable"in Q.createElement("div"), nt = function(t) {
            return !navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i) && (t = Q.createElement("x"),
            t.style.cssText = "pointer-events:auto",
            "auto" === t.style.pointerEvents)
        }(), ot = !1, it = Math.abs, rt = Math.min, at = [], lt = [], st = _(function(t, e, n) {
            if (n && e.scroll) {
                var o, i, r, a, l, s, c = n[z], d = e.scrollSensitivity, h = e.scrollSpeed, u = t.clientX, f = t.clientY, p = window.innerWidth, g = window.innerHeight;
                if (O !== n && (Y = e.scroll,
                O = n,
                X = e.scrollFn,
                !0 === Y)) {
                    Y = n;
                    do {
                        if (Y.offsetWidth < Y.scrollWidth || Y.offsetHeight < Y.scrollHeight)
                            break
                    } while (Y = Y.parentNode)
                }
                Y && (o = Y,
                i = Y.getBoundingClientRect(),
                r = (it(i.right - u) <= d) - (it(i.left - u) <= d),
                a = (it(i.bottom - f) <= d) - (it(i.top - f) <= d)),
                r || a || (a = (g - f <= d) - (f <= d),
                ((r = (p - u <= d) - (u <= d)) || a) && (o = G)),
                W.vx === r && W.vy === a && W.el === o || (W.el = o,
                W.vx = r,
                W.vy = a,
                clearInterval(W.pid),
                o && (W.pid = setInterval(function() {
                    if (s = a ? a * h : 0,
                    l = r ? r * h : 0,
                    "function" == typeof X)
                        return X.call(c, l, s, t);
                    o === G ? G.scrollTo(G.pageXOffset + l, G.pageYOffset + s) : (o.scrollTop += s,
                    o.scrollLeft += l)
                }, 24)))
            }
        }, 30), ct = function(t) {
            function e(t, e) {
                return void 0 !== t && !0 !== t || (t = n.name),
                "function" == typeof t ? t : function(n, o) {
                    var i = o.options.group.name;
                    return e ? t : t && (t.join ? t.indexOf(i) > -1 : i == t)
                }
            }
            var n = {}
              , o = t.group;
            o && "object" == typeof o || (o = {
                name: o
            }),
            n.name = o.name,
            n.checkPull = e(o.pull, !0),
            n.checkPut = e(o.put),
            n.revertClone = o.revertClone,
            t.group = n
        };
        t.prototype = {
            constructor: t,
            _onTapStart: function(t) {
                var e, o = this, i = this.el, r = this.options, a = r.preventOnFilter, l = t.type, s = t.touches && t.touches[0], c = (s || t).target, h = t.target.shadowRoot && t.path && t.path[0] || c, u = r.filter;
                if (y(i),
                !C && !(/mousedown|pointerdown/.test(l) && 0 !== t.button || r.disabled) && !h.isContentEditable && (c = n(c, r.draggable, i)) && B !== c) {
                    if (e = v(c, r.draggable),
                    "function" == typeof u) {
                        if (u.call(this, t, c, this))
                            return d(o, h, "filter", c, i, i, e),
                            void (a && t.preventDefault())
                    } else if (u && (u = u.split(",").some(function(t) {
                        if (t = n(h, t.trim(), i))
                            return d(o, t, "filter", c, i, i, e),
                            !0
                    })))
                        return void (a && t.preventDefault());
                    r.handle && !n(h, r.handle, i) || this._prepareDragStart(t, s, c, e)
                }
            },
            _prepareDragStart: function(t, e, n, o) {
                var i, a = this, s = a.el, h = a.options, f = s.ownerDocument;
                n && !C && n.parentNode === s && (U = t,
                N = s,
                S = (C = n).parentNode,
                k = C.nextSibling,
                B = n,
                L = h.group,
                P = o,
                this._lastX = (e || t).clientX,
                this._lastY = (e || t).clientY,
                C.style["will-change"] = "all",
                i = function() {
                    a._disableDelayedDrag(),
                    C.draggable = a.nativeDraggable,
                    l(C, h.chosenClass, !0),
                    a._triggerDragStart(t, e),
                    d(a, N, "choose", C, N, N, P)
                }
                ,
                h.ignore.split(",").forEach(function(t) {
                    c(C, t.trim(), u)
                }),
                r(f, "mouseup", a._onDrop),
                r(f, "touchend", a._onDrop),
                r(f, "touchcancel", a._onDrop),
                r(f, "pointercancel", a._onDrop),
                r(f, "selectstart", a),
                h.delay ? (r(f, "mouseup", a._disableDelayedDrag),
                r(f, "touchend", a._disableDelayedDrag),
                r(f, "touchcancel", a._disableDelayedDrag),
                r(f, "mousemove", a._disableDelayedDrag),
                r(f, "touchmove", a._disableDelayedDrag),
                r(f, "pointermove", a._disableDelayedDrag),
                a._dragStartTimer = J(i, h.delay)) : i())
            },
            _disableDelayedDrag: function() {
                var t = this.el.ownerDocument;
                clearTimeout(this._dragStartTimer),
                a(t, "mouseup", this._disableDelayedDrag),
                a(t, "touchend", this._disableDelayedDrag),
                a(t, "touchcancel", this._disableDelayedDrag),
                a(t, "mousemove", this._disableDelayedDrag),
                a(t, "touchmove", this._disableDelayedDrag),
                a(t, "pointermove", this._disableDelayedDrag)
            },
            _triggerDragStart: function(t, e) {
                (e = e || ("touch" == t.pointerType ? t : null)) ? (U = {
                    target: C,
                    clientX: e.clientX,
                    clientY: e.clientY
                },
                this._onDragStart(U, "touch")) : this.nativeDraggable ? (r(C, "dragend", this),
                r(N, "dragstart", this._onDragStart)) : this._onDragStart(U, !0);
                try {
                    Q.selection ? w(function() {
                        Q.selection.empty()
                    }) : window.getSelection().removeAllRanges()
                } catch (t) {}
            },
            _dragStarted: function() {
                if (N && C) {
                    var e = this.options;
                    l(C, e.ghostClass, !0),
                    l(C, e.dragClass, !1),
                    t.active = this,
                    d(this, N, "start", C, N, N, P)
                } else
                    this._nulling()
            },
            _emulateDragOver: function() {
                if (j) {
                    if (this._lastX === j.clientX && this._lastY === j.clientY)
                        return;
                    this._lastX = j.clientX,
                    this._lastY = j.clientY,
                    nt || s(E, "display", "none");
                    var t = Q.elementFromPoint(j.clientX, j.clientY)
                      , e = t
                      , n = lt.length;
                    if (e)
                        do {
                            if (e[z]) {
                                for (; n--; )
                                    lt[n]({
                                        clientX: j.clientX,
                                        clientY: j.clientY,
                                        target: t,
                                        rootEl: e
                                    });
                                break
                            }
                            t = e
                        } while (e = e.parentNode);
                    nt || s(E, "display", "")
                }
            },
            _onTouchMove: function(e) {
                if (U) {
                    var n = this.options
                      , o = n.fallbackTolerance
                      , i = n.fallbackOffset
                      , r = e.touches ? e.touches[0] : e
                      , a = r.clientX - U.clientX + i.x
                      , l = r.clientY - U.clientY + i.y
                      , c = e.touches ? "translate3d(" + a + "px," + l + "px,0)" : "translate(" + a + "px," + l + "px)";
                    if (!t.active) {
                        if (o && rt(it(r.clientX - this._lastX), it(r.clientY - this._lastY)) < o)
                            return;
                        this._dragStarted()
                    }
                    this._appendGhost(),
                    H = !0,
                    j = r,
                    s(E, "webkitTransform", c),
                    s(E, "mozTransform", c),
                    s(E, "msTransform", c),
                    s(E, "transform", c),
                    e.preventDefault()
                }
            },
            _appendGhost: function() {
                if (!E) {
                    var t, e = C.getBoundingClientRect(), n = s(C), o = this.options;
                    l(E = C.cloneNode(!0), o.ghostClass, !1),
                    l(E, o.fallbackClass, !0),
                    l(E, o.dragClass, !0),
                    s(E, "top", e.top - Z(n.marginTop, 10)),
                    s(E, "left", e.left - Z(n.marginLeft, 10)),
                    s(E, "width", e.width),
                    s(E, "height", e.height),
                    s(E, "opacity", "0.8"),
                    s(E, "position", "fixed"),
                    s(E, "zIndex", "100000"),
                    s(E, "pointerEvents", "none"),
                    o.fallbackOnBody && Q.body.appendChild(E) || N.appendChild(E),
                    t = E.getBoundingClientRect(),
                    s(E, "width", 2 * e.width - t.width),
                    s(E, "height", 2 * e.height - t.height)
                }
            },
            _onDragStart: function(t, e) {
                var n = this
                  , o = t.dataTransfer
                  , i = n.options;
                n._offUpEvents(),
                L.checkPull(n, n, C, t) && ((x = D(C)).draggable = !1,
                x.style["will-change"] = "",
                s(x, "display", "none"),
                l(x, n.options.chosenClass, !1),
                n._cloneId = w(function() {
                    N.insertBefore(x, C),
                    d(n, N, "clone", C)
                })),
                l(C, i.dragClass, !0),
                e ? ("touch" === e ? (r(Q, "touchmove", n._onTouchMove),
                r(Q, "touchend", n._onDrop),
                r(Q, "touchcancel", n._onDrop),
                r(Q, "pointermove", n._onTouchMove),
                r(Q, "pointerup", n._onDrop)) : (r(Q, "mousemove", n._onTouchMove),
                r(Q, "mouseup", n._onDrop)),
                n._loopId = setInterval(n._emulateDragOver, 50)) : (o && (o.effectAllowed = "move",
                i.setData && i.setData.call(n, o, C)),
                r(Q, "drop", n),
                r(Q, "mouseover", n),
                n._dragStartId = w(n._dragStarted))
            },
            _onDragOver: function(o) {
                var i, r, a, l, c = this.el, d = this.options, u = d.group, g = t.active, v = L === u, m = !1, _ = d.sort;
                if (void 0 !== o.preventDefault && (o.preventDefault(),
                !d.dragoverBubble && o.stopPropagation()),
                !C.animated && (H = !0,
                g && !d.disabled && (v ? _ || (l = !N.contains(C)) : F === this || (g.lastPullMode = L.checkPull(this, g, C, o)) && u.checkPut(this, g, C, o)) && (void 0 === o.rootEl || o.rootEl === this.el))) {
                    if (st(o, d, this.el),
                    ot)
                        return;
                    if (i = n(o.target, d.draggable, c),
                    r = C.getBoundingClientRect(),
                    F !== this && (F = this,
                    m = !0),
                    l)
                        return e(g, !0),
                        S = N,
                        void (x || k ? N.insertBefore(C, x || k) : _ || N.appendChild(C));
                    if (0 === c.children.length || c.children[0] === E || c === o.target && p(c, o)) {
                        if (0 !== c.children.length && c.children[0] !== E && c === o.target && (i = c.lastElementChild),
                        i) {
                            if (i.animated)
                                return;
                            a = i.getBoundingClientRect()
                        }
                        e(g, v),
                        !1 !== h(N, c, C, r, i, a, o) && (C.contains(c) || (c.appendChild(C),
                        S = c),
                        this._animate(r, C),
                        i && this._animate(a, i))
                    } else if (i && !i.animated && i !== C && void 0 !== i.parentNode[z]) {
                        I !== i && (I = i,
                        A = s(i),
                        M = s(i.parentNode));
                        var b = (a = i.getBoundingClientRect()).right - a.left
                          , D = a.bottom - a.top
                          , y = q.test(A.cssFloat + A.display) || "flex" == M.display && 0 === M["flex-direction"].indexOf("row")
                          , w = i.offsetWidth > C.offsetWidth
                          , T = i.offsetHeight > C.offsetHeight
                          , B = (y ? (o.clientX - a.left) / b : (o.clientY - a.top) / D) > .5
                          , Y = i.nextElementSibling
                          , O = !1;
                        if (y) {
                            var X = C.offsetTop
                              , P = i.offsetTop;
                            O = X === P ? i.previousElementSibling === C && !w || B && w : i.previousElementSibling === C || C.previousElementSibling === i ? (o.clientY - a.top) / D > .5 : P > X
                        } else
                            m || (O = Y !== C && !T || B && T);
                        var R = h(N, c, C, r, i, a, o, O);
                        !1 !== R && (1 !== R && -1 !== R || (O = 1 === R),
                        ot = !0,
                        J(f, 30),
                        e(g, v),
                        C.contains(c) || (O && !Y ? c.appendChild(C) : i.parentNode.insertBefore(C, O ? Y : i)),
                        S = C.parentNode,
                        this._animate(r, C),
                        this._animate(a, i))
                    }
                }
            },
            _animate: function(t, e) {
                var n = this.options.animation;
                if (n) {
                    var o = e.getBoundingClientRect();
                    1 === t.nodeType && (t = t.getBoundingClientRect()),
                    s(e, "transition", "none"),
                    s(e, "transform", "translate3d(" + (t.left - o.left) + "px," + (t.top - o.top) + "px,0)"),
                    e.offsetWidth,
                    s(e, "transition", "all " + n + "ms"),
                    s(e, "transform", "translate3d(0,0,0)"),
                    clearTimeout(e.animated),
                    e.animated = J(function() {
                        s(e, "transition", ""),
                        s(e, "transform", ""),
                        e.animated = !1
                    }, n)
                }
            },
            _offUpEvents: function() {
                var t = this.el.ownerDocument;
                a(Q, "touchmove", this._onTouchMove),
                a(Q, "pointermove", this._onTouchMove),
                a(t, "mouseup", this._onDrop),
                a(t, "touchend", this._onDrop),
                a(t, "pointerup", this._onDrop),
                a(t, "touchcancel", this._onDrop),
                a(t, "pointercancel", this._onDrop),
                a(t, "selectstart", this)
            },
            _onDrop: function(e) {
                var n = this.el
                  , o = this.options;
                clearInterval(this._loopId),
                clearInterval(W.pid),
                clearTimeout(this._dragStartTimer),
                T(this._cloneId),
                T(this._dragStartId),
                a(Q, "mouseover", this),
                a(Q, "mousemove", this._onTouchMove),
                this.nativeDraggable && (a(Q, "drop", this),
                a(n, "dragstart", this._onDragStart)),
                this._offUpEvents(),
                e && (H && (e.preventDefault(),
                !o.dropBubble && e.stopPropagation()),
                E && E.parentNode && E.parentNode.removeChild(E),
                N !== S && "clone" === t.active.lastPullMode || x && x.parentNode && x.parentNode.removeChild(x),
                C && (this.nativeDraggable && a(C, "dragend", this),
                u(C),
                C.style["will-change"] = "",
                l(C, this.options.ghostClass, !1),
                l(C, this.options.chosenClass, !1),
                d(this, N, "unchoose", C, S, N, P),
                N !== S ? (R = v(C, o.draggable)) >= 0 && (d(null, S, "add", C, S, N, P, R),
                d(this, N, "remove", C, S, N, P, R),
                d(null, S, "sort", C, S, N, P, R),
                d(this, N, "sort", C, S, N, P, R)) : C.nextSibling !== k && (R = v(C, o.draggable)) >= 0 && (d(this, N, "update", C, S, N, P, R),
                d(this, N, "sort", C, S, N, P, R)),
                t.active && (null != R && -1 !== R || (R = P),
                d(this, N, "end", C, S, N, P, R),
                this.save()))),
                this._nulling()
            },
            _nulling: function() {
                N = C = S = E = k = x = B = Y = O = U = j = H = R = I = A = F = L = t.active = null,
                at.forEach(function(t) {
                    t.checked = !0
                }),
                at.length = 0
            },
            handleEvent: function(t) {
                switch (t.type) {
                case "drop":
                case "dragend":
                    this._onDrop(t);
                    break;
                case "dragover":
                case "dragenter":
                    C && (this._onDragOver(t),
                    i(t));
                    break;
                case "mouseover":
                    this._onDrop(t);
                    break;
                case "selectstart":
                    t.preventDefault()
                }
            },
            toArray: function() {
                for (var t, e = [], o = this.el.children, i = 0, r = o.length, a = this.options; i < r; i++)
                    n(t = o[i], a.draggable, this.el) && e.push(t.getAttribute(a.dataIdAttr) || g(t));
                return e
            },
            sort: function(t) {
                var e = {}
                  , o = this.el;
                this.toArray().forEach(function(t, i) {
                    var r = o.children[i];
                    n(r, this.options.draggable, o) && (e[t] = r)
                }, this),
                t.forEach(function(t) {
                    e[t] && (o.removeChild(e[t]),
                    o.appendChild(e[t]))
                })
            },
            save: function() {
                var t = this.options.store;
                t && t.set(this)
            },
            closest: function(t, e) {
                return n(t, e || this.options.draggable, this.el)
            },
            option: function(t, e) {
                var n = this.options;
                if (void 0 === e)
                    return n[t];
                n[t] = e,
                "group" === t && ct(n)
            },
            destroy: function() {
                var t = this.el;
                t[z] = null,
                a(t, "mousedown", this._onTapStart),
                a(t, "touchstart", this._onTapStart),
                a(t, "pointerdown", this._onTapStart),
                this.nativeDraggable && (a(t, "dragover", this),
                a(t, "dragenter", this)),
                Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(t) {
                    t.removeAttribute("draggable")
                }),
                lt.splice(lt.indexOf(this._onDragOver), 1),
                this._onDrop(),
                this.el = t = null
            }
        },
        r(Q, "touchmove", function(e) {
            t.active && e.preventDefault()
        });
        try {
            window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                get: function() {
                    tt = {
                        capture: !1,
                        passive: !1
                    }
                }
            }))
        } catch (t) {}
        return t.utils = {
            on: r,
            off: a,
            css: s,
            find: c,
            is: function(t, e) {
                return !!n(t, e, t)
            },
            extend: b,
            throttle: _,
            closest: n,
            toggleClass: l,
            clone: D,
            index: v,
            nextTick: w,
            cancelNextTick: T
        },
        t.create = function(e, n) {
            return new t(e,n)
        }
        ,
        t.version = "1.6.1",
        t
    });
}(jQuery));

(function($) {
    /*! Baguette Box  @url https://github.com/feimosi/baguetteBox.js*/
    !function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.baguetteBox = e()
    }(this, function() {
        "use strict";
        function t(t, e) {
            var n = document.querySelectorAll(t)
              , o = {
                galleries: [],
                nodeList: n
            };
            D[t] = o,
            [].forEach.call(n, function(t) {
                e && e.filter && (z = e.filter);
                var n = [];
                if (n = "A" === t.tagName ? [t] : t.getElementsByTagName("a"),
                0 !== (n = [].filter.call(n, function(t) {
                    if (-1 === t.className.indexOf(e && e.ignoreClass))
                        return z.test(t.href)
                })).length) {
                    var a = [];
                    [].forEach.call(n, function(t, n) {
                        var o = function(t) {
                            t.preventDefault ? t.preventDefault() : t.returnValue = !1,
                            s(a, e),
                            u(n)
                        }
                          , i = {
                            eventHandler: o,
                            imageElement: t
                        };
                        x(t, "click", o),
                        a.push(i)
                    }),
                    o.galleries.push(a)
                }
            })
        }
        function e() {
            for (var t in D)
                D.hasOwnProperty(t) && n(t)
        }
        function n(t) {
            if (D.hasOwnProperty(t)) {
                var e = D[t].galleries;
                [].forEach.call(e, function(t) {
                    [].forEach.call(t, function(t) {
                        E(t.imageElement, "click", t.eventHandler)
                    }),
                    M === t && (M = [])
                }),
                delete D[t]
            }
        }
        function o() {
            if (N = B("baguetteBox-overlay"))
                return A = B("baguetteBox-slider"),
                L = B("previous-button"),
                S = B("next-button"),
                void (P = B("close-button"));
            (N = T("div")).setAttribute("role", "dialog"),
            N.id = "baguetteBox-overlay",
            document.getElementsByTagName("body")[0].appendChild(N),
            (A = T("div")).id = "baguetteBox-slider",
            N.appendChild(A),
            (L = T("button")).setAttribute("type", "button"),
            L.id = "previous-button",
            L.setAttribute("aria-label", "Previous"),
            L.innerHTML = X.svg ? F : "&lt;",
            N.appendChild(L),
            (S = T("button")).setAttribute("type", "button"),
            S.id = "next-button",
            S.setAttribute("aria-label", "Next"),
            S.innerHTML = X.svg ? H : "&gt;",
            N.appendChild(S),
            (P = T("button")).setAttribute("type", "button"),
            P.id = "close-button",
            P.setAttribute("aria-label", "Close"),
            P.innerHTML = X.svg ? I : "&times;",
            N.appendChild(P),
            L.className = S.className = P.className = "baguetteBox-button",
            i()
        }
        function a(t) {
            switch (t.keyCode) {
            case 37:
                v();
                break;
            case 39:
                p();
                break;
            case 27:
                g()
            }
        }
        function i() {
            x(N, "click", W),
            x(L, "click", G),
            x(S, "click", J),
            x(P, "click", K),
            x(A, "contextmenu", _),
            x(N, "touchstart", Q),
            x(N, "touchmove", Z),
            x(N, "touchend", $),
            x(document, "focus", tt, !0)
        }
        function l() {
            E(N, "click", W),
            E(L, "click", G),
            E(S, "click", J),
            E(P, "click", K),
            E(A, "contextmenu", _),
            E(N, "touchstart", Q),
            E(N, "touchmove", Z),
            E(N, "touchend", $),
            E(document, "focus", tt, !0)
        }
        function s(t, e) {
            if (M !== t) {
                for (M = t,
                r(e); A.firstChild; )
                    A.removeChild(A.firstChild);
                V.length = 0;
                for (var n, o = [], a = [], i = 0; i < t.length; i++)
                    (n = T("div")).className = "full-image",
                    n.id = "baguette-img-" + i,
                    V.push(n),
                    o.push("baguetteBox-figure-" + i),
                    a.push("baguetteBox-figcaption-" + i),
                    A.appendChild(V[i]);
                N.setAttribute("aria-labelledby", o.join(" ")),
                N.setAttribute("aria-describedby", a.join(" "))
            }
        }
        function r(t) {
            t || (t = {});
            for (var e in q)
                Y[e] = q[e],
                void 0 !== t[e] && (Y[e] = t[e]);
            A.style.transition = A.style.webkitTransition = "fadeIn" === Y.animation ? "opacity .4s ease" : "slideIn" === Y.animation ? "" : "none",
            "auto" === Y.buttons && ("ontouchstart"in window || 1 === M.length) && (Y.buttons = !1),
            L.style.display = S.style.display = Y.buttons ? "" : "none";
            try {
                N.style.backgroundColor = Y.overlayBackgroundColor
            } catch (t) {}
        }
        function u(t) {
            Y.noScrollbars && (document.documentElement.style.overflowY = "hidden",
            document.body.style.overflowY = "scroll"),
            "block" !== N.style.display && (x(document, "keydown", a),
            j = {
                count: 0,
                startX: null,
                startY: null
            },
            m(R = t, function() {
                C(R),
                k(R)
            }),
            h(),
            N.style.display = "block",
            Y.fullScreen && d(),
            setTimeout(function() {
                N.className = "visible",
                Y.bodyClass && document.body.classList && document.body.classList.add(Y.bodyClass),
                Y.afterShow && Y.afterShow()
            }, 50),
            Y.onChange && Y.onChange(R, V.length),
            U = document.activeElement,
            c())
        }
        function c() {
            Y.buttons ? L.focus() : P.focus()
        }
        function d() {
            N.requestFullscreen ? N.requestFullscreen() : N.webkitRequestFullscreen ? N.webkitRequestFullscreen() : N.mozRequestFullScreen && N.mozRequestFullScreen()
        }
        function f() {
            document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
        }
        function g() {
            Y.noScrollbars && (document.documentElement.style.overflowY = "auto",
            document.body.style.overflowY = "auto"),
            "none" !== N.style.display && (E(document, "keydown", a),
            N.className = "",
            setTimeout(function() {
                N.style.display = "none",
                f(),
                Y.bodyClass && document.body.classList && document.body.classList.remove(Y.bodyClass),
                Y.afterHide && Y.afterHide(),
                U && U.focus()
            }, 500))
        }
        function m(t, e) {
            var n = V[t]
              , o = M[t];
            if (void 0 !== n && void 0 !== o)
                if (n.getElementsByTagName("img")[0])
                    e && e();
                else {
                    var a = o.imageElement
                      , i = a.getElementsByTagName("img")[0]
                      , l = "function" == typeof Y.captions ? Y.captions.call(M, a) : a.getAttribute("data-caption") || a.title
                      , s = b(a)
                      , r = T("figure");
                    if (r.id = "baguetteBox-figure-" + t,
                    r.innerHTML = '<div class="baguetteBox-spinner"><div class="baguetteBox-double-bounce1"></div><div class="baguetteBox-double-bounce2"></div></div>',
                    Y.captions && l) {
                        var u = T("figcaption");
                        u.id = "baguetteBox-figcaption-" + t,
                        u.innerHTML = l,
                        r.appendChild(u)
                    }
                    n.appendChild(r);
                    var c = T("img");
                    c.onload = function() {
                        var n = document.querySelector("#baguette-img-" + t + " .baguetteBox-spinner");
                        r.removeChild(n),
                        !Y.async && e && e()
                    }
                    ,
                    c.setAttribute("src", s),
                    c.alt = i ? i.alt || "" : "",
                    Y.titleTag && l && (c.title = l),
                    r.appendChild(c),
                    Y.async && e && e()
                }
        }
        function b(t) {
            var e = t.href;
            if (t.dataset) {
                var n = [];
                for (var o in t.dataset)
                    "at-" !== o.substring(0, 3) || isNaN(o.substring(3)) || (n[o.replace("at-", "")] = t.dataset[o]);
                for (var a = Object.keys(n).sort(function(t, e) {
                    return parseInt(t, 10) < parseInt(e, 10) ? -1 : 1
                }), i = window.innerWidth * window.devicePixelRatio, l = 0; l < a.length - 1 && a[l] < i; )
                    l++;
                e = n[a[l]] || e
            }
            return e
        }
        function p() {
            var t;
            return R <= V.length - 2 ? (R++,
            h(),
            C(R),
            t = !0) : Y.animation && (A.className = "bounce-from-right",
            setTimeout(function() {
                A.className = ""
            }, 400),
            t = !1),
            Y.onChange && Y.onChange(R, V.length),
            t
        }
        function v() {
            var t;
            return R >= 1 ? (R--,
            h(),
            k(R),
            t = !0) : Y.animation && (A.className = "bounce-from-left",
            setTimeout(function() {
                A.className = ""
            }, 400),
            t = !1),
            Y.onChange && Y.onChange(R, V.length),
            t
        }
        function h() {
            var t = 100 * -R + "%";
            "fadeIn" === Y.animation ? (A.style.opacity = 0,
            setTimeout(function() {
                X.transforms ? A.style.transform = A.style.webkitTransform = "translate3d(" + t + ",0,0)" : A.style.left = t,
                A.style.opacity = 1
            }, 400)) : X.transforms ? A.style.transform = A.style.webkitTransform = "translate3d(" + t + ",0,0)" : A.style.left = t
        }
        function y() {
            var t = T("div");
            return void 0 !== t.style.perspective || void 0 !== t.style.webkitPerspective
        }
        function w() {
            var t = T("div");
            return t.innerHTML = "<svg/>",
            "http://www.w3.org/2000/svg" === (t.firstChild && t.firstChild.namespaceURI)
        }
        function C(t) {
            t - R >= Y.preload || m(t + 1, function() {
                C(t + 1)
            })
        }
        function k(t) {
            R - t >= Y.preload || m(t - 1, function() {
                k(t - 1)
            })
        }
        function x(t, e, n, o) {
            t.addEventListener ? t.addEventListener(e, n, o) : t.attachEvent("on" + e, function(t) {
                (t = t || window.event).target = t.target || t.srcElement,
                n(t)
            })
        }
        function E(t, e, n, o) {
            t.removeEventListener ? t.removeEventListener(e, n, o) : t.detachEvent("on" + e, n)
        }
        function B(t) {
            return document.getElementById(t)
        }
        function T(t) {
            return document.createElement(t)
        }
        var N, A, L, S, P, F = '<i class="fa fa-angle-left"></i>', H = '<i class="fa fa-angle-right"></i>', I = '<i class="fa fa-times"></i>', Y = {}, q = {
            captions: !0,
            buttons: "auto",
            fullScreen: !1,
            noScrollbars: !1,
            bodyClass: "baguetteBox-open",
            titleTag: !1,
            async: !1,
            preload: 2,
            animation: "slideIn",
            afterShow: null,
            afterHide: null,
            onChange: null,
            overlayBackgroundColor: "rgba(0,0,0,1)"
        }, X = {}, M = [], R = 0, j = {}, O = !1, z = /.+\.(gif|jpe?g|png|webp)/i, D = {}, V = [], U = null, W = function(t) {
            -1 !== t.target.id.indexOf("baguette-img") && g()
        }, G = function(t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0,
            v()
        }, J = function(t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0,
            p()
        }, K = function(t) {
            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0,
            g()
        }, Q = function(t) {
            ++j.count > 1 && (j.multitouch = !0),
            j.startX = t.changedTouches[0].pageX,
            j.startY = t.changedTouches[0].pageY
        }, Z = function(t) {
            if (!O && !j.multitouch) {
                t.preventDefault ? t.preventDefault() : t.returnValue = !1;
                var e = t.touches[0] || t.changedTouches[0];
                e.pageX - j.startX > 40 ? (O = !0,
                v()) : e.pageX - j.startX < -40 ? (O = !0,
                p()) : j.startY - e.pageY > 100 && g()
            }
        }, $ = function() {
            --j.count <= 0 && (j.multitouch = !1),
            O = !1
        }, _ = function() {
            $()
        }, tt = function(t) {
            "block" === N.style.display && N.contains && !N.contains(t.target) && (t.stopPropagation(),
            c())
        };
        return [].forEach || (Array.prototype.forEach = function(t, e) {
            for (var n = 0; n < this.length; n++)
                t.call(e, this[n], n, this)
        }
        ),
        [].filter || (Array.prototype.filter = function(t, e, n, o, a) {
            for (n = this,
            o = [],
            a = 0; a < n.length; a++)
                t.call(e, n[a], a, n) && o.push(n[a]);
            return o
        }
        ),
        {
            run: function(e, a) {
                X.transforms = y(),
                X.svg = w(),
                o(),
                n(e),
                t(e, a)
            },
            showNext: p,
            showPrevious: v,
            destroy: function() {
                l(),
                e(),
                E(document, "keydown", a),
                document.getElementsByTagName("body")[0].removeChild(document.getElementById("baguetteBox-overlay")),
                D = {},
                M = [],
                R = 0
            }
        }
    });
}(jQuery));

(function($) {
    /*	By Osvaldas Valutis, www.osvaldas.info	Available for use under the MIT License*/
    !function(n, t, e, i) {
        "use strict";
        var o = function() {
            var n = e.body || e.documentElement
              , n = n.style;
            return "" == n.WebkitTransition ? "-webkit-" : "" == n.MozTransition ? "-moz-" : "" == n.OTransition ? "-o-" : "" == n.transition ? "" : !1
        }
          , r = o() === !1 ? !1 : !0
          , a = function(n, t, e) {
            var i = {}
              , r = o();
            i[r + "transform"] = "translateX(" + t + ")",
            i[r + "transition"] = r + "transform " + e + "s linear",
            n.css(i)
        }
          , u = "ontouchstart"in t
          , d = t.navigator.pointerEnabled || t.navigator.msPointerEnabled
          , c = function(n) {
            if (u)
                return !0;
            if (!d || "undefined" == typeof n || "undefined" == typeof n.pointerType)
                return !1;
            if ("undefined" != typeof n.MSPOINTER_TYPE_MOUSE) {
                if (n.MSPOINTER_TYPE_MOUSE != n.pointerType)
                    return !0
            } else if ("mouse" != n.pointerType)
                return !0;
            return !1
        };
        n.fn.imageLightbox = function(i) {
            var i = n.extend({
                selector: 'id="imagelightbox"',
                animationSpeed: 250,
                preloadNext: !0,
                enableKeyboard: !0,
                quitOnEnd: !1,
                quitOnImgClick: !1,
                quitOnDocClick: !0,
                onStart: !1,
                onEnd: !1,
                onLoadStart: !1,
                onLoadEnd: !1
            }, i)
              , o = n([])
              , f = n()
              , l = n()
              , p = 0
              , g = 0
              , s = 0
              , h = !1
              , m = function() {
                if (!l.length)
                    return !0;
                var e = .8 * n(t).width()
                  , i = .9 * n(t).height()
                  , o = new Image;
                o.src = l.attr("src"),
                o.onload = function() {
                    if (p = o.width,
                    g = o.height,
                    p > e || g > i) {
                        var r = p / g > e / i ? p / e : g / i;
                        p /= r,
                        g /= r
                    }
                    l.css({
                        width: p + "px",
                        height: g + "px",
                        top: (n(t).height() - g) / 2 + "px",
                        left: (n(t).width() - p) / 2 + "px"
                    })
                }
            }
              , v = function(t) {
                if (h)
                    return !1;
                if (t = "undefined" == typeof t ? !1 : "left" == t ? 1 : -1,
                l.length) {
                    if (t !== !1 && (o.length < 2 || i.quitOnEnd === !0 && (-1 === t && 0 == o.index(f) || 1 === t && o.index(f) == o.length - 1)))
                        return E(),
                        !1;
                    var e = {
                        opacity: 0
                    };
                    r ? a(l, 100 * t - s + "px", i.animationSpeed / 1e3) : e.left = parseInt(l.css("left")) + 100 * t + "px",
                    l.animate(e, i.animationSpeed, function() {
                        x()
                    }),
                    s = 0
                }
                h = !0,
                i.onLoadStart !== !1 && i.onLoadStart(),
                setTimeout(function() {
                    l = n("<img " + i.selector + " />").attr("src", f.attr("href")).on("load", function() {
                        l.appendTo("body"),
                        m();
                        var e = {
                            opacity: 1
                        };
                        if (l.css("opacity", 0),
                        r)
                            a(l, -100 * t + "px", 0),
                            setTimeout(function() {
                                a(l, "0px", i.animationSpeed / 1e3)
                            }, 50);
                        else {
                            var u = parseInt(l.css("left"));
                            e.left = u + "px",
                            l.css("left", u - 100 * t + "px")
                        }
                        if (l.animate(e, i.animationSpeed, function() {
                            h = !1,
                            i.onLoadEnd !== !1 && i.onLoadEnd()
                        }),
                        i.preloadNext) {
                            var d = o.eq(o.index(f) + 1);
                            d.length || (d = o.eq(0)),
                            n("<img />").attr("src", d.attr("href"))
                        }
                    }).on("error", function() {
                        i.onLoadEnd !== !1 && i.onLoadEnd()
                    });
                    var e = 0
                      , u = 0
                      , g = 0;
                    l.on(d ? "pointerup MSPointerUp" : "click", function(n) {
                        if (n.preventDefault(),
                        i.quitOnImgClick)
                            return E(),
                            !1;
                        if (c(n.originalEvent))
                            return !0;
                        var t = (n.pageX || n.originalEvent.pageX) - n.target.offsetLeft;
                        f = o.eq(o.index(f) - (p / 2 > t ? 1 : -1)),
                        f.length || (f = o.eq(p / 2 > t ? o.length : 0)),
                        v(p / 2 > t ? "left" : "right")
                    }).on("touchstart pointerdown MSPointerDown", function(n) {
                        return !c(n.originalEvent) || i.quitOnImgClick ? !0 : (r && (g = parseInt(l.css("left"))),
                        void (e = n.originalEvent.pageX || n.originalEvent.touches[0].pageX))
                    }).on("touchmove pointermove MSPointerMove", function(n) {
                        return !c(n.originalEvent) || i.quitOnImgClick ? !0 : (n.preventDefault(),
                        u = n.originalEvent.pageX || n.originalEvent.touches[0].pageX,
                        s = e - u,
                        void (r ? a(l, -s + "px", 0) : l.css("left", g - s + "px")))
                    }).on("touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel", function(n) {
                        return !c(n.originalEvent) || i.quitOnImgClick ? !0 : void (Math.abs(s) > 50 ? (f = o.eq(o.index(f) - (0 > s ? 1 : -1)),
                        f.length || (f = o.eq(0 > s ? o.length : 0)),
                        v(s > 0 ? "right" : "left")) : r ? a(l, "0px", i.animationSpeed / 1e3) : l.animate({
                            left: g + "px"
                        }, i.animationSpeed / 2))
                    })
                }, i.animationSpeed + 100)
            }
              , x = function() {
                return l.length ? (l.remove(),
                void (l = n())) : !1
            }
              , E = function() {
                return l.length ? void l.animate({
                    opacity: 0
                }, i.animationSpeed, function() {
                    x(),
                    h = !1,
                    i.onEnd !== !1 && i.onEnd()
                }) : !1
            }
              , y = function(t) {
                t.each(function() {
                    o = o.add(n(this))
                }),
                t.on("click.imageLightbox", function(t) {
                    return t.preventDefault(),
                    h ? !1 : (h = !1,
                    i.onStart !== !1 && i.onStart(),
                    f = n(this),
                    void v())
                })
            };
            return n(t).on("resize", m),
            i.quitOnDocClick && n(e).on(u ? "touchend" : "click", function(t) {
                l.length && !n(t.target).is(l) && E()
            }),
            i.enableKeyboard && n(e).on("keyup", function(n) {
                return l.length ? (n.preventDefault(),
                27 == n.keyCode && E(),
                void ((37 == n.keyCode || 39 == n.keyCode) && (f = o.eq(o.index(f) - (37 == n.keyCode ? 1 : -1)),
                f.length || (f = o.eq(37 == n.keyCode ? o.length : 0)),
                v(37 == n.keyCode ? "left" : "right")))) : !0
            }),
            y(n(this)),
            this.switchImageLightbox = function(n) {
                var t = o.eq(n);
                if (t.length) {
                    var e = o.index(f);
                    f = t,
                    v(e > n ? "left" : "right")
                }
                return this
            }
            ,
            this.addToImageLightbox = function(n) {
                y(n)
            }
            ,
            this.quitImageLightbox = function() {
                return E(),
                this
            }
            ,
            this
        }
    }(jQuery, window, document);
}(jQuery));

(function($) {
    /*  @author Yiotis Kaltsikis  @see {@link http://yiotis.net/filterizr}  @version 1.2.5  @license MIT License */
    !function(a, b) {
        "use strict";
        if (!b)
            throw new Error("Filterizr requires jQuery to work.");
        var c = function(a) {
            this.init(a)
        };
        c.prototype = {
            init: function(a) {
                this.root = {
                    x: 0,
                    y: 0,
                    w: a
                }
            },
            fit: function(a) {
                var b, c, d, e = a.length, f = e > 0 ? a[0].h : 0;
                for (this.root.h = f,
                b = 0; b < e; b++)
                    d = a[b],
                    (c = this.findNode(this.root, d.w, d.h)) ? d.fit = this.splitNode(c, d.w, d.h) : d.fit = this.growDown(d.w, d.h)
            },
            findNode: function(a, b, c) {
                return a.used ? this.findNode(a.right, b, c) || this.findNode(a.down, b, c) : b <= a.w && c <= a.h ? a : null
            },
            splitNode: function(a, b, c) {
                return a.used = !0,
                a.down = {
                    x: a.x,
                    y: a.y + c,
                    w: a.w,
                    h: a.h - c
                },
                a.right = {
                    x: a.x + b,
                    y: a.y,
                    w: a.w - b,
                    h: c
                },
                a
            },
            growDown: function(a, b) {
                var c;
                return this.root = {
                    used: !0,
                    x: 0,
                    y: 0,
                    w: this.root.w,
                    h: this.root.h + b,
                    down: {
                        x: 0,
                        y: this.root.h,
                        w: this.root.w,
                        h: b
                    },
                    right: this.root
                },
                (c = this.findNode(this.root, a, b)) ? this.splitNode(c, a, b) : null
            }
        },
        b.fn.filterizr = function() {
            var a = this
              , c = arguments;
            if (a._fltr || (a._fltr = b.fn.filterizr.prototype.init(a, "object" == typeof c[0] ? c[0] : void 0)),
            "string" == typeof c[0]) {
                if (c[0].lastIndexOf("_") > -1)
                    throw new Error("Filterizr error: You cannot call private methods");
                if ("function" != typeof a._fltr[c[0]])
                    throw new Error("Filterizr error: There is no such function");
                a._fltr[c[0]](c[1], c[2])
            }
            return a
        }
        ,
        b.fn.filterizr.prototype = {
            init: function(a, c) {
                var d = b(a).extend(b.fn.filterizr.prototype);
                return d.options = {
                    animationDuration: .5,
                    callbacks: {
                        onFilteringStart: function() {},
                        onFilteringEnd: function() {},
                        onShufflingStart: function() {},
                        onShufflingEnd: function() {},
                        onSortingStart: function() {},
                        onSortingEnd: function() {}
                    },
                    delay: 0,
                    delayMode: "progressive",
                    easing: "ease-out",
                    filter: "all",
                    filterOutCss: {
                        opacity: 0,
                        transform: "scale(0.5)"
                    },
                    filterInCss: {
                        opacity: 1,
                        transform: "scale(1)"
                    },
                    layout: "sameSize",
                    setupControls: !0
                },
                0 === arguments.length && (c = d.options),
                1 === arguments.length && "object" == typeof arguments[0] && (c = arguments[0]),
                c && d.setOptions(c),
                d.css({
                    padding: 0,
                    position: "relative"
                }),
                d._lastCategory = 0,
                d._isAnimating = !1,
                d._isShuffling = !1,
                d._isSorting = !1,
                d._mainArray = d._getFiltrItems(),
                d._subArrays = d._makeSubarrays(),
                d._activeArray = d._getCollectionByFilter(d.options.filter),
                d._toggledCategories = {},
                d._typedText = b("input[data-search]").val() || "",
                d._uID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                    var b = 16 * Math.random() | 0;
                    return ("x" == a ? b : 3 & b | 8).toString(16)
                }),
                d._setupEvents(),
                d.options.setupControls && d._setupControls(),
                d.filter(d.options.filter),
                d
            },
            filter: function(a) {
                var b = this
                  , c = b._getCollectionByFilter(a);
                b.options.filter = a,
                b.trigger("filteringStart"),
                b._handleFiltering(c),
                b._isSearchActivated() && b.search(b._typedText)
            },
            toggleFilter: function(a) {
                var b = this
                  , c = [];
                b.trigger("filteringStart"),
                a && (b._toggledCategories[a] ? delete b._toggledCategories[a] : b._toggledCategories[a] = !0),
                b._multifilterModeOn() ? (c = b._makeMultifilterArray(),
                b._handleFiltering(c),
                b._isSearchActivated() && b.search(b._typedText)) : (b.filter("all"),
                b._isSearchActivated() && b.search(b._typedText))
            },
            search: function(a) {
                var b = this
                  , c = b._multifilterModeOn() ? b._makeMultifilterArray() : b._getCollectionByFilter(b.options.filter)
                  , d = []
                  , e = 0;
                if (b._isSearchActivated())
                    for (e = 0; e < c.length; e++) {
                        var f = c[e].text().toLowerCase().indexOf(a.toLowerCase()) > -1;
                        f && d.push(c[e])
                    }
                if (d.length > 0)
                    b._handleFiltering(d);
                else if (b._isSearchActivated())
                    for (e = 0; e < b._activeArray.length; e++)
                        b._activeArray[e]._filterOut();
                else
                    b._handleFiltering(c)
            },
            shuffle: function() {
                var a = this;
                a._isAnimating = !0,
                a._isShuffling = !0,
                a.trigger("shufflingStart"),
                a._mainArray = a._fisherYatesShuffle(a._mainArray),
                a._subArrays = a._makeSubarrays();
                var b = a._multifilterModeOn() ? a._makeMultifilterArray() : a._getCollectionByFilter(a.options.filter);
                a._isSearchActivated() ? a.search(a._typedText) : a._placeItems(b)
            },
            sort: function(a, b) {
                var c = this;
                if (a = a || "domIndex",
                b = b || "asc",
                c._isAnimating = !0,
                c._isSorting = !0,
                c.trigger("sortingStart"),
                "domIndex" !== a && "sortData" !== a && "w" !== a && "h" !== a)
                    for (var e = 0; e < c._mainArray.length; e++)
                        c._mainArray[e][a] = c._mainArray[e].data(a);
                c._mainArray.sort(c._comparator(a, b)),
                c._subArrays = c._makeSubarrays();
                var f = c._multifilterModeOn() ? c._makeMultifilterArray() : c._getCollectionByFilter(c.options.filter);
                c._isSearchActivated() ? c.search(c._typedText) : c._placeItems(f)
            },
            setOptions: function(a) {
                var b = this
                  , c = 0;
                for (var d in a)
                    b.options[d] = a[d];
                if (b._mainArray && (a.animationDuration || a.delay || a.easing || a.delayMode))
                    for (c = 0; c < b._mainArray.length; c++)
                        b._mainArray[c].css("transition", "all " + b.options.animationDuration + "s " + b.options.easing + " " + b._mainArray[c]._calcDelay() + "ms");
                a.callbacks && (a.callbacks.onFilteringStart || (b.options.callbacks.onFilteringStart = function() {}
                ),
                a.callbacks.onFilteringEnd || (b.options.callbacks.onFilteringEnd = function() {}
                ),
                a.callbacks.onShufflingStart || (b.options.callbacks.onShufflingStart = function() {}
                ),
                a.callbacks.onShufflingEnd || (b.options.callbacks.onShufflingEnd = function() {}
                ),
                a.callbacks.onSortingStart || (b.options.callbacks.onSortingStart = function() {}
                ),
                a.callbacks.onSortingEnd || (b.options.callbacks.onSortingEnd = function() {}
                )),
                b.options.filterInCss.transform || (b.options.filterInCss.transform = "translate3d(0,0,0)"),
                b.options.filterOutCss.transform || (b.options.filterOutCss.transform = "translate3d(0,0,0)")
            },
            _getFiltrItems: function() {
                var a = this
                  , c = b(a.find(".filtr-item"))
                  , e = [];
                return b.each(c, function(c, f) {
                    var g = b(f).extend(d)._init(c, a);
                    e.push(g)
                }),
                e
            },
            _makeSubarrays: function() {
                for (var a = this, b = [], c = 0; c < a._lastCategory; c++)
                    b.push([]);
                for (c = 0; c < a._mainArray.length; c++)
                    if ("object" == typeof a._mainArray[c]._category)
                        for (var d = a._mainArray[c]._category.length, e = 0; e < d; e++)
                            b[a._mainArray[c]._category[e] - 1].push(a._mainArray[c]);
                    else
                        b[a._mainArray[c]._category - 1].push(a._mainArray[c]);
                return b
            },
            _makeMultifilterArray: function() {
                for (var a = this, b = [], c = {}, d = 0; d < a._mainArray.length; d++) {
                    var e = a._mainArray[d]
                      , f = !1
                      , g = e.domIndex in c == !1;
                    if (Array.isArray(e._category)) {
                        for (var h = 0; h < e._category.length; h++)
                            if (e._category[h]in a._toggledCategories) {
                                f = !0;
                                break
                            }
                    } else
                        e._category in a._toggledCategories && (f = !0);
                    g && f && (c[e.domIndex] = !0,
                    b.push(e))
                }
                return b
            },
            _setupControls: function() {
                var a = this;
                b("*[data-filter]").click(function() {
                    var c = b(this).data("filter");
                    a.options.filter !== c && a.filter(c)
                }),
                b("*[data-multifilter]").click(function() {
                    var c = b(this).data("multifilter");
                    "all" === c ? (a._toggledCategories = {},
                    a.filter("all")) : a.toggleFilter(c)
                }),
                b("*[data-shuffle]").click(function() {
                    a.shuffle()
                }),
                b("*[data-sortAsc]").click(function() {
                    var c = b("*[data-sortOrder]").val();
                    a.sort(c, "asc")
                }),
                b("*[data-sortDesc]").click(function() {
                    var c = b("*[data-sortOrder]").val();
                    a.sort(c, "desc")
                }),
                b("input[data-search]").keyup(function() {
                    a._typedText = b(this).val(),
                    a._delayEvent(function() {
                        a.search(a._typedText)
                    }, 250, a._uID)
                })
            },
            _setupEvents: function() {
                var c = this;
                b(a).resize(function() {
                    c._delayEvent(function() {
                        c.trigger("resizeFiltrContainer")
                    }, 250, c._uID)
                }),
                c.on("resizeFiltrContainer", function() {
                    c._multifilterModeOn() ? c.toggleFilter() : c.filter(c.options.filter)
                }).on("filteringStart", function() {
                    c.options.callbacks.onFilteringStart()
                }).on("filteringEnd", function() {
                    c.options.callbacks.onFilteringEnd()
                }).on("shufflingStart", function() {
                    c._isShuffling = !0,
                    c.options.callbacks.onShufflingStart()
                }).on("shufflingEnd", function() {
                    c.options.callbacks.onShufflingEnd(),
                    c._isShuffling = !1
                }).on("sortingStart", function() {
                    c._isSorting = !0,
                    c.options.callbacks.onSortingStart()
                }).on("sortingEnd", function() {
                    c.options.callbacks.onSortingEnd(),
                    c._isSorting = !1
                })
            },
            _calcItemPositions: function() {
                var a = this
                  , d = a._activeArray
                  , e = 0
                  , f = Math.round(a.width() / a.find(".filtr-item").outerWidth())
                  , g = 0
                  , h = d[0].outerWidth()
                  , i = 0
                  , j = 0
                  , k = 0
                  , l = 0
                  , m = 0
                  , n = [];
                if ("packed" === a.options.layout) {
                    b.each(a._activeArray, function(a, b) {
                        b._updateDimensions()
                    });
                    var o = new c(a.outerWidth());
                    for (o.fit(a._activeArray),
                    l = 0; l < d.length; l++)
                        n.push({
                            left: d[l].fit.x,
                            top: d[l].fit.y
                        });
                    e = o.root.h
                }
                if ("horizontal" === a.options.layout)
                    for (g = 1,
                    l = 1; l <= d.length; l++)
                        h = d[l - 1].outerWidth(),
                        i = d[l - 1].outerHeight(),
                        n.push({
                            left: j,
                            top: k
                        }),
                        j += h,
                        e < i && (e = i);
                else if ("vertical" === a.options.layout) {
                    for (l = 1; l <= d.length; l++)
                        i = d[l - 1].outerHeight(),
                        n.push({
                            left: j,
                            top: k
                        }),
                        k += i;
                    e = k
                } else if ("sameHeight" === a.options.layout) {
                    g = 1;
                    var p = a.outerWidth();
                    for (l = 1; l <= d.length; l++) {
                        h = d[l - 1].width();
                        var q = d[l - 1].outerWidth()
                          , r = 0;
                        d[l] && (r = d[l].width()),
                        n.push({
                            left: j,
                            top: k
                        }),
                        m = j + h + r,
                        m > p ? (m = 0,
                        j = 0,
                        k += d[0].outerHeight(),
                        g++) : j += q
                    }
                    e = g * d[0].outerHeight()
                } else if ("sameWidth" === a.options.layout) {
                    for (l = 1; l <= d.length; l++) {
                        if (n.push({
                            left: j,
                            top: k
                        }),
                        l % f == 0 && g++,
                        j += h,
                        k = 0,
                        g > 0)
                            for (m = g; m > 0; )
                                k += d[l - f * m].outerHeight(),
                                m--;
                        l % f == 0 && (j = 0)
                    }
                    for (l = 0; l < f; l++) {
                        for (var s = 0, t = l; d[t]; )
                            s += d[t].outerHeight(),
                            t += f;
                        s > e ? (e = s,
                        s = 0) : s = 0
                    }
                } else if ("sameSize" === a.options.layout) {
                    for (l = 1; l <= d.length; l++)
                        n.push({
                            left: j,
                            top: k
                        }),
                        j += h,
                        l % f == 0 && (k += d[0].outerHeight(),
                        j = 0);
                    g = Math.ceil(d.length / f),
                    e = g * d[0].outerHeight()
                }
                return a.css("height", e),
                n
            },
            _handleFiltering: function(a) {
                for (var b = this, c = b._getArrayOfUniqueItems(b._activeArray, a), d = 0; d < c.length; d++)
                    c[d]._filterOut();
                b._activeArray = a,
                b._placeItems(a)
            },
            _multifilterModeOn: function() {
                var a = this;
                return Object.keys(a._toggledCategories).length > 0
            },
            _isSearchActivated: function() {
                return this._typedText.length > 0
            },
            _placeItems: function(a) {
                var b = this;
                b._isAnimating = !0,
                b._itemPositions = b._calcItemPositions();
                for (var c = 0; c < a.length; c++)
                    a[c]._filterIn(b._itemPositions[c])
            },
            _getCollectionByFilter: function(a) {
                var b = this;
                return "all" === a ? b._mainArray : b._subArrays[a - 1]
            },
            _makeDeepCopy: function(a) {
                var b = {};
                for (var c in a)
                    b[c] = a[c];
                return b
            },
            _comparator: function(a, b) {
                return function(c, d) {
                    return "asc" === b ? c[a] < d[a] ? -1 : c[a] > d[a] ? 1 : 0 : "desc" === b ? d[a] < c[a] ? -1 : d[a] > c[a] ? 1 : 0 : void 0
                }
            },
            _getArrayOfUniqueItems: function(a, b) {
                var f, g, c = [], d = {}, e = b.length;
                for (f = 0; f < e; f++)
                    d[b[f].domIndex] = !0;
                for (e = a.length,
                f = 0; f < e; f++)
                    g = a[f],
                    g.domIndex in d || c.push(g);
                return c
            },
            _delayEvent: function() {
                var b = {};
                return function(a, c, d) {
                    if (null === d)
                        throw Error("UniqueID needed");
                    b[d] && clearTimeout(b[d]),
                    b[d] = setTimeout(a, c)
                }
            }(),
            _fisherYatesShuffle: function(b) {
                for (var d, e, c = b.length; c; )
                    e = Math.floor(Math.random() * c--),
                    d = b[c],
                    b[c] = b[e],
                    b[e] = d;
                return b
            }
        };
        var d = {
            _init: function(a, b) {
                var c = this;
                return c._parent = b,
                c._category = c._getCategory(),
                c._lastPos = {},
                c.domIndex = a,
                c.sortData = c.data("sort"),
                c.w = 0,
                c.h = 0,
                c._isFilteredOut = !0,
                c._filteringOut = !1,
                c._filteringIn = !1,
                c.css(b.options.filterOutCss).css({
                    "-webkit-backface-visibility": "hidden",
                    perspective: "1000px",
                    "-webkit-perspective": "1000px",
                    "-webkit-transform-style": "preserve-3d",
                    position: "absolute",
                    transition: "all " + b.options.animationDuration + "s " + b.options.easing + " " + c._calcDelay() + "ms"
                }),
                c.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    c._onTransitionEnd()
                }),
                c
            },
            _updateDimensions: function() {
                var a = this;
                a.w = a.outerWidth(),
                a.h = a.outerHeight()
            },
            _calcDelay: function() {
                var a = this
                  , b = 0;
                return "progressive" === a._parent.options.delayMode ? b = a._parent.options.delay * a.domIndex : a.domIndex % 2 == 0 && (b = a._parent.options.delay),
                b
            },
            _getCategory: function() {
                var a = this
                  , b = a.data("category");
                if ("string" == typeof b) {
                    b = b.split(", ");
                    for (var c = 0; c < b.length; c++) {
                        if (isNaN(parseInt(b[c])))
                            throw new Error("Filterizr: the value of data-category must be a number, starting from value 1 and increasing.");
                        parseInt(b[c]) > a._parent._lastCategory && (a._parent._lastCategory = parseInt(b[c]))
                    }
                } else
                    b > a._parent._lastCategory && (a._parent._lastCategory = b);
                return b
            },
            _onTransitionEnd: function() {
                var a = this;
                a._filteringOut ? (b(a).addClass("filteredOut"),
                a._isFilteredOut = !0,
                a._filteringOut = !1) : a._filteringIn && (a._isFilteredOut = !1,
                a._filteringIn = !1),
                a._parent._isAnimating && (a._parent._isShuffling ? a._parent.trigger("shufflingEnd") : a._parent._isSorting ? a._parent.trigger("sortingEnd") : a._parent.trigger("filteringEnd"),
                a._parent._isAnimating = !1)
            },
            _filterOut: function() {
                var a = this
                  , b = a._parent._makeDeepCopy(a._parent.options.filterOutCss);
                b.transform += " translate3d(" + a._lastPos.left + "px," + a._lastPos.top + "px, 0)",
                a.css(b),
                a.css("pointer-events", "none"),
                a._filteringOut = !0
            },
            _filterIn: function(a) {
                var c = this
                  , d = c._parent._makeDeepCopy(c._parent.options.filterInCss);
                b(c).removeClass("filteredOut"),
                c._filteringIn = !0,
                c._lastPos = a,
                c.css("pointer-events", "auto"),
                d.transform += " translate3d(" + a.left + "px," + a.top + "px, 0)",
                c.css(d)
            }
        }
    }(this, jQuery);
}(jQuery));

(function($) {
    /*! Lazy Load 1.9.5 - MIT license - Copyright 2010-2015 Mika Tuupola */
    !function(t, e) {
        "object" == typeof exports ? module.exports = e(t) : "function" == typeof define && define.amd ? define([], e(t)) : t.LazyLoad = e(t)
    }("undefined" != typeof global ? global : this.window || this.global, function(t) {
        "use strict";
        function e(t, e) {
            this.settings = r(s, e || {}),
            this.images = t || document.querySelectorAll(this.settings.selector),
            this.observer = null,
            this.init()
        }
        const s = {
            src: "data-src",
            srcset: "data-srcset",
            selector: ".lazyload"
        }
          , r = function() {
            let t = {}
              , e = !1
              , s = 0
              , o = arguments.length;
            "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0],
            s++);
            for (; s < o; s++)
                !function(s) {
                    for (let o in s)
                        Object.prototype.hasOwnProperty.call(s, o) && (e && "[object Object]" === Object.prototype.toString.call(s[o]) ? t[o] = r(!0, t[o], s[o]) : t[o] = s[o])
                }(arguments[s]);
            return t
        };
        if (e.prototype = {
            init: function() {
                if (!t.IntersectionObserver)
                    return void this.loadImages();
                let e = this
                  , s = {
                    root: null,
                    rootMargin: "0px",
                    threshold: [0]
                };
                this.observer = new IntersectionObserver(function(t) {
                    t.forEach(function(t) {
                        if (t.intersectionRatio > 0) {
                            e.observer.unobserve(t.target);
                            let s = t.target.getAttribute(e.settings.src)
                              , r = t.target.getAttribute(e.settings.srcset);
                            "img" === t.target.tagName.toLowerCase() ? (s && (t.target.src = s),
                            r && (t.target.srcset = r)) : t.target.style.backgroundImage = "url(" + s + ")"
                        }
                    })
                }
                ,s),
                this.images.forEach(function(t) {
                    e.observer.observe(t)
                })
            },
            loadAndDestroy: function() {
                this.settings && (this.loadImages(),
                this.destroy())
            },
            loadImages: function() {
                if (!this.settings)
                    return;
                let t = this;
                this.images.forEach(function(e) {
                    let s = e.getAttribute(t.settings.src)
                      , r = e.getAttribute(t.settings.srcset);
                    "img" === e.tagName.toLowerCase() ? (s && (e.src = s),
                    r && (e.srcset = r)) : e.style.backgroundImage = "url(" + s + ")"
                })
            },
            destroy: function() {
                this.settings && (this.observer.disconnect(),
                this.settings = null)
            }
        },
        t.lazyload = function(t, s) {
            return new e(t,s)
        }
        ,
        t.jQuery) {
            const s = t.jQuery;
            s.fn.lazyload = function(t) {
                return t = t || {},
                t.attribute = t.attribute || "data-src",
                new e(s.makeArray(this),t),
                this
            }
        }
        return e
    });
}(jQuery));

(function($) {
    /*! * smoothState.js is jQuery plugin that progressively enhances * page loads to behave more like a single-page application. * * @author  Miguel Ángel Pérez   reachme@miguel-perez.com * @see     http://smoothstate.com * */
    !function(t) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? t(require("jquery"), window, document) : t(jQuery, window, document)
    }(function(t, e, n, o) {
        "use strict";
        if (!e.history.pushState)
            return t.fn.smoothState = function() {
                return this
            }
            ,
            void (t.fn.smoothState.options = {});
        if (!t.fn.smoothState) {
            var r = t("html, body")
              , a = e.console
              , i = {
                debug: !1,
                anchors: "a",
                hrefRegex: "",
                forms: "form",
                allowFormCaching: !1,
                repeatDelay: 500,
                blacklist: ".no-smoothState",
                prefetch: !1,
                prefetchOn: "mouseover touchstart",
                prefetchBlacklist: ".no-prefetch",
                cacheLength: 0,
                loadingClass: "is-loading",
                scroll: !0,
                alterRequest: function(t) {
                    return t
                },
                alterChangeState: function(t, e, n) {
                    return t
                },
                onBefore: function(t, e) {},
                onStart: {
                    duration: 0,
                    render: function(t) {}
                },
                onProgress: {
                    duration: 0,
                    render: function(t) {}
                },
                onReady: {
                    duration: 0,
                    render: function(t, e) {
                        t.html(e)
                    }
                },
                onAfter: function(t, e) {}
            }
              , s = {
                isExternal: function(t) {
                    var n = t.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
                    return "string" == typeof n[1] && n[1].length > 0 && n[1].toLowerCase() !== e.location.protocol ? !0 : "string" == typeof n[2] && n[2].length > 0 && n[2].replace(new RegExp(":(" + {
                        "http:": 80,
                        "https:": 443
                    }[e.location.protocol] + ")?$"), "") !== e.location.host
                },
                stripHash: function(t) {
                    return t.replace(/#.*/, "")
                },
                isHash: function(t, n) {
                    n = n || e.location.href;
                    var o = t.indexOf("#") > -1
                      , r = s.stripHash(t) === s.stripHash(n);
                    return o && r
                },
                translate: function(e) {
                    var n = {
                        dataType: "html",
                        type: "GET"
                    };
                    return e = "string" == typeof e ? t.extend({}, n, {
                        url: e
                    }) : t.extend({}, n, e)
                },
                shouldLoadAnchor: function(t, e, n) {
                    var r = t.prop("href");
                    return !(s.isExternal(r) || s.isHash(r) || t.is(e) || t.prop("target") || typeof n !== o && "" !== n && -1 === t.prop("href").search(n))
                },
                clearIfOverCapacity: function(t, e) {
                    return Object.keys || (Object.keys = function(t) {
                        var e, n = [];
                        for (e in t)
                            Object.prototype.hasOwnProperty.call(t, e) && n.push(e);
                        return n
                    }
                    ),
                    Object.keys(t).length > e && (t = {}),
                    t
                },
                storePageIn: function(e, n, o, r, a) {
                    var i = t("<html></html>").append(t(o));
                    return e[n] = {
                        status: "loaded",
                        title: i.find("title").first().text(),
                        html: i.find("#" + r),
                        doc: o,
                        state: a
                    },
                    e
                },
                triggerAllAnimationEndEvent: function(e, n) {
                    n = " " + n || "";
                    var o = 0
                      , r = "animationstart webkitAnimationStart oanimationstart MSAnimationStart"
                      , a = "animationend webkitAnimationEnd oanimationend MSAnimationEnd"
                      , i = "allanimationend"
                      , l = function(n) {
                        t(n.delegateTarget).is(e) && (n.stopPropagation(),
                        o++)
                    }
                      , u = function(n) {
                        t(n.delegateTarget).is(e) && (n.stopPropagation(),
                        o--,
                        0 === o && e.trigger(i))
                    };
                    e.on(r, l),
                    e.on(a, u),
                    e.on("allanimationend" + n, function() {
                        o = 0,
                        s.redraw(e)
                    })
                },
                redraw: function(t) {
                    t.height()
                }
            }
              , l = function(n) {
                if (null !== n.state) {
                    var o = e.location.href
                      , r = t("#" + n.state.id)
                      , a = r.data("smoothState")
                      , i = a.href !== o && !s.isHash(o, a.href)
                      , l = n.state !== a.cache[a.href].state;
                    (i || l) && (l && a.clear(a.href),
                    a.load(o, !1))
                }
            }
              , u = function(i, l) {
                var u = t(i)
                  , c = u.prop("id")
                  , f = null
                  , h = !1
                  , d = {}
                  , p = {}
                  , g = e.location.href
                  , m = function(t) {
                    t = t || !1,
                    t && d.hasOwnProperty(t) ? delete d[t] : d = {},
                    u.data("smoothState").cache = d
                }
                  , y = function(e, n) {
                    n = n || t.noop;
                    var o = s.translate(e);
                    if (d = s.clearIfOverCapacity(d, l.cacheLength),
                    !d.hasOwnProperty(o.url) || "undefined" != typeof o.data) {
                        d[o.url] = {
                            status: "fetching"
                        };
                        var r = t.ajax(o);
                        r.done(function(t) {
                            s.storePageIn(d, o.url, t, c),
                            u.data("smoothState").cache = d
                        }),
                        r.fail(function() {
                            d[o.url].status = "error"
                        }),
                        n && r.always(n)
                    }
                }
                  , v = function() {
                    if (f) {
                        var e = t(f, u);
                        if (e.length) {
                            var n = e.offset().top;
                            r.scrollTop(n)
                        }
                        f = null
                    }
                }
                  , S = function(o) {
                    var i = "#" + c
                      , s = d[o] ? t(d[o].html.html()) : null;
                    s.length ? (n.title = d[o].title,
                    u.data("smoothState").href = o,
                    l.loadingClass && r.removeClass(l.loadingClass),
                    l.onReady.render(u, s),
                    u.one("ss.onReadyEnd", function() {
                        h = !1,
                        l.onAfter(u, s),
                        l.scroll && v(),
                        O(u)
                    }),
                    e.setTimeout(function() {
                        u.trigger("ss.onReadyEnd")
                    }, l.onReady.duration)) : !s && l.debug && a ? a.warn("No element with an id of " + i + " in response from " + o + " in " + d) : e.location = o
                }
                  , w = function(t, n, o) {
                    var i = s.translate(t);
                    "undefined" == typeof n && (n = !0),
                    "undefined" == typeof o && (o = !0);
                    var f = !1
                      , h = !1
                      , g = {
                        loaded: function() {
                            var t = f ? "ss.onProgressEnd" : "ss.onStartEnd";
                            h && f ? h && S(i.url) : u.one(t, function() {
                                S(i.url),
                                o || m(i.url)
                            }),
                            n && (p = l.alterChangeState({
                                id: c
                            }, d[i.url].title, i.url),
                            d[i.url].state = p,
                            e.history.pushState(p, d[i.url].title, i.url)),
                            h && !o && m(i.url)
                        },
                        fetching: function() {
                            f || (f = !0,
                            u.one("ss.onStartEnd", function() {
                                l.loadingClass && r.addClass(l.loadingClass),
                                l.onProgress.render(u),
                                e.setTimeout(function() {
                                    u.trigger("ss.onProgressEnd"),
                                    h = !0
                                }, l.onProgress.duration)
                            })),
                            e.setTimeout(function() {
                                d.hasOwnProperty(i.url) && g[d[i.url].status]()
                            }, 10)
                        },
                        error: function() {
                            l.debug && a ? a.log("There was an error loading: " + i.url) : e.location = i.url
                        }
                    };
                    d.hasOwnProperty(i.url) || y(i),
                    l.onStart.render(u),
                    e.setTimeout(function() {
                        l.scroll && r.scrollTop(0),
                        u.trigger("ss.onStartEnd")
                    }, l.onStart.duration),
                    g[d[i.url].status]()
                }
                  , E = function(e) {
                    var n, o = t(e.currentTarget);
                    s.shouldLoadAnchor(o, l.blacklist, l.hrefRegex) && !h && (e.stopPropagation(),
                    n = s.translate(o.prop("href")),
                    n = l.alterRequest(n),
                    y(n))
                }
                  , b = function(e) {
                    var n = t(e.currentTarget);
                    if (!e.metaKey && !e.ctrlKey && s.shouldLoadAnchor(n, l.blacklist, l.hrefRegex) && (e.stopPropagation(),
                    e.preventDefault(),
                    !T())) {
                        A();
                        var o = s.translate(n.prop("href"));
                        h = !0,
                        f = n.prop("hash"),
                        o = l.alterRequest(o),
                        l.onBefore(n, u),
                        w(o)
                    }
                }
                  , C = function(e) {
                    var n = t(e.currentTarget);
                    if (!n.is(l.blacklist) && (e.preventDefault(),
                    e.stopPropagation(),
                    !T())) {
                        A();
                        var r = {
                            url: n.prop("action"),
                            data: n.serialize(),
                            type: n.prop("method")
                        };
                        h = !0,
                        r = l.alterRequest(r),
                        "get" === r.type.toLowerCase() && (r.url = r.url + "?" + r.data),
                        l.onBefore(n, u),
                        w(r, o, l.allowFormCaching)
                    }
                }
                  , P = 0
                  , T = function() {
                    var t = null === l.repeatDelay
                      , e = parseInt(Date.now()) > P;
                    return !(t || e)
                }
                  , A = function() {
                    P = parseInt(Date.now()) + parseInt(l.repeatDelay)
                }
                  , O = function(t) {
                    l.anchors && l.prefetch && t.find(l.anchors).not(l.prefetchBlacklist).on(l.prefetchOn, null, E)
                }
                  , x = function(t) {
                    l.anchors && (t.on("click", l.anchors, b),
                    O(t)),
                    l.forms && t.on("submit", l.forms, C)
                }
                  , R = function() {
                    var t = u.prop("class");
                    u.removeClass(t),
                    s.redraw(u),
                    u.addClass(t)
                };
                return l = t.extend({}, t.fn.smoothState.options, l),
                null === e.history.state ? (p = l.alterChangeState({
                    id: c
                }, n.title, g),
                e.history.replaceState(p, n.title, g)) : p = {},
                s.storePageIn(d, g, n.documentElement.outerHTML, c, p),
                s.triggerAllAnimationEndEvent(u, "ss.onStartEnd ss.onProgressEnd ss.onEndEnd"),
                x(u),
                {
                    href: g,
                    cache: d,
                    clear: m,
                    load: w,
                    fetch: y,
                    restartCSSAnimations: R
                }
            }
              , c = function(e) {
                return this.each(function() {
                    var n = this.tagName.toLowerCase();
                    this.id && "body" !== n && "html" !== n && !t.data(this, "smoothState") ? t.data(this, "smoothState", new u(this,e)) : !this.id && a ? a.warn("Every smoothState container needs an id but the following one does not have one:", this) : "body" !== n && "html" !== n || !a || a.warn("The smoothstate container cannot be the " + this.tagName + " tag")
                })
            };
            e.onpopstate = l,
            t.smoothStateUtility = s,
            t.fn.smoothState = c,
            t.fn.smoothState.options = i
        }
    });
}(jQuery));

(function($) {
    /*Reading Time | Lensed under the MIT license*/
    !function(e) {
        var n;
        e.fn.readingTime = function(i) {
            var t = {
                readingTimeTarget: ".eta",
                readingTimeAsNumber: !1,
                wordCountTarget: null,
                wordsPerMinute: 270,
                round: !0,
                lang: "en",
                lessThanAMinuteString: "",
                prependTimeString: "",
                prependWordString: "",
                remotePath: null,
                remoteTarget: null,
                success: function() {},
                error: function() {}
            }
              , r = this
              , a = e(this);
            r.settings = e.extend({}, t, i);
            var s = r.settings;
            if (!this.length)
                return s.error.call(this),
                this;
            if ("it" == s.lang)
                var l = s.lessThanAMinuteString || "Meno di un minuto"
                  , u = "min";
            else if ("fr" == s.lang)
                var l = s.lessThanAMinuteString || "Moins d'une minute"
                  , u = "min";
            else if ("de" == s.lang)
                var l = s.lessThanAMinuteString || "Weniger als eine Minute"
                  , u = "min";
            else if ("es" == s.lang)
                var l = s.lessThanAMinuteString || "Menos de un minuto"
                  , u = "min";
            else if ("nl" == s.lang)
                var l = s.lessThanAMinuteString || "Minder dan een minuut"
                  , u = "min";
            else if ("sk" == s.lang)
                var l = s.lessThanAMinuteString || "Menej než minútu"
                  , u = "min";
            else if ("cz" == s.lang)
                var l = s.lessThanAMinuteString || "Méně než minutu"
                  , u = "min";
            else if ("hu" == s.lang)
                var l = s.lessThanAMinuteString || "Kevesebb mint egy perc"
                  , u = "perc";
            else if ("ru" == s.lang)
                var l = s.lessThanAMinuteString || "Меньше минуты"
                  , u = "мин";
            else if ("ar" == s.lang)
                var l = s.lessThanAMinuteString || "أقل من دقيقة"
                  , u = "دقيقة";
            else if ("da" == s.lang)
                var l = s.lessThanAMinuteString || "Mindre end et minut"
                  , u = "min";
            else if ("is" == s.lang)
                var l = s.lessThanAMinuteString || "Minna en eina mínútu"
                  , u = "min";
            else if ("no" == s.lang)
                var l = s.lessThanAMinuteString || "Mindre enn ett minutt"
                  , u = "min";
            else if ("pl" == s.lang)
                var l = s.lessThanAMinuteString || "Mniej niż minutę"
                  , u = "min";
            else if ("ru" == s.lang)
                var l = s.lessThanAMinuteString || "Меньше минуты"
                  , u = "мой";
            else if ("sv" == s.lang)
                var l = s.lessThanAMinuteString || "Mindre än en minut"
                  , u = "min";
            else if ("tr" == s.lang)
                var l = s.lessThanAMinuteString || "Bir dakikadan az"
                  , u = "dk";
            else
                var l = s.lessThanAMinuteString || "Less than a minute"
                  , u = "min";
            var g = function(i) {
                if ("" !== i) {
                    var t = i.trim().split(/\s+/g).length
                      , r = s.wordsPerMinute / 60;
                    if (n = t / r,
                    !0 === s.round)
                        a = Math.round(n / 60);
                    else
                        var a = Math.floor(n / 60);
                    var g = Math.round(n - 60 * a);
                    if (!0 === s.round)
                        a > 0 ? e(s.readingTimeTarget).text(s.prependTimeString + a + (s.readingTimeAsNumber ? "" : " " + u)) : e(s.readingTimeTarget).text(s.readingTimeAsNumber ? a : s.prependTimeString + l);
                    else {
                        var m = a + ":" + g;
                        e(s.readingTimeTarget).text(s.prependTimeString + m)
                    }
                    "" !== s.wordCountTarget && void 0 !== s.wordCountTarget && e(s.wordCountTarget).text(s.prependWordString + t),
                    s.success.call(this)
                } else
                    s.error.call(this, "The element is empty.")
            };
            return a.each(function() {
                null != s.remotePath && null != s.remoteTarget ? e.get(s.remotePath, function(n) {
                    g(e("<div>").html(n).find(s.remoteTarget).text())
                }) : g(a.text())
            }),
            n
        }
    }(jQuery);
}(jQuery));

(function($) {
    /*!
 * Particleground
 *
 * @author Jonathan Nicol - @mrjnicol
 * @version 1.1.0
 * @description Creates a canvas based particle system background
 *
 * Inspired by http://requestlab.fr/ and http://disruptivebydesign.com/
 */
    !function(a, b) {
        "use strict";
        function c(a) {
            a = a || {};
            for (var b = 1; b < arguments.length; b++) {
                var c = arguments[b];
                if (c)
                    for (var d in c)
                        c.hasOwnProperty(d) && ("object" == typeof c[d] ? deepExtend(a[d], c[d]) : a[d] = c[d])
            }
            return a
        }
        function d(d, g) {
            function h() {
                if (y) {
                    r = b.createElement("canvas"),
                    r.className = "pg-canvas",
                    r.style.display = "block",
                    d.insertBefore(r, d.firstChild),
                    s = r.getContext("2d"),
                    i();
                    for (var c = Math.round(r.width * r.height / g.density), e = 0; c > e; e++) {
                        var f = new n;
                        f.setStackPos(e),
                        z.push(f)
                    }
                    a.addEventListener("resize", function() {
                        k()
                    }, !1),
                    b.addEventListener("mousemove", function(a) {
                        A = a.pageX,
                        B = a.pageY
                    }, !1),
                    D && !C && a.addEventListener("deviceorientation", function() {
                        F = Math.min(Math.max(-event.beta, -30), 30),
                        E = Math.min(Math.max(-event.gamma, -30), 30)
                    }, !0),
                    j(),
                    q("onInit")
                }
            }
            function i() {
                r.width = d.offsetWidth,
                r.height = d.offsetHeight,
                s.fillStyle = g.dotColor,
                s.strokeStyle = g.lineColor,
                s.lineWidth = g.lineWidth
            }
            function j() {
                if (y) {
                    u = a.innerWidth,
                    v = a.innerHeight,
                    s.clearRect(0, 0, r.width, r.height);
                    for (var b = 0; b < z.length; b++)
                        z[b].updatePosition();
                    for (var b = 0; b < z.length; b++)
                        z[b].draw();
                    G || (t = requestAnimationFrame(j))
                }
            }
            function k() {
                i();
                for (var a = d.offsetWidth, b = d.offsetHeight, c = z.length - 1; c >= 0; c--)
                    (z[c].position.x > a || z[c].position.y > b) && z.splice(c, 1);
                var e = Math.round(r.width * r.height / g.density);
                if (e > z.length)
                    for (; e > z.length; ) {
                        var f = new n;
                        z.push(f)
                    }
                else
                    e < z.length && z.splice(e);
                for (c = z.length - 1; c >= 0; c--)
                    z[c].setStackPos(c)
            }
            function l() {
                G = !0
            }
            function m() {
                G = !1,
                j()
            }
            function n() {
                switch (this.stackPos,
                this.active = !0,
                this.layer = Math.ceil(3 * Math.random()),
                this.parallaxOffsetX = 0,
                this.parallaxOffsetY = 0,
                this.position = {
                    x: Math.ceil(Math.random() * r.width),
                    y: Math.ceil(Math.random() * r.height)
                },
                this.speed = {},
                g.directionX) {
                case "left":
                    this.speed.x = +(-g.maxSpeedX + Math.random() * g.maxSpeedX - g.minSpeedX).toFixed(2);
                    break;
                case "right":
                    this.speed.x = +(Math.random() * g.maxSpeedX + g.minSpeedX).toFixed(2);
                    break;
                default:
                    this.speed.x = +(-g.maxSpeedX / 2 + Math.random() * g.maxSpeedX).toFixed(2),
                    this.speed.x += this.speed.x > 0 ? g.minSpeedX : -g.minSpeedX
                }
                switch (g.directionY) {
                case "up":
                    this.speed.y = +(-g.maxSpeedY + Math.random() * g.maxSpeedY - g.minSpeedY).toFixed(2);
                    break;
                case "down":
                    this.speed.y = +(Math.random() * g.maxSpeedY + g.minSpeedY).toFixed(2);
                    break;
                default:
                    this.speed.y = +(-g.maxSpeedY / 2 + Math.random() * g.maxSpeedY).toFixed(2),
                    this.speed.x += this.speed.y > 0 ? g.minSpeedY : -g.minSpeedY
                }
            }
            function o(a, b) {
                return b ? void (g[a] = b) : g[a]
            }
            function p() {
                console.log("destroy"),
                r.parentNode.removeChild(r),
                q("onDestroy"),
                f && f(d).removeData("plugin_" + e)
            }
            function q(a) {
                void 0 !== g[a] && g[a].call(d)
            }
            var r, s, t, u, v, w, x, y = !!b.createElement("canvas").getContext, z = [], A = 0, B = 0, C = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), D = !!a.DeviceOrientationEvent, E = 0, F = 0, G = !1;
            return g = c({}, a[e].defaults, g),
            n.prototype.draw = function() {
                s.beginPath(),
                s.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, g.particleRadius / 2, 0, 2 * Math.PI, !0),
                s.closePath(),
                s.fill(),
                s.beginPath();
                for (var a = z.length - 1; a > this.stackPos; a--) {
                    var b = z[a]
                      , c = this.position.x - b.position.x
                      , d = this.position.y - b.position.y
                      , e = Math.sqrt(c * c + d * d).toFixed(2);
                    e < g.proximity && (s.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY),
                    g.curvedLines ? s.quadraticCurveTo(Math.max(b.position.x, b.position.x), Math.min(b.position.y, b.position.y), b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY) : s.lineTo(b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY))
                }
                s.stroke(),
                s.closePath()
            }
            ,
            n.prototype.updatePosition = function() {
                if (g.parallax) {
                    if (D && !C) {
                        var a = (u - 0) / 60;
                        w = (E - -30) * a + 0;
                        var b = (v - 0) / 60;
                        x = (F - -30) * b + 0
                    } else
                        w = A,
                        x = B;
                    this.parallaxTargX = (w - u / 2) / (g.parallaxMultiplier * this.layer),
                    this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10,
                    this.parallaxTargY = (x - v / 2) / (g.parallaxMultiplier * this.layer),
                    this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10
                }
                var c = d.offsetWidth
                  , e = d.offsetHeight;
                switch (g.directionX) {
                case "left":
                    this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = c - this.parallaxOffsetX);
                    break;
                case "right":
                    this.position.x + this.speed.x + this.parallaxOffsetX > c && (this.position.x = 0 - this.parallaxOffsetX);
                    break;
                default:
                    (this.position.x + this.speed.x + this.parallaxOffsetX > c || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x)
                }
                switch (g.directionY) {
                case "up":
                    this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = e - this.parallaxOffsetY);
                    break;
                case "down":
                    this.position.y + this.speed.y + this.parallaxOffsetY > e && (this.position.y = 0 - this.parallaxOffsetY);
                    break;
                default:
                    (this.position.y + this.speed.y + this.parallaxOffsetY > e || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y)
                }
                this.position.x += this.speed.x,
                this.position.y += this.speed.y
            }
            ,
            n.prototype.setStackPos = function(a) {
                this.stackPos = a
            }
            ,
            h(),
            {
                option: o,
                destroy: p,
                start: m,
                pause: l
            }
        }
        var e = "particleground"
          , f = a.jQuery;
        a[e] = function(a, b) {
            return new d(a,b)
        }
        ,
        a[e].defaults = {
            minSpeedX: .1,
            maxSpeedX: .7,
            minSpeedY: .1,
            maxSpeedY: .7,
            directionX: "center",
            directionY: "center",
            density: 1e4,
            dotColor: "#666666",
            lineColor: "#666666",
            particleRadius: 7,
            lineWidth: 1,
            curvedLines: !1,
            proximity: 100,
            parallax: !0,
            parallaxMultiplier: 5,
            onInit: function() {},
            onDestroy: function() {}
        },
        f && (f.fn[e] = function(a) {
            if ("string" == typeof arguments[0]) {
                var b, c = arguments[0], g = Array.prototype.slice.call(arguments, 1);
                return this.each(function() {
                    f.data(this, "plugin_" + e) && "function" == typeof f.data(this, "plugin_" + e)[c] && (b = f.data(this, "plugin_" + e)[c].apply(this, g))
                }),
                void 0 !== b ? b : this
            }
            return "object" != typeof a && a ? void 0 : this.each(function() {
                f.data(this, "plugin_" + e) || f.data(this, "plugin_" + e, new d(this,a))
            })
        }
        )
    }(window, document),
    /**
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * @see: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @see: http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * @license: MIT license
 */
    function() {
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c)
            window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
            window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
            var c = (new Date).getTime()
              , d = Math.max(0, 16 - (c - a))
              , e = window.setTimeout(function() {
                b(c + d)
            }, d);
            return a = c + d,
            e
        }
        ),
        window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        }
        )
    }();
}(jQuery));
