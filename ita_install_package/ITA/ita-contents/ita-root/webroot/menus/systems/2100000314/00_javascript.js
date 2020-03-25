//   Copyright 2019 NEC Corporation
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//

//////// ----コールバックファンクション ////////
function callback() {}
callback.prototype = {  
    Filter1Tbl_add_selectbox : function( result ){
        var filterAreaWrap = 'Filter1_Nakami';
        var strFilterPrintId = 'Filter1Tbl';
        var containerClassName = 'fakeContainer_Filter1Setting';

        var intMaxWidth = 650;

        var htmlSetExcute = true;
        var errMsgBody = '';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultSetTargetSeq = ary_result[2];
        var resultContentTag = ary_result[3];

        var objHtmlSetArea = $('#'+filterAreaWrap+' .'+resultSetTargetSeq).get()[0];

        if( objHtmlSetArea === null ){
            htmlSetExcute = false;
        }else{
            if( ary_result[0] != "000" ){
                htmlSetExcute = false;
                errMsgBody = ary_result[2];
            }
        }

        if( htmlSetExcute == true ){
            //----生成されたセレクトタグ、を埋め込み
            $(objHtmlSetArea).html(resultContentTag);
            //生成されたセレクトタグ、を埋め込み----

            addPullDownBox(filterAreaWrap, strFilterPrintId, intMaxWidth, resultSetTargetSeq, containerClassName);
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }
        showForDeveloper(result);
    },
    Filter1Tbl_reload : function( result ){
        var filterAreaWrap = 'Filter1_Nakami';
        var strFilterPrintId = 'Filter1Tbl';

        var htmlSetExcute = true;
        var errMsgBody = '';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objTableArea=$('#'+filterAreaWrap+' .table_area').get()[0];

        if( objTableArea === null){
            htmlSetExcute = false;
        }else{
            if( ary_result[0] != "000" ){
                htmlSetExcute = false;
                errMsgBody = ary_result[2];
            }
        }

        if( htmlSetExcute == true ){
            objTableArea.innerHTML = resultContentTag;
            adjustTableAuto (strFilterPrintId,
                   "sDefault",
                   "fakeContainer_Filter1Setting",
                   webStdTableHeight,
                   webStdTableWidth );
            linkDateInputHelper(filterAreaWrap);
            if( ary_result[3]==1 ){
                Filter1Tbl_reset_filter(true);
            }
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }
        showForDeveloper(result);

        if( filter_on == false ){
            filter_on = true;
            if(initialFilter == 1){
                Filter1Tbl_search_async('orderFromFilterCmdBtn');
            }
        }
    },
    Filter1Tbl_recCount : function(result){
        var strMixOuterFrameName = 'Mix1_Nakami';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];
        objAlertArea.style.display = "none";

        if( ary_result[0] == "000" ){
            if( ckRangeOfAlert(ary_result[2], webPrintRowLimit) ){
                window.alert(getSomeMessage("ITAWDCC90103",{0:webPrintRowLimit,1:ary_result[2]}));
                // Web表を表示しない
                Filter1Tbl_print_async(0);
            }else{
                if( ckRangeOfConfirm(ary_result[2] , webPrintRowConfirm, webPrintRowLimit) ){
                    if( window.confirm( getSomeMessage("ITAWDCC20201",{0:ary_result[2]})) ){
                        // Web表を表示する
                        Filter1Tbl_print_async(1);
                    }else{
                        // Web表を表示しない
                        Filter1Tbl_print_async(0);
                    }
                }else{
                    // Web表を表示する
                    Filter1Tbl_print_async(1);
                }
            }
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = ary_result[2];
            objAlertArea.style.display = "block";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }
        showForDeveloper(result);
    },
    Filter1Tbl_printTable : function(result){
        var strMixOuterFrameName = 'Mix1_Nakami';
        var strMixInnerFramePrefix = 'Mix1_';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];
        objAlertArea.style.display = "none";

        var objPrintArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

        if( ary_result[0] == "000" ){

            objPrintArea.innerHTML = resultContentTag;

            adjustTableAuto (strMixInnerFramePrefix+'1',
                            "sDefault",
                            "fakeContainer_Filter1Print",
                            webStdTableHeight,
                            webStdTableWidth );
            adjustTableAuto (strMixInnerFramePrefix+'2',
                            "sDefault",
                            "fakeContainer_ND_Filter1Sub",
                            webStdTableHeight,
                            webStdTableWidth );
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = ary_result[2];
            objAlertArea.style.display = "block";
            objPrintArea.innerHTML = "";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }
        showForDeveloper(result);
    },
    Mix1_1_updateTable : function( result ){
        var strMixOuterFrameName = 'Mix1_Nakami';
        var strMixInnerFramePrefix = 'Mix1_';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];

        if( ary_result[0] == "000" ){

            var objUpdateArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

            switch( ary_result[1] ){
                case "200":
                    // エラーなく更新完了
                case "100":
                    window.alert(ary_result[2]);
                    objUpdateArea.innerHTML = "";
                    Filter1Tbl_search_async();
                    break;
                default:
                    objUpdateArea.innerHTML="";
                    $(objUpdateArea).html(resultContentTag);
                    adjustTableAuto (strMixInnerFramePrefix+'1',
                                    "sDefault",
                                    "fakeContainer_Update1",
                                    webStdTableHeight,
                                    webStdTableWidth );
                    
                    linkDateInputHelper(strMixOuterFrameName);
            }
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
            setInputButtonDisable(strMixOuterFrameName,'disableAfterPush',false);
        }else if( ary_result[0] == "003" ){
            var objUpdateArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];
            objUpdateArea.innerHTML="";
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }

        //更新画面表示時の追加処理
        setUpdateParam();

        showForDeveloper(result);
    },
    Mix1_1_deleteTable : function( result ){
        var strMixOuterFrameName = 'Mix1_Nakami';
        var strMixInnerFramePrefix = 'Mix1_';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];

        if( ary_result[0] == "000" ){

            var objDeleteArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

            switch( ary_result[1] ){
                case "210":
                    // エラーなく廃止完了
                case "200":
                    // エラーなく復活完了
                case "100":
                    window.alert(resultContentTag);
                    objDeleteArea.innerHTML = "";
                    Filter1Tbl_search_async();
                    break;
                default:
                    objDeleteArea.innerHTML="";
                    objDeleteArea.insertAdjacentHTML("beforeend",resultContentTag);
                    adjustTableAuto (strMixInnerFramePrefix+'1',
                                    "sDefault",
                                    "fakeContainer_Delete1",
                                    webStdTableHeight,
                                    webStdTableWidth );
            }
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
            setInputButtonDisable(strMixOuterFrameName,'disableAfterPush',false);
        }else if( ary_result[0] == "003" ){
            var objDeleteArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];
            objDeleteArea.innerHTML="";
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }

        showForDeveloper(result);
    },
    Mix2_1_registerTable : function( result ){
        var strMixOuterFrameName = 'Mix2_Nakami';
        var strMixInnerFramePrefix = 'Mix2_';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];

        if( ary_result[0] == "000" ){

            var objRegiterArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

            switch( ary_result[1] ){
                case "100":
                    window.alert(resultContentTag);
                    objRegiterArea.innerHTML = "";
                    Filter1Tbl_search_async();
                    break;
                case "201":
                    // エラーなく登録完了
                default:
                    objRegiterArea.innerHTML="";
                    $(objRegiterArea).html(resultContentTag);

                    objAlertArea.style.display = "none";
                    
                    adjustTableAuto (strMixInnerFramePrefix+'1',
                                    "sDefault",
                                    "fakeContainer_Register2",
                                    webStdTableHeight,
                                    webStdTableWidth );
                    linkDateInputHelper(strMixOuterFrameName);
            }
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
            setInputButtonDisable(strMixOuterFrameName,'disableAfterPush',false);
        }else if( ary_result[0] == "003" ){
            var objRegiterArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];
            objRegiterArea.innerHTML="";
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }

        showForDeveloper(result);
    },
    Journal1Tbl_printJournal : function( result ){
        var strMixOuterFrameName = 'Journal1_Nakami';
        var strMixInnerFrame = 'Journal1Tbl';

        var ary_result = getArrayBySafeSeparator(result);
        checkTypicalFlagInHADACResult(ary_result);

        var resultContentTag = ary_result[2];

        var objAlertArea=$('#'+strMixOuterFrameName+' .alert_area').get()[0];
        objAlertArea.style.display = "none";

        var objPrintArea=$('#'+strMixOuterFrameName+' .table_area').get()[0];

        if( ary_result[0] == "000" ){

            objPrintArea.innerHTML = resultContentTag;

            adjustTableAuto (strMixInnerFrame,
                            "sDefault",
                            "fakeContainer_Journal1Print",
                            webStdTableHeight,
                            webStdTableWidth );
        }else if( ary_result[0] == "002" ){
            window.alert(getSomeMessage("ITAWDCC90102"));
            objAlertArea.innerHTML = resultContentTag;
            objAlertArea.style.display = "block";
            objPrintArea.innerHTML = "";
        }else{
            window.alert(getSomeMessage("ITAWDCC90101"));
        }
        showForDeveloper(result);
    },
    //---- ここからカスタマイズした場合の[callback]メソッド配置域
    // ここまでカスタマイズした場合の[callback]メソッド配置域----
}

