#c_branch.py
#coding:UTF-8
from enum import Enum
from main import session, Branch
#支店
class Branch_Enum(Enum):
    tokyo = '1'#東京支店
    tohoku = '2'#東北支店
    tokai = '3'#東海支店
#支店IDに対応する支店名を返す
def get_branch_name_by_branch_id(branch_id):
    for (id, name) in session.query(Branch.branch_id, Branch.branch_name):
        if id == branch_id:
            return name
    return ''

#(支店ID, 支店名)形式のリストを返す
def get_branch_list():
    id_list = []
    name_list = []
    for (id, name) in session.query(Branch.branch_id, Branch.branch_name):
        id_list.append(id)
        name_list.append(name)
    return zip(id_list, name_list)

#{id_list:[支店ID], name_list:[支店名]}形式の辞書を返す
def get_branch_of_dictionary():
    id_list = []
    name_list = []
    for (id, name) in session.query(Branch.branch_id, Branch.branch_name):
        id_list.append(id)
        name_list.append(name)
    return {'id_list': id_list, 'name_list': name_list}
