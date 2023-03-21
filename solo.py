# -------------------------------
# WRITE ALL CODE FOR ONE XTX FILE
# -------------------------------

import os, shutil, mysql.connector

# - newly added .XTX files path:
dir_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files/'
# - already read .XTX files path:
move_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/done/'

# Allowed extesions list
EXTENSIONS = ('.xtx', '.Xtx', '.XTx', '.XtX', '.xTx', '.xTX', '.xtX', '.XTX')

# file name
name = 'files/s113006_2022101312.xTx'


with open(name, "r") as file:
    lines = [line.strip() for line in file]
    data_lines = [lines[1],lines[2],lines[3],lines[-1],lines[-2]]
    imp_info = [item.split(" ") for item in data_lines]
    # Device information
    dev_data = [imp_info[0][1],imp_info[1][4]]
    # Measurement data
    mes_data = [imp_info[-2],imp_info[-1]]


print(dev_data)
print("Mérőhely azonosító: ", dev_data[0], ", Műszer gyári szám: ", dev_data[1])
print(mes_data)

# Creates date from the given numbers
from datetime import datetime
date_str = mes_data[0][2] + mes_data[0][3]
date_obj = datetime.strptime(date_str, '%y%m%d%H')

print(date_obj)



# -------------------------------------------------------------------
'''
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
        return db
    else:
        return print("Database connection failed!")
'''   
    
    
'''
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



sql = "INSERT INTO Student (Name, Roll_no) VALUES (%s, %s)"
val = ("Ram", "85")
cursor.execute(sql, val)
db.commit()


# WRITES OUT WHAT IN DB
sql = "SELECT * FROM testFirst"
cur.execute(sql)
myresult = cur.fetchall()
for x in myresult:
    print (x)
#Closing connection from server
db.close()
cur.close()

'''


