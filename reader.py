
import os

# Folder of .XTX files goes here
fpath = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files'

def getNumberOfFiles(path):
    num_files = len(os.listdir(path))
    return num_files

n = getNumberOfFiles(fpath)


files = getNumberOfFiles(fpath)
file_names = []
for file_names in range(n):
    file_names = os.listdir(fpath)
print(file_names)




# serves as a "ls -al" terminal command  
#files = os.listdir(folder_path)
# gives us just the number of files
#num_files = len(files)



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
