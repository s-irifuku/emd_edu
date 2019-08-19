#v_update.py
#coding:UTF-8
from flask import Flask, render_template, request, Blueprint
from main import session, Employee

#更新
e_update = Blueprint('e_update', __name__)
@e_update.route('/employee_update_input/<id>')
def employee_update_input(id):
    empInfo = {}
    for emp in session.query(Employee).filter(Employee.employee_id==id):
        empInfo["jpns_name"] = emp.jpns_name     
        empInfo["jpns_kana"] = emp.jpns_kana
        empInfo["roma_name"] = emp.roma_name
        empInfo["postal_code"] = emp.postal_code
        empInfo["address"] = emp.address
        empInfo["tel_no"] = emp.tel_no
        empInfo["mail_address"] = emp.mail_address
        empInfo["sex"] = emp.sex
        empInfo["birth_date"] = emp.birth_date
        empInfo["final_education"] = emp.final_education
        empInfo["join_date"] = emp.join_date
        empInfo["company_mail_address"] = emp.company_mail_address
        empInfo["employee_id"] = emp.employee_id
        empInfo["photo_image"] = emp.photo_image
    return render_template("/bootstrap/employee_update.html", empInfo = empInfo)

@e_update.route('/employee_update_complete', methods=['POST'])
def employee_update_complete():
    update_emp = session.query(Employee).filter(Employee.employee_id == request.form['employee_id']).first()
    update_emp.jpns_name = request.form['jpns_name']
    update_emp.jpns_kana = request.form['jpns_kana']
    update_emp.roma_name = request.form['roma_name']
    update_emp.postal_code = request.form['postal_code']
    update_emp.address = request.form['address']
    update_emp.tel_no = request.form['tel_no']
    update_emp.mail_address = request.form['mail_address']
    update_emp.sex = request.form['sex']
    update_emp.birth_date = request.form['birth_date']
    update_emp.final_education = request.form['final_education']
    update_emp.join_date = request.form['join_date']
    update_emp.company_mail_address = request.form['company_mail_address']
    update_emp.employee_id = request.form['employee_id']
    update_emp.photo_image = open(request.form['photo_image'], 'rb')
    session.commit()
    return render_template("/bootstrap/employee_list.html")
