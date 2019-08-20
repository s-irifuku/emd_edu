#v_list.py
#coding:UTF-8
from flask import Flask, Blueprint, jsonify
from main import session, Employee

#一覧表示
e_list = Blueprint('e_list', __name__)
@e_list.route('/api/employee_list', methods=["GET"])
def employee_list():
    id_list = []
    name_list = []
    date_list = []
    for emp in session.query(Employee.employee_id, Employee.jpns_name, Employee.join_date):        
        id_list.append(emp.employee_id)
        name_list.append(emp.jpns_name)
        date_list.append(emp.join_date)
    
    empList = {
        "idList": id_list
        , "nameList": name_list
        , "dateList": date_list
    }
    return jsonify(empList)
