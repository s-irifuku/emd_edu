#v_insert.py
#coding:UTF-8
from flask import Flask, render_template, request, Blueprint
from main import session, Employee
from validate.valid_employee import EmployeeForm
import c_branch
import c_department

#新規登録
e_insert = Blueprint('e_insert', __name__)
#登録入力処理
@e_insert.route('/employee_insert_input')
def employee_insert_input():
    form = EmployeeForm()
    return render_template("/bootstrap/employee_insert.html", form=form\
        , branch_list=c_branch.get_branch_list(), department_list=c_department.get_department_list())
#登録完了処理
@e_insert.route('/employee_insert_complete', methods=['POST'])
def employee_insert_complete():
    #バリデーションチェック
    form = EmployeeForm()
    print(form.validate_on_submit())
    if form.validate_on_submit():
        #登録できるか判定する
        #メールアドレス自動割当可能であるか
        mail_address = create_mail_address(request.form['roma_name'])
        if mail_address != '':
            #登録処理
            employee = Employee()
            employee.jpns_name = request.form['jpns_name']#従業員名
            employee.jpns_kana = request.form['jpns_kana']#よみがな
            employee.roma_name = request.form['roma_name']#name
            employee.postal_code = request.form['postal_code']#郵便番号
            employee.address = request.form['address']#住所
            employee.tel_no = request.form['tel_no']#電話番号
            employee.mail_address = mail_address#メールアドレス(自動割当)
            employee.sex = request.form['sex']#性別
            employee.birth_date = request.form['birth_date']#生年月日
            employee.final_education = request.form['final_education'] + request.form['division']#最終学歴
            employee.join_date = request.form['join_date']#入社年月日
            employee.company_mail_address = request.form['company_mail_address']#自社メールアドレス
            employee.employee_id = request.form['employee_id']#従業員ID
            employee.photo_image = request.form['photo_image']#写真イメージ
            employee.branch_id = request.form['branch_id']#支社ID
            employee.department_id = request.form['department_id']#部署ID
            session.add(employee)
            session.commit()   
            return render_template("/bootstrap/employee_list.html")
    return render_template("/bootstrap/employee_insert.html", form=form\
        , branch_list=c_branch.get_branch_list()\
        , department_list=c_department.get_department_list())



#メールアドレスを作成する
def create_mail_address(roma_name):
    #入力値(名前 苗字)を分割する
    full_name = roma_name.split(" ")
    first_name = full_name[0]
    last_name = full_name[1]
    #名前_苗字で重複判定
    for f_char in first_name:
        #候補名（名前部分）を作成
        f_user_name += f_char
        #候補ユーザー名を作成
        candidate_name = f_user_name + '-' + last_name
        #重複しているか判定
        count = session.query(Employee).filter(Employee.mail_address.like('%%%s%%' % candidate_name)).count()
        if count == 0:
            return candidate_name + '@emdes.co.jp'
    #苗字_名前で重複判定
    for l_char in first_name:
        #候補名（苗字部分）を作成
        l_user_name += l_char
        #候補ユーザー名を作成
        candidate_name = l_user_name + '_' + first_name
        #重複しているか判定
        count = session.query(Employee).filter(Employee.mail_address.like('%%%s%%' % candidate_name)).count()
        if count == 0:
            return candidate_name + '@emdes.co.jp'
    #登録エラー
    return ''

    

