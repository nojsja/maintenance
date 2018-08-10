var CODE_SUCCESS = 200;
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

//要加载的js文件
var Base64 = (function(){
    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
    return {
        encode:encode,
        decode:decode
    };
})()

function valifyEmail(email)
{
    var reg = /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(email);
}

function valifyPort(str)
{
    var parten=/^(\d)+$/g;
    if(parten.test(str)&&parseInt(str)<=65535&&parseInt(str)>=0){
        return true;
     }else{
        return false;
     }
}
function valifySpecialCh(ch)
{
    var pattern = /[~`!@#$%^&*()+={}\[\]|<>?:;"',.！，。、‘；："￥……（）《》？——“”‘’\\\/【】]+/;
    return pattern.test(ch);
}

function valifySpecialword(ch)
{
    var pattern = /[~`!@#$%^&*()+={}\[\]|<>?:;"',.！，。、‘；："￥……（）《》？——“”‘’\\\/【】]+/;
    return pattern.exec(ch);
}

function valifySpecialfiletype(ch)
{
    var pattern = /[\[ \] " \\ /]+/;
    return pattern.test(ch);
}

function valifySpecialfile(ch)
{
    var pattern = /[\[ \] " \\ /]+/;
    return pattern.exec(ch);
}

function valifyURL(url)
{
   var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
                + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
                + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                + "|" // 允许IP和DOMAIN（域名）
                + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
                + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
                + "[a-z]{2,6})" // first level domain- .com or .museum
                + "(:[0-9]{1,4})?" // 端口- :80
                + "((/?)|" // a slash isn't required if there is no file name
                + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var re = new RegExp(strRegex);
        return re.test(url);
}

function valifyIP(ip)
{
	if (typeof(ip) === "undefined" || ip === "")
		return false;
	var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
	if(re.test(ip))
	{
		if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256)
			return true;
	}
	return false;

}

function valifySubNetIP(ip)
{
    if (typeof(ip) === "undefined" || ip === "")
        return false;
    if (ip === "*"){return true;}
    else{
    var re=/^(\d+)\.(\d+)\.(\d+)\.(\*)$/g //匹配IP地址的正则表达式
    if(re.test(ip))
    {
        if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && (RegExp.$4 == "*"))
            return true;
    }}
    return false;
}

function valifyDomain(domain, n) //可选参数n表示n级域名
{
    var patrn=/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
    if (!patrn.test(domain)) return false;
    if (n && domain.match(/\./g).length !== n - 1) return false;
    return true;
}

function valifyNumber(str)
{
    var patrn=/^[0-9]{1,100}$/;
    if (!patrn.exec(str)) return false ;
    return true;
}
//cookie
function getCookie (name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function setCookie (name, value, hours) {
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1e3));
        var expires = '; expires=' + date.toUTCString();
    } else {
        var expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}
//校验用户名：只能输入1-32个字母、数字、下划线
function valifyUsername(name)
{
    var patrn=/^(\w){1,32}$/;
    if (!patrn.exec(name))
        return false;
    return true;
}
//校验路径
function valifyPath(name)
{
    var patrn=/^([\/][\w-]+)*$/i;
    if (!patrn.exec(name))
        return false;
    return true;
}
function trim(str)
{
    return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}
function refresh()
{
    location.reload();
}

var ajaxUrlGobalList = {}; // 全局变量存放发送的url请求

