#v_master.py
#coding:UTF-8
from flask import Flask, Blueprint, jsonify
from constants import c_branch, c_department, c_resource

#マスタデータ取得
e_master = Blueprint('e_master', __name__)
@e_master.route('/api/master', methods=['GET'])
def get_master():
    branch_dictionary = c_branch.get_branch_of_dictionary()#支店
    department_dictionary = c_department.get_department_of_dictionary()#部署
    device_dictionary = c_resource.get_device_of_dictionary()#機器
    os_dictionary = c_resource.get_os_of_dictionary()#OS
    cpu_dictionary = c_resource.get_cpu_of_dictionary()#CPU
    memory_dictionary = c_resource.get_memory_of_dictionary()#メモリー
    storage_type_dictionary = c_resource.get_storage_type_of_dictionary()#ストレージタイプ
    storage_capacity_dictionary = c_resource.get_storage_capacity_of_dictionary()#ストレージ容量
    master_dictionary = {
        'branch_dictionary': {
            'branch_id_list': branch_dictionary['id_list'],
            'branch_name_list': branch_dictionary['name_list']
        },
        'department_dictionary': {
            'department_id_list': department_dictionary['id_list'],
            'department_name_list': department_dictionary['name_list']
        },
        'device_dictionary': {
            'device_id_list': device_dictionary['id_list'],
            'device_name_list': device_dictionary['name_list']
        },
        'os_dictionary': {
            'os_id_list': os_dictionary['id_list'],
            'os_name_list': os_dictionary['name_list']
        },
        'cpu_dictionary': {
            'cpu_id_list': cpu_dictionary['id_list'],
            'cpu_core_list': cpu_dictionary['core_list']
        },
        'memory_dictionary': {
            'memory_id_list': memory_dictionary['id_list'],
            'memory_gbyte_list': memory_dictionary['gbyte_list']
        },
        'storage_type_dictionary': {
            'storage_type_id_list': storage_type_dictionary['id_list'],
            'storage_type_name_list': storage_type_dictionary['name_list']
        },
        'storage_capacity_dictionary': {
            'storage_capacity_id_list': storage_capacity_dictionary['id_list'],
            'storage_capacity_gbyte_list': storage_capacity_dictionary['gbyte_list']
        }
    }
    return jsonify(master_dictionary)
