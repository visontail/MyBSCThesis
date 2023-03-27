
# importing 'file_OOP' py file as 'fc' refering to File Class
import file_OOP as fc
# importing 'database' py file as 'db'
import database as db

# - newly added .XTX files path:
dir_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files/'
# - already read .XTX files path:
move_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/done/'
# - allowed extesions:
EXTENSIONS = ('.xtx', '.Xtx', '.XTx', '.XtX', '.xTx', '.xTX', '.xtX', '.XTX')



def main():
    xtx_names = fc.readDirectory(dir_path, EXTENSIONS)
    #for xtx in xtx_names:
    #data = fc.File(xtx).read_file()
    data = fc.File(xtx_names[0]).read_file()
    print(data) 


    
    
"""    
 - set first name 
file = File(test[0])
print(file)
print(file.file_name)
 - add new file name
file.file_name = test[1]
 - del file name
del file.file_name
"""    
    
    
# db connection    
database = db.DataBase(host="localhost", username="root", password="", database="VeloClass")
database.connect()
    
"""
# SQL Query
sql_query = "INSERT INTO `testFirst`( `Date`, `Traffic`, `Value`) VALUES ('2023.01.01','1','1')"
db.execute_q(sql_query)
db.check()

# Print out how many was inserted
print(cur.rowcount, "details inserted")

# Insert with value 
sql = "INSERT INTO Student (Name, Roll_no) VALUES (%s, %s)"
val = ("Ram", "85")
cursor.execute(sql, val)
"""


if __name__ == "__main__":
    main()


"""
MAYBE CREATE A DECORATER FOR IT

move after read and post in db

todo - create a def moveXtx( post to db was successfull )

new_xtx_path = move_path + xtx_names[1].split("/")[-1]
shutil.move(xtx_names[1], new_xtx_path)

returns a boolean done it or not 
if not error message 

"""