var AjaxRequest = (function(){

    function ajax(options){
        if(options.type === undefined || options.type === ""){
            options.type = "post";
        }
        if(options.async === undefined || options.async === ""){
            options.async = true;
        }
        if(options.param === undefined || options.param === ""){
            options.param = {};
        }
        if(options.tip === undefined || options.tip == null){
            options.tip = lang.loadingajax;
        }
		if(typeof (options.multi) == "undefined" || options.multi == ""){
			options.multi = false;
		}

		// 如果发送时cookie已经过期跳转到主页
		if ($.cookie('access_token') == null || $.cookie('access_token') == "") {
			var tmpurl = window.location.pathname.slice(11);
			location.href = "/infinity2/login?url=" + tmpurl;
			return;
		}

        var  num = 0;
        $.each(options.param,function(key,value){
            if(0 == num){
                options.url += "?";
                num++;
            }else{
                options.url += "&";
            }

            options.url += encodeURIComponent(key);
            options.url += "=";
            if (key == "callback" && value == "?")
                options.url += value;
            else
                options.url += encodeURIComponent(value);
        });
        try{
            $.ajax({
                dataType:"json",
                type:options.type,
                cache:false,
                timeout:600*1000,
                url:options.url,
                data:options.data,
                async:options.async,
                beforeSend: function(xhr){
                    // console.log('options.url = '+options.url);
                    var findUrlInList = false;
					if (!options.multi) {			// 如果没有设置multi为true就查找ajax发送列表
						if (ajaxUrlGobalList[options.url])
							findUrlInList = true;
					}
					if (findUrlInList) {	// 发送了相同uri则取消此次
						xhr.abort ();
					}else {
						ajaxUrlGobalList[options.url] = true;
						var tips = "";
						if(options.tip != undefined && options.tip != ""){
							tips = "正在"+options.tip+"...";
							$("section.loading .fortips").html(tips);
							$("section.loading").show();
                            $('#nav_bottom_fixed').show();
						}
					}
                },
                complete:function(){
					$("section.loading").hide();
                    $('#nav_bottom_fixed').show();
					ajaxUrlGobalList[options.url] = false;
                },
                error:function(xhr, textStatus, errorThrown){
                    $("section.loading").hide();
                    $('#nav_bottom_fixed').show();
					if(jQuery.isFunction(options.fail)){
                            options.fail(xhr);
                    }
                },
                success:function(data){
                    $("section.loading").hide();
                    $('#nav_bottom_fixed').show();

					if(jQuery.isFunction(options.success)){
                        options.success(data);
                    }
                }
            });
        }catch(e){
            console.log('something wrong when send ajax');
            $('#nav_bottom_fixed').show();
			$("section.loading").hide();
        }
    }

    return {
        get:function(options){
            options.type = 'get';
            ajax(options);
        }
        ,post:function(options){
            options.type = 'post';
            ajax(options);
        }
    }
})();

