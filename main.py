import os, shutil


# - newly added .XTX files path:
dir_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files/'
# - already read .XTX files path:
move_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/done/'
# Allowed extesions list
EXTENSIONS = ('.xtx', '.Xtx', '.XTx', '.XtX', '.xTx', '.xTX', '.xtX', '.XTX')

# FILE GATHERING PART

def getXtx(path):
    # - scan all files in the directory
    with os.scandir(path) as dir_entries:
        # - use a list comprehension to filter the files by extension
        xtx_files = [path + entry.name for entry in dir_entries if entry.name.endswith(EXTENSIONS)]
    # - return the number and names of the XTX files
    return len(xtx_files), xtx_files

# 'n' is the sum of xtx files & 'name' is the list of xtx files' name
n, xtx_names = getXtx(dir_path)


"""
MAYBE CREATE A DECORATER FOR IT

move after read and post in db

todo - create a def moveXtx( post to db was successfull )

new_xtx_path = move_path + xtx_names[1].split("/")[-1]
shutil.move(xtx_names[1], new_xtx_path)

returns a boolean done it or not 
if not error message 

"""