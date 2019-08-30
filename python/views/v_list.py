#v_list.py
#coding:UTF-8
from flask import Flask, request, Blueprint, jsonify, make_response
from main import session, Employee, RentalDevice, RentalHistory
from sqlalchemy.sql import text 
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

#貸出情報表示
r_list = Blueprint('r_list', __name__)
@r_list.route('/api/resource_list', methods=["GET"])
def resource_list():
    rental_device_id_list = []
    device_id_list = []
    os_id_list = []
    cpu_id_list = []
    memory_id_list = []
    storage_type_id_list = []
    storage_capacity_id_list = []
    employee_id_list = []
    jpns_name_list = []
    rental_start_date_list = []
    rental_end_date_list = []
    sql = text("SELECT rd.rental_device_id, rd.device_id, rd.os_id, rd.cpu_id, rd.memory_id, rd.storage_type_id, \
        rd.storage_capacity_id, rh.rental_start_date, rh.rental_end_date, rh.employee_id, emp.jpns_name FROM \
        RentalDevice rd LEFT JOIN RentalHistory rh ON rd.rental_device_id = rh.rental_device_id AND rh.rental_history_id \
        IN ( SELECT max(rh.rental_history_id) maxId FROM RentalDevice rd LEFT JOIN RentalHistory rh ON rd.rental_device_id = rh.rental_device_id \
        GROUP BY rd.rental_device_id ) LEFT JOIN Employee emp ON rh.employee_id = emp.employee_id WHERE rd.delete_flg = '0';")
    for res in session.execute(sql):
        rental_device_id_list.append(res['rental_device_id'])
        device_id_list.append(res['device_id'])
        os_id_list.append(res['os_id'])
        cpu_id_list.append(res['cpu_id'])
        memory_id_list.append(res['memory_id'])
        storage_type_id_list.append(res['storage_type_id'])
        storage_capacity_id_list.append(res['storage_capacity_id'])
        employee_id_list.append(res['employee_id'])
        jpns_name_list.append(res['jpns_name'])
        rental_start_date_list.append(res['rental_start_date'])
        rental_end_date_list.append(res['rental_end_date'])
    resList = {
        "rental_device_id_list": rental_device_id_list
        , "device_id_list": device_id_list
        , "os_id_list": os_id_list
        , "cpu_id_list": cpu_id_list
        , "memory_id_list": memory_id_list
        , "storage_type_id_list": storage_type_id_list
        , "storage_capacity_id_list": storage_capacity_id_list
        , "employee_id_list": employee_id_list
        , "jpns_name_list": jpns_name_list
        , "rental_start_date_list": rental_start_date_list
        , "rental_end_date_list": rental_end_date_list
    }
    return jsonify(resList)

@r_list.route('/api/resource_search', methods=["POST"])
def resource_search():
    #格納
    rental_device_id_list = []
    device_id_list = []
    os_id_list = []
    cpu_id_list = []
    memory_id_list = []
    storage_type_id_list = []
    storage_capacity_id_list = []
    employee_id_list = []
    jpns_name_list = []
    rental_start_date_list = []
    rental_end_date_list = []
    sql = text("SELECT rd.rental_device_id, rd.device_id, rd.os_id, rd.cpu_id, rd.memory_id, rd.storage_type_id, \
        rd.storage_capacity_id, rh.rental_start_date, rh.rental_end_date, rh.employee_id, emp.jpns_name FROM \
        RentalDevice rd LEFT JOIN RentalHistory rh ON rd.rental_device_id = rh.rental_device_id AND rh.rental_history_id \
        IN ( SELECT max(rh.rental_history_id) maxId FROM RentalDevice rd LEFT JOIN RentalHistory rh ON rd.rental_device_id = rh.rental_device_id \
        GROUP BY rd.rental_device_id ) LEFT JOIN Employee emp ON rh.employee_id = emp.employee_id WHERE rd.delete_flg = '0';")
    for res in session.execute(sql):
        # 検索値と等しいかチェック
        if compareSearchValue(res):
            rental_device_id_list.append(res['rental_device_id'])
            device_id_list.append(res['device_id'])
            os_id_list.append(res['os_id'])
            cpu_id_list.append(res['cpu_id'])
            memory_id_list.append(res['memory_id'])
            storage_type_id_list.append(res['storage_type_id'])
            storage_capacity_id_list.append(res['storage_capacity_id'])
            employee_id_list.append(res['employee_id'])
            jpns_name_list.append(res['jpns_name'])
            rental_start_date_list.append(res['rental_start_date'])
            rental_end_date_list.append(res['rental_end_date'])
    searchList = {
        "rental_device_id_list": rental_device_id_list
        , "device_id_list": device_id_list
        , "os_id_list": os_id_list
        , "cpu_id_list": cpu_id_list
        , "memory_id_list": memory_id_list
        , "storage_type_id_list": storage_type_id_list
        , "storage_capacity_id_list": storage_capacity_id_list
        , "employee_id_list": employee_id_list
        , "jpns_name_list": jpns_name_list
        , "rental_start_date_list": rental_start_date_list
        , "rental_end_date_list": rental_end_date_list
    }
    return jsonify(searchList)


def compareSearchValue(res):
    result = True
    #機器
    deviceId = request.json['deviceId']
    if (deviceId != '' and deviceId != res['device_id']):
        result = False
    print(result)
    #OS
    osId = request.json['osId']
    if (osId != '' and osId != res['os_id']):
        result = False
    print(result)
    #CPU
    cpuId = request.json['cpuId']
    if (cpuId != '' and cpuId != res['cpu_id']):
        result = False
    print(result)
    #メモリー
    memoryId = request.json['memoryId']
    if (memoryId != '' and memoryId != res['memory_id']):
        result = False
    print(result)
    #ストレージタイプ
    storageTypeId = request.json['storageTypeId']
    if (storageTypeId != '' and storageTypeId != res['storage_type_id']):
        result = False
    print(result)
    #ストレージ容量
    storageCapacityId = request.json['storageCapacityId']
    if (storageCapacityId != '' and storageCapacityId != res['storage_capacity_id']):
        result = False
    print(result)
    #従業員ID
    employeeId = request.json['employeeId']
    if (employeeId != '' and employeeId != res['employee_id']):
        result = False
    print(result)
    #従業員名
    jpnsName = request.json['jpnsName']
    if (jpnsName != '' and jpnsName != res['jpns_name']):
        result = False
    print(result)
    return result