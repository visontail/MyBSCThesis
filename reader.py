
import os

dir_fd = os.open('test.xtx', os.O_RDONLY)

def opener(path, flags):
    return os.open(path, flags, dir_fd=dir_fd)

os.close(dir_fd)  # don't leak a file descriptor


'''with open("test.xtx", "r") as f:
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
'''
