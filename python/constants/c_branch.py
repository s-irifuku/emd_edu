#c_branch.py
#coding:UTF-8
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

#関連チェック（支店と部署）
def validate_relation_branch_department(branchId, departmentId):
    error_msg = ''
    #東京支店の場合
    if branchId == '1':
        #登録可能な部署
        tky_registration_department = [
            '1',#SI事業部
            '4',#新規商材開発事業部
            '2',#受託開発事業部
            '3'#営業部
        ]
        if departmentId not in tky_registration_department:
            error_msg = '東京支店を選択した場合、部署はSI事業部、新規商材開発事業部、受託開発事業部、営業部を選択して下さい。'
    #東北支店の場合
    elif branchId == '2':
        sdi_registration_department = [
            '2'#受託開発事業部
        ]
        if departmentId not in sdi_registration_department:
            error_msg = '東北支店を選択した場合、部署は受託開発事業部を選択して下さい。'
    #東海支店の場合
    elif branchId == '3':
        ngy_registration_department = [
            '5',#組み込み開発事業部
            '1',#SI事業部
            '6',#総務部
            '3'#営業部
        ]
        if departmentId not in ngy_registration_department:
            error_msg = '東海支店を選択した場合、部署は組み込み開発事業部、SI事業部、総務部、営業部を選択して下さい。'
    return error_msg
