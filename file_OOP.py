
# !!!!!! Delete it when finish !!!!!!
import os
EXTENSIONS = ('.xtx', '.Xtx', '.XTx', '.XtX', '.xTx', '.xTX', '.xtX', '.XTX')
dir_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files/'
# !!!!!! !!!!!!

# Function for listing out .xtx file names
def readDirectory(path: str, ext: tuple):
    # - scan all files in the directory
    with os.scandir(path) as dir_entries:
        # - use a list comprehension to filter the files by extension
        xtx_files = [path + entry.name for entry in dir_entries if entry.name.endswith(ext)]
    # - return the number and names of the XTX files
    return xtx_files

"""
test = readDirectory(dir_path, EXTENSIONS)
print(test)
"""

# Class for xTx Files
class File():
    def __init__(self, name: str):
        self._name = name
    # - getter
    @property
    def file_name(self):
        print("YESS")
        return self._name
    # - setter
    @file_name.setter
    def file_name(self, value):
        print(f'"{self._name}" is now "{value}"')
        self._name = value
    # -  deleter
    @file_name.deleter
    def file_name(self):
        print(f'"{self._name}" was deleted')
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
        data = [
            lines[1][1], lines[2][4],
            lines[3][1], lines[3][2], lines[3][3], lines[3][4],
            lines[-2][0], lines[-2][4], lines[-2][5], lines[-2][6], lines[-2][7], lines[-2][8],
            lines[-1][0], lines[-1][4], lines[-1][5], lines[-1][6], lines[-1][7], lines[-1][8],
        ]
        # - returning a list
        return data


"""    
file = File(test[0])
print(file)
print(file.file_name)
file.file_name = test[1]
del file.file_name
"""



