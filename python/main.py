#main.py
#coding:UTF-8
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from flask import Flask

#データベース接続
url = 'mysql+pymysql://testUser:testPassword@localhost/test'
engine = create_engine(url)
Base = declarative_base()
#従業員
class Employee(Base):
    __tablename__ = 'Employee'
    jpns_name = Column(String)#従業員名
    jpns_kana = Column(String)#よみがな
    roma_name = Column(String)#name
    postal_code = Column(String)#郵便番号
    address = Column(String)#住所
    tel_no = Column(String)#電話番号
    mail_address = Column(String)#メールアドレス
    sex = Column(String)#性別
    birth_date = Column(String)#生年月日
    final_education = Column(String)#最終学歴
    join_date = Column(String)#入社年月日
    company_mail_address = Column(String)#自社メールアドレス
    employee_id = Column(String, primary_key=True)#従業員ID
    photo_image = Column(String)#写真イメージ
    branch_id = Column(String)#支店ID
    department_id = Column(String)#部署ID
    def __repr__(self):
        return "<Employee(\
            jpns_name='%s'\
            , jpns_kana='%s'\
            , roma_name='%s'\
            , postal_code='%s'\
            , address='%s'\
            , tel_no='%s'\
            , mail_address='%s'\
            , sex='%s'\
            , birth_date='%s'\
            , final_education='%s'\
            , join_date='%s'\
            , company_mail_address='%s'\
            , employee_id='%s'\
            , photo_image='%s'\
            , branch_id='%s'\
            , department_id='%s'\
        >" %(\
            self.jpns_name\
            , self.jpns_kana\
            , self.roma_name\
            , self.postal_code\
            , self.address\
            , self.tel_no\
            , self.mail_address\
            , self.sex\
            , self.birth_date\
            , self.final_education\
            , self.join_date\
            , self.company_mail_address\
            , self.employee_id\
            , self.photo_image\
            , self.branch_id\
            , self.department_id\
        )
#支店
class Branch(Base):
    __tablename__ = 'Branch'
    branch_id = Column(String, primary_key=True)#支店ID
    branch_name = Column(String)#支店名
    def __repr__(self):
        return "<Branch(\
            branch_id='%s'\
            , branch_name='%s'\
        >" %(\
            self.branch_id\
            , self.branch_name\
        )
#部署
class Department(Base):
    __tablename__ = 'Department'
    department_id = Column(String, primary_key=True)#部署ID
    department_name = Column(String)#部署名
    def __repr__(self):
        return "<Department(\
            department_id='%s'\
            , department_name='%s'\
        >" %(\
            self.department_id\
            , self.department_name\
        )
Base.metadata.create_all(engine)
#セッションの作成
Session = sessionmaker(bind=engine)
session = Session()

if __name__ == '__main__':
    #WEBアプリケーション設定
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "secret_key"
    app.config['JSON_AS_ASCII'] = False
    #コントローラー?view?
    from views import v_master, v_list, v_detail, v_insert, v_update, v_delete
    app.register_blueprint(v_master.e_master)#マスタ情報
    app.register_blueprint(v_list.e_list)#一覧表示
    app.register_blueprint(v_detail.e_detail)#詳細表示    
    app.register_blueprint(v_insert.e_insert)#新規登録
    app.register_blueprint(v_update.e_update)#更新    
    app.register_blueprint(v_delete.e_delete)#削除
    #webサーバー立ち上げ
    app.run(debug=True, host='0.0.0.0', port=8080)
