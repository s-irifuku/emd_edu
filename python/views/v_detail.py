#v_detail.py
#coding:UTF-8
from flask import Flask, Blueprint, jsonify
from main import session, Employee
from constants import c_branch, c_department

#詳細表示
e_detail = Blueprint('e_detail', __name__)
@e_detail.route('/api/employee_detail/<employee_id>')
def employee_detail(employee_id):
    detail = {}
    for result in session.query(Employee).filter(Employee.employee_id==employee_id):
        detail = {
            "jpnsName": result.jpns_name     
            , "jpnsKana": result.jpns_kana
            , "romaName": result.roma_name
            , "postalCode": result.postal_code
            , "address": result.address
            , "telNo": result.tel_no
            , "mailAddress": result.mail_address
            , "sex": result.sex
            , "birthDate": result.birth_date
            , "finalEducation": result.final_education
            , "educationDivision": result.education_division
            , "joinDate": result.join_date
            , "companyMailAddress": result.company_mail_address
            , "employeeId": result.employee_id
            , "photoImage": result.photo_image
            , "branchId": result.branch_id
            , "departmentId": result.department_id
        }
    return jsonify(detail)