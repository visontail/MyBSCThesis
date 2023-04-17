import os
from datetime import datetime
import shutil

# Function for listing out .xtx file names
def readDirectory(path: str, ext: tuple):
    # - scan all files in the directory
    with os.scandir(path) as dir_entries:
        # - use a list comprehension to filter the files by extension
        file_names = [path + entry.name for entry in dir_entries if entry.name.endswith(ext)]
    # - return the number and names of the XTX files
    return file_names
# Function for moving the file after done reading and uploading
def moveFile(name, path):
    # - create new path
    new_file_path = path + name.split("/")[-1]
    # - move file
    move_dest = shutil.move(name, new_file_path)
    # - check if file is moved or not
    if (new_file_path != move_dest):
        return False
    else:
        return True

# Class for xTx Files
class File():
    def __init__(self, name: str):
        self._name = name
    # - getter
    @property
    def file_name(self):
        return self._name
    # - setter
    @file_name.setter
    def file_name(self, value):
        self._name = value
    # -  deleter
    @file_name.deleter
    def file_name(self):
        print('file name is deleted')
        del self._name

    # Function to read file's content
    def read_file(self):
        lines = []
        # - reading file
        with open(self._name, "r", encoding='utf-8') as file:
            for line in file:
                info = line.strip().split()
                lines.append(info)
        # - sorting information
        meas_name = lines[1][1]
        meas_time = [
                datetime.strptime(lines[3][1] + lines[3][2], '%Y%m%d%H%M%S').strftime('%Y-%m-%d %H:%M:%S'),
                datetime.strptime(lines[3][3] + lines[3][4], '%Y%m%d%H%M%S').strftime('%Y-%m-%d %H:%M:%S') 
                ]
        data_01 = [ lines[-2][5], lines[-2][4], lines[-2][6], lines[-2][7], lines[-2][8] ]
        data_02 = [ lines[-1][5], lines[-1][4], lines[-1][6], lines[-1][7], lines[-1][8] ]
        # - returning a list
        return meas_name, meas_time, data_01, data_02