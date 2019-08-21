#v_insert.py
#coding:UTF-8
from flask import Flask, request, Blueprint
from main import session, Employee
import json

#新規登録
e_insert = Blueprint('e_insert', __name__)
@e_insert.route('/api/employee_insert', methods=['POST'])
def employee_insert():
    employee = Employee()
    employee.jpns_name = request.json['jpnsName']#従業員名
    employee.jpns_kana = request.json['jpnsKana']#よみがな
    employee.roma_name = request.json['romaName']#name
    employee.postal_code = request.json['postalCode']#郵便番号
    employee.address = request.json['address']#住所
    employee.tel_no = request.json['telNo']#電話番号
    employee.mail_address = ''#メールアドレス(自動割当)
    employee.sex = request.json['sex']#性別
    employee.birth_date = request.json['birthDate']#生年月日
    employee.final_education = request.json['finalEducation'] + request.json['division']#最終学歴
    employee.join_date = request.json['joinDate']#入社年月日
    employee.company_mail_address = request.json['companyMailAddress']#自社メールアドレス
    employee.employee_id = request.json['employeeId']#従業員ID
    employee.photo_image = request.json['photoImage']#写真イメージ
    employee.branch_id = request.json['branchId']#支社ID
    employee.department_id = request.json['departmentId']#部署ID
    session.add(employee)
    session.commit()
    return ''