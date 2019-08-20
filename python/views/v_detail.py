#v_detail.py
#coding:UTF-8
from flask import Flask, Blueprint, jsonify
from main import session, Employee
import c_branch
import c_department

#詳細表示
e_detail = Blueprint('e_detail', __name__)
@e_detail.route('/api/employee_detail/<id>')
def employee_detail(id):
    detail = {}
    for result in session.query(Employee).filter(Employee.employee_id==id):
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
            , "joinDate": result.join_date
            , "companyMailAddress": result.company_mail_address
            , "employeeId": result.employee_id
            , "photoImage": result.photo_image
            , "branchName": c_branch.get_branch_name_by_branch_id(result.branch_id)
            , "departmentName": c_department.get_department_name_by_department_id(result.department_id)
        }
    return jsonify(detail)