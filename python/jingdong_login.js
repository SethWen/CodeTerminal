var ret = {
    code: -1,
    tips: "ok",
    html: "",
    args: {},
    cookies: [],
    start_time: new Date(),
    finish_time: new Date(),
    runtime: 0,
    msg_stack: "",
    userAgent: ""
};
// setTimeout(function () {
//     try {
//         ret.tips = "Timeout for 5 seconds, then exit!";
//         //console.log(JSON.stringify(ret));
//     } catch (e) {
//         //console.log("Fault error!");
//     } finally {
//         phantom.exit();
//     }
// }, 5000);
try {
    var system = require('system');
    var userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";
    system.args.forEach(function (arg, i) {
        var _arg = arg.split("=");
        if (_arg.length = 2) {
            if (_arg[0] == "userAgent") {
                userAgent = _arg[1];
            }
        }
    });
    var page = require('webpage').create();
    page.settings.userAgent = userAgent;
    ret.userAgent = userAgent;
    page.onError = function (msg, trace) {

        var msgStack = ['ERROR: ' + msg];

        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function (t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
            });
        }
        ret.msg_stack = msgStack.join('\n');

        //console.error(msgStack.join('\n'));
    };
    page.open('https://plogin.m.jd.com/user/login.action?appid=100&kpkey=&returnurl=http%3A%2F%2Fhome.m.jd.com%2FmyJd%2Fhome.action', function (status) {
        try {
            if (status === "success") {
                var jdEid = page.evaluate(function () {
                    try {
                        return getJdEid();
                    } catch (e) {
                        return "";
                    }
                });
                //var eid = page.evaluate(function () {
                //    try {
                //        return _JdEid;
                //    } catch (e) {
                //        return "";
                //    }
                //});
                var dat = page.evaluate(function () {
                    try {
                        return getDat();
                    } catch (e) {
                        return "";
                    }
                });
                if (jdEid == "") {
                    ret.tips = "cannot found jdEid args list";
                    ret.code = -1;
                    //}else if (eid == "") {
                    //    ret.tips = "cannot found eid";
                    //    ret.code = -1;
                } else if (dat == "") {
                    ret.tips = "cannot found dat";
                    ret.code = -1;
                } else {
                    ret.code = 1;
                }
                ret.args["jdEid"] = jdEid;
                //ret.args["eid"] = eid;
                ret.args["dat"] = dat;
                ret.html = page.content;
                ret.cookies = page.cookies;
                ret.finish_time = new Date();
                ret.runtime = (new Date() - ret.start_time) / 1000;
                console.log(JSON.stringify(ret));
            }
        } catch (e) {
        }finally {
            phantom.exit();
        }
    });
} catch (e) {
    phantom.exit();
}