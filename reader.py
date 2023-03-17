import os


# Folder of .XTX files goes here
dir_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files'
# Allowed extesions list
EXTENSIONS = ('.xtx', '.Xtx', '.XTx', '.XtX', '.xTx', '.xTX', '.xtX', '.XTX')

# FILE GATHERING PART


# !!!!!! todo combine the two get def into one which returns num, and names
def getNumOfXtxFiles(path):    
    # get a list of all files in the directory
    files = os.listdir(path)
    # count the number of files with the specified extension
    num_files = sum(1 for file in files if file.endswith(EXTENSIONS))
    return num_files


def getNamesOfXtxFiles(path):
    files = os.listdir(path)
    # list out the names of all the files with the specified extension
    xtx_name = [file for file in files if file.endswith(EXTENSIONS)]
    return xtx_name


# !!!!! todo for loop for file names

# ez lesz a ciklus max lépésszám
n = getNumOfXtxFiles(dir_path)
# ezek lesznek a nevek folyamatosan
name = 'files/' + (getNamesOfXtxFiles(dir_path)[0])

print(n)
print(name)

# READING PART
def readFile(name):
    with open(name, "r") as file:
        # read the file line by line
        data = [line.rstrip() for line in file]
    return data

print(readFile(name))
