#c_department.py
#coding:UTF-8
from enum import Enum
from main import session, Department
#部署
class Department_Enum(Enum):
    si_div = '1'#SI事業部
    jutaku_div = '2'#受託開発事業部
    eigyo_div = '3'#営業部
    syozai_div = '4'#新規商材開発事業部
    kumikomi_div = '5'#組み込み開発事業部
    somu_div = '6'#総務部
#部署IDに対応する部署名を返す
def get_department_name_by_department_id(department_id):
    for (id, name) in session.query(Department.department_id, Department.department_name):
        if id == department_id:
            print(name)
            return name
    return ''

#(部署ID, 部署名)形式のリストを返す
def get_department_list():
    id_list = []
    name_list = []
    for (id, name) in session.query(Department.department_id, Department.department_name):
        id_list.append(id)
        name_list.append(name)
    return zip(id_list, name_list)