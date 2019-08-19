#v_detail.py
#coding:UTF-8
from flask import Flask, render_template, Blueprint
from main import session, Employee
import c_branch
import c_department

#詳細表示
e_detail = Blueprint('e_detail', __name__)
@e_detail.route('/employee_detail/<id>')
def employee_detail(id):
    detail = {}
    for result in session.query(Employee).filter(Employee.employee_id==id):
        detail["jpns_name"] = result.jpns_name     
        detail["jpns_kana"] = result.jpns_kana
        detail["roma_name"] = result.roma_name
        detail["postal_code"] = result.postal_code
        detail["address"] = result.address
        detail["tel_no"] = result.tel_no
        detail["mail_address"] = result.mail_address
        detail["sex"] = result.sex
        detail["birth_date"] = result.birth_date
        detail["final_education"] = result.final_education
        detail["join_date"] = result.join_date
        detail["company_mail_address"] = result.company_mail_address
        detail["employee_id"] = result.employee_id
        detail["photo_image"] = result.photo_image
        detail["branch_name"] = c_branch.get_branch_name_by_branch_id(result.branch_id)
        detail["department_name"] = c_department.get_department_name_by_department_id(result.department_id)
    return render_template("/bootstrap/employee_detail.html", detail = detail)