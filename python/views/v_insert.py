#v_insert.py
#coding:UTF-8
from flask import Flask, request, Blueprint
from main import session, Employee
from sqlalchemy.sql import func
from constants import c_branch
import json

#新規登録
e_insert = Blueprint('e_insert', __name__)
@e_insert.route('/api/employee_insert', methods=['POST'])
def employee_insert():
    #メールアドレス作成
    mail_address = create_mail_address(request.json['romaName'])
    #従業員ID作成
    employeeId = create_employee_id(request.json['branchId'])
    #新規作成可否判定
    if(mail_address != '' and employeeId != ''):
        employee = Employee()
        employee.jpns_name = request.json['jpnsName']#従業員名
        employee.jpns_kana = request.json['jpnsKana']#よみがな
        employee.roma_name = request.json['romaName']#name
        employee.postal_code = request.json['postalCode']#郵便番号
        employee.address = request.json['address']#住所
        employee.tel_no = request.json['telNo']#電話番号
        employee.mail_address = mail_address#メールアドレス(自動割当)
        employee.sex = request.json['sex']#性別
        employee.birth_date = request.json['birthDate']#生年月日
        employee.final_education = request.json['finalEducation']#最終学歴
        employee.education_division = request.json['educationDivision']#卒業区分
        employee.join_date = request.json['joinDate']#入社年月日
        employee.company_mail_address = request.json['companyMailAddress']#自社メールアドレス
        employee.employee_id = 'employeeId'#従業員ID
        employee.photo_image = request.json['photoImage']#写真イメージ
        employee.branch_id = request.json['branchId']#支社ID
        employee.department_id = request.json['departmentId']#部署ID
        session.add(employee)
        session.commit()
        return 'OK'
    return 'NG'

def create_mail_address(romaName):
    #入力値(名前 苗字)を分割する
    full_name = romaName.split(" ")
    first_name = full_name[0]
    last_name = full_name[1]
    #名前_苗字で重複判定
    f_user_name = ''
    for f_char in first_name:
        #候補名（名前部分）を作成
        f_user_name += f_char
        #候補ユーザー名を作成
        candidate_name = f_user_name + '-' + last_name
        #重複しているか判定
        count = session.query(Employee).filter(Employee.mail_address.like('%%%s%%' % candidate_name)).count()
        if count == 0:
            return candidate_name + '@emdes.co.jp'
    #苗字_名前で重複判定
    for l_char in first_name:
        #候補名（苗字部分）を作成
        l_user_name += l_char
        #候補ユーザー名を作成
        candidate_name = l_user_name + '_' + first_name
        #重複しているか判定
        count = session.query(Employee).filter(Employee.mail_address.like('%%%s%%' % candidate_name)).count()
        if count == 0:
            return candidate_name + '@emdes.co.jp'
    #登録エラー
    return ''

def create_employee_id(branchId):
    #支店コードの取得
    branch_code = c_branch.get_branch_code_by_branch_id(branchId)
    #数字部分の取得
    max_id = session.query(func.max(Employee.e_id).label('max_id')).one()
    #print(max_id[0])
    id = str(max_id[0] + 1)
    return 'emd' + branch_code + id.zfill(10)

