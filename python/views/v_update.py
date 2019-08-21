#v_update.py
#coding:UTF-8
from flask import Flask, request, Blueprint
from main import session, Employee
import json

#更新
e_update = Blueprint('e_update', __name__)
@e_update.route('/api/employee_update', methods=['POST'])
def employee_update():
    update_emp = session.query(Employee).filter(Employee.employee_id == request.json['employeeId']).first()
    update_emp.jpns_name = request.json['jpnsName']
    update_emp.jpns_kana = request.json['jpnsKana']
    update_emp.roma_name = request.json['romaName']
    update_emp.postal_code = request.json['postalCode']
    update_emp.address = request.json['address']
    update_emp.tel_no = request.json['telNo']
    update_emp.mail_address = request.json['mailAddress']
    update_emp.sex = request.json['sex']
    update_emp.birth_date = request.json['birthDate']
    update_emp.final_education = request.json['finalEducation']
    update_emp.join_date = request.json['joinDate']
    update_emp.company_mail_address = request.json['companyMailAddress']
    update_emp.employee_id = request.json['employeeId']
    session.commit()
    return ''
