
import os

# Folder of .XTX files goes here
dir_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files'
# 
extensions = ['.xtx', '.xTx', '.XTX']
extension = extensions[1]
extent = extensions[0]

# XTX FÁJLOK SZÁMA
def getNumOfXtxFiles(path):    
    # get a list of all files in the directory
    files = os.listdir(dir_path)
    # count the number of files with the specified extension
    num_files = sum(1 for file in files if file.endswith(extension))
    return num_files

print(getNumOfXtxFiles(dir_path))


# XTX FÁJLOK NEVE
files = os.listdir(dir_path)
# list out the names of all the files with the specified extension
xtx_files = [file for file in files if file.endswith(extent) or file.endswith(extension)]
# print the names of the .txt files
xtx_name = []
for file in xtx_files:
    xtx_name.append(file)

print(xtx_name)




# serves as a "ls -al" terminal command  
#files = os.listdir(folder_path)
# gives us just the number of files
#num_files = len(files)


'''
# OLVASÁS RÉSZE
with open('files/test.xtx', "r") as f:
    lines = f.read().split("\n")
    blocks = []
    current_block = []
    for line in lines:
        if line.strip() == "":
            # Reached end of block, append current block to blocks list
            blocks.append(current_block)
            current_block = []
        else:
            # Add line to current block
            current_block.append(line)
    # Append final block to blocks list
    blocks.append(current_block)


 # Print each block
    for i, block in enumerate(blocks):
        print(f"Block {i+1}:")
        for line in block:
            print(line)
        print() # Print a blank line between blocks

# prints the first line of the block
print(current_block[0])
'''