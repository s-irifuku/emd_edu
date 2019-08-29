#c_resource.py
#coding:UTF-8
from main import session, Device, OS, CPU, Memory, StorageType, StorageCapacity

#[(機器ID, 機器名)]を返す
def load_device():
    device_list = []
    for (id, name) in session.query(Device.device_id, Device.device_name):
        device_list.append({'id': id, 'name': name})
    return device_list
#[(OSID, OS名)]を返す
def load_os():
    os_list = []
    for (id, name) in session.query(OS.os_id, OS.os_name):
        os_list.append({'id': id, 'name': name})
    return os_list
#[(CPUID, CPUコア)]を返す
def load_cpu():
    cpu_list = []
    for (id, core) in session.query(CPU.cpu_id, CPU.cpu_core):
        cpu_list.append({'id': id, 'core': core})
    return cpu_list
#[(メモリーID, メモリーギガ)]を返す
def load_memory():
    memory_list = []
    for (id, gbyte) in session.query(Memory.memory_id, Memory.memory_gbyte):
        memory_list.append({'id': id, 'gbyte': gbyte})
    return memory_list
#[(ストレージタイプID, ストレージタイプ名)]を返す
def load_storage_type():
    storage_type_list = []
    for (id, name) in session.query(StorageType.storage_type_id, StorageType.storage_type_name):
        storage_type_list.append({'id': id, 'name': name})
    return storage_type_list
#[(ストレージ容量ID, ストレージ容量ギガ)]を返す
def load_storage_capacity():
    storage_capacity_list = []
    for (id, gbyte) in session.query(StorageCapacity.storage_capacity_id, StorageCapacity.storage_capacity_gbyte):
        storage_capacity_list.append({'id': id, 'gbyte': gbyte})
    return storage_capacity_list









