/*********************\ 
 * Description: 电子档案前端处理 
 * Author: zhc 
 * Date: 2017-09-29 * \
 * v0.1  2019-08-15  许永峰修改 解决档案3.0系统在申报业务提交报错后无法再次编辑档案界面问题 #2097
 ************************/
'use strict';

var erecord = {};


(function () {
  // 上传图片大小最大值 1MB
  var sizeMax = 9;
  // 长传图片大小最小值 0KB
  var sizeMin = 0;
  // 图片异步加载延迟时间
  var imgLoadTime = 500;
  // 单次最大上传图片数量
  var imgNumber = 10;
  // 图片停止滚动后延迟加载时间（避免快速滚动造成大量图片瞬间加载）
  var stopImgScrollTime = 300;

	/**
	 *  新版电子档案
	 * type="NZR"
	 */
  var options_NZR = {
    rw: "w", // 读写标志
    type: "NZR", // 调用电子档案的标志NZR 新版电子档案  ODZ PKG版电子档案
    ywflbm: "043101", // 业务分类编码
    isFinish: "",// 是否一步办结的业务：0-否，1-是，非必传，缺省为0
  }
	/**
	 * PKG版电子档案初始化参数
	 * type="ODZ"
	 */
  var options_ODZ = {
    rw: "w", // 读写标志
    type: "ODZ", // 调用电子档案的标志NZR 新版电子档案  ODZ PKG版电子档案
    scanKey: "0",// 扫描关键字
    flowid: "415",// 业务系统对应的流程ID
    stepid: "3",// 业务系统对应的节点ID
    isRepeat: "",// 是否复用 0-否；1-是
  }

  /*
  标记移动端是否提交
  */
  var mobileFlage = false;

  /*
    轮询定时器
  */
  var countDown = '';

   /*
    页面数据临时存储
  */
  var pageData='';

  /*
    是否需要上传电子档案
  */
  var isNeedDzda = true;

  /*
    是否开启批量上传
  */
  var isMultiple = false;

  /**
   * 初始化上传电子档案模块
   * 
   * @param {Object}
   */
  erecord.initErecord = function (options, checkedObj) {
      // 手机上传文件按钮隐藏 2020-04-16
      $('#qrcodeBtn').parent().hide();
      // 通过调用标志判断定义调用的后台的参数
      var params = {};
      params["_POOLKEY"] = poolSelect["_POOLKEY"];
      if ("NZR" == options.type) {
          // NZR 新版电子档案
          params["ywflbm"] = options.ywflbm;
          params["bcfs"] = 0;
          //2019-3-21  当第二个参数存在时并且不为空时  将参数放到xstjdata里传递给后台 start
          if (checkedObj && !(checkedObj == 'null')) {
              checkedObj = JSON.stringify(checkedObj)
              if (checkedObj) params['xstjdata'] = checkedObj;
          }
          ///2019-3-21  当第二个参数存在时并且不为空时  将参数放到xstjdata里传递给后台 end
      } else if ("ODZ" == options.type) {
          // ODZ PKG版电子档案
          // 上传的电子档案是否复用，若复用上传扫描key,若不复用扫描key为空
          if (options.isRepeat == "1") {
              params["scanKey"] = options.scanKey; // 扫描关键字
          } else {
              params["scanKey"] = ""; // 扫描关键字
          }
          params["flowid"] = options.flowid; // 业务系统对应的流程ID
          params["stepid"] = options.stepid; // 业务系统对应的节点ID
          //2019-3-21 start 当第二个参数存在时并且不为空时 将参数放到xstjdata里传递给后台
          if (checkedObj && !(checkedObj == 'null')) {
              checkedObj = JSON.stringify(checkedObj)
              if (checkedObj) params['xstjdata'] = checkedObj;
          }
          //2019-3-21 end 当第二个参数存在时并且不为空时 将参数放到xstjdata里传递给后台
      } else {
          ydl.alert({
              'icon': 'info',
              'message': '获取业务材料信息失败',
              'desc': '不支持该类型的业务材料！'
          });
          return false;
      }
      ;
      ydl.ajax(ydl.contexPath + "/erecord/scanning/beforehand", params, function (data) {
          // 2019年3月1日 修改返回字段，新版电子档案增加扫描流水号放至总线中 start
          if ("NZR" == options.type) {
              ydl.attribute.set("_smlsh", data.smlsh);
          }
          // 判断当前业务模式是否需要电子档案 2020-04-20 start
          // 返回的data.isNeedDzda （0-否；1-是）
          if (data.isNeedDzda != "0") {
              isNeedDzda = true;
              $('#e_record').show();
              options["oriData"] = JSON.parse(data.materiallist);
              // v0.1  孙一宁 2019/08/15 新增start
              options["smlsh"] = data.smlsh;
              //  孙一宁 2019/08/15 新增end
              // options["oriData"] = data;
              // end
              initErecord(options, 0);
              pageData = options;
              // 2020-04-16 start 根据配置判断是否使用手机上传图片功能
              // 1-使用；其他-不使用
              if ("1" == data.mobileuse) {
                  $('#qrcodeBtn').parent().show();
                  // 获取移动端二维码 黄晓蓉 2020/03/25 新增start
                  getQrcode(params);
                  // 获取移动端二维码 黄晓蓉 2020/03/25 新增end
              }
              // 2020-04-16 end
          } else {
              isNeedDzda = false;
              $('#e_record').hide();
          }
          // 判断当前业务模式是否需要电子档案 2020-04-20 end
      });
  }
  /**
   * 流程提交前校验，如果无图片则只校验是否必填，有图片则校验图片数是否符合指定范围
   * 
   * @param {boolean}
   * isAlert 是否以ydl.alert()的形式提示校验结果，如果不显示则至返回校验结果，默认显示
   * options 判断影像校验通过是够提交，并提供提交参数
   */
  erecord.valSubmitRequired = function (isAlert, options) {
    if (isAlert == undefined) isAlert = true;
    var isSubmit = false;
    if (options != undefined) {
      isSubmit = true;
    };
    var result = { 'result': true, 'info': [] };
    // 需要上传电子档案才校验电子档案必传 start
    if(isNeedDzda){
          // 电子档案加载标志
          var submitflag = false;
          $('#e_record .nav-tabs li a').each(function () {
              if (!submitflag) {
                  submitflag = true;
              }
              var $this = $(this);
              var thisname = $this.find('span:not(.badge)').text();
              var sfbs = $this.data('sfbs');
              var thisId = $this.attr('href');
              var thisLength = $(thisId + ' li').length;
              if (thisLength == 0) {
                  // 如果当前项目无图片，校验是否为必填
                  if (sfbs) {
                      // 如果是必填则记录校验未通过信息
                      if (result['result']) result['result'] = false;
                      result['info'].push({
                          'text': '"' + thisname + '"必须上传档案。',
                          'id': thisId
                      });
                  } else {
                      // 如果是非必填则直接校验下一组
                      return true;
                  }
              } else {
                  // 如果当前项目有图片，校验是否符合图片最大最小数目
                  var thisResult = erecord.valErecord(thisId.substring(1));
                  if (thisResult.result) {
                      // 符合图片最大最小数目继续校验下一组
                      return true;
                  } else {
                      // 不符合图片最大最小数目则记录校验未通过信息
                      var thisInfo = thisResult['info'][0];
                      if (result['result']) result['result'] = false;
                      result['info'].push({
                          'text': thisInfo.text,
                          'zdsmfs': thisInfo.zdsmfs,
                          'zxsmfs': thisInfo.zxsmfs,
                          'filesNum': thisInfo.filesNum,
                          'id': thisId
                      });
                  }
              }
          });
          // 校验电子档案是否加载
          if (submitflag == false) {
              if (result['result']) result['result'] = false;
              ydl.alert({
                  'icon': 'info',
                  'message': '提交失败',
                  'desc': '未上传业务材料无法提交！'
              });
              return result;
          }
          // 校验通过，数据提交，调用提交接口
          if (isSubmit == true && result['result']) {
              var save = erecord.valSave(options, true);
              if (result['result'] && !save.status) {
                  result['result'] = false;
                  result['info'].push({
                      'text': save.msg
                  });
              }

          }
          // 如果没通过校验，提示校验结果
          if (isAlert == true && !result['result']) {
              var infoText = '';
              $.each(result['info'], function () {
                  infoText += '<br/>　　' + this.text;
              });
              ydl.alert({
                  'icon': 'info',
                  'message': '校验未通过。',
                  'desc': infoText
              });
          }
      }
      // 需要上传电子档案才校验电子档案必传 end
      return result;

  }
  /**
   * 提交图片调用电子档案提交接口
   * @param {Object}
   *            options 保存参数
   * @param {boolean}
   *            isSubmit 是否提交保存
   */
  erecord.valSave = function (options, isSubmit) {
    // 所有图片的路径信息
    var allFilePath = "";
    var returnFlag = {};
    $("#e_record .tab-content li").each(function () {
      var fileId = $(this).data('fid');
      allFilePath = allFilePath + fileId + ",";
    });
    var params = {};
    params["_POOLKEY"] = poolSelect["_POOLKEY"];
    // 20190319 定义保存接口url
    var url = "";
    if ("NZR" == options.type) {
      // NZR 新版电子档案
      params["ywflbm"] = options.ywflbm;
      params["bcfs"] = 0;
      // 20190325 一步办结业务调用保存接口，申报业务调用暂存接口
      if ("1" == options.isFinish) {
        url = "/erecord/scanning/save";
      } else {
        // 20190319 新电子档案调用暂存接口
        url = "/erecord/scanning/storage";
      }
    } else if ("ODZ" == options.type) {
      // ODZ PKG版电子档案
      params["scanKey"] = options.scanKey; // 扫描关键字
      params["flowid"] = options.flowid; // 业务系统对应的流程ID
      params["stepid"] = options.stepid; // 业务系统对应的节点ID
      // 暂存是0提交是1，默认是暂存
      params["savetype"] = isSubmit ? "1" : "0";
      // 20190319 PKG电子档案调用保存接口
      url = "/erecord/scanning/save"
    } else {
      ydl.alert({
        'icon': 'info',
        'message': '获取业务材料信息失败',
        'desc': '不支持该类型的业务材料！'
      });
      return false;
    };
    if (allFilePath != "") {
      params["filePath"] = allFilePath.substring(0, allFilePath.length - 1);
      // 页面存在图片则调用提交接口
      $.ajax({
        type: "POST",
        async: false,
        dataType: "json",
        // 20190319 注释以下代码
        // url: ydl.contexPath + "/erecord/scanning/save",
        url: ydl.contexPath + url,
        data: params,
        success: function (result) {
          if (result && result.returnCode != null && result.returnCode == '0') {
            window.clearInterval(countDown);
            console.log("电子档案，提交成功");
            returnFlag.status = true;
            returnFlag.msg = result.message;
          } else {
            returnFlag.status = false;
            returnFlag.msg = result.message;
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          // 状态码
          console.log(XMLHttpRequest.status);
          // 错误信息   
          console.log("电子档案，提交失败");
          returnFlag.status = false;
          returnFlag.msg = errorThrown;
        }
      });
    }
    // 2019-05-16 若不需要上传图片，返回标识设为true
    else {
      returnFlag.status = true;
      returnFlag.msg = '';
    }
    return returnFlag;
  }
  /**
   * 校验图片最大最小数目
   * 
   * @param {String|Object}
   *            tabIds 需要校验的电子档案id，默认不写则全部校验
   * @param {boolean}
   *            info 是否显示详细校验结果，如不显示则直接返回校验结果true或false，默认显示
   */
  erecord.valErecord = function (tabId, info) {

    info = info == false ? false : true;
    var result = info ? { 'result': true, 'info': [] } : true;

    var $allTab;
    // 校验指定id的电子档案
    if (tabId) {
      $allTab = $('#e_record .tab-content #' + tabId);
    } else {
      // 校验所有的电子档案
      $allTab = $('#e_record .tab-content .tab-pane');
    }

    $allTab.each(function () {
      // 当前电子档案
      var $this = $(this);
      // 最大扫描份数
      var zdsmfs = $this.data('zdsmfs');
      // 最小扫描份数
      var zxsmfs = $this.data('zxsmfs');

      // 如果无限制则直接校验下一组
      if (zdsmfs == 0 && zxsmfs == 0) return true;

      // 当前总共图片数
      var filesNum = $this.find('.eFileSl').length;
      // 当前最大扫描份数校验信息
      var zdInfo = '';
      // 当前最小扫描份数校验信息
      var zxInfo = '';

      // 判断上传图片数是否超过最大扫描份数
      if ((zdsmfs == 0 ? false : (filesNum > zdsmfs))) {
        // 是否显示详细信息
        if (info) {
          // 显示详细信息，更改校验结果，记录信息
          if (result['result']) result['result'] = false;
          zdInfo = '最多上传 ' + zdsmfs + ' 个图片。';
        } else {
          // 不显示，直接返回结果false，结束校验
          if (result) result = false;
          return false;
        }
      }
      // 判断上传图片数是否超过最小扫描份数
      if ((zxsmfs == 0 ? false : (filesNum < zxsmfs))) {
        // 是否显示详细信息
        if (info) {
          // 显示详细信息，更改校验结果，记录信息
          if (result['result']) result['result'] = false;
          zxInfo = '至少上传 ' + zxsmfs + ' 个图片';
        } else {
          // 不显示，直接返回结果false，结束校验
          if (result) result = false;
          return false;
        }
      }

      // 统计当前最终的校验结果
      if (info && !result['result']) {
        // 显示当前名称
        var filesParName = $('#e_record a[href="#' + $this.prop('id') + '"] span:not(.badge)').text();
        result['info'].push({
          'text': '"' + filesParName + '"' + zxInfo + (zxInfo ? (zdInfo ? '，' : '。') : '') + zdInfo + '当前已上传图片数为 ' + filesNum + ' 个。',
          'zdsmfs': zdsmfs,
          'zxsmfs': zxsmfs,
          'filesNum': filesNum,
          'id': $this.prop('id')
        });
      } else if (tabId && info) {
        // 如果是单个id校验并显示校验信息，则无论是否通过均返回部分校验信息
        result['info'].push({ 'zdsmfs': zdsmfs, 'zxsmfs': zxsmfs, 'filesNum': filesNum, 'id': $this.prop('id') });
      }

    });

    // 返回校验结果
    return result;
  }
  /**
   * 初始化上传电子档案模块主方法
   * 
   * @param {Object}
   *            options 相关参数，包括下面这些对象等
   * @param {String}
   *            [options.oriData] 接口获得的原始数据
   * @param {Boolean}
   *            [options.rw] 是否只读
   * @param {String}
   *            [options.ywflbm] String 业务分类编码
   */
  function initErecord(options, checkedObj) {
    // 判断是否为ie8浏览器
    var isIE8 = /MSIE 8\.\d/.test(navigator.userAgent);
    // 判断是否为ie9浏览器
    var isIE9 = /MSIE 9\.\d/.test(navigator.userAgent);
    var isEdit = options.rw == "w" ? true : false;		// 是否可编辑
    var oriData = options.oriData;						// 处理前的原始材料数据
    var clData = [];									// 整理后的材料数据

    // 删除接口地址
    var delUrl = ydl.contexPath + '/erecord/imageCapture/imageCaptureDelete';

    // 清空已存在的批量错误，包括按钮
    showError([]);

    // 如果是ie8则重新设置上传按钮大小
    if (isIE8) $('#eFile').width(40);

    // 如果不是ie9，或设置为启用批量上传，则添加批量删除内容
    if (useMultiple(isIE9)) {
      $('#eFile').attr('multiple','multiple');
      $('#eFileBase .eFiles-check-all, #eFileBase #eFileDeleteFiles').remove();
      $('#eFileBase').append('<div class="eFiles-check-all"><input id="eFilesCheckAll" type="checkbox">全选</div><div id="eFileDeleteFiles">批量删除文件</div>');
      //批量删除按钮
      $('#eFileDeleteFiles').click(function(){
        var $checked = $('#e_record .tab-pane.active li .eFiles-check:checked');
        var allNumber = $checked.length;
        if(allNumber == 0) {
          ydl.alert({
            'icon': 'info',
            'message': '未选择任何要删除的图片',
            'desc': '请重新选择批量删除的材料。'
          });
          return  false;
        }
        if (confirm('仅删除当前材料下选中的图片，请确认是否要删除这' + allNumber + '张图片？')) {
          $RecCover.removeClass('hidden');
          var fidArr = [];
          var fids = '';
          var $lis = $checked.closest('li');
          $checked.each(function(k){
            fidArr.push($(this).closest('li').data('fid'));
          });
          fids = fidArr.join();

          if (poolSelect["_POOLKEY"]) {
            delUrl += "?_POOLKEY=" + poolSelect["_POOLKEY"];
            // 判断上传类型
            if ("NZR" == options.type) {
              // NZR 新版业务材料
              //delUrl += "&tpid=" + fids;	// 图片id
            } else if ("ODZ" == options.type) {
              // ODZ PKG版业务材料
              var $contentActive = $('#e_record .tab-content .active');
              //delUrl += "&tpid=" + fids;	// 图片id
              delUrl += "&clbm=" + $contentActive.data('clbm');	// 材料编码
              delUrl += "&scanKey=" + options.scanKey;	// 扫描关键字
              delUrl += "&flowid=" + options.flowid;	// 业务系统对应的流程ID
              delUrl += "&stepid=" + options.stepid;	// 业务系统对应的节点ID
            } else {
              ydl.alert({
                'icon': 'info',
                'message': '删除业务材料出错',
                'desc': '不支持该类型的业务材料！'
              });
              return false;
            };
          } else {
            ydl.alert({
              'icon': 'info',
              'message': '删除业务材料出错',
              'desc': '请刷新重试！'
            });
            return false;
          };
          $.ajax(delUrl, {
            data: {'tpid' : fids},
            dataType: 'json',
            type: 'POST',
            timeout: 1800000,
            cache: false,
            async: true,
            success: function (ret) {
  
              if (ret.returnCode == '0') {
  
                // 左侧对应的标签
                var $contentActive = $('#e_record .tab-content .active');
                var $badge = $('#e_record a[href="#' + $contentActive.prop('id') + '"] .badge');
  
                // 移除页面元素
                $lis.remove();
                // 页面数据删除
                var pageDataList=pageData.oriData.tree[0].cl;
                var dClbm=$contentActive.data('clbm');
                $.each(fidArr, function(k, v){
                  deleteImg(pageDataList,dClbm, v);
                });
                
                // 更新图片总数
                $badge.text(($contentActive.find('li').length || ''));

                // 重置其他页签删除多选框状态及全选状态
                resetAllCheck();

                resize();
  
              }
              else {
                ydl.alert('删除业务材料出错：' + ret.message);
              }
              $RecCover.addClass('hidden');
            },
            error: function (ret) {
              ydl.alert('删除业务材料出错：' + ret.message);
              $RecCover.addClass('hidden');
            }
          });
        }
        return false;
        
      });
      //全选按钮
      $('#eFilesCheckAll').click(function(){
        var isChecked = $(this).prop('checked');
        var $checkedAll = $('#e_record .tab-pane.active li .eFiles-check');
        if (isChecked) {
          //全选
          $checkedAll.prop('checked', true);
        }
        else {
          //取消全选
          $checkedAll.prop('checked', false);
        }
      });
    }

    // 整理出需要显示的所有数据
    getCl(oriData.tree);

    // 显示刚刚上传电子档案
    var createFile = function (vf) {
      // 图片ID
      var tpid = vf.tpid;
      // 图片名称
      var ytpmc = vf.ytpmc;
      return '<li data-fid="' + tpid +
        '">' + (isEdit ? (!useMultiple(isIE9) ? '' : '<input class="eFiles-check" type="checkbox" >') + '<button type="button" class="close" title="删除此业务材料"><span>&times;</span></button>' : '') +
        '<div class="eFileSl"><img src="' + ydl.contexPath + '/erecord/imageCapture/downloadFyImg?tpid=' +
        vf.tpid + '&_POOLKEY=' + poolSelect["_POOLKEY"] + '" title="' + ytpmc + '" id="' + tpid +
          '"/></div><p><span data-original="' + ytpmc + '">' + ytpmc + '</span></p></li>';
    };

    // 显示列表中已存在的电子档案
    var createListFile = function (vf) {
      // 图片ID
      var tpid = vf.tpid;
      // 图片名称
      var ytpmc = vf.ytpmc;

      return '<li data-fid="' + tpid +
        '">' + (isEdit ? (!useMultiple(isIE9) ? '' : '<input class="eFiles-check" type="checkbox" >') + '<button type="button" class="close" title="删除此业务材料"><span>&times;</span></button>' : '') +
        '<div class="eFileSl"><img src="' + ydl.contexPath + '/common/image/load-list.gif" data-read="false" title="' + ytpmc + '" id="' + tpid +
        '"/></div><p><span data-original="' + ytpmc + '">' + ytpmc + '</span></p></li>';
    };

    $('#e_record .nav-tabs').html('');
    $('#e_record .tab-content').html('');

    // 生成主要结构
    lm(clData);
    var navTabHtml = '';
    // 2020-05-07 黄晓蓉 修改2019-3-21的问题，如果显示的内容为空则将添加文件按钮设置成不可点击 start
    // var navTabNnm = 0;
    // 2020-05-07 黄晓蓉 end
    var contentHtml = '';
    $.each(clData, function (k, v) {
      var clInfo = v;
      var cl = clInfo.cl;
      if (cl && cl.length > 0) {
        // 2020-05-07 黄晓蓉 start
        $("#eFile").removeAttr("disabled");
        // 2020-05-07 黄晓蓉 end
        $.each(cl, function (key, val) {
          //2019-3-21 判断显示条件  显示条件为1和为空时显示内容 为0时不显示内容
          if (val.xstj == true || (val.xstj) == "") {
            // 左侧页签结构
            navTabHtml += '<li' + (key === checkedObj ? ' class="active"' : '') + '><a data-toggle="tab" data-clbm="' +
              val.clbm + '" data-jdbm="' + clInfo.jdbm + '" data-sfbs="' + val.sfbs +
              '" href="#e_record_item_' + key + '"><span>' +
              (key + 1) + '. ' + val.clmc + '</span>' + (val.sfbs == 1 ? '<em>*</em>' : '') + '<span class="badge ' +
              (isIE8 ? (val.imageInfo.length == 0 ? 'hidden' : '') : '') + '">' +
              (val.imageInfo.length || '') + '</span></a></li>';

            // 右侧具体内容结构
            contentHtml += '<div id="e_record_item_' + key +
              '" data-clbm="' + val.clbm + '" data-jdbm="' + clInfo.jdbm +
              '" data-sffy="' + val.sffy + '" data-zdsmfs="' + val.zdsmfs +
              '" data-zxsmfs="' + val.zxsmfs + '" class="tab-pane' +
              (key === checkedObj ? ' active' : '') + '"><ul>' +
              $.map(val.imageInfo, createListFile).join('') +
              '</ul></div>';

             // 2020-05-07 黄晓蓉 start
             // navTabNnm++;
             // 2020-05-07 黄晓蓉 end
          }
          // 2020-05-07 黄晓蓉 start
          //2019-3-21 添加判断 如果显示的内容为空则将添加文件按钮设置成不可点击 start
          //if (key == 0) {
          //  $("#eFile").attr({ "disabled": "disabled" });
          // } else if ($("#eFile").prop("disabled") == true) {
          //   $("#eFile").removeAttr("disabled");
          // }
          //2019-3-21 添加判断 如果显示的内容为空则将添加文件按钮设置成不可点击 end
          // 2020-05-07 黄晓蓉 end
        });
      }
      // 2020-05-07 黄晓蓉 start
      else{
          $("#eFile").attr({ "disabled": "disabled" });
      }
      // 2020-05-07 黄晓蓉 end
    });

    // 整理出需要显示的所有数据
    function getCl(jdData) {
      $.each(jdData, function () {
        // 如当前分支没有子分支或者上传材料直接查询下一分支
        if (!this.cl && !this.dir) return true;
        if (this.cl) {
          clData.push({ 'jdbm': this.jdbm, 'sxh': this.sxh, 'cl': this.cl });
        }
        if (this.dir) {
          getCl(this.dir);
        }
      });
    }
    // 获取并显示当前显示的业务材料信息
    var $eFileBase = $('#eFileBase');
    if (isEdit) {
      // 显示图片上传按钮区
      $eFileBase.removeClass('hidden');
    }
    function eFileInfo() {
      // 如果只读则不做任何处理
      if (!isEdit) return;
      $('#eFileText').html('图片大小不能超过' + sizeMax + 'MB');
      var $contentActive = $('#e_record .tab-content .active');
      // 如果没有任何数据，则不做处理
      if ($contentActive.length == 0) return;
      // 当前名称
      var eFileName = $('#e_record a[href="#' + $contentActive.prop('id') + '"] span:not(.badge)').text();
      // 最大上传份数
      var eFileMax = $contentActive.data('zdsmfs');
      // 最小上传份数
      var eFileMin = $contentActive.data('zxsmfs');

      var html = (eFileMin == 0 && eFileMax == 0) ? '图片大小不能超过' + sizeMax + 'MB' : ('"<span id="eFileName" >' + eFileName + '</span>"' +
        (eFileMin == 0 ? '' : '至少上传 <span id="eFileMin" >' + eFileMin + '</span> 个图片') + (eFileMax == 0 ? '。' : (eFileMin == 0 ? '' : '，'))) +
        (eFileMax == 0 ? '' : '最多上传 <span id="eFileMax" >' + eFileMax + '</span> 个图片。') + '图片大小不能超过' + sizeMax + 'MB';

      $('#eFileText').html(html);

    }
    // 设置当前显示分支的信息
    eFileInfo();

    // 显示整个业务材料组件
    var $widget = $('#e_record').removeClass('hidden');

    // 生成上传表单
    var $e_record_form = $('<form id="e_record_form" action="" enctype="multipart/form-data" method="post" class=""></form>');
    if (isIE8 || isIE9) {
      // 如果是ie8或ie9则增加一堆特殊处理
      $('#e_record_form').remove();
      $e_record_form.css({ 'display': 'none' }).appendTo('#pageMain');
    } else {
      var $e_record_form = $('<form id="e_record_form" action="" enctype="multipart/form-data" method="post" class=""></form>');
    }
    
      //解决ie9可能需要双击input框（通常是左半部分存在问题）才会打开上传文件对话框的问题
      if(isIE9){
	    $('#eFile').addClass('hide');
	    $('.addFile').unbind('click').on('click', function () {
	      $('#eFile').click();
	    });
	  }
    
    // 选择图片后自动提交
    $('#e_record').unbind("click").on('click', '#eFile', function () {
      // 如果已达到最大上传图片数，则不进行图片提交
      var $contentActive = $('#e_record .tab-content .active');
      var valRes = erecord.valErecord($contentActive.prop('id'));
      lm(valRes);
      var fliesParName = $('#e_record a[href="#' + $contentActive.prop('id') + '"] span:not(.badge)').text();
      if (valRes['info'][0] && (valRes['info'][0].filesNum >= valRes['info'][0].zdsmfs)) {
        ydl.alert({ 'message': '上传失败', 'desc': '"' + fliesParName + '"最多上传 ' + valRes['info'][0].zdsmfs + ' 个图片。' });
        return false;
      }
    }).on('click', '.tab-pane.active li .eFiles-check', function(){
      // 全选功能联动事件
      var allFilesNum = $('#e_record .tab-pane.active li .eFiles-check').length;
      var checkedFilesNum = $('#e_record .tab-pane.active li .eFiles-check:checked').length;
      var $eFilesCheckAll = $('#eFilesCheckAll');
      if (allFilesNum == checkedFilesNum) {
        $eFilesCheckAll.prop('checked', true);
      }else{
        $eFilesCheckAll.prop('checked', false);
      }
    });

    $('#e_record').unbind("change").on('change', '#eFile', function () {

      var $thisflies = $(this);

      // 上传接口地址
      var postUrl = ydl.contexPath + '/erecord/imageCapture/uploadImg';
      var $contentActive = $('#e_record .tab-content .active');

      if(!useMultiple(isIE9)) {
        //ie9
        // 校验上传的图片格式只能为JPG或JPEG
        var filepath = $(this).val();
        if(!filepath) return;
        var extStart = filepath.lastIndexOf(".");
        var ext = filepath.substring(extStart, filepath.length).toUpperCase();
        if (ext != ".JPG" && ext != ".JPEG") {
          ydl.alert("图片限于jpeg,jpg格式");
          return false;
        }
        // 前端校验图片大小(非IE8，9)
        if (!isIE8 && !isIE9) {
          var dom = document.getElementById("eFile");
          var fileSize = dom.files[0].size;
          if (fileSize > sizeMax * 1024 * 1024) {
            ydl.alert("图片大小不能大于" + sizeMax + "MB");
            return false;
          }
          if (fileSize <= sizeMin * 1024) {
            ydl.alert("图片大小应大于" + sizeMin + "KB");
            return false;
          }
        }

        // 显示遮罩层
        $RecCover.removeClass('hidden');
        
        // 获取input并将其放入表单
        var $thisInput = $(this);
        $e_record_form.append($thisInput);

        // 上传图片名称
        //var filename = $(this).val().replace(/[^\\\/]*[\\\/]+/g,'');
        // 重新生成图片名
        var myDate = new Date();
        // 材料编码+当前时间毫秒+后缀
        var filename = $contentActive.data('clbm') + "_" + formatDate() + ext;

        // 左侧对应的标签
        var $badge = $('#e_record a[href="#' + $contentActive.prop('id') + '"] .badge');

        // 提交参数
        if (poolSelect) {
          if (poolSelect["_POOLKEY"]) {
            postUrl += "?_POOLKEY=" + poolSelect["_POOLKEY"];
            // 判断上传类型
            if ("NZR" == options.type) {
              // NZR 新版业务材料
              // postUrl+="&sxh=1"; //顺序号后台自动生成
              postUrl += "&ywflbm=" + options.ywflbm;		// 业务分类编码
              postUrl += "&smlx=" + oriData.smlx;		// 扫描类型
              postUrl += "&clbm=" + $contentActive.data('clbm');		// 材料编码
              postUrl += "&smsjdbm=" + $contentActive.data('jdbm');	// 所在树节点编码
              postUrl += "&sffy=" + $contentActive.data('sffy');		// 是否复用
              postUrl += "&zdsmfs=" + $contentActive.data('zdsmfs');	// 最大扫描份数
              postUrl += "&zxsmfs=" + $contentActive.data('zxsmfs');	// 最小扫描份数
              postUrl += "&filename=" + filename;		// 上传图片名
            } else if ("ODZ" == options.type) {
              // ODZ PKG版业务材料
              postUrl += "&clbm=" + $contentActive.data('clbm');		// 材料编码
              postUrl += "&flowid=" + options.flowid;	// 业务系统对应的流程ID
              postUrl += "&stepid=" + options.stepid;	// 业务系统对应的节点ID
              postUrl += "&filename=" + filename;		// 上传图片名
            } else {
              ydl.alert({
                'icon': 'info',
                'message': '上传业务材料信息失败',
                'desc': '不支持该类型的业务材料！'
              });
              return false;
            };

          } else return;
        } else return;
        $e_record_form.prop('action', postUrl);
        $e_record_form.ajaxSubmit({
          dataType: 'json',
          async: true,
          success: function (ret) {
            if (ret.returnCode == '0') {
              // 上传成功，显示已添加图片
              $contentActive.find('ul').prepend(createFile({ 'tpid': ret.data, 'ytpmc': filename }));
              var pageDataList=pageData.oriData.tree[0].cl;
              var clbm=$contentActive.attr('data-clbm');
              addImg(pageDataList,clbm, ret.data,filename)
              // 更新图片总数
              $badge.text($contentActive.find('li').length);
              if (isIE8) {
                $badge.removeClass('hidden');
              }
              $e_record_form[0].reset();
              resize();
              var $eTabContent = $('#e_record .tab-content');
              $eTabContent.scrollTop($eTabContent.height);
            }
            else {
              ydl.alert('上传业务材料出错：' + ret.message);
            }
            $eFileBase.append($thisInput);
            $RecCover.addClass('hidden');
            $e_record_form[0].reset();
          },
          error: function (ret) {
            ydl.alert('上传业务材料出错：' + ret.message);
            $eFileBase.append($thisInput);
            $RecCover.addClass('hidden');
            $e_record_form[0].reset();
          },
          complete:function(){
            $('#eFile').val('');
          }
        });
      }
      else {
        //不是ie9
        // 提交参数
        if (poolSelect) {
          if (poolSelect["_POOLKEY"]) {
            postUrl += "?_POOLKEY=" + poolSelect["_POOLKEY"];
            // 判断上传类型
            if ("NZR" == options.type) {
              // NZR 新版业务材料
              // postUrl+="&sxh=1"; //顺序号后台自动生成
              postUrl += "&ywflbm=" + options.ywflbm;		// 业务分类编码
              postUrl += "&smlx=" + oriData.smlx;		// 扫描类型
              postUrl += "&clbm=" + $contentActive.data('clbm');		// 材料编码
              postUrl += "&smsjdbm=" + $contentActive.data('jdbm');	// 所在树节点编码
              postUrl += "&sffy=" + $contentActive.data('sffy');		// 是否复用
              postUrl += "&zdsmfs=" + $contentActive.data('zdsmfs');	// 最大扫描份数
              postUrl += "&zxsmfs=" + $contentActive.data('zxsmfs');	// 最小扫描份数
              //postUrl += "&filename=" + filename;		// 上传图片名
            } else if ("ODZ" == options.type) {
              // ODZ PKG版业务材料
              postUrl += "&clbm=" + $contentActive.data('clbm');		// 材料编码
              postUrl += "&flowid=" + options.flowid;	// 业务系统对应的流程ID
              postUrl += "&stepid=" + options.stepid;	// 业务系统对应的节点ID
              //postUrl += "&filename=" + filename;		// 上传图片名
            } else {
              ydl.alert({
                'icon': 'info',
                'message': '上传业务材料信息失败',
                'desc': '不支持该类型的业务材料！'
              });
              //清除input中选择文件，确保下次重复上传时可以触发change事件
              $('#eFile').attr('type','text').attr('type','file');
              return false;
            };
          } else {
            //清除input中选择文件，确保下次重复上传时可以触发change事件
            $('#eFile').attr('type','text').attr('type','file');
            return;
          }
        } else {
          //清除input中选择文件，确保下次重复上传时可以触发change事件
          $('#eFile').attr('type','text').attr('type','file');
          return;
        }

        //获取所有文件
        var allFiles = this.files;
        
        //如果单次上传文件超过最大数目，拒绝上传
        if (allFiles.length > imgNumber){
          ydl.alert({
            'icon': 'info',
            'message': '上传业务材料信息失败',
            'desc': '单次上传文件不能超过' + imgNumber + '个！'
          });
          //清除input中选择文件，确保下次重复上传时可以触发change事件
          $('#eFile').attr('type','text').attr('type','file');
          return false;
        }

        // 如果已达到最大上传图片数，则不进行图片提交
        var $contentActive = $('#e_record .tab-content .active');
        var valRes = erecord.valErecord($contentActive.prop('id'));
        var fliesParName = $('#e_record a[href="#' + $contentActive.prop('id') + '"] span:not(.badge)').text();
        if (valRes['info'][0] && ((valRes['info'][0].filesNum +allFiles.length) > valRes['info'][0].zdsmfs)) {
          ydl.alert({ 'message': '上传失败', 'desc': '"' + fliesParName + '"最多上传 ' + valRes['info'][0].zdsmfs + ' 个图片。' });
          //清除input中选择文件，确保下次重复上传时可以触发change事件
          $('#eFile').attr('type','text').attr('type','file');
          return false;
        }

        //文件上传失败记录，包含未通过校验的
        var errorFiles = [];

        //文件上传组
        var uploadFiles = [];

        //文件上传ajax队列（取消用）
        var uploadAjaxArr = [];

        //显示进度遮罩层
        $('#e_record').append('<div id="e_upProgress"><div class="e_upProgressMain" style="padding-top:' + ($('#e_record').height() / 2 - 80) + 'px;">正在上传第<span id="e_upCurrent">1</span>个文件，共<span>' + allFiles.length + '</span>个文件。<div id="eFileCancel" class="hide">取消</div></div><div class="e_upProgressBg"></div></div>');
        var $upProgress = $('#e_upProgress');
        var $upCurrent = $('#e_upCurrent');

        //重置全部复选框全选框状态
        resetAllCheck();

        //构造上传和未通过校验队列
        $.each(allFiles, function(k, v){
          var filepath = v.name;
          if(!filepath) return;

          //前端校验图片格式
          var extStart = filepath.lastIndexOf(".");
          var ext = filepath.substring(extStart, filepath.length).toUpperCase();
          if (ext != ".JPG" && ext != ".JPEG") {
            errorFiles.push({name : v.name, info : '格式错误，图片限于jpeg,jpg格式'});
            return true;
          }
          // 前端校验图片大小
          var fileSize = v.size;
          if (fileSize > sizeMax * 1024 * 1024 || fileSize <= sizeMin * 1024) {
            errorFiles.push({name : v.name, info : '图片大小应大于'+ sizeMin +'KB， 并且不能大于' + sizeMax + 'MB'});
            return true;
          }
          //随机生成文件名，避免两次重复上传相同的文件导致出现问题
          var filename = $contentActive.data('clbm') + "_" + formatDate() + ext;
          
          var formData =new FormData(); 
          formData.append(filename, v, filename);

          //添加上传文件
          uploadFiles.push({'filename' : filename, 'formData' : formData, 'oriName' : v.name});

        });

        if (uploadFiles.length == 0){
          //没有文件通过校验
          //隐藏进度遮罩层
          $upProgress.remove();
          showError(errorFiles);
          //清除input中选择文件，确保下次重复上传时可以触发change事件
          $('#eFile').attr('type','text').attr('type','file');
        }
        else {
          //开始上传通过校验的文件
          //上传图片队列
          var queueFiles = [];
          $.each(uploadFiles, function(k, v){
            var FinalUrl = postUrl + "&filename=" + v.filename;
            queueFiles.push({'filename' : v.filename, 'state' : 'start'});

            //全部图片进入队列后，显示取消按钮
            if (k == uploadFiles.length - 1){
              //进度遮罩层取消按钮事件
              $('#eFileCancel').removeClass('hide').click(function(){
                $.each(uploadAjaxArr, function(key, val){
                  val.abort(); 
                });
                //隐藏进度遮罩层
                $upProgress.remove();
                showError(errorFiles);
                //清除input中选择文件，确保下次重复上传时可以触发change事件
                $('#eFile').attr('type','text').attr('type','file');
              });
            }

            var uploadAjax = $.ajax({
                url: FinalUrl,
                type: "POST",
                data: v.formData,
                dataType: 'json',
                processData: false, 
                contentType: false,
                timeout: 1800000,
                cache: false,
                success: function(oriData){
                  if(oriData.returnCode == '0'){
                    //上传成功后生成图片
                    var data = oriData.data;
                    makeImgs($contentActive, data, v.filename);
                  }
                  else {
                    //上传失败后记录原因
                    errorFiles.push({name : v.oriName, info : oriData.message});
                  }
                },
                error : function(XMLHttpRequest, info){
                  //遇到其他错误的时候记录原因
                  var infoText = {
                    'abort' : "取消上传",
                    'timeout' : "超时",
                    'error' : "网络错误",
                    'notmodified' : "网络错误",
                    'parsererror' : "解析错误",
                  }
                  errorFiles.push({name : v.oriName, info : (info && infoText[info] ? infoText[info] : '网络错误' )});
                },
                complete : function(){
                  //提交完成后无论是否成功改变都改变自己的状态
                  queueFiles[k].state = 'done';
                  //更新遮罩进度
                  var allText = parseInt($upCurrent.text()) + 1;
                  $upCurrent.text(allText > (uploadFiles.length) ? uploadFiles.length : allText);
                  //检查所有ajax是否全部完成
                  if (queueFiles.length == uploadFiles.length){
                    //全部ajax都已经发送，开始检查每个ajax的状态
                    var allState = 'done';
                    $.each(queueFiles, function(key, val){
                      if(val.state == 'start'){
                        allState = 'notDone';
                        return false;
                      }
                    });
                    if (allState == 'done'){
                      addAllImages($contentActive);
                      //隐藏进度遮罩层
                      $upProgress.remove();
                      showError(errorFiles);
                      //清除input中选择文件，确保下次重复上传时可以触发change事件
                      $('#eFile').attr('type','text').attr('type','file');
                    }
                  }
                }

              });
            //添加当前请求到ajax队列
            uploadAjaxArr.push(uploadAjax);
          });
        }

      }

    });

    //记录批量上传文件左侧标签位置
    //var contentActiveI = '';
    function makeImgs($contentActive, data, filename){
      //将上传成功的图片添加到页面数据列表
      $contentActive.find('ul').prepend(createFile({ 'tpid': data, 'ytpmc': filename }));
      var pageDataList=pageData.oriData.tree[0].cl;
      var clbm=$contentActive.attr('data-clbm');
      for (var i in pageDataList) {
        if (pageDataList[i].clbm == clbm) {
          //contentActiveI = i;
          pageDataList[i].imageInfo.push({ tpid: data, ytpmc: filename });
          break;
        }
      }
    }
    //更新电子档案，批量生成图片
    function addAllImages($contentActive){
      var selectIndex = $('#e_record .nav-tabs .active').find('a').attr('href').split('_')[3];
      $("#e_record .nav-tabs li:eq(" + selectIndex + ")").find('a').click();

      // 左侧对应的标签
      var $badge = $('#e_record a[href="#' + $contentActive.prop('id') + '"] .badge');
      // 更新图片总数
      $badge.text($contentActive.find('li').length);

      //contentActiveI = '';
      resize();
      var $eTabContent = $('#e_record .tab-content');
      $eTabContent.scrollTop($eTabContent.height);
    }

    // 删除附件图片
    $('#e_record .tab-content').unbind("click").on('click', 'button', function () {
      if (confirm('请确认是否要删除此附件图片？')) {
        $RecCover.removeClass('hidden');
        var $li = $(this).closest('li');
        var itemid = $li.closest('.tab-pane').prop('id');
        var fid = $li.data('fid');
        if (poolSelect["_POOLKEY"]) {
          delUrl += "?_POOLKEY=" + poolSelect["_POOLKEY"];
          // 判断上传类型
          if ("NZR" == options.type) {
            // NZR 新版业务材料
            delUrl += "&tpid=" + fid;	// 图片id
          } else if ("ODZ" == options.type) {
            // ODZ PKG版业务材料
            var $contentActive = $('#e_record .tab-content .active');
            delUrl += "&tpid=" + fid;	// 图片id
            delUrl += "&clbm=" + $contentActive.data('clbm');	// 材料编码
            delUrl += "&scanKey=" + options.scanKey;	// 扫描关键字
            delUrl += "&flowid=" + options.flowid;	// 业务系统对应的流程ID
            delUrl += "&stepid=" + options.stepid;	// 业务系统对应的节点ID
          } else {
            ydl.alert({
              'icon': 'info',
              'message': '删除业务材料出错',
              'desc': '不支持该类型的业务材料！'
            });
            return false;
          };
        } else {
          ydl.alert({
            'icon': 'info',
            'message': '删除业务材料出错',
            'desc': '请刷新重试！'
          });
          return false;
        };
        $.ajax(delUrl, {
          dataType: 'json',
          async: true,
          success: function (ret) {

            if (ret.returnCode == '0') {

              // 左侧对应的标签
              var $contentActive = $('#e_record .tab-content .active');
              var $badge = $('#e_record a[href="#' + $contentActive.prop('id') + '"] .badge');

              // 移除页面元素
              $li.remove();
              // 页面数据删除
              var pageDataList=pageData.oriData.tree[0].cl;
              var dClbm=$contentActive.data('clbm');
              deleteImg(pageDataList,dClbm,fid)
              // 更新图片总数
              $badge.text(($contentActive.find('li').length || ''));
              if (isIE8) {
                if ($contentActive.find('li').length == 0) $badge.addClass('hidden');
              }
              $e_record_form[0].reset();
              resize();

            }
            else {
              ydl.alert('删除业务材料出错：' + ret.message);

            }
            $RecCover.addClass('hidden');
          },
          error: function (ret) {
            ydl.alert('删除业务材料出错：' + ret.message);
            $RecCover.addClass('hidden');
          }
        });

      }
      return false;
    });


    // 框架的整体遮罩层对象
    var $RecCover = $('#eRecCover');
    // 点击后的小图图片外层div对象 
    var $imgYLClick;
    // 大图图片对象
    var $img;
    // 大图遮罩对象
    var $imgCover;
    // 大图弹出框主体部分对象
    var $e_rec_modalBody;
    // 大图旋转
    function bigImgRot(fagnxiang) {
      var classNum = parseInt($img.attr('class').match(/transform(\d)/)[1]);
      if (classNum == (fagnxiang == 'left' ? 1 : 4)) classNum = (fagnxiang == 'left' ? 4 : 1);
      else classNum = (fagnxiang == 'left' ? classNum - 1 : classNum + 1);
      // 旋转图片
      $img.removeClass().addClass('transform' + classNum);
    }
    // 大图缩放
    function bigImgSF(SF) {
      var oldHeight = parseInt($img.width());
      // $img.height('auto').stop(true).animate({width: oldHeight * (SF == 'F'
      // ? 1.3 : 0.7) }, 500);
      $img.height('auto').width(oldHeight * (SF == 'F' ? 1.3 : 0.7));
    }
    // 大图恢复原始状态
    function bigImgYS($image) {
      var $modalBody = $e_rec_modalBody;
      var modalWidth = $modalBody.width();
      var modalHeight = $modalBody.height();
      $image.height('auto').width('auto');
      var imageWidth = $image.width();
      var imageHeight = $image.height();
      if (imageWidth < modalWidth && imageHeight < modalWidth) {
        // 小于弹出框尺寸的图片居中处理
        $image.css({ 'top': (modalHeight - imageHeight) / 2, 'left': 'auto' });
      } else {
        // 超宽或超高图片
        if ((imageWidth - modalWidth) >= (imageHeight - modalHeight)) {
          $image.width('100%').css({ 'top': (modalHeight - $image.height()) / 2, 'left': 'auto' });;
        } else {
          $image.height('100%').css({ 'top': 'auto', 'left': 'auto' });
        }
      }
      $image.removeClass($img.attr('class').match(/transform(\d)/)[0]).addClass('transform1');
    }

    // 生成大图对话框
    var $showBigImg = $('').dialogScroll({
      'close': true,
      'size': 'lg',
      'id': 'e_record_modal',
      'buttons': {
        '向左旋转': function () {
          bigImgRot('left');
        },
        '向右旋转': function () {
          bigImgRot('right');
        },
        '放大': function () {
          bigImgSF('F');
        },
        '缩小': function () {
          bigImgSF('S');
        },
        '下载': function () {
        },
        '恢复': function () {
          bigImgYS($img);
        }
        /*
         * , '恢复原始位置':function(){
         * $img.css({'top':'auto','left':'auto'}).removeClass($img.attr('class').match(/transform(\d)/)[0]).addClass('transform1'); }
         */
      },
      'create': function () {
        // 按钮样式预处理
        var buttons = {
          '向左旋转': 'eButImgLeft',
          '向右旋转': 'eButImgRight',
          '放大': 'eButImgBig',
          '缩小': 'eButImgSmall',
          '下载': 'eButImgDownload'
        };
        var $buttons = $('#e_record_modal .modal-footer button');
        // 预处理按钮样式
        $buttons.each(function () {
          var $this = $(this);
          var thisText = $this.text()
          if (buttons[thisText]) {
            $this.text('').addClass('eButImg ' + buttons[thisText]).attr('title', thisText);
            // 预处理下载按钮
            if (thisText == '下载') {
              $this.wrap('<a id="eDownloadImg" href=""></a>');
            }
          }
        });
        // 创建并添加遮罩层
        $imgCover = $('<div id="eBigImgCover" ></div>');
        $e_rec_modalBody = $('#e_record_modal .modal-body');
        $e_rec_modalBody.after($imgCover);
      },
      'show': function () {
        // 设置弹出框高度
        $e_rec_modalBody.height($(window).height() - 200);
      },
      'shown': function () {
        // 支持拖拽
        // $img =
        // $('#e_record_bigImg').draggable();
        $img = $e_rec_modalBody.find('img').draggable();
        // 重置大图位置
        bigImgYS($img);
        // 隐藏遮罩层
        $imgCover.addClass('hidden');
      },
      'hidden': function () {
        // 删除复制的大图
        $img.remove();
        // 显示遮罩层
        $imgCover.removeClass('hidden');
      }
    });
    // 生成内容并绑定点击缩略图弹出大图事件
    $('#e_record .nav-tabs').append(navTabHtml);
    $('#e_record .tab-content').append(contentHtml).on('click', 'li > div', function () {
      //临时处理确保不报错
      //return false;
      $imgYLClick = $(this)
      var $YLimg = $imgYLClick.find('img');
      // $('#e_record_bigImg').attr('src' , $YLimg.attr('src'));
      // 将图片复制进大图区域
      $e_rec_modalBody.append($YLimg.clone());
      $e_rec_modalBody.find('img').addClass('transform1')
      // 设置下载链接
      $('#eDownloadImg').prop('href', $YLimg.prop('src') + '&isDownLoad=1&tpmc=' + $imgYLClick.next('p').find('span').data('original'));
      $showBigImg.dialogScroll('option', 'title', $YLimg.attr('title'));
      $showBigImg.dialogScroll('open');
    });
    // 调整元素高度
    // $('#e_record
    // .nav-tabs').append('<li><a>aaa</a></li><li><a>aaa</a></li><li><a>aaa</a></li><li><a>aaa</a></li><li><a>aaa</a></li><li><a>aaa</a></li><li><a>aaa</a></li><li><a>aaa</a></li><li><a>aaa</a></li><li><a>aaa</a></li><li><a>aaa</a></li>');

    var leftHeight = $('#e_record .nav-tabs').height();
    var $rightBase = $('#e_record .tab-content');
    var basicHeight = parseFloat($rightBase.css('max-height'));
    // 如果左侧菜单超过右侧菜单高度最大值，则重新计算右侧菜单高度
    if (leftHeight > basicHeight) {
      var filesHeight = 228;
      $rightBase.css({ 'max-height': basicHeight + Math.ceil((leftHeight - basicHeight) / filesHeight) * filesHeight })
    }
    resize();
    function resize() {
      $('#e_record .nav-tabs').height('auto').height($('#e_record .items').height());
    }
    // 初始化后的回调
    $widget.trigger('load');

    // 当图片滚动进入可是区域后再加载图片（避免初始化后段时间大量请求后台加载图片）
    var contentScorll;
    $('#e_record .items .tab-content').off('scroll').on('scroll', function(){
      if (contentScorll) {
        clearTimeout(contentScorll);
      }
      contentScorll = setTimeout(function(){
        syncLoadImg();
      }, stopImgScrollTime);
    });

    // 切换tab时设置当前显示分支的信息，同时计算整体高度
    $('#e_record ul a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      eFileInfo();
      resize();
      syncLoadImg();
    });
    syncLoadImg();
    /**
     * 异步加载图片
     */
    var i, array;
    function syncLoadImg() {
      // 数量清0
      i = 0;
      array = [];
      var $contentActive = $('#e_record .tab-content .active');
      // 如果没有任何数据，则不做处理
      if ($contentActive.length == 0) return;
      // 当前屏幕可显示图片总数
      //totalImg= $('#e_record #' + $contentActive.prop('id') + ' img[data-read="false"]').length;
      $('#e_record #' + $contentActive.prop('id') + ' img[data-read="false"]').each(function (index, element) {
        //获取当前图片位置
        var $thisImg = $(this);
        var thisTop = parseFloat($thisImg.offset().top);
        //获取当前激活页签位置
        var $thisContent = $('#e_record .items .tab-content');
        //判断当前图片是否处于当前页签范围内（是否在可见范围内）
        if ( thisTop > parseFloat($thisContent.offset().top) && thisTop < (parseFloat($thisContent.offset().top) + parseFloat($thisContent.height())) ) {
          //在可见范围内，加载图片
          array.push($(this).attr("id"));
        }
      });
      changepic();
    }
    /**
     * 更换图片（将加载动画变为真正的图片，会请求后台下载）
     */
    function changepic() {
      if (i >= array.length) return;
      var obj = document.getElementById(array[i]);
      obj.setAttribute("src", ydl.contexPath + '/erecord/imageCapture/downloadFyImg?tpid=' +
        array[i] + '&_POOLKEY=' + poolSelect["_POOLKEY"]);
      obj.setAttribute("data-read", "true");
      i++;
      setTimeout(changepic, imgLoadTime);
    }
    /**
     * 获取毫秒日期为 2014051208124800891
    */
    function formatDate() {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var min = date.getMinutes();
      var s = date.getSeconds();
      var ss = date.getMilliseconds();
      if (m < 10)
        m = "0" + m;
      if (d < 10)
        d = "0" + d;
      if (min < 10)
        min = "0" + min;
      if (s < 10)
        s = "0" + s;
      // 2位随机数
      var num = parseInt(Math.random() * (99 - 10 + 1) + 10, 10);
      return (y + "" + m + "" + d + "" + h + "" + min + "" + s + "" + ss + "" + num);
    }

    //v0.1 初始化后的回调函数  孙一宁 2019/08/15 新增start
    var initCallBack = options.initCallBack;
    if (initCallBack && $.isFunction(initCallBack)) {
      initCallBack(options.smlsh);
    }
    //初始化后的回调函数  孙一宁 2019/08/15 新增end
  };

  /**
   * 判断是否启用批量上传方法，ie9默认返回不启用（false）
   * return Boolean(true/false)
  */ function useMultiple(isIE9) {
    if(isIE9) return false;
    else return isMultiple;
  }
  
  //显示批量错误
  function showError(errorData){

    //清除上次的数据和按钮
    $('#e_recordErrorList, #eFileError').remove();

    //无错误，不显示
    if (errorData.length == 0){
      return;
    }
    var html = '<div id="e_recordErrorList"><div class="e_err-bg"></div><div class="e_err-button-base"><div id="eFileErrorClose">关闭</div></div><ul>';
    $.each(errorData, function(k ,v){
      html += '<li>文件：' + v.name + '上传失败。原因：' + v.info + '。</li>';
    });
    html += '</ul></div>'
    $('#e_record').append(html);
    $('#eFileBase').append('<div id="eFileError">显示批量错误</div>');

    var $e_recordErrorList = $('#e_recordErrorList');
    //批量错误隐藏按钮
    $('#eFileErrorClose').on('click', function(){
      $e_recordErrorList.find('ul, .e_err-button-base').addClass('hide');
      $e_recordErrorList.animate(
        {'width':'100px', 'height':'30px', 'left':'690px', 'top':'3px', 'overflow':'hidden'},
        300, 
        function(){
          $e_recordErrorList.addClass('hide');
        }
      );
    });
    //批量错误显示按钮
    $('#eFileError').on('click', function(){
      $e_recordErrorList.removeClass('hide').animate(
        {'width':'100%','height':'100%', 'left':'0px', 'top':'0px', 'overflow':'auto'}, 
        300,
        function(){
          $e_recordErrorList.find('ul, .e_err-button-base').removeClass('hide');
        }
      );
    });
  }

  //页签切换后的事件，目前用于清除多选框（检查框）
  $('body').on('show.bs.tab', '#e_record .nav-tabs a[data-toggle="tab"]', function (e) {
    $($(e.target).attr('href')).find(':checkbox').prop('checked', false);
    $('#eFilesCheckAll').prop('checked', false);
  });

//重置全部复选框，全选框状态
function resetAllCheck(){
  $('#e_record .tab-pane li .eFiles-check:checked').prop('checked',false);
  $('#eFilesCheckAll').prop('checked', false);
}

//移动端二维码生成 黄晓蓉 2020/03/25 新增start
function getQrcode(params) {
  var key = '';
  var qrcodeUrl = ydl.contexPath + '/mobile/erecord/getScanQrcode';
  $.ajax({
    type: 'post',
    url: qrcodeUrl,
    data: params,
    dataType: 'json',
    async: true,
    success: function (res) {
      if (res.returnCode == '0') {
        key = res.key;
        $('.qrcode-img img').attr('src', 'data:image/png;base64,' + res.qrcode);
      }
      else {
        ydl.alert('二维码获取出错：' + res.message);
      }
    },
    error: function (res) {
      ydl.alert('二维码获取出错：' + res.message);
    }
  });

  $('#qrcodeBtn').unbind('click').on('click', function () {
    if ($('#qrcodeImg').hasClass('hidden')) $('#qrcodeImg').removeClass('hidden');
    else $('#qrcodeImg').addClass('hidden');
    if (key && !mobileFlage) {
      countDown = setInterval(function () {
        qrcodeClock()
      }, 2000);
      mobileFlage = true;
    }
    return false;
  });
  
  //轮询调用的方法
  function qrcodeClock() {
    var qrcodeUrl = ydl.contexPath + '/mobile/erecord/synchronize';
    $.ajax({
      type: 'post',
      url: qrcodeUrl,
      data: { key: key },
      dataType: 'json',
      async: true,
      success: function (res) {
        if (res.returnCode == '0') {
          var pageDataList=pageData.oriData.tree[0].cl;
          var ischange = res.ischange;
          var clbm = res.clbm;
          var tpid = res.filepath;
          var ytpmc = res.ytpmc;
          if (ischange == '0') return;
          else if (ischange == '1') {
            addImg(pageDataList,clbm,tpid,ytpmc,'1');
          } else if (ischange == '2') {
            deleteImg(pageDataList,clbm, tpid,'1',ytpmc);
          }
        }
        else {
          console.error('图片同步出错：' + res.message)
        }
      },
      error: function (res) {
        console.error('图片同步出错：' + res.message)
      }
    });
  }
}

//点击其他位置隐藏上传二维码
$('body').on('click', function(){
  $('#qrcodeImg').addClass('hidden');
});

//增加图片
function addImg(pageDataList,clbm,tpid,ytpmc,isLx){
  for (var i in pageDataList) {
    if (pageDataList[i].clbm == clbm) {
      pageDataList[i].imageInfo.push({ tpid: tpid, ytpmc: ytpmc });
      var selectIndex = $('#e_record .nav-tabs .active').find('a').attr('href').split('_')[3];
      if(isLx==='1') changeDom('add',clbm,tpid,ytpmc);
      $("#e_record .nav-tabs li:eq(" + selectIndex + ")").find('a').click();
      break;
    }
  }
}
//删除图片
function deleteImg(pageDataList,clbm, tpid, isLx,ytpmc){
  for (var i in pageDataList) {
    for (var j in pageDataList[i].imageInfo) {
      if (pageDataList[i].imageInfo[j].tpid == tpid) {
        pageDataList[i].imageInfo.splice(j, 1);
        selectIndex = i;
        var selectIndex = $('#e_record .nav-tabs .active').find('a').attr('href').split('_')[3];
        if(isLx==='1') changeDom('delete',clbm,tpid,ytpmc);
        $("#e_record .nav-tabs li:eq(" + selectIndex + ")").find('a').click();
        break;
      }
    }
  }

}
//增加或删除dom结构
function changeDom(type,bm,id,ytpmcO){
  // 判断是否为ie9浏览器
  var isIE9 = /MSIE 9\.\d/.test(navigator.userAgent);
  $('#e_record .tab-content .tab-pane').each(function(){
    var fThis=this;
    var clbm=$(this).attr('data-clbm');
    if(bm==clbm){
      if(type==='delete'){
        $(fThis).find('li').each(function(){
          var cThis=this;
          var tpid=$(cThis).attr('data-fid');
          if(tpid==id) $(cThis).remove();
        })
      }else{
        var createFile = function () {
            // 图片名称
            //var ytpmc = bm+'_'+$(fThis).find('li').length+ytpmcO.split('.')[1];
            var ytpmc = ytpmcO;
            var isEdit=pageData.rw == "w" ? true : false;
            
            return '<li data-fid="' + id +
              '">' + (isEdit ? (!useMultiple(isIE9) ? '' : '<input class="eFiles-check" type="checkbox" >') + '<button type="button" class="close" title="删除此业务材料"><span>&times;</span></button>' : '') +
              '<div class="eFileSl"><img src="' + ydl.contexPath + '/erecord/imageCapture/downloadFyImg?tpid=' +
              id + '&_POOLKEY=' + poolSelect["_POOLKEY"] + '" title="' + ytpmc +
              '"/></div><p><span data-original="' + ytpmc + '">' + ytpmc + '</span></p></li>';
          };
        $(fThis).find('ul').prepend(createFile({ 'tpid': id, 'ytpmc': '' })) 
      }
      $('#e_record .nav-tabs li').each(function(){
        var zclbm=$(this).find('a').attr('data-clbm');
        var len=$(fThis).find('li').length;
        if(zclbm==bm)$(this).find('.badge').text(len);
      })
      
    }  
  })
  
}
//移动端二维码生成 黄晓蓉 2020/03/25 新增end

})();
/**
 * 引入CSS公共方法
 */
var dynamicLoading = {
  css: function (path) {
    if (!path || path.length === 0) {
      throw new Error('argument "path" is required !');
    }
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = path;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head.appendChild(link);
  },
  js: function (path) {
    if (!path || path.length === 0) {
      throw new Error('argument "path" is required !');
    }
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = path;
    script.type = 'text/javascript';
    head.appendChild(script);
  }
}
var baseCSS = ydl.contexPath + '/common/css/';
//引入电子档案CSS
dynamicLoading.css(baseCSS + "erecord.css");