var DataModel = (function(){
    var getUrl = {'getDeviceInfo': 'initfilesys/deviceinfo'};
    var postUrl = {
				// user model
				'modifyPwd': 'user/modifyUserPwd',
                'userCreate': 'user/create',
                'userModify': 'user/modify',
                'userMoveGroup': 'user/moveGroup',
                'userRemvoe': 'user/remove',
                'userResetPwd': 'user/resetPwd',
                'listAllUser': 'user/listAllUsers',
                'listAllDomainUserInfo': 'user/listAllDomainUserInfo',
                'listAllDomainGroups': 'user/listAllDomainGroups',
                'localUserResetPwd': 'user/localUserResetPwd',
                'searchLocalUser': 'user/searchLocalUser',
                'getCnasRole': 'user/cnasRoleGet',
                'objuserCreate': 'user/objuserCreate',
                'objuserDelete': 'user/objuserDelete',
                'objuserGet': 'user/objuserGet',
                'objuserList': 'user/objuserList',

        // sthome
                'showServicesList':'sthome/showServicesList',
                'getRunState':'sthome/showRunState',
                'loadStatus' :'sthome/loadStatus',
                'listStorageInfo' :'sthome/listStorageInfo',
                //group modal
                'listGroup': 'user/listAllGroups',
                'listUsersByGroupid': 'user/listUsersByGroupid',
                'listADUsersByName': 'user/listADUsersByGroupname',
                'groupCreate': 'user/createGroup',
                'logoutDomain': 'user/logoutDomain',
                'setLanguage': 'language/setLanguage',
                'localGroupRemvoe': 'user/localGroupRemvoe',
                'listAllAdminUser': 'user/allAdminList',
                'joinDomain': 'user/joinDomain',
                'allAdminList': 'user/allAdminList',
                'listLogs': 'optlogs/listLogs',
                'listDomainInfo': 'user/listCurDomainInfo',
                'domainUsersListBygroup': 'user/listAllDomainUsersByName',
                'ADCacher': 'user/ADDomainCacher',
                //LDAP
                'joinLDAP': 'user/joinLDAPDomain',
                'leaveLDAP': 'user/leaveLDAPDomain',
                'searchLDAP': 'user/searchLDAPUser',
                'listLDAPInfo': 'user/listLDAPInfo',
                'listLDAPUser': 'user/listLDAPUser',
                'listLDAPByGroup': 'user/listLDAPUserByGroup',
                'listLDAPGroup': 'user/listAllLDAPGroups',
                'LDAPCacher': 'user/LDAPDomainCacher',

                //节点信息
                'checkNodes': 'nodeinfo/nodesCheck',
                'addNode': 'nodeinfo/addNode',
                'delNode': 'nodeinfo/delNode',
                'initNode': 'nodeinfo/nodeInit',
                'editHostName': 'nodeinfo/editHostName',
                'setNTPName': 'nodeinfo/setNTPServerName',
                'getNTPName': 'nodeinfo/getNTPServerName',
                'setMaster': 'nodeinfo/setMasterNode',
                'getMaster': 'nodeinfo/getMasterNode',
                'delMaster': 'nodeinfo/delMasterNode',
                'setClockSrc': 'nodeinfo/setClockSource',
                'getClockSrc': 'nodeinfo/getClockSource',
                'clockStart' : 'nodeinfo/startClockService',
                'adjustClock': 'nodeinfo/adjustNodeClock',
                'listNodeSource': 'nodeinfo/listNodeClockSource',
                'getCharacter': 'nodeinfo/getNodeClockCharacter',
                'initNodeClock': 'nodeinfo/initNodeClockService',
                'setTime': 'nodeinfo/setTimeClock',
                'setCity': 'nodeinfo/setCityClock',
                'listNet': 'nodeinfo/listNetInfo',
                'listAllNet': 'nodeinfo/listAllNetInfo',
                'listNeedNetInfo':'nodeinfo/listNeedNetInfo',
                'listMonitorNet': 'nodeinfo/listMonitorNet',
                'getHealth' : 'nodeinfo/getHealth',
				// 网络管理
				'setIp': 'nodeinfo/setIp',
                'setBondIp': 'nodeinfo/setBondIp',
                'setBond': 'nodeinfo/bond',
                'dfgwdev': 'nodeinfo/dfgwdev',
                'setdfgwdev': 'nodeinfo/setdfgwdev',
                'cancelBond': 'nodeinfo/release',
                'setDNS': 'nodeinfo/setDns',
                'setPing': 'nodeinfo/ping',
                'delbondnic': 'nodeinfo/delbondnic',
                'addbondnic': 'nodeinfo/addbondnic',
                'networkMonitor': 'nodeinfo/networkMonitor',

				// 基本设置
				'listBasic': 'nodeinfo/listBasicNodeInfo',
                'listClock': 'nodeinfo/listClockInfo',
                'listAllCity': 'nodeinfo/listAllCity',
                'listStatisNode': 'nodeinfo/listNode',
				// 磁盘管理
                'listDetailBytype': 'diskmgm/detailDiskInfoByType',
				"diskList": 'nodeinfo/listDiskInfo',
                "diskRescan": 'nodeinfo/diskRescan',
                "listAllDisk": 'diskmgm/listAllDisk',
                "showAddDiskProgress": 'diskmgm/showAddDiskProgress',
                'cleanCache': 'nodeinfo/cacheClean',
                'refreshCache': 'nodeinfo/cacheRefresh',
                'setLocation': 'nodeinfo/setLocation',
                //服务列表
                'listServices': 'nodeinfo/listServices',
                'startServices': 'nodeinfo/startServices',
                'stopServices': 'nodeinfo/stopServices',
                //重置节点
                'resetConf': 'nodeinfo/resetConf',
                'resetCluster': 'nodeinfo/resetCluster',
                'resetConfAdmin': 'nodeinfo/resetConfAdmin',
                'resetSysdb': 'nodeinfo/resetSysdb',
                'resetIdisk': 'nodeinfo/resetIdisk',
				// 分区管理
				"partList": 'nodeinfo/listPartInfo',
                "showAddPartList": 'nodeinfo/showAddPartList',
                "delPart": 'nodeinfo/delPart',
                "partCreate": 'nodeinfo/createPart',
                "unmountPart": 'nodeinfo/unmountPart',
                "formatPart": 'nodeinfo/formatPart',
                'listRun': 'nodeinfo/listRunTime',
                'reboot': 'nodeinfo/reboot',
                'shutdown': 'nodeinfo/shutDown',
                //许可证管理
                'addRegisterCode': 'permit/addRegisterCode',
                'delRegisterCode' : 'permit/delRegisterCode',
                'activeCode': 'permit/activeCode',
                'getHWCode': 'permit/getServerInfo',
                'getLicCode': 'permit/listAllRegisterCode',
                //文件共享
                'listDirs': 'fileshare/listDirs',
                'listMount': 'fileshare/listMountPoint',
                'createDir': 'fileshare/createNewDir',
                'delDir': 'fileshare/delDir',
                'createAfp': 'fileshare/createAfpShare',
                'delAfp': 'fileshare/deleteAfpShare',
                'createFtp': 'fileshare/createFtpShare',
                'delFtp': 'fileshare/deleteFtpShare',
                'createHttp': 'fileshare/createHttpShare',
                'delHttp': 'fileshare/delHttpShare',
                'createNfs': 'fileshare/createNfsShare',
                'delNFS': 'fileshare/deleteNfsShare',
                'createCifs': 'fileshare/createCifsShare',
                'delCifs': 'fileshare/deleteCifsShare',
                'listCifs': 'cifs/listCifs',
                'getSessionStatus': 'cifs/getSessionStatus',
                'listNfs': 'nfs/listNfs',
                'listAfp': 'afp/listAfp',
                'listFtp': 'ftp/listFtp',
                'listHttp': 'webdav/listHttp',
                //目录
                'listDirAcl': 'fileshare/listDirAcl',
                'setDirOwner': 'fileshare/setDirOwner',
                'clear': 'fileshare/clearDirPro',
                'setDir': 'fileshare/setDirPro',
                'searchDir': 'fileshare/searchDirs',
                'quotaGet': 'fileshare/quotaGet',
                'quotaSet': 'fileshare/quotaSet',
                'quotaFileGet': 'fileshare/quotaFileGet',
                'quotaFileSet': 'fileshare/quotaFileSet',
                //集群管理
                'listHealth': 'clustermgm/listClusterHealth',
                'listOverAll': 'clustermgm/listOverAllStats',
                'createCluster': 'clustermgm/createCluster',
                'newDisk': 'diskmgm/addDiskInfo',
                'delDisk': 'diskmgm/delDiskInfo',
                'refreshDiskInfo': 'diskmgm/refreshDiskInfo',
                'listDisk': 'diskmgm/listDisk',
                'addDisks': 'diskmgm/addDisksWizaed',
                'listStorageNode': 'clustermgm/listStorageNodeInfo',
                'listMonitor': 'clustermgm/listMonitorInfo',
                'listMetaData': 'clustermgm/listMetaDataInfo',
                'newMonitor': 'clustermgm/addMonitorService',
                'delMonitor': 'clustermgm/delMonitorService',
                'startMonitor': 'clustermgm/startMonitorService',
                'stopMonitor': 'clustermgm/stopMonitorService',
                'newmetadata': 'clustermgm/addMetaDataService',
                'delMetadata': 'clustermgm/delMetaDataService',
                'startMeta': 'clustermgm/startMetaData',
                'stopMeta': 'clustermgm/stopMetaData',
                'listNode': 'clustermgm/listNodes',
                'newStorage': 'clustermgm/addStorageNode',
                'delStorage': 'clustermgm/delStorageNode',
                'stopStorage': 'clustermgm/stopStorageNode',
                'startStorage': 'clustermgm/startStorageNode',
                'listSNode': 'clustermgm/listStorageNodes',
                'listNasInfo': 'clustermgm/listNasInfo',
                'newNas': 'clustermgm/addNas',
                'delNas': 'clustermgm/delNas',
                'startNas': 'clustermgm/startNas',
                'stopNas': 'clustermgm/stopNas',
                'stopAllNas': 'clustermgm/stopAllNas',
                'startAllNas': 'clustermgm/startAllNas',
                'clusterState': 'clustermgm/clusterState',
                'clusterDestroy': 'clustermgm/clusterDestroy',
                'clusterShutdown': 'clustermgm/clusterShutdown',
                'shutdownPrework': 'clustermgm/shutdownPrework',
                'shutdownPrework2': 'clustermgm/shutdownPrework2',
                'shutdownPrework3': 'clustermgm/shutdownPrework3',
                'shutdownPrework4': 'clustermgm/shutdownPrework4',
                'shutdownPrework5': 'clustermgm/shutdownPrework5',
                'listObj': 'clustermgm/listObjStorageInfo',
                'addObj': 'clustermgm/addObjService',
                'delObj': 'clustermgm/delObjService',
                'stopObj': 'clustermgm/stopObjService',
                'startObj': 'clustermgm/startObjService',

                //配置向导
                'listPublicIP': 'clustermgm/listPublicIP',
                'addPubIp': 'clustermgm/addPublicIp',
                'modifyPubIp': 'clustermgm/modifyPublicIp',
                'delPubIp': 'clustermgm/delPublicIp',
                'resetPubIp': 'clustermgm/resetPublicIp',
                'setDnsPri': 'clustermgm/setDnsPrimaryNode',
                'setDnsSec': 'clustermgm/setDnsSecondaryNode',
                'startDns': 'clustermgm/startDns',
                'stopDns': 'clustermgm/stopDns',
                'listDnsAll': 'clustermgm/listDnsAllInfo',
                'listIpSelected': 'clustermgm/listPublicIpForSelected',
                'addDisksWizard': 'clustermgm/addDisksWizard',
                'setDnsService': 'clustermgm/setDnsService',
                'listDnsNodes': 'clustermgm/listDnsNodes',
                'listDiskDetails':"clustermgm/listDiskDetails",

                //日志管理
                'listOptLogs': 'optlogs/listOptLogs',
                'listAlarms': 'alarm/listAlarmsInfo',
                'listAlarmCong': 'alarmsetting/listAlarmConfig',
                'setAlarmCong': 'alarmsetting/setAlarmConfig',
                'exportLogs':'optlogs/getLogsUrl',
                'clearLogs':'optlogs/clearLogsFile',
                'downloadLogs':'optlogs/sendLogs',
                'listAudit': 'auditlogs/listAuditLogs',
                'listNodeAudit': 'auditlogs/listNodeAuditLogs',
                'searchAudit': 'auditlogs/searchAuditLogs',
                'searchNodeAudit': 'auditlogs/searchNodeAuditLogs',
                'cleanAudit': 'auditlogs/cleanAuditLogs',
                //存储管理
                'delStoragePool': 'storagepoolmgm/delStoragePool',
                'createStoragePool': 'storagepoolmgm/createStoragePool',
                'listavaildiskByPool': 'storagepoolmgm/listavaildiskByPoolName',
                'updateCapacity': 'storagepoolmgm/updateDisks',
                'listSpool': 'storagepoolmgm/listStoragePoolByNeeds',
                'listAllPoolsHome': 'storagepoolmgm/listAllPoolsUsedspace',
                'listAllStorage': 'storagepoolmgm/listAllStorage',
                'poolQuotaget':'storagepoolmgm/poolQuotaget',
                'poolQuotaset': 'storagepoolmgm/poolQuotaset',
                //文件系统
                'delFS': 'filesystem/delFilesystem',
                'editFSAvail': 'filesystem/editFSAvailCapacity',
                'createFS': 'filesystem/createFilesystem',
                'listFs': 'filesystem/listAllFilesystemInfo',
                'nodeismounted': 'filesystem/listMountNode',
                'nodemount': 'filesystem/nodemount',
                'nodeumount': 'filesystem/nodeumount',
                //对象存储管理
                'createObject': 'objstorage/createObjsystem',
                'listObject': 'objstorage/listObjsystem',
                //卷管理
                'createVolume': 'volumemgm/createVolume',
                'delVolume': 'volumemgm/deleteVolume',
                'createSnapshot': 'volumemgm/createSnapshot',
                'delSnapshot': 'volumemgm/deleteSnapshot',
                'createClone': 'volumemgm/createClone',
                'editVolume': 'volumemgm/editVolumeInfo',
                'listVolume':'volumemgm/listAllVolumeInfo',
                'volumeList': 'volumemgm/listAllVolumeDetail',
                //snmp设置  smtp设置
                'getSnmp': 'alarmsetting/getSnmpInfo',
                'setSnmp': 'alarmsetting/setSnmpInfo',
                'testSnmp': 'alarmsetting/testSnmpInfo',
                'getSmtp':'alarmsetting/getSmtpInfo',
                'saveSmtpConf' :'alarmsetting/setSmtpConfSave',
                'getAlarmStatus': 'alarmsetting/getAlarmConf',
                'sendTestEmial': 'alarmsetting/sendTestEmial',
                'setEmailStatus': 'alarmsetting/setSMTPEmailStatus',
                'addEmail':'alarmsetting/addRecipientEmail',
                'delEmail':'alarmsetting/delRecipientEmail',
                'listNasPubIPInfo': 'nasmgm/listNasPublicIPInfo',
                'delNasPubIp': 'nasmgm/delNasPublicIp',
                'addNasPubIp': 'nasmgm/addNasPublicIp',
                //列举统计信息
                'getPoolStatis': 'statisticsinfo/getPoolStatisInfo',
                'getHistoryPoolStatis': 'statisticsinfo/getHistoryPoolStatis',
                'getHistoryNodeStatis': 'statisticsinfo/getHistoryNodeStatis',
                'getCurNodeStats': 'statisticsinfo/getCurNodeStats',
                //维护
                'setSerStatus': 'clustermgm/setMaintainStatus',
                'getSerStatus': 'clustermgm/getMaintainStatus',
                //手动挂载、卸载fs
                'mount': 'fileshare/mount',
                'umount': 'fileshare/unmount',
                //DNS
                'listCurClusterDns' :'clustermgm/listCurClusterDnsInfo',
                'createCurClusterDns' :'clustermgm/createCurClusterDnsInfo',
                'listDnsList' :'clustermgm/listDnsList',
                'createDnsList' :'clustermgm/createDnsListInfo',
                'delDnsList' :'clustermgm/deleteDnsListInfo',
                'delSingleIp': 'clustermgm/deleteSingleDnsIp',
                'addSingleIp': 'clustermgm/createSingleDnsIp',
                'getForwarder': 'clustermgm/getForwarderIp',
                'setForwarder': 'clustermgm/setForwarderIp',
                //数据状态
                'recoverget':'clustermgm/recoverget',
                //扩容缩容
                //集群管理-基础信息
                'clusterNodeBasicInfo': 'clustermgm/clusterNodeBasicInfo',
                'clusterNodeAdd': 'clustermgm/clusterNodeAdd',
                'clusterNodeDel': 'clustermgm/clusterNodeDel',
                'listAllNode': 'nodeinfo/listAllNode',

				};
    var funs = {};
	for(var names in postUrl){
        var aurl = postUrl[names];
        funs[names] = (function(auaxurl){
            var dofun = function(param, callback, async, tip, failCallback, multi){
                multi = multi || false;
				AjaxRequest.post({
                    url: auaxurl,
                    data: param,
                    async:async,
                    tip:tip,
                    multi:multi,
                    success:callback,
                    fail:failCallback
                });
            }
            return dofun;
        })(aurl);
    }
    for(var name in getUrl){
        var url = getUrl[name];
        funs[name] = (function(ajaxurl){
            var dofun = function(param, callback, async, tip){
                AjaxRequest.get({
                    url: ajaxurl,
                    data: param,
                    async:async,
                    tip:tip,
                    success:callback
                });
            };
            return dofun;
        })(url);
    }
    return funs;
})();

