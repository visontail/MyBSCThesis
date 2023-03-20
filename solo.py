# -------------------------------
# WRITE ALL CODE FOR ONE XTX FILE
# -------------------------------

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

def readXtx(n, names):
    # - use a list comprehension to create n empty lists
    xtx_lists = [[] for i in range(n)]
    # - iterate over the file names and read each file into a separate list
    for i, name in enumerate(names):
        with open(name, 'r') as file:
            # - use a list comprehension to read the file into a list of lines
            lines = [line.strip() for line in file]
            # - add the lines to the corresponding list
            xtx_lists[i] = lines
    return xtx_lists

print(readXtx(n,xtx_names)[0])
print("---")
print(readXtx(n,xtx_names)[0][1].split(' '))
print(readXtx(n,xtx_names)[0][2].split(' '))
print(readXtx(n,xtx_names)[0][3].split(' '))
print(readXtx(n,xtx_names)[0][-2].split(' '))
print(readXtx(n,xtx_names)[0][-1].split(' '))
print("---")
print(readXtx(n,xtx_names)[1])
print("----")
print(readXtx(n,xtx_names)[2])



"""
MAYBE CREATE A DECORATER FOR IT
move after read and post in db
todo - create a def moveXtx( post to db was successfull )
returns a boolean done it or not 
if not error message 

new_xtx_path = move_path + xtx_names[1].split("/")[-1]
shutil.move(xtx_names[1], new_xtx_path)
"""

# Importing module
import mysql.connector

#Create database connection
def conn_DB():
    # Creating connection object
    db = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "",
        database = 'VeloClass'
    )
    # check if connection is established
    if db.is_connected():
        print("Database connection established successfully!")
        return db
    else:
        print("Database connection failed!")
        return None

def create_Cursor(db):
    if db:
        cursor = db.cursor()
        return cursor
    else:
        print("Failed to establish database connection.")
        return None
    
db = conn_DB()
cur = create_Cursor(db)


# SQL Query
sql_query = "INSERT INTO `testFirst`( `Date`, `Traffic`, `Value`) VALUES ('2023.01.01','1','1')"
# Execute the given sql query
cmmd = cur.execute(sql_query)
# Commit to DB
db.commit()

# Print out how many was inserted
print(cur.rowcount, "details inserted")

'''
sql = "INSERT INTO Student (Name, Roll_no) VALUES (%s, %s)"
val = ("Ram", "85")
cursor.execute(sql, val)
db.commit()
'''

# WRITES OUT WHAT IN DB
sql = "SELECT * FROM testFirst"
cur.execute(sql)
myresult = cur.fetchall()
for x in myresult:
    print (x)


#Closing connection from server
db.close()
cur.close()