//////// テーブルレイアウト設定 ////////
var pageType;
var privilege;
var initialFilterEl;
var initialFilter;
var webPrintRowLimit;
var webPrintRowConfirm;
var webStdTableWidth;
var webStdTableHeight;
var msgTmpl = {};
//////// 画面生成時に初回実行する処理 ////////

var proxy = new Db_Access(new callback());
var filter_on = false;

window.onload = function(){
    var filter1AreaWrap = 'Filter1_Nakami';
    pageType = document.getElementById('pageType').innerHTML;
    privilege = parseInt(document.getElementById('privilege').innerHTML);
    initialFilterEl = document.getElementById('sysInitialFilter');
    if(initialFilterEl == null){
        initialFilter = 2;
    }
    else{
        initialFilter = initialFilterEl.innerHTML;
    }
    webPrintRowConfirm = parseInt(document.getElementById('sysWebRowConfirm').innerHTML);
    webPrintRowLimit = parseInt(document.getElementById('sysWebRowLimit').innerHTML);
    webStdTableWidth = document.getElementById('webStdTableWidth').innerHTML;
    webStdTableHeight = document.getElementById('webStdTableHeight').innerHTML;
    // しばらくお待ち下さいを出す
    var objTableArea = $('#'+filter1AreaWrap+' .table_area').get()[0];
    objTableArea.innerHTML = "<div class=\"wait_msg\" >"+getSomeMessage("ITAWDCC10102")+"</div>";

    proxy.Filter1Tbl_reload(0);
// ----サイト個別、事前処理

// サイト個別、事前処理----

    // テーブル表示用領域に初期メッセ時を表示しておく
    //----※ここに一覧が表示されます。
    document.getElementById('table_area').innerHTML = getSomeMessage("ITAWDCC10101");

    if(privilege != 2){
        // 登録の初期HTMLを表示する
        show('Mix2_Midashi' ,'Mix2_Nakami'  );
        Mix2_1_register_async(0);
    }

// ----サイト個別、事前処理
// サイト個別、事前処理----


    show('SetsumeiMidashi'      ,'SetsumeiNakami'       );
    show('Mix1_Midashi'         ,'Mix1_Nakami'          );
    show('AllDumpMidashi'       ,'AllDumpNakami'        );
    show('Journal1_Midashi'     ,'Journal1_Nakami'      );

// ----サイト個別メニュー、ここから
// サイト個別メニュー、ここまで----

}

//////// コールバックファンクション---- ////////

//////// ----セレクトタグ追加ファンクション ////////
function Filter1Tbl_add_selectbox( show_seq ){
    proxy.Filter1Tbl_add_selectbox(show_seq);
}
//////// セレクトタグ追加ファンクション---- ////////

