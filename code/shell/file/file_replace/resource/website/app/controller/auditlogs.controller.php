<?php
class Auditlogs extends ValifyPage
{
    public function render() {
        $this->mainStat();
    }


	public function mainStat() {
        $this->_output();
    }

	private function _output(){
        $this->twig->assign ("logLang", $this->lang->loadLang ("optlogs"));
        $this->twig->assign("current_nav", "sysserver");
        $this->twig->assign("cursubmenu", "auditlogs");
        parent::render();
        echo $this->twig->render ("auditlogs.htm");
	}

    //列举审计日志信息
    public function listAuditLogs($value=''){
        $page = Util::post('page');
        $perpage = Util::post('perpage');
        $sort = Util::post('sort');
        $res = Box::getObject('optlogs', 'model')->listAuditLogs($page, $perpage, $sort);
        echo $res;
    }

    // 按照节点列举审计日志信息
    public  function listNodeAuditLogs($value='') {
      $page = Util::post('page');
      $perpage = Util::post('perpage');
      $sort = Util::post('sort');
      $ip = Util::post('ip');

      $res = Box::getObject('optlogs', 'model')->listNodeAuditLogs($page, $perpage, $sort, $ip);

      echo $res;
    }

    public function searchAuditLogs($value=''){
        $page = Util::post('page');
        $perpage = Util::post('perpage');
        $keyword = Util::post('keyword');
        $res = Box::getObject('optlogs', 'model')->searchAuditLogs($page, $perpage, $keyword);
        echo $res;
    }

    public function searchNodeAuditLogs($value=''){
        $page = Util::post('page');
        $perpage = Util::post('perpage');
        $keyword = Util::post('keyword');
        $ip = Util::post('ip');
        $res = Box::getObject('optlogs', 'model')->searchNodeAuditLogs($page, $perpage, $keyword, $ip);
        echo $res;
    }

    public function cleanAuditLogs($value=''){
        $res = Box::getObject('optlogs', 'model')->cleanAuditLogs();
        echo $res;
    }

}
?>