function ShowAlert(msg, title)
{
    if(title === undefined || title === ""){
        title = "";
    }
    $(".message .msg").html('<strong class="title">'+title+'</strong>' + msg);
    $(".message").fadeIn();
    $(".message .alert-close").one("click", function(event){
        event.stopPropagation();
        $(this).parent().fadeOut();
    });
//  setTimeout(function(){$(".alert-message").hide();}, 1000*3);
}

function DisplayTips(msg, title, type)
{
	if(typeof msg === 'undefined') msg = "";
	if(typeof title === 'undefined') title = "";
	var alert_type = "alert-info";
	if(type === 'error') alert_type = "alert-error";
	else if(type === 'success') alert_type = "alert-success";
	var htm = '<div class="alertion alert '+ alert_type +'">';
	  htm += '<a class="close" data-dismiss="alert">&times;</a>';
	  htm += '<strong>'+title+'</strong><span class="offset-mini">';
	  htm += msg;
	  htm += '</span></div>';
	this.htm = htm;
	$('body').append(htm);
	var owner = this;
	var timeout = setTimeout(hideTips, 1000*5);
	function hideTips(){
		$(".alertion").remove();
	}
	$(".alertion").hover(function(){
		clearTimeout(timeout);
	}, function(){
		timeout = setTimeout(hideTips, 1000*5);
	});
	$('a[data-dismiss=alert]').click(function(){
		$(this).parent().remove();
	});

}