//////// ----表示フィルタリセット用ファンクション ////////
function Filter1Tbl_reset_filter(boolBack){
    // 検索条件をクリア(リセット)
    var filterAreaWrap = 'Filter1_Nakami';
    var strMixOuterFrameName = 'Mix1_Nakami';
    if( boolBack===true ){
        var objHyoujiFlag = $('#'+strMixOuterFrameName+' .hyouji_flag').get()[0];
        if( objHyoujiFlag != null ){
            // すでに一覧が表示されている場合（オートフィルタがonの場合、一覧を最新化する）
            var objFCSL = $('#'+filterAreaWrap+' .filter_ctl_start_limit').get()[0];
            if( objFCSL == null){
            }else{
                if( objFCSL.value == 'on' && objFCSL.checked == true ){
                    // タグが存在し、オートフィルタにチェックが入っている
                    //----再表示しますか？
                    if( window.confirm( getSomeMessage("ITAWDCC20204")) ){
                        Filter1Tbl_search_async();
                    }
                }
            }
        }
    }else{
        proxy.Filter1Tbl_reload(1);
    }
}
//////// 表示フィルタリセット用ファンクション---- ////////

//////// ----Filter1Tbl_search_asyncを呼ぶかどうか判断するファンクション ////////
function Filter1Tbl_pre_search_async(inputedCode){

    // ----Enterキーが押された場合
    if( inputedCode == 13 ){
        Filter1Tbl_search_async('keyInput13');
    }
    // Enterキーが押された場合----
}
//////// Filter1Tbl_search_asyncを呼ぶかどうか判断するファンクション---- ////////

//////// ----フィルタ結果表示呼出ファンクション[1] ////////
function Filter1Tbl_search_async( value1 ){

    var filterAreaWrap = 'Filter1_Nakami';
    var printAreaWrap = 'Mix1_Nakami';
    var printAreaHead = 'Mix1_Midashi';

    var exec_flag = true;

    // 引数を準備
    var filter_data = $("#"+filterAreaWrap+" :input").serializeArray();

    exec_flag = Filter1Tbl_search_control(exec_flag, value1);
    var objUpdTag = $('#'+printAreaWrap+' .editing_flag').get()[0];
    if ( objUpdTag != null ){
        // 更新系(更新/廃止/復活)モード中の場合はSELECTモードに戻っていいか尋ねる
        if( exec_flag == true ){
            //----メンテナンス中ですが中断してよろしいですか？
            if( !window.confirm( getSomeMessage("ITAWDCC20203") ) ){
                exec_flag = false;
            }
        }
    }

    if( exec_flag ){
        // 更新時アラート出力エリアをブランクにしたうえ非表示にする
        var objAlertArea=$('#'+printAreaWrap+' .alert_area').get()[0];
        objAlertArea.innerHTML = "";
        objAlertArea.style.display = "none";

        // テーブル表示用領域を一旦クリアする
        var objTableArea=$('#'+printAreaWrap+' .table_area').get()[0];
        //----※ここに一覧が表示されます。
        objTableArea.innerHTML = "";

        // テーブル表示用領域を開く
        if( checkOpenNow(printAreaWrap)===false ){
            show(printAreaHead, printAreaWrap);
        }

        // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
        restruct_for_IE();

        // proxy.Filter1Tbl_recCount実行
        proxy.Filter1Tbl_recCount(filter_data);
    }
}
//////// フィルタ結果表示呼出ファンクション[1]---- ////////

//////// ----フィルタ結果表示呼出ファンクション[2] ////////
function Filter1Tbl_search_control( exec_flag_var, value1 ){
    var filterAreaWrap = 'Filter1_Nakami';

    var exec_flag_ret = true;

    if( typeof(value1) == 'undefined' ){
        // value1がundefined型の場合
        exec_flag_ret = exec_flag_var;
    }else{
        if( exec_flag_var == false ){
            exec_flag_ret = false;
        }else{
            var objFCSL = $('#'+filterAreaWrap+' .filter_ctl_start_limit').get()[0];

            if(objFCSL == null){
                // 自動開始制御タグがない場合は、システムエラー扱い、とする。
                // システムエラーが発生しました。
                alert( getSomeMessage("ITAWDCC20205") );
                exit;
            }else{
                if( objFCSL.value == 'on' ){
                    // 自動開始制御タグが存在し、オートフィルタ開始の抑制が働いている可能性がある
                    exec_flag_ret = false;
                    if( value1 == 'orderFromFilterCmdBtn' ){
                        // フィルタボタンが押された場合、条件「なし」で開始----
                        exec_flag_ret = true;
                    }else if( value1 == 'idcolumn_filter_default' || value1 == 'keyInput13' ){
                        if( objFCSL.checked == true ){
                            // 自動開始制御タグが存在し、オートフィルタにチェックが入っている
                            exec_flag_ret = true;
                        }
                    }else{
                        exec_flag_ret = true;
                    }
                }
            }
        }
    }
    return exec_flag_ret;
}
//////// フィルタ結果表示呼出ファンクション[2]---- ////////

//////// ----検索条件指定用ファンクション ////////
function Filter1Tbl_print_async( intPrintMode ){

    var filterAreaWrap = 'Filter1_Nakami';
    var printAreaWrap = 'Mix1_Nakami';
    var printAreaHead = 'Mix1_Midashi';

    var filter_data=$('#'+filterAreaWrap+' :input').serializeArray();

    // テーブル表示用領域を開く
    if( checkOpenNow(printAreaWrap)===false ){
        show(printAreaHead, printAreaWrap);
    }

    // しばらくお待ち下さいを出す
    var objTableArea = $('#'+printAreaWrap+' .table_area').get()[0];
    objTableArea.innerHTML = "<div class=\"wait_msg\" >"+getSomeMessage("ITAWDCC10102")+"</div>";

    // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
    restruct_for_IE();

    // proxy.Filter1Tbl_printTable実行
    proxy.Filter1Tbl_printTable(intPrintMode, filter_data);
}
//////// 検索条件指定用ファンクション---- ////////

//////// ----登録初期画面に戻るかどうか判定するファンクション ////////
function Mix2_1_pre_register_async( mode ){

    //----登録中ですが中断してよろしいですか？
    if( window.confirm( getSomeMessage("ITAWDCC20202")) ){
        Mix2_1_register_async(0);
    }

}
//////// 登録初期画面に戻るかどうか判定するファンクション---- ////////

