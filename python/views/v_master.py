#v_master.py
#coding:UTF-8
from flask import Flask, Blueprint, jsonify
from constants import c_branch, c_department, c_resource

#マスタデータ取得
e_master = Blueprint('e_master', __name__)
@e_master.route('/api/master', methods=['GET'])
def load_master():
    branch_dictionary = c_branch.get_branch_of_dictionary()#支店
    department_dictionary = c_department.get_department_of_dictionary()#部署
    
    device_list = c_resource.load_device()#機器
    os_list = c_resource.load_os()#OS
    cpu_list = c_resource.load_cpu()#CPU
    memory_list = c_resource.load_memory()#メモリー
    storage_type_list = c_resource.load_storage_type()#ストレージタイプ
    storage_capacity_list = c_resource.load_storage_capacity()#ストレージ容量
    master_dictionary = {
        'branch_dictionary': {
            'branch_id_list': branch_dictionary['id_list'],
            'branch_name_list': branch_dictionary['name_list']
        },
        'department_dictionary': {
            'department_id_list': department_dictionary['id_list'],
            'department_name_list': department_dictionary['name_list']
        }
        , 'device_list': device_list
        , 'os_list': os_list
        , 'cpu_list': cpu_list
        , 'memory_list': memory_list
        , 'storage_type_list': storage_type_list
        , 'storage_capacity_list': storage_capacity_list
    }
    return jsonify(master_dictionary)
