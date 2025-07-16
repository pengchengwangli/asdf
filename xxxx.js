"use strict";
var ydl = {};
String.prototype.trim || (String.prototype.trim = function() {
    return this.replace(/^[　\s]+|[　\s]+$/g, "")
}
),
String.prototype.trimLeft || (String.prototype.trimLeft = function() {
    return this.replace(/^[　\s]+/, "")
}
),
String.prototype.trimRight || (String.prototype.trimRight = function() {
    return this.replace(/[　\s]+$/, "")
}
),
String.prototype.delSpace = function() {
    return this.replace(/[　\s]/g, "")
}
,
String.prototype.length2 = function() {
    return this.replace(/[^\x00-\xff]/g, "..").length
}
,
String.prototype.toDate = function() {
    if (!this)
        return null;
    var t = Date.parse(this.replace(/-/g, "/").replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3"));
    return isNaN(t) ? null : new Date(t)
}
,
function(t, e, a) {
    function n(t, a, n) {
        var i;
        if (i = "string" == typeof t ? e("#" + t) : t,
        "hide" == a)
            i.removeClass("ajax-corver-container").find(".ajax-corver").remove();
        else if ("error" == a) {
            i.find(".ajax-corver > div").removeClass("ajax-loding").html("<div>" + n + "</div>");
            var o = i.find(".ajax-corver > div").height()
              , r = i.find(".ajax-corver > div > div")
              , s = r.height();
            o < s ? r.find(".ajax-cover-text1, .ajax-cover-text2, .ajax-cover-text3").addClass("low-height") : r.css("margin-top", (o - s) / 2 + "px")
        } else
            i.addClass("ajax-corver-container").append('<div class="ajax-corver"><div class="ajax-loding"></div></div>')
    }
    function i(t, a, n, i, o) {
        var r = [];
        if (e.isArray(t)) {
            a = a || "text",
            n = n || "value";
            for (var s = 0, l = t.length; s < l; s++)
                r.push(o(t[s][n], t[s][a], i(t[s][n]), s))
        } else if ("object" == typeof t) {
            var d = 0;
            for (var c in t)
                r.push(o(c, t[c], i(c), d)),
                d++
        }
        return r.join("")
    }
    t.contexPath = function() {
        if (window.pageData && pageData.contexPath)
            return pageData.contexPath;
        var t = e('meta[name="contexPath"]');
        if (t.length > 0)
            return t.attr("content");
        var n = location.pathname.split("/")[1];
        return n === a || 0 == n.length ? "" : "/" + n
    }(),
    t.common = {
        isIe: /Trident/.test(navigator.userAgent),
        keys: {
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            Num0: 48,
            Num1: 49,
            Num2: 50,
            Num3: 51,
            Num4: 52,
            Num5: 53,
            Num6: 54,
            Num7: 55,
            Num8: 56,
            Num9: 57,
            NumPad0: 96,
            NumPad1: 97,
            NumPad2: 98,
            NumPad3: 99,
            NumPad4: 100,
            NumPad5: 101,
            NumPad6: 102,
            NumPad7: 103,
            NumPad8: 104,
            NumPad9: 105,
            NumPadDot: 110,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            Left: 37,
            Up: 38,
            Right: 39,
            Down: 40,
            PageUp: 33,
            PageDown: 34,
            End: 35,
            Home: 36,
            NumPadAdd: 107,
            NumPadSubtract: 109,
            NumPadDivide: 111,
            NumPadMultiplay: 106,
            NumLock: 144,
            Enter: 13,
            Esc: 27,
            Tab: 9,
            Backspace: 8,
            Delete: 46,
            Slash: 191,
            Quote: 222,
            Space: 32
        },
        blankOption: '<option value="">请选择...</option>'
    },
    t.uuid = function(t) {
        if (t) {
            var e, a = [], n = "0123456789abcdef";
            for (e = 0; e < 36; e++)
                a[e] = Math.floor(16 * Math.random());
            for (a[14] = 4,
            a[19] = 3 & a[19] | 8,
            e = 0; e < 36; e++)
                a[e] = n.charAt(a[e]);
            return a[8] = a[13] = a[18] = a[23] = "-",
            a.join("")
        }
        return (new Date).getTime()
    }
    ,
    t.formatDate = function(e, a) {
        var n = {
            M: String(e.getMonth() + 1),
            d: String(e.getDate()),
            H: String(e.getHours()),
            h: String(e.getHours() < 13 ? e.getHours() : e.getHours() - 12),
            m: String(e.getMinutes()),
            s: String(e.getSeconds())
        };
        a = a || "yyyy-MM-dd HH:mm:ss";
        for (var i in n)
            a = a.replace(new RegExp(i + i,"g"), ("0" + n[i]).substring(n[i].length - 1)).replace(new RegExp(i,"g"), n[i]);
        return a = a.replace(/E/g, "日一二三四五六".charAt(e.getDay())).replace(/aa/g, e.getHours() < 12 ? "上午" : "下午").replace(/a/g, e.getHours() < 12 ? "AM" : "PM").replace(/yyyy/g, e.getFullYear()).replace(/yy/g, ("" + e.getFullYear()).substring(2)).replace(/SSS/g, t.pad(e.getMilliseconds(), 3)).replace(/S/g, e.getMilliseconds())
    }
    ,
    t.today = function() {
        return t.formatDate(new Date, "yyyy-MM-dd")
    }
    ,
    t.isLeapYear = function(t) {
        return t instanceof Date ? t = t.getFullYear() : "string" == typeof t && (t = t.substr(0, 4)),
        t % 4 == 0 && t % 100 != 0 || t % 400 == 0
    }
    ,
    t.dateAdd = function(e, a, n) {
        if (n || (n = "d"),
        "string" == typeof e && (e = e.toDate()),
        !e)
            return NaN;
        var i = e.getFullYear()
          , o = e.getMonth()
          , r = e.getDate();
        switch (n.toLowerCase()) {
        case "y":
            29 != r || 1 != o || t.isLeapYear(i + a) || (r = 28),
            e = new Date(i + a,o,r);
            break;
        case "m":
            var s = new Date(i,o + a + 1,0).getDate();
            e = new Date(i,o + a,r > s ? s : r);
            break;
        case "d":
            e = new Date(i,e.getMonth(),r + a)
        }
        return t.formatDate(e, "yyyy-MM-dd")
    }
    ,
    t.dateDiff = function(t, e, a) {
        switch (a || (a = "d"),
        "string" == typeof t && (t = t.toDate()),
        "string" == typeof e && (e = e.toDate()),
        a.toLowerCase()) {
        case "y":
            return e.getFullYear() - t.getFullYear();
        case "m":
            return 12 * (e.getFullYear() - t.getFullYear()) + e.getMonth() - t.getMonth();
        case "d":
            return (e.getTime() - t.getTime()) / 864e5
        }
    }
    ,
    t.pad = function(t, e, n, i) {
        n = n === a ? "0" : n;
        var o = (t += "").length2();
        if (i)
            for (; o++ < e; )
                t += n;
        else
            for (; o++ < e; )
                t = n + t;
        return t
    }
    ,
    t.matchArray = function(t, e, a, n) {
        if (!e)
            return n ? "" : null;
        for (var i = 0; i < e.length; i++)
            if (e[i][a] == t)
                return n ? e[i] ? e[i][n] : "" : e[i];
        return n ? "" : null
    }
    ,
    t.sort = function(t, e, a) {
        var n = [].concat(t);
        switch (typeof e) {
        case "string":
            return a ? n.sort(function(t, a) {
                return t[e] == a[e] ? 0 : a[e] > t[e] ? 1 : -1
            }) : n.sort(function(t, a) {
                return t[e] == a[e] ? 0 : a[e] < t[e] ? 1 : -1
            });
        case "function":
            return a ? n.sort(function(t, a) {
                return e(a) == e(t) ? 0 : e(a) > e(t) ? 1 : -1
            }) : n.sort(function(t, a) {
                return e(a) == e(t) ? 0 : e(a) < e(t) ? 1 : -1
            });
        default:
            return "boolean" == typeof e && (a = e),
            a ? n.sort(function(t, e) {
                return t == e ? 0 : e > t ? 1 : -1
            }) : n.sort()
        }
    }
    ,
    t.timer = {
        duration: {},
        start: function() {
            var e = t.uuid();
            return this.duration[e] = new Date,
            e
        },
        output: function(t) {
            return this.duration[t] ? new Date - this.duration[t] : ""
        },
        stop: function(t) {
            if (this.duration[t]) {
                var e = new Date - this.duration[t];
                return delete this.duration[t],
                e
            }
        }
    },
    t.getElementById = function(t, e) {
        return "string" == typeof t ? (e || window).document.getElementById(t) : t
    }
    ,
    t.getElementsByName = function(t, e) {
        return "string" == typeof t ? (e || window).document.getElementsByName(t) : t
    }
    ,
    t.getElementsByTagName = function(t, e) {
        return "string" == typeof t ? (e || window).document.getElementsByTagName(t) : t
    }
    ,
    t.go = function(t, e) {
        (e || window).location.href = t
    }
    ,
    t.getDom = function(e) {
        var n = t.getElementById(e);
        return n ? n instanceof jQuery ? n.get() : n : a
    }
    ,
    t.getInputsArray = function(n, i) {
        "boolean" == typeof n && (i = n,
        n = a);
        var o = i ? "" : ":enabled"
          , r = n === a ? e(":input[name]" + o + ":not(.fixtable-body :input,.datalist-editor-dialog :input)") : e(t.getDom(n)).find(":hidden[name],:input[name]" + o)
          , s = [];
        return r.each(function() {
            if (e.inArray(this.type, ["text", "hidden", "textarea", "select-one", "password"]) >= 0 || e.inArray(this.type, ["checkbox", "radio"]) >= 0 && this.checked)
                s.push({
                    name: this.name,
                    value: this.value
                });
            else if ("select-multiple" === this.type)
                for (var t = 0; t < this.options.length; t++)
                    this.options[t].selected && s.push({
                        name: this.name,
                        value: this.options[t].value
                    })
        }),
        s
    }
    ,
    t.getInputs = function(n, i) {
        var o = {};
        return e.each(t.getInputsArray(n, i), function(t, e) {
            o[e.name] === a ? o[e.name] = e.value : o[e.name] += "," + e.value
        }),
        o
    }
    ,
    t.ajax = function(i, o, r, s) {
        s = e.extend({
            url: i,
            async: !0,
            method: "POST",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            timeout: 18e5,
            cache: !1,
            silent: !1
        }, s);
        var l = {
            timeout: "读取服务器响应数据超时",
            error: "网络或服务器异常导致请求发送失败，请重试",
            abort: "请求操作已中止，请重试",
            parsererror: "服务器返回的数据格式不正确，浏览器无法解析"
        }
          , d = e.Deferred();
        return s = e.extend(s, {
            data: "application/json" === s.contentType ? JSON.stringify(o) : o,
            error: function(e, a, i) {
                var o = (l[a] || a) + "\n" + i;
                s.handleError ? (s.ajaxContainer && n(s.ajaxContainer, "hide"),
                s.handleError(null, "YDP03001", o),
                d.reject(a)) : s.silent ? (s.ajaxContainer && n(s.ajaxContainer, "hide"),
                d.reject(a)) : s.ajaxContainer ? (n(s.ajaxContainer, "error", '<div class="ajax-cover-text1">网络或服务器异常导致请求发送失败</div><div class="ajax-cover-text2">请重新尝试</div><div class="ajax-cover-text3 hide">Method Not Allowed</div>'),
                d.reject(a)) : t.alert({
                    message: "对不起，系统出错了！",
                    desc: (l[a] || a) + "\n\n" + i
                }, function() {
                    d.reject(a)
                })
            },
            success: function(e, i, o) {
                e.returnCode && 0 != e.returnCode ? "TIMEOUT" == e.returnCode ? s.ajaxContainer ? (n(s.ajaxContainer, "error", e.message ? e.message : "登录超时，请重新登录！"),
                d.reject(e.message, e.returnCode, e)) : t.alert(e.message ? {
                    message: "提示信息",
                    desc: e.message
                } : "登录超时，请重新登录！", function() {
                    d.reject(e.message, e.returnCode, e)
                }) : s.handleError ? (s.ajaxContainer && n(s.ajaxContainer, "hide"),
                s.handleError(e, e.returnCode, e.message),
                d.reject(e.message, e.returnCode, e)) : !s.silent && e.message !== a && e.message.length > 0 ? s.ajaxContainer ? (n(s.ajaxContainer, "error", e.message),
                d.reject(e.message, e.returnCode, e)) : t.alert({
                    message: "提示信息",
                    desc: (s.errorCode && s.errorCode[e.returnCode] !== a ? s.errorCode[e.returnCode] : e.message) || "",
                    code: e.returnCode
                }, function() {
                    d.reject(e.message, e.returnCode, e)
                }) : (s.ajaxContainer && n(s.ajaxContainer, "hide"),
                d.reject(e.message, e.returnCode, e)) : (s.ajaxContainer && n(s.ajaxContainer, "hide"),
                r && r(e.data ? e.data : e, e),
                d.resolve(e))
            }
        }),
        s.ajaxContainer && n(s.ajaxContainer),
        e.ajax(s),
        d.promise()
    }
    ,
    t.createOptions = function(t, e, a, n) {
        return i(t, e, a, function(t) {
            return t == n
        }, function(t, e, a) {
            return '<option value="' + t + '"' + (a ? ' selected="selected"' : "") + ">" + e + "</option>"
        })
    }
    ,
    t.createRadios = function(t, e, a, n, o, r) {
        return n || (n = ""),
        i(t, e, a, function(t) {
            return t == n
        }, function(t, e, a, n) {
            var i = a ? ' checked="checked"' : "";
            return r ? '<div class="radio"><label><input type="radio" id="' + o + ":" + n + '" name="' + o + '" value="' + t + '"' + i + " />" + e + "</label></div>" : '<label class="radio-inline"><input type="radio" id="' + o + ":" + n + '" name="' + o + '" value="' + t + '"' + i + " />" + e + "</label>"
        })
    }
    ,
    t.createCheckboxes = function(t, a, n, o, r, s) {
        return o || (o = ""),
        o = o.split(","),
        i(t, a, n, function(t) {
            return e.inArray(t, o) >= 0
        }, function(t, e, a, n) {
            var i = a ? ' checked="checked"' : ""
              , o = r ? ' id="' + r + ":" + n + '" name="' + r + '"' : "";
            return s ? '<div class="checkbox"><label><input type="checkbox"' + o + ' value="' + t + '"' + i + " />" + e + "</label></div>" : '<label class="checkbox-inline"><input type="checkbox"' + o + ' value="' + t + '"' + i + " />" + e + "</label>"
        })
    }
    ,
    t.selectByValue = function(n, i) {
        if (!n)
            return -1;
        if (n = t.getDom(n),
        i = i ? ("" + i).trimRight() : "",
        n instanceof Array) {
            for (var o = -1, r = 0; r < n.length; r++)
                o = t.selectByValue(n[r], i);
            return o
        }
        if (n.tagName && "SELECT" == n.tagName) {
            for (var s = -1, l = n.options, r = 0, d = l.length; r < d; r++)
                if (l[r].value !== a && l[r].value.trimRight() == i) {
                    l[r].selected = !0,
                    s = r;
                    var c = e(n).prev().find("input.combobox");
                    c.length > 0 && (c.val(e(l[r]).text()),
                    e(n).prev().find("input[type=hidden]").val(l[r].value));
                    break
                }
            return s == -1 && lo("ydl.selectByValue：列表" + (n.id || "") + '中未找到值"' + i + '"', "orange"),
            s
        }
        if (n.type && "hidden" === n.type) {
            var u = e(n).parent();
            return u.hasClass("combobox-container") ? t.selectByValue(u.next(), i) : ll("ydl.selectByValue出错：指定的对象不是select", -1)
        }
        return ll("ydl.selectByValue出错：指定的对象不是select", -1)
    }
    ,
    t.string = function(t, e) {
        return new Array(parseInt(e) + 1).join(" ").replace(/ /g, t)
    }
    ,
    e.fn.getCell = function(a, n) {
        try {
            if ("TR" === this[0].tagName) {
                var i;
                if ("string" == typeof a) {
                    var o = this.closest("table").find("thead tr:last")
                      , r = o.find("th._" + a).index();
                    if (!(r >= 0))
                        return null;
                    i = this.find("td:eq(" + r + ")")
                } else
                    i = e(this[0].cells[a]);
                return n ? i.find(n) : i
            }
            return t.log("$.fn.getCell出错：该方法只能针对表格行使用", "red"),
            null
        } catch (s) {
            return t.log("$.fn.getCell出错：" + t.error(s), "red"),
            null
        }
    }
    ,
    e.fn.addButton = function(t, a, n) {
        var i, o, r;
        e.isPlainObject(n) ? (i = n.id,
        o = n.icon ? '<span class="glyphicon glyphicon-' + n.icon + '"></span> ' : "",
        r = n.theme || "default") : (i = n,
        o = "",
        r = "default");
        var s = this.length > 1 || !i ? "" : ' id="' + i + '"';
        return this.each(function() {
            var n = e(this);
            if (n.hasClass("datalist-table-body"))
                e('<button class="btn btn-' + r + '" type="button"' + s + ">" + o + t + "</button>").click(function() {
                    e.isFunction(a) && a.call(n[0], n[0])
                }).prependTo(n.closest(".fixtable-box").prev().children("div"));
            else if (n.hasClass("ydpx-container"))
                0 === n.children(".panel-heading").children(".btn-group").length && n.children(".panel-heading").append('<div class="ydpx-container-buttons btn-group btn-group-sm pull-right"></div>'),
                e('<button class="btn btn-' + r + '" type="button"' + s + ">" + o + t + "</button>").click(function() {
                    e.isFunction(a) && a.call(n[0], n[0])
                }).prependTo(n.children(".panel-heading").children(".btn-group"));
            else {
                var i = e('<button class="btn btn-' + r + ' btn-sm" type="button"' + s + ">" + o + t + "</button>").click(function() {
                    e.isFunction(a) && a.call(n[0], n[0])
                }).wrap('<span class="input-group-btn"></span>').parent()
                  , l = n.parent();
                l.hasClass("input-group") || (l = l.children().wrapAll('<div class="input-group input-group-sm"></div>').parent()),
                l.append(i)
            }
        }),
        this
    }
    ,
    t.getMember = function(a) {
        var n = e.type(a);
        if ("object" == n || "array" == n) {
            if (a.nodeType || e.isWindow(a))
                return String(a);
            var i = arguments.length > 1 ? ++arguments[1] : 1;
            if (i > 10)
                return "...";
            var o = "    "
              , r = t.string(o, i - 1)
              , s = "";
            if ("array" === n) {
                for (var l = 0, d = a.length; l < d; l++)
                    s += o + r + l + ": " + t.getMember(a[l], i) + "\n";
                return "[\n" + s + r + "]"
            }
            for (var c in a)
                s += o + r + c + ": " + t.getMember(a[c], i) + "\n";
            return "{\n" + s + r + "}"
        }
        if (e.isFunction(a)) {
            var u = String(a);
            return u.substring(0, u.indexOf("{")) + "{...}"
        }
        return "string" === n ? '"' + a + '"' : String(a)
    }
    ,
    t.log = function(t) {
        return window.console && console.log(t),
        t
    }
    ,
    t.localData = function(t, e, n) {
        if (window.localStorage && window.sessionStorage)
            return null === e ? (n ? window.sessionStorage.removeItem(t) : window.localStorage.removeItem(t),
            null) : e === a ? n ? window.sessionStorage.getItem(t) : window.localStorage.getItem(t) : (n ? window.sessionStorage.setItem(t, e) : window.localStorage.setItem(t, e),
            e);
        var i = top.document.documentElement;
        return i.addBehavior("#default#userdata"),
        null === e ? (i.removeAttribute("value"),
        i.save(t),
        null) : e === a ? (i.load(t),
        i.getAttribute("value")) : (i.setAttribute("value", e),
        i.save(t),
        e)
    }
    ,
    t.sessionData = function(e, a) {
        return t.localData(e, a, !0)
    }
    ,
    t.getStyle = function(t, e) {
        var a;
        return a = t.currentStyle ? t.currentStyle : document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(t, "") : t.style,
        e ? a[e] : a
    }
    ,
    t.addComma = function(t) {
        return t += "",
        t.indexOf(",") == -1 ? t.split("").reverse().join("").replace(/(\d{3})(?!\d*\.\d+)/g, "$1,").split("").reverse().join("").replace(/^(-?),/, "$1") : t
    }
    ,
    t.delComma = function(t) {
        return (t + "").replace(/,/g, "")
    }
    ,
    t.capitalMoney = function(e, n) {
        if ("" === e)
            return "";
        if (e = "number" == typeof e ? e.toFixed(2) : parseFloat(t.delComma(e.replace(/￥/g, ""))).toFixed(2),
        e = e.replace(".", ""),
        "000" == e)
            return "零元整";
        for (var i = "零壹贰叁肆伍陆柒捌玖", o = "分角元拾佰仟万拾佰仟亿拾佰仟万拾佰仟", r = "", s = 0; s < e.length; s++)
            r += i.substr(e.substr(s, 1) - "0", 1) + o.substr(e.length - s - 1, 1);
        if (n || n === a) {
            var l = function(t) {
                return t.replace("零亿", "亿").replace("零万", "万").replace("零仟", "零").replace("零佰", "零").replace("零拾", "零")
            }
              , d = function(t) {
                for (; t.indexOf("零零") >= 0; )
                    t = t.replace("零零", "零");
                return t
            };
            r = l(d(l(r.replace("零角", "零").replace("零分", "零")))),
            r = d(l(r.replace("亿万", "亿零").replace("零万", "零"))).replace("零元", "元"),
            "零" == r.charAt(r.length - 1) && (r = r.substr(0, r.length - 1) + "整")
        }
        return r
    }
    ,
    t.getCheckedRadio = function(t) {
        for (var a = "string" == typeof t ? document.getElementsByName(t) : t instanceof jQuery ? t.get() : t, n = 0; n < a.length; n++)
            if (a[n].checked)
                return {
                    index: n,
                    value: a[n].value,
                    text: e(a[n]).parent().text()
                };
        return {
            index: -1,
            value: "",
            text: ""
        }
    }
    ,
    t.getCheckedCheckbox = function(t) {
        for (var a = "string" == typeof t ? document.getElementsByName(t) : t instanceof jQuery ? t.get() : t, n = [], i = 0; i < a.length; i++)
            a[i].checked && n.push({
                index: i,
                value: a[i].value,
                text: e(a[i]).parent().text()
            });
        return n
    }
    ,
    t.setCheckedCheckbox = function(t, a) {
        "string" == typeof a && (a = a.split(","));
        var n = [];
        return e("input[name=" + t + "]").each(function() {
            e.inArray(this.value, a) >= 0 ? (this.checked = !0,
            n.push(this)) : this.checked = !1
        }),
        n
    }
    ,
    t.setCheckedRadio = function(t, e) {
        for (var a = document.getElementsByName(t), n = 0; n < a.length; n++) {
            var i = a[n];
            if (i.value == e)
                return i.checked = !0,
                i
        }
        return null
    }
    ,
    t.getSelectTextByValue = function(a, n) {
        return a = t.getDom(a),
        a ? e('option[value="' + n + '"]', a).text().trim() || n : n
    }
    ,
    t.selectByText = function(a, n) {
        if (a = t.getDom(a),
        a instanceof Array) {
            for (var i = -1, o = 0; o < a.length; o++)
                i = arguments.callee(a[o], n);
            return i
        }
        if (a.tagName && "SELECT" == a.tagName) {
            var r = -1
              , s = a.options;
            n = n ? ("" + n).trimRight() : "";
            for (var o = 0, l = s.length; o < l; o++)
                if (e(s[o]).text().trimRight() == n) {
                    s[o].selected = !0,
                    r = o;
                    var d = e(a).next();
                    d.is(".ui-autocomplete-input") && d.val(e(s[o]).text());
                    break
                }
            return r == -1 && t.log("ydl.selectByText：列表" + (a.id || "") + '中未找到文本"' + n + '"', "orange"),
            r
        }
        t.log("ydl.selectByText出错：指定的对象不是select", "red")
    }
    ,
    e.fn.selectByText = function(e) {
        return t.selectByText(this, e),
        this
    }
    ,
    t.attr = function(n, i, o) {
        var r = t.getDom(n);
        if (r || "string" != typeof n || (r = $n(n)),
        !r)
            return t.log("ydl.attr出错：找不到指定的表单对象", "red"),
            null;
        if (1 != r.length || r instanceof HTMLSelectElement) {
            if (r.length > 1 && !(r instanceof HTMLSelectElement))
                return e.each(r, function() {
                    t.attr(this, i, o)
                }),
                r
        } else
            r = r[0];
        "array" === e.type(r) && 1 === r.length && (r = r[0]),
        i = i.toLowerCase(),
        o = o || o === a;
        var s = r.tagName.toLowerCase()
          , l = r.type
          , d = e(r)
          , c = d.closest("table").hasClass("datalist-table-body")
          , u = o ? "addClass" : "removeClass";
        "input" === s || "textarea" === s ? "radio" === l || "checkbox" === l ? "readonly" === i || "disabled" === i ? d.closest(".multivalue").find(":input").prop("disabled", o) : "hidden" === i ? ((c ? d.closest("td").children() : d.closest(".col"))[u]("hide"),
        o || c || d.closest(".input-group").removeClass("hide"),
        r.id && e("label[for=" + r.id.replace(/:/g, "\\:") + "],label[for=" + r.id.replace(/:.+/, "") + "]")[u]("hide")) : "required" === i && (d.closest(".multivalue").data("required", o),
        c || d.closest(".col")[u]("star")) : "readonly" === i || "disabled" === i ? (r.readOnly = o,
        d.hasClass("date") && d.datepicker(),
        d.hasClass("money") && (d.next()[0].readOnly = o)) : "hidden" === i ? ((c ? d.closest("td").children() : d.closest(".col"))[u]("hide"),
        o || c || d.closest(".input-group").addBack().removeClass("hide"),
        r.id && e("label[for=" + r.id.replace(/:/g, "\\:") + "]")[u]("hide"),
        d.hasClass("money") && d.next()[u]("hide")) : "required" === i && (c || d.closest(".col")[u]("star"),
        d.attr("required", o)) : "select" === s ? "readonly" === i || "disabled" === i ? (r.disabled = o,
        d.hasClass("combobox") && d.combobox(o ? "disable" : "enable")) : "hidden" === i ? ((c ? d.closest("td").children() : d.closest(".col"))[u]("hide"),
        o || c || d.closest(".input-group").addBack().removeClass("hide"),
        r.id && e("label[for=" + r.id.replace(/:/g, "\\:") + "]")[u]("hide")) : "required" === i && (c || d.closest(".col")[u]("star"),
        d.attr("required", o)) : "button" === s && ("readonly" === i || "disabled" === i ? window.pageData && pageData.buttonAccess && pageData.buttonAccess[r.id] && !pageData.buttonAccess[r.id].access ? r.disabled = !0 : r.disabled = o : "hidden" === i && d[u]("hide")),
        "required" !== i || o || (t.validator.clear(d.closest(".multivalue")),
        t.validator.clear(d))
    }
    ,
    t.removeAttr = function(e, a) {
        return t.attr(e, a, !1)
    }
    ,
    t.getLabel = function(n, i) {
        var o = ""
          , r = t.getDom(n);
        if (r === a)
            return document.getElementsByName(n).length > 0 && (o = e("label[for=" + n + "]").text()),
            o.replace(/[:：]$/g, "") || i || "";
        if (r instanceof Array && 0 == r.length)
            return i || "";
        r instanceof Array && (r = r[0]),
        i = i || r.id || "";
        var s = r.parentNode;
        if ("TD" == s.tagName && e(s).closest("table").hasClass("datalist-table-body"))
            try {
                var l = e(s.parentNode);
                o = l.closest("table").find("thead>tr:first").children(":eq(" + l.children().index(s) + ")").text().trim().replace(/\*$/, "")
            } catch (d) {
                t.log("ydl.getLabel出错：获取标签失败" + t.error(d), "red"),
                o = ""
            }
        else
            o = e(r).is("fieldset") ? e('label[for="' + r.id.replace(/:/g, "\\:").replace("group_", "") + '"]').text() : e('label[for="' + r.id.replace(/:/g, "\\:") + '"]').text();
        return "" == o ? i : o.replace(/[:：]$/g, "")
    }
    ,
    t.getValue = function(a, n, i) {
        if ("boolean" == typeof n) {
            var o = n;
            n = i,
            i = o
        }
        var r, s = t.getDom(a);
        if (s instanceof Array && (s = s[0]),
        s)
            r = "select-one" === s.type || "select-multiple" === s.type ? e("option:selected", s).map(function() {
                if (i) {
                    var t = this.innerHTML.trim();
                    return "" === this.value && "请选择..." === t ? "" : t
                }
                return this.value
            }).get().join(",") : i && e(s).hasClass("money") ? e(s).next(".money-display").val() : s.value;
        else if ("string" == typeof a) {
            var l = e("#group_" + a);
            if (l.hasClass("multivalue")) {
                var d = e("[name=" + a + "]:checked");
                r = d.map(function() {
                    return i ? e(this).parent("label").text() : this.value
                }).get().join(",")
            }
        }
        return r || n || ""
    }
    ,
    t.setValue = function(a, n) {
        var i = t.getDom(a);
        return !i && "string" == typeof a && e("#group_" + a).hasClass("multivalue") && (i = document.getElementsByName(a)),
        e(i).filter(":input:not(button)").each(function(a, i) {
            var o = e(i);
            if (o.closest("table").hasClass("ydpx-datalist")) {
                i.value = n;
                var r = n
                  , s = o.parent();
                s.hasClass("money") && (r = parseFloat(n),
                r = isNaN(r) ? "" : t.addComma(r.toFixed(o.data("declen") || 2)),
                o.next().val(r)),
                "hidden" === i.type && s.children("span").text(r)
            } else {
                var l = o.data("yd-widget");
                if (l && o[l]("hasMethod", "setValue"))
                    o[l]("setValue", n);
                else if ("radio" === i.type || "checkbox" === i.type)
                    i.checked = e.inArray(i.value, n.split(",")) != -1;
                else if (o.hasClass("money")) {
                    var r = parseFloat(n);
                    r = isNaN(r) ? "" : t.addComma(parseFloat(n).toFixed(o.data("declen") || 2)),
                    o.val(n).next().val(r)
                } else
                    o.hasClass("combobox") || o.parent().hasClass("combobox-container") ? t.selectByValue(i, n) : o.val(n)
            }
        }),
        i
    }
    ,
    e.fn.setValue = function(e) {
        return t.setValue(this, e),
        this
    }
    ,
    t.setHighlight = function(a, n) {
        var i = t.getDom(a);
        !i && "string" == typeof a && e("#group_" + a).hasClass("multivalue") && (i = document.getElementsByName(a)),
        e(i).filter(":input").each(function(t, a) {
            var i = e(a);
            if ("BUTTON" == a.tagName)
                i.toggleClass("btn-highlight", 0 != n);
            else {
                var o = i;
                "radio" === a.type || "checkbox" === a.type ? o = i.closest("fieldset") : (i.hasClass("money") || i.hasClass("combobox") || i.parent().hasClass("combobox-container")) && (o = i.parent()),
                o.toggleClass("highlight", 0 != n)
            }
        })
    }
    ,
    t.arr2obj = function(t, a, n) {
        var i = {};
        if (e.isFunction(n))
            for (var o = 0; o < t.length; o++)
                i[t[o][a] || o] = n(t[o], o);
        else
            for (var o = 0; o < t.length; o++)
                i[t[o][a] || o] = t[o][n];
        return i
    }
    ,
    t.obj2arr = function(t, e, n) {
        e === a && (e = "key"),
        n === a && (n = "value");
        var i = [];
        for (var o in t) {
            var r = {};
            r[e] = o,
            r[n] = t[o],
            i.push(r)
        }
        return i
    }
    ,
    t.arr2arr = function(t, n) {
        n === a && (n = "value");
        var i = [];
        if (e.isFunction(n))
            for (var o = 0; o < t.length; o++)
                i.push(n(t[o], o));
        else
            for (var o = 0; o < t.length; o++)
                i.push(t[o][n]);
        return i
    }
    ,
    t.deferred = function(t) {
        for (var a = e.isArray(t) ? t : arguments, n = [], i = 0; i < a.length; i++) {
            var o = a[i];
            if (e.isFunction(o.promise))
                n.push(o);
            else if (e.isFunction(o)) {
                var r = o();
                r ? n.push(e.Deferred().resolve()) : n.push(e.Deferred().reject())
            } else
                "boolean" == typeof o ? o ? n.push(e.Deferred().resolve()) : n.push(e.Deferred().reject()) : n.push(e.Deferred().resolve())
        }
        return e.when.apply(null, n)
    }
    ,
    e.fn.buttonText = function(t) {
        return this.each(function() {
            var a = e(this);
            if (a.is("button")) {
                var n = a.html();
                n = n.replace(/^(<span.+?<\/span>)?.+?(<span.+?<\/span>)?$/, "$1" + t + "$2"),
                a.html(n)
            }
        })
    }
    ,
    t.error = function(e, a) {
        if ("string" == typeof e)
            return e;
        switch (a = a || "message",
        a.toLowerCase()) {
        case "message":
            return e.message || e.description;
        case "all":
            return t.getMember(e);
        default:
            return e[a]
        }
    }
    ,
    t.render = function(t, e) {
        if (!t)
            return "";
        "object" != typeof e && (e = Array.prototype.slice.call(arguments, 1));
        var a = 0;
        return t.replace(/\$?\$\{(.*?)\}/g, function(t, n) {
            return 0 === t.indexOf("$$") ? t.substr(1) : e["" === n ? a++ : n] || ""
        })
    }
    ,
    t.idCardInfo = function(e) {
        if (!e)
            return null;
        if (!t.validator.get("idcard")(e, {
            type: "idcard"
        }))
            return null;
        var a = 18 == e.length ? e.substr(6, 4) : "19" + e.substr(6, 2)
          , n = e.substr(18 == e.length ? 10 : 8, 2)
          , i = e.substr(18 == e.length ? 12 : 10, 2)
          , o = a + "-" + n + "-" + i
          , r = window.poolSelect && poolSelect.CURRENT_SYSTEM_DATE || t.today()
          , s = t.dateDiff(o, r, "y");
        t.dateDiff(t.dateAdd(o, s, "y"), r, "d") < 0 && s--;
        var l = {
            birthdate: o,
            age: s,
            sex: parseInt(e.substr(18 == e.length ? 16 : 14, 1)) % 2 == 0 ? 2 : 1
        };
        return l
    }
    ,
    e.fn.bgiframe = /Trident/.test(navigator.userAgent) ? function(t) {
        function a(t) {
            return t && t.constructor === Number ? t + "px" : t
        }
        t = e.extend({
            top: "auto",
            left: "auto",
            width: "auto",
            height: "auto",
            opacity: !0,
            src: "about:blank"
        }, t);
        var n = '<iframe class="bgiframe" frameborder="0" tabindex="-1" src="' + t.src + '"style="display:block; position:absolute; z-index:-1;' + (t.opacity !== !1 ? "filter:Alpha(Opacity='0');" : "") + "top:" + ("auto" == t.top ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth) || 0) * -1) + 'px')" : a(t.top)) + ";left:" + ("auto" == t.left ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth) || 0) * -1) + 'px')" : a(t.left)) + ";width:" + ("auto" == t.width ? "100%" : a(t.width)) + ";height:" + ("auto" == t.height ? "100%" : a(t.height)) + ';"/>';
        return this.each(function() {
            e(this).prepend(n)
        })
    }
    : function() {
        return this
    }
}(ydl, jQuery);
var $$ = ydl.getElementById
  , $n = ydl.getElementsByName
  , $t = ydl.getElementsByTagName
  , lo = ydl.log
  , lm = function(t) {
    return ydl.log(ydl.getMember(t)),
    t
}
  , ll = function(t, e) {
    return ydl.log(t + ": " + ydl.getMember(e)),
    e
};
!function(t) {
    t.textResources = {},
    t.textResources.data = {
        "flow.submit.confirm.disagree": "请确认是否要拒绝以上内容？",
        "flow.submit.confirm.cancel": "请确认是否要撤销此笔业务？",
        "flow.submit.confirm.continue": "请确认是否要继续提交此笔业务？",
        "flow.submit.confirm.def": "请确认是否同意以上内容并继续提交？",
        "datalist.buttons.add": "添加",
        "datalist.buttons.delete": "删除",
        "datalist.buttons.delall": "清空",
        "datalist.buttons.save": "保存",
        "datalist.buttons.refresh": "刷新",
        "datalist.buttons.import": "导入",
        "datalist.buttons.export": "导出",
        "datalist.buttons.print": "打印",
        "datalist.buttons.batch.basic": "原始数据",
        "datalist.buttons.batch.error": "批量错误",
        "datalist.buttons.batch.export": "导出错误数据"
    },
    t.textResources.set = function(e, a, n) {
        n ? t.textResources.data[e] = a : (t.textResources.diyData || (t.textResources.diyData = {}),
        t.textResources.diyData[e] = a)
    }
    ,
    t.textResources.get = function(e) {
        return t.textResources.diyData && t.textResources.diyData[e] ? t.textResources.diyData[e] : t.textResources.data[e]
    }
}(window.ydl ? ydl : window.ydl = {}),
function(t, e) {
    function a(a) {
        if (t.common.isIe) {
            var n, i, o, r = pageData.poolSelect.$page;
            if (r && /\/frameset$/.test(r) && "/ish" == pageData.contexPath) {
                if (o = e("#printDiv", e("#mainWrap .tab-pane.active iframe")[0].contentWindow.document),
                0 == o.length)
                    return;
                n = o.children("iframe")[0].contentWindow.document.getElementsByTagName("object"),
                i = e("object", o.children("iframe")[0].contentWindow.document),
                e(".layui-layer-shade:eq(-1) .bgiframe").length < 1 && (e(".layui-layer-shade").bgiframe(),
                e(".bgiframe").css({
                    "z-index": "0"
                }).css({
                    "z-index": "-1"
                }))
            } else
                n = document.getElementsByTagName("object"),
                i = e("object"),
                o = e("#printDiv");
            if (0 == n.length && 0 == o.length)
                return;
            o.length > 0 && (i = o),
            0 == a && 0 == i.closest(".modal").length ? i.hide().addClass("hide") : 0 == e(".layui-layer.modal:visible:not(.layui-layer-loading)").length && i.show().removeClass("hide")
        }
    }
    t.dialog = {},
    layer.config({
        skin: "modal",
        zIndex: 1050
    }),
    t.dialog.open = function(t, a, n, i) {
        i || (i = {});
        var o = e("<div></div>")
          , r = e.extend(i, {
            type: 2,
            autoOpen: !0,
            content: t,
            close: !0,
            shown: function(t, e) {
                i.open && i.open();
                var a = "";
                if (i.title)
                    a = i.title;
                else {
                    var n = window[t.find("iframe")[0].name];
                    a = n.document.title
                }
                o.dialog("option", "title", a)
            },
            hidden: function() {
                try {
                    delete window.modalDialogArguments
                } catch (t) {
                    window.modalDialogArguments = null
                }
                var e = o.data("callbackArguments");
                n && n.apply(this, e),
                o.dialog("destroy")
            }
        });
        o.dialog(r),
        window.modalDialogArguments = {
            dialogArgs: a,
            dialogHandler: o,
            dialogCallback: n
        }
    }
    ,
    t.dialog.arguments = function() {
        return parent.modalDialogArguments.dialogArgs
    }
    ,
    t.dialog.close = function() {
        var t = parent.modalDialogArguments;
        t ? (t.dialogHandler.data("callbackArguments", arguments),
        t.dialogHandler.dialog("close")) : (top.close(),
        parent.dialogArguments.dialogCallback && parent.dialogArguments.dialogCallback.apply(this, arguments))
    }
    ,
    t.makeDialog = function(t, a) {
        var t = e.map(t.split(","), function(t) {
            return "#" + t.trim()
        }).join(",");
        return a = e.extend({
            title: "对话框",
            size: "lg",
            autoOpen: !1,
            modal: !0
        }, a || {}),
        e("<div></div>").append(e(t)).dialog(a)
    }
    ,
    t.detailDialog = function(t) {
        t || (t = {});
        var a = ""
          , n = '<span class="yd-icon ' + (t.icon || "info") + '"></span>'
          , i = '<h2 class="' + ("pay" == t.icon || "ask" == t.icon || "common" == t.icon ? "" : "yd-message") + '">' + (t.message || "") + "</h2>"
          , o = t.desc ? t.desc : ""
          , r = "";
        return t.list && !e.isEmptyObject(t.list) && (r += '<table class="table table-hover table-bordered yd-list">' + (t.list.title ? "<caption>" + t.list.title + "</caption>" : "") + "<thead><tr>",
        e.each(t.list.head || [], function(t, e) {
            r += "string" == typeof e ? "<th><label>" + e + "</label></th>" : '<th data-id="' + e.id + '"><label>' + e.text + "</label></th>"
        }),
        r += "</tr></thead><tbody>",
        e.each(t.list.body || [], function(a, n) {
            r += "<tr>",
            e.isPlainObject(n) ? e.each(t.list.head || [], function(t, e) {
                r += '<td data-id="' + e.id + '">' + n[e.id] + "</td>"
            }) : e.each(n, function(t, e) {
                r += "<td>" + e + "</td>"
            }),
            r += "</tr>"
        }),
        r += "</tbody></table>"),
        a = t.html && t.html.length > 0 ? t.html : '<div class="yd-detail-dialog">' + n + i + (o ? '<div class="yd-desc">' + o + "</div>" : "") + r + "</div>"
    }
    ,
    t.customDialog = function(a) {
        a = e.extend({
            buttons: a.buttons || [{
                text: "确定",
                theme: "primary",
                value: 0
            }, {
                text: "取消",
                value: 1
            }]
        }, a || {});
        var n = e(t.detailDialog({
            html: a.html || "",
            message: a.message || a.title,
            desc: a.desc || a.text,
            icon: a.icon || "",
            size: a.size || "",
            list: a.list || {}
        }))
          , i = a.title || !1;
        a = e.extend(a, {
            autoOpen: !0,
            close: !1,
            title: !1
        }),
        a.html && (a.title = i),
        a.shown = function(t) {
            e.isFunction(a.open) && a.open.call(t, t.find(".layui-layer-content")),
            a.focus !== !1 && t.find(".layui-layer-btn a:eq(" + (a.focus || 0) + ")").focus()
        }
        ;
        var o = a.hidden || !1;
        a.hidden = function(t) {
            o && o(),
            e(t).remove()
        }
        ,
        n.appendTo("body").dialog(a)
    }
    ,
    t.alert = function(a, n) {
        var i = ""
          , o = ""
          , r = "";
        "string" == typeof a || "number" == typeof a ? (r = "info",
        i = a) : (r = a.icon || (void 0 !== a.code ? "error" : "info"),
        i = a.message || "",
        o = (a.code ? "<b>错误码：</b>" + a.code + "<br>" : "") + (a.desc ? "<b>详细信息：</b>" + a.desc : ""));
        var s = 0 != a.copy ? "复制信息,确定" : "确定";
        t.customDialog({
            shade: void 0 != a.shade ? a.shade : .3,
            title: !1,
            width: a.width || !1,
            height: a.height || !1,
            close: !1,
            spaceClose: !0,
            text: "",
            message: i,
            desc: o,
            icon: r,
            buttons: s,
            closeBtn: 1,
            focus: 0 != a.copy ? 1 : 0,
            callback: function(t) {
                if (0 != a.copy && 0 == t)
                    return !1
            },
            hidden: function() {
                e.isFunction(n) && n()
            },
            open: function(n) {
                if (a.open && a.open(n),
                0 != a.copy) {
                    var i = [];
                    i.push("标题：" + n.find("h2").text()),
                    e.each(n.find("p"), function() {
                        i.push(e(this).text())
                    }),
                    window.poolSelect && poolSelect._OPERID && poolSelect._OPERNAME && i.push("操作人：" + poolSelect._OPERID + "-" + poolSelect._OPERNAME),
                    i.push("操作日期：" + t.formatDate(new Date));
                    var o = e(this).find('.layui-layer-btn a[value="0"]').attr("data-clipboard-text", i.join("\n"))[0];
                    /Trident/.test(navigator.userAgent) && e(o).click(function() {
                        e("<div></div>").dialog("open").dialog("close").remove()
                    }),
                    e.getScript(t.contexPath + "/common/lib/js/clipboard.min.js", function() {
                        new Clipboard(o).on("success", function(t) {
                            e(t.trigger).text("已复制到剪贴板")
                        })
                    })
                }
            },
            shadeClose: void 0 == a.shadeClose || a.shadeClose
        })
    }
    ,
    t.toast = function(e, a, n) {
        return 0 == e ? void layer.close(t.toast.index) : void (a ? (a.icon || (a.skin = "layui-layer-hui"),
        n ? t.toast.index = layer.msg(e, a, n) : t.toast.index = layer.msg(e, a)) : t.toast.index = layer.msg(e, {
            skin: "layui-layer-hui"
        }))
    }
    ,
    t.toolTips = function(e, a, n) {
        n && (a.end = n),
        a.dom = t.getDom(a.dom),
        layer.tips(e, a.dom, a)
    }
    ,
    t.loading = function(a, n, i) {
        if (0 == a)
            layer.close(t.loading.index);
        else if ("close" == a)
            layer.close(n);
        else {
            if (void 0 == n && (n = 0),
            void 0 == i && (i = {}),
            i.dom) {
                var o = e(t.getDom(i.dom))
                  , r = o.offset();
                i.area = [o.width() + "px", o.height() + "px"],
                i.offset = [r.top + "px", r.left + "px"]
            }
            i.success = function(a, n) {
                var o = pageData.poolSelect.$page;
                o && /\/frameset$/.test(o) && "/ish" == pageData.contexPath ? (t.common.isIe && e("#mainWrap .tab-pane.active iframe")[0].contentWindow.$("#printDiv > iframe")[0].contentWindow.document.getElementsByTagName("object").length > 0 && a.find(".layui-layer-content").bgiframe(),
                i.shown && i.shown(a, n)) : (t.common.isIe && document.getElementsByTagName("object").length > 0 && a.find(".layui-layer-content").bgiframe(),
                i.shown && i.shown(a, n))
            }
            ,
            i.end = function() {
                i.hidden && i.hidden()
            }
            ,
            t.loading.index = layer.load(n, i)
        }
    }
    ,
    t.confirm = function(a) {
        var n = "string" == typeof a ? a : a.message
          , i = e.Deferred();
        return t.customDialog(e.extend(a, {
            icon: "ask",
            message: n,
            callback: function(t) {
                0 == t ? i.resolve() : i.reject()
            }
        })),
        i.promise()
    }
    ,
    e.fn.dialog = function(n, i, o) {
        function r(e) {
            var a = {
                12: [360, 650, 900],
                14: [370, 720, 1020],
                16: [380, 790, 1130],
                18: [390, 850, 1200]
            }
              , n = t.userConfig ? t.userConfig.get("base_font_size") || 12 : 12;
            e.area = a[n][1] + "px",
            e.size && ("lg" == e.size ? e.area = a[n][2] + "px" : "sm" == e.size && (e.area = a[n][0] + "px")),
            e.width && (e.area = (e.width + "").indexOf("px") > 0 ? e.width : e.width + "px"),
            e.height && (e.height = (e.height + "").indexOf("px") > 0 ? e.height : e.height + "px",
            e.area = [e.area, e.height])
        }
        if (n && n.dialogVersion || "scroll" == this.data("dialog-func"))
            return this.dialogScroll(n, i, o).data("dialog-func", "scroll");
        var s = this;
        if ("string" == typeof n) {
            var l = this.data("dialog-index");
            if ("open" == n) {
                var d = this.data("dialog-options");
                r(d),
                d.show && d.show(),
                layer.open(d)
            }
            if ("close" == n && layer.close(l),
            "destroy" == n && this.remove(),
            "option" == n) {
                var c = this.data("dialog-options");
                c[i] = o,
                this.data("dialog-options", c),
                "title" == i && layer.title(o, l)
            }
            return "style" == n && layer.style(l, i),
            this
        }
        if (void 0 != this.data("dialog-inited"))
            return this;
        if (e("body").append(this.hide()),
        this.data("dialog-inited", !0),
        n = e.extend({
            title: "对话框",
            type: 1,
            resize: !1,
            content: e(s),
            maxHeight: document.documentElement.clientHeight - 30
        }, n || {}),
        !n.id) {
            var u = e("body").data("dialogIndex") || 1;
            n.id = "_dialog_" + u,
            e("body").data("dialogIndex", parseInt(u) + 1)
        }
        if (n.area || r(n),
        0 == n.close && (n.closeBtn = !1),
        void 0 != n.closeOnEscape && (n.shadeClose = n.closeOnEscape),
        n.closeButton && (n.cancel = function(t, e) {
            var a = n.closeButton(e, t);
            if (0 == a)
                return !1
        }
        ),
        n.end = function() {
            n.hidden && n.hidden(s),
            a();
            var t = s.data("dialog-index");
            n.spaceClose && e(document.documentElement).off("keydown.dialogclose" + t),
            e("body,div").off("scroll.dialogscroll" + t)
        }
        ,
        n.buttons) {
            "string" == typeof n.buttons ? n.buttons = e.map(n.buttons.split(","), function(t, e) {
                return {
                    text: t,
                    value: e
                }
            }) : e.isPlainObject(n.buttons) && (n.buttons = e.map(n.buttons, function(t, e) {
                return {
                    text: e,
                    click: t
                }
            })),
            n.buttons = e.map(n.buttons, function(t, e) {
                return "string" == typeof t ? {
                    text: t,
                    value: e
                } : (void 0 == t.value && (t.value = e),
                t)
            });
            var p = [];
            e.each(n.buttons, function(t, a) {
                p.push(a.text);
                var i = 0 == t ? "yes" : "btn" + (t + 1);
                n[i] = function(i, o) {
                    var r = !0;
                    return e.isFunction(n.callback) && (r = n.callback.call(o, a.value, a.text, o.find(".layui-layer-content"))),
                    a.click && 0 == a.click(i, o) && (r = !1),
                    0 != r && void (0 == t && layer.close(i))
                }
            }),
            n.btn = p
        }
        return n.success = function(i, o) {
            a(!1),
            e("body,div").not(".tips-keep-on-scroll").on("scroll.dialogscroll" + o, function() {
                e(".datetimepicker").hide()
            }),
            n.height && i.addClass("dialog-height"),
            n.buttons && e.each(n.buttons, function(t, e) {
                var a = i.find(".layui-layer-btn a:eq(" + t + ")").attr("href", "#");
                void 0 != e.value && a.attr("value", e.value),
                e.id && a.prop("id", e.id),
                e.theme && a.addClass(e.theme),
                e.icon && a.prepend('<span class="glyphicon glyphicon-' + e.icon + '"></span>')
            }),
            s.data("dialog-index", o),
            n.spaceClose && e(document.documentElement).on("keydown.dialogclose" + o, function(a) {
                e(s).is(":visible") && a.which == t.common.keys.Space && (n.spaceCloseFunc && n.spaceCloseFunc(),
                layer.close(o),
                a.preventDefault())
            }),
            n.shown && n.shown(i, o)
        }
        ,
        n.create && "function" == typeof n.create && n.create(this),
        this.data("dialog-options", n),
        n.autoOpen && (n.show && n.show(),
        layer.open(n)),
        this
    }
    ,
    t.dialog.scroll = function(a) {
        a = e.extend({
            autoOpen: !0,
            close: !0
        }, a || {});
        var n = e(a.html ? "<div>" + a.html + "</div>" : t.getDom(a.content));
        n.show().removeClass("hide");
        var i = n.data("initDom");
        return void 0 != i ? i.dialogScroll("open") : (i = n.dialogScroll(a),
        n.data("initDom", i)),
        i
    }
    ,
    e.fn.dialogScroll = function(t, n, i) {
        var o = this;
        if ("string" == typeof t)
            return "open" == t && this.modal({
                backdrop: this.data("closeOnEscape") || "static",
                keyboard: this.data("closeOnEscape")
            }),
            "close" == t && this.modal("hide"),
            "destroy" == t && this.closest(".modal").remove(),
            "option" == t && "title" == n && this.find("h4.modal-title").html(i),
            this;
        if (void 0 != this.data("dialog-inited"))
            return this;
        e(this).data("dialog-inited", !0),
        t = e.extend({
            title: "对话框"
        }, t || {});
        var r = t.close ? '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">× </button>' : ""
          , s = e('<div class="modal fade" data-backdrop="static" ' + (t.id ? 'id="' + t.id + '"' : "") + 'tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog' + (t.size ? " modal-" + t.size : "") + '"><div class="modal-content"><div class="modal-header">' + r + '<h4 class="modal-title">' + t.title + '</h4></div><div class="modal-body"></div></div></div></div>');
        if (s.find(".modal-body").append(this),
        e("body").append(s),
        s.data("closeOnEscape", t.closeOnEscape || !1),
        t.buttons) {
            var l = e('<div class="modal-footer"></div>');
            e.each(t.buttons, function(t, a) {
                var n = e('<button type="button" class="btn btn-default">' + t + "</button>");
                "function" == typeof a && n.click(function() {
                    a.call(s, o)
                }),
                l.append(n)
            }),
            s.find(".modal-content").append(l)
        }
        return t.create && "function" == typeof t.create && t.create(),
        t.hidden && s.on("hidden.bs.modal", function() {
            a(),
            t.hidden()
        }),
        t.shown && s.on("shown.bs.modal", function() {
            a(!1),
            t.shown()
        }),
        t.hide && s.on("hide.bs.modal", function() {
            t.hide()
        }),
        t.show && s.on("show.bs.modal", function() {
            t.show()
        }),
        t.autoOpen && s.modal({
            backdrop: s.data("closeOnEscape") || "static",
            keyboard: s.data("closeOnEscape")
        }),
        s
    }
    ,
    t.objectShow = a
}(window.ydl ? ydl : window.ydl = {}, jQuery),
function() {
    window.pageTabs = new function() {
        this.length = 0,
        this.count = 0,
        this.pageOnload = $.Callbacks(),
        this.add = function(t, e, a, n, i, o, r, s) {
            function l(t, e) {
                var a = $("#pageTab" + e)
                  , i = a.is(":hidden");
                if (i && a.addClass("show-block"),
                $.isArray(n)) {
                    for (var r = 1; r < n.length; r++)
                        n[r](t[e]);
                    n[0](t[e])
                } else
                    n(t[e]);
                s && (t[e] = $.extend(t[e], s));
                var l = t[e].pageOnload;
                $.isFunction(l) && (o ? (i && a.removeClass("show-block"),
                l()) : t.pageOnload.add(function() {
                    l(),
                    i && a.removeClass("show-block")
                }))
            }
            var d = this.length;
            if (void 0 != r)
                return d = $(a).data("tabid"),
                l(this, d),
                d;
            var c = 0 === d ? " active" : ""
              , u = i ? '<button type="button" class="page-tab-close" data-index="' + d + '">×</button>' : "";
            $("#pageTabs>ul").append('<li class="' + c + '"><a data-toggle="tab" href="#pageTab' + d + '">' + t + "</a>" + u + "</li>");
            var p;
            return a instanceof Element ? p = a : ($('<div class="tab-pane fade' + c + '" data-pageid="' + e + '" data-pagename="' + e + '" data-tabid="' + d + '" id="pageTab' + d + '"></div>').html(a).appendTo($("#pageTabs>div")),
            p = document.getElementById("pageTab" + d)),
            this[d] = {
                dom: p,
                index: d,
                page: e,
                ydpxData: ydpxData[d],
                remove: function() {
                    pageTabs.remove(d)
                },
                hide: function() {
                    pageTabs.hide(d)
                },
                show: function() {
                    pageTabs.show(d)
                },
                open: function() {
                    pageTabs.open(d)
                },
                isHidden: function() {
                    return pageTabs.isHidden(d)
                }
            },
            l(this, d),
            this.count++,
            this.length++,
            $('a[href="#pageTab' + d + '"]').on("show.bs.tab", function(t) {
                return $(p).triggerHandler("tabshow", [t.target, t.relatedTarget]) === !1 ? t.preventDefault() : $("#pageTabs").triggerHandler("tabshow", [t.target, t.relatedTarget]) === !1 ? t.preventDefault() : void 0
            }).on("shown.bs.tab", function(t) {
                $(p).triggerHandler("tabshown", [t.target, t.relatedTarget]) !== !1 && $("#pageTabs").triggerHandler("tabshown", [t.target, t.relatedTarget])
            }).on("hide.bs.tab", function(t) {
                return $(p).triggerHandler("tabhide", [t.target, t.relatedTarget]) === !1 ? t.preventDefault() : $("#pageTabs").triggerHandler("tabhide", [t.target, t.relatedTarget]) === !1 ? t.preventDefault() : void 0
            }).on("hidden.bs.tab", function(t) {
                $(p).find("fieldset").trigger("mouseleave"),
                $(p).triggerHandler("tabhidden", [t.target, t.relatedTarget]) !== !1 && $("#pageTabs").triggerHandler("tabhidden", [t.target, t.relatedTarget])
            }),
            $("#pageTabs").trigger("pageTabs.add"),
            d
        }
        ,
        this.remove = function(t) {
            var e = $('a[href="#pageTab' + t + '"]')
              , a = this;
            ydl.confirm("请确认是否要关闭【" + e.text() + "】？").then(function() {
                var n = e.parent()
                  , i = n.hasClass("active")
                  , o = n.index() > 0 ? n.prev() : n.next();
                if (n.remove(),
                $("#pageTab" + t).remove(),
                a[t] = null,
                a.count--,
                $("#pageTabs").trigger("pageTabs.remove"),
                i && o.length > 0) {
                    var r = o.find("a").attr("href").replace("#pageTab", "");
                    a.open(r)
                }
            })
        }
        ,
        this.hide = function(t) {
            $('a[href="#pageTab' + t + '"]').addClass("hide"),
            $("#pageTab" + t).addClass("hide"),
            $("#pageTabs").trigger("pageTabs.hide")
        }
        ,
        this.show = function(t) {
            $('a[href="#pageTab' + t + '"]').removeClass("hide"),
            $("#pageTab" + t).removeClass("hide"),
            $("#pageTabs").trigger("pageTabs.show")
        }
        ,
        this.open = function(t) {
            $('a[href="#pageTab' + t + '"]').tab("show")
        }
        ,
        this.isHidden = function(t) {
            return $('a[href="#pageTab' + t + '"]').hasClass("hide")
        }
    }
    ,
    $("body").on("click", "#pageTabs .page-tab-close", function() {
        pageTabs[$(this).data("index")].remove()
    }),
    ydl.addPage = function(t, e, a, n, i) {
        $.ajax({
            url: location.protocol + "//" + location.host + ydl.contexPath + "/flow/subpage/" + poolSelect._WF + "/" + t + "/" + poolSelect._POOLKEY + "?callback=?",
            data: e,
            type: "POST",
            dataType: "jsonp",
            jsonp: "callback"
        }).done(function(t) {
            function e(t, e) {
                return ejs.render(t, e, {
                    delimiter: "$"
                })
            }
            function o(t) {
                l.listBody && $.each(l.listBody, function(t, e) {
                    ydl.data.listParameter[t] = null
                }),
                t && $("#pageTabs>.tab-content").append(u);
                var e = pageTabs.add(l.data.page_title, l.pageName, document.getElementById(r), s, a, !0, i, c);
                pageTabs.open(e),
                $.isFunction(n) && n(e)
            }
            var r = "pageTab" + pageTabs.length
              , s = t.ydpxScript()
              , l = t.ydpxData[0]
              , d = e(l.frameHtml, l);
            l.data._render = tpl.renders(l.data),
            d = e(d, l.data);
            var c = {
                page: l.pageName,
                ydpxData: l
            }
              , u = $('<div class="tab-pane ydpx-page fade in" data-tabid="' + pageTabs.length + '" id="' + r + '" data-pageid="' + (i || "") + '" data-pagename="' + l.pageName + '">' + d + "</div>");
            if (void 0 != i) {
                var p = $('#pageTabs>.tab-content >.tab-pane[data-pageid="' + i + '"]');
                p.length > 0 ? (p.html(d),
                r = p.prop("id")) : i = void 0,
                o(void 0 == i)
            } else if ($('#pageTabs>.tab-content >.tab-pane[data-pagename="' + l.pageName + '"]').length > 0) {
                var h = $('#pageTabs>.tab-content >.tab-pane[data-pagename="' + l.pageName + '"]');
                r = h.prop("id"),
                h.html(d),
                i = !0,
                o()
            } else
                o(!0)
        })
    }
}(window.ydl ? ydl : window.ydl = {}),
function(t) {
    function e(e, n, i, r) {
        if (t.data.ajax || (t.data.ajax = {}),
        t.data.ajax[e] = !0,
        o[e] = {
            target: i,
            tab: r
        },
        n) {
            var s;
            document.getElementById(n) ? s = $("#" + n) : document.getElementById("group_" + n) && (s = $('[name="' + n + '"]')),
            s && s.length > 0 && s.change(function() {
                t.checkFieldAttr($(this), !1) && a(e)
            })
        }
    }
    function a(e, a, r) {
        if (!o[e])
            return void t.alert("隐式提交" + e + "未初始化，无法执行！");
        var s = o[e].tab
          , l = s["ajax_before_" + e]
          , d = s["ajax_after_" + e]
          , c = s["ajax_complete_" + e]
          , u = $.extend(t.getInputs(!0), {
            $page: s.page,
            ajax_query_id: e,
            _POOLKEY: poolSelect._POOLKEY || "-"
        });
        if (a && ($.isArray(a) ? $.extend(u, t.arr2obj(a, "name", "value")) : $.isPlainObject(a) && $.extend(u, a)),
        !$.isFunction(l) || l() !== !1) {
            var p = $.Deferred();
            return t.ajax(t.contexPath + "/ydpx/ajax", u, function(t, a) {
                var i = !1;
                if ($.isFunction(d) && d(t, a) === !1 || (n(e, t),
                i = !0),
                $.isFunction(c) && c(i),
                $.isFunction(r)) {
                    var o = r(t, a);
                    void 0 === o || o ? p.resolve(t, a) : p.reject(t)
                } else
                    p.resolve(t, a)
            }, {
                handleError: function(a) {
                    "YDP23000" == a.returnCode && i(e, a),
                    $.isFunction(r) ? r(null) ? p.resolve(a.data, a) : p.reject(a) : a.message ? t.alert({
                        message: "隐式提交出错",
                        desc: a.message
                    }, function() {
                        p.reject(a)
                    }) : p.reject(a)
                },
                beforeSend: function() {
                    t.displayRunning(!0)
                },
                complete: function() {
                    t.displayRunning(!1)
                }
            }),
            p.promise()
        }
    }
    function n(e, a) {
        for (var n = o[e].target, i = 0, r = n.length; i < r; i++) {
            var s = n[i];
            t.log("target[" + i + "] = " + t.getMember(s));
            var l;
            if (s.label) {
                if (l = document.getElementById(s.id))
                    0 === l.type.indexOf("select-") && $(l).html(t.common.blankOption + t.createOptions(a, s.label, s.value));
                else if (l = document.getElementById("group_")) {
                    var d = $(l);
                    d.hasClass("radio-container") ? d.html(t.createRadios(a, s.label, s.value, s.id, d.hasClass("multivalue-v"))) : d.hasClass("checkbox-container") && d.html(t.createCheckboxes(a, s.label, s.value, s.id, d.hasClass("multivalue-v")))
                }
            } else if (l = document.getElementById(s.id))
                if ("select-one" === l.type)
                    t.selectByValue(l, a[0][s.value]);
                else if ("select-multiple" === l.type) {
                    for (var c = {}, u = 0; u < a.length; u++)
                        c[a[u][s.value]] = !0;
                    for (var p = 0, h = l.options.length; p < h; p++)
                        c[l.options[p].value] && (l.options[p].selected = !0)
                } else
                    "money" == $(l).data("type") ? $(l).setValue(a[0][s.value]) : l.value = "1899-12-31" === a[0][s.value] ? "" : a[0][s.value];
            else if (l = document.getElementsByName(s.id),
            l.length > 0)
                if ("checkbox" === l[0].type) {
                    var f = a[0][s.value];
                    t.setCheckedCheckbox(l[0].name, f.indexOf(",") > 0 ? f : $.map(a, function(t, e) {
                        return t[s.value]
                    }))
                } else
                    "radio" === l[0].type && t.setCheckedRadio(l[0].name, a[0][s.value]);
            else
                t.log("ydl.init.ajax出错：找不到目标组件" + s.id, "red")
        }
    }
    function i(e, a) {
        for (var n = o[e].target, i = 0, r = n.length; i < r; i++) {
            var s = n[i]
              , l = document.getElementById(s.id);
            if (l)
                "select-one" === l.type ? "" === s.label ? t.selectByValue(l, "") : $(l).html(t.common.blankOption) : l.value = "";
            else {
                l = document.getElementsByName(s.id);
                var d = l.length;
                if (d > 0)
                    for (var c = 0; c < d; c++)
                        "text" == l[c].type && (l.value = "")
            }
        }
    }
    var o = {};
    t.ajaxRunning = !1,
    $(document).ajaxStart(function() {
        t.ajaxRunning = !0
    }),
    $(document).ajaxStop(function() {
        t.ajaxRunning = !1,
        t.loading(!1)
    }),
    "undefined" == typeof t.init && (t.init = {}),
    t.init.ajax = function(t, n, i, o) {
        return o ? void e(t, n, i, o) : a(t, n, i)
    }
    ,
    t.isAjax = function(t) {
        return !!o[t]
    }
}(window.ydl ? ydl : window.ydl = {}),
function(t) {
    "undefined" == typeof t.init && (t.init = {}),
    t.compare = {},
    t.init.compare = function(e) {
        function a(e) {
            var a = $(e).closest("tr")
              , n = e.id;
            "radio" != e.type && "checkbox" != e.type || (n = e.name);
            var i = t.getValue(n).trim()
              , o = t.getValue("o_" + n).trim();
            a[i == o ? "removeClass" : "addClass"]("bg-warning")
        }
        var n = $$(e);
        $("tbody td:nth-child(2n) [name]", n).each(function() {
            t.attr(this, "readonly", !0),
            $(this).addClass("_nocheck"),
            window.poolSelect && void 0 !== poolSelect[this.name] && t.setValue(this, poolSelect[this.name])
        }),
        $("tbody td:nth-child(3n) [name]", n).each(function() {
            a(this)
        }).change(function() {
            a(this)
        })
    }
    ,
    t.compare.setValue = function(t, e) {
        var a = $('[name="o_' + t + '"]')
          , n = $('[name="' + t + '"]');
        a.setValue(e),
        n.setValue(e).closest("tr").removeClass("bg-warning")
    }
    ,
    t.compare.isChanged = function(e) {
        var a = e ? $(t.getDom(e)) : $(".compare-container td:nth-child(3n) [name]")
          , n = !1
          , i = {};
        return a.each(function(e, a) {
            var o = a.name;
            if (!(o in i)) {
                var r = ll("compare-old-" + o, t.getValue("o_" + o))
                  , s = ll("compare-new-" + o, t.getValue(o))
                  , l = $(a).data("type");
                return ("float" === l || "money" === l) && parseFloat(r) != parseFloat(s) && "" !== r && "" !== s || r != s ? void (n = !0) : void (i[o] = !0)
            }
        }),
        ll("compare-changed", n)
    }
    ,
    t.compare.check = function(e, a) {
        var n = $.Deferred();
        if ($(".compare-container .has-error").length > 0)
            t.customDialog({
                message: "存在未通过校验的数据，请修改正确后重新提交！",
                buttons: "确定",
                callback: function() {
                    n.reject()
                }
            });
        else {
            var i = {}
              , o = [];
            if ($(".compare-container td:nth-child(3n) [name]").each(function(e, a) {
                var n = a.name;
                !t.compare.isChanged(a) || n in i || (o.push(n),
                i[n] = {
                    label: $(a).closest("tr").children(":first").text().replace(/[:：]\s*$/, ""),
                    oldValue: t.getValue("o_" + n, !0),
                    newValue: t.getValue(n, !0)
                })
            }),
            void 0 === a || a) {
                var r = 0 == o.length ? "没有任何变更，请确认是否继续提交？" : '<p>请确认以下变更内容是否正确：</p><table class="table"><tr><th>字段名</th><th>修改前</th><th>修改后</th></tr>' + $.map(o, function(t) {
                    var e = i[t];
                    return "<tr><td>" + e.label + "</td><td>" + e.oldValue + "</td><td>" + e.newValue + "</td></tr>"
                }).join("") + "</table>";
                t.customDialog({
                    title: "确认变更",
                    text: r,
                    buttons: [{
                        text: "确认无误，继续提交",
                        theme: "primary"
                    }, "取消"],
                    callback: function(t) {
                        0 == t && (!$.isFunction(e) || e(o)) ? n.resolve() : n.reject()
                    }
                })
            } else
                !$.isFunction(e) || e(o) ? n.resolve() : n.reject()
        }
        return n.promise()
    }
}(window.ydl ? ydl : window.ydl = {}),
function(t) {
    t.diyQuery = function(e, a, n) {
        function i(t, e, a) {
            $.each(t, function(t, n) {
                if (n.rel) {
                    var o = $('<div data-rel="' + n.rel + '"></div>');
                    e.append(0 === t ? "" : w).append(o),
                    i(n.term, o, "and" === n.rel ? w : x)
                } else
                    $.inArray(n.tag, D) > -1 && (D.splice($.inArray(n.tag, D), 1),
                    h(n)),
                    e.append((0 === t ? "" : a || w) + '<b data-tag="' + n.tag + '">' + n.tag + "</b>")
            })
        }
        function o(t, e) {
            var a = e ? "addClass" : "removeClass";
            t[a]("selected").children("div,b").each(function() {
                "DIV" === this.tagName ? o($(this), e) : $(this)[a]("selected")
            })
        }
        function r(t) {
            var e = N.find("b");
            N.children().length > 0 && 0 === P.children().length && P.data("rel", "and").append(e.map(function(t, e) {
                return (0 === t ? "" : w) + '<b data-tag="' + this.innerHTML + '">' + this.innerHTML + "</b>"
            }).get().join("")),
            $(t).nextAll().toggleClass("hide"),
            P.toggleClass("hide"),
            P.hasClass("hide") ? (e.draggable("disable"),
            $(t).removeClass("active")) : (e.draggable("enable"),
            $(t).addClass("active"))
        }
        function s() {
            P.find("div,b").addClass("selected"),
            P.find("div.selected b").addClass("selected")
        }
        function l(t) {
            var e = P.find("b.selected,div.selected b")
              , a = e.eq(0);
            e.not(a).prev("i").remove().end().before("and" === t ? w : x).prev().addBack().appendTo(a.wrap('<div data-rel="' + t + '"></div>').parent().droppable(A)),
            a.parent().parent().data("rel") === t && a.unwrap(),
            u()
        }
        function d(t, e) {
            return 0 === $(t).children().length ? "" : "<i" + (e ? ' class="diy-qry-tmp"' : "") + ">" + ("and" === $(t).data("rel") ? "并且" : "或者") + "</i>"
        }
        function c() {
            P.find(".selected").prev("i").addBack().remove(),
            u()
        }
        function u() {
            for (var t = 0; t < 3; t++)
                P.find("i:nth-child(1),i:nth-last-child(1)").remove(),
                P.find("div:empty").remove(),
                P.find("div").each(function() {
                    var t = $(this).children();
                    1 === t.length && t.unwrap()
                }),
                P.find("div").each(function() {
                    var t = $(this);
                    t.data("rel") === t.parent().data("rel") && t.children().unwrap()
                });
            P.find(".selected").addBack().removeClass("selected")
        }
        function p(t) {
            t.draggable({
                opacity: .7,
                helper: "clone"
            }),
            P.hasClass("hide") && t.draggable("disable")
        }
        function h(e) {
            var a = String.fromCharCode("A".charCodeAt(0) + L % 26) + (parseInt(L / 26) || "");
            e && (a = e.tag);
            var n = $('<div class="row"><div class="col-md-1 col-xs-2"><b>' + a + '</b></div><div class="col-md-3 col-xs-5"><select class="form-control input-sm diy-qry-trm-name">' + T + '</select></div><div class="col-md-2 col-xs-5"><select class = "form-control input-sm diy-qry-trm-op"><option value="">请选择...</option></select></div><div class="col-md-5 col-xs-10 col-md-push-0 col-xs-push-2 diy-qry-trm-value"></div><div class="col-md-1 col-xs-2 col-md-pull-0 col-xs-pull-10"><button type="button" class="btn btn-sm btn-default" title="删除">×</button></div></div>');
            if (N.append(n),
            e)
                if (n.find(".diy-qry-trm-name").val(e.name).change(),
                n.find(".diy-qry-trm-op").val(e.op).change(),
                "string" == typeof e.value)
                    n.find(".diy-qry-trm-value input").val(e.value);
                else {
                    var i = n.find(".diy-qry-trm-value input:visible");
                    i.length > 0 && ("radio" === i[0].type || "checkbox" === i[0].type) ? t.setValue(i, e.value.join(",")) : i.each(function(a, n) {
                        $(n).hasClass("money-display") && (n = $(n).prev()),
                        t.setValue(n, e.value[a])
                    })
                }
            p(n.find("b")),
            L++
        }
        function f(e, a, n) {
            e.mudic ? "in" === a || "notin" === a ? n.html(t.createCheckboxes(e.mudic)) : n.html('<select class="form-control input-sm">' + t.createOptions(e.mudic) + "</select>") : ("between" === a ? n.html('<div class="input-group"><div><input type="text" class="form-control input-sm"></div><div class="input-group-addon">至</div><div><input type="text" class="form-control input-sm"></div></div>') : n.html('<input type="text" class="form-control input-sm">'),
            "money" === e.datatype ? n.find("input").addClass("money").each(function() {
                $(this).moneyinput()
            }) : "date" === e.datatype && n.find("input").addClass("date").wrap('<div class="input-group input-group-sm date"></div>').parent().append('<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>').end().datepicker())
        }
        function g() {
            function a(t) {
                return {
                    rel: t.data("rel"),
                    term: t.children().map(function() {
                        return "DIV" === this.tagName ? a($(this)) : "B" === this.tagName ? o[this.innerHTML] : void 0
                    }).get()
                }
            }
            function i(e) {
                var a = k[j[e.name]];
                e.value;
                return $.each(e.inputs, function() {
                    switch (a.type) {
                    case "TIME":
                        break;
                    case "TIMESTAMP":
                        break;
                    case "DATE":
                        t.validator(this, {
                            type: "date",
                            required: !0,
                            desc: a.desc
                        });
                        break;
                    case "INTEGER":
                        t.validator(this, {
                            type: "int",
                            required: !0,
                            desc: a.desc
                        });
                        break;
                    case "NUMERIC":
                    case "DOUBLE":
                    case "FLOAT":
                    case "DECIMAL":
                        t.validator(this, {
                            type: "float",
                            required: !0,
                            desc: a.desc
                        });
                        break;
                    case "VARCHAR":
                    case "CHAR":
                        t.validator(this, {
                            type: "validchar",
                            required: !0,
                            desc: a.desc
                        })
                    }
                }),
                e
            }
            t.validator.clear(N.find(".has-error"));
            var o = {}
              , r = [];
            N.children().each(function() {
                var t = $(this).children()
                  , e = t.eq(0).text();
                r.push(e);
                var a = t.eq(1).children("select").val()
                  , n = t.eq(2).children("select").val();
                if ("" !== a && "" !== n) {
                    var s = []
                      , l = t.eq(3).find('input[type="text"]:not(.money-display),select,input[type="checkbox"]:checked').map(function(t, e) {
                        return s[t] = e,
                        this.value
                    }).get();
                    o[e] = i({
                        inputs: s,
                        tag: e,
                        name: a,
                        op: n,
                        value: 1 === l.length && "in" !== n && "notin" !== n ? l[0] : l
                    })
                }
            });
            var s = {
                id: C ? e.id : e,
                wf: poolSelect._WF || "",
                tagList: r,
                query: P.hasClass("hide") ? {
                    rel: "and",
                    term: $.map(r, function(t) {
                        return o[t]
                    })
                } : a(P)
            };
            $.isFunction(n) && 0 == N.has(".has-error").length && n(JSON.stringify(s))
        }
        function m() {
            var e = b(P);
            t.alert({
                message: "表达式预览",
                desc: '<div class="diy-qry-prv">' + e.replace(/^（|）$/g, "") + "</div>"
            })
        }
        function b(t) {
            var e = {};
            N.find("b").each(function() {
                e[this.innerHTML] = $(this).closest(".row")
            });
            var a = t.children("div,b").map(function() {
                return "DIV" === this.tagName ? b($(this)) : v(e[this.innerHTML])
            }).get().join("and" === t.data("rel") ? " <b>并且</b> " : " <b>或者</b> ");
            return a.length > 0 ? "（" + a + "）" : ""
        }
        function v(e) {
            var a = e.find(".diy-qry-trm-name").val()
              , n = e.find(".diy-qry-trm-op").val();
            if ("" === a || "" === n)
                return null;
            var i, o = e.find(".diy-qry-trm-name>:selected").text(), r = e.find(".diy-qry-trm-op>:selected").text(), s = e.children(".diy-qry-trm-value");
            if ("in" === n || "notin" === n)
                i = "<em>" + s.find(":checkbox:checked").map(function() {
                    return $(this).parent().text()
                }).get().join("、") + "</em>";
            else {
                var l = s.find(":input:not(.money)");
                i = "between" === n ? "<em>" + l.first().val() + "</em>至<em>" + l.last().val() + "</em>" : "<em>" + t.getValue(l, !0) + "</em>"
            }
            return r.indexOf("...") > 0 && (r = r.replace("...", i),
            i = ""),
            '<span><em class="fn">' + o + "</em>" + r + i + "</span>"
        }
        function y() {
            t.alert({
                message: "自定义查询-编辑条件表达式-使用说明",
                desc: "<ol><li>您可以将查询条件左侧的序号标签拖拽到表达式编辑区；</li><li>点击表达式编辑区里的查询条件标签，可以将它们选中；</li><li>点击查询条件标签之间的关系说明文字，可以将整组选中；</li><li>选中查询条件后，可以点击“并且”或“或者”按钮，将它们用括号组合成一组；</li><li>选中查询条件后，点击“移除”按钮，可以将它们从表达式编辑区移除，但不会删除上面表单中的条件；</li><li>通过点击“全选”或“取消选择”按钮，可以同时对所有查询条件标签操作；</li><li>当显示表达式编辑区时，按表达式提交查询；未显示表达式编辑区时，将全部条件按“并且”提交查询。</li></ol>"
            })
        }
        var w = "<i>并且</i>"
          , x = "<i>或者</i>"
          , _ = {
            EQ: "等于",
            NEQ: "不等于",
            GT: "大于",
            LT: "小于",
            GTE: "大于或等于",
            LTE: "小于或等于",
            "%LIKE": "以...结尾",
            "LIKE%": "以...开头",
            "%LIKE%": "包含文字",
            BETWEEN: "在...之间",
            IN: "包含",
            NOTIN: "不包含"
        }
          , C = !1
          , k = [];
        "object" == typeof e ? (k = pageData.pageConfig.diyQuery[e.id],
        C = !0) : k = pageData.pageConfig.diyQuery[e];
        var j = {}
          , S = {};
        $.each(k, function(e, a) {
            S[a.name] = t.common.blankOption + t.createOptions($.map(a.op.split(","), function(t) {
                return {
                    text: _[t.toUpperCase()],
                    value: t
                }
            })),
            j[a.name] = e
        });
        var T = t.common.blankOption + t.createOptions($.map(k, function(t) {
            return {
                text: t.desc,
                value: t.name
            }
        }));
        $("#" + a + " .panel-body").append('<div class="diy-qry"><div class="container-fluid diy-qry-trm"></div><div class="text-center diy-qry-btn"><button class="btn btn-success btn-sm" data-func="add" type="button"><span class="glyphicon glyphicon-plus"></span>添加条件</button> <button class="btn btn-primary btn-sm" data-func="run" type="button"><span class="glyphicon glyphicon-search"></span>执行查询</button> <div class="btn-group"><button class="btn btn-default btn-sm" data-func="exp" type="button"><span class="glyphicon glyphicon-edit"></span>编辑表达式</button> <button class="btn btn-default btn-sm hide" data-func="and" type="button">并且</button><button class="btn btn-default btn-sm hide" data-func="or" type="button">或者</button><button class="btn btn-default btn-sm hide" data-func="sla" type="button">全选</button><button class="btn btn-default btn-sm hide" data-func="sln" type="button">取消选择</button><button class="btn btn-default btn-sm hide" data-func="rmv" type="button">移除</button><button class="btn btn-default btn-sm hide" data-func="prv" type="button">预览</button><button class="btn btn-default btn-sm hide" data-func="hlp" type="button">帮助</button></div></div><div class="diy-qry-exp hide" data-rel="and"></div></div>');
        var E = $("#" + a + " .diy-qry")
          , N = E.children(".diy-qry-trm")
          , I = E.children(".diy-qry-btn")
          , P = E.children(".diy-qry-exp");
        p(N.find("b"));
        var L = N.children().length;
        I.on("click", "button", function() {
            switch ($(this).data("func")) {
            case "add":
                h();
                break;
            case "run":
                g();
                break;
            case "exp":
                r(this);
                break;
            case "and":
                l("and");
                break;
            case "or":
                l("or");
                break;
            case "rmv":
                c();
                break;
            case "sla":
                s();
                break;
            case "sln":
                P.find("div,b").addBack().removeClass("selected");
                break;
            case "prv":
                m();
                break;
            case "hlp":
                y()
            }
        }),
        N.on("change", ".diy-qry-trm-name", function() {
            $(this).closest(".row").find(".diy-qry-trm-op").html(S[this.value]).end().find(".diy-qry-trm-value").empty()
        }),
        N.on("change", ".diy-qry-trm-op", function() {
            var t = $(this).closest(".row")
              , e = t.find(".diy-qry-trm-name").val();
            e && f(k[j[e]], this.value, t.find(".diy-qry-trm-value"))
        });
        var D = e.tagList;
        C ? (r(I.find("button[data-func=exp]")[0]),
        i(e.query.term, P)) : h(),
        N.on("click", "button", function() {
            var t = $(this).closest(".row").children().eq(0).text();
            $(this).closest(".row").remove(),
            P.find("b[data-tag=" + t + "]").addClass("selected"),
            c()
        }),
        P.on("click", "b, i", function() {
            var t = $(this);
            "B" === this.tagName ? (t.toggleClass("selected"),
            t.siblings().length === t.siblings().filter(".selected").length && t.parent().addClass(".selected"),
            0 === t.siblings().addBack().filter(".selected").length && t.parent().removeClass("selected")) : (t.parent().toggleClass("selected"),
            o(t.parent(), t.parent().hasClass("selected")))
        });
        var A = {
            greedy: !0,
            intersect: "pointer",
            over: function(t, e) {
                $(this).append(d(this, !0) + '<b class="diy-qry-tmp">&nbsp;</b>'),
                $(this).addClass("hover")
            },
            out: function(t, e) {
                $(this).children(".diy-qry-tmp").remove(),
                $(this).removeClass("hover")
            },
            drop: function(t, e) {
                $("div.diy-qry-exp .diy-qry-tmp").remove(),
                $(this).append(d(this, !1) + '<b data-tag="' + $(e.draggable).text() + '">' + $(e.draggable).text() + "</b>"),
                $(this).removeClass("hover")
            }
        };
        P.find("div").addBack().droppable(A)
    }
}(window.ydl ? ydl : window.ydl = {}),
function(t) {
    t.attachment = {},
    t.attachment.init = function(e) {
        function a(t, e) {
            t.text(e);
            var a = t.parent()
              , n = a.data("min") || 0
              , i = a.data("max") || !1
              , o = e < n || i && e > i;
            a.toggleClass("attachment-allow", !o)
        }
        if (e && 0 != e.flag) {
            var n = {};
            $.each(e.items, function(t, e) {
                n[e.id] = e.groupid
            });
            var i = 2 == e.flag
              , o = ""
              , r = function(a) {
                var n = i;
                a.rw && (n = "w" == a.rw);
                var o = n ? "textarea" : "span"
                  , r = e.beanname ? "/fileInteractiveFlow/getfile/" + e.beanname : "/attachment/getfile";
                return '<li data-fid="' + a.fileid + '">' + (n ? '<button type="button" class="close" title="删除此附件"><span>&times;</span></button>' : "") + '<a class="_' + a.fn.substr(a.fn.lastIndexOf(".") + 1 || a.fn.length) + '" href="' + t.contexPath + r + "/" + a.fileid + '"></a><p><' + o + ' data-original="' + a.remark + '">' + a.remark + "</" + o + "></p></li>"
            };
            $("#flowAttachment .nav-tabs").append($.map(e.items, function(t, e) {
                var a = i;
                return t.rw && (a = "w" == t.rw),
                o += '<div id="attachment_item_' + e + '" data-itemid="' + t.id + '" class="tab-pane' + (0 === e ? " active" : "") + '"><ul>' + $.map(t.files, r).join("") + (a ? '<li><a class="add" href="#" data-itemid="' + t.id + '"></a><p><span>点击加号添加附件</span></p></li>' : "") + "</ul></div>",
                "<li" + (0 === e ? ' class="active"' : "") + '><a data-toggle="tab" data-itemid="' + t.id + '" href="#attachment_item_' + e + '"><span>' + (e + 1) + ". " + t.name + '</span><span class="badge hide">' + (t.files.length || "") + "</span></a></li>"
            }).join("")),
            $("#flowAttachment .tab-content").append(o);
            var s = $("#flowAttachment").removeClass("hidden");
            t.attachment.resize(),
            $("#attachment_form input").change(function() {
                var e = this.files || [{
                    name: this.value
                }]
                  , i = $(this).data("itemid");
                $("#attachment_form").ajaxSubmit({
                    dataType: "json",
                    async: !0,
                    success: function(o) {
                        if (0 == o.returnCode) {
                            for (var l = $('#flowAttachment .add[data-itemid="' + i + '"]').parent(), d = o.data.length - e.length; d < o.data.length; d++) {
                                var c = o.data[d];
                                l.before(r({
                                    fn: c.fn,
                                    fileid: c.fileid,
                                    remark: c.remark
                                }))
                            }
                            n[i] = o.groupId;
                            var u = $('#flowAttachment a[href="#' + l.closest("div").prop("id") + '"] .badge')
                              , p = (parseInt(u.text()) || 0) + e.length;
                            u.text(p);
                            var h = $('#flowAttachment a[href="#' + l.closest("div").prop("id") + '"] .attachment-count');
                            a(h, p),
                            t.attachment.resize(),
                            s.trigger("success.upload", [o, e.length, p, i]),
                            attachment_form.reset()
                        } else
                            s.triggerHandler("error", ["upload", o.returnCode, o.message]) !== !1 && t.alert("上传附件出错：" + o.message)
                    },
                    error: function(e, a, n) {
                        s.triggerHandler("error", ["upload", a, n]) !== !1 && t.alert("上传附件出错：" + a + " - " + n)
                    }
                })
            }),
            $("#flowAttachment .tab-content").on("click", ".add", function() {
                var a = $(this).data("itemid")
                  , i = $('#flowAttachment a[data-itemid="' + a + '"]')
                  , o = i.find(".badge")
                  , r = parseInt(o.text())
                  , s = i.find("em").data("max");
                if (s && r >= s)
                    return t.alert(i.children(":first").text() + "最多允许上传 " + s + " 个文件"),
                    !1;
                var l;
                return l = e.beanname ? "/fileInteractiveFlow/upFile/" + e.beanname + "/" + a + "/" + poolSelect._IS + "/" + n[a] : "/attachment/" + poolSelect._IS + "/" + a,
                $("#attachment_form").prop("action", t.contexPath + l),
                $("#attachment_form input").data("itemid", a),
                $("#attachment_form input").click(),
                !1
            }).on("click", "button", function() {
                if (confirm("请确认是否要删除此附件文件？")) {
                    var n = $(this).closest("li")
                      , i = n.closest(".tab-pane").data("itemid")
                      , o = n.data("fid")
                      , r = e.beanname ? "/fileInteractiveFlow/delete/" + e.beanname : "/attachment/delete";
                    $.ajax(t.contexPath + r + "/" + o, {
                        method: "GET",
                        dataType: "json",
                        success: function(e) {
                            if (0 == e.returnCode) {
                                var o = $('#flowAttachment a[href="#' + n.closest("div").prop("id") + '"] .badge')
                                  , r = parseInt(o.text()) - 1;
                                o.text(r || "");
                                var l = $('#flowAttachment a[href="#' + n.closest("div").prop("id") + '"] .attachment-count');
                                a(l, r),
                                n.remove(),
                                t.attachment.resize(),
                                s.trigger("success.delete", [e, 1, r, i])
                            } else
                                s.triggerHandler("error", ["delete", e.returnCode, e.message]) !== !1 && t.alert("删除附件出错：" + e.message)
                        },
                        error: function(e, a, n) {
                            s.triggerHandler("error", ["delete", a, n]) !== !1 && t.alert("删除附件出错：" + a + " - " + n)
                        }
                    })
                }
            }).on("change", "textarea", function() {
                var a = $(this)
                  , n = a.closest("li").data("fid")
                  , i = e.beanname ? "/fileInteractiveFlow/modi/" + e.beanname : "/attachment/modi";
                $.ajax(t.contexPath + i + "/" + n, {
                    method: "POST",
                    dataType: "json",
                    data: {
                        remark: this.value
                    },
                    success: function(e) {
                        0 != e.returnCode && (a.val(a.data("original")),
                        t.alert("修改备注出错：" + e.message))
                    },
                    error: function(e, n, i) {
                        a.val(a.data("original")),
                        t.alert("修改备注出错：" + n + " - " + i)
                    }
                })
            }).on("keydown", "textarea", function(e) {
                if (e.which === t.common.keys.Enter || e.which === t.common.keys.Quote)
                    return !1
            }),
            s.trigger("load")
        }
    }
    ,
    t.attachment.resize = function() {
        $("#flowAttachment .nav-tabs").css("height", "auto");
        var t = $("#flowAttachment .items").height();
        $("#flowAttachment .nav-tabs").height(t),
        $("#flowAttachment .tab-content ul").css("min-height", t - 60)
    }
    ,
    t.attachment.setRequired = function(e, a) {
        var n = $.isPlainObject(e) ? e : {};
        "string" == typeof e && $.each(e.split(","), function(t, e) {
            n[e] = 1
        });
        var i = $("#flowAttachment .nav-tabs a")
          , o = $("#flowAttachment .tab-content div");
        i.show().children("em").remove(),
        i.each(function(t) {
            var e = $(this)
              , i = n[e.data("itemid")]
              , r = parseInt(e.children(".badge").text()) || 0;
            if (i) {
                var s = "";
                if ("object" == typeof i && 2 == i.length) {
                    var l = i[0] || 0;
                    s = 0 == l ? "最多允许上传 " + i[1] + " 个文件" : "最少需要上传 " + l + " 个文件，最多允许上传 " + i[1] + " 个文件",
                    e.append('<em class="attachment-max ' + (0 == l ? "attachment-allow" : "") + '" data-min="' + l + '" data-max="' + i[1] + '"><span class="attachment-count">' + r + '</span> / <span class="attachment-count-max">' + i[1] + "</span></em>")
                } else
                    s = "最少需要上传 " + i + " 个文件",
                    e.append('<em class="attachment-min ' + (r >= i ? "attachment-allow" : "") + '" data-min="' + i + '"><span class="attachment-count">' + r + "</span></em>");
                o.eq(t).find("div.attachment-tip").remove(),
                o.eq(t).append('<div class="attachment-tip">说明：' + e.children(":first").text() + s)
            } else
                e.append('<em class="attachment-allow"><span class="attachment-count">' + r + "</span></em>"),
                a && e.hide()
        }),
        t.attachment.resize()
    }
    ,
    t.attachment.checkRequired = function(e) {
        var a = $("#flowAttachment .nav-tabs a")
          , n = [];
        a.each(function() {
            var t = $(this)
              , e = t.data("itemid")
              , a = t.children("em").data("min") || 0
              , i = t.children("em").data("max") || !1
              , o = parseInt(t.children(".badge").text()) || 0;
            (o < a || i && o > i) && n.push({
                id: e,
                name: t.children(":first").text(),
                min: a,
                max: i,
                count: o
            })
        });
        var i = {
            ok: 0 === n.length,
            data: n
        };
        return e && e.tip ? i.ok ? $.Deferred().resolve(i) : t.attachment.tipDialog(i) : i
    }
    ,
    t.attachment.tipDialog = function(e) {
        var a = $.Deferred()
          , n = "<br />" + $.map(e.data, function(t) {
            var e = t.count < t.min ? "至少需要上传 " + t.min + " 个文件，" : "最多允许上传 " + t.max + " 个文件，";
            return "<b>" + t.name + "</b> " + e + "您上传了 " + t.count + " 个；"
        }).join("<br />");
        return t.alert({
            message: "请继续上传完整后再提交！",
            desc: n
        }, function() {
            a.resolve()
        }),
        a.promise(e)
    }
}(window.ydl ? ydl : window.ydl = {}),
function(t) {
    function e(e, a, n) {
        var o = function() {
            var a = $(document).triggerHandler("beforeSubmit");
            void 0 === a && (a = !0),
            t.deferred(a).then(function() {
                var a = t.getInputs(!0);
                a._APPLY = e,
                a._ATTRIBUTES = JSON.stringify(t.attribute.data),
                t.ajax(t.contexPath + "/flow/submit/" + poolSelect._WF, {
                    instanceid: poolSelect._IS,
                    form: a,
                    pool: pageData.dataPool
                }, function(e) {
                    if ($(document).triggerHandler("submitSuccess", [e]) !== !1) {
                        var a = 0 == e.url.indexOf("/") ? "" : "/";
                        e.message ? t.alert({
                            message: e.message,
                            copy: !1
                        }, function() {
                            e.url && window.location.replace(t.contexPath + a + e.url)
                        }) : e.url && window.location.replace(t.contexPath + a + e.url)
                    }
                }, {
                    contentType: "application/json",
                    processData: !1,
                    handleError: function(e, a, i) {
                        var o = t.showBatchData(e, a, i);
                        !o && i && t.alert({
                            icon: "error",
                            message: "提交未成功。",
                            desc: i,
                            code: a
                        }),
                        n.reset(),
                        $("#pageTabs  iframe,object").show()
                    },
                    beforeSend: function() {
                        t.loading(!0)
                    },
                    complete: function() {
                        t.loading(!1)
                    }
                })
            }, function() {
                n.reset(),
                $("#pageTabs  iframe,object").show()
            })
        };
        if (t.common.isIe) {
            var r = document.getElementById("printFrame");
            if (r) {
                var s = r.contentWindow.document.getElementsByTagName("object");
                s.length > 0 && $(s).hide()
            } else
                $("#pageTabs  iframe,object").hide()
        }
        if (a.data("confirm") === !1)
            o();
        else {
            var l = i[a.text().trim()] || i.def;
            t.customDialog({
                message: t.textResources.get(l),
                spaceClose: !0,
                spaceCloseFunc: function() {
                    n.reset(),
                    $("#pageTabs  iframe,object").show()
                },
                callback: function(t) {
                    0 == t ? o() : (n.reset(),
                    $("#pageTabs  iframe,object").show())
                }
            })
        }
    }
    function a(e) {
        var a = {
            a: '<button type="button" id="b_flow_a" class="btn btn-primary submit-button" data-apply="0" data-validate="true" data-submit-text="提交中..."><span></span>提交</button>',
            b: '<button type="button" id="b_flow_b" class="btn btn-primary submit-button" data-apply="0" data-validate="true"><span></span>同意</button>',
            c: '<button type="button" id="b_flow_c" class="btn btn-primary submit-button" data-apply="1" data-validate="false"><span></span>不同意</button>',
            d: '<button type="button" id="b_flow_d" class="btn btn-primary submit-button" data-apply="0" data-validate="true" data-submit-text="提交中..."><span></span>继续提交</button>',
            e: '<button type="button" id="b_flow_e" class="btn btn-primary submit-button" data-apply="2" data-validate="false"><span></span>撤销</button>',
            f: '<button type="button" id="b_flow_f" class="btn btn-primary submit-button" data-apply="1" data-validate="false" data-confirm="false" ><span class="glyphicon glyphicon-chevron-left"></span>上一步</button>',
            g: '<button type="button" id="b_flow_g" class="btn btn-primary submit-button" data-apply="0" data-validate="true" data-confirm="false" >下一步 <span class="glyphicon glyphicon-chevron-right"></span></button>',
            h: '<button type="button" id="b_flow_h" class="btn btn-primary flow-button" data-apply="4"><span></span>暂存</button>',
            i: '<button type="button" id="b_flow_i" class="btn btn-primary flow-button"><span class="glyphicon glyphicon-backward"></span>返回</button>',
            j: '<button type="button" id="b_flow_j" class="btn btn-primary submit-button" data-apply="0" data-validate="true" ><span class="glyphicon glyphicon-print"></span>打印</button>',
            k: '<button type="button" id="b_flow_k" class="btn btn-primary flow-button" data-apply="0" data-validate="true" ><span class="glyphicon glyphicon-print"></span>打印</button>',
            l: '<button type="button" id="b_flow_l" class="btn btn-primary submit-button" data-apply="0" data-validate="true" data-confirm="false" >下一步 <span class="glyphicon glyphicon-chevron-right"></span></button>',
            m: '<button type="button" id="b_flow_m" class="btn btn-primary flow-button" data-apply="0"><span class="glyphicon glyphicon-retweet"></span>再做一笔</button>',
            n: '<button type="button" id="b_flow_n" class="btn btn-success btn-sm end-button">重新登录</button>',
            o: '<button type="button" id="b_flow_o" class="btn btn-success btn-sm end-button">返回首页</button>',
            p: '<button type="button" id="b_flow_p" class="btn btn-default result-copy btn-sm end-button">复制到剪贴板</button>',
            q: '<button type="button" id="b_flow_q" class="btn btn-primary flow-button"><span class="glyphicon glyphicon-pencil"></span>重新编辑</button>'
        }
          , n = $("#pageFlowButtons");
        $.each(e, function(e, i) {
            function o() {
                var t = a[i.id] || "";
                i.text && (t = t.replace(/(<\/span>).+?(<\/button>)$|(>).+?( <span)/, "$1$3" + i.text + "$2$4")),
                i.icon && (t = t.replace(/<span( class=".+?")?>/, '<span class="glyphicon glyphicon-' + i.icon + '">')),
                r = $(t).data("config", i)
            }
            var r;
            if (/^[a-z]$/.test(i.id))
                "q" == i.id ? poolSelect._CxbjFlag && "1" == poolSelect._CxbjFlag ? o() : r = "" : "a" == i.id && poolSelect._TjFlag && "0" == poolSelect._TjFlag ? r = "" : o();
            else {
                var s = i.appvalue ? 'class="btn btn-primary submit-button" data-apply="' + i.appvalue + '" data-validate="true" ' : 'class="btn btn-primary flow-button"'
                  , l = i.icon ? '<span class="glyphicon glyphicon-' + i.icon + '"></span>' : ""
                  , d = "false" == i.enable ? "disabled" : "";
                r = $('<button type="button" id="b_flow_' + i.id + '" ' + s + " " + d + ">" + l + i.text + "</button>").data("config", i)
            }
            i.url && r.click(function() {
                t.go(t.contexPath + i.url)
            }),
            n.append(r)
        })
    }
    function n(t) {
        var t = t || {}
          , e = "notShow" != t.autoShow
          , a = $(".has-error:first");
        0 != a.length && (a.closest(".batch-error-td").length > 0 && (e = !1),
        a.parents(".tab-pane").last().is(".active") ? $("#pageTabs").one("tabshown", function() {
            e && a.focus().trigger("mouseenter")
        }) : $("#pageTabs").one("tabshown", function() {
            e && a.focus().trigger("mouseenter"),
            $("#pageTabs > .tab-content > .tab-pane.ydpx-page").not($(pageTabs[a.closest(".tab-pane").index()].dom)).removeClass("active, in")
        }),
        a.closest(".tab-pane").is(".active") ? $(".tab").one("shown.bs.tab", function() {
            e && a.focus().trigger("mouseenter")
        }) : $(".tab").one("shown.bs.tab", function() {
            e && a.focus().trigger("mouseenter");
            var t = $(this).closest("li").index();
            a.closest(".tab-content > .tab-pane").not(":eq(" + t + ")").removeClass("active, in")
        }),
        1 == a.parents(".tab-pane").length ? (a.closest(".tab-pane").is(".active") || pageTabs[a.closest(".tab-pane").index()].open(),
        e && a.focus().trigger("mouseenter")) : (a.closest(".tab-pane").is(".active") || a.closest(".container-tabs").find(".tab:eq(" + a.closest(".tab-pane").index() + ")").tab("show"),
        a.parents(".tab-pane").last().is(".active") || a.parents(".tab-pane").last().index() >= 0 && pageTabs[a.parents(".tab-pane").last().index()].open(),
        e && a.focus().trigger("mouseenter")))
    }
    !pageData.pageConfig || !$.isNumeric(pageData.pageConfig.approve) || pageData.pageConfig.buttons && 0 !== pageData.pageConfig.buttons.length || (pageData.pageConfig.buttons = $.map(["ah", "bch", "deh", "fgh", "i"][pageData.pageConfig.approve].split(""), function(t) {
        return {
            id: t
        }
    }));
    var i = {
        "不同意": "flow.submit.confirm.disagree",
        "撤销": "flow.submit.confirm.cancel",
        "继续提交": "flow.submit.confirm.continue",
        def: "flow.submit.confirm.def"
    };
    t.showHasError = n,
    t.flowButtons = function() {
        function n() {
            var e = $.Deferred();
            return t.ajaxRunning ? (t.log("提交前正在进行查询，等待结束后再继续提交。"),
            t.loading(!0, 0, {
                shown: function(a, n) {
                    0 == t.ajaxRunning ? (e.resolve(),
                    t.log("提交前正在进行的查询结束了,即将进行提交。"),
                    t.loading("close", n)) : a.on("dblclick", function(a) {
                        a.ctrlKey && (t.log("强制关闭加载层，修改查询状态"),
                        t.ajaxRunning = !1,
                        e.resolve(),
                        t.loading("close", n))
                    })
                },
                hidden: function() {
                    t.log("加载层已关闭，提交前正在进行的查询结束了"),
                    e.resolve()
                }
            })) : e.resolve(),
            e.promise()
        }
        var i = pageData.pageConfig || {};
        a(i.buttons || []);
        var o = $(".flow-buttons");
        o.length > 0 && ($("#pageFlowButtons").append(o.children(".panel-body").children().removeClass("btn-sm btn-default").addClass("flow-button")),
        o.remove()),
        $("#b_flow_i").click(function() {
            history.back()
        }),
        $("#b_flow_j").click(function() {
            window.frames[0] ? t.common.isIe ? window.frames[0].document.execCommand("print", !1, null) : window.frames[0].printPdf ? window.frames[0].printPdf() : window.frames[0].print() : window.print()
        }),
        $("#b_flow_k").click(function() {
            window.frames[0] ? t.common.isIe ? window.frames[0].document.execCommand("print", !1, null) : window.frames[0].printPdf ? window.frames[0].printPdf() : window.frames[0].print() : window.print()
        }),
        $("#b_flow_m").click(function() {
            t.go(t.contexPath + "/flow/menu/" + poolSelect._WF)
        }),
        $("#b_flow_q").click(function() {
            t.go(t.contexPath + "/flow/apply/" + poolSelect._WF + "/" + poolSelect._POOLKEY)
        }),
        $("#pageFlowButtons").on("click", "button", function() {
            var e = $(this).data("config");
            e && e.cmdtask && t.sendCommand(e.cmdtask, {}, function(a, n, i) {
                "00000000" != n ? t.alert(i) : "" != e.succmsg && t.alert(e.succmsg)
            })
        }).on("click", ".submit-button", function() {
            var a = $(this);
            n().then(function() {
                if ($(".layui-layer.modal:visible").length > 0)
                    return void t.log("请先处理正在显示的提示框，再进行提交");
                var n = $("#pageFlowButtons button").prop("disabled", !0).filter(".submit-button").button("submit").end();
                n.reset = function() {
                    this.prop("disabled", !1).filter(".submit-button").button("reset")
                }
                ;
                var i = "" + a.data("apply");
                if (!window.poolSelect || !poolSelect._WF)
                    return t.alert("无法获取流程号（_WF）"),
                    void n.reset();
                $.each(t.data.dataList, function(t, e) {
                    e.allowBatch = !1,
                    e.batchErrorInfo = {},
                    $("#list_" + e.id + "_buttons_batch, #list_" + e.id + "_buttons_batch_import").addClass("hide"),
                    $("#list_" + e.id + "_buttons_batch_import").attr("href", "")
                });
                var o = a.data("validate")
                  , r = [];
                if ($$("_APPLYMEMO") && t.validator.clear("_APPLYMEMO"),
                !o && $$("_APPLYMEMO"))
                    r.push(t.validator("_APPLYMEMO", {
                        required: !0,
                        desc: "审批意见"
                    }));
                else {
                    if (t.data.dataList)
                        for (var s in t.data.dataList)
                            (t.data.dataList[s].allowUpdate || t.data.dataList[s].allowInsert) && r.push(t.init.dataList({
                                id: s
                            }, "save", t.data.dataList[s].thisTab));
                    if (o) {
                        for (var l = 0; l < pageTabs.length; l++)
                            if (null !== pageTabs[l] && (t.log("ydl.formValidate(pageTabs[" + l + "]) start"),
                            r.push(t.formValidate(pageTabs[l].dom, !1)),
                            $.isFunction(pageTabs[l].form_validate))) {
                                t.log("pageTabs[" + l + "].form_validate() start");
                                var d = pageTabs[l].form_validate.call(a);
                                "boolean" == typeof d || void 0 === d ? (t.log("pageTabs[" + l + "].form_validate() return " + d),
                                void 0 === d && (d = !0),
                                d ? r.push($.Deferred().resolve()) : r.push($.Deferred().reject())) : d && $.isFunction(d.promise) ? (t.log("pageTabs[" + l + "].form_validate() return deferred " + d.state()),
                                r.push(d)) : r.push($.Deferred().reject("pageTabs[" + l + "].form_validate()返回值类型不正确！"))
                            }
                    } else
                        r.push(!0)
                }
                t.deferred(r).then(function() {
                    e(i, a, n)
                }, function(e) {
                    t.showHasError(),
                    n.reset()
                })
            }, function() {
                t.log("提交前发出的ajax请求出错了")
            })
        }),
        $("#b_flow_h").click(function() {
            t.ajax(t.contexPath + "/flow/save/" + poolSelect._WF, {
                form: t.getInputs(!0),
                pool: pageData.dataPool
            }, function(e) {
                t.alert("暂存成功！")
            }, {
                contentType: "application/json",
                processData: !1
            })
        })
    }
}(window.ydl ? ydl : window.ydl = {}),
function(t) {
    function e(e) {
        var n = t('<div class="tip-box-wrap"></div>').append(s.call(this, e));
        t(this).data("tip-wrap", n);
        var i = this
          , o = !0;
        t.each(u, function(t, r) {
            if (r(i, e, a, n))
                return o = !1,
                !1
        }),
        o && !t(i).data("hover") && t(i).prepend(n),
        l.call(this, e, n)
    }
    function a(e, a) {
        var n = t(this)
          , o = a ? "tip-input-icon" : "tip-field-icon"
          , r = t('<span class="' + o + " glyphicon " + h[e.type].icon + " " + h[e.type].wrap + '"></span>').data("type", e.type);
        return n.data("icon", r),
        r.click(function(e) {
            if (a)
                i(n, !0);
            else {
                var o = n.data("tip-wrap").removeClass("hidden")
                  , r = n.data("tips") || {};
                t.each(r, function(t, e) {
                    o.append(e.dom)
                }),
                n.data("tip-wrap", o)
            }
            e.stopPropagation()
        }),
        r
    }
    function n(e) {
        function a(t, e) {
            o.data("type", e),
            i.data("icon", o),
            o.removeClass(h[t].icon + " " + h[t].wrap).addClass(h[e].icon + " " + h[e].wrap)
        }
        var n = {
            info: 0,
            warn: 1,
            error: 2
        }
          , i = t(this)
          , o = i.data("icon");
        if (o) {
            var r = o.data("type");
            if (e)
                n[e] > n[r] && a(r, e);
            else {
                var s = i.data("tips") || {}
                  , l = "info";
                t.each(s, function(t, e) {
                    n[e.type] > n[l] && (l = e.type)
                }),
                a(r, l)
            }
        }
    }
    function i(e, a) {
        o();
        var n = t('<div class="tip-box-wrap tip-input' + (e.data("hover") ? " tip-hover-show" : "") + '"></div>')
          , i = e.data("tips") || {};
        t.each(i, function(t, e) {
            e.hide && !a || n.append(e.dom)
        }),
        e.data("tip-wrap", n),
        t("body").append(n),
        n.on("mouseenter", ".tip-del", function() {
            e.data("isBlur", !1)
        }).on("mouseleave", ".tip-del", function() {
            e.data("isBlur", !0)
        }),
        d(e, n),
        t("body,div:not(.tips-keep-on-scroll)").on("scroll.tips", o),
        t(window).on("scroll.tips", o),
        r(e)
    }
    function o() {
        t(".tip-input").remove(),
        t("body,div:not(.tips-keep-on-scroll)").off("scroll.tips", o),
        t(window).off("scroll.tips", o)
    }
    function r(t) {
        var e = t.data("position-ele") ? t.data("position-ele").filter(":visible") : t
          , a = e.offset()
          , n = t.parent().width()
          , i = t.data("tip-wrap");
        t.data("hover") || i.css("width", n);
        var o = a.left;
        i.width() + a.left > document.body.clientWidth && (o = o + e[0].clientWidth - i.width()),
        i.css({
            top: a.top - i.height(),
            left: o
        })
    }
    function s(e) {
        var a = "";
        e.hide && (a = "fold" == e.hide ? '<span class="tip-fold glyphicon glyphicon-chevron-up"></span>' : '<span class="tip-del glyphicon glyphicon-remove"></span>');
        var n = '<div class="tip-box ' + h[e.type].wrap + '"><span class="glyphicon ' + h[e.type].icon + '"></span><div class="tip-data ' + ("" == a ? "tip-data-noicon" : "") + '">' + e.tip + "</div>" + a + "</div>"
          , i = t(n);
        i.find(".tip-data").data("tip", e.tip);
        var o = t(this).data("tips") || {};
        return e.key && 1 != e.key ? (i.attr("data-key", e.key),
        o[e.key] = {
            dom: i,
            hide: !1,
            type: e.type
        }) : (i.attr("data-key", e.type + "-key"),
        o[e.type + "-key"] = {
            dom: i,
            hide: !1,
            type: e.type
        }),
        t(this).data("tips", o),
        i
    }
    function l(e, a) {
        var n = t(this);
        if (a.on("click", ".tip-fold", function() {
            var e = t(this).closest(".tip-box").find(".tip-data");
            e.toggleClass("shrink"),
            e.hasClass("shrink") ? (e.html(e.text()),
            t(this).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")) : (e.html(e.data("tip")),
            t(this).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up"))
        }),
        d(n, a),
        t(this).is(":input") && !t(this).data("hover")) {
            var r = t(this).data("position-ele") || t(this);
            r.on("focus.tips", function(e) {
                t(document).data("stop", !0),
                i(n),
                e.stopPropagation()
            }).on("blur.tips", function() {
                t(document).data("stop", !1),
                0 != t(this).data("isBlur") && o(),
                t(this).data("isBlur", !0)
            }).on("click", function(t) {
                t.stopPropagation()
            })
        } else if ("FIELDSET" == this.tagName || t(this).data("hover")) {
            var r = t(this).data("position-ele") || t(this);
            r.mouseenter(function(e) {
                t(document).data("stop", !0),
                i(n),
                e.stopPropagation()
            }).mouseleave(function() {
                t(document).data("stop", !1),
                0 != t(this).data("isBlur") && o(),
                t(this).data("isBlur", !0)
            })
        }
    }
    function d(e, a) {
        a.on("click", ".tip-del", function(n) {
            var i = t(this).closest(".tip-box")
              , o = e.data("tips") || {};
            o[i.data("key")].hide = !0,
            e.data("tips", o),
            i.remove(),
            r(e),
            0 == a.children().length && a.addClass("hidden"),
            n.stopPropagation()
        })
    }
    function c(e) {
        var a = t(this);
        if (t.isEmptyObject(e)) {
            t(".tip-input").remove();
            var i = a.data("icon");
            i && (a.data("icon").remove(),
            a.data("icon", null)),
            a.data("tip-init", null),
            a.data("tips", null),
            a.data("tip-wrap", null);
            var o = a.data("position-ele");
            o && (o.off("focus.tips"),
            o.off("blur.tips")),
            a.data("position-ele", null),
            a.closest(".col").removeClass("select-hastip input-hastip combo-hastip")
        } else
            n.call(this)
    }
    var u = {
        page: function(e, a, n, i) {
            return !!t(e).hasClass("tab-pane") && (t(e).prepend(i),
            !0)
        },
        container: function(e, a, n, i) {
            return !!t(e).hasClass("ydpx-container") && (t(e).find(".panel-body").before(i),
            1 == a.hide && t(e).find(".panel-heading span").append(n.call(e, a, !1)),
            !0)
        },
        list: function(e, a, n, i) {
            return !!t(e).hasClass("datalist-table-body") && (t(e).closest(".fixtable-box").before(i),
            1 == a.hide && t(e).closest(".datalist-box").find(".datalist-button-bar>h5").append(n.call(e, a, !1)),
            !0)
        },
        money: function(e, a, n) {
            if (t(e).is(":input") && t(e).hasClass("money")) {
                t(e).data("inputField", !0);
                var i = t(e).parent().find(":input")
                  , o = n.call(e, a, !0);
                if (i.closest(".col").addClass("input-hastip"),
                t(e).data("position-ele", i),
                t(e).parent().hasClass("input-group")) {
                    var r = t(e).parent().find("span:last").width();
                    o.css({
                        right: 22 + r,
                        "z-index": 2
                    }),
                    t(e).parent().addClass("tip-parent").find("span:last").before(o)
                } else
                    t(e).parent().addClass("tip-parent").append(o);
                return !0
            }
            return !1
        },
        select: function(e, a, n) {
            return !("SELECT" != e.tagName || !t(e).is(":visible")) && (t(e).data("inputField", !0),
            t(e).closest(".col").addClass("select-hastip"),
            t(e).closest("td").length > 0 && t(e).parent().addClass("select-hastip"),
            t(e).data("position-ele", t(e)),
            t(e).parent().addClass("tip-parent").append(n.call(e, a, !0)),
            !0)
        },
        combobox: function(e, a, n) {
            if ("SELECT" == e.tagName && t(e).parent().find(".combobox-container").length > 0) {
                t(e).data("inputField", !0);
                var i = t(e).parent().find(".combobox");
                return i.closest(".col").addClass("combo-hastip"),
                t(e).data("position-ele", i),
                t(e).parent().addClass("tip-parent").append(n.call(e, a, !0)),
                !0
            }
            return !1
        },
        fieldset: function(e, a, n) {
            if ("FIELDSET" == e.tagName || "radio" == e.type || "checkbox" == e.type) {
                t(e).data("inputField", !0);
                var i = t(e).closest("fieldset");
                return i.closest(".col").addClass("input-hastip"),
                t(e).data("position-ele", i),
                t(e).parent().addClass("tip-parent").append(n.call(e, a, !0)),
                !0
            }
            return !1
        },
        input: function(e, a, n) {
            if ("INPUT" != e.tagName || t(e).hasClass("money"))
                return !1;
            t(e).data("inputField", !0),
            t(e).data("position-ele", t(e));
            var i = t(e).hasClass("date");
            t(e).parent().hasClass("input-group") && (i ? t(e).parent().wrap('<div class="tip-group-wrap"></div>') : t(e).wrap('<div class="tip-group-wrap"></div>'));
            var o = i ? "date-hastip" : "input-hastip";
            return t(e).closest(".col").addClass(o),
            t(e).parent().addClass("tip-parent").append(n.call(e, a, !0)),
            !0
        }
    };
    t(document).click(function() {
        t(this).data("stop") || t(".tip-input").remove()
    });
    var p = {
        init: function(a) {
            a = "string" == typeof a ? {
                type: "info",
                tip: a
            } : t.extend({
                type: "info"
            }, a);
            var i = t(this)
              , o = i.data("tip-init");
            if (o) {
                var r = t.extend({}, t(this).data("tips") || {});
                n.call(this, a.type);
                var l = s.call(this, a);
                if (a.key) {
                    var d = 1 == a.key ? a.type + "-key" : a.key;
                    r[d] ? (r[d].dom = l,
                    t(this).data("tips", r)) : t(this).data("tip-wrap").append(l)
                } else
                    t(this).data("tip-wrap").append(l)
            } else
                i.data("tip-init", !0),
                e.call(this, a)
        },
        remove: function(e) {
            var a = t(this).data("tips") || {}
              , n = t(this).data("inputField") || !1;
            n || a[e].dom.remove(),
            delete a[e],
            !n && t.isEmptyObject(a) && t(this).data("tip-wrap").remove(),
            c.call(this, a)
        },
        removeAll: function(e) {
            var a = t(this).data("tips") || {};
            t.each(a, function(t, n) {
                e == n.type && delete a[t]
            }),
            c.call(this, a)
        }
    }
      , h = {
        info: {
            wrap: "tip-warning",
            icon: "glyphicon-info-sign"
        },
        warn: {
            wrap: "tip-danger",
            icon: "glyphicon-alert"
        },
        error: {
            wrap: "tip-error",
            icon: "glyphicon-remove-sign"
        }
    };
    t.fn.tips = function(t) {
        return 1 === arguments.length ? this.each(function() {
            p.init.call(this, t)
        }) : (p[arguments[0]].call(this, Array.prototype.slice.call(arguments, 1)),
        this)
    }
    ,
    t.fn.tips.set = function(t, e) {
        u[t] = e
    }
}(jQuery),
function(t) {
    t.autoComplete = function(e, a, n) {
        function i(e) {
            e.length >= f.minLength && (t.isAjax(a) ? t.init.ajax(a, $.extend(n.term, {
                term: e
            }), function(t, a) {
                o(e, a),
                h.data("qdata", {
                    oridata: a,
                    q: e
                })
            }) : t.sendCommand(a, $.extend(n.term, {
                term: e
            }), function(a, n, i, r) {
                0 == n ? (o(e, r),
                h.data("qdata", {
                    oridata: r,
                    q: e
                })) : t.alert({
                    message: "查询出错",
                    desc: i
                })
            }))
        }
        function o(t, e) {
            if (d(h),
            !e || !e.data || 0 == e.data.length)
                return $('<div class="yd-ac">未查询到数据</div>').appendTo($("body")),
                s(h),
                void l(h);
            var a = []
              , n = e.colName || []
              , i = f.col;
            0 == n.length ? $.each(e.data[0], function(t, e) {
                n.push(t)
            }) : i = "string" == typeof f.col ? f.col : n[f.col],
            e.data[0][i] || $.each(e.data[0], function(t, e) {
                return i = t,
                !1
            }),
            $.each(e.data, function(t, e) {
                if (t == f.showRows)
                    return !1;
                var n = {
                    _otherValues: e,
                    _value: e[i]
                };
                f.templateSelection && (n._tplValue = f.templateSelection(e)),
                a.push(n)
            });
            var o = h.data("selected") || "";
            $(r(a, n, o, t)).appendTo($("body")),
            s(h),
            l(h)
        }
        function r(t, e, a, n) {
            var i = $('<div class="yd-ac"></div>');
            return $.each(t, function(t, o) {
                var r = $('<div class="yd-ac-row' + ("" != a && o._value == a ? " row-selected" : "") + '" data-value="' + o._value + '"' + (o._tplValue ? ' data-tplvalue="' + o._tplValue + '"' : "") + ">" + $.map(e, function(t, e) {
                    var a = f.colWidth ? "width:" + f.colWidth[e] + "px;" : "";
                    return '<div class="yd-ac-col" style="' + ("" == a ? "" : a) + '"><span>' + o._otherValues[t].replace(new RegExp("(" + n + ")","g"), "<b>$1</b>") + "</span></div>"
                }).join("") + "</div>");
                r.data("row", o),
                i.append(r)
            }),
            i
        }
        function s(t) {
            $("div.yd-ac").data("field", t);
            var e = t.offset()
              , a = parseInt(t.css("padding-top")) + parseInt(t.css("padding-bottom"))
              , n = parseInt(t.css("padding-left")) + parseInt(t.css("padding-right"));
            $("div.yd-ac").css({
                top: e.top + t.height() + a + 4,
                left: e.left,
                "min-width": t.width() + n
            })
        }
        function l(t) {
            $("div.yd-ac").on("click", ".yd-ac-row", function(e) {
                u(t, $(this), e)
            }).on("mouseenter", function() {
                t.data("isblur", !1)
            }).on("mouseleave", function() {
                t.data("isblur", !0)
            }),
            $("body,div:not(.yd-ac)").on("scroll", c)
        }
        function d(t) {
            t.data("isblur", !0),
            $("div.yd-ac").remove(),
            $("body,div").off("scroll", c)
        }
        function c() {
            var t = $("div.yd-ac").data("field");
            t.length > 0 && s(t)
        }
        function u(t, e, a) {
            var n = e.data("row")
              , i = t.data("selected") || ""
              , o = n._value;
            if (f.onSelect && f.onSelect.call(t[0], n._value, n._otherValues) === !1)
                return void d(t);
            var r = t.val();
            f.templateSelection ? t.val(n._tplValue).data("selected", n._value).data("tplvalue", n._tplValue) : t.val(n._value).data("selected", n._value),
            (i != o || "" == r && "" != o) && (t.data("change", !0),
            f.onChange && f.onChange.call(t[0], a, n._value, n._otherValues),
            t.change(),
            t.data("change", !1)),
            d(t)
        }
        function p(t, e) {
            $("div.yd-ac-row").removeClass("hover");
            var a, n = "down" == e ? "first" : "last";
            if ("" == t.value)
                a = $("div.yd-ac-row:" + n);
            else {
                var i = f.templateSelection ? "tplvalue" : "value"
                  , o = $("div.yd-ac-row[data-" + i + "=" + t.value + "]")
                  , r = "down" == e ? o.next() : o.prev();
                a = r.length > 0 ? r : $("div.yd-ac-row:" + n)
            }
            a.addClass("hover"),
            t.value = a.data(i) || "",
            $(".yd-ac").scrollTop(a.height() * a.index())
        }
        n || (n = {}),
        e = t.getDom(e);
        var h = $(e)
          , f = $.extend({
            highlight: !0,
            minLength: 2,
            showRows: 5,
            col: 0
        }, n);
        h.on("keyup paste", function(e) {
            if (e.which == t.common.keys.Up)
                p(this, "up");
            else if (e.which == t.common.keys.Down)
                p(this, "down");
            else {
                if (e.which == t.common.keys.Enter)
                    return !1;
                if (f.validate && f.validate.call(this, this.value) === !1)
                    return !1;
                i(this.value)
            }
        }).on("keydown", function(e) {
            e.which == t.common.keys.Enter && ($("div.yd-ac-row.hover").length > 0 ? u(h, $("div.yd-ac-row.hover"), e) : $("div.yd-ac-row.row-selected").length > 0 && u(h, $("div.yd-ac-row.row-selected"), e))
        }).on("focus", function() {
            var t = $(this).data("qdata");
            t && o(t.q, t.oridata)
        }).on("blur", function() {
            0 != $(this).data("isblur") && ($("div.yd-ac").length > 0 && $("div.yd-ac-row.hover").length > 0 && $(this).data("selected") && ($(this).data("tplvalue") ? this.value = $(this).data("tplvalue") : this.value = $(this).data("selected")),
            d(h))
        }).on("change", function(t) {
            return 1 != $(this).data("change") && 0 != $(this).data("isblur") && void (f.onChange && f.onChange.call(this, t, this.value, {}))
        })
    }
}(window.ydl ? ydl : window.ydl = {}),
function(t) {
    t.frame = {},
    t.frame.add = function(e, a) {
        function n(t, e) {
            var a = top.addTab(t, e);
            return a
        }
        var i = $.Deferred();
        if (t.isInFrame()) {
            if (!top.allowAddTab())
                return t.toast("页签数量已达到上限"),
                !1;
            var o = top.isExistTab(e);
            o && "true" != t.sessionData("plat_tab_noinfo") ? t.customDialog({
                title: "确认打开新页签",
                text: "已打开过此页面，请确认是否再打开另外一个新页签？",
                buttons: "在新页签中打开,切换到现有页签,取消",
                open: function() {
                    $(this).find(".layui-layer-btn").append('<label class="pull-left checkbox-inline"><input type="checkbox"> 本次登录不再提示</label>'),
                    $(this).on("change", ".layui-layer-btn :checkbox", function() {
                        t.sessionData("plat_tab_noinfo", this.checked)
                    })
                },
                callback: function(r) {
                    0 == r ? (t.sessionData("plat_tab_type", "0"),
                    i.resolve(n(e, a))) : 1 == r ? (t.sessionData("plat_tab_type", "1"),
                    top.showTab(o),
                    i.resolve(o)) : i.reject()
                }
            }) : o && "true" == t.sessionData("plat_tab_noinfo") && "1" == t.sessionData("plat_tab_type") ? (top.showTab(o),
            i.resolve(o)) : i.resolve(n(e, a))
        }
        return i.promise()
    }
    ,
    t.frame.open = function(e) {
        t.isInFrame && t.isInFrame() && top.showTab(e)
    }
    ,
    t.frame.close = function(e) {
        t.isInFrame && t.isInFrame() && top.delTab(e)
    }
    ,
    t.isInFrame = function() {
        var t = pageData.poolSelect.$page;
        return !!(t && /\/frameset$/.test(t) || top !== self && 1 == top.isInFrame)
    }
    ,
    t.frame.refresh = function(t) {
        top.refreshTab(t)
    }
}(window.ydl ? ydl : window.ydl = {}),
function(t) {
    t.showBatchData = function(e, a, n) {
        function i(e) {
            var a = e.locationKey;
            if (a.length > 0 && "" != a[0].id && null != a[0].id)
                $.each(a, function(a, n) {
                    n.id && t.data.dataList[n.id] && t.init.dataList({
                        id: n.id,
                        batchErrorInfo: {
                            batchNo: e.batchNo,
                            locationKey: n.key,
                            batchList: !0
                        }
                    }, "batcherror", t.data.dataList[n.id].thisTab)
                });
            else if (t.data.dataList) {
                var n = "";
                for (var i in t.data.dataList)
                    if ("" == n && (n = i),
                    $("#" + i).hasClass("batch-error-list")) {
                        n = i;
                        break
                    }
                "" != n && t.init.dataList({
                    id: i,
                    batchErrorInfo: {
                        batchNo: e.batchNo,
                        locationKey: a[0].key
                    }
                }, "batcherror", t.data.dataList[n].thisTab)
            }
        }
        var o = !1;
        if (e && e.locationKey && (n && t.alert({
            message: "出错了",
            desc: n,
            code: a
        }),
        i({
            locationKey: e.locationKey,
            batchNo: e.batchNo
        }),
        o = !0),
        e && e.batchData)
            if (e.batchData.data) {
                o = !0,
                n && t.alert({
                    message: "出错了",
                    desc: n,
                    code: a
                });
                var r = '<div class="panel panel-danger"><div class="panel-heading">您提交的数据存在以下错误，请更正后重新提交</div><div class="panel-body"><table class="fixhead table table-hover"><thead><tr><th class="errorlist-col1">记录号</th><th class="errorlist-col2">错误字段名</th><th class="errorlist-col3">错误值</th><th class="errorlist-col4">出错原因</th></tr></thead></table><div class="errorlist-wrap"><table class="table table-hover" id="flowBatchErrorList"><thead class="hide"><tr><th>记录号</th><th>错误字段名</th><th>错误值</th><th>出错原因</th></tr></thead><tbody>' + $.map(e.batchData.data, function(e) {
                    var a = "1" != e.infotype
                      , n = t.getField(e.locationKey);
                    n.error && a && n.error.addClass("has-error");
                    var i = n.tips;
                    return i && i.tips({
                        type: a ? "error" : "info",
                        tip: e.reason
                    }),
                    '<tr data-key="' + e.locationKey + '" class="' + (a ? "data-error" : "data-info") + '"><td class="errorlist-col1">' + e.seqno + '</td><td class="errorlist-col2">' + e.item + '</td><td class="errorlist-col3">' + e.content + '</td><td class="errorlist-col4">' + e.reason + "</td></tr>"
                }).join("") + "</tbody></table></div></div></div>"
                  , s = $(r);
                if (s.on("click", "tr:gt(0)", function() {
                    s.find("tr").removeClass("info"),
                    $(this).addClass("info");
                    var e = $(this).data("key")
                      , a = t.getField(e)
                      , n = a.focus;
                    n && ($("#pageTabs").one("tabshown", function() {
                        n.focus().trigger("mouseenter")
                    }),
                    $(".tab").one("shown.bs.tab", function() {
                        n.focus().trigger("mouseenter")
                    }),
                    n.closest(".tab-pane").is(".active") || n.closest(".container-tabs").find(".tab:eq(" + n.closest(".tab-pane").index() + ")").tab("show"),
                    n.parents(".tab-pane").last().is(".active") || n.parents(".tab-pane").last().index() >= 0 && pageTabs[n.parents(".tab-pane").last().index()].open())
                }),
                $("#flowBatchError").html(s),
                0 == $("#batchError").length) {
                    $("#pageTabs>ul").append('<li class=""><a data-toggle="tab" href="#batchError">批量错误</a></li>');
                    var l = $('<div class="tab-pane ydpx-page fade in" data-tabid="error" id="batchError" data-pageid="batchError" data-pagename="批量错误"></div>');
                    l.append($("#flowBatchError")),
                    $("#pageTabs>.tab-content").append(l),
                    $("#pageTabs").trigger("pageTabs.add"),
                    $('a[href="#batchError"]').on("shown.bs.tab", function(t) {
                        $("#flowBatchError .errorlist-wrap").scrollTop(0)
                    }).tab("show")
                }
            } else
                $("#flowBatchError").html("");
        return o
    }
    ,
    t.getField = function(e) {
        var a = t.getDom(e)
          , n = a ? $(a) : void 0
          , i = {
            error: n,
            focus: n,
            tips: n
        };
        return a ? "SELECT" == a.tagName && n.hasClass("combobox") ? (i.error = n.prevAll(".combobox-container"),
        i.focus = n.parent().find(".combobox-container input.combobox")) : n.hasClass("money") && (i.error = n.next(),
        i.focus = n.next()) : "string" == typeof e && $("#group_" + e).hasClass("multivalue") && (i.error = i.focus = i.tips = $("#group_" + e)),
        i
    }
}(window.ydl ? ydl : window.ydl = {}),
"undefined" == typeof ydl && alert("ydl.ydpx.js必须在ydl.base.js之后加载"),
function(t, e) {
    t.initContainer = function() {
        window.poolSelect && (t.attribute.data = JSON.parse(poolSelect._ATTRIBUTES || "{}")),
        e(".checkbox-check-all").click(function() {
            e(this).closest(".checkbox-container").find('[type="checkbox"]').not(this).prop("checked", this.checked)
        }),
        e(".ydpx-container>.panel-heading>span,.datalist-button-bar>h5").each(function() {
            e(this).html(e(this).html().replace(/^(.*?)([(（].*[）)])(.*?)$/g, "$1<small>$2</small>$3"))
        }),
        e("body").on("keypress", 'input[type!="button"]', function(a) {
            var n = a.which;
            if (0 != n && n != t.common.keys.Backspace && n != t.common.keys.Enter) {
                var i = e(this).attr("data-type")
                  , o = e(this).attr("data-negative")
                  , r = "";
                if (i) {
                    switch (i) {
                    case "date":
                        r = "0123456789-";
                        break;
                    case "time":
                        r = "0123456789:";
                        break;
                    case "month":
                    case "longmonth":
                    case "day":
                    case "longday":
                    case "yyyymm":
                    case "number":
                    case "int":
                    case "zipcode":
                    case "encnumber":
                        r = "0123456789";
                        break;
                    case "float":
                    case "ipv4":
                        r = "0123456789.";
                        break;
                    case "money":
                        r = "true" == o ? "0123456789.-" : "0123456789.";
                        break;
                    case "phone":
                        r = "0123456789()-";
                        break;
                    case "phones":
                        r = "0123456789()- ;,";
                        break;
                    case "idcard":
                        r = "0123456789Xx"
                    }
                    var s = a["char"] || String.fromCharCode(a.which);
                    if (r && s && r.indexOf(s) == -1)
                        return !1
                }
            }
        }),
        e("#pageMain").on("scroll.datetimepicker", function() {
            e(".datetimepicker").hide()
        }),
        e(window).on("scroll.datetimepicker", function() {
            e(".datetimepicker").hide()
        })
    }
    ,
    t.displayRunning = function(t) {
        if (0 == t)
            e("body").hasClass("has-running-overlay") && (e("body").removeClass("has-running-overlay"),
            e("#ajax-running-overlay").remove());
        else if (0 == e("body").hasClass("has-running-overlay")) {
            var a = e(window).height()
              , n = e(document).width();
            e("body").addClass("has-running-overlay"),
            $$("ajax-running-overlay") || e('<div id="ajax-running-overlay"></div>').height(a).width(n).appendTo("body")
        }
    }
    ,
    t.confirmData = function(a, n, i, o) {
        var r = [];
        e.each(e.isArray(a) ? a : a.split(","), function(e, a) {
            r.push([t.getLabel(a), t.getValue(a, !0)])
        }),
        r.length > 0 ? t.customDialog({
            message: n || "请确认以下信息",
            list: {
                head: ["项目", "内容"],
                body: r
            },
            callback: function(t) {
                o(0 == t ? !0 : !1)
            }
        }) : o(!0)
    }
    ,
    t.sendCommand = function(a, n, i, o) {
        var r = t.contexPath + "/flow/command/" + poolSelect._WF + "/" + poolSelect._ST + "/" + a + "/" + poolSelect._POOLKEY
          , s = e.Deferred();
        return t.ajax(r, e.extend(t.getInputs(!0), n), function(t, a) {
            if (e.isFunction(i)) {
                var n = i(t, a.returnCode, a.message, a);
                void 0 === n || n ? s.resolve(t) : s.reject(t, a.returnCode, a.message, a)
            } else
                s.resolve(a.data)
        }, {
            silent: o && o.silent,
            handleError: function(a, n, o) {
                if (t.showBatchData(a, n, o),
                e.isFunction(i)) {
                    var r = i(null, n, o, a);
                    r ? s.resolve(a.data) : s.reject(o)
                } else
                    t.alert({
                        message: "错误信息",
                        desc: o,
                        code: n
                    }),
                    s.reject(o)
            },
            beforeSend: function() {
                t.displayRunning(!0)
            },
            complete: function() {
                t.displayRunning(!1)
            }
        }),
        s.promise()
    }
    ,
    t.subPage = function(a, n, i) {
        var o = /^(\/|http)/.test(a)
          , r = {}
          , s = {};
        t.data.dataList && e.each(t.data.dataList, function(t) {
            s[t] = this
        }),
        t.data.listParameter && e.each(t.data.listParameter, function(t) {
            r[t] = this
        });
        var l = location.protocol + "//" + location.host + t.contexPath
          , d = /\?/.test(a) ? "&" : "?"
          , c = o ? (/^\//.test(a) ? l : "") + a + d + "callback=?" : l + "/flow/subpage/" + poolSelect._WF + "/" + a + "/" + poolSelect._POOLKEY + "?callback=?";
        return o && (n || (n = {}),
        n._POOLKEY = poolSelect._POOLKEY),
        e.ajax({
            url: c,
            data: n,
            type: o ? "GET" : "POST",
            dataType: "jsonp",
            jsonp: "callback"
        }).done(function(a) {
            function o(t, e) {
                return ejs.render(t, e, {
                    delimiter: "$"
                })
            }
            var l = n && n.dialogVersion
              , d = n && n.dialogSize;
            a.listId = [];
            var c = a.ydpxData[0]
              , u = {
                close: function() {
                    h.dialog("close")
                },
                page: c.pageName,
                ydpxData: c
            }
              , p = o(c.frameHtml, c);
            c.data._render = tpl.renders(c.data),
            p = o(p, c.data);
            var h = e('<div class="subpage-container"></div>').append(p).appendTo(e("body")).dialog({
                title: c.data.page_title,
                dialogVersion: l,
                close: !0,
                size: d || "lg",
                shown: function(n, o) {
                    for (var d = a.ydpxScript(), c = 1; c < d.length; c++)
                        d[c].call(h, u);
                    if (d[0].call(h, u),
                    u.subPageButtons)
                        if (l) {
                            var p = "";
                            e.each(u.subPageButtons, function() {
                                p += '<button class="btn ' + (this.theme || "btn-default") + '" type="button" id=' + this.id + ">" + this.text + "</button>",
                                this.close && h.on("click", "#" + this.id, function() {
                                    h.dialog("close")
                                })
                            }),
                            h.find(".modal-footer").append(p)
                        } else {
                            var f = e.map(u.subPageButtons, function(t, e) {
                                return '<a id="' + t.id + '" class="layui-layer-btn' + e + '">' + t.text + "</a>"
                            }).join("");
                            h.closest(".modal").append('<div class="layui-layer-btn layui-layer-btn-">' + f + "</div>")
                        }
                    if (e.isFunction(u.pageOnload) && u.pageOnload(i),
                    t.data.dataList && e.each(t.data.dataList, function(t) {
                        s.hasOwnProperty(t) || a.listId.push({
                            type: "datalist",
                            id: t
                        })
                    }),
                    t.data.listParameter && e.each(t.data.listParameter, function(t) {
                        r.hasOwnProperty(t) || a.listId.push({
                            type: "list",
                            id: t
                        })
                    }),
                    !l) {
                        var g = {};
                        n.height() > document.documentElement.clientHeight ? (g.height = document.documentElement.clientHeight - 60,
                        g.top = 30) : (g.top = (document.documentElement.clientHeight - n.height()) / 2,
                        g["max-height"] = document.documentElement.clientHeight - 60),
                        h.dialog("style", g)
                    }
                },
                hidden: function() {
                    e.each(a.listId, function() {
                        "datalist" == this.type ? (delete t.data.dataList[this.id],
                        e("#" + this.id + "_editor").closest(".modal").next(".datetimepicker").addBack().remove()) : "list" == this.type && delete t.data.listParameter[this.id]
                    }),
                    h.remove()
                }
            });
            h.dialog("open")
        })
    }
    ,
    e.fn.moneyinput = function() {
        function a(e) {
            if ("" !== e && e.indexOf(",") < 0)
                return e = t.addComma(parseFloat(e).toFixed(i)),
                "NaN" == e && (e = ""),
                e
        }
        var n = this;
        if (n.is('[type="hidden"]'))
            return n;
        var i = n.attr("data-declen");
        i = void 0 === i || "" === i ? 2 : parseInt(i),
        n.on("keydown.money", function(t) {
            var e = n.val()
              , a = ""
              , o = ""
              , r = 0
              , s = 0
              , l = 0;
            if (o = isNaN(t.key) && "." != t.key && "Decimal" != t.key ? "" : "Decimal" == t.key ? "." : t.key,
            (this.selectionStart || 0 == this.selectionStart) && (r = this.selectionStart,
            s = this.selectionStart,
            l = this.selectionEnd),
            a = s >= l ? e.substr(0, r) + o + e.substring(r, e.length) : e.substr(0, s) + o + e.substring(l, e.length),
            "" != o) {
                var d = new RegExp("^(\\d{0," + (17 - i - 1) + "})$");
                if (!d.test(a) || "9999999999999999" == a) {
                    var c = new RegExp("^\\d{1," + (17 - i - 1) + "}\\.\\d{0," + i + "}$");
                    if (!c.test(a) || "0" == i)
                        return !1
                }
            }
        });
        var o = n.prop("readonly") ? " readonly" : ""
          , r = e('<input type="text" class="form-control input-sm money-display"' + o + " />");
        return n.after(r).hide().on("blur.money", function() {
            e(this).hasClass("has-error") || (e(this).hide(),
            r.val(a(this.value)).show())
        }),
        r.val(a(n.val())).on("focus.money", function() {
            e(this).hide(),
            n.show().focus()
        }),
        n
    }
    ,
    e.fn.datepicker = function(t, a) {
        return this.each(function() {
            var n = this
              , i = e(n)
              , o = i.closest("table").hasClass("ydpx-datalist") || 0 == i.parent().children(".input-group-addon").length
              , r = o ? i : i.parent();
            if ("string" == typeof t)
                return r.data("ready") || r.datetimepicker(r.data("date-options")).data("ready", !0),
                void (e.isFunction(a) ? r.on(t, function(t) {
                    var e = t.date
                      , i = new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getUTCHours(),e.getMinutes(),e.getSeconds());
                    a.call(n, i)
                }) : r.datetimepicker(t, a));
            if (t || (t = r.data("date-options")),
            t) {
                var s = "true" == r.data("init");
                s && r.datetimepicker("remove")
            } else
                t = {
                    19: {
                        format: "yyyy-mm-dd hh:ii:ss",
                        minView: "hour"
                    },
                    16: {
                        format: "yyyy-mm-dd hh:ii",
                        minView: "hour"
                    },
                    8: "time" === i.data("type") ? {
                        format: "hh:ii:ss",
                        minView: "hour",
                        maxView: "day",
                        startView: "day"
                    } : {
                        format: "yyyymmdd",
                        minView: "month",
                        startView: "month"
                    },
                    7: {
                        format: "yyyy-mm",
                        minView: "year",
                        startView: "year",
                        forceParse: !1
                    },
                    6: {
                        format: "yyyymm",
                        minView: "year",
                        startView: "year",
                        forceParse: !1
                    },
                    5: {
                        format: "hh:ii",
                        minView: "hour",
                        maxView: "day",
                        startView: "day"
                    },
                    4: {
                        format: "yyyy",
                        minView: "decade",
                        startView: "decade"
                    }
                }[this.maxLength] || {};
            this.readOnly ? (r.datetimepicker("remove"),
            r.children(".input-group-addon").off("click")) : (t = e.extend({
                format: "yyyy-mm-dd",
                autoclose: !0,
                minView: "month",
                minuteStep: 1,
                todayBtn: !0,
                todayHighlight: !0,
                language: "zh-CN",
                pickerPosition: o ? "bottom-right" : "bottom-left",
                forceParse: !1
            }, t),
            e.isFunction(e.fn.datetimepicker.customOptions) && e.fn.datetimepicker.customOptions(t),
            r.data("date-options", t),
            (o ? r : r.children(".input-group-addon")).one("click", function() {
                t = r.data("date-options"),
                r.data("init", !0),
                r.datetimepicker(t).data("ready", !0),
                o ? e(this).blur().focus() : e(this).click()
            }))
        }),
        this
    }
    ;
    var a = pageData.pageConfig && pageData.pageConfig.mudics;
    t.mudic = {
        getMask: function(e) {
            return a && a.mask ? a.mask[e] ? a.mask[e] : e : (t.alert("开发人员没有在流程配置文件中配置mudics节点"),
            e)
        },
        getValByMask: function(e, n) {
            if (a && a.mask) {
                var i = a.mask
                  , o = null;
                for (var r in i)
                    if (r.indexOf(e) > -1 && i[r] == n) {
                        var s = r.split(".");
                        s.length > 0 && (o = s[s.length - 1])
                    }
                return o
            }
            return t.alert("开发人员没有在流程配置文件中配置mudics节点"),
            null
        },
        getName: function(e) {
            return a && a.name ? a.mask[e] ? a.name[e] : "" : (t.alert("开发人员没有在流程配置文件中配置mudics节点"),
            "")
        },
        getListCache: {},
        getList: function(a, n) {
            var i = e.Deferred()
              , o = t.contexPath + "/flow/mudic/" + a + "/" + poolSelect._POOLKEY
              , r = t.mudic.getListCache[a];
            return r ? (e.isFunction(n) && n(r),
            i.resolve(r)) : t.ajax(o, {}, function(o, r) {
                t.mudic.getListCache[a] = o,
                e.isFunction(n) && n(o),
                i.resolve(o)
            }).fail(function(t, e) {
                i.reject(t, e)
            }),
            i.promise()
        }
    },
    t.attribute = {
        data: {},
        set: function(e, a) {
            t.attribute.data[e] = a
        },
        get: function(e) {
            return t.attribute.data[e]
        }
    },
    t.setRowsVisible = function(a, n, i) {
        var a = t.getDom(a) || document.getElementById(a)
          , n = t.getDom(n) || document.getElementById(n);
        if (!a)
            return t.log("ydl.setRowsVisible出错：找不到指定的开始组件", "red"),
            null;
        var o = "form-group" == a.className ? e(a) : e(a).closest(".form-group")
          , r = n ? "form-group" == n.className ? e(n).next() : e(n).closest(".form-group").next() : null;
        return o.nextUntil(r).addBack().each(function() {
            i || void 0 === i ? e(this).show() : e(this).hide()
        })
    }
    ,
    t.foldHeader = function(t, a) {
        var n = e("#" + t + " div.table-caption");
        return n.eq(0).hasClass("foldable") ? n : n.each(function(t) {
            var i = e('<span class="glyphicon glyphicon-triangle-bottom" style="float:left;"></span>')
              , o = n.eq(t + 1).parent()
              , r = e(this).prepend(i).addClass("foldable").on("click", function() {
                r.hasClass("folded") ? (r.removeClass("folded").parent().nextUntil(o).removeClass("hide"),
                i.removeClass("glyphicon-triangle-right").addClass("glyphicon-triangle-bottom")) : (r.addClass("folded").parent().nextUntil(o).addClass("hide"),
                i.removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-right"))
            });
            a && r.click()
        })
    }
    ,
    e.fn.addIcon = function(t) {
        return this.is(":button") ? this.prepend('<span class="glyphicon glyphicon-' + t + '" />') : this
    }
    ,
    t.flowChart = function(t, a) {
        function n(t, a) {
            return e.isPlainObject(a) ? '<li data-id="' + a.id + '" class="flow-chart-' + t + '"><div></div><span>' + a.text + "</span></li>" : '<li class="flow-chart-' + t + '"><div></div><span>' + a + "</span></li>"
        }
        var i = e('<ul class="flow-chart"></ul>');
        i.append(n("start", "业务流程开始")),
        e.each(t.prev || [], function() {
            i.append(n("prev", this))
        }),
        t.current && i.append(n("current", t.current)),
        e.isArray(t.next) ? (e.each(t.next, function() {
            i.append(n("nextall", this))
        }),
        i.append(n("end", "业务流程结束"))) : "?" === t.next ? i.append(n("branch", "业务流程分支")) : t.next ? i.append(n("next", t.next)) : i.append(n("end", "业务流程结束"));
        var o = 7;
        void 0 === a && (a = o);
        var r = i.children();
        if (0 !== a && r.length > Math.abs(a)) {
            var s = function() {
                e(this).siblings().show().end().remove()
            };
            a > 0 ? (r.slice(0, r.length - a).hide(),
            e(n("expand-l", "点击这里<br />展开所有步骤")).on("click", s).prependTo(i)) : (r.slice(-a).hide(),
            e(n("expand-r", "点击这里<br />展开所有步骤")).on("click", s).appendTo(i))
        }
        return i
    }
    ,
    t.progressBar = function(t, a) {
        a = e.extend({
            animation: !1
        }, a),
        e.isArray(t) || (t = [t]);
        var n = e.map(t, function(t) {
            e.isPlainObject(t) || (t = {
                value: t
            }),
            t = e.extend({}, a, t);
            var n = "" === t.text ? "" : t.text || t.value + "%";
            return '<div class="progress-bar' + (t.animation ? " progress-bar-striped active" : "") + (t.style ? " progress-bar-" + t.style : "") + '" role="progressbar" style="width: ' + t.value + "%;" + (t.color ? "background-color:" + t.color : "") + '">' + (n ? "" : '<span class="sr-only">') + n + (n ? "" : "</span>") + "</div>"
        }).join("");
        return '<div class="progress">' + n + "</div>"
    }
    ,
    t.tabs = function(t) {
        function a(t) {
            var a, n = e("#" + t);
            return a = n.hasClass("list-container") || n.hasClass("box-container") ? n.find(".datalist-button-bar h5") : n.children(".panel-heading"),
            [a.text().trim(), a]
        }
        "string" == typeof t && (t = e.map(t.split(","), function(t) {
            return {
                id: t
            }
        }));
        var n = e("#" + t[0].id.split(",")[0]).wrap('<div class="tab-content"></div>').parent()
          , i = n.before('<ul class="nav nav-tabs"></ul>').prev()
          , o = n.add(i).wrapAll('<div class="container-tabs"></div>').parent();
        return e.each(t, function(t, o) {
            var r = o.id
              , s = "tab_" + r.replace(/,/g, "_")
              , l = [];
            n.append('<div class="tab-pane fade' + (0 == t ? " in active" : "") + '" id="' + s + '"></div>');
            var d;
            e.each(r.split(","), function(t, n) {
                var i = a(n);
                i[0] && (l.push(i[0]),
                d = i[1]),
                e("#" + n).appendTo("#" + s)
            });
            var c = o.title || l.join("") || s;
            !o.title && 1 == l.length && d && d.hide();
            var u = e('<a href="#' + s + '" class="tab" data-toggle="tab">' + c + "</a>");
            u.wrap("<li" + (0 == t ? ' class="active"' : "") + "></li>").parent().appendTo(i),
            u.on("show.bs.tab hide.bs.tab", function(t) {
                var a = e(e(t.target).attr("href"));
                if (e.isFunction(o[t.type])) {
                    var n = o[t.type].call(a, t, t.target, t.relatedTarget);
                    n === !1 && t.preventDefault()
                }
            }),
            u.on("shown.bs.tab hidden.bs.tab", function(t) {
                var a = e(e(t.target).attr("href"));
                e.isFunction(o[t.type]) && o[t.type].call(a, t, t.target, t.relatedTarget)
            })
        }),
        o
    }
    ,
    t.userConfig = {
        set: function(e, a) {
            return t.ajax(t.contexPath + "/saveConfig/" + e, a, null, {
                processData: !1,
                contentType: "text/plain"
            }).done(function() {
                userConfig[e] = a
            })
        },
        get: function(t) {
            var e = userConfig[t];
            return e
        }
    },
    t.buttonAccess = function(a) {
        if (pageData.buttonAccess) {
            var n = {};
            if (a) {
                if (!pageData.buttonAccess[a])
                    return;
                n[a] = pageData.buttonAccess[a]
            } else
                n = pageData.buttonAccess;
            e.each(n, function(a, n) {
                if ("button" == n.type) {
                    var i = t.getDom(a);
                    i && (i.disabled = !n.access)
                } else if ("datalist" == n.type) {
                    var o = e("#" + a + "_button_bar button");
                    o.each(function(e, a) {
                        var i = t.getDom(a);
                        i && (i.disabled = !n.access)
                    })
                }
            })
        }
    }
    ,
    t.imageNotice = function(t) {
        var a = e("#" + t.id);
        a.addButton(t.buttonText, function(a) {
            var n = e(a)
              , i = t.url
              , o = n.next(".image-notice");
            if (0 == o.length) {
                n.after('<img class="image-notice" id="' + t.id + 'ImageNotiec" style="display:none;" src="' + i + '"  />');
                new Viewer(e("#" + t.id + "ImageNotiec")[0],{
                    navbar: !1
                })
            }
            e("#" + t.id + "ImageNotiec").click()
        }, t.buttonId ? t.buttonId : ""),
        t.tips && a.tips(t.tips)
    }
}(ydl, jQuery),
function(t) {
    function e(e) {
        var s = this;
        if (s.data(a))
            return window.console && console.log("ydPageBar has already initialized."),
            s;
        e = o.normlizeSettings(t.extend({}, n, e));
        var l = t('<div class="' + a + '"></div>').data("yd-widget", "ydPageBar").data(a + "-settings", e);
        (e.container || s)[e.insert](l.addClass(a + "-insert-" + e.insert)),
        s.data(a, l).addClass("has-" + a),
        e.triggerTurn = function(t, e) {
            return s.triggerHandler("turn.ydl.pagebar", {
                pageNo: t,
                target: e
            })
        }
        ,
        e.triggerTurned = function(t) {
            s.trigger("turned.ydl.pagebar", t)
        }
        ;
        var d = i[e.render];
        return l.addClass(a + "-render-" + e.render),
        e.theme && l.addClass(a + "-theme-" + e.theme),
        e.renderCallback = d.call(s, l, e, e.gotoPage || t.noop, a, o),
        s.trigger("inited.ydl.pagebar", {
            settings: e,
            $bar: l
        }),
        e.autoLoad && r["goto"].call(s, e.pageNo),
        s
    }
    var a = "yd-pagebar"
      , n = {
        pageNo: void 0,
        pageSize: 10,
        totalRows: 0,
        insert: "append",
        container: void 0,
        render: "general",
        theme: void 0,
        autoHide: !1,
        autoLoad: !1,
        infoTemplate: "第 ${pageNo} / ${totalPages} 页",
        totalTemplate: ["无查询结果", "共 ${totalRows} 条记录"],
        pageSizeTemplate: "每页 ${} 条",
        showInfo: !0,
        showTotal: !0,
        showPageSize: [5, 10, 20, 50, 100],
        showPageLinks: !1,
        pageLinksLayout: [2, 5, 2],
        showArrows: !0,
        showEnds: !0,
        showGoto: !0,
        showRefresh: !1
    }
      , i = {
        general: function(e, a, n, i, o) {
            var r = i + "-button " + i + "-button-"
              , s = function(n) {
                t.extend(a, n),
                o.normlizeSettings(a),
                n = {
                    pageNo: a.pageNo,
                    pageSize: a.pageSize,
                    totalRows: a.totalRows,
                    totalPages: a.totalPages
                },
                e[n.totalRows ? "removeClass" : "addClass"](i + "-no-record"),
                e.find("." + i + "-info").html(o.renderText(a.infoTemplate, n)),
                e.find("." + i + "-total-rows").html(o.renderText(t.isArray(a.totalTemplate) ? a.totalTemplate[0 == n.totalRows ? 0 : 1] : a.totalTemplate, n)),
                e.find("." + i + "-links").html(o.pageLinks(a.pageLinksLayout, a)),
                e.find("." + i + "-page-size").val(a.pageSize),
                e.find("." + i + "-target").val(n.pageNo),
                e.find("." + i + "-button-first,." + i + "-button-prev")[n.pageNo <= 1 ? "addClass" : "removeClass"]("disabled"),
                e.find("." + i + "-button-next,." + i + "-button-last")[n.pageNo >= n.totalPages ? "addClass" : "removeClass"]("disabled"),
                a.autoHide && e[n.totalPages > 1 ? "show" : "hide"](),
                a.triggerTurned(n)
            }
              , l = function() {
                var t = e.find("." + i + "-target")
                  , n = parseInt(t.val());
                return (isNaN(n) || n < 1) && (n = 1),
                n > a.totalPages && (n = a.totalPages),
                t.val(n),
                n
            };
            return e.html((a.showPageSize ? o.pageSizeSelect(a.showPageSize, a) : "") + (a.showArrows && a.showEnds ? '<a class="' + r + 'first" data-target="first"><span></span></a>' : "") + (a.showArrows ? '<a class="' + r + 'prev" data-target="prev"><span></span></a>' : "") + (a.showInfo ? '<span class="' + i + '-info"></span>' : "") + (a.showTotal ? '<span class="' + i + '-total-rows"></span>' : "") + (a.showPageLinks ? '<div class="' + i + '-links"></div>' : "") + (a.showArrows ? '<a class="' + r + 'next" data-target="next"><span></span></a>' : "") + (a.showArrows && a.showEnds ? '<a class="' + r + 'last" data-target="last"><span></span></a>' : "") + (a.showGoto ? '<div class="' + i + '-goto"><input class="' + i + '-target" type="text"><button class="' + r + 'go" data-target="go" type="button" title="前往"><span></span></button></div>' : "") + (a.showRefresh ? '<button class="' + r + 'refresh" data-target="refresh" type="button" title="刷新"><span></span></button>' : "")).on("click", "." + i + "-button:not(.disabled)", function() {
                var e, i = a.pageNo, o = t(this);
                switch (o.data("target")) {
                case "first":
                    e = 1;
                    break;
                case "prev":
                    e = i - 1;
                    break;
                case "next":
                    e = i + 1;
                    break;
                case "last":
                    e = a.totalPages;
                    break;
                case "go":
                    e = l();
                    break;
                case "refresh":
                    e = i
                }
                a.triggerTurn(i, e) !== !1 && (a.pageNo = e,
                n(s, e, a.pageSize))
            }).on("change", "." + i + "-page-size", function() {
                a.triggerTurn(a.pageNo, 1) !== !1 && (a.pageSize = parseInt(this.value),
                n(s, 1, a.pageSize))
            }).on("click", "." + i + "-link:not(.active)", function() {
                var e = t(this).data("page");
                if (a.triggerTurn(a.pageNo, e) !== !1)
                    return n(s, e, a.pageSize),
                    !1
            }).on("keydown", "." + i + "-target", function(e) {
                13 === e.which && t(this).blur()
            }).on("change", "." + i + "-target", function(t) {
                n(s, l(), a.pageSize)
            }).on("focus", "." + i + "-target", function() {
                this.select()
            }),
            s(a),
            s
        }
    }
      , o = {
        renderText: function(t, e) {
            "object" != typeof e && (e = Array.prototype.slice.call(arguments, 1));
            var a = 0;
            return t.replace(/\$?\$\{(.*?)\}/g, function(t, n) {
                return 0 === t.indexOf("$$") ? t.substr(1) : String(e["" === n ? a++ : n]) || ""
            })
        },
        normlizeSettings: function(t) {
            return void 0 === t.pageNo && (t.pageNo = t.totalRows > 0 ? 1 : 0),
            t.totalPages = Math.ceil(t.totalRows / t.pageSize),
            t.pageNo > t.totalPages && (t.pageNo = t.totalPages),
            t
        },
        pageSizeSelect: function(e, n) {
            return void 0 !== n.pageSize && t.inArray(parseInt(n.pageSize), e) === -1 && (e.push(parseInt(n.pageSize)),
            e.sort(function(t, e) {
                return t - e
            })),
            '<select class="' + a + '-page-size">' + t.map(e, function(t) {
                return '<option value="' + t + '">' + o.renderText(n.pageSizeTemplate, t) + "</option>"
            }).join("") + "</select>"
        },
        pageLinks: function(e, n) {
            var i, o = n.pageNo, r = n.totalPages, s = n.pageLinksLayout, l = [], d = {};
            for (i = 1; i <= s[0]; i++)
                l.push(i);
            var c = Math.max(s[0] + Math.floor(s[1] / 2) - o + 1, 0)
              , u = Math.min(r - s[2] - Math.ceil(s[1] / 2) - o + 1, 0);
            for (i = o - Math.floor(s[1] / 2); i < o + Math.ceil(s[1] / 2); i++)
                l.push(i + c),
                l.push(i + u);
            for (i = r - s[2] + 1; i <= r; i++)
                l.push(i);
            for (i = 0; i < l.length; i++)
                void 0 === d[l[i]] && l[i] > 0 && l[i] <= r && (d[l[i]] = 1);
            return l = t.map(d, function(t, e) {
                return e
            }).sort(function(t, e) {
                return t - e
            }),
            t.map(l, function(t, e) {
                return (l[e - 1] && t - l[e - 1] > 1 ? '<span class="' + a + '-apos">...</span>' : "") + '<a data-page="' + t + '" class="' + a + "-link " + (t == o ? "active" : "") + '">' + t + "</a>"
            }).join("")
        }
    }
      , r = {
        "goto": function(e) {
            var n = this.data(a).data(a + "-settings");
            if (n.triggerTurn(n.pageNo, e) !== !1) {
                var i = n.gotoPage || t.noop;
                return i(n.renderCallback, e || n.pageNo, n.pageSize),
                this
            }
        },
        setInfo: function(t) {
            var e = this.data(a).data(a + "-settings").renderCallback;
            return e(t),
            this
        },
        getInfo: function() {
            var t = this.data(a).data(a + "-settings");
            return {
                pageNo: t.pageNo,
                pageSize: t.pageSize,
                totalRows: t.totalRows,
                totalPages: t.totalPages
            }
        },
        getBar: function() {
            return this.data(a)
        },
        hasMethod: function(t) {
            return !1
        },
        destroy: function() {
            return this.data(a).remove(),
            this.removeData(a).removeClass("has-" + a),
            window.console && console.log("ydPageBar destroyed."),
            this
        }
    };
    t.fn.ydPageBar = function(a) {
        return r[a] ? r[a].apply(this, Array.prototype.slice.call(arguments, 1)) : t.isPlainObject(a) || !a ? e.apply(this, arguments) : void t.error(a + " is not a valid method of ydPageBar")
    }
    ,
    t.fn.ydPageBar.setDefaults = function(e) {
        t.extend(n, e)
    }
    ,
    t.fn.ydPageBar.render = i
}(jQuery),
"undefined" == typeof ydl && (this.ydl = {}),
function(t) {
    function e(t) {
        this.settings = t,
        this.cache = t.data || [],
        this.totalRows = t.totalRows || this.cache.length,
        this.cacheSize = t.cacheSize || Number.POSITIVE_INFINITY,
        this.cacheStart = t.cacheStart || 0,
        this.cacheFlag = "",
        this.pageSize = t.pageSize || 10,
        this.dataFilter = t.dataFilter || function(t, e, a) {
            a(t)
        }
        ,
        this.getData = t.getData
    }
    e.prototype.getPage = function(t, e) {
        function a() {
            n.dataFilter(n.cache, t, function(t, a) {
                void 0 !== a && (n.totalRows = a);
                var o = t.slice(d - s, c - s);
                e(o, {
                    pageNo: i,
                    totalRows: n.totalRows
                })
            })
        }
        var n = this
          , i = t.pageNo = t.pageNo || 1
          , o = t.pageSize = t.pageSize || 10
          , r = this.cache.length
          , s = this.cacheStart
          , l = this.cacheStart + r
          , d = o * (i - 1)
          , c = o * i
          , u = JSON.stringify({
            terms: t.terms
        });
        if (n.totalRows > 0 && this.cacheFlag === u && c > n.totalRows && (c = n.totalRows),
        this.getData && (this.cacheSize !== Number.POSITIVE_INFINITY && (d < s || c > l) || this.cacheFlag !== u)) {
            var p = this.cacheSize;
            this.getData({
                pageNo: Math.floor(d / p) + 1,
                pageSize: p,
                terms: t.terms
            }, function(t, e) {
                n.cache = t,
                n.totalRows = e.totalRows,
                s = n.cacheStart = p * (e.pageNo - 1),
                n.cacheFlag = u,
                a()
            })
        } else
            a()
    }
    ,
    e.prototype.length = function() {
        return this.cache.length
    }
    ,
    t.pagination = function(t) {
        return new e(t)
    }
    ,
    "undefined" != typeof module && module.exports && (module.exports = e)
}(this.ydl),
"undefined" == typeof ydl && alert("ydl.datalist.js必须在ydl.base.js之后加载"),
function(t, e, a) {
    function n(t, a) {
        var n = e("#" + t);
        e("#" + t + "_table_head").parent().remove();
        var i = n.parent().css("height", parseInt(a) || 320)
          , o = /MSIE 9\.\d/.test(navigator.userAgent);
        o && i.css("overflow-x", "scroll");
        var r = e('<div class="fixtable-head"><table id="' + t + '_table_head" class="datalist-table-head"><thead>' + n.children("thead").html() + "</thead></table></div>").insertBefore(i)
          , s = r.closest(".tab-pane");
        s.is(":hidden") ? (s.addClass("temp-active"),
        r.height(e("#" + t + "_table_head").height() - 1),
        s.removeClass("temp-active")) : r.height((e("#" + t + "_table_head").height() || 30) - 1),
        i.scroll(function() {
            var t = e(this).scrollLeft();
            r.find("table").css("left", -t).prev().css("left", -t)
        })
    }
    function i(n) {
        function i(t, e) {
            for (; ; ) {
                if (!h[t][e])
                    break;
                e++
            }
            return e
        }
        "string" == typeof n && (n = e("#" + n));
        var o = n.closest(".tab-pane")
          , r = o.is(":hidden");
        r && o.addClass("temp-active");
        var s = n.closest(".fixtable-box").find("thead:visible tr:last")
          , l = n.find("tbody tr").length > 0 ? n.find("tbody tr:first td") : null;
        if (n.closest(".ydpx-container").hasClass("list-container")) {
            var d = s.children().closest("div")
              , c = d.children()[0];
            c !== a && c.rows.length > 1 && !d.data("rowMerged") && (t.mergeRows(c.rows[0], c.rows.length),
            d.height(c.clientHeight),
            d.data("rowMerged", !0))
        }
        var u, p, h = [], f = n.closest(".fixtable-box").find(".fixtable-head thead tr");
        for (u = 0; u < f.length; u++)
            h.push([]);
        for (u = 0; u < f.length; u++) {
            var g = i(u, 0);
            for (p = 0; p < f[u].cells.length; p++) {
                var m = f[u].cells[p]
                  , b = m.rowSpan
                  , v = m.colSpan;
                if (h[u][g] = {
                    c: m,
                    s: v
                },
                b > 1)
                    for (var y = 1; y < b; y++)
                        for (var w = 0; w < v; w++)
                            h[u + y][g + w] = {
                                c: m,
                                s: v
                            };
                if (g = i(u, g + 1),
                v > 1)
                    for (var x = 1; x < v; x++)
                        h[u][g] = {
                            c: m,
                            s: v
                        },
                        g = i(u, g + 1)
            }
        }
        var _ = [];
        for (p = 0; p < h[0].length; p++)
            for (u = 0; u < h.length; u++)
                if (1 === h[u][p].s) {
                    _[p] = h[u][p].c;
                    break
                }
        for (var C = 0; C < _.length; C++) {
            var k = e(_[C]).find(".fix-width").width();
            e(_[C]).find("label").width("auto").parent().width("auto").end().end().width("auto");
            var $, j = _[C] ? e(_[C]).width() : 0;
            if (null != l) {
                e(l[C]).children(":visible:first").width("auto").parent().width("auto");
                var S = l[C] ? e(l[C]).width() : 0;
                (t.common.isIe || navigator.userAgent.indexOf("Chrome") > -1) && n.closest(".list-container").length > 0 && (S += 1);
                var T = parseFloat(e(l[C]).children(":visible:first").css("padding-left"))
                  , E = parseFloat(e(l[C]).children(":visible").css("border-left-width"));
                $ = Math.max(j, S);
                var N = $ > k;
                if (null != k && ($ = k),
                e(l[C]).closest("tbody").find("tr").find("td:eq(" + C + ") :visible:first:not(.check)").width($ - 2 * T - 2 * (E || 0)).parent().width($),
                null != k) {
                    var I = e(l[C]).closest("tbody").find("tr").find("td:eq(" + C + ") :visible:first:not(.check)").width($ - 2 * T - 2 * (E || 0));
                    I.addClass("diandiandian"),
                    N && I.off("mouseover.ddd").on("mouseover.ddd", function() {
                        var a = e(this).width()
                          , n = e(this).width("auto").width();
                        e(this).width(a),
                        n > a && t.toolTips(e(this).text(), {
                            dom: this,
                            tips: 3,
                            time: 2e3
                        })
                    })
                }
                n.find("tbody tr:visible").each(function() {
                    var t = e(this).children("td").eq(C);
                    t.hasClass("money") && t.find(".money").width(e(l[C]).children(":visible:first").width())
                })
            } else
                $ = j;
            null != k && ($ = k),
            e(_[C]).not(".check").find("label").width($).parent().width($).end().end().width($)
        }
        var P = n.find("tbody");
        0 == P.children().length && P.width(s.width()),
        r && o.removeClass("temp-active")
    }
    "undefined" == typeof t.init && (t.init = {}),
    "undefined" == typeof t.data && (t.data = {}),
    t.init.dataList = function(o, r, s, l) {
        function d() {
            var n, i = e("#" + S + "_editor");
            if (i.length > 0) {
                i.addClass("datalist-editor-dialog");
                var o = i.children(".panel-heading");
                n = o.text().trim(),
                o.remove()
            } else {
                var r = L.dialogEdit
                  , s = [["col-xs-4 col-sm-4 col-md-3", "col-xs-8 col-sm-8 col-md-9"], ["col-xs-2 col-sm-2 col-md-2", "col-xs-4 col-sm-4 col-md-4"], ["col-xs-2 col-sm-2 col-md-2", "col-xs-2 col-sm-2 col-md-2"], ["col-xs-1 col-sm-1 col-md-1", "col-xs-2 col-sm-2 col-md-2"]][r - 1]
                  , l = 0
                  , d = 0
                  , c = ""
                  , u = "";
                e.each(L.columns, function(e, a) {
                    var n = S + "_editor_" + a.id;
                    a.colType == $ ? (l++,
                    d = l % r,
                    1 != r && 1 != d || (c += '<div class="form-group">'),
                    c += '<label for="' + n + '" class="col ' + s[0] + '">' + a.desc + '：</label><div class="col ' + s[1] + (a.required ? " star" : "") + '">' + (a.dict ? '<select class="input-sm form-control" name="' + a.id + '" id="' + n + '"' + (a.required ? ' required="required"' : "") + ">" + t.common.blankOption + t.createOptions(a.dict) + "</select>" : '<input class="input-sm form-control" id="' + n + '" name="' + a.id + '" type="text"' + (a.maxLength ? ' maxlength="' + ("money" == a.dataType && parseInt(a.maxLength) > 15 ? "15" : a.maxLength) + '"' : "") + (a.required ? ' required="required"' : "") + (a.negative ? ' data-negative="true"' : "") + (a.dataType ? ' data-type="' + a.dataType + '"' : "") + (a.decLen ? ' data-declen="' + a.decLen + '"' : "") + (a.intLen ? ' data-intlen="' + a.intLen + '"' : "") + " />") + "</div>",
                    1 != r && 0 != d || (c += '<div class="clearfix"></div></div>')) : a.hidden && (u += '<input id="' + n + '" name="' + a.id + '" type="hidden" />')
                }),
                0 != d && (c += '<div class="clearfix"></div></div>'),
                i = e('<div class="datalist-editor-dialog" id="' + S + '_editor">' + c + u + "</div>")
            }
            var p = i.dialog({
                title: n || L.caption + " 编辑记录",
                size: L.dialogEdit > 1 ? "lg" : "",
                create: function() {
                    I.DialogInit(i)
                },
                shown: function() {
                    "add" == p.data("task") && t.validator.clear(i.find(":input")),
                    E.find("tbody tr").removeClass("selected"),
                    p.data("row").addClass("selected"),
                    I.DialogOpen(i, "add" == p.data("task"))
                },
                closeButton: function() {
                    "add" === p.data("task") && p.data("row").remove()
                },
                buttons: {
                    "确定": function() {
                        var n = t.formValidate(p)
                          , i = I.Validate(p.find(":input").get());
                        return t.deferred(n, i).fail(function() {
                            p.find(".has-error:first").focus()
                        }).done(function() {
                            var t = p.data("row")
                              , n = t.data("index") - 1;
                            e.each(L.columns, function(a, i) {
                                var o = S + "_editor_" + i.id
                                  , r = $$(o);
                                if (r) {
                                    var s = e(r)
                                      , l = t.getCell(i.id);
                                    "select-one" === r.type ? (l.children("input").val(s.val()),
                                    l.children("span").text("" == s.val() ? "" : r.options[r.selectedIndex].innerHTML)) : (l.children("input").val(r.value),
                                    "money" == i.dataType ? (l.children("input").val(r.value),
                                    l.children("span").text(s.next().val())) : "date" == i.dataType && "1899-12-31" == r.value ? l.children("span").text() : l.children("span").text(r.value)),
                                    l.children("span").width("auto");
                                    var d = l.children("input").prop("name");
                                    if (L.data[n]) {
                                        var c = L.data[n][d]
                                          , u = s.val();
                                        l[c === u ? "removeClass" : "addClass"]("dirty-flag")
                                    } else
                                        l.addClass("dirty-flag")
                                }
                            }),
                            f(1, !1, !1).done(function() {
                                I.Changed(3);
                                var t = p.data("isAtuo");
                                t = t != a ? "1" == t : !(!pageData || "1" != pageData.datalist_continuous_adding),
                                t && "add" === p.data("task") && E.closest(".datalist-box").find(".datalist-button-bar div button[data-button-type=add]").click()
                            }),
                            p.dialog("close")
                        }),
                        !1
                    },
                    "取消": function() {
                        "add" === p.data("task") && p.data("row").remove(),
                        p.dialog("close")
                    }
                }
            });
            return p.find(":input").each(function() {
                var a = e(this)
                  , n = a.data("type");
                "money" === n ? a.addClass("money").moneyinput() : n in N && a.addClass("date").prop("maxLength", N[n]).wrap('<div class="input-group date"></div>').parent().append('<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>').end().datepicker(),
                a.change(function() {
                    t.checkFieldAttr(a, !1)
                })
            }),
            E.on("click", "tbody>tr", function(n) {
                var o = e(this);
                if (o.data("clickLink"))
                    o.removeData("clickLink");
                else if (L.dialogEdit && "checkbox" !== n.target.type && !o.hasClass("readonly") && (L.allowUpdate || o.find("[name=dynamicTable_flag]").val() == x)) {
                    t.validator.clear(i.find(":input"));
                    var r = e();
                    e.each(L.columns, function(t, a) {
                        var n = e("#" + S + "_editor_" + a.id)
                          , i = n.val();
                        n.hasClass("money") ? (n.val(o.getCell(a.id, ":input").val()),
                        n.next().val(o.getCell(a.id, "span").text())) : n.val(o.getCell(a.id, ":input").val()),
                        n.val() != i && (r = r.add(n))
                    }),
                    r.change();
                    var s = o.data("isAdd") ? "add" : "modify";
                    o.data("isAdd", !1);
                    var l = o.data("isAtuo");
                    l != a && p.data("isAtuo", l),
                    p.data("task", s).data("row", o).dialog("open")
                }
            }).on("click", "a,button", function(t) {
                e(this).closest("tr").data("clickLink", !0)
            }),
            p
        }
        function c() {
            function a(t, a) {
                a ? e("#list_" + S + "_buttons_" + t).removeClass("hide") : e("#list_" + S + "_buttons_" + t).addClass("hide")
            }
            var n = t.data.dataList[S];
            a("add", n.allowInsert),
            a("delete", n.allowInsert || n.allowDelete),
            a("import", n.allowImport),
            a("export", n.allowExport),
            a("print", n.allowPrint),
            a("save", n.allowInsert || n.allowUpdate),
            a("batch", n.allowBatch),
            pageData && "0" == pageData.datalist_batch_export ? a("batch_import", !1) : a("batch_import", n.allowBatch),
            a("delall", n.allowDeleteAll)
        }
        function u() {
            var n = t.data.dataList[S];
            g(n);
            var i = '<thead class="hide"><tr class="datalist-header"><th class="check ' + (n.allowDelete || n.allowInsert ? "" : "hide") + '"><span><input type="checkbox" title="全选" class="' + S + '_checkAll" /></span></th>';
            n.showRowId && (i += '<th class="__rownumber"><span><label>行号</label></span></th>');
            var o, r, s;
            for (o = 0,
            r = n.columns.length; o < r; o++) {
                s = n.columns[o];
                var l = s.width !== a;
                i += '<th class="_' + s.id + (s.hidden ? " hide" : "") + '" ><span' + (l ? ' class="fix-width" style="width:' + s.width + 'px"' : "") + "><label" + (s.sort ? ' class="sortable _sortname_' + s.id + '"' : "") + ">" + s.desc + (s.required ? '<span class="datalist-required-mark">*</span>' : "") + "</label></span></th>"
            }
            for (i += "</tr></thead><tbody>",
            n.data || (n.data = []),
            o = 0,
            r = n.data.length; o < r; o++)
                i += p(!0, n.data[o], o + 1);
            if (i += "</tbody>",
            E.html(i),
            !n.dialogEdit)
                for (o = 0,
                r = n.columns.length; o < r; o++) {
                    s = n.columns[o];
                    var d = e(document.getElementsByName(s.id));
                    s.isSelect && d.each(function() {
                        this.value = e(this.parentNode).data("value")
                    }),
                    "money" === s.dataType ? d.each(function() {
                        e(this).moneyinput()
                    }) : s.dataType in N && d.addClass("date").prop("maxLength", N[s.dataType]).datepicker()
                }
            n.allowUpdate && n.dialogEdit ? E.addClass("row-selectable") : E.removeClass("row-selectable"),
            e("." + S + "_checkAll").prop("checked", !1)
        }
        function p(n, i, o) {
            E.find("tr._datalist-tip").remove();
            var r = t.data.dataList[S]
              , s = '<tr data-index="' + (o || -1) + '"' + (o % 2 == 1 && n ? ' class="alt"' : "") + "><td";
            r.allowDelete || r.allowInsert || (s += ' class="hide"'),
            s += '><span class="check"><input type="checkbox" class="_datalist_delete_checkbox' + (n && !r.allowDelete ? " hide" : "") + '" /><input type="hidden" name="dynamicTable_flag" value="' + (n ? w : x) + '" /></span></td>',
            r.showRowId && (s += '<td class="code"><span>' + (n ? o + r.pageSize * ((r.currentPage || 1) - 1) : "+") + "</span></td>");
            for (var l = 0, d = r.columns.length; l < d; l++) {
                var c = r.columns[l]
                  , u = c.id
                  , p = n && i[u] ? i[u].replace(/"/g, "&quot;") : "";
                "date" === c.dataType && "1899-12-31" == p && (i[u] = p = "");
                var h = "";
                e.inArray(c.dataType, ["time", "month", "longmonth", "day", "longday", "zipcode", "idcard", "ipv4", "yyyymm"]) >= 0 ? h = "code" : e.inArray(c.dataType, ["number", "int", "float"]) >= 0 ? h = "number" : e.inArray(c.dataType, ["date", "time", "yyyymm"]) >= 0 ? h = "date" : "money" == c.dataType && (h = "money"),
                c.hidden && (h += " hide"),
                s += "<td" + (h ? ' class="' + h + '"' : "") + (c.dict ? ' data-value="' + p + '"' : "") + ">";
                var f = p;
                c.dict && (f = (e.isArray(c.dict) ? t.matchArray(p, c.dict, "value", "text") : c.dict[p]) || p),
                "" != f && ("money" === c.dataType ? f = t.addComma(parseFloat(f).toFixed(c.decLen || 2)) : "float" === c.dataType && (f = parseFloat(f).toFixed(c.decLen || 2)));
                var g = c.width !== a ? ' style="width:' + c.width + 'px"' : "";
                c.colType == $ && (r.allowUpdate || r.allowInsert && !n) ? r.dialogEdit ? s += '<input type="hidden" name="' + u + '" value="' + p + '" data-type="' + c.dataType + '" /><span' + g + ">" + f + "</span>" : c.dict ? (r.dictCache[u] || (r.dictCache[u] = t.common.blankOption + t.createOptions(c.dict)),
                s += '<select name="' + u + '" class="input-sm form-control"' + g + (c.required ? " required" : "") + ">" + r.dictCache[u] + "</select>",
                c.isSelect = !0) : s += '<input type="text" name="' + u + '" class="form-control input-sm' + ("money" === c.dataType ? " money" : "") + '"' + g + ' value="' + p + '" data-type="' + c.dataType + '"' + (c.required ? " required" : "") + ' data-declen="' + (c.decLen || "") + '" data-intlen="' + (c.intLen || "") + '"' + (c.maxLength ? ' maxlength="' + c.maxLength + '"' : "") + (c.size ? ' size="' + c.size + '"' : c.maxLength ? ' size="' + (c.maxLength > 40 ? "40" : c.maxLength) + '"' : "") + (c.negative ? ' data-negative="true"' : "") + " />" : ((c.colType == j || c.colType == $ && !r.allowUpdate) && (s += '<input type="hidden" name="' + u + '" value="' + p + '" />'),
                s += "<span" + g + ">" + f + "</span>"),
                s += "</td>"
            }
            return s += "</tr>"
        }
        function h(a) {
            var n = e.Deferred()
              , i = t.data.dataList[S]
              , o = [{
                name: "dynamicTable_id",
                value: S
            }, {
                name: "dynamicTable_currentPage",
                value: i.currentPage
            }, {
                name: "dynamicTable_pageSize",
                value: i.pageSize
            }, {
                name: "dynamicTable_nextPage",
                value: i.currentPage
            }, {
                name: "dynamicTable_page",
                value: s === window ? poolSelect.$page : s.page
            }, {
                name: "dynamicTable_paging",
                value: i.paging
            }, {
                name: S + "_order_by",
                value: i.sort
            }, {
                name: "_POOLKEY",
                value: poolSelect._POOLKEY || "-"
            }]
              , r = E.find("._datalist_delete_checkbox:checked").next();
            if (a)
                o.push({
                    name: "dynamicTable_delAll",
                    value: "true"
                });
            else {
                var l = !0;
                r.each(function() {
                    this.value == w && (e(this).closest("tr").find(":input[name]").each(function() {
                        o.push({
                            name: S + ":" + this.name,
                            value: "dynamicTable_flag" == this.name ? _ : this.value
                        })
                    }),
                    this.value = _),
                    this.value != x && (l = !1),
                    this.value == x && (this.value = C)
                })
            }
            return o = o.concat(t.getInputsArray(!0)),
            l && !a ? (r.closest("tr").remove(),
            n.resolve()) : t.ajax(t.contexPath + "/ydpx/dynamictable", o, function(t) {
                f(t.currentPage || 1, !1, !1).done(function() {
                    I.Changed(2),
                    n.resolve()
                }).fail(function() {
                    n.reject()
                })
            }, {
                silent: !0
            }).fail(function(e) {
                r.each(function() {
                    this.value == _ ? this.value = w : this.value == C && (this.value = x)
                }),
                t.customDialog({
                    title: "服务器出错了",
                    text: "提示信息：\n\n" + e,
                    buttons: "确定",
                    spaceClose: !0,
                    callback: function() {
                        n.reject()
                    }
                })
            }),
            n.promise()
        }
        function f(n, o, r) {
            function l() {
                for (var a = [], n = 0; n < y.length; n++) {
                    for (var i = e(y[n]), o = !0, s = [], l = 0, u = h.columns.length; l < u; l++) {
                        var g = h.columns[l];
                        if (g.colType == $) {
                            var m = i.find("[name=" + g.id + "]");
                            o = o && "" == m.val();
                            var v = {};
                            g.required && (v.required = !0),
                            "" != g.maxLength && (v.length2 = [0, g.maxLength]),
                            "" != g.dataType && (v.type = g.dataType),
                            "" !== g.decLen && (v.declen = g.decLen),
                            "" !== g.intLen && (v.intlen = g.intLen),
                            g.negative && (v.negative = !0),
                            s.push(function(e, a) {
                                return function() {
                                    return t.validator(e, a)
                                }
                            }(m, v))
                        }
                    }
                    o && i.find('[name="dynamicTable_flag"]').val() == x ? (i.remove(),
                    y.splice(n - 1, 1),
                    n--) : e.each(s, function(t, e) {
                        a.push(e())
                    })
                }
                0 === y.length ? r ? t.alert("列表中的数据没有改动，无需提交保存。", function() {
                    d(!1)
                }) : d(!1) : (a.push(I.Validate(b, y)),
                t.deferred(a).fail(function() {
                    c(),
                    p.reject("校验未通过")
                }).done(function() {
                    E.find("[name=dynamicTable_flag]").each(function() {
                        this.value != x && this.value != k || e(this).closest("tr").find(":input[name]").each(function() {
                            var t = this.value;
                            "date" != e(this).data("type") || "" != this.value && "null" != this.value || (t = "1899-12-31"),
                            f.push({
                                name: S + ":" + this.name,
                                value: t
                            })
                        })
                    }),
                    d(!0)
                }))
            }
            function d(a) {
                f = f.concat(t.getInputsArray(!0)),
                t.ajax(t.contexPath + "/ydpx/dynamictable", f, function(n) {
                    e.extend(t.data.dataList[S], {
                        data: n.data,
                        currentPage: n.currentPage,
                        pageCount: n.pageCount,
                        totalCount: n.totalCount,
                        pageSize: n.pageSize
                    }),
                    u(),
                    E.ydPageBar("setInfo", {
                        pageNo: parseInt(n.currentPage),
                        totalRows: parseInt(n.totalCount)
                    }),
                    E.hasClass("no-result-info") && t.noResultInfo(S),
                    I.Update(T.tBodies[0].rows, T.tHead.rows, a ? 2 : 1),
                    h.allowBatch && v(T.tBodies[0].rows),
                    i(E),
                    m(),
                    a && I.Changed(1),
                    p.resolve(a)
                }, {
                    silent: !0,
                    beforeSend: function() {
                        0 == e("body").hasClass("has-running-overlay") && (e("#" + S).parents(".datalist-box").parent(".panel-body").css({
                            position: "relative"
                        }),
                        e("#" + S).parents(".datalist-box").before('<div id="ajax_overlay_' + S + '" class="ajax-overlay-list"></div>'),
                        e("#ajax_overlay_" + S).css({
                            height: e("#" + S).parents(".datalist-box").height() + "px",
                            width: e("#" + S).parents(".datalist-box").width() + "px"
                        }))
                    },
                    complete: function() {
                        e("#ajax_overlay_" + S) && e("#ajax_overlay_" + S).remove()
                    }
                }).fail(function(e) {
                    t.customDialog({
                        title: "服务器出错了",
                        text: "提示信息：\n\n" + e,
                        buttons: "确定",
                        spaceClose: !0,
                        callback: function() {
                            p.reject(e)
                        }
                    })
                })
            }
            function c() {
                g.filter('[value="' + k + '"]').val(w)
            }
            0 == n && (n = 1);
            var p = e.Deferred()
              , h = t.data.dataList[S]
              , f = [{
                name: "dynamicTable_id",
                value: S
            }, {
                name: "dynamicTable_currentPage",
                value: h.currentPage
            }, {
                name: "dynamicTable_pageSize",
                value: h.pageSize
            }, {
                name: "dynamicTable_nextPage",
                value: n
            }, {
                name: "dynamicTable_page",
                value: s === window ? poolSelect.$page : s.page
            }, {
                name: "dynamicTable_paging",
                value: h.paging
            }, {
                name: S + "_order_by",
                value: h.sort
            }, {
                name: "_POOLKEY",
                value: poolSelect._POOLKEY || "-"
            }];
            h.allowBatch ? (f.push({
                name: "dynamicTable_batch_error",
                value: !0
            }),
            f.push({
                name: "dynamicTable_locationkey",
                value: h.batchErrorInfo.locationKey
            }),
            f.push({
                name: "dynamicTable_batchNo",
                value: h.batchErrorInfo.batchNo
            }),
            h.batchErrorInfo.batchList && f.push({
                name: "dynamicTable_batchList",
                value: !0
            })) : f.push({
                name: "dynamicTable_batch_error",
                value: !1
            }),
            h.parameters && e.each(h.parameters, function(t, e) {
                "id" !== t && ("where" === t ? f.push({
                    name: "whereClause",
                    value: e
                }) : f.push({
                    name: t,
                    value: e
                }))
            });
            var g = E.find("[name=dynamicTable_flag]");
            !function() {
                var t, e, n, i, o = 0;
                if (h.allowUpdate) {
                    var r = E.children("tbody").children();
                    for (E.hasClass("add-on-top") && (o = r.length - h.data.length),
                    n = 0,
                    i = h.data.length + o; n < i; n++) {
                        var s = g[n];
                        if (s.value == w) {
                            var l = !1;
                            for (t = 0,
                            e = h.columns.length; t < e; t++) {
                                var d = h.columns[t];
                                if (d.colType == $) {
                                    var c = h.data[n - o][d.id];
                                    if (c !== a) {
                                        var u = r.eq(n).find(':input[name="' + d.id + '"]')[0].value;
                                        if (u.trim() != c.trim()) {
                                            l = !0;
                                            break
                                        }
                                    }
                                }
                            }
                            l && (s.value = k)
                        }
                    }
                }
            }();
            var b = []
              , y = [];
            return g.each(function() {
                var t = e(this)
                  , a = t.closest("tr")
                  , n = this.value;
                n != x && n != k || (b = b.concat(a.find(":input[name]:visible,input.money").get()),
                y = y.concat(a[0]))
            }),
            0 === y.length ? d(!1) : y.length > 0 && (o ? t.customDialog({
                title: "确认保存更改",
                text: "列表中有 " + y.length + " 条数据已被修改，是否保存？<br/><br/>点击【是】自动保存更改并继续操作<br/>点击【否】放弃更改并继续操作<br/>点击【取消】放弃当前操作",
                buttons: [{
                    text: "是",
                    theme: "primary"
                }, "否", "取消"],
                spaceClose: !0,
                callback: function(t) {
                    switch (t) {
                    case 0:
                        l();
                        break;
                    case 1:
                        c(),
                        d(!0);
                        break;
                    case 2:
                        c()
                    }
                },
                hidden: function() {
                    c()
                }
            }) : l()),
            p.promise()
        }
        function g(t) {
            for (var a = 0, n = t.columns.length; a < n; a++) {
                var i = t.columns[a];
                if (i.colType == $ && "" != i.decLen && ("money" == i.dataType || "float" == i.dataType))
                    for (var o = i.id, r = parseInt(i.decLen), s = 0, l = t.data.length; s < l; s++)
                        e.isNumeric(t.data[s][o]) && (t.data[s][o] = parseFloat(t.data[s][o]).toFixed(r))
            }
        }
        function m() {
            var e = t.data.dataList[S].sort
              , a = e.split(/[,\s]+/);
            E.find("label._sortname_" + a[0].replace(".", "\\.")).after('<span style="float: left" class="ui-icon ui-icon-arrowthick-1-' + (a.length > 1 && "desc" === a[1] ? "s" : "n") + ' _list_sort_icon"></span>')
        }
        function b(e) {
            var a = e.split("|");
            e = a[0];
            var n = t.data.dataList[S].sort
              , i = new RegExp("\\b" + e.replace(".", "\\.") + " desc\\b")
              , r = new RegExp("\\b" + e.replace(".", "\\.") + "\\b");
            n = i.test(n) ? e + "," + n.replace(i, "") : r.test(n) ? e + " desc," + n.replace(r, "") : e + "," + n,
            t.data.dataList[S].sort = n.replace(/,,/g, ",").replace(/,$/, ""),
            f(o.currentPage || 1, !0, !1)
        }
        function v(a) {
            var n = t.data.dataList[S].batchErrorInfo
              , i = (t.data.dataList[S].dialogEdit,
            n.locationKey.split(","))
              , o = n.batchList || !1;
            e.each(t.data.dataList[S].data || [], function(r, s) {
                var l = e(a[r])
                  , d = e.map(i, function(t) {
                    return s[t]
                }).join(",")
                  , c = {
                    keys: d,
                    batchNo: n.batchNo
                };
                o && (c.datalistId = S),
                t.ajax(t.contexPath + "/trans/serch/bathException", c, function(a) {
                    e.each(a, function(t, e) {
                        var a = l.getCell(e.cwx);
                        if (!a)
                            return !0;
                        a.addClass("1" == e.lx ? "has-info" : "has-error batch-error-td"),
                        a.data("hover", !0);
                        var n = "1" == e.lx ? "info" : "error";
                        a.tips({
                            type: n,
                            tip: e.cwyy,
                            key: !0
                        })
                    }),
                    t.showHasError()
                })
            })
        }
        var y = e.Deferred();
        s === a && (s = window);
        var w = 0
          , x = 1
          , _ = 2
          , C = 3
          , k = 4
          , $ = 2
          , j = 3;
        r = r || "init";
        var S = o.id;
        if (!S)
            return y.resolve();
        var T = document.getElementById(S)
          , E = e(T)
          , N = {
            date: 10,
            time: 8,
            yyyymm: 6,
            yyyymmdd: 8,
            "yyyy-mm": 7
        }
          , I = {
            Update: s["datalist_callback_" + S],
            Add: s["datalist_add_" + S],
            Changed: s["datalist_changed_" + S],
            Button: s["datalist_buttonclick_" + S],
            Validate: s["datalist_validate_" + S],
            DialogInit: s["datalist_dialoginit_" + S],
            DialogOpen: s["datalist_dialogopen_" + S]
        };
        for (var P in I)
            e.isFunction(I[P]) || (I[P] = e.noop);
        switch (I.Validate === e.noop && (I.Validate = function() {
            return !0
        }
        ),
        r) {
        case "init":
            t.data.dataList || (t.data.dataList = {});
            var L = t.data.dataList[S] = e.extend({
                data: []
            }, o, {
                allowBatch: !1,
                caption: o.caption || o.desc,
                currentPage: 0 == o.pageCount ? 0 : 1,
                dictCache: {},
                sort: "",
                thisTab: s
            });
            t.arr2obj(L.columns, "id", "ischar");
            L.dialogEdit && (L.allowUpdate || L.allowInsert) && d(),
            L.width && L.width.indexOf("%") == -1 && (L.width = L.width + "px"),
            L.height && L.height.indexOf("%") == -1 && (L.height = L.height + "px");
            var D = e('<div class="datalist-box" ' + (L.width ? 'style="width:' + L.width + ';"' : "") + '><div class="datalist-button-bar clearfix" id="' + S + '_button_bar"><h5>' + (L.caption || "") + '</h5><div class="btn-group btn-group-sm"><button type="button" data-button-type="add" class="btn btn-default" id="list_' + S + '_buttons_add">' + t.textResources.get("datalist.buttons.add") + '</button><button type="button" data-button-type="delete" class="btn btn-default" id="list_' + S + '_buttons_delete">' + t.textResources.get("datalist.buttons.delete") + '</button><button type="button" data-button-type="delall" class="btn btn-default hide" id="list_' + S + '_buttons_delall">' + t.textResources.get("datalist.buttons.delall") + '</button><button type="button" data-button-type="save" class="btn btn-default" id="list_' + S + '_buttons_save">' + t.textResources.get("datalist.buttons.save") + '</button><button type="button" data-button-type="refresh" class="btn btn-default" id="list_' + S + '_buttons_refresh">' + t.textResources.get("datalist.buttons.refresh") + '</button><button type="button" data-button-type="import" class="btn btn-default" id="list_' + S + '_buttons_import">' + t.textResources.get("datalist.buttons.import") + '</button><button type="button" data-button-type="export" class="btn btn-default" id="list_' + S + '_buttons_export">' + t.textResources.get("datalist.buttons.export") + '</button><button type="button" data-button-type="print" class="btn btn-default" id="list_' + S + '_buttons_print">' + t.textResources.get("datalist.buttons.print") + '</button><button type="button" data-button-type="batch" data-error="true" class="btn btn-default" id="list_' + S + '_buttons_batch">' + t.textResources.get("datalist.buttons.batch.basic") + '</button><a data-button-type="batch_import" data-error="true" class="btn btn-default a-button" id="list_' + S + '_buttons_batch_import">' + t.textResources.get("datalist.buttons.batch.export") + '</a></div></div><div class="fixtable-box"><div class="fixtable-body"></div></div></div>');
            D.insertAfter(E).find(".fixtable-body").append(E.addClass("datalist-table-body ydpx-datalist")),
            E.on("inited.ydl.pagebar", function(t, e) {
                e.$bar.prop("id", "page_bar_" + E.prop("id")).addClass("page-bar")
            }).ydPageBar({
                container: D,
                pageNo: parseInt(o.currentPage),
                totalRows: parseInt(o.totalCount),
                pageSize: parseInt(o.pageSize),
                gotoPage: function(t, e, a) {
                    L.pageSize = a,
                    f(e, !0, !1)
                }
            }),
            D.on("change", "." + S + "_checkAll", function() {
                var t = E.find("._datalist_delete_checkbox:visible")
                  , a = this.checked;
                t.each(function() {
                    this.checked !== a && (this.checked = a,
                    e(this).change())
                })
            }),
            E.on("change", "input[type=text],select", function() {
                var t = e(this).closest("td")
                  , a = t.parent()
                  , n = a.data("index") - 1;
                if (L.data[n]) {
                    var i = L.data[n][this.name]
                      , o = this.value;
                    t[i === o ? "removeClass" : "addClass"]("dirty-flag")
                } else
                    t.addClass("dirty-flag")
            }),
            u(!0),
            n(S, L.height),
            I.Update(T.tBodies[0].rows, T.tHead.rows, 1),
            i(E),
            E.on("click", "label.sortable", function() {
                b(this.className.match(/\b_sortname_(\S+)(?= |$)/)[1])
            }),
            o.allowInsert && E.on("keydown", ":input:visible", function(a) {
                if (a.which == t.common.keys.Enter) {
                    var n = E.find(":input:visible:not(:disabled,[readonly])");
                    if (n.index(this) == n.length - 1)
                        return e("#list_" + S + "_buttons_add").click(),
                        !1
                }
            }),
            E.closest(".datalist-box").find(".datalist-button-bar div").on("click", "button", function() {
                switch (e(this).data("button-type")) {
                case "add":
                    var n = I.Button("add");
                    if (n !== !1) {
                        e(this).blur();
                        var o = E.hasClass("add-on-top") ? "prependTo" : "appendTo"
                          , r = e(p(!1))[o](E.children("tbody"));
                        L.dialogEdit ? ("object" == typeof n && n.datalist_continuous_adding != a && r.data("isAtuo", "1" == n.datalist_continuous_adding),
                        r.data("isAdd", !0).click()) : (r.find(":input:not(:checkbox):visible").each(function() {
                            e(this).hasClass("money") && e(this).moneyinput(),
                            e(this).closest("td").hasClass("date") && e(this).addClass("date").prop("maxLength", N.date).datepicker()
                        }).eq(0).focus(),
                        i(E)),
                        I.Add(r[0])
                    }
                    break;
                case "delete":
                    if (I.Button("delete") !== !1) {
                        var l = E.find("td:nth-child(1) :checkbox:checked");
                        0 == l.length ? t.alert("请先选择要删除的记录。") : t.customDialog({
                            title: "确认删除",
                            text: "请确认是否要删除选择的 " + l.length + " 条记录？",
                            spaceClose: !0,
                            callback: function(t) {
                                "0" == t && h()
                            }
                        })
                    }
                    break;
                case "delall":
                    I.Button("delall") !== !1 && confirm("即将删除所有数据记录，清空此列表，请确认是否继续？") && h(!0);
                    break;
                case "save":
                    I.Button("save") !== !1 && f(L.currentPage || 1, !1, !0).done(function(e) {
                        e && t.alert("保存成功！")
                    });
                    break;
                case "refresh":
                    I.Button("refresh") !== !1 && f(L.currentPage, !0, !1);
                    break;
                case "batch":
                    var d = e(this).data("error");
                    L.allowBatch = !d,
                    f(L.currentPage, !0, !1),
                    d ? e(this).text(t.textResources.get("datalist.buttons.batch.error")) : e(this).text(t.textResources.get("datalist.buttons.batch.basic")),
                    e(this).data("error", !d);
                    break;
                case "import":
                    var c;
                    (c = I.Button("import")) !== !1 && t.dialog.open(t.contexPath + "/common/jsp/listUploadInput.jsp", e.extend(t.getInputs(!0), {
                        _POOLKEY: poolSelect._POOLKEY || "-",
                        dynamicTable_id: S,
                        dynamicTable_pageSize: L.pageSize,
                        dynamicTable_page: s === window ? poolSelect.$page : s.page,
                        dynamicTable_headerRows: "object" == typeof c ? c.headerRows : "",
                        options: L.columns,
                        template: L.template
                    }), function(a) {
                        var n = !1;
                        return navigator.userAgent.indexOf("MSIE") > 0 && (navigator.userAgent.indexOf("MSIE 9.0") > 0 && (n = !0),
                        navigator.userAgent.indexOf("MSIE 8.0") > 0 && (n = !0)),
                        n ? void f(1, !0, !1).done(function() {
                            I.Changed(3)
                        }) : void (a && 0 == a.returnCode && a.data && (t.init.dataList(e.extend(!0, {}, a.data), "update", s),
                        I.Changed(3)))
                    }, {
                        size: "lg",
                        height: 470
                    });
                    break;
                case "export":
                    var u = !1;
                    if (navigator.userAgent.indexOf("MSIE") > 0 && navigator.userAgent.indexOf("MSIE 9.0") > 0 && (u = !0),
                    u) {
                        var g = {
                            $page: s === window ? poolSelect.$page : s.page,
                            export_componentType: "datalist",
                            export_componentId: S,
                            export_currentPage: L.currentPage,
                            export_pageCount: L.pageCount,
                            export_totalCount: L.totalCount,
                            export_useDict: "object" == typeof c ? c.useDict : "",
                            _POOLKEY: poolSelect._POOLKEY || "-"
                        }
                          , m = "dialogWidth:300px;dialogHeight:200px;status:no;help:no"
                          , b = window.showModalDialog(t.contexPath + "/common/jsp/listExportIE9.jsp", g, m);
                        b && (location.href = b);
                        break
                    }
                    var c;
                    (c = I.Button("export")) !== !1 && t.dialog.open(t.contexPath + "/common/jsp/listExport.jsp", e.extend(t.getInputs(!0), {
                        $page: s === window ? poolSelect.$page : s.page,
                        export_componentType: "datalist",
                        export_componentId: S,
                        export_currentPage: L.currentPage,
                        export_pageCount: L.pageCount,
                        export_totalCount: L.totalCount,
                        export_useDict: "object" == typeof c ? c.useDict : "",
                        _POOLKEY: poolSelect._POOLKEY || "-"
                    }), null, {
                        width: 600,
                        height: 272
                    });
                    break;
                case "print":
                    if (I.Button("print") !== !1) {
                        var u = !1;
                        if (navigator.userAgent.indexOf("MSIE") > 0 && navigator.userAgent.indexOf("MSIE 9.0") > 0 && (u = !0),
                        u) {
                            var g = {
                                $page: s === window ? poolSelect.$page : s.page,
                                export_componentType: "datalist",
                                export_componentId: S,
                                export_currentPage: L.currentPage,
                                export_pageCount: L.pageCount,
                                export_totalCount: L.totalCount,
                                export_useDict: "object" == typeof c ? c.useDict : "",
                                _POOLKEY: poolSelect._POOLKEY || "-"
                            }
                              , m = "dialogWidth:300px;dialogHeight:200px;status:no;help:no"
                              , b = window.showModalDialog(t.contexPath + "/common/jsp/listExportIE9.jsp?print=1", g, m);
                            b && (location.href = b);
                            break
                        }
                        var c;
                        (c = I.Button("export")) !== !1 && t.dialog.open(t.contexPath + "/common/jsp/listExport.jsp?print=1", e.extend(t.getInputs(!0), {
                            $page: s === window ? poolSelect.$page : s.page,
                            export_componentType: "datalist",
                            export_componentId: S,
                            export_currentPage: L.currentPage,
                            export_pageCount: L.pageCount,
                            export_totalCount: L.totalCount,
                            export_useDict: "object" == typeof c ? c.useDict : "",
                            _POOLKEY: poolSelect._POOLKEY || "-"
                        }), null, {
                            width: 600,
                            height: 272
                        });
                        break
                    }
                }
            }),
            c();
            break;
        case "update":
            var L = t.data.dataList[S];
            t.data.dataList[S] = L = e.extend(L, o),
            c(),
            u(!0),
            n(S, L.height),
            E.ydPageBar("setInfo", {
                pageNo: parseInt(L.currentPage),
                totalRows: parseInt(L.totalCount)
            }),
            E.hasClass("no-result-info") && t.noResultInfo(S),
            I.Update(T.tBodies[0].rows, T.tHead.rows, 3),
            i(E);
            break;
        case "save":
            var L = t.data.dataList[S];
            if (I.Button("save") !== !1)
                return f(L.currentPage, !1, !1);
            break;
        case "refresh":
            return t.data.dataList && t.data.dataList[S] ? (t.data.dataList[S].parameters = o,
            f(l || o.currentPage || 1, !0, !1)) : y.resolve();
        case "batcherror":
            if (!t.data.dataList || !t.data.dataList[S])
                return y.resolve();
            t.data.dataList[S].parameters = o,
            t.data.dataList[S].allowBatch = !0,
            t.data.dataList[S].batchErrorInfo = o.batchErrorInfo;
            var A = e("#list_" + S + "_buttons_batch")
              , O = A.data("error");
            O || A.data("error", !O).text(t.textResources.get("datalist.buttons.batch.basic"));
            var B = t.contexPath + "/batchData/exportWrongData?dynamicTable_id=" + S + "&dynamicTable_page=" + (s === window ? poolSelect.$page : s.page) + "&_POOLKEY=" + poolSelect._POOLKEY + "&dynamicTable_locationkey=" + o.batchErrorInfo.locationKey + "&dynamicTable_batchNo=" + o.batchErrorInfo.batchNo;
            e("#list_" + S + "_buttons_batch_import").attr("href", B),
            c(),
            f(l || o.currentPage || 1, !0, !1).done(function() {})
        }
    }
    ,
    t.listColWidth = i,
    t.init.list = function(n, o, r, s) {
        function l(a, i) {
            var o = !1;
            if (navigator.userAgent.indexOf("MSIE") > 0 && navigator.userAgent.indexOf("MSIE 9.0") > 0 && (o = !0),
            o) {
                var s = "dialogWidth:600px;dialogHeight:300px;status:no;help:no"
                  , l = window.showModalDialog(t.contexPath + "/common/jsp/listExportIE9.jsp?_r=" + Math.random(), {
                    $page: r === window ? poolSelect.$page : r.page,
                    export_componentType: "list",
                    export_componentId: n,
                    export_currentPage: a,
                    export_pageCount: i,
                    export_totalCount: f.data("totalcount"),
                    _POOLKEY: poolSelect._POOLKEY || "-"
                }, s);
                return void (l && (location.href = l))
            }
            t.dialog.open(t.contexPath + "/common/jsp/listExport.jsp", e.extend(t.getInputs(!0), {
                $page: r === window ? poolSelect.$page : r.page,
                export_componentType: "list",
                export_componentId: n,
                export_currentPage: a,
                export_pageCount: i,
                export_totalCount: f.data("totalcount"),
                _POOLKEY: poolSelect._POOLKEY || "-"
            }), null, {
                width: 600,
                height: 272
            })
        }
        function d(a, i, o) {
            var r = !1;
            if (navigator.userAgent.indexOf("MSIE") > 0 && navigator.userAgent.indexOf("MSIE 9.0") > 0 && (r = !0),
            r) {
                var s = "dialogWidth:600px;dialogHeight:300px;status:no;help:no"
                  , l = window.showModalDialog(t.contexPath + "/common/jsp/listPrintIE9.jsp?_r=" + Math.random(), {
                    $page: o === window ? poolSelect.$page : o.page,
                    export_componentType: "list",
                    export_componentId: n,
                    export_currentPage: a,
                    export_pageCount: i,
                    export_totalCount: f.data("totalcount"),
                    _POOLKEY: poolSelect._POOLKEY || "-"
                }, s);
                if (l && 0 == l.returnCode) {
                    e.extend(l, {
                        $page: o === window ? poolSelect.$page : o.page
                    });
                    setTimeout(function() {
                        if (!document.all("printDiv")) {
                            var a = document.createElement("div");
                            a.id = "printDiv",
                            a.style.height = e(document).height() - 200 + "px",
                            document.body.appendChild(a)
                        }
                        var n = t.makeDialog("printDiv", {
                            title: "打印预览",
                            size: "lg",
                            close: !0,
                            height: 500
                        })
                          , i = "<iframe width='100%' height='99%'   src='" + t.contexPath + l.url + "' frameborder='0'></iframe>";
                        e("#printDiv").html(i),
                        n.dialog("open")
                    }, 300)
                }
            } else
                t.dialog.open(t.contexPath + "/common/jsp/listPrint.jsp", e.extend(t.getInputs(!0), {
                    $page: o === window ? poolSelect.$page : o.page,
                    export_componentType: "list",
                    export_componentId: n,
                    export_currentPage: a,
                    export_pageCount: i,
                    export_totalCount: f.data("totalcount"),
                    _POOLKEY: poolSelect._POOLKEY || "-"
                }), function(a) {
                    if (a && 0 == a.returnCode) {
                        e.extend(a, {
                            $page: o === window ? poolSelect.$page : o.page
                        });
                        setTimeout(function() {
                            if (!document.all("printDiv")) {
                                var n = document.createElement("div");
                                n.id = "printDiv",
                                n.style.height = e(document).height() - 200 + "px",
                                document.body.appendChild(n)
                            }
                            var i = t.makeDialog("printDiv", {
                                title: "打印预览",
                                size: "lg",
                                close: !0,
                                height: 500
                            })
                              , o = "<iframe width='100%' height='99%'   src='" + t.contexPath + a.url + "' frameborder='0'></iframe>";
                            e("#printDiv").html(o),
                            i.dialog("open")
                        }, 300)
                    }
                }, {
                    height: 270
                })
        }
        function c(a) {
            var n = e("#" + a + " tr").map(function() {
                return e.map(e(this).children(":not(.hide)"), function(t, a) {
                    return e(t).children("input").length > 0 || e(t).find("input.date").length > 0 ? e(t).find("input.money").length > 0 ? e(t).find("input.money-display").val() : e(t).find("input").val() : e(t).text()
                }).join("\t")
            }).get()
              , i = e("#list_" + a + "_buttons_copy").attr("data-clipboard-text", n.join("\n"))[0];
            e.getScript(t.contexPath + "/common/lib/js/clipboard.min.js", function() {
                new Clipboard(i).on("success", function(e) {
                    t.toast("已复制到剪贴板")
                })
            })
        }
        function u() {
            var t = e("#" + n + "_table_head");
            b.sort === a && (b.sort = "",
            t.on("click", "label.sortable", function() {
                var t = this.className.match(/\b_sortname_(\S+)(?= |$)/)[1]
                  , e = b.sort
                  , a = new RegExp("\\b" + t.replace(".", "\\.") + " desc\\b")
                  , n = new RegExp("\\b" + t.replace(".", "\\.") + "\\b");
                e = a.test(e) ? t + "," + e.replace(a, "") : n.test(e) ? t + " desc," + e.replace(n, "") : t + "," + e,
                b.sort = e.replace(/,,/g, ",").replace(/,$/, ""),
                p(null, f.data("currentpage"))
            }));
            var i = / desc$/;
            "" !== b.sort && e.each(b.sort.split(/,/), function(e, a) {
                var n = i.test(a)
                  , o = a.replace(i, "");
                t.find("label._sortname_" + o).prev()[0].className = "sort_" + (n ? "desc" : "asc") + (e + 1)
            })
        }
        function p(o, s, l) {
            var d = e.Deferred()
              , p = g.Validate(h.tBodies[0].rows, h.tHead.rows);
            return p === a && (p = !0),
            t.deferred(p).fail(function() {
                d.reject("校验未通过")
            }).done(function() {
                var a = f.data("dataset")
                  , o = t.getInputsArray(!0).concat([{
                    name: "$page",
                    value: r === window ? poolSelect.$page : r.page
                }, {
                    name: "_POOLKEY",
                    value: poolSelect._POOLKEY || "-"
                }, {
                    name: "list_id",
                    value: n
                }, {
                    name: "dataset_id",
                    value: a
                }, {
                    name: "list_page_no",
                    value: s
                }, {
                    name: "nextPage",
                    value: s
                }, {
                    name: a + "_pagesize",
                    value: l
                }, {
                    name: a + "_order_by",
                    value: b.sort
                }]);
                b.parameters && (e.isArray(b.parameters) ? o = o.concat(b.parameters) : e.isPlainObject(b.parameters) && (o = o.concat(e.map(b.parameters, function(t, e) {
                    return {
                        name: e,
                        value: t
                    }
                })))),
                t.log("postData = " + t.getMember(o), "blue");
                var p;
                p = b.parameters && b.parameters.callback && e.isFunction(b.parameters.callback) ? b.parameters.callback(o, d) : t.ajax(t.contexPath + "/ydpx/list", o, function(a, o) {
                    if (0 == o.returnCode) {
                        var s = (a.data,
                        r.ydpxData.listBody[n])
                          , l = e.map(a.data, function(t, e) {
                            return t.list_xh_text = parseInt(a.pageSize) * (parseInt(a.currentPage) - 1) + e + 1,
                            t.sn = e,
                            ejs.render(s, t, {
                                delimiter: "$"
                            })
                        }).join("");
                        f.find("tbody").html(l),
                        f.find("p.money").each(function() {
                            var a = t.addComma(e(this).text());
                            e(this).text(a)
                        });
                        var p = t.data.listParameter[n].scriptFunc;
                        p && e.each(a.data, function(t) {
                            p(t)
                        }),
                        u(),
                        f.closest(".datalist-box").ydPageBar("setInfo", {
                            pageNo: a.currentPage,
                            totalRows: a.totalCount,
                            pageSize: a.pageSize
                        }),
                        f.data("currentpage", a.currentPage),
                        f.data("totalcount", a.totalCount),
                        f.data("pagesize", a.pageSize),
                        f.data("pagecount", a.pageCount),
                        f.data("dataset", a.dataset.join(",")),
                        f.closest(".list-container").hasClass("no-result-info") && t.noResultInfo(f.prop("id")),
                        g.Update(h.tBodies[0].rows, h.tHead.rows),
                        c(n),
                        i(f),
                        d.resolve()
                    } else
                        t.alert({
                            message: "服务器出错！",
                            desc: a && (a.message || !1),
                            code: a && (a.returnCode || !1)
                        }),
                        d.reject(a.message, a.returnCode)
                }, {
                    beforeSend: function() {
                        0 == e("body").hasClass("has-running-overlay") && (e("#" + n).parents(".datalist-box").parent(".panel-body").css({
                            position: "relative"
                        }),
                        e("#" + n).parents(".datalist-box").before('<div id="ajax_overlay_' + n + '" class="ajax-overlay-list"></div>'),
                        e("#ajax_overlay_" + n).css({
                            height: e("#" + n).parents(".datalist-box").height() + "px",
                            width: e("#" + n).parents(".datalist-box").width() + "px"
                        }))
                    },
                    complete: function() {
                        e("#ajax_overlay_" + n) && e("#ajax_overlay_" + n).remove()
                    }
                }),
                p.fail(function(t) {
                    d.reject(t)
                })
            }),
            d.promise()
        }
        r === a && (r = window);
        var h = document.getElementById(n);
        if (!h)
            return t.alert("列表容器" + n + "不存在！");
        var f = e(h)
          , g = {
            Update: r["list_callback_" + n],
            Button: r["list_buttonclick_" + n],
            Validate: r["list_validate_" + n]
        };
        for (var m in g)
            e.isFunction(g[m]) || (g[m] = e.noop);
        g.Validate === e.noop && (g.Validate = function() {
            return !0
        }
        ),
        t.data.listParameter || (t.data.listParameter = {});
        var b = t.data.listParameter[n];
        if (o)
            return b.parameters = lm(o),
            p(null, s || 1);
        if (!b) {
            b = t.data.listParameter[n] = {
                parameters: null
            },
            s && (t.data.listParameter[n].scriptFunc = s),
            e("#" + n + "_button_bar div.btn-group").append('<button id="list_' + n + '_buttons_copy" class="btn btn-default" type="button">复制</button>'),
            c(n),
            e("#list_" + n + "_buttons_export").click(function() {
                g.Button("export") !== !1 && l(f.data("currentpage"), f.data("pagecount"))
            }),
            e("#list_" + n + "_buttons_print").click(function() {
                g.Button("print") !== !1 && d(f.data("currentpage"), f.data("pagecount"), r)
            }),
            f.closest(".datalist-box").on("inited.ydl.pagebar", function(t, e) {
                e.$bar.prop("id", "page_bar_" + f.prop("id")).addClass("page-bar")
            }).ydPageBar({
                pageNo: f.data("currentpage"),
                totalRows: f.data("totalcount"),
                pageSize: f.data("pagesize"),
                gotoPage: p
            }),
            u(),
            f.parent().scroll(function() {
                e("#" + n + "_table_head").css("left", -e(this).scrollLeft())
            }),
            i(f);
            var v = f.closest(".datalist-box").find(".datalist-button-bar");
            v.children("h5").is(":empty") && 0 == v.find("button:visible").length && v.hide(),
            t.log("列表" + n + "已初始化。"),
            g.Update(h.tBodies[0].rows, h.tHead.rows)
        }
    }
    ,
    t.mergeRows = function(a, n) {
        function i(t, e) {
            for (var a = 0, n = 0, i = s[t].length; n < i; n++)
                if (a += s[t].eq(n)[0].colSpan,
                a >= e + 1)
                    return s[t].eq(n)
        }
        var o = t.getDom(a);
        if (o) {
            "TABLE" == o.tagName ? o = o.rows[0] : "TR" != o.tagName && (o = e(o).closest("tr")[0]);
            for (var r = e(o), s = [], l = [], d = 0; d < n; d++)
                l.push([]),
                s.push(r.children().each(function() {
                    if (l[d].push(this.colSpan),
                    this.colSpan > 1)
                        for (var t = 0; t < this.colSpan - 1; t++)
                            l[d].push(0)
                })),
                r = r.next();
            for (var c = 0, u = l[0].length; c < u; c++)
                for (var p, h = i(0, c), f = l[0][c], d = 1; d < n; d++)
                    if (p = i(d, c),
                    0 != f && l[d][c] == f) {
                        h.append(p.contents())[0].rowSpan++,
                        p.remove();
                        var g = h.children("em");
                        g.length > 1 && g.filter(":lt(" + (g.length - 1) + ")").remove()
                    } else
                        f = l[d][c],
                        h = p
        }
    }
    ,
    t.addListCheck = function(n, i, o, r) {
        var s = t.getDom(n)
          , l = s.id || (s.id = "id" + t.uuid())
          , d = e(s)
          , c = d.closest(".fixtable-box");
        c.data("hasListCheck") || (c.children(".fixtable-head").find("tr").last().prepend('<th class="list-check"><span><input type="checkbox" /></span></th>').find(":checkbox").on("change", function() {
            var a = this.checked;
            e(t.getDom(n)).find("td:nth-child(1) input[type=checkbox]:not(:disabled)").each(function() {
                var t = this.checked;
                this.checked = a,
                t !== a && e(this).change()
            })
        }).end().prevAll().prepend('<th class="list-check"><span></span></th>'),
        c.data("hasListCheck", !0)),
        d.find("thead tr").prepend('<td class="list-check"><span></span></td>'),
        d.find("tbody tr").prepend('<td class="list-check"><span><input type="checkbox" /></span></td>'),
        t.data.listContext || (t.data.listContext = {});
        var u = t.data.listContext;
        i != a && (u[l] || (u[l] = {
            colIndexs: i
        }),
        e("tr td:nth-child(1) input[type=checkbox]", s).on("change", function() {
            var t = {};
            if (!e(s).data("setListCheck")) {
                var n, d = [], c = [], p = e(this).closest("tr");
                e.isArray(i) || (i = [i]),
                e.each(i, function(t) {
                    var e = p.find("td").eq(i[t]).text();
                    d.push(e),
                    c.push(e)
                }),
                n = d.join(","),
                e.isNumeric(o) && c.push(p.find("td").eq(o).text()),
                this.checked ? t[d] = c : (delete t[n],
                delete u[l].listdata[n]),
                u[l].listdata = e.extend(u[l].listdata, t),
                o != a && (u[l].orderby = o),
                r && (u[l].isNumber = r)
            }
        }),
        u[l].listdata && e(s).find("tr:gt(0)").each(function() {
            var t = e(this);
            e.isArray(i) || (i = [i]);
            var a, n = [];
            e.each(i, function(e) {
                n.push(t.find("td").eq(i[e]).text())
            }),
            a = n.join(","),
            u[l].listdata[n] && t.find("td:eq(0) input[type=checkbox]").prop("checked", !0)
        }))
    }
    ,
    t.getListCheck = function(a) {
        var n, i = t.getDom(a), o = i.id, r = t.data.listContext;
        return r[o] && r[o].listdata && (n = e.map(r[o].listdata, function(t) {
            var e = [];
            return e.push(t.length > 1 ? t : t[0]),
            e
        }),
        r[o].orderby && (n.sort(function(t, e) {
            var a = t.length - 1;
            return r[o].isNumber ? parseFloat(t[a]) > parseFloat(e[a]) ? 1 : -1 : t[a] > e[a] ? 1 : -1
        }),
        e.each(n, function(t) {
            var e = n[t];
            2 == e.length ? n[t] = e[0] : n[t] = e.slice(0, e.length - 1)
        }))),
        n || []
    }
    ,
    t.setListCheck = function(n, i, o) {
        var r = t.getDom(n)
          , s = r.id;
        if (e(r).data("setListCheck", !0),
        i) {
            var l = [",", "|"];
            o && (l[0] = o.charAt(0),
            o.length > 1 && (l[1] = o.charAt(1)));
            for (var d = {}, c = i.split(l[0]), u = new RegExp("\\" + l[1],"g"), p = 0; p < c.length; p++)
                d[c[p].replace(u, ",")] = [c[p].split(l[1])];
            t.data.listContext[s].listdata = d;
            var h = t.data.listContext[s].colIndexs;
            h && (e.isArray(h) || (h = [h]),
            e(r).find("tbody tr").each(function(a) {
                var n = e(this)
                  , i = n.find('td:first [type="checkbox"]');
                if (i.length > 0) {
                    var o = [];
                    e.each(h, function(t) {
                        o.push(n.find("td").eq(h[t]).text())
                    });
                    var r = i.prop("checked")
                      , l = !!t.data.listContext[s].listdata[o.join(",")];
                    i.prop("checked", l),
                    r !== l && i.change()
                }
            }))
        } else
            e(r).find('td:nth-child(1) input[type="checkbox"]:checked').prop("checked", !1).change(),
            t.data.listContext[s].listdata = a;
        e(r).data("setListCheck", !1)
    }
    ,
    t.addDatalistCol = function(a, n, i, o) {
        o || (o = "70"),
        a = t.getDom(a);
        var r = e(a)
          , s = r.closest(".fixtable-box")
          , l = s.find(".fixtable-head thead");
        l.data("addDatalistCol" + n) || (l.children("tr:first").append('<th class="custom-col" rowspan="' + l.children().length + '"><span style="width:' + o + 'px;"><label>' + n + "</label></span></th>"),
        l.data("addDatalistCol" + n, !0)),
        r.find("thead tr:first").each(function(t) {
            e(this).append('<th><span style="width:' + o + 'px;"><label>' + n + "</label></span></th>")
        }),
        r.find("tbody tr").each(function(t) {
            var a = e('<div style="width:' + o + 'px"></div>')
              , n = i(e(this), t);
            e('<td class="code"></td>').append(a.append(n)).appendTo(this)
        })
    }
    ,
    t.columnVisible = function(n, i, o) {
        o === a && (o = !0),
        n = t.getDom(n);
        var r = e(n);
        "string" == typeof i && (i = r.find("th").index(r.find("th._" + i)));
        var s = o ? "removeClass" : "addClass";
        return r.closest(".datalist-box").find("tr").each(function() {
            e(this.cells[i])[s]("hide")
        }),
        i
    }
    ,
    t.addSumRow = function(n, o) {
        function r() {
            var i = e("tbody tr:last td", s)
              , r = 0;
            e.each(l, function(e, o) {
                var s = f[l[e] + u];
                s.sum = v[e];
                var d = i.eq(l[e] + u).children("span");
                i.eq(l[e] + u).attr("class") !== a && "" != i.eq(l[e] + u).attr("class") && (s.tdClass = i.eq(l[e] + u).attr("class")),
                c === a && i.eq(l[e] + u).children("p").attr("class") !== a && "" != i.eq(l[e] + u).children("p").attr("class") && (s.tdClass = i.eq(l[e] + u).children("p").attr("class").replace("form-control-static", "").trim()),
                n.declen && (s.sum = parseFloat(s.sum).toFixed(n.declen[r]),
                r++),
                "money" == s.tdClass && (s.sum = t.addComma(s.sum)),
                s.html = d.length > 0 ? d.clone().width("auto").text(s.sum).prop("outerHTML") : s.sum
            });
            var p = '<tr class="ui-state-disabled" id="sumrowlabel_' + d + "_" + n.source + '"><td colspan = "' + m + '">' + (n.label || "总计") + '：</td></tr><tr id="sumrowdata_' + d + "_" + n.source + '">' + e.map(f, function(t) {
                return '<td class = "' + (t.hidden ? " hide " : "") + (t.tdClass = t.tdClass) + '">' + (t.html === a ? "<span></span>" : t.html) + "</td>"
            }).join("") + "</tr>";
            t.data.addSumRow || (t.data.addSumRow = {}),
            t.data.addSumRow[d] || (t.data.addSumRow[d] = {}),
            t.data.addSumRow[d][n.source] = p,
            t.data.addSumRow[d].sumRow = f,
            e("#sumrowlabel_" + d + "_" + n.source + ",#sumrowdata_" + d + "_" + n.source).remove(),
            (n.addRow === a || n.addRow) && (h = e(p).appendTo(g)),
            o(f, null == h ? null : h.eq(1))
        }
        var s = t.getDom(n.list)
          , l = n.cols
          , d = s.id;
        if (0 === s.tBodies[0].rows.length)
            return n.source && e("#sumrowlabel_" + d + "_" + n.source + ",#sumrowdata_" + d + "_" + n.source).remove(),
            null;
        var c = t.data.dataList && t.data.dataList[d]
          , u = 0;
        if (c && (u = t.data.dataList[d].showRowId ? 2 : 1),
        c) {
            var p = e.map(t.data.dataList[d].columns, function(t) {
                return t.id
            });
            e.isArray(l) ? e.each(l, function(t, a) {
                "string" == typeof a && (l[t] = e.inArray(a, p))
            }) : e.each(l, function(t, a) {
                "string" == typeof a && (l[t] = e.inArray(a, p))
            })
        }
        var h = null
          , f = []
          , g = e("tfoot", s);
        0 == g.length && (g = e("<tfoot></tfoot>").appendTo(s));
        var m = 0
          , b = e(s).find("tbody tr:last td");
        if (b.each(function() {
            m += this.colSpan,
            f.push({
                hidden: e(this).hasClass("hide"),
                tdClass: ""
            })
        }),
        n.source)
            if (t.data.addSumRow && t.data.addSumRow[d] && !n.refresh && t.data.addSumRow[d][n.source])
                (n.addRow === a || n.addRow) && (h = e(t.data.addSumRow[d][n.source]).appendTo(g)),
                o(t.data.addSumRow[d].sumRow, null == h ? null : h.eq(1)),
                t.listColWidth(d);
            else {
                var v, y = (c ? t.data.dataList[d].currentPage : parseInt(e("#" + d).data("currentpage"))) * (c ? t.data.dataList[d].pageSize : parseInt(e("#" + d).data("pagesize")));
                if (t.data.ajax && t.data.ajax[n.source]) {
                    var w = t.getInputsArray(!0);
                    w = w.concat({
                        name: "row_number",
                        value: y
                    }),
                    t.init.ajax(n.source, w).done(function(t) {
                        v = t[0],
                        r(),
                        i(d)
                    })
                } else
                    t.sendCommand(n.source, e.extend({
                        row_number: y
                    }, n.paras), function(e) {
                        return v = e.data,
                        null == v ? (t.log("查询总计时隐式报文出错", "red"),
                        null) : (r(),
                        void i(d))
                    })
            }
        else {
            for (var x = 0; x < l.length; x++) {
                var _ = f[l[x] + u];
                _.sum = 0;
                var C = null;
                e("tbody td:nth-child(" + (parseInt(l[x]) + u + 1) + ")", s).each(function(a) {
                    var n = e(this)
                      , i = n.find(":input")
                      , o = i.length > 0 ? i.val().trim() : n.text().trim();
                    if (_.sum += parseFloat("" == o ? 0 : t.delComma(o)),
                    0 === a) {
                        var r = n.find("span");
                        if (r.length > 0 && (C = r.clone()),
                        n.attr("class") && (_.tdClass = n.attr("class")),
                        !c) {
                            var s = n.children("p").attr("class").replace("form-control-static", "").trim();
                            "" != s && (_.tdClass = s)
                        }
                    }
                }),
                n.declen && parseInt(n.declen[x]) > 0 && (_.sum = _.sum.toFixed(n.declen[x])),
                "money" == _.tdClass && (_.sum = t.addComma(_.sum)),
                _.html = C ? C.text(_.sum).prop("outerHTML") : _.sum
            }
            (n.addRow === a || n.addRow) && (h = e('<tr class="ui-state-disabled"><td colspan = "' + m + '">' + (n.label || "小计") + "：</td></tr><tr>" + e.map(f, function(t) {
                return '<td class = "' + (t.hidden ? " hide " : "") + (t.tdClass = t.tdClass) + '">' + (t.html === a ? "<span></span>" : t.html) + "</td>"
            }).join("") + "</tr>").appendTo(g)),
            i(d),
            o(f, null == h ? null : h.eq(1))
        }
    }
    ,
    t.datalistChanged = function(t) {
        return e("#" + t).find("td.dirty-flag").length > 0
    }
    ,
    t.noResultInfo = function(t, a) {
        var n = e("#" + t);
        if (0 === n.find("tbody tr").length) {
            var i = 0;
            n.find("thead tr:first").children().each(function() {
                i += this.colSpan
            }),
            0 === i && (i = 1),
            n.find(".no-result-info-tr").remove(),
            (n.find("tfoot").length > 0 ? n.find("tfoot") : e("<tfoot></tfoot>").appendTo(n)).append('<tr class="no-result-info-tr"><td colspan="' + i + '"><span class="glyphicon glyphicon-warning-sign"></span>&nbsp<span>' + (a || "没有查到结果") + "</span></td></tr>")
        } else
            n.find(".no-result-info-tr").remove()
    }
}(ydl, jQuery),
"undefined" == typeof ydl && alert("ydl.validator.js必须在ydl.base.js之后加载"),
function(t, e, a) {
    var n = {
        getFloatRegExp: function(t, e) {
            var a = t.negative ? "-?" : ""
              , n = (t.negative ? "，" : "，不") + "允许负数"
              , i = t.intlen ? parseInt(t.intlen) - 1 : ""
              , o = t.intlen ? "，不超过" + t.intlen + "位整数" : ""
              , r = parseInt(t.declen) || e
              , s = t.declen ? "，不超过" + t.declen + "位小数" : "";
            return {
                regExp: new RegExp("^(" + a + "(([1-9]\\d{0," + i + "})|0)(\\.\\d{1," + r + "})?)$"),
                message: o + s + n
            }
        },
        idCardHelper: function(e, n, i) {
            if (n = n.toUpperCase(),
            e && (e.value = n),
            i !== a && i !== n.length)
                return !1;
            var o = i || n.length;
            if (!/^(\d{15}|\d{17}(\d|X))$/.test(n))
                return !1;
            if (!t.isValidDate(15 == o ? "19" + n.substr(6, 6) : n.substr(6, 8)))
                return !1;
            if (18 === o) {
                for (var r = "79A584216379A5842", s = "10X98765432", l = 0, d = 0; d < 17; d++)
                    l += parseInt(n.charAt(d)) * parseInt(r.charAt(d), 16);
                return s.charAt(l % 11) === n.charAt(17)
            }
            return !0
        },
        checkRange: function(t, e, a, n) {
            var i = {
                "%l": e[0],
                "%h": e[1]
            }
              , o = "";
            return isNaN(t) ? o = "%f应为 %l 到 %h 之间（含）的数字，请重新输入！" : "" !== e[0] && parseFloat(t) < parseFloat(e[0]) ? o = "%f应为大于或等于 %l 的数字，请重新输入！" : "" !== e[1] && parseFloat(t) > parseFloat(e[1]) && (o = "%f应为小于或等于 %h 的数字，请重新输入！"),
            a("" === o, o, n, i)
        },
        checkLength: function(n, i, o, r) {
            var s, l = i.length2 !== a;
            "float" == i.type || "money" == i.type || "money" == e(this).attr("data-type") ? (n = t.delComma(n),
            "" != n && (n = parseFloat(n) + ""),
            s = n.replace(/\./g, "").length) : s = l ? n.length2() : n.length;
            var d = l ? "\n（汉字按2个字符计算）" : ""
              , c = l ? i.length2 : i.length;
            if (c !== a) {
                if (!isNaN(c) && !o(s == parseInt(c), "%f的长度应为 %l 个字符，您输入了 %n 个字符，请重新输入！" + d, r, {
                    "%n": s,
                    "%l": c,
                    "%h": c
                }))
                    return !1;
                if (e.isArray(c) && !isNaN(c[0]) && !isNaN(c[1]) && !o(s >= parseInt(c[0]) && s <= parseInt(c[1]), "%f的长度应在 %l 到 %h 个字符之间，您输入了 %n 个字符，请重新输入！" + d, r, {
                    "%n": s,
                    "%l": c[0],
                    "%h": c[1]
                }))
                    return !1
            }
            return o(!0, "", r)
        },
        checkExcept: function(t, a, n, i) {
            var o = "%f不允许输入%v"
              , r = !0;
            switch (e.type(a)) {
            case "string":
            case "number":
                r = t != a;
                break;
            case "array":
                for (var s = a.length; s--; )
                    if (t == a[s]) {
                        r = !1;
                        break
                    }
                break;
            case "regexp":
                r = function() {
                    return !a.test(t)
                }
            }
            return n(r, o, i)
        }
    }
      , i = {
        date: function(e, a) {
            if (a.formatdate && (e = e.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"),
            this && (this.value = e)),
            !/^([12]\d{3})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/.test(e))
                return {
                    result: !1,
                    message: "%f必须是正确的日期！\n（yyyy-mm-dd）"
                };
            var n = e.replace(/\b0+/g, "").split("-")
              , i = parseInt(n[1]) - 1
              , o = parseInt(n[2])
              , r = [31, t.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return {
                result: o >= 1 && o <= r[i],
                message: "%f不是正确的日期，请重新输入！"
            }
        },
        time: function(t, e) {
            return {
                result: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(t),
                message: "%f必须是正确的时间格式！\n（hh:mm:ss）"
            }
        },
        month: function(t, e) {
            return {
                result: /^([1-9]|1[012])$/.test(t),
                message: "%f必须是正确的月份！\n（1～12）"
            }
        },
        longmonth: function(t, e) {
            return {
                result: /^(0[1-9]|1[012])$/.test(t),
                message: "%f必须是正确的月份！\n（01～12）"
            }
        },
        day: function(t, e) {
            return {
                result: /^([1-9]|[12]\d|3[01])$/.test(t),
                message: "%f必须是正确的日期！\n（1～31）"
            }
        },
        longday: function(t, e) {
            return {
                result: /^(0[1-9]|[12]\d|3[01])$/.test(t),
                message: "%f必须是正确的日期！\n（01～31）"
            }
        },
        yyyymm: function(t, e) {
            return {
                result: /^\d{4}(0[1-9]|1[012])$/.test(t),
                message: "%f必须是yyyymm格式（四位数字年份加两位数字月份）"
            }
        },
        "yyyy-mm": function(t, e) {
            return {
                result: /^\d{4}-(0[1-9]|1[012])$/.test(t),
                message: "%f必须是yyyy-mm格式（四位数字年份加两位数字月份，中间用“-”连接）"
            }
        },
        number: function(t, e) {
            return {
                result: /^\d+$/.test(t),
                message: "%f必须输入数字！"
            }
        },
        "int": function(t, e) {
            var a = new RegExp("^(" + (e.negative ? "-?" : "") + "[1-9]\\d*|0)$");
            return a.test(t) ? parseInt(t) < (e.negative ? -2147483647 : 0) || parseInt(t) > 2147483647 ? {
                result: !1,
                message: "%f的大小超出了有效的整数范围"
            } : {
                result: !0
            } : {
                result: !1,
                message: "%f必须是" + (e.negative ? "" : "正") + "整数！"
            }
        },
        "float": function(t, e) {
            var a = n.getFloatRegExp(e, "");
            return {
                result: a.regExp.test(t),
                message: "%f必须是数字" + a.message
            }
        },
        validchar: function(t, e) {
            return {
                result: !/['"\\\|~&]/.test(t),
                message: "%f中不能含有以下字符！\n（单引号、双引号、反斜线、竖线、波浪线、＆符号）"
            }
        },
        money: function(t, a) {
            t = t.replace(/[, ]/g, ""),
            this && (this.value = t);
            var i = n.getFloatRegExp(a, "2")
              , o = i.regExp.test(t);
            return o || e(this).show().next(".money-display").hide(),
            {
                result: o,
                message: "%f必须是正确的金额格式" + i.message
            }
        },
        mobile: function(t, e) {
            return {
                result: /^1\d{10}$/.test(t),
                message: "%f必须是正确的手机号码格式！\n（1开头的11位数字）"
            }
        },
        phone: function(t, e) {
            return t = t.replace(/（/g, "(").replace(/）/g, ")"),
            this && (this.value = t),
            {
                result: /^(1\d{10}|(0\d{2,3}-|\(0\d{2,3}\))?[1-9]\d{6,7}(-\d{1,8})?|([48]00(-\d{3}-|\d{3})\d{4}))$/.test(t),
                message: "%f必须是正确的电话号码格式！\n（例如13812345678、88889999、010-12345678、(010)12345678-1234等）"
            }
        },
        phones: function(t, e) {
            var a = /^(1\d{10}|(0\d{2,3}-|\(0\d{2,3}\))?[1-9]\d{7}(-\d{1,8})?|([48]00(-\d{3}-|\d{3})\d{4}))$/;
            t = t.replace(/[；，, ]/g, ";").replace(/（/g, "(").replace(/）/g, ")"),
            this && (this.value = t);
            for (var n = t.split(";"), i = 0; i < n.length; i++)
                if (!a.test(n[i]))
                    return {
                        result: !1,
                        message: "%f中含有格式不正确的电话号码！"
                    };
            return {
                result: !0
            }
        },
        email: function(t, e) {
            return {
                result: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(t),
                message: "%f必须是正确的电子信箱格式！"
            }
        },
        zipcode: function(t, e) {
            return {
                result: /^\d{6}$/.test(t),
                message: "%f必须是正确的邮政编码！\n（6位数字）"
            }
        },
        idcard: function(t, e) {
            var a = e.idcardlength;
            return {
                result: n.idCardHelper(this, t, a),
                message: "%f必须是正确的身份证号码！\n（" + (a ? a : "15或18") + "位数字" + (18 == a ? "，最后一位可以是X" : "") + "）"
            }
        },
        idcard15: function(t, e) {
            return {
                result: n.idCardHelper(this, t, 15),
                message: "%f必须是正确的身份证号码！\n（15位数字）"
            }
        },
        idcard18: function(t, e) {
            return {
                result: n.idCardHelper(this, t, 18),
                message: "%f必须是正确的身份证号码！\n（18位数字，最后一位可以是X）"
            }
        },
        hanzi: function(t, e) {
            return {
                result: /^([\u4e00-\u9fa5])+$/.test(t),
                message: "%f必须全部是汉字！"
            }
        },
        ipv4: function(t, e) {
            return {
                result: /^(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))$/.test(t),
                message: "%f必须是合法的IP地址"
            }
        },
        orgcode: function(t, e) {
            function a() {
                if (!/^[A-Za-z0-9]{8}-?[0-9Xx]$/.test(t))
                    return !1;
                "-" != t.charAt(8) && (t = t.replace(/^(.{8})(.+)$/, "$1-$2")),
                t = t.toUpperCase(),
                this && (this.value = t);
                for (var e = [3, 7, 9, 10, 5, 8, 4, 2], a = 0, n = 0; n < 8; n++) {
                    var i = t.substr(n, 1);
                    if (i >= "0" && i <= "9")
                        a += e[n] * parseInt(i);
                    else {
                        if (!(i >= "A" && i <= "Z"))
                            return !1;
                        a += e[n] * (i.charCodeAt(0) - "A".charCodeAt(0) + 10)
                    }
                }
                var o = 11 - a % 11;
                return 10 == o ? o = "X" : 11 == o && (o = "0"),
                t.charAt(t.length - 1) == o
            }
            return {
                result: a(),
                message: "%f必须是正确的组织机构代码！\n（例如ABC12345-1、40000000X）"
            }
        },
        usccode: function(t, e) {
            for (var a = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28], n = "0123456789ABCDEFGHJKLMNPQRTUWXY", i = 0, o = 0; o < 17; o++)
                i += a[o] * n.indexOf(t.charAt(o));
            var r = i % 31 === 0 ? "0" : n.charAt(31 - i % 31);
            return {
                result: 18 === t.length && t.charAt(17) === r,
                message: "%f必须是正确的统一社会信用代码！\n（例如91350100M000100Y43）"
            }
        },
        a_test1: function(a, n) {
            var i = e.Deferred();
            return t.ajax(t.contexPath + "/test.jsp", {
                s: a,
                t: n.t || 1
            }, function(t) {
                i.resolve()
            }, {
                handleError: function(t, e, a) {
                    i.reject(a)
                }
            }),
            {
                result: i.promise(),
                message: "异步校验测试1失败：%s"
            }
        },
        a_test2: function(a, n) {
            var i = t.sendCommand("CMD99", {
                s: a,
                t: n.t || 1
            }, e.noop);
            return {
                result: i,
                message: "异步校验测试2失败：%s"
            }
        }
    }
      , o = {
        "message.show": function(t, e, a) {
            a.attr("data-original-title", e).tooltip({
                html: !0,
                container: !(t.closest(".modal-body").length > 0) && "body"
            }).addClass("has-error")
        },
        "message.clear": function(t, e) {
            t.tooltip("hide"),
            e.removeAttr("data-original-title")
        }
    }
      , r = {
        negative: !1,
        keepspace: !1,
        uppercase: !1,
        lowercase: !1,
        formatdate: !0,
        reset: !1,
        focus: !0
    };
    t.validator = function(s, l) {
        function d() {}
        function c() {
            l.focus !== !1 && b.select().focus()
        }
        function u(t, n, i, o) {
            var r;
            switch (e.type(t)) {
            case "function":
                r = t.call(m, v);
                break;
            case "regexp":
                r = t.test(v);
                break;
            case "boolean":
                r = t;
                break;
            case "object":
                r = t;
                break;
            default:
                r = v == t
            }
            n = l.message === a ? n || "%f格式不正确，请重新输入！" : l.message,
            i || (i = n);
            var s = n.replace(/%f/gi, "【" + y + "】").replace(/%v/gi, v);
            o && e.each(o, function(t, e) {
                s = s.replace(new RegExp(t,"gi"), e)
            });
            var d = b.data("errorMessages");
            return d || (d = {},
            b.data("errorMessages", d)),
            e.isFunction(r.promise) ? r.then(function() {
                i in d && delete d[i],
                p(b)
            }, function(t) {
                d[i] = s.replace(/%s/gi, t),
                p(b)
            }) : (r ? i in d && delete d[i] : d[i] = s,
            p(b),
            r)
        }
        function p(t) {
            ll(t.prop("id") + "/" + t.prop("type") + "/" + t.val(), t.data("errorMessages"));
            var a = e.map(t.data("errorMessages"), function(t, e) {
                return t
            }).join("<br />")
              , n = t;
            if (t.hasClass("money") && (n = t.parent()),
            t.is(":hidden")) {
                var i = t.prevAll(".combobox-container");
                i.length > 0 && (n = i)
            }
            a ? (o["message.show"](t, a, n),
            n.addClass("has-error")) : (o["message.clear"](t, n),
            n.removeClass("has-error")),
            t.data("messageHolder", n)
        }
        function h(t) {
            return g ? e.Deferred().fail(c).reject(t) : (c(),
            !1)
        }
        function f() {
            return g ? e.Deferred().done(d).resolve() : (d(),
            !0)
        }
        l || (l = {
            required: !0
        }),
        l = e.extend({}, r, l);
        var g = l.type && 0 === l.type.indexOf("a_") || l.async
          , m = t.getDom(s);
        if (m != a && (m instanceof Array || window.HTMLCollection && m instanceof HTMLCollection || window.NodeList && m instanceof NodeList)) {
            if (1 !== m.length)
                return function() {
                    if (g) {
                        for (var a = !0, n = 0; n < m.length; n++)
                            m[n] && (a &= t.validator(m[n], l, !0));
                        return !!a
                    }
                    for (var i = [], n = 0; n < m.length; n++)
                        m[n] && i.push(t.validator(m[n], l, !1));
                    return e.when.apply(window, i)
                }();
            m = m[0]
        }
        var b, v;
        if (m)
            b = e(m),
            v = m.value;
        else {
            if ("string" != typeof s)
                return t.alert("表单校验出错：未找到输入字段" + String(s)),
                h();
            if (m = document.getElementById("group_" + s),
            !m)
                return t.alert("表单校验出错：未找到输入字段" + String(s)),
                h();
            b = e(m),
            v = e("input:checked", m).map(function() {
                return this.value
            }).get().join(","),
            ll("group_fieldValue", v)
        }
        var y = l.desc || t.getLabel(m, "输入字段");
        if (l.reset && t.validator.clear(m),
        l.keepspace || "text" != m.type && "textarea" !== m.type || (m.value = v = v.trim()),
        l.required && !u("" != v, "%f为必填项，请输入！", "REQUIRED"))
            return h();
        if ("" !== v) {
            if (l.uppercase && (m.value = v.toUpperCase()),
            l.lowercase && (m.value = v.toLowerCase()),
            l.except !== a && !n.checkExcept(v, l.except, u, "EXCEPT"))
                return h();
            if ((l.length !== a || l.length2 !== a) && !n.checkLength.call(m, v, l, u, "LENGTH"))
                return h();
            if (e.isArray(l.range) && !isNaN(l.range[0]) && !isNaN(l.range[1]) && !n.checkRange(v, l.range, u, "RANGE"))
                return h();
            if (l.type !== a || l.rule !== a || l.async !== a) {
                var w;
                if (l.type !== a && e.isFunction(i[l.type])) {
                    var x = i[l.type].call(m, v, l);
                    w = u(x.result, x.message, "TYPE")
                } else
                    l.rule !== a ? w = u(l.rule, l.message, l.tag || "RULE") : l.async !== a && (w = u(l.async, l.message, l.tag || "RULE"));
                if (g)
                    return w.done(d).fail(c);
                if (!w)
                    return c(),
                    !1
            }
        }
        return f()
    }
    ,
    t.validator.clear = function(n) {
        var i = e(n === a ? ".has-error" : t.getDom(n));
        i.each(function() {
            var t = e(this);
            t.find("input.money").length > 0 ? t = t.find("input.money") : t.hasClass("combobox-container") && (t = t.next("select.combobox"));
            var a = t.data("messageHolder") || t;
            a.hasClass("has-error") && (o["message.clear"](t, a),
            a.removeClass("has-error").data("errorMessages", {}))
        })
    }
    ,
    t.validator.setDefault = function(t) {
        return e.extend(r, t)
    }
    ,
    t.validator.getDefault = function() {
        return e.extend({}, r)
    }
    ,
    t.validator.set = function(t, e) {
        t.indexOf(".") == -1 ? i[t] = e : o[t] = e
    }
    ,
    t.validator.get = function(t, n, o) {
        function r(t, e) {
            return t.keepspace || (e = e.trim()),
            t.uppercase && (e = e.toUpperCase()),
            t.lowercase && (e = e.toLowerCase()),
            e
        }
        var s = i[t];
        return n || (n = {}),
        t.indexOf("a_") === -1 ? function(t, a) {
            a = e.extend(n, a),
            t = r(a, t);
            var i = s(t, a);
            return o ? i : i.result
        }
        : function(t, i, o) {
            e.isFunction(i) && (o = i,
            i = a),
            i = e.extend(n, i),
            t = r(i, t);
            var l = s(t, i);
            l.result.done(function() {
                o(!0)
            }).fail(function(t) {
                o(!1, l.message ? l.message.replace(/%s/g, t) : "")
            })
        }
    }
    ,
    t.checkFieldAttr = function(n, i) {
        if (n.hasClass("_nocheck"))
            return e.Deferred().resolve();
        var o = {};
        n.attr("required") !== a && (o.required = !0),
        n.data("type") && (o.type = n.data("type"));
        var r = n.attr("maxlength")
          , s = n.data("minlength");
        s === a && r === a || (s === a && (s = 0),
        r === a && (r = Number.POSITIVE_INFINITY),
        o.length2 = [s, r]);
        var l = n.data("declen");
        l !== a && (o.declen = l);
        var d = n.data("intlen");
        d !== a && (o.intlen = d);
        var c = n.data("negative");
        c !== a && (o.negative = c);
        var u = n.data("min")
          , p = n.data("max");
        if (u === a && p === a || (u === a && (u = Number.NEGATIVE_INFINITY),
        p === a && (p = Number.POSITIVE_INFINITY),
        o.range = [u, p]),
        e.isEmptyObject(o))
            return !0;
        o.focus = i;
        var h = t.validator(n, o);
        return ll("checkFieldAttr:" + n.prop("id") + "/" + n.val() + "/" + h, o),
        h
    }
    ,
    t.formValidate = function(n, i) {
        i === a && (i = !0),
        n = t.getDom(n);
        for (var o = e(":input[name],select.combobox", n).not(e(".datalist-box :input", n)), r = [], s = 0; s < o.length; s++)
            if ("radio" == o[s].type || "checkbox" == o[s].type) {
                var l = o.eq(s).closest("fieldset");
                l.data("required") && r.push(t.validator(l.attr("data-id"), {
                    required: !0,
                    focus: i
                }))
            } else
                r.push(t.checkFieldAttr(o.eq(s), i));
        return t.deferred.apply(null, r).done(function() {
            e.isFunction(n.after_auto_validate) && n.after_auto_validate()
        })
    }
    ,
    t.isValidDate = function(e) {
        var a = t.validator.get("date");
        return a(e, {
            formatdate: !0
        })
    }
}(ydl, jQuery),
$(function() {
    $("body").on("change", ":input[name],select.combobox", function() {
        if ("radio" == this.type || "checkbox" == this.type) {
            var t = $(this).closest("fieldset");
            t.data("required") && ydl.validator(t.data("id"), {
                required: !0,
                focus: !1
            })
        } else
            ydl.checkFieldAttr($(this), !1)
    })
}),
"undefined" == typeof ydl && alert("ydl.datalist.js必须在ydl.base.js之后加载"),
function(t, e, a) {
    function n() {
        var a = poolSelect._WF
          , n = poolSelect._ST
          , r = poolSelect._IS
          , s = "";
        return a || (s += "流程号未在总线中取到值！\n"),
        n || (s += "步骤号未在总线中取到值！\n"),
        r || (s += "实例号未在总线中取到值！\n"),
        "" != s ? (t.alert(s),
        !1) : void t.ajax(t.contexPath + "/getDocument", {
            poolKey: poolSelect._POOLKEY,
            instanceid: r,
            flowid: a,
            stepid: n,
            operid: poolSelect._OPERID,
            opname: poolSelect._OPERNAME
        }).done(function(t) {
            if (0 == t.data.ckbz && 0 == t.data.smbz)
                return "";
            var a = '<div id="' + i + '" class="panel"><div class="panel-heading"></div><div class="panel-body"></div></div>';
            e("#pageTabs").after(e(a));
            var n = e.map(t.data, function(t, e) {
                return '<param name="' + e + '" value="' + t.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '"/>'
            }).join("")
              , r = '<object id="' + o + '" classid="clsid:F0E6D919-40BB-4B2B-AAD5-743E54F45C78" codebase="">' + n + "</object>";
            return e("#" + i + " .panel-body").html(r),
            e("#" + o).css({
                height: "500px",
                width: "100%"
            }),
            e(a)
        }).fail(function(t) {})
    }
    "undefined" == typeof t.edoc && (t.edoc = {});
    var i = "edocPanel"
      , o = "edocCtrl";
    t.edoc.show = function() {
        var t = e("#" + i);
        return t.length > 0 ? void t.show() : n()
    }
    ,
    t.edoc.hide = function() {
        e("#" + i).hide()
    }
}(ydl, jQuery),
function(t, e) {
    "object" == typeof exports ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t)
}(this, function(t) {
    function e(t) {
        this._targetElement = t,
        this._introItems = [],
        this._options = {
            nextLabel: "Next &rarr;",
            prevLabel: "&larr; Back",
            skipLabel: "Skip",
            doneLabel: "Done",
            hidePrev: !1,
            hideNext: !1,
            tooltipPosition: "bottom",
            tooltipClass: "",
            highlightClass: "",
            exitOnEsc: !0,
            exitOnOverlayClick: !0,
            showStepNumbers: !0,
            keyboardNavigation: !0,
            showButtons: !0,
            showBullets: !0,
            showProgress: !1,
            scrollToElement: !0,
            scrollTo: "element",
            scrollPadding: 30,
            overlayOpacity: .3,
            positionPrecedence: ["bottom", "top", "right", "left"],
            disableInteraction: !1,
            hintPosition: "top-middle",
            hintButtonLabel: "Got it",
            hintAnimation: !0
        }
    }
    function a(t) {
        var e = []
          , a = this;
        if (this._options.steps)
            for (var i = 0, o = this._options.steps.length; i < o; i++) {
                var l = n(this._options.steps[i]);
                if (l.step = e.length + 1,
                "string" == typeof l.element && (l.element = document.querySelector(l.element)),
                "undefined" == typeof l.element || null == l.element) {
                    var c = document.querySelector(".introjsFloatingElement");
                    null == c && (c = document.createElement("div"),
                    c.className = "introjsFloatingElement",
                    document.body.appendChild(c)),
                    l.element = c,
                    l.position = "floating"
                }
                l.scrollTo = l.scrollTo || this._options.scrollTo,
                "undefined" == typeof l.disableInteraction && (l.disableInteraction = this._options.disableInteraction),
                null != l.element && e.push(l)
            }
        else {
            var u = t.querySelectorAll("*[data-intro]");
            if (u.length < 1)
                return !1;
            for (var i = 0, p = u.length; i < p; i++) {
                var h = u[i];
                if ("none" != h.style.display) {
                    var f = parseInt(h.getAttribute("data-step"), 10)
                      , g = this._options.disableInteraction;
                    "undefined" != typeof h.getAttribute("data-disable-interaction") && (g = !!h.getAttribute("data-disable-interaction")),
                    f > 0 && (e[f - 1] = {
                        element: h,
                        intro: h.getAttribute("data-intro"),
                        step: parseInt(h.getAttribute("data-step"), 10),
                        tooltipClass: h.getAttribute("data-tooltipClass"),
                        highlightClass: h.getAttribute("data-highlightClass"),
                        position: h.getAttribute("data-position") || this._options.tooltipPosition,
                        scrollTo: h.getAttribute("data-scrollTo") || this._options.scrollTo,
                        disableInteraction: g
                    })
                }
            }
            for (var m = 0, i = 0, p = u.length; i < p; i++) {
                var h = u[i];
                if (null == h.getAttribute("data-step")) {
                    for (; ; ) {
                        if ("undefined" == typeof e[m])
                            break;
                        m++
                    }
                    var g = this._options.disableInteraction;
                    "undefined" != typeof h.getAttribute("data-disable-interaction") && (g = !!h.getAttribute("data-disable-interaction")),
                    e[m] = {
                        element: h,
                        intro: h.getAttribute("data-intro"),
                        step: m + 1,
                        tooltipClass: h.getAttribute("data-tooltipClass"),
                        highlightClass: h.getAttribute("data-highlightClass"),
                        position: h.getAttribute("data-position") || this._options.tooltipPosition,
                        scrollTo: h.getAttribute("data-scrollTo") || this._options.scrollTo,
                        disableInteraction: g
                    }
                }
            }
        }
        for (var b = [], v = 0; v < e.length; v++)
            e[v] && b.push(e[v]);
        if (e = b,
        e.sort(function(t, e) {
            return t.step - e.step
        }),
        a._introItems = e,
        T.call(a, t)) {
            r.call(a);
            t.querySelector(".introjs-skipbutton"),
            t.querySelector(".introjs-nextbutton");
            a._onKeyDown = function(e) {
                if (27 === e.keyCode && 1 == a._options.exitOnEsc)
                    d.call(a, t);
                else if (37 === e.keyCode)
                    s.call(a);
                else if (39 === e.keyCode)
                    r.call(a);
                else if (13 === e.keyCode) {
                    var n = e.target || e.srcElement;
                    n && n.className.indexOf("introjs-prevbutton") > 0 ? s.call(a) : n && n.className.indexOf("introjs-skipbutton") > 0 ? (a._introItems.length - 1 == a._currentStep && "function" == typeof a._introCompleteCallback && a._introCompleteCallback.call(a),
                    d.call(a, t)) : r.call(a),
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
                }
            }
            ,
            a._onResize = function(t) {
                a.refresh.call(a)
            }
            ,
            window.addEventListener ? (this._options.keyboardNavigation && window.addEventListener("keydown", a._onKeyDown, !0),
            window.addEventListener("resize", a._onResize, !0)) : document.attachEvent && (this._options.keyboardNavigation && document.attachEvent("onkeydown", a._onKeyDown),
            document.attachEvent("onresize", a._onResize))
        }
        return !1
    }
    function n(t) {
        if (null == t || "object" != typeof t || "undefined" != typeof t.nodeType)
            return t;
        var e = {};
        for (var a in t)
            "undefined" != typeof jQuery && t[a]instanceof jQuery ? e[a] = t[a] : e[a] = n(t[a]);
        return e
    }
    function i(t) {
        this._currentStep = t - 2,
        "undefined" != typeof this._introItems && r.call(this)
    }
    function o(t) {
        this._currentStepNumber = t,
        "undefined" != typeof this._introItems && r.call(this)
    }
    function r() {
        if (this._direction = "forward",
        "undefined" != typeof this._currentStepNumber)
            for (var t = 0, e = this._introItems.length; t < e; t++) {
                var a = this._introItems[t];
                a.step === this._currentStepNumber && (this._currentStep = t - 1,
                this._currentStepNumber = void 0)
            }
        if ("undefined" == typeof this._currentStep ? this._currentStep = 0 : ++this._currentStep,
        "undefined" != typeof this._introBeforeChangeCallback)
            var n = this._introBeforeChangeCallback.call(this);
        if (n === !1)
            return --this._currentStep,
            !1;
        if (this._introItems.length <= this._currentStep)
            return "function" == typeof this._introCompleteCallback && this._introCompleteCallback.call(this),
            void d.call(this, this._targetElement);
        var i = this._introItems[this._currentStep];
        v.call(this, i)
    }
    function s() {
        if (this._direction = "backward",
        0 === this._currentStep)
            return !1;
        if (--this._currentStep,
        "undefined" != typeof this._introBeforeChangeCallback)
            var t = this._introBeforeChangeCallback.call(this);
        if (t === !1)
            return ++this._currentStep,
            !1;
        var e = this._introItems[this._currentStep];
        v.call(this, e)
    }
    function l() {
        if (g.call(this, document.querySelector(".introjs-helperLayer")),
        g.call(this, document.querySelector(".introjs-tooltipReferenceLayer")),
        g.call(this, document.querySelector(".introjs-disableInteraction")),
        void 0 !== this._currentStep && null !== this._currentStep) {
            var t = document.querySelector(".introjs-helperNumberLayer")
              , e = document.querySelector(".introjs-arrow")
              , a = document.querySelector(".introjs-tooltip");
            c.call(this, this._introItems[this._currentStep].element, a, e, t)
        }
        return I.call(this),
        this
    }
    function d(t, e) {
        var a = !0;
        if (void 0 != this._introBeforeExitCallback && (a = this._introBeforeExitCallback.call(self)),
        e || a !== !1) {
            var n = t.querySelectorAll(".introjs-overlay");
            if (n && n.length > 0)
                for (var i = n.length - 1; i >= 0; i--) {
                    var o = n[i];
                    o.style.opacity = 0,
                    setTimeout(function() {
                        this.parentNode && this.parentNode.removeChild(this)
                    }
                    .bind(o), 500)
                }
            var r = t.querySelector(".introjs-helperLayer");
            r && r.parentNode.removeChild(r);
            var s = t.querySelector(".introjs-tooltipReferenceLayer");
            s && s.parentNode.removeChild(s);
            var l = t.querySelector(".introjs-disableInteraction");
            l && l.parentNode.removeChild(l);
            var d = document.querySelector(".introjsFloatingElement");
            d && d.parentNode.removeChild(d),
            w();
            var c = document.querySelectorAll(".introjs-fixParent");
            if (c && c.length > 0)
                for (var i = c.length - 1; i >= 0; i--)
                    c[i].className = c[i].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "");
            window.removeEventListener ? window.removeEventListener("keydown", this._onKeyDown, !0) : document.detachEvent && document.detachEvent("onkeydown", this._onKeyDown),
            void 0 != this._introExitCallback && this._introExitCallback.call(self),
            this._currentStep = void 0
        }
    }
    function c(t, e, a, n, i) {
        var o, r, s, l, d, c = "";
        if (i = i || !1,
        e.style.top = null,
        e.style.right = null,
        e.style.bottom = null,
        e.style.left = null,
        e.style.marginLeft = null,
        e.style.marginTop = null,
        a.style.display = "inherit",
        "undefined" != typeof n && null != n && (n.style.top = null,
        n.style.left = null),
        this._introItems[this._currentStep])
            switch (o = this._introItems[this._currentStep],
            c = "string" == typeof o.tooltipClass ? o.tooltipClass : this._options.tooltipClass,
            e.className = ("introjs-tooltip " + c).replace(/^\s+|\s+$/g, ""),
            d = this._introItems[this._currentStep].position,
            "floating" != d && (d = "auto" === d ? h.call(this, t, e) : h.call(this, t, e, d)),
            s = M(t),
            r = M(e),
            l = j(),
            d) {
            case "top":
                if (a.className = "introjs-arrow bottom",
                i)
                    var f = 0;
                else
                    var f = 15;
                u(s, f, r, l, e),
                e.style.bottom = s.height + 20 + "px";
                break;
            case "right":
                e.style.left = s.width + 20 + "px",
                s.top + r.height > l.height ? (a.className = "introjs-arrow left-bottom",
                e.style.top = "-" + (r.height - s.height - 20) + "px") : a.className = "introjs-arrow left";
                break;
            case "left":
                i || 1 != this._options.showStepNumbers || (e.style.top = "15px"),
                s.top + r.height > l.height ? (e.style.top = "-" + (r.height - s.height - 20) + "px",
                a.className = "introjs-arrow right-bottom") : a.className = "introjs-arrow right",
                e.style.right = s.width + 20 + "px";
                break;
            case "floating":
                a.style.display = "none",
                e.style.left = "50%",
                e.style.top = "50%",
                e.style.marginLeft = "-" + r.width / 2 + "px",
                e.style.marginTop = "-" + r.height / 2 + "px",
                "undefined" != typeof n && null != n && (n.style.left = "-" + (r.width / 2 + 18) + "px",
                n.style.top = "-" + (r.height / 2 + 18) + "px");
                break;
            case "bottom-right-aligned":
                a.className = "introjs-arrow top-right";
                var g = 0;
                p(s, g, r, e),
                e.style.top = s.height + 20 + "px";
                break;
            case "bottom-middle-aligned":
                a.className = "introjs-arrow top-middle";
                var m = s.width / 2 - r.width / 2;
                i && (m += 5),
                p(s, m, r, e) && (e.style.right = null,
                u(s, m, r, l, e)),
                e.style.top = s.height + 20 + "px";
                break;
            case "bottom-left-aligned":
            case "bottom":
            default:
                a.className = "introjs-arrow top";
                var f = 0;
                u(s, f, r, l, e),
                e.style.top = s.height + 20 + "px"
            }
    }
    function u(t, e, a, n, i) {
        return t.left + e + a.width > n.width ? (i.style.left = n.width - a.width - t.left + "px",
        !1) : (i.style.left = e + "px",
        !0)
    }
    function p(t, e, a, n) {
        return t.left + t.width - e - a.width < 0 ? (n.style.left = -t.left + "px",
        !1) : (n.style.right = e + "px",
        !0)
    }
    function h(t, e, a) {
        var n = this._options.positionPrecedence.slice()
          , i = j()
          , o = M(e).height + 10
          , r = M(e).width + 20
          , s = M(t)
          , l = "floating";
        return s.left + r > i.width || s.left + s.width / 2 - r < 0 ? (f(n, "bottom"),
        f(n, "top")) : (s.height + s.top + o > i.height && f(n, "bottom"),
        s.top - o < 0 && f(n, "top")),
        s.width + s.left + r > i.width && f(n, "right"),
        s.left - r < 0 && f(n, "left"),
        n.length > 0 && (l = n[0]),
        a && "auto" != a && n.indexOf(a) > -1 && (l = a),
        l
    }
    function f(t, e) {
        t.indexOf(e) > -1 && t.splice(t.indexOf(e), 1)
    }
    function g(t) {
        if (t) {
            if (!this._introItems[this._currentStep])
                return;
            var e = this._introItems[this._currentStep]
              , a = M(e.element)
              , n = 10;
            $(e.element) ? t.className += " introjs-fixedTooltip" : t.className = t.className.replace(" introjs-fixedTooltip", ""),
            "floating" == e.position && (n = 0),
            t.setAttribute("style", "width: " + (a.width + n) + "px; height:" + (a.height + n) + "px; top:" + (a.top - 5) + "px;left: " + (a.left - 5) + "px;")
        }
    }
    function m() {
        var t = document.querySelector(".introjs-disableInteraction");
        null === t && (t = document.createElement("div"),
        t.className = "introjs-disableInteraction",
        this._targetElement.appendChild(t)),
        g.call(this, t)
    }
    function b(t) {
        t.setAttribute("role", "button"),
        t.tabIndex = 0
    }
    function v(t) {
        "undefined" != typeof this._introChangeCallback && this._introChangeCallback.call(this, t.element);
        var e = this
          , a = document.querySelector(".introjs-helperLayer")
          , n = document.querySelector(".introjs-tooltipReferenceLayer")
          , i = "introjs-helperLayer";
        M(t.element);
        if ("string" == typeof t.highlightClass && (i += " " + t.highlightClass),
        "string" == typeof this._options.highlightClass && (i += " " + this._options.highlightClass),
        null != a) {
            var o = n.querySelector(".introjs-helperNumberLayer")
              , l = n.querySelector(".introjs-tooltiptext")
              , u = n.querySelector(".introjs-arrow")
              , p = n.querySelector(".introjs-tooltip")
              , h = n.querySelector(".introjs-skipbutton")
              , f = n.querySelector(".introjs-prevbutton")
              , v = n.querySelector(".introjs-nextbutton");
            if (a.className = i,
            p.style.opacity = 0,
            p.style.display = "none",
            null != o) {
                var _ = this._introItems[t.step - 2 >= 0 ? t.step - 2 : 0];
                (null != _ && "forward" == this._direction && "floating" == _.position || "backward" == this._direction && "floating" == t.position) && (o.style.opacity = 0)
            }
            g.call(e, a),
            g.call(e, n);
            var C = document.querySelectorAll(".introjs-fixParent");
            if (C && C.length > 0)
                for (var k = C.length - 1; k >= 0; k--)
                    C[k].className = C[k].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "");
            w(),
            e._lastShowElementTimer && clearTimeout(e._lastShowElementTimer),
            e._lastShowElementTimer = setTimeout(function() {
                null != o && (o.innerHTML = t.step),
                l.innerHTML = t.intro,
                p.style.display = "block",
                c.call(e, t.element, p, u, o),
                e._options.showBullets && (n.querySelector(".introjs-bullets li > a.active").className = "",
                n.querySelector('.introjs-bullets li > a[data-stepnumber="' + t.step + '"]').className = "active"),
                n.querySelector(".introjs-progress .introjs-progressbar").setAttribute("style", "width:" + H.call(e) + "%;"),
                p.style.opacity = 1,
                o && (o.style.opacity = 1),
                "undefined" != typeof h && null != h && /introjs-donebutton/gi.test(h.className) ? h.focus() : "undefined" != typeof v && null != v && v.focus(),
                y.call(e, t.scrollTo, t, l)
            }, 350)
        } else {
            var $ = document.createElement("div")
              , j = document.createElement("div")
              , S = document.createElement("div")
              , T = document.createElement("div")
              , E = document.createElement("div")
              , N = document.createElement("div")
              , I = document.createElement("div")
              , P = document.createElement("div");
            $.className = i,
            j.className = "introjs-tooltipReferenceLayer",
            g.call(e, $),
            g.call(e, j),
            this._targetElement.appendChild($),
            this._targetElement.appendChild(j),
            S.className = "introjs-arrow",
            E.className = "introjs-tooltiptext",
            E.innerHTML = t.intro,
            N.className = "introjs-bullets",
            this._options.showBullets === !1 && (N.style.display = "none");
            for (var L = document.createElement("ul"), k = 0, D = this._introItems.length; k < D; k++) {
                var A = document.createElement("li")
                  , O = document.createElement("a");
                O.onclick = function() {
                    e.goToStep(this.getAttribute("data-stepnumber"))
                }
                ,
                k === t.step - 1 && (O.className = "active"),
                b(O),
                O.innerHTML = "&nbsp;",
                O.setAttribute("data-stepnumber", this._introItems[k].step),
                A.appendChild(O),
                L.appendChild(A)
            }
            N.appendChild(L),
            I.className = "introjs-progress",
            this._options.showProgress === !1 && (I.style.display = "none");
            var B = document.createElement("div");
            if (B.className = "introjs-progressbar",
            B.setAttribute("style", "width:" + H.call(this) + "%;"),
            I.appendChild(B),
            P.className = "introjs-tooltipbuttons",
            this._options.showButtons === !1 && (P.style.display = "none"),
            T.className = "introjs-tooltip",
            T.appendChild(E),
            T.appendChild(N),
            T.appendChild(I),
            1 == this._options.showStepNumbers) {
                var q = document.createElement("span");
                q.className = "introjs-helperNumberLayer",
                q.innerHTML = t.step,
                j.appendChild(q)
            }
            T.appendChild(S),
            j.appendChild(T);
            var v = document.createElement("a");
            v.onclick = function() {
                e._introItems.length - 1 != e._currentStep && r.call(e)
            }
            ,
            b(v),
            v.innerHTML = this._options.nextLabel;
            var f = document.createElement("a");
            f.onclick = function() {
                0 != e._currentStep && s.call(e)
            }
            ,
            b(f),
            f.innerHTML = this._options.prevLabel;
            var h = document.createElement("a");
            h.className = "introjs-button introjs-skipbutton",
            b(h),
            h.innerHTML = this._options.skipLabel,
            h.onclick = function() {
                e._introItems.length - 1 == e._currentStep && "function" == typeof e._introCompleteCallback && e._introCompleteCallback.call(e),
                d.call(e, e._targetElement)
            }
            ,
            P.appendChild(h),
            this._introItems.length > 1 && (P.appendChild(f),
            P.appendChild(v)),
            T.appendChild(P),
            c.call(e, t.element, T, S, q),
            y.call(this, t.scrollTo, t, T)
        }
        var F = e._targetElement.querySelector(".introjs-disableInteraction");
        F && F.parentNode.removeChild(F),
        t.disableInteraction && m.call(e),
        "undefined" != typeof v && null != v && v.removeAttribute("tabIndex"),
        "undefined" != typeof f && null != f && f.removeAttribute("tabIndex"),
        0 == this._currentStep && this._introItems.length > 1 ? ("undefined" != typeof h && null != h && (h.className = "introjs-button introjs-skipbutton"),
        "undefined" != typeof v && null != v && (v.className = "introjs-button introjs-nextbutton"),
        1 == this._options.hidePrev ? ("undefined" != typeof f && null != f && (f.className = "introjs-button introjs-prevbutton introjs-hidden"),
        "undefined" != typeof v && null != v && (v.className += " introjs-fullbutton")) : "undefined" != typeof f && null != f && (f.className = "introjs-button introjs-prevbutton introjs-disabled"),
        "undefined" != typeof f && null != f && (f.tabIndex = "-1"),
        "undefined" != typeof h && null != h && (h.innerHTML = this._options.skipLabel)) : this._introItems.length - 1 == this._currentStep || 1 == this._introItems.length ? ("undefined" != typeof h && null != h && (h.innerHTML = this._options.doneLabel,
        h.className += " introjs-donebutton"),
        "undefined" != typeof f && null != f && (f.className = "introjs-button introjs-prevbutton"),
        1 == this._options.hideNext ? ("undefined" != typeof v && null != v && (v.className = "introjs-button introjs-nextbutton introjs-hidden"),
        "undefined" != typeof f && null != f && (f.className += " introjs-fullbutton")) : "undefined" != typeof v && null != v && (v.className = "introjs-button introjs-nextbutton introjs-disabled"),
        "undefined" != typeof v && null != v && (v.tabIndex = "-1")) : ("undefined" != typeof h && null != h && (h.className = "introjs-button introjs-skipbutton"),
        "undefined" != typeof f && null != f && (f.className = "introjs-button introjs-prevbutton"),
        "undefined" != typeof v && null != v && (v.className = "introjs-button introjs-nextbutton"),
        "undefined" != typeof h && null != h && (h.innerHTML = this._options.skipLabel)),
        "undefined" != typeof v && null != v && v.focus(),
        x(t),
        "undefined" != typeof this._introAfterChangeCallback && this._introAfterChangeCallback.call(this, t.element)
    }
    function y(t, e, a) {
        if (this._options.scrollToElement) {
            if ("tooltip" === t)
                var n = a.getBoundingClientRect();
            else
                var n = e.element.getBoundingClientRect();
            if (!S(e.element)) {
                var i = j().height
                  , o = n.bottom - (n.bottom - n.top);
                n.bottom - i;
                o < 0 || e.element.clientHeight > i ? window.scrollBy(0, n.top - (i / 2 - n.height / 2) - this._options.scrollPadding) : window.scrollBy(0, n.top - (i / 2 - n.height / 2) + this._options.scrollPadding)
            }
        }
    }
    function w() {
        for (var t = document.querySelectorAll(".introjs-showElement"), e = 0, a = t.length; e < a; e++) {
            var n = t[e];
            C(n, /introjs-[a-zA-Z]+/g)
        }
    }
    function x(t) {
        if (t.element instanceof SVGElement)
            for (var e = t.element.parentNode; null != t.element.parentNode && e.tagName && "body" !== e.tagName.toLowerCase(); )
                "svg" === e.tagName.toLowerCase() && _(e, "introjs-showElement introjs-relativePosition"),
                e = e.parentNode;
        _(t.element, "introjs-showElement");
        var a = k(t.element, "position");
        "absolute" !== a && "relative" !== a && "fixed" !== a && _(t.element, "introjs-relativePosition");
        for (var e = t.element.parentNode; null != e && e.tagName && "body" !== e.tagName.toLowerCase(); ) {
            var n = k(e, "z-index")
              , i = parseFloat(k(e, "opacity"))
              , o = k(e, "transform") || k(e, "-webkit-transform") || k(e, "-moz-transform") || k(e, "-ms-transform") || k(e, "-o-transform");
            (/[0-9]+/.test(n) || i < 1 || "none" !== o && void 0 !== o) && (e.className += " introjs-fixParent"),
            e = e.parentNode
        }
    }
    function _(t, e) {
        if (t instanceof SVGElement) {
            var a = t.getAttribute("class") || "";
            t.setAttribute("class", a + " " + e)
        } else
            t.className += " " + e
    }
    function C(t, e) {
        if (t instanceof SVGElement) {
            var a = t.getAttribute("class") || "";
            t.setAttribute("class", a.replace(e, "").replace(/^\s+|\s+$/g, ""))
        } else
            t.className = t.className.replace(e, "").replace(/^\s+|\s+$/g, "")
    }
    function k(t, e) {
        var a = "";
        return t.currentStyle ? a = t.currentStyle[e] : document.defaultView && document.defaultView.getComputedStyle && (a = document.defaultView.getComputedStyle(t, null).getPropertyValue(e)),
        a && a.toLowerCase ? a.toLowerCase() : a
    }
    function $(t) {
        var e = t.parentNode;
        return !(!e || "HTML" === e.nodeName) && ("fixed" == k(t, "position") || $(e))
    }
    function j() {
        if (void 0 != window.innerWidth)
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        var t = document.documentElement;
        return {
            width: t.clientWidth,
            height: t.clientHeight
        }
    }
    function S(t) {
        var e = t.getBoundingClientRect();
        return e.top >= 0 && e.left >= 0 && e.bottom + 80 <= window.innerHeight && e.right <= window.innerWidth
    }
    function T(t) {
        var e = document.createElement("div")
          , a = ""
          , n = this;
        if (e.className = "introjs-overlay",
        t.tagName && "body" !== t.tagName.toLowerCase()) {
            var i = M(t);
            i && (a += "width: " + i.width + "px; height:" + i.height + "px; top:" + i.top + "px;left: " + i.left + "px;",
            e.setAttribute("style", a))
        } else
            a += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;",
            e.setAttribute("style", a);
        return t.appendChild(e),
        e.onclick = function() {
            1 == n._options.exitOnOverlayClick && d.call(n, t)
        }
        ,
        setTimeout(function() {
            a += "opacity: " + n._options.overlayOpacity.toString() + ";",
            e.setAttribute("style", a)
        }, 10),
        !0
    }
    function E() {
        var t = this._targetElement.querySelector(".introjs-hintReference");
        if (t) {
            var e = t.getAttribute("data-step");
            return t.parentNode.removeChild(t),
            e
        }
    }
    function N(t) {
        if (this._introItems = [],
        this._options.hints)
            for (var e = 0, a = this._options.hints.length; e < a; e++) {
                var i = n(this._options.hints[e]);
                "string" == typeof i.element && (i.element = document.querySelector(i.element)),
                i.hintPosition = i.hintPosition || this._options.hintPosition,
                i.hintAnimation = i.hintAnimation || this._options.hintAnimation,
                null != i.element && this._introItems.push(i)
            }
        else {
            var o = t.querySelectorAll("*[data-hint]");
            if (o.length < 1)
                return !1;
            for (var e = 0, a = o.length; e < a; e++) {
                var r = o[e]
                  , s = r.getAttribute("data-hintAnimation");
                s = s ? "true" == s : this._options.hintAnimation,
                this._introItems.push({
                    element: r,
                    hint: r.getAttribute("data-hint"),
                    hintPosition: r.getAttribute("data-hintPosition") || this._options.hintPosition,
                    hintAnimation: s,
                    tooltipClass: r.getAttribute("data-tooltipClass"),
                    position: r.getAttribute("data-position") || this._options.tooltipPosition
                })
            }
        }
        q.call(this),
        document.addEventListener ? (document.addEventListener("click", E.bind(this), !1),
        window.addEventListener("resize", I.bind(this), !0)) : document.attachEvent && (document.attachEvent("onclick", E.bind(this)),
        document.attachEvent("onresize", I.bind(this)))
    }
    function I() {
        for (var t = 0, e = this._introItems.length; t < e; t++) {
            var a = this._introItems[t];
            "undefined" != typeof a.targetElement && F.call(this, a.hintPosition, a.element, a.targetElement)
        }
    }
    function P(t) {
        E.call(this);
        var e = this._targetElement.querySelector('.introjs-hint[data-step="' + t + '"]');
        e && (e.className += " introjs-hidehint"),
        "undefined" != typeof this._hintCloseCallback && this._hintCloseCallback.call(this, t)
    }
    function L() {
        var t = this._targetElement.querySelectorAll(".introjs-hint");
        if (t && t.length > 0)
            for (var e = 0; e < t.length; e++)
                P.call(this, t[e].getAttribute("data-step"))
    }
    function D() {
        var t = this._targetElement.querySelectorAll(".introjs-hint");
        if (t && t.length > 0)
            for (var e = 0; e < t.length; e++)
                A.call(this, t[e].getAttribute("data-step"));
        else
            N.call(this, this._targetElement)
    }
    function A(t) {
        var e = this._targetElement.querySelector('.introjs-hint[data-step="' + t + '"]');
        e && (e.className = e.className.replace(/introjs\-hidehint/g, ""))
    }
    function O() {
        var t = this._targetElement.querySelectorAll(".introjs-hint");
        if (t && t.length > 0)
            for (var e = 0; e < t.length; e++)
                B.call(this, t[e].getAttribute("data-step"))
    }
    function B(t) {
        var e = this._targetElement.querySelector('.introjs-hint[data-step="' + t + '"]');
        e && e.parentNode.removeChild(e)
    }
    function q() {
        var t = this
          , e = document.querySelector(".introjs-hints");
        if (null != e)
            a = e;
        else {
            var a = document.createElement("div");
            a.className = "introjs-hints"
        }
        for (var n = 0, i = this._introItems.length; n < i; n++) {
            var o = this._introItems[n];
            if (!document.querySelector('.introjs-hint[data-step="' + n + '"]')) {
                var r = document.createElement("a");
                b(r),
                function(e, a, n) {
                    e.onclick = function(e) {
                        var a = e ? e : window.event;
                        a.stopPropagation && a.stopPropagation(),
                        null != a.cancelBubble && (a.cancelBubble = !0),
                        R.call(t, n)
                    }
                }(r, o, n),
                r.className = "introjs-hint",
                o.hintAnimation || (r.className += " introjs-hint-no-anim"),
                $(o.element) && (r.className += " introjs-fixedhint");
                var s = document.createElement("div");
                s.className = "introjs-hint-dot";
                var l = document.createElement("div");
                l.className = "introjs-hint-pulse",
                r.appendChild(s),
                r.appendChild(l),
                r.setAttribute("data-step", n),
                o.targetElement = o.element,
                o.element = r,
                F.call(this, o.hintPosition, r, o.targetElement),
                a.appendChild(r)
            }
        }
        document.body.appendChild(a),
        "undefined" != typeof this._hintsAddedCallback && this._hintsAddedCallback.call(this)
    }
    function F(t, e, a) {
        var n = M.call(this, a)
          , i = 20
          , o = 20;
        switch (t) {
        default:
        case "top-left":
            e.style.left = n.left + "px",
            e.style.top = n.top + "px";
            break;
        case "top-right":
            e.style.left = n.left + n.width - i + "px",
            e.style.top = n.top + "px";
            break;
        case "bottom-left":
            e.style.left = n.left + "px",
            e.style.top = n.top + n.height - o + "px";
            break;
        case "bottom-right":
            e.style.left = n.left + n.width - i + "px",
            e.style.top = n.top + n.height - o + "px";
            break;
        case "middle-left":
            e.style.left = n.left + "px",
            e.style.top = n.top + (n.height - o) / 2 + "px";
            break;
        case "middle-right":
            e.style.left = n.left + n.width - i + "px",
            e.style.top = n.top + (n.height - o) / 2 + "px";
            break;
        case "middle-middle":
            e.style.left = n.left + (n.width - i) / 2 + "px",
            e.style.top = n.top + (n.height - o) / 2 + "px";
            break;
        case "bottom-middle":
            e.style.left = n.left + (n.width - i) / 2 + "px",
            e.style.top = n.top + n.height - o + "px";
            break;
        case "top-middle":
            e.style.left = n.left + (n.width - i) / 2 + "px",
            e.style.top = n.top + "px"
        }
    }
    function R(t) {
        var e = document.querySelector('.introjs-hint[data-step="' + t + '"]')
          , a = this._introItems[t];
        "undefined" != typeof this._hintClickCallback && this._hintClickCallback.call(this, e, a, t);
        var n = E.call(this);
        if (parseInt(n, 10) != t) {
            var i = document.createElement("div")
              , o = document.createElement("div")
              , r = document.createElement("div")
              , s = document.createElement("div");
            i.className = "introjs-tooltip",
            i.onclick = function(t) {
                t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
            }
            ,
            o.className = "introjs-tooltiptext";
            var l = document.createElement("p");
            l.innerHTML = a.hint;
            var d = document.createElement("a");
            d.className = "introjs-button",
            d.innerHTML = this._options.hintButtonLabel,
            d.onclick = P.bind(this, t),
            o.appendChild(l),
            o.appendChild(d),
            r.className = "introjs-arrow",
            i.appendChild(r),
            i.appendChild(o),
            this._currentStep = e.getAttribute("data-step"),
            s.className = "introjs-tooltipReferenceLayer introjs-hintReference",
            s.setAttribute("data-step", e.getAttribute("data-step")),
            g.call(this, s),
            s.appendChild(i),
            document.body.appendChild(s),
            c.call(this, e, i, r, null, !0)
        }
    }
    function M(t) {
        var e = {}
          , a = document.body
          , n = document.documentElement
          , i = window.pageYOffset || n.scrollTop || a.scrollTop
          , o = window.pageXOffset || n.scrollLeft || a.scrollLeft;
        if (t instanceof SVGElement) {
            var r = t.getBoundingClientRect();
            e.top = r.top + i,
            e.width = r.width,
            e.height = r.height,
            e.left = r.left + o
        } else {
            e.width = t.offsetWidth,
            e.height = t.offsetHeight;
            for (var s = 0, l = 0; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop); )
                s += t.offsetLeft,
                l += t.offsetTop,
                t = t.offsetParent;
            e.top = l,
            e.left = s
        }
        return e
    }
    function H() {
        var t = parseInt(this._currentStep + 1, 10);
        return t / this._introItems.length * 100
    }
    function z(t, e) {
        var a = {};
        for (var n in t)
            a[n] = t[n];
        for (var n in e)
            a[n] = e[n];
        return a
    }
    var V = "2.8.0-alpha.1"
      , Y = function(t) {
        if ("object" == typeof t)
            return new e(t);
        if ("string" == typeof t) {
            var a = document.querySelector(t);
            if (a)
                return new e(a);
            throw new Error("There is no element with given selector.")
        }
        return new e(document.body)
    };
    return Y.version = V,
    Y.fn = e.prototype = {
        clone: function() {
            return new e(this)
        },
        setOption: function(t, e) {
            return this._options[t] = e,
            this
        },
        setOptions: function(t) {
            return this._options = z(this._options, t),
            this
        },
        start: function() {
            return a.call(this, this._targetElement),
            this
        },
        goToStep: function(t) {
            return i.call(this, t),
            this
        },
        addStep: function(t) {
            return this._options.steps || (this._options.steps = []),
            this._options.steps.push(t),
            this
        },
        addSteps: function(t) {
            if (t.length) {
                for (var e = 0; e < t.length; e++)
                    this.addStep(t[e]);
                return this
            }
        },
        goToStepNumber: function(t) {
            return o.call(this, t),
            this
        },
        nextStep: function() {
            return r.call(this),
            this
        },
        previousStep: function() {
            return s.call(this),
            this
        },
        exit: function(t) {
            return d.call(this, this._targetElement, t),
            this
        },
        refresh: function() {
            return l.call(this),
            this
        },
        onbeforechange: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onbeforechange was not a function");
            return this._introBeforeChangeCallback = t,
            this
        },
        onchange: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onchange was not a function.");
            return this._introChangeCallback = t,
            this
        },
        onafterchange: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onafterchange was not a function");
            return this._introAfterChangeCallback = t,
            this
        },
        oncomplete: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for oncomplete was not a function.");
            return this._introCompleteCallback = t,
            this
        },
        onhintsadded: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onhintsadded was not a function.");
            return this._hintsAddedCallback = t,
            this
        },
        onhintclick: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onhintclick was not a function.");
            return this._hintClickCallback = t,
            this
        },
        onhintclose: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onhintclose was not a function.");
            return this._hintCloseCallback = t,
            this
        },
        onexit: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onexit was not a function.");
            return this._introExitCallback = t,
            this
        },
        onbeforeexit: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onbeforeexit was not a function.");
            return this._introBeforeExitCallback = t,
            this
        },
        addHints: function() {
            return N.call(this, this._targetElement),
            this
        },
        hideHint: function(t) {
            return P.call(this, t),
            this
        },
        hideHints: function() {
            return L.call(this),
            this
        },
        showHint: function(t) {
            return A.call(this, t),
            this
        },
        showHints: function() {
            return D.call(this),
            this
        },
        removeHints: function() {
            return O.call(this),
            this
        },
        removeHint: function(t) {
            return B.call(this, t),
            this
        },
        showHintDialog: function(t) {
            return R.call(this, t),
            this
        }
    },
    t.introJs = Y,
    Y
}),
"undefined" == typeof ydl && alert("ydl.help.js必须在ydl.base.js之后加载"),
function() {
    ydl.help = function(t) {
        var e = introJs()
          , a = {
            prevLabel: "上一步",
            nextLabel: "下一步",
            skipLabel: "退出",
            doneLabel: "退出",
            showStepNumbers: !1,
            showBullets: !1,
            steps: t
        }
          , n = e.setOptions(a).start();
        $.each(n._introItems, function(t, a) {
            return !!$(a.element).is(":hidden") && void e.nextStep()
        }),
        $(".introjs-fixParent").css("cssText", "position: static !important;"),
        e.onbeforechange(function() {
            var t = this;
            t._introItems.length > t._currentStep && $(t._introItems[t._currentStep].element).is(":hidden") && ("backward" == t._direction ? 0 == t._currentStep ? e.exit() : e.previousStep() : "forward" == t._direction && e.nextStep())
        })
    }
}(),
function(t) {
    function e(e, a, n) {
        return e ? t.render(document.getElementById("applyTemplate").innerHTML, {
            applyInfo: e,
            pageData: a,
            poolSelect: n
        }) : ""
    }
    t.render = function(t, e) {
        return ejs.render(t, e, {
            delimiter: "$"
        })
    }
    ,
    t.renders = function(t) {
        return {
            selectOption: function(t, e) {
                for (var a, n, i, o = "", r = 0; r < t.length; r++)
                    a = t[r].value,
                    n = t[r].label,
                    i = a === e ? " selected" : "",
                    o += '<option value="' + a + '"' + i + ">" + n + "</option>";
                return o
            },
            checkboxOption: function(e, a, n) {
                var i, o, r, s, l, d = (n.readonly || t[n.id + "_readonly"] ? " disabled" : "",
                "");
                "v" === n.direction ? (s = '<div class="checkbox"><label>',
                l = "</label></div>") : (s = '<label class="checkbox-inline">',
                l = "</label>"),
                a = a.split(",");
                for (var c = 0; c < e.length; c++)
                    i = e[c].value,
                    o = e[c].label,
                    d += s,
                    "全选" === o ? d += '<input type="checkbox" class="checkbox-check-all" id="checkAll_' + n.id + '">' : (r = $.inArray(i, a) >= 0 ? " checked" : "",
                    d += '<input type="checkbox" name="' + n.id + (void 0 !== n.sn ? "$" + n.sn : "") + '" value="' + i + '"' + r + ">"),
                    d += o + l;
                return d
            },
            radioOption: function(e, a, n) {
                var i, o, r, s, l, d = (n.readonly || t[n.id + "_readonly"] ? " disabled" : "",
                "");
                "v" === n.direction ? (s = '<div class="radio"><label>',
                l = "</label></div>") : (s = '<label class="radio-inline">',
                l = "</label>");
                for (var c = 0; c < e.length; c++)
                    i = e[c].value,
                    o = e[c].label,
                    d += s,
                    r = i === a ? " checked" : "",
                    d += '<input type="radio" name="' + n.id + (void 0 !== n.sn ? "$" + n.sn : "") + '" value="' + i + '"' + r + ">",
                    d += o + l;
                return d
            }
        }
    }
    ,
    t.renderTabs = function(a, n, i) {
        for (var o = [], r = 0; r < a.length; r++) {
            var s = a[r]
              , l = t.render(s.frameHtml, s);
            s.data._render = t.renders(s.data),
            o.push({
                id: s.pageId,
                name: s.pageName,
                title: s.data.page_title,
                panel: t.render(l, s.data)
            })
        }
        return t.render(document.getElementById("tabsTemplate").innerHTML, {
            tabs: o,
            apply: e(n.applyInfo, n, i)
        })
    }
}(window.tpl ? tpl : window.tpl = {});
