

# Class for 
class DirReader():
    def __init__(self, path: str):
        self.path = path
    
    def read_dir(self, ext: tuple):
        # list out .xtx file names in given directory 
        # CODE HERE
        pass
    
# Class for
class FileReader():
    def __init__(self,name: str):
        self.name = name
    
    def read_file(self):
        lines = []
        with open(filename, "r", encoding='utf-8') as file:
            for line in file:
                info = line.strip().split()
                lines.append(info)

        data = [
            lines[1][1], lines[2][4],
            lines[3][1], lines[3][2], lines[3][3], lines[3][4],
            lines[-2][0], lines[-2][4], lines[-2][5], lines[-2][6], lines[-2][7], lines[-2][8],
            lines[-1][0], lines[-1][4], lines[-1][5], lines[-1][6], lines[-1][7], lines[-1][8],
        ]
        return data
    


# Class for
class DB():
    # CODE HERE
    pass


# FILE GATHERING PART
'''
def getXtx(path):
    # - scan all files in the directory
    with os.scandir(path) as dir_entries:
        # - use a list comprehension to filter the files by extension
        xtx_files = [path + entry.name for entry in dir_entries if entry.name.endswith(EXTENSIONS)]
    # - return the number and names of the XTX files
    return len(xtx_files), xtx_files

# 'n' is the sum of xtx files & 'name' is the list of xtx files' name
n, xtx_names = getXtx(dir_path)
'''


"""
MAYBE CREATE A DECORATER FOR IT

move after read and post in db

todo - create a def moveXtx( post to db was successfull )

new_xtx_path = move_path + xtx_names[1].split("/")[-1]
shutil.move(xtx_names[1], new_xtx_path)

returns a boolean done it or not 
if not error message 

"""

# - newly added .XTX files path:
file_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files/'

filename = file_path + 'test.xtx'

file = FileReader(filename)

d = file.read_file()



print(d)