function Confirm(msg, title, fnyescallback, fnnocallback)
{
    var htm = '<div class="modal hide confirm-modal" id="confirm-modal">';
        htm += ' <div class="modal-dialog">';
        htm += '  <div class="modal-content">';
    if((title != undefined) && (trim(title) != '')){
        htm += '     <div class="modal-header">';
        htm += '        <a href="javascript:;" data-dismiss="confirm-modal" class="close">&times;</a><h3>'+title+'</h3></div>';
    }
    if ((msg != undefined) && (trim(msg) != '')){
        htm += '      <div class="modal-body"><p>' + msg + '</p></div>';
    }
    htm += '    <div class="modal-footer">';
    htm += '     <a href="javascript:;" data-dismiss="confirm-modal" class="btn btn-primary yes">是</a>';
    htm += '     <a href="javascript:;" data-dismiss="confirm-modal" class="btn btn-secondary no">否</a>';
    htm += '    </div>';
    htm += '</div>';
    htm += '</div>';
    htm += '</div>';

    $('body').append(htm);
    $('#confirm-modal').modal('show');
    $("#confirm-modal .yes").one("click", function(ev){
        closeConfirm();
        if((fnyescallback != undefined) && (fnyescallback != "") && (fnyescallback != null)){
            fnyescallback();
        }
    });
    $("#confirm-modal .no").one("click", function(ev){
        closeConfirm();
        if((fnnocallback != undefined) && (fnnocallback != "") && (fnnocallback != null)){
            fnnocallback();
        }
    });
    $("#confirm-modal .close").one("click", function(ev){
        closeConfirm();
    });
    function closeConfirm(){
        $('#confirm-modal').modal('hide');
        $('#confirm-modal').remove();
    }
}

