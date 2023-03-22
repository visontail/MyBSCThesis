

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


# - newly added .XTX files path:
file_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files/'

filename = file_path + 'test.xtx'

file = FileReader(filename)

d = file.read_file()



print(d)

