#v_list.py
#coding:UTF-8
from flask import Flask, request, Blueprint, jsonify, make_response
from main import session, Employee
from sqlalchemy import and_
from datetime import date
from views import v_detail
import json

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

@e_list.route('/api/employee_search', methods=["POST"])
def employee_search():
    res = session.query(Employee)
    #名前
    jpnsName = request.json['jpnsName']
    if (jpnsName != ''):
        res = res.filter(Employee.jpns_name.like('%\\' + jpnsName + '%', escape='\\'))
    #出身地
    prefecture = request.json['prefecture']
    if (prefecture != ''):
        res = res.filter(Employee.address.like('%\\' + prefecture + '%', escape='\\'))
    #年齢
    #TODO
    #最終学歴
    finalEducation = request.json['finalEducation']
    if (finalEducation != ''):
        res = res.filter(Employee.final_education.like('%\\' + finalEducation + '%', escape='\\'))
    #入社年月日
    #TODO
    #入社歴
    #TODO
    #従業員ID
    employeeId = request.json['employeeId']
    if (employeeId != ''):
        res = res.filter(Employee.employee_id.like('%\\' + employeeId + '%', escape='\\'))
    #分岐
    #取得件数が1件の場合、詳細項目を返却する。
    if (res.count() == 1):
        res = {
            "empType": "detail"
            , "employeeId": res.first().employee_id
        }
        return make_response(jsonify(res))
    #取得件数が複数の場合、一覧表示項目を返却する。
    else:
        id_list = []
        name_list = []
        date_list = []
        for emp in res.all():
            id_list.append(emp.employee_id)
            name_list.append(emp.jpns_name)
            date_list.append(emp.join_date)
        res = {
            "empType": "list"
            , "empList": {
                "idList": id_list
                , "nameList": name_list
                , "dateList": date_list
            }
        }
        return make_response(jsonify(res))