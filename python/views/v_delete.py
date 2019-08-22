#v_delete.py
#coding:UTF-8
from flask import Flask, Blueprint
from main import session, Employee

#削除
e_delete = Blueprint('e_delete', __name__)
@e_delete.route('/api/employee_delete/<id>', methods=['DELETE'])
def employee_delete(id):    
    session.query(Employee).filter(Employee.employee_id == id).delete()
    session.commit()
    session.close()
    return ''