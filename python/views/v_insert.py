#v_insert.py
#coding:UTF-8
from flask import Flask, request, Blueprint, jsonify, make_response
from main import session, Employee, RentalDevice
from sqlalchemy.sql import func
from constants import c_branch
import json, datetime

#新規登録
e_insert = Blueprint('e_insert', __name__)
@e_insert.route('/api/employee_insert', methods=['POST'])
def employee_insert():
    #関連チェック（支店と部署）
    relation_error_msg = c_branch.validate_relation_branch_department(request.json['branchId'], request.json['departmentId'])
    if(relation_error_msg != ''):
        return make_response(jsonify({'res': 'NG', 'msg': relation_error_msg}))
    
    #入社年月日の値チェック（月曜日であること）
    week_day_error_msg = validate_join_date_monday(request.json['joinDate'])
    if(week_day_error_msg != ''):
        return make_response(jsonify({'res': 'NG', 'msg': week_day_error_msg})) 

    #自社メールアドレス作成
    company_mail_address = create_company_mail_address(request.json['romaName'], request.json['branchId'])
    if(company_mail_address == ''):
        return make_response(jsonify({'res': 'NG', 'msg': '自社メールアドレスが作成できませんでした。'}))
    #従業員ID作成
    employeeId = create_employee_id(request.json['branchId'])
    #ここから登録処理
    employee = Employee()
    employee.jpns_name = request.json['jpnsName']#従業員名
    employee.jpns_kana = request.json['jpnsKana']#よみがな
    employee.roma_name = request.json['romaName']#name
    employee.postal_code = request.json['postalCode']#郵便番号
    employee.address = request.json['address']#住所
    employee.tel_no = request.json['telNo']#電話番号
    employee.mail_address = request.json['mailAddress']#個人メールアドレス
    employee.sex = request.json['sex']#性別
    employee.birth_date = request.json['birthDate']#生年月日
    employee.final_education = request.json['finalEducation']#最終学歴
    employee.education_division = request.json['educationDivision']#卒業区分
    employee.join_date = request.json['joinDate']#入社年月日
    employee.company_mail_address = company_mail_address#（自動）自社メールアドレス
    employee.employee_id = employeeId#従業員ID
    employee.photo_image = request.json['photoImage']#写真イメージ
    employee.branch_id = request.json['branchId']#支社ID
    employee.department_id = request.json['departmentId']#部署ID
    session.add(employee)
    session.commit()
    return make_response(jsonify({'res': 'OK'}))

#入社年月日の値チェック（月曜日であること）
def validate_join_date_monday(joinDate):
    week_day_error_msg = ''
    jpns_week = ['月', '火', '水', '木', '金', '土', '日']
    join_week_day = datetime.datetime.strptime(joinDate, "%Y-%m-%d").weekday()
    
    if jpns_week[join_week_day] != '月':
        week_day_error_msg = '入社年月日は月曜日にして下さい。'
    return week_day_error_msg

#メールアドレス作成
def create_company_mail_address(romaName, branchId):
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
        candidate_name = f_user_name + '-' + last_name + '@'
        #重複しているか判定
        count = session.query(Employee).filter(Employee.company_mail_address.like('%\\' + candidate_name + '%', escape='\\')).count()
        if count == 0:
            return candidate_name + '@' + c_branch.get_branch_code_by_branch_id(branchId) + '.emdes.co.jp'
    #苗字_名前で重複判定
    l_user_name = ''
    for l_char in last_name:
        l_user_name += l_char
        candidate_name = first_name + '-' + l_user_name + '@'
        count = session.query(Employee).filter(Employee.company_mail_address.like('%\\' + candidate_name + '%', escape='\\')).count()
        if count == 0:
            return candidate_name + '@' + c_branch.get_branch_code_by_branch_id(branchId) + '.emdes.co.jp'
    #登録エラー
    return ''
    
#従業員ID作成
def create_employee_id(branchId):
    #支店コードの取得
    branch_code = c_branch.get_branch_code_by_branch_id(branchId)
    #数字部分の取得
    max_id = session.query(func.max(Employee.e_id).label('max_id')).one()
    id = 0
    if max_id[0] is None:
        id = '1'
    else:
        id = str(max_id[0] + 1)
    return 'emd' + branch_code + id.zfill(10)

@e_insert.route('/api/resource_insert', methods=['POST'])
def resource_insert():
    rentalDevice = RentalDevice()
    rentalDevice.rental_device_id = create_rental_device_id()
    rentalDevice.device_id = request.json['deviceId']
    rentalDevice.os_id = request.json['osId']
    rentalDevice.cpu_id = request.json['cpuId']
    rentalDevice.memory_id = request.json['memoryId']
    rentalDevice.storage_type_id = request.json['storageTypeId']
    rentalDevice.storage_capacity_id = request.json['storageCapacityId']
    rentalDevice.delete_flg = '0'
    session.add(rentalDevice)
    session.commit()
    return make_response(jsonify({'res': 'OK'}))

#貸出機器IDの作成
def create_rental_device_id():
    max_id = session.query(func.max(RentalDevice.rental_device_id).label('max_id')).one()
    id = 0
    if max_id[0] is None:
        id = '1'
    else:
        id = str(max_id[0] + 1)
    return id.zfill(3)