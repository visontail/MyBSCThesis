
# importing 'file_OOP' py file as 'fc' refering to File Class
import file_OOP as fc
# importing 'database' py file as 'db'
import database as db



# - newly added .XTX files path:
    # sample_path = '/users/user/desktop/fodler/'
dir_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files/'
# - already read .XTX files path:
move_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/done/'
# - allowed extesions:
EXTENSIONS = ('.xtx', '.Xtx', '.XTx', '.XtX', '.xTx', '.xTX', '.xtX', '.XTX')

# - database connection parameters
database = db.DataBase(host="localhost", username="root", password="", database="VeloClass")



    # - read given directory and collects xtx file names
xtx_names = fc.readDirectory(dir_path, EXTENSIONS)
    # - connects to the database
database.connect()

data = fc.File(xtx_names[0]).read_file()

value = [data[0], data[2], data[3], data[4], data[5]]

query = "INSERT INTO `Measurement`(`ID_station_num`, `start_time`, `end_time`, `direction`, `meas_intervall`) VALUES (%s, %s, %s, %s, %s)"


print(database.execute_q(query,value))

database.disconnect()






"""
# MAIN Function
def main():
    # - read given directory and collects xtx file names
    xtx_names = fc.readDirectory(dir_path, EXTENSIONS)
    # - connects to the database
    database.connect()
    i = 0
    # - start of the 
    for xtx in xtx_names:
        i +=  1
        if (i == 1):
            data = fc.File(xtx)
        else:
            data.file_name = xtx
        value = data.read_file()
        # query = f" INSERT INTO Measurement () VALUES"
        # 2 queries - one for each side
        query = f"INSERT INTO `Measurement`(`ID_measure`, `ID_station_num`, `start_time`, `end_time`, `direction`, `meas_intervall`) VALUES ('', '', '', '', '')"
        
        database.execute_q(query,value)
        
        #print(data.read_file())
        print(i)

        # FINAL (not in the for loop) - close db conn & delete file name object
"""       
    
    
    
    
    
    #data = fc.File(xtx_names[0]).read_file()
    #print(data)



 
#if __name__ == "__main__":   main()   
    
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


# Simple check - delete later
    def check(self):
        print("This is all you got: ")
        # STATION TABLE
        self._cursor.execute("SELECT * From Station")
        result = self._cursor.fetchall()
        for r in result:
            print(r)
        print(self._cursor.rowcount, "details inserted")

"""



"""
MAYBE CREATE A DECORATER FOR IT

move after read and post in db

todo - create a def moveXtx( post to db was successfull )

new_xtx_path = move_path + xtx_names[1].split("/")[-1]
shutil.move(xtx_names[1], new_xtx_path)

returns a boolean done it or not 
if not error message 

"""


