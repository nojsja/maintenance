<?php
class OptLogsModel
{
    public function __construct() {}

    public function listLogs($page, $perpage, $logType){
		$param = [
            'page' => $page,
            'perpage' => $perpage,
            'logType' => $logType
        ];
        $curl_result = Curl::post(INFINITY_SERVER_LOG, $param);
        return $curl_result;
    }

    public function clearUp(){
        $curl_result = Curl::post(INFINITY_OPTLOG_CLEARUP, []);
        return $curl_result;
    }

    //审计日志
    public function listAuditLogs($page, $perpage, $sort){
        if (empty($page)) {
            $page = 1;
        }
        if (empty($perpage)) {
            $perpage = 10;
        }
        if (empty($sort)) {
            $sort = 'time';
        }

		$param = [
            'page' => $page,
            'perpage' => $perpage,
            'sort' => $sort
        ];
        $curl_result = Curl::post(INFINITY_AUDITLOG_LIST, $param);
        return $curl_result;
    }

    //列举节点审计日志
    public function listNodeAuditLogs($page, $perpage, $sort, $ip){
        if (empty($page)) {
            $page = 1;
        }
        if (empty($perpage)) {
            $perpage = 10;
        }
        if (empty($sort)) {
            $sort = 'time';
        }

		    $param = [
            'page' => $page,
            'perpage' => $perpage,
            'sort' => $sort
        ];
        $url = 'http://' . $ip . '/api/infinity-v2' . '/misc/audit/log/list';
        $curl_result = Curl::post($url, $param);

        return $curl_result;
    }

    public function searchAuditLogs($page, $perpage, $keyword){
        if (empty($page)) {
            $page = 1;
        }
        if (empty($perpage)) {
            $perpage = 10;
        }

		$param = [
            'page' => $page,
            'perpage' => $perpage,
            'keyword' => $keyword
        ];
        $curl_result = Curl::post(INFINITY_AUDITLOG_SEARCH, $param);
        return $curl_result;
    }

    public function searchNodeAuditLogs($page, $perpage, $keyword, $ip){
        if (empty($page)) {
            $page = 1;
        }
        if (empty($perpage)) {
            $perpage = 10;
        }

		$param = [
            'page' => $page,
            'perpage' => $perpage,
            'keyword' => $keyword
        ];
        $url = 'http://' . $ip . '/api/infinity-v2/misc/audit/log/search';
        $curl_result = Curl::post($url, $param);
        return $curl_result;
    }

    public function cleanAuditLogs(){
        $curl_result = Curl::post(INFINITY_AUDITLOG_CLEAR, null);
        return $curl_result;
    }

    //列举告警信息
    public function listAlarms($page, $perpage) {
        $param = [
            'page' => $page,
            'perpage' => $perpage,
        ];
        $curl_result = Curl::post(INFINITY_ALARM_RECORDS_LIST, $param);
        // $curl_result = Curl::post(INFINITY_SERVER_ALARM, null);

        return $curl_result;
    }

    //列举告警配置
    public function listAlarmConfig($value='') {
        $curl_result = Curl::post(INFINITY_ALARMCONF_GET, null);
        return $curl_result;
    }

    //设置告警设置
    public function setAlarmConfig($name, $option, $value) {
        $param = [
            'name' => $name,
            'option' => $option,
            'value' => $value,
        ];
        $curl_result = Curl::post(INFINITY_ALARMCONF_SET, $param);
        return $curl_result;
    }

    //获取SNMP信息
    public function getSnmpInfo($value='') {
        $curl_result = Curl::post(INFINITY_SNMP_GET, null);
        return $curl_result;
    }

    //设置SNMP  INFINITY_SNMP_SET
    public function setSnmpInfo($nmsip, $status, $msgoid='.1.3.6.1.6.3.1.1.4.1.0', $sendtraptime=600, $cpuutilthres=80, $memutilthres=100, $enteroid='1,3,6,1,4,1,2021,251,1') {
        $param = [
            'nms_ip' => $nmsip,
            'send_trap_time' => $sendtraptime,
            'cpu_util_thres' => $cpuutilthres,
            'mem_util_thres' => $memutilthres,
            'enter_oid' => $enteroid,
            'msg_oid' => $msgoid,
            'status' => $status
        ];
        $curl_result = Curl::post(INFINITY_SNMP_SET, $param);
        return $curl_result;
    }

    //测试SNMP
    public function testSnmpInfo($nmsip, $msgoid='.1.3.6.1.6.3.1.1.4.1.0', $sendtraptime=600, $cpuutilthres=80, $memutilthres=100, $enteroid='1,3,6,1,4,1,2021,251,1') {
        $param = [
            'nms_ip' => $nmsip,
            'send_trap_time' => $sendtraptime,
            'cpu_util_thres' => $cpuutilthres,
            'mem_util_thres' => $memutilthres,
            'enter_oid' => $enteroid,
            'msg_oid' => $msgoid
        ];
        $curl_result = Curl::post(INFINITY_SNMP_TEST, $param);
        return $curl_result;
    }

    //获取SMTP信息
    public function getSmtpInfo($value='') {
        $curl_result = Curl::post(INFINITY_SMTP_CONF, null);
        return $curl_result;
    }

    //获取SMTP信息
    public function getAlarmConf($value='') {
        $curl_result = Curl::post(INFINITY_ALARM_STATUS, null);
        return $curl_result;
    }

    //SMTP发送测试邮件
    public function sendTestEmial($email) {
        $param = [
            'email' => $email,
        ];
        $curl_result = Curl::post(INFINITY_SMTP_SENDTESTEMAIL, $param);
        return $curl_result;
    }

    //设置SMTP告警状态
    public function setSMTPEmailStatus( $status ) {
        $param = [
            'status' => $status,
        ];
        $curl_result = Curl::post(INFINITY_EMAIL_SETSTATUS, $param);
        return $curl_result;
    }

    //添加邮箱
    public function addRecipientEmail($email) {
        $param = [
            'email' => $email,
        ];
        $curl_result = Curl::post(INFINITY_EMAIL_ADD, $param);
        return $curl_result;
    }

    //删除邮箱
    public function delRecipientEmail($email) {
        $param = [
            'email' => $email,
        ];
        $curl_result = Curl::post(INFINITY_EMAIL_DEL, $param);
        return $curl_result;
    }

    //设置SMTP
    public function setSMTPConf( $smtpserver, $port, $sender, $password, $subject ) {
        $param = [
            'smtpserver' => $smtpserver,
            'port' => $port,
            'sender' => $sender,
            'password' => $password,
            'subject' => $subject
        ];
        $curl_result = Curl::post(INFINITY_SMTPCONF_SET, $param);
        return $curl_result;
    }

    //获取日志文件地址
    public function getLogsUrl(){
        $curl_result = Curl::post(INFINITY_EXPORT_LOGS,null);
        return $curl_result;
    }

    //删除日志文件
    public function clearLogsFile(){
        $curl_result = Curl::post(INFINITY_CLEAR_LOGS,null);
        return $curl_result;
    }
}
?>