function ConfirmPopover($el, position, title, content, ycallback, ncallback)
{
    var htm = '<span>'+content+'</span><br/><br/>';
        htm += '<div class="row"><div class="offset1"><button class="btn" id="confirm-no">取消</button><button class="btn btn-primary offset-mini" id="confirm-yes">确定</button></div></div>';
    $el.popover({trigger:'manual', placement:position, title:title, content:htm});
    $el.popover('toggle');
    $("#confirm-yes").one ('click', function(event){
        if(jQuery.isFunction(ycallback)){
            ycallback();
        }
        $el.popover('hide');
    });
    $("#confirm-no").one ('click', function(event){
        if(jQuery.isFunction(ncallback)){
            ncallback();
        }
        $el.popover('hide');
    });
}
function loadHelp (url)
{
   var helpfile;
   helpfile = url;
   $('#helpbox').load (helpfile);
}
function loadCankao (url)
{
   var cankao;
   cankao = url;
   $('#refbox').load (cankao);
}
function loadWizard (url)
{
   var wizard;
   wizard = url;
   $('#guidbox').load (wizard);
}
var PostUpload = function(opts) {
    if(typeof(opts.file) === 'undefined') return false;
    if(typeof(opts.target) !== 'string') return false;
    var chunkSize = opts.chunkSize;
    var file = opts.file;
    var startSize,endSize = 0;
    var pause = false;
    var canceled = false;
    var done = true;
    var fileName = file.fileName||file.name;
    var size = file.size;
    var fileid = opts.fileid;
    var oauth = opts.oauth;
    var token = opts.token;
    var owner = this;

    this.getFileId = function(){
        return fileid;
    }

    this.getFileName = function(){
        return file.name;
    }

    this.progress = function(){
        if(typeof(opts.progress) === 'function')
            opts.progress(endSize/size, fileid);
    }

    this.onerror = function(msg){
        if(typeof(opts.onerror) === 'function')
            opts.onerror(msg, file);
    }

    this.oncomplete = function(){
        if(typeof(opts.oncomplete) === 'function')
            opts.oncomplete(fileid, file);
    }

    this.start = function(){
        sendData();
    }

    this.cancel = function(){
        pause = true;
        canceled = true;
        var xhr = new XMLHttpRequest();

        var formData = new FormData();
        formData.append('filename', opts.file.name);
        formData.append('fileid', fileid);
        xhr.open('POST', 'upload/cancelupload');
        xhr.onreadystatechange = function(){
            if(typeof(opts.cancel) === 'function'){
                opts.cancel();
            }
        };
        xhr.send(formData);
    }
    this.pause = function(){
        pause = true;
    }

    this.continues = function(){
        pause = false;
        sendData();
    }

    function sendData(){
        if(pause) return;
        if(size > 0 && file.size <= 0){
            owner.cancel('文件已删除');
            return;
        }
        if(endSize >= size){
            owner.oncomplete();
            return;
        }else{
            if(done){
                startSize = endSize;
                endSize += opts.chunkSize;
                if(endSize > size) endSize = size;
            }
        }

        var formData = new FormData();
        var func = (opts.file.mozSlice ? 'mozSlice' : (opts.file.webkitSlice ? 'webkitSlice' : 'slice'));
        formData.append("file", opts.file[func](startSize, endSize));
        formData.append("fileid", opts.fileid);
        formData.append("offset", startSize);
        formData.append("length", endSize - startSize);
        formData.append("filesize", size);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", opts.target);
        xhr.setRequestHeader('Authorization', oauth);
        xhr.setRequestHeader('ACCESS-TOKEN', token);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                if(canceled) return;
                try{
                    var result = JSON.parse(xhr.responseText);
                    if(result.code === 200){
                        done = true;
                        owner.progress();
                        sendData();
                    }else{
                        done = false;
                        owner.onerror(result.result);
                    }
                }catch(e){
                    owner.onerror("unknow error "+e);
                }
            }
        }
        xhr.send(formData);
    }
}

