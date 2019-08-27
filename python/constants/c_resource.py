#c_resource.py
#coding:UTF-8
from main import session, Device, OS, CPU, Memory, StorageType, StorageCapacity

#{id_list:[機器ID], name_list:[機器名]}形式の辞書を返す
def get_device_of_dictionary():
    id_list = []
    name_list = []
    for (id, name) in session.query(Device.device_id, Device.device_name):
        id_list.append(id)
        name_list.append(name)
    return {'id_list': id_list, 'name_list': name_list}
#{id_list:[OSID], name_list:[OS名]}形式の辞書を返す
def get_os_of_dictionary():
    id_list = []
    name_list = []
    for (id, name) in session.query(OS.os_id, OS.os_name):
        id_list.append(id)
        name_list.append(name)
    return {'id_list': id_list, 'name_list': name_list}
#{id_list:[CPUID], core_list:[CPUコア]}形式の辞書を返す
def get_cpu_of_dictionary():
    id_list = []
    core_list = []
    for (id, core) in session.query(CPU.cpu_id, CPU.cpu_core):
        id_list.append(id)
        core_list.append(core)
    return {'id_list': id_list, 'core_list': core_list}
#{id_list:[メモリーID], gbyte_list:[メモリーギガ]}形式の辞書を返す
def get_memory_of_dictionary():
    id_list = []
    gbyte_list = []
    for (id, gbyte) in session.query(Memory.memory_id, Memory.memory_gbyte):
        id_list.append(id)
        gbyte_list.append(gbyte)
    return {'id_list': id_list, 'gbyte_list': gbyte_list}
#{id_list:[ストレージタイプID], name_list:[ストレージタイプ名]}形式の辞書を返す
def get_storage_type_of_dictionary():
    id_list = []
    name_list = []
    for (id, name) in session.query(StorageType.storage_type_id, StorageType.storage_type_name):
        id_list.append(id)
        name_list.append(name)
    return {'id_list': id_list, 'name_list': name_list}
#{id_list:[ストレージ容量ID], gbyte_list:[ストレージ容量ギガ]}形式の辞書を返す
def get_storage_capacity_of_dictionary():
    id_list = []
    gbyte_list = []
    for (id, gbyte) in session.query(StorageCapacity.storage_capacity_id, StorageCapacity.storage_capacity_gbyte):
        id_list.append(id)
        gbyte_list.append(gbyte)
    return {'id_list': id_list, 'gbyte_list': gbyte_list}











