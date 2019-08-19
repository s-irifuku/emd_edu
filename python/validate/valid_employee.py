#v_employee.py
#coding:UTF-8
from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, ValidationError
from c_branch import Branch_Enum
from c_department import Department_Enum
import re

#バリデーションフォーム
#従業員バリデーション
class EmployeeForm(FlaskForm):
    jpns_name = StringField("従業員名")
    jpns_kana = StringField("よみがな")
    roma_name = StringField("ローマ字")
    postal_code = StringField("郵便番号")
    address = StringField("住所")
    tel_no = StringField("電話番号")
    mail_address = StringField("メールアドレス")
    sex = RadioField("性別", choices=[('1', '男性'), ('2', '女性')])
    birth_date = StringField("生年月日")
    final_education = StringField("最終学歴")
    join_date = StringField("入社年月日")
    company_mail_address = StringField("自社メールアドレス")
    employee_id = StringField("ID")
    photo_image = StringField("写真イメージ")
    branch_id = StringField("支店ID")
    department_id = StringField("部署ID")

    def validate_jpns_name(self, jpns_name):
        #必須入力
        if jpns_name.data == '':
            raise ValidationError("氏名を入力して下さい")

    def validate_jpns_kana(self, jpns_kana):
        #必須入力
        if jpns_kana.data == '':
            raise ValidationError("よみがなを入力して下さい")
    """
    def validate_roma_name(self, roma_name):
        #必須入力
        if roma_name.data == '':
            raise ValidationError("ローマ字を入力して下さい")
        #アルファベット小文字
        if (roma_name.data.isalpha() and roma_name.data.islower()):
            raise ValidationError("アルファベット小文字で入力して下さい")
        #"first last"形式であるか
        full_name = roma_name.data.split(" ")
        if (len(full_name) != 2):
            raise ValidationError("first last形式で入力して下さい")

    
    def validate_postal_code(self, postal_code):
        #必須入力
        if postal_code.data == '':
            raise ValidationError("郵便番号を入力して下さい")
        #フォーマット(000-0000)であること
        if not re.match(r'[0-9]{3}-[0-9]{4}', postal_code.data):
            raise ValidationError("000-0000形式で入力して下さい")
    
    def validate_address(self, address):
        #必須入力
        if address.data == '':
            raise ValidationError("住所を入力して下さい")
    
    def validate_tel_no(self, tel_no):
        #必須入力
        if tel_no.data == '':
            raise ValidationError("電話番号を入力して下さい")
        #フォーマット(メールアドレス)であること
        if not re.match(r'[0-9]{2}-[0-9]{4}-[0-9]{4}', tel_no.data):
            raise ValidationError("00-0000-0000形式で入力して下さい")
    
    def validate_mail_address(self, mail_address):
        #フォーマット(メールアドレス)であること
        if (mail_address.data != '') and (not re.match(r'^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$', mail_address.data)):
            raise ValidationError("メールアドレス形式で入力して下さい")
    
    def validate_sex(self, sex):
        #必須入力
        if sex.data == '':
            raise ValidationError("性別を入力して下さい")
        #フォーマット(0:男性、1:女性)であること
        if not re.match(r'[0|1]', sex.data):
            raise ValidationError("どちらかを選択して下さい")
    
    def validate_birth_date(self, birth_date):
        #必須入力
        if birth_date.data == '':
            raise ValidationError('生年月日を入力して下さい')
        #フォーマット(yyyy-mm-dd)であること
        if not re.match(r'^\d{4}-\d{1,2}-\d{1,2}$', birth_date.data):
            raise ValidationError('yyyy-mm-dd形式で入力して下さい')
    
    def validate_final_education(self, final_education):
        #必須入力
        if final_education.data == '':
            raise ValidationError('最終学歴を入力して下さい')
        #フォーマット(卒業、中退、在学中のいずれかであること)
        if not re.search('(卒業|中退|在学中)$', final_education.data + request.form['division']):
            raise ValidationError('卒業、中退、在学中のいずれかを選択して下さい')

    def validate_join_date(self, join_date):
        #必須入力
        if join_date.data == '':
            raise ValidationError('入社年月日を入力して下さい')
        #フォーマット(yyyy-mm-dd)であること
        if not re.match(r'^\d{4}-\d{1,2}-\d{1,2}$', join_date.data):
            raise ValidationError('yyyy-mm-dd形式で入力して下さい')
    
    def validate_company_mail_address(self, company_mail_address):
        #必須入力
        if company_mail_address.data == '':
            raise ValidationError('自社メールアドレスを入力して下さい')
        #フォーマット(aaa@emdes.co.jp)であること
        if not re.match(r'^\w+([-+.]\w+)*@emdes.co.jp$', company_mail_address.data):
            raise ValidationError('aaa@emdes.co.jp形式で入力して下さい')
    
    def validate_employee_id(self, employee_id):
        #必須入力
        if employee_id.data == '':
            raise ValidationError('従業員IDを入力して下さい')
        #フォーマット
        if not re.match('^emd[0-9]{10}$', employee_id.data):
            raise ValidationError('emd0123456789形式で入力して下さい')
    
    def validate_photo_image(self, photo_image.data):
        #必須入力
        if photo_image.data == '':
            raise ValidationError('写真イメージをアップロードして下さい')

    
    def validate_branch_id(self, branch_id):
        #必須入力
        if branch_id.data == '':
            raise ValidationError('支店を選択して下さい')

    
    def validate_department_id(self, department_id):
        #必須入力
        if department_id.data == '':
            raise ValidationError('部署を選択して下さい')
        #相対
        elif request.form['branch_id'] != '':
            req_branch_id = request.form['branch_id']
            req_department_id = request.form['department_id']
            #東京支店
            if req_branch_id == Branch_Enum.tokyo.value\
                and req_department_id != (
                    Department_Enum.si_div.value
                    or Department_Enum.syozai_div.value
                    or Department_Enum.jutaku_div.value
                    or Department_Enum.eigyo_div.value
                ):
                raise ValidationError('東京支店は、SI事業部、新規商材開発事業部、\
                    受託開発事業部、営業部のいずれかを選択して下さい')
            #東北支店
            elif req_branch_id == Branch_Enum.tohoku.value\
                and req_department_id != (
                    Department_Enum.jutaku_div.value
                ):
                raise ValidationError('東北支店は、受託開発事業部のみ選択可能です')
            #東海支店
            elif req_branch_id == Branch_Enum.tokai.value\
                and req_department_id != (
                    Department_Enum.kumikomi_div.value
                    or Department_Enum.si_div.value
                    or Department_Enum.somu_div.value
                    or Department_Enum.eigyo_div.value
                ):
                raise ValidationError('東海支店は、組み込み開発事業部、SI事業部、総務部\
                    営業部のいずれかを選択して下さい')
    """