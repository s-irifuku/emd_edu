#v_delete.py
#coding:UTF-8
from flask import Flask, Blueprint
from main import session, Employee, RentalDevice

#削除
e_delete = Blueprint('e_delete', __name__)
@e_delete.route('/api/employee_delete/<id>', methods=['DELETE'])
def employee_delete(id):    
    session.query(Employee).filter(Employee.employee_id == id).delete()
    session.commit()
    session.close()
    return ''

#論理削除
r_delete = Blueprint('r_delete', __name__)
@r_delete.route('/api/resource_delete/<id>', methods=['DELETE'])
def resource_delete(id):    
    logic_delete_res = session.query(RentalDevice).filter(RentalDevice.rental_device_id == id).first()
    logic_delete_res.delete_flg = '1'
    session.commit()
    session.close()
    return ''