function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[decodeURIComponent (s[0])] = decodeURIComponent (s[1]);
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}

// 获取table的值
function getSelectedRow()
{
	var records = [];
	$("table.main tbody input:checked").each(function(){
		var onerecord = [];
		$(this).closest("tr").children().each(function(){
			if($(this).attr("name") != ""){
				var temp = $(this).html().replace(/<\/?.+?>/g,"");// 去掉html标记的文档
				onerecord[$(this).attr("name")] = temp;
			}
		});
		records.push(onerecord);
	});
	return records;
}


 function unitConver (size){	// size 单位B
 	size = parseInt(size);
 	if (size/1024/1024/1024/1024 > 1) {
 		return (size/1024/1024/1024/1024) + "TB";
 	}else if (size/1024/1024/1024 > 1) {
 		return (size/1024/1024/1024) + "GB";
 	}else if (size/1024/1024 > 1) {
 		return (size/1024/1024) + "MB";
 	}else if (size/1024 > 1) {
 		return (size/1024) + "KB";
 	}else {
 		return (size) + "B";
 	}

 }
//格式化字节单位 单位bytes
function formatCapacity(capacity) {
    var str = "";
    if (capacity == 0 || capacity == "") {
        str = "0";
    } else {
        if ((capacity / (1024*1024*1024*1024*1024)) >= 1) { // PB
            str = ((Math.floor((capacity /(1024*1024*1024*1024*1024))*100))/100) + " PB";//100保留两位
        } else if ((capacity / (1024*1024*1024*1024)) >= 1) { // T
            str = ((Math.floor((capacity /(1024*1024*1024*1024))*100))/100) + " TB";//100保留两位
        } else if (capacity / (1024*1024*1024) >= 1) { //G
            str = ((Math.floor((capacity /(1024*1024*1024))*100))/100) + " GB";
        } else if (capacity / (1024*1024) >= 1) { //M
            str = ((Math.floor((capacity /(1024*1024))*100))/100) + " MB";
        } else if (capacity / (1024) >= 1) {       //k
            str = ((Math.floor((capacity /(1024))*100))/100) + " KB";
        } else if (capacity > 0) {
            str = capacity + " Bytes";
        }
    }
    return str;
}