//////// ----登録画面遷移用ファンクション ////////
function Mix2_1_register_async( mode ){

    var registerAreaWrap = 'Mix2_Nakami';

    // アラート用エリアを初期化
    var objAlertArea = $('#'+registerAreaWrap+' .alert_area').get()[0];
    objAlertArea.innerHTML = '';
    objAlertArea.style.display = "none";

    // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
    restruct_for_IE();

    // アラートメッセージ格納変数を初期化
    var alt_str = '';

    // registerTableファンクション呼び出し要否フラグ
    var exec_flag = true;

    // モードによって動きを決定
    switch( mode ){
        case 0 :
            // 初期画面(mode=0)
            // 引数準備必要なし
            break;
        case 1 :
            // 登録フォーム画面(mode=1)
            // 引数準備必要なし
            break;
        case 2 :
            // 登録実行処理＆結果画面(mode=2)
            // 登録時のチェック
            //----登録を実行してよろしいですか？
            if( window.confirm(getSomeMessage("ITAWDCC20101")) == false ){
                exec_flag = false;
            }else{
                setInputButtonDisable(registerAreaWrap,'disableAfterPush',true);
            }
            break;
    }

    if( exec_flag ){
        // proxy.registerTable実行
        var registerData = $('#'+registerAreaWrap+' :input').serializeArray();

        proxy.Mix2_1_registerTable(mode, registerData);
    }
}
//////// 登録画面遷移用ファンクション---- ////////

//////// ----更新画面遷移用ファンクション ////////
function Mix1_1_update_async( mode, inner_seq, updateAreaName ){

    var updateAreaWrap = 'Mix1_Nakami';

    // アラートメッセージ格納変数を初期化
    var alt_str = '';
    // updateTableファンクション呼び出し要否フラグ
    var exec_flag = true;
    // モードによって動きを決定

    switch( mode ){
        case 1 :
            // 更新画面に遷移(mode=1)
            // アラート用エリアを初期化
            var objAlertArea = $('#'+updateAreaWrap+' .alert_area').get()[0];
            objAlertArea.innerHTML = '';
            objAlertArea.style.display = "none";

            // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
            restruct_for_IE();

            break;
        case 2 :
            // 更新画面から一覧に戻る(mode=2)
            // 呼び出し要否フラグをOFF
            exec_flag = false;

            // Filter1Tbl_search_asyncを呼び出し
            Filter1Tbl_search_async();

            break;
        case 3 :
            // 更新画面で実行を押下(mode=3)
            //----更新を実行してよろしいですか？
            if( window.confirm( getSomeMessage("ITAWDCC20102") ) ){
                // アラート用エリアを初期化
                var objAlertArea = $('#'+updateAreaWrap+' .alert_area').get()[0];
                objAlertArea.innerHTML = '';
                objAlertArea.style.display = "none";
                setInputButtonDisable(updateAreaWrap,'disableAfterPush',true);
                // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
                restruct_for_IE();
            }else{
                exec_flag = false;
            }
            break;
    }

    if(exec_flag){
        var updateData = $('#'+updateAreaWrap+' :input').serializeArray();
        //proxy.updateTable実行
        proxy.Mix1_1_updateTable( mode, inner_seq, updateData);
    }
}
//////// 更新画面遷移用ファンクション---- ////////

//////// ----削除画面遷移用ファンクション ////////
function Mix1_1_delete_async( mode, inner_seq ){
    //alert('wake-fx(Mix1_1_delete_async)');

    var deleteAreaWrap = 'Mix1_Nakami';

    // アラートメッセージ格納変数を初期化
    var alt_str = '';

    // deleteTableファンクション呼び出し要否フラグ
    var exec_flag = true;

    // モードによって動きを決定
    switch( mode ){
        case 1 :
            // 廃止画面に遷移(mode=1)
            // アラート用エリアを初期化
            var objAlertArea = $('#'+deleteAreaWrap+' .alert_area').get()[0];
            objAlertArea.innerHTML = '';
            objAlertArea.style.display = "none";

            // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
            restruct_for_IE();

            break;
        case 2 :
            // 廃止画面から一覧に戻る(mode=2)
            // 呼び出し要否フラグをOFF
            exec_flag = false;

            // Filter1Tbl_search_asyncを呼び出し
            Filter1Tbl_search_async();

            break;
        case 3 :
            // 廃止画面で実行を押下(mode=3)
            //----廃止してよろしいですか？
            if( window.confirm( getSomeMessage("ITAWDCC20103") ) ){
                // アラート用エリアを初期化
                var objAlertArea = $('#'+deleteAreaWrap+' .alert_area').get()[0];
                objAlertArea.innerHTML = '';
                objAlertArea.style.display = "none";
                setInputButtonDisable(deleteAreaWrap,'disableAfterPush',true);
                // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
                restruct_for_IE();

            }else{
                exec_flag = false;
            }

            break;
        case 4 :
            // 復活画面に遷移(mode=4)
            // アラート用エリアを初期化
            var objAlertArea = $('#'+deleteAreaWrap+' .alert_area').get()[0];
            objAlertArea.innerHTML = '';
            objAlertArea.style.display = "none";

            // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
            restruct_for_IE();

            break;
        case 5 :
            // 復活画面で実行を押下(mode=5)
            //----復活してよろしいですか？
            if( window.confirm( getSomeMessage("ITAWDCC20104") ) ){
                // アラート用エリアを初期化
                var objAlertArea = $('#'+deleteAreaWrap+' .alert_area').get()[0];
                objAlertArea.innerHTML = '';
                objAlertArea.style.display = "none";
                setInputButtonDisable(deleteAreaWrap,'disableAfterPush',true);

                // IEのときだけ全見開きを開閉して画面を再構築するファンクションを呼び出し
                restruct_for_IE();

            }else{
                exec_flag = false;
            }
            break;
    }

    if(exec_flag){
        var updateData = $('#'+deleteAreaWrap+' :input').serializeArray();
        // proxy.deleteTable実行
        proxy.Mix1_1_deleteTable(mode, inner_seq, updateData);
    }
}
//////// 削除画面遷移用ファンクション---- ////////

//////// ----履歴検索条件クリア(リセット)用ファンクション ////////
function Journal1Tbl_reset_query(){
    var journal1AreaWrap = 'Journal1_Nakami';
    // 検索条件をクリア(リセット)
    $('#'+journal1AreaWrap+' :input:not(:button)').each(function(){this.value=""});
}
//////// 履歴検索条件クリア(リセット)用ファンクション---- ////////

//////// ----search_journal_asyncを呼ぶかどうか判断するファンクション ////////
function Journal1Tbl_pre_search_async(inputedCode){
    if( inputedCode == 13 ){
        Journal1Tbl_search_async();
    }
}
//////// search_journal_asyncを呼ぶかどうか判断するファンクション---- ////////

