import os
from datetime import datetime
import shutil

def readDirectory(path: str, ext: tuple):
    """Reads directory and lists out all file names with .xtx extensions
    Args:
            path (string): path to the directory where files which you want to read are
            ext (tuple): desired file extensions which the filtering will be done
    """    
    # - scan all files in the directory
    with os.scandir(path) as dir_entries:
        # - use a list comprehension to filter the files by extension
        file_names = [path + entry.name for entry in dir_entries if entry.name.endswith(ext)]
    # - return the number and names of the XTX files
    return file_names
def moveFile(name, path):
    """Moves the already read files from one folder to another
    Args:
            name (string): file name which is already read in by the application
            path (string): directory path where to read files will be moved
    """
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
    """Class for File's name"""
    def __init__(self, name: str):
        self._name = name
    # - getter
    @property
    def file_name(self):
        """Getter"""
        return self._name
    # - setter
    @file_name.setter
    def file_name(self, value):
        """Setter"""
        self._name = value
    # -  deleter
    @file_name.deleter
    def file_name(self):
        """Deleter"""
        del self._name
    def read_file(self):
        """Read files, sorts out information for database and returns sorted measuring data"""
        lines = []
        # - reading file
        with open(self._name, "r", encoding='utf-8') as file:
            for line in file:
                info = line.strip().split()
                lines.append(info)
        # - sorting information
        meas_name = lines[1][1]
        meas_time = [
                datetime.strptime(lines[3][1], '%Y%m%d%H%M%S').strftime('%Y-%m-%d %H:%M:%S'),
                datetime.strptime(lines[3][2], '%H%M%S').strftime('%H:%M:%S'),
                datetime.strptime(lines[3][4], '%H%M%S').strftime('%H:%M:%S'),
                ]
        meas = [ lines[-2][6], lines[-2][7], lines[-2][8], lines[-1][6], lines[-1][7], lines[-1][8] ]
        # - returning a list
        return meas_name, meas_time, meas

