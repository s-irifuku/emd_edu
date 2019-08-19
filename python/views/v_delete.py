#v_delete.py
#coding:UTF-8
from flask import Flask, render_template, Blueprint, redirect
from main import session, Employee

#削除
e_delete = Blueprint('e_delete', __name__)
@e_delete.route('/employee_delete/<id>')
def employee_delete(id):    
    session.query(Employee).filter(Employee.employee_id == id).delete()
    session.commit
    return redirect('/employee_list')