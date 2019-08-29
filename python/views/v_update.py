#v_update.py
#coding:UTF-8
from flask import Flask, request, Blueprint, jsonify, make_response
from main import session, Employee, RentalDevice
from constants import c_branch
import json, datetime

#更新
e_update = Blueprint('e_update', __name__)
@e_update.route('/api/employee_update', methods=['POST'])
def employee_update():
    #関連チェック（支店と部署）
    relation_error_msg = c_branch.validate_relation_branch_department(request.json['branchId'], request.json['departmentId'])
    if(relation_error_msg != ''):
        return make_response(jsonify({'res': 'NG', 'msg': relation_error_msg}))

    #入社年月日の値チェック（月曜日であること）
    week_day_error_msg = validate_join_date_monday(request.json['joinDate'])
    if(week_day_error_msg != ''):
        return make_response(jsonify({'res': 'NG', 'msg': week_day_error_msg})) 
   
    #自社メールアドレスの支社ドメインチェック更新
    branch_domain_error_msg = validate_company_mail_address(request.json['companyMailAddress'], request.json['branchId'])
    if(branch_domain_error_msg != ''):
        return make_response(jsonify({'res': 'NG', 'msg': branch_domain_error_msg}))
    #ここから更新処理
    update_emp = session.query(Employee).filter(Employee.employee_id == request.json['employeeId']).first()
    update_emp.jpns_name = request.json['jpnsName']#従業員名
    update_emp.jpns_kana = request.json['jpnsKana']#よみがな
    update_emp.roma_name = request.json['romaName']#name
    update_emp.postal_code = request.json['postalCode']#郵便番号
    update_emp.address = request.json['address']#住所
    update_emp.tel_no = request.json['telNo']#電話番号
    update_emp.mail_address = request.json['mailAddress']#個人メールアドレス
    update_emp.sex = request.json['sex']#性別
    update_emp.birth_date = request.json['birthDate']#生年月日
    update_emp.final_education = request.json['finalEducation']#最終学歴
    update_emp.education_division = request.json['educationDivision']#卒業区分
    update_emp.join_date = request.json['joinDate']#入社年月日
    update_emp.company_mail_address = request.json['companyMailAddress']#自社メールアドレス
    update_emp.photo_image = request.json['photoImage']#写真イメージ
    update_emp.branch_id = request.json['branchId']#支社ID
    update_emp.department_id = request.json['departmentId']#部署ID
    session.commit()
    session.close()
    return make_response(jsonify({'res': 'OK'}))

#入社年月日の値チェック（月曜日であること）
def validate_join_date_monday(joinDate):
    week_day_error_msg = ''
    jpns_week = ['月', '火', '水', '木', '金', '土', '日']
    join_week_day = datetime.datetime.strptime(joinDate, "%Y-%m-%d").weekday()
    
    if jpns_week[join_week_day] != '月':
        week_day_error_msg = '入社年月日は月曜日にして下さい。'
    return week_day_error_msg

#メールアドレス更新
def validate_company_mail_address(companyMailAddress, branchId):
    #@メールアドレスの支社ドメイン抽出
    branch_domain_error_msg = ''
    branch_domain = companyMailAddress.split('@')[1].split('.')[0]
    print(branch_domain)
    branch_code = c_branch.get_branch_code_by_branch_id(branchId)
    if branch_domain != branch_code:
        branch_domain_error_msg = '自社メールアドレスは、選択した支社に対応するドメインにして下さい'
    return branch_domain_error_msg

#更新
r_update = Blueprint('r_update', __name__)
@r_update.route('/api/resource_update', methods=['POST'])
def resource_update():
    #ここから更新処理
    update_res = session.query(RentalDevice).filter(RentalDevice.rental_device_id == request.json['rentalDeviceId']).first()
    update_res.device_id = request.json['deviceId']
    update_res.os_id = request.json['osId']
    update_res.cpu_id = request.json['cpuId']
    update_res.memory_id = request.json['memoryId']
    update_res.storage_type_id = request.json['storageTypeId']
    update_res.storage_capacity_id = request.json['storageCapacityId']
    session.commit()
    session.close()
    return make_response(jsonify({'res': 'OK'}))