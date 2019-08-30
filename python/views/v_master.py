#v_master.py
#coding:UTF-8
from flask import Blueprint, jsonify
from constants import load_resource

#マスタデータ取得
v_master = Blueprint('v_master', __name__)
@v_master.route('/api/master', methods=['GET'])
def load_master():
    branch_list = load_resource.load_branch()#支店
    department_list = load_resource.load_department()#部署
    device_list = load_resource.load_device()#デバイス
    os_list = load_resource.load_os()#OS
    cpu_list = load_resource.load_cpu()#CPU
    memory_list = load_resource.load_memory()#メモリー
    storage_type_list = load_resource.load_storage_type()#ストレージタイプ
    storage_capacity_list = load_resource.load_storage_capacity()#ストレージ容量
    master_list = {
        'branch_list': branch_list
        , 'department_list': department_list
        , 'device_list': device_list
        , 'os_list': os_list
        , 'cpu_list': cpu_list
        , 'memory_list': memory_list
        , 'storage_type_list': storage_type_list
        , 'storage_capacity_list': storage_capacity_list
    }
    return jsonify(master_list)