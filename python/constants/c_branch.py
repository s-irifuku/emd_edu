#c_branch.py
#coding:UTF-8
from enum import Enum
from main import session, Branch

#支店IDに対応する支店コードを返す
def get_branch_code_by_branch_id(branch_id):
    if branch_id == '1':
        return 'tky'
    elif branch_id == '2':
        return 'sdi'
    elif branch_id == '3':
        return 'ngy'
    else:
        return ''

#{id_list:[支店ID], name_list:[支店名]}形式の辞書を返す
def get_branch_of_dictionary():
    id_list = []
    name_list = []
    for (id, name) in session.query(Branch.branch_id, Branch.branch_name):
        id_list.append(id)
        name_list.append(name)
    return {'id_list': id_list, 'name_list': name_list}