//////// ----履歴検索条件指定用ファンクション ////////
function Journal1Tbl_search_async(){
    // 履歴検索実施フラグを初期化
    var journal1AreaWrap = 'Journal1_Nakami';
    
    var exec_flag = true;

    // 検索実施フラグがtrueの場合は検索実施
    if( exec_flag == true ){
        // しばらくお待ち下さいを出す
        var objTableArea = $('#'+journal1AreaWrap+' .table_area').get()[0];
        objTableArea.innerHTML = "<div class=\"wait_msg2\" >"+getSomeMessage("ITAWDCC10102")+"</div>";

        var filterData = $('#'+journal1AreaWrap+' :input:not(:button)').serializeArray();
        proxy.Journal1Tbl_printJournal(filterData);
    }
}
//////// 履歴検索条件指定用ファンクション---- ////////

//////// ----汎用系ファンクション ////////
function setInputButtonDisable(rangeId,targetClass,toValue){
    if(toValue === true){
        $('#'+rangeId+' .'+targetClass).attr("disabled",true);
    }else{
        $('#'+rangeId+' .'+targetClass).removeAttr("disabled");
    }
}
//////// 汎用系ファンクション---- ////////

//---- ここからカスタマイズした場合の一般メソッド配置域
//////// ----更新画面表示時のパラメータセット ////////
function setUpdateParam(){
    var tableArea = $('#table_area');
    var scheduleRegularlyPeriod = tableArea.find('input[data-sch="scheduleRegularlyPeriod"]');
    var scheduleRegularlyPeriodValue = scheduleRegularlyPeriod.val();
    var schedulePatternWeekNumber = tableArea.find('input[data-sch="schedulePatternWeekNumber"]');
    var schedulePatternWeekNumberValue = schedulePatternWeekNumber.val();
    var schedulePatternDayOfWeek = tableArea.find('input[data-sch="schedulePatternDayOfWeek"]');
    var schedulePatternDayOfWeekValue = schedulePatternDayOfWeek.val();

    //周期のIDとNAME
    $periodList = {
        1 : getSomeMessage("ITAWDCC91001"), //時
        2 : getSomeMessage("ITAWDCC91002"), //日
        3 : getSomeMessage("ITAWDCC91003"), //週
        4 : getSomeMessage("ITAWDCC91004"), //月(日付指定)
        5 : getSomeMessage("ITAWDCC91005"), //月(曜日指定)
        6 : getSomeMessage("ITAWDCC91006"), //月末
    }

    //週番号のIDとNAME
    $weekNumberList = {
        1 : getSomeMessage("ITAWDCC91007"), //第一
        2 : getSomeMessage("ITAWDCC91008"), //第二
        3 : getSomeMessage("ITAWDCC91009"), //第三
        4 : getSomeMessage("ITAWDCC91010"), //第四
        5 : getSomeMessage("ITAWDCC91011"), //最終
    };

    //曜日のIDとNAME
    $dayOfWeekList = {
        1 : getSomeMessage("ITAWDCC91012"), //日曜日
        2 : getSomeMessage("ITAWDCC91013"), //月曜日
        3 : getSomeMessage("ITAWDCC91014"), //火曜日
        4 : getSomeMessage("ITAWDCC91015"), //水曜日
        5 : getSomeMessage("ITAWDCC91016"), //木曜日
        6 : getSomeMessage("ITAWDCC91017"), //金曜日
        7 : getSomeMessage("ITAWDCC91018"), //土曜日
    };

    //ID管理しているカラム(周期/週番号/曜日)について、表示される値をIDからNAMEに変換する
    if(scheduleRegularlyPeriodValue){
        scheduleRegularlyPeriod.parent().html($periodList[scheduleRegularlyPeriodValue]+scheduleRegularlyPeriod.prop('outerHTML'));
    }
    if(schedulePatternWeekNumberValue){
        schedulePatternWeekNumber.parent().html($weekNumberList[schedulePatternWeekNumberValue]+schedulePatternWeekNumber.prop('outerHTML'));
    }
    if(schedulePatternDayOfWeekValue){
        schedulePatternDayOfWeek.parent().html($dayOfWeekList[schedulePatternDayOfWeekValue]+schedulePatternDayOfWeek.prop('outerHTML'));
    }

}
//////// 更新画面表示時のパラメータセット---- ////////

//////// ----モーダルによるスケジュールセット ////////
function Mix1_1_setSchedule(){
    setSchedule('table_area');
}

function Mix2_1_setSchedule(){
    setSchedule('register_area');
}

