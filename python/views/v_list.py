#v_list.py
#coding:UTF-8
from flask import Flask, Blueprint, jsonify
from main import session, Employee
import json

#一覧表示
e_list = Blueprint('e_list', __name__)
@e_list.route('/employee_list', methods=["GET", "POST"])
def employee_list():
    id_list = []
    name_list = []
    date_list = []
    for emp in session.query(Employee.employee_id, Employee.jpns_name, Employee.join_date):
        id_list.append(emp.employee_id)
        name_list.append(emp.jpns_name)
        date_list.append(emp.join_date)
    
    empList = {
        "employee_id_list": id_list
        , "jpns_name_list": name_list
        , "join_date_list": date_list
    }
    response = jsonify(empList)
    response.status_code = 200
    return response
