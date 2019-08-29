#main.py
#coding:UTF-8
from sqlalchemy import create_engine, Column, Integer, String, Date
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
    e_id = Column(Integer, primary_key=True, autoincrement=True)#ID
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
    education_division = Column(String)#卒業区分
    join_date = Column(String)#入社年月日
    company_mail_address = Column(String)#自社メールアドレス
    employee_id = Column(String)#従業員ID
    photo_image = Column(String)#写真イメージ
    branch_id = Column(String)#支店ID
    department_id = Column(String)#部署ID
    def __repr__(self):
        return "<Employee(\
            e_id='%s'\
            , jpns_name='%s'\
            , jpns_kana='%s'\
            , roma_name='%s'\
            , postal_code='%s'\
            , address='%s'\
            , tel_no='%s'\
            , mail_address='%s'\
            , sex='%s'\
            , birth_date='%s'\
            , final_education='%s'\
            , education_division='%s'\
            , join_date='%s'\
            , company_mail_address='%s'\
            , employee_id='%s'\
            , photo_image='%s'\
            , branch_id='%s'\
            , department_id='%s'\
        >" %(\
            self.e_id\
            , self.jpns_name\
            , self.jpns_kana\
            , self.roma_name\
            , self.postal_code\
            , self.address\
            , self.tel_no\
            , self.mail_address\
            , self.sex\
            , self.birth_date\
            , self.final_education\
            , self.education_division\
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
#機器
class Device(Base):
    __tablename__ = 'Device'
    device_id = Column(String, primary_key=True)#機器ID
    device_name = Column(String)#機器名
    def __repr__(self):
        return "<Device(\
            device_id='%s'\
            , device_name='%s'\
        >" %(\
            self.device_id\
            , self.device_name\
        )
#OS
class OS(Base):
    __tablename__ = 'OS'
    os_id = Column(String, primary_key=True)#OSID
    os_name = Column(String)#OS名
    def __repr__(self):
        return "<OS(\
            os_id='%s'\
            , os_name='%s'\
        >" %(\
            self.os_id\
            , self.os_name\
        )
#CPU
class CPU(Base):
    __tablename__ = 'CPU'
    cpu_id = Column(String, primary_key=True)#CPUID
    cpu_core = Column(Integer)#CPU名
    def __repr__(self):
        return "<CPU(\
            cpu_id='%s'\
            , cpu_core='%s'\
        >" %(\
            self.cpu_id\
            , self.cpu_core\
        )
#Memory
class Memory(Base):
    __tablename__ = 'Memory'
    memory_id = Column(String, primary_key=True)#メモリーID
    memory_gbyte = Column(Integer)#メモリーギガバイト
    def __repr__(self):
        return "<Memory(\
            memory_id='%s'\
            , memory_gbyte='%s'\
        >" %(\
            self.memory_id\
            , self.memory_gbyte\
        )
#StorageType
class StorageType(Base):
    __tablename__ = 'StorageType'
    storage_type_id = Column(String, primary_key=True)#StorageTypeID
    storage_type_name = Column(String)#StorageType名
    def __repr__(self):
        return "<StorageType(\
            storage_type_id='%s'\
            , storage_type_name='%s'\
        >" %(\
            self.storage_type_id\
            , self.storage_type_name\
        )
#StorageCapacity
class StorageCapacity(Base):
    __tablename__ = 'StorageCapacity'
    storage_capacity_id = Column(String, primary_key=True)#StorageCapacityID
    storage_capacity_gbyte = Column(Integer)#StorageCapacityギガバイト
    def __repr__(self):
        return "<StorageCapacity(\
            storage_capacity_id='%s'\
            , storage_capacity_gbyte='%s'\
        >" %(\
            self.storage_capacity_id\
            , self.storage_capacity_gbyte\
        )
#貸出機器
class RentalDevice(Base):
    __tablename__ = 'RentalDevice'
    rental_device_id = Column(Integer, primary_key=True)
    device_id = Column(String)
    os_id = Column(String)
    cpu_id = Column(String)
    memory_id = Column(String)
    storage_type_id = Column(String)
    storage_capacity_id = Column(String)
    delete_flg = Column(String)
    def __repr__(self):
        return "<RentalDevice(\
            rental_device_id='%s'\
            , device_id='%s'\
            , os_id='%s'\
            , cpu_id='%s'\
            , memory_id='%s'\
            , storage_type_id='%s'\
            , storage_capacity_id='%s'\
            , delete_flg='%s'\
        >" %(\
            self.rental_device_id\
            , self.device_id\
            , self.os_id\
            , self.cpu_id\
            , self.memory_id\
            , self.storage_type_id\
            , self.storage_capacity_id\
            , self.delete_flg\
        )
#貸出履歴
class RentalHistory(Base):
    __tablename__ = 'RentalHistory'
    rental_history_id = Column(Integer, primary_key=True)
    rental_device_id = Column(String)
    employee_id = Column(String)
    rental_start_date = Column(Date)
    rental_end_date = Column(Date)
    def __repr__(self):
        return "<RentalHistory(\
            rental_history_id='%s'\
            , rental_device_id='%s'\
            , employee_id='%s'\
            , rental_start_date='%s'\
            , rental_end_date='%s'\
        >" %(\
            self.rental_history_id\
            , self.rental_device_id\
            , self.employee_id\
            , self.rental_start_date\
            , self.rantal_end_date\
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
    app.register_blueprint(v_list.r_list)#一覧表示
    app.register_blueprint(v_insert.r_insert)#新規登録
    app.register_blueprint(v_list.r_delete)#一覧表示
    app.register_blueprint(v_update.r_update)#更新
    #webサーバー立ち上げ
    app.run(debug=True, host='0.0.0.0', port=8080)