function setSchedule(target_area_id){
    //変数を定義
    var editArea = $('#editArea');
    var checkedPeriodId = '';
    var checkedPeriodText = '';
    var startDateValue = '';
    var endDateValue = '';
    var executionStopStartDateValue = '';
    var executionStopEndDateValue = '';
    var executionIntervalValue = '';
    var patternTimeValue = '';
    var patternDayValue = '';
    var patternDayOfWeekId = '';
    var patternDayOfWeekText = '';
    var patternWeekNumberId = '';
    var patternWeekNumberText = '';
    var inputPatternTimeValue = '';
    var inputPatternDayValue = '';
    var selectedPatternDayOfWeek;
    var selectedPatternDayOfWeekId = '';
    var selectedPatternDayOfWeekText = '';
    var selectedPatternWeekNumber;
    var selectedPatternWeekNumberId = '';
    var selectedPatternWeekNumberText = '';
    var noteValue = '';
    var requiredList = Array();

    //バリデーションチェック用変数
    var ckRequired;
    var ckValStartDate;
    var ckValEndDate;
    var ckCompareDate;
    var ckValExeStopStartDate;
    var ckValExeStopEndDate;
    var ckBothExeStopDate;
    var ckCompareExeStopDate;
    var ckValInterval;
    var ckWeekNumber;
    var ckDayOfWeek;
    var ckValDay;
    var ckValTime;

    //対象エリアの入力欄
    var targetArea = $('#'+target_area_id);
    var scheduleStartDate = targetArea.find('input[data-sch="scheduleStartDate"]');
    var scheduleEndDate = targetArea.find('input[data-sch="scheduleEndDate"]');
    var scheduleExecutionStopStartDate = targetArea.find('input[data-sch="scheduleExecutionStopStartDate"]');
    var scheduleExecutionStopEndDate = targetArea.find('input[data-sch="scheduleExecutionStopEndDate"]');
    var scheduleRegularlyPeriod = targetArea.find('input[data-sch="scheduleRegularlyPeriod"]');
    var scheduleExecutionInterval = targetArea.find('input[data-sch="scheduleExecutionInterval"]');
    var schedulePatternWeekNumber = targetArea.find('input[data-sch="schedulePatternWeekNumber"]');
    var schedulePatternDayOfWeek = targetArea.find('input[data-sch="schedulePatternDayOfWeek"]');
    var schedulePatternDay = targetArea.find('input[data-sch="schedulePatternDay"]');
    var schedulePatternTime = targetArea.find('input[data-sch="schedulePatternTime"]');
    var inputNote = targetArea.find('textarea[data-sch="dataNote"]');

    //モーダル処理
    editArea.dialog({
        width:680,
        modal:true,
        draggable:true,
        resizable: false,
        open: function(){
            //自動フォーカスを外す
            document.activeElement.blur();

            //日付と時間選択箇所にdatetimepickerを設定
            editArea.find(".callDateTimePicker").datetimepicker({});
            editArea.find(".callDateTimePicker2").datetimepicker({datepicker:false, format:'H:i'});

            //モーダルを開いたときの周期選択設定
            currentRegulalyPeriodId = scheduleRegularlyPeriod.val();
            if(currentRegulalyPeriodId){
                editAreaSwitch(currentRegulalyPeriodId);
            }else{
                editAreaSwitch(1);
            }
            //デフォルト値をセット
            editArea.find('input[name="startDate"]').val(scheduleStartDate.val());
            editArea.find('input[name="endDate"]').val(scheduleEndDate.val());
            editArea.find('input[name="executionInterval"]').val(scheduleExecutionInterval.val());
            editArea.find('input[name="patternDay"]').val(schedulePatternDay.val());
            editArea.find('input[name="patternTime"]').val(schedulePatternTime.val().substr(0,5));
            editArea.find('input[name="exeStopStartDate"]').val(scheduleExecutionStopStartDate.val());
            editArea.find('input[name="exeStopEndDate"]').val(scheduleExecutionStopEndDate.val());
            editArea.find('textarea[name="note"]').val(inputNote.val());

            if(schedulePatternWeekNumber.val()){
                editArea.find('select[name="patternWeekNumber"]').val(schedulePatternWeekNumber.val());
            }else{
                editArea.find('select[name="patternWeekNumber"]').val(1);
            }
            if(schedulePatternDayOfWeek.val()){
                editArea.find('select[name="patternDayOfWeek"]').val(schedulePatternDayOfWeek.val());
            }else{
                editArea.find('select[name="patternDayOfWeek"]').val(1);
            }


            //周期選択時のイベント
            editArea.find('input[name="period"]').on("change",function(){
                 editAreaSwitch($(this).val());
            });
        },
        buttons:[
        {
            //決定ボタン押下時
            text:getSomeMessage("ITAWDCC91019"), //決定
            click:function(){
                //入力値を取得
                setInputValue();

                //入力値のバリデーションチェック
                checkInputValue();

                //必須項目及びバリデーションがすべてtrueなら登録の入力欄へのセット処理
                if(ckRequired && ckValStartDate && ckValEndDate && ckCompareDate && ckValExeStopStartDate && ckValExeStopEndDate && ckBothExeStopDate && ckCompareExeStopDate && ckValInterval && ckWeekNumber && ckDayOfWeek && ckValDay && ckValTime){
                    //登録の入力欄に値をセット
                    scheduleStartDate.val(startDateValue);
                    scheduleStartDate.parent().html(startDateValue+scheduleStartDate.prop('outerHTML'));
                    scheduleEndDate.val(endDateValue);
                    scheduleEndDate.parent().html(endDateValue+scheduleEndDate.prop('outerHTML'));
                    scheduleExecutionStopStartDate.val(executionStopStartDateValue);
                    scheduleExecutionStopStartDate.parent().html(executionStopStartDateValue+scheduleExecutionStopStartDate.prop('outerHTML'));
                    scheduleExecutionStopEndDate.val(executionStopEndDateValue);
                    scheduleExecutionStopEndDate.parent().html(executionStopEndDateValue+scheduleExecutionStopEndDate.prop('outerHTML'));
                    scheduleRegularlyPeriod.val(checkedPeriodId);
                    scheduleRegularlyPeriod.parent().html(checkedPeriodText+scheduleRegularlyPeriod.prop('outerHTML'));
                    scheduleExecutionInterval.val(executionIntervalValue);
                    scheduleExecutionInterval.parent().html(executionIntervalValue+scheduleExecutionInterval.prop('outerHTML'));
                    schedulePatternTime.val(patternTimeValue);
                    schedulePatternTime.parent().html(patternTimeValue+schedulePatternTime.prop('outerHTML'));
                    schedulePatternDay.val(patternDayValue);
                    schedulePatternDay.parent().html(patternDayValue+schedulePatternDay.prop('outerHTML'));
                    schedulePatternWeekNumber.val(patternWeekNumberId);
                    schedulePatternWeekNumber.parent().html(patternWeekNumberText+schedulePatternWeekNumber.prop('outerHTML'));
                    schedulePatternDayOfWeek.val(patternDayOfWeekId);
                    schedulePatternDayOfWeek.parent().html(patternDayOfWeekText+schedulePatternDayOfWeek.prop('outerHTML'));

                    //備考をセット
                    inputNote.val(noteValue);

                    //エラーメッセージを非表示
                    editArea.find('.errorMessage').hide();

                    //イベント解除
                    editArea.find('input[name="period"]').off("change");

                    //モーダルを閉じる
                    $(this).dialog("close");
                }else{
                    //エラーメッセージの表示非表示
                    (!ckRequired) ? $('#requiredMessage').show() : $('#requiredMessage').hide();
                    (!ckValStartDate) ? $('#startDateError').show() : $('#startDateError').hide();
                    (!ckValEndDate) ? $('#endDateError').show() : $('#endDateError').hide();
                    (!ckCompareDate) ? $('#compareDateError').show() : $('#compareDateError').hide();
                    (!ckValExeStopStartDate) ? $('#exeStopStartDateError').show() : $('#exeStopStartDateError').hide();
                    (!ckValExeStopEndDate) ? $('#exeStopEndDateError').show() : $('#exeStopEndDateError').hide();
                    (!ckBothExeStopDate) ? $('#bothExeStopDateError').show() : $('#bothExeStopDateError').hide();
                    (!ckCompareExeStopDate) ? $('#compareExeStopDateError').show() : $('#compareExeStopDateError').hide();
                    (!ckValInterval) ? $('#intervalError').show() : $('#intervalError').hide();
                    (!ckWeekNumber) ? $('#weekNumberError').show() : $('#weekNumberError').hide();
                    (!ckDayOfWeek) ? $('#dayOfWeekError').show() : $('#dayOfWeekError').hide();
                    (!ckValDay) ? $('#dayError').show() : $('#dayError').hide();
                    (!ckValTime) ? $('#timeError').show() : $('#timeError').hide();
                }
            }
        },
        {
            //閉じるボタン押下時
            text:getSomeMessage("ITAWDCC91020"), //閉じる
            click:function(){
                //イベント解除
                editArea.find('input[name="period"]').off("change");

                //モーダルを閉じる
                $(this).dialog("close");
            }
        },
        ]
    }).addClass('flex-container');

    //周期ごとの表示切替用関数
    function editAreaSwitch(checkedPeriodId){
        //ラジオボタンの選択しなおし
        editArea.find('input[name="period"]').prop('checked', false);
        editArea.find('.scheduleSelectArea').find('input[value='+checkedPeriodId+']').prop('checked', true);

        //値のリセット
        editArea.find('input[name="executionInterval"]').val('');
        editArea.find('input[name="patternTime"]').val('');
        editArea.find('select[name="patternDayOfWeek"]').val(1);
        editArea.find('select[name="patternWeekNumber"]').val(1);

        //入力項目のみをオープン
        if(checkedPeriodId == 1){
            //時
            editArea.find('.interval_str').html(getSomeMessage("ITAWDCC91021")); //時間ごと
            editArea.find('.patternWeekNumber').hide();
            editArea.find('.patternDayOfWeek').hide();
            editArea.find('.patternDayOfWeekHead').hide();
            editArea.find('.patternDay').hide();
            editArea.find('.patternTime').hide();
            requiredList = Array();
        }else if(checkedPeriodId == 2){
            //日
            editArea.find('.interval_str').html(getSomeMessage("ITAWDCC91022")); //日ごと
            editArea.find('.patternWeekNumber').hide();
            editArea.find('.patternDayOfWeek').hide();
            editArea.find('.patternDayOfWeekHead').hide();
            editArea.find('.patternDay').hide();
            editArea.find('.patternTime').show();
            requiredList = Array('time');
        }else if(checkedPeriodId == 3){
            //週
            editArea.find('.interval_str').html(getSomeMessage("ITAWDCC91023")); //週ごと
            editArea.find('.patternWeekNumber').hide();
            editArea.find('.patternDayOfWeek').show();
            editArea.find('.patternDayOfWeekHead').show();
            editArea.find('.patternDay').hide();
            editArea.find('.patternTime').show();
            requiredList = Array('dayOfWeek', 'time');
        }else if(checkedPeriodId == 4){
            //月(日付指定)
            editArea.find('.interval_str').html(getSomeMessage("ITAWDCC91024")); //か月ごと
            editArea.find('.patternWeekNumber').hide();
            editArea.find('.patternDayOfWeek').hide();
            editArea.find('.patternDayOfWeekHead').hide();
            editArea.find('.patternDay').show();
            editArea.find('.patternTime').show();
            requiredList = Array('day', 'time');
        }else if(checkedPeriodId == 5){
            //月(曜日指定)
            editArea.find('.interval_str').html(getSomeMessage("ITAWDCC91024")); //か月ごと
            editArea.find('.patternWeekNumber').show();
            editArea.find('.patternDayOfWeek').show();
            editArea.find('.patternDayOfWeekHead').show();
            editArea.find('.patternDay').hide();
            editArea.find('.patternTime').show();
            requiredList = Array('weekNumber', 'dayOfWeek', 'time');
        }else if(checkedPeriodId == 6){
            //月末
            editArea.find('.interval_str').html(getSomeMessage("ITAWDCC91024")); //か月ごと
            editArea.find('.patternWeekNumber').hide();
            editArea.find('.patternDayOfWeek').hide();
            editArea.find('.patternDayOfWeekHead').hide();
            editArea.find('.patternDay').hide();
            editArea.find('.patternTime').show();
            requiredList = Array('time');
        }
    }

    //最新の入力値を変数にセットする
    function setInputValue(){
        checkedPeriod = editArea.find('input[name="period"]:checked');
        checkedPeriodId = checkedPeriod.val();
        checkedPeriodText = checkedPeriod.attr('title');
        startDateValue = editArea.find('input[name="startDate"]').val();
        endDateValue = editArea.find('input[name="endDate"]').val();
        executionStopStartDateValue = editArea.find('input[name="exeStopStartDate"]').val();
        executionStopEndDateValue = editArea.find('input[name="exeStopEndDate"]').val();
        executionIntervalValue = editArea.find('input[name="executionInterval"]').val();
        inputPatternTimeValue = editArea.find('input[name="patternTime"]').val();
        inputPatternDayValue = editArea.find('input[name="patternDay"]').val();
        selectedPatternWeekNumber = editArea.find('select[name="patternWeekNumber"] option:selected');
        selectedPatternWeekNumberId = selectedPatternWeekNumber.val();
        selectedPatternWeekNumberText = selectedPatternWeekNumber.attr('title');
        selectedPatternDayOfWeek = editArea.find('select[name="patternDayOfWeek"] option:selected');
        selectedPatternDayOfWeekId = selectedPatternDayOfWeek.val();
        selectedPatternDayOfWeekText = selectedPatternDayOfWeek.attr('title');
        noteValue = editArea.find('textarea').val();

        //周期を基準に必要な値を選択
        patternTimeValue = (checkedPeriodId != 1) ? inputPatternTimeValue : ''; //周期1(時)以外の場合のみ値を入れる
        patternDayValue = (checkedPeriodId == 4) ? inputPatternDayValue : ''; //周期4(月(日付指定))の場合のみ値を入れる
        patternWeekNumberId = (selectedPatternWeekNumberId && checkedPeriodId == 5) ? selectedPatternWeekNumberId : '';//5(月(曜日指定))の場合のみ値を入れる
        patternWeekNumberText = (selectedPatternWeekNumberText && checkedPeriodId == 5) ? selectedPatternWeekNumberText : '';//5(月(曜日指定))の場合のみ値を入れる
        patternDayOfWeekId = (selectedPatternDayOfWeekId && (checkedPeriodId == 3 || checkedPeriodId == 5)) ? selectedPatternDayOfWeekId : ''; //周期3(週)と5(月(曜日指定))の場合のみ値を入れる
        patternDayOfWeekText = (selectedPatternDayOfWeekText && (checkedPeriodId == 3 || checkedPeriodId == 5)) ? selectedPatternDayOfWeekText : ''; //周期3(週)と5(月(曜日指定))の場合のみ値を入れる
    }

    //入力値のバリデーションをチェックする
    function checkInputValue(){
        //バリデーションチェック変数
        ckRequired = true;
        ckValStartDate = true;
        ckValEndDate = true;
        ckCompareDate = true;
        ckValExeStopStartDate = true;
        ckValExeStopEndDate = true;
        ckCompareExeStopDate = true;
        ckBothExeStopDate = true;
        ckValInterval = true;
        ckWeekNumber = true;
        ckDayOfWeek = true;
        ckValDay = true;
        ckValTime = true;

        //日付バリデーションチェック用関数
        var dateValidationCheck = function(dateValue, chValName, required){
            var dateValidationRule = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/;
            if(dateValidationRule.test(dateValue)){
                //日付と時間の妥当性をチェック
                var cD = ckDate(dateValue.substr(0, 10));
                var cT = ckTime(dateValue.substr(11, 5), 2);
                if(!cD || !cT){
                    if(chValName == 'ckValStartDate'){
                        ckValStartDate = false;
                    }else if(chValName == 'ckValEndDate'){
                        ckValEndDate = false;
                    }else if(chValName == 'ckValExeStopStartDate'){
                        ckValExeStopStartDate = false;
                    }else if(chValName == 'ckValExeStopEndDate'){
                        ckValExeStopEndDate = false;
                    }
                }
            }else{
                if(required){
                    ckRequired = false;
                }
            }
        }

        //「開始日付」のチェック
        dateValidationCheck(startDateValue, 'ckValStartDate', true);

        //「終了日付」のチェック
        dateValidationCheck(endDateValue, 'ckValEndDate', false);

        //「開始日付＜終了日付」になっているかのチェック
        if((ckValStartDate && ckValEndDate) && (startDateValue != '' && endDateValue != '')){
            if(Date.parse(startDateValue) > Date.parse(endDateValue)){
                ckCompareDate = false;
            }
        }

        //「実行停止開始日付」のチェック
        dateValidationCheck(executionStopStartDateValue, 'ckValExeStopStartDate', false);

        //「実行停止終了日付」のチェック
        dateValidationCheck(executionStopEndDateValue, 'ckValExeStopEndDate', false);

        //実行停止日付が両方入力されているかのチェック
        if((executionStopStartDateValue != '' || executionStopEndDateValue != '') && (executionStopStartDateValue == '' || executionStopEndDateValue == '')){
            ckBothExeStopDate = false;
        }

        //実行停止日付が「開始＜終了」になっているかのチェック
        if((ckValExeStopStartDate && ckValExeStopEndDate && ckBothExeStopDate) && (executionStopStartDateValue != '' && executionStopEndDateValue != '')){
            if(Date.parse(executionStopStartDateValue) > Date.parse(executionStopEndDateValue)){
                ckCompareExeStopDate = false;
            }
        }

        //「間隔」のチェック
        var intarvalValidationRule = /^[1-9]\d*$/;
        if(executionIntervalValue){
            if(!intarvalValidationRule.test(executionIntervalValue)){
                ckValInterval = false;
            }
        }else{
            ckRequired = false;
        }

        //「週番号」のチェック(選択の必須のみ)
        if(requiredList.indexOf('weekNumber') >= 0){
            var weekNumberValidationRule = /^[1-9]\d*$/;
            if(!weekNumberValidationRule.test(patternWeekNumberId) || patternWeekNumberId < 1 || 5 < patternWeekNumberId){
                ckWeekNumber = false;
            }
        }

        //「曜日」のチェック(選択の必須のみ)
        if(requiredList.indexOf('dayOfWeek') >= 0){
            var dayOfWeeekValidationRule = /^[1-9]\d*$/;
            if(!dayOfWeeekValidationRule.test(patternDayOfWeekId) || patternDayOfWeekId < 1 || 7 < patternDayOfWeekId){
                ckDayOfWeek = false;
            }
        }

        //「日」のチェック
        if(requiredList.indexOf('day') >= 0){
            if(patternDayValue){
                var dayValidationRule = /^[1-9]$|^[1-2][0-9]$|^3[0-1]$/;
                if(!dayValidationRule.test(patternDayValue)){
                    ckValDay = false;
                }
            }else{
                ckRequired = false;
            }
        }

        //「時間」のチェック
        if(requiredList.indexOf('time') >= 0){
            if(patternTimeValue){
                if(!ckTime(patternTimeValue, 2)){
                    ckValTime = false;
                }
            }else{
                ckRequired = false;
            }
        }
    }
}
//////// モーダルによるスケジュールセット---- ////////

//////// ----Symphony作業一覧へのリンク ////////
function Mix1_1_jumpToSymphonyIntList(obj){
    var targetRecort = $(obj).parents('tr');
    var strSymphonyName = targetRecort.find('td').eq(4).html(); //symphony名称
    var strOperationName = targetRecort.find('td').eq(5).html(); //オペレーション名

    //実行ユーザ名を取得
    var strUserName = getSomeMessage("ITAWDCC91025"); //定期実行管理プロシージャ

    //エンコード
    strSymphonyName = encodeURIComponent(strSymphonyName);
    strOperationName = encodeURIComponent(strOperationName);
    strUserName = encodeURIComponent(strUserName);

    // 遷移先URLを作成
    var url = '/default/menu/01_browse.php?no=2100000310'+'&symphony_name='+strSymphonyName+'&operation_name='+strOperationName+'&user_name='+strUserName;

    // 作業状態確認メニューに遷移
    open( url, "_blank");

}
//////// Symphony作業一覧へのリンク---- ////////
// ここまでカスタマイズした場合の一般メソッド配置域----