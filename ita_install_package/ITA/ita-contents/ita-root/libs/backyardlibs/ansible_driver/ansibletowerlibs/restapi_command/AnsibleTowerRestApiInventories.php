<?php
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
//////////////////////////////////////////////////////////////////////
//
//  【概要】
//      AnsibleTower RestApi Inventory系を呼ぶ クラス
//
//////////////////////////////////////////////////////////////////////

////////////////////////////////
// ルートディレクトリを取得
////////////////////////////////
if(empty($root_dir_path)) {
    $root_dir_temp = array();
    $root_dir_temp = explode("ita-root", dirname(__FILE__));
    $root_dir_path = $root_dir_temp[0] . "ita-root";
}

require_once($root_dir_path . "/libs/backyardlibs/ansible_driver/ansibletowerlibs/restapi_command/AnsibleTowerRestApiBase.php");  

class AnsibleTowerRestApiInventories extends AnsibleTowerRestApiBase {

    const API_PATH  = "inventories/";
    const API_SUB_PATH  = "instance_groups/";
    const IDENTIFIED_NAME_PREFIX_DEL = "ita_%s_executions_inventory_%s";
    const IDENTIFIED_NAME_PREFIX     = self::IDENTIFIED_NAME_PREFIX_DEL . "_%s";

    const PREPARE_BUILD_INVENTORY_NAME = "ita_executions_local";

    // static only
    private function __construct() {
    }

    static function getAll($RestApiCaller, $query = "") {

        // REST APIアクセス
        $method = "GET";
        $response_array = $RestApiCaller->restCall($method, self::API_PATH . $query);

        // REST失敗
        if($response_array['statusCode'] != 200) {
            $response_array['success'] = false;
            if(!array_key_exists("errorMessage", $response_array['responseContents'])) {
                $response_array['responseContents']['errorMessage'] = "status_code not 200. =>" . $response_array['statusCode'];
            }
            return $response_array;
        }

        // REST成功
        $response_array['success'] = true;
        $response_array['responseContents'] = $response_array['responseContents']['results'];

        return $response_array;
    }

    static function get($RestApiCaller, $id) {

        // REST APIアクセス
        $method = "GET";
        $response_array = $RestApiCaller->restCall($method, self::API_PATH . $id . "/");

        // REST失敗
        if($response_array['statusCode'] != 200) {
            $response_array['success'] = false;
            if(!array_key_exists("errorMessage", $response_array['responseContents'])) {
                $response_array['responseContents']['errorMessage'] = "status_code not 200. =>" . $response_array['statusCode'];
            }
            return $response_array;
        }

        // REST成功
        $response_array['success'] = true;

        return $response_array;
    }

    static function post($RestApiCaller, $param) {

        global $vg_tower_driver_name;

        // content生成
        $content = array();

        if(!empty($param['execution_no']) && !empty($param['loopCount'])) {
            $content['name'] = sprintf(self::IDENTIFIED_NAME_PREFIX,$vg_tower_driver_name,addPadding($param['execution_no']),addPadding($param['loopCount']));
        } else {
            // 必須のためNG返す
            $response_array['success'] = false;
            $response_array['responseContents']['errorMessage'] = "Need 'execution_no' and 'loopCount'.";
            return $response_array;
        }
// enomoto_app
//        $content['organization'] = self::ORG_DEFAULT; // 現在[Default]固定
        if(!empty($param['organization'])) {
            $content['organization']       = $param['organization'];
        } else {
            // 必須のためNG返す
            $response_array['success'] = false;
            $response_array['responseContents']['errorMessage'] = "Need 'organization'.";
            return $response_array;
        }

        // REST APIアクセス
        $method = "POST";
        $response_array = $RestApiCaller->restCall($method, self::API_PATH, $content);

        // REST失敗
        if($response_array['statusCode'] != 201) {
            $response_array['success'] = false;
            if(!array_key_exists("errorMessage", $response_array['responseContents'])) {
                $response_array['responseContents']['errorMessage'] = "status_code not 201. =>" . $response_array['statusCode'];
            }
            return $response_array;
        }

        $inventoryId = $response_array['responseContents']['id'];

        if(array_key_exists("instanceGroupId", $param) && !empty($param['instanceGroupId'])) {
            $content_2 = array();
            $content_2['id'] = (int)$param['instanceGroupId'];

            // REST APIアクセス
            $method = "POST";
            $response_array_2 = $RestApiCaller->restCall($method, self::API_PATH . $inventoryId . "/" . self::API_SUB_PATH, $content_2);

            // REST失敗
            if($response_array_2['statusCode'] != 204) {
                $response_array_2['success'] = false;
                if(!array_key_exists("errorMessage", $response_array_2['responseContents'])) {
                    $response_array_2['responseContents']['errorMessage'] = "status_code not 204. =>" . $response_array_2['statusCode'];
                }
                return $response_array_2;
            }
        }

        // REST成功
        $response_array['success'] = true;

        return $response_array;
    }

    static function delete($RestApiCaller, $id) {

        // REST APIアクセス
        $method = "DELETE";
        $response_array = $RestApiCaller->restCall($method, self::API_PATH . $id . "/");

        // REST失敗
        if($response_array['statusCode'] != 202) {
            $response_array['success'] = false;
            if(!array_key_exists("errorMessage", $response_array['responseContents'])) {
                $response_array['responseContents']['errorMessage'] = "status_code not 202. =>" . $response_array['statusCode'];
            }
            return $response_array;
        }

        // REST成功
        $response_array['success'] = true;

        return $response_array;
    }

    static function deleteRelatedCurrnetExecution($RestApiCaller, $execution_no) {

        global $vg_tower_driver_name;

        // データ絞り込み
        $filteringName = sprintf(self::IDENTIFIED_NAME_PREFIX_DEL,$vg_tower_driver_name,addPadding($execution_no)) . "_";
        $query = "?name__startswith=" . $filteringName;
        $pickup_response_array = self::getAll($RestApiCaller, $query);
        if($pickup_response_array['success'] == false) {
            return $pickup_response_array;
        }

        foreach($pickup_response_array['responseContents'] as $inventoryData) {

            $response_array = self::delete($RestApiCaller, $inventoryData['id']);
            if($response_array['success'] == false) {
                return $response_array;
            }
        }

        return $pickup_response_array; // データ不足しているが、後続の処理はsuccessしか確認しないためこのまま
    }

}

?>
