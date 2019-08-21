#v_master.py
#coding:UTF-8
from flask import Flask, Blueprint, jsonify
from constants import c_branch, c_department

#マスタデータ取得
e_master = Blueprint('e_master', __name__)
@e_master.route('/api/master', methods=['GET'])
def get_master():
    branch_dictionary = c_branch.get_branch_of_dictionary()#支店
    department_dictionary = c_department.get_department_of_dictionary()#部署
    master_dictionary = {
        'branch_dictionary': {
            'branch_id_list': branch_dictionary['id_list'],
            'branch_name_list': branch_dictionary['name_list']
        },
        'department_dictionary': {
            'department_id_list': department_dictionary['id_list'],
            'department_name_list': department_dictionary['name_list']
        },
    }
    return jsonify(master_dictionary)
