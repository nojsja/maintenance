$(function (ev) {
  //global
    var h = $('.all_table_list_third').height();
    var allNode = [];  // 展示的当前节点信息

	  perpage = parseInt( h/43 - 1 );
    if (perpage < 1) perpage = 1;
    //用于储存搜索状态
    searchMode = {
        isSearching: false,
        keyword: ''
    }

    /* ------------------- 获取所有节点信息 ------------------- */

    var renderNodes = function () {
      var $target = $('#targetNode');
      var htm = '';
      allNode.forEach(function (node) {
        htm += '<option value="'+node.ip+'">'+node.hostname+'</option>'
      });
      $target.html(htm);
    };

    var listNodes = function () {
      var nowNode = document.location.hostname;
      allNode.push({
        ip: nowNode,
        hostname: ''
      });

      DataModel['listNode'](null, function (rsp) {
        if (rsp.code == 200) {
          rsp.result.nodes &&
          rsp.result.nodes.length &&
          (rsp.result.nodes.forEach(function (node) {
            if (node.ip == nowNode){
              allNode[0].hostname = node.hostname;
            }else {
              allNode.push({
                ip: node.ip,
                hostname: node.hostname
              });
            }
          }))
          renderNodes();
        }else {
          DisplayTips(rsp.result);
        }
      }, true, null);
    };

    // 获取节点信息
    listNodes();

    var showLog = function (targetPage, ip) {
        var para = {
            'page' : targetPage,
            'perpage' : perpage,
            'sort' : 'time',
            'ip': ip,
        }

        var callback = function (result) {
            $('.dt_system_bar').LoadData('hide')
            if (!result) {
                return;
            }
            if (result.code === 200) {
                var totalPages = Math.ceil( result.result[0].count / perpage );
                var tableHtml = renderLogsTable(result.result[0].records);
                var paginationHtml = renderPagination(totalPages, targetPage);

                $('#js-audit-log-table').html(tableHtml);
                $('#js-audit-pagination').html(paginationHtml);

                autoHeightPermit();
            }
            else if(result.code ==701){
                $(".dt_system_bar_third").LoadData ("hide");
            }
            else {
                console.log('fail!');
            }
        }

        $('.dt_system_bar').LoadData('show')
        DataModel["listNodeAudit"](para, callback, true, null);
    }

    var searchLog = function (keyword, targetPage) {
        var para = {
            'page' : targetPage,
            'perpage' : perpage,
            'keyword' : keyword,
            'ip': $('#targetNode').val()
        }

        var callback = function (result) {
            $('.dt_system_bar').LoadData('hide')
            if (!result) {
                return;
            }
            if (result.code === 200) {
                var totalPages = Math.ceil( result.result.count / perpage );
                var tableHtml = renderLogsTable(result.result.records);
                var paginationHtml = renderPagination(totalPages, targetPage);

                $('#js-audit-log-table').html(tableHtml);
                $('#js-audit-pagination').html(paginationHtml);

                autoHeightPermit();
            } else {
                console.log('fail!');
            }
        }

        $('.dt_system_bar').LoadData('show')
        DataModel["searchNodeAudit"](para, callback, true, null);
    }

    showLog(1, document.location.hostname);

    $(document)
    // 切换节点
    .on('change', '#targetNode', function (ev) {
      var node = $(this).val();
      showLog(1, node);
    })
    //点击页码
    .on('click', '.js-audit-page', function (ev) {
        var target = $(this).data('target');
        if (searchMode.isSearching) {
            searchLog(searchMode.keyword, target);
        } else {
            showLog(target, $('#targetNode').val());
        }
    })
    //搜索
    .on('click', '#js-allsearch-audit', function (ev) {
        var keyword = trim($('#js-filter-audit').val());
        searchMode.keyword = keyword;
        if (keyword === '') {
            $('#js-filter-audit').val('');
            searchMode.isSearching = false;
            showLog(1, $('#targetNode').val());
            return;
        } else {
            searchMode.isSearching = true;
            searchLog(keyword, 1);
        }
    })
    .on('keypress', '#js-filter-audit', function (ev) {
        if (ev.which == 13) {
            $('#js-allsearch-audit').click()
        }
    })

    //生成列表
    function renderLogsTable (data) {
        var html = '';
        if (data.length < 1) {
            html += '<div class="no-content">' + lang.no_record + '</div>';
        }
        for (var i = 0; i < data.length; i++) {
            var formatTime = data[i].time.slice(5,7) + "/" + data[i].time.slice(8,10)+"/" + data[i].time.slice(0,4) + "  "+data[i].time.slice(11,19);
            html += '<tr>' +
                        '<td class="ellipsis" title="' + data[i].user_name + '">' + data[i].user_name + '</td>' +
                        '<td>' + formatTime + '</td>' +
                        '<td>' + data[i].user_op + '</td>' +
                        '<td class="ellipsis" title="' + data[i].user_op_target + '">' + data[i].user_op_target + '</td>' +
                        '<td class="ellipsis" title="' + data[i].share_name + '">' + data[i].share_name + '</td>' +
                        '<td>' + data[i].user_ip + '</td>' +
                    '</tr>';
        }
        return html;
    }

    //生成分页
    function renderPagination (total, curpage) {
		var html = '';
		var prevPages = 0;
		var nextPages = 0;

		if (curpage > total) {
			curpage = total;
		} else if (curpage < 1) {
			curpage = 1;
		}
		//计算前后页数
		if (total <= 11) {
			prevPages = curpage - 1;
			nextPages = total - curpage;
		} else {
			if (curpage <= 6) {
				prevPages = curpage - 1;
			} else {
				prevPages = 5;
			}
			if (total - curpage <= 6) {
				nextPages = total - curpage;
			} else {
				nextPages = 10 - prevPages;
			}
		}
		//上一页
		if (curpage !== 1) {
			html += '<li>' +
						'<a class="js-audit-page" data-target="' + (curpage - 1) + '" aria-label="Previous">' +
							'<span aria-hidden="true">&laquo;</span>' +
						'</a>' +
					'</li>';
		} else {
			html += '<li class="disabled">' +
						'<a aria-label="Previous">' +
							'<span aria-hidden="true">&laquo;</span>' +
						'</a>' +
					'</li>';
		}

		if (prevPages + 1 === curpage) { 	//前页无省略
			for (var i = 0; i < prevPages; i++) {
				html += '<li><a class="js-audit-page" data-target="' + (i + 1) + '">' + (i + 1) + '</a></li>';
			}
		} else {
			html += '<li><a class="js-audit-page" data-target="1">1</a></li>' +
					'<li class="disabled"><a>…</a></li>';
			for (var i = 3; i > 0; i--) {
				html += '<li><a class="js-audit-page" data-target="' + (curpage - i) + '">' + (curpage - i) + '</a></li>';
			}
		}

		//当前页
		html += '<li class="active"><a>' + curpage + '</a></li>';

		if (curpage + nextPages === total) {	//后页无省略
			for (var j = 0; j < nextPages; j++) {
				html += '<li><a class="js-audit-page" data-target="' + (curpage + j + 1) + '">' + (curpage + j + 1) + '</a></li>';
			}
		} else {
			for (var j = 0; j < nextPages - 2; j++) {
				html += '<li><a class="js-audit-page" data-target="' + (curpage + j + 1) + '">' + (curpage + j + 1) + '</a></li>';
			}
			html += '<li class="disabled"><a>…</a></li>' +
					'<li><a class="js-audit-page" data-target="' + total + '">' + total + '</a></li>';
		}

		//下一页
		if (curpage !== total) {
			html += '<li>' +
						'<a class="js-audit-page" data-target="' + (curpage + 1) + '" aria-label="Next">' +
							'<span aria-hidden="true">&raquo;</span>' +
						'</a>' +
					'</li>';
		} else {
			html += '<li class="disabled">' +
						'<a aria-label="Next">' +
							'<span aria-hidden="true">&raquo;</span>' +
						'</a>' +
					'</li>';
		}

		return html;
	}

    function autoHeightPermit () {
        $('.all_table_list_third').height($('.audit-log-table').height());
    }
})