//格式化字节单位 单位kb
function formatCapacityKB(capacity) {
    var str = "";
    if (capacity == 0 || capacity == "") {
        str = "0";
    } else {
        if ((capacity / (1024*1024*1024*1024)) >= 1) { // T
            str = ((Math.floor((capacity /(1024*1024*1024*1024))*100))/100) + " PB";//100保留两位
        } else if (capacity / (1024*1024*1024) >= 1) { //G
            str = ((Math.floor((capacity /(1024*1024*1024))*100))/100) + " TB";
        } else if (capacity / (1024*1024) >= 1) { //M
            str = ((Math.floor((capacity /(1024*1024))*100))/100) + " GB";
        } else if (capacity / (1024) >= 1) {       //k
            str = ((Math.floor((capacity /(1024))*100))/100) + " MB";
        } else if (capacity > 0) {
            str = capacity + " KB";
        }
    }
    return str;
}

//格式化字节单位 单位M
function formatCapacityMB(capacity) {
    var str = "";
    if (capacity == 0 || capacity == "") {
        str = "0";
    } else {
        if (capacity / (1024*1024*1024) >= 1) { //G
            str = ((Math.floor((capacity /(1024*1024*1024))*100))/100) + " PB";
        } else if (capacity / (1024*1024) >= 1) { //M
            str = ((Math.floor((capacity /(1024*1024))*100))/100) + " TB";
        } else if (capacity / (1024) >= 1) {       //k
            str = ((Math.floor((capacity /(1024))*100))/100) + " GB";
        } else if (capacity > 0) {
            str = capacity + " MB";
        }
    }
    return str;
}


// 文件系统转化
function getFsType (type) {
	switch(type)
	{
		case 1:
			return "EXT2";
		case 2:
			return "EXT3";
		case 3:
			return "EXT4";
		case 4:
			return "FAT";
		case 5:
			return "XFS";
		case 6:
			return "D3FS";
		case 10:
			return "MAX";
		default:
			return "UNKNOWN";
	};
}

function formatTime (time) {
    var date = new Date(time) || "2017-04-17";
    // var formatedTime = newDate.split('T')[0] +' ' + newDate.split('T')[1].split('.')[0];
    var formatedTime = date.toLocaleString().replace(/上午|下午/,'');
    return formatedTime;
}


var INFI_STATUS = {
    'success' : 200,
    'faild' : 600,
    'exception' : 601,
    'warning' : 602,
    'uninitialized' :603,
}

/* 定时检测前端cookie信息是否失效 */
var cookieCheckTimer = function () {
  if (window.location.pathname.split('/').pop() == 'login') {
    clearInterval(cookieCheckTimer);
    return;
  }
  if ( !$.cookie('access_token') ) {
    // var tmpurl = window.location.pathname.slice(11);
    var path = window.location.pathname.split('/');
    var tmpurl = path.slice(2).join('');
    location.href = "/infinity2/login?url=" + tmpurl;
    clearInterval(cookieCheckTimer);
  }
};
setInterval(cookieCheckTimer, 60*1000);
