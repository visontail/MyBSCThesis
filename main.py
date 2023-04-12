
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
database = db.DataBase(host="localhost", username="root", password="", database="BSCthesis")

# MAIN Function
def main():
    # - read given directory and collects xtx file names
    xtx_names = fc.readDirectory(dir_path, EXTENSIONS)
    # - connects to the database
    database.connect()
    i = 0
    # - gets through every file in the directory
    for xtx in xtx_names:
        i +=  1
        # - if it is the first one creates object
        if (i == 1):
            data = fc.File(xtx)
        # - then just changes the file_name object
        else:
            data.file_name = xtx
        # - read one file at once
        name, time, data_01, data_02  = fc.File(xtx).read_file()
        # - execute sql query for both direction
        database.add_new_data(name, time, data_01, data_02)

    # - finally closes down the database connection & deletes the file's name
    database.disconnect()
    del fc.File.file_name

 
if __name__ == "__main__":  
    main()   
    
"""    
 - set first name 
file = File(test[0])
print(file)
print(file.file_name)
 - add new file name
file.file_name = test[1]
 - del file name
del file.file_name


# Simple check - delete later
    def check(self):
        print("This is all you got: ")
        # STATION TABLE
        self._cursor.execute("SELECT * From Station")
        result = self._cursor.fetchall()
        for r in result:
            print(r)
        print(self._cursor.rowcount, "details inserted")

        
MAYBE CREATE A DECORATER FOR IT

move after read and post in db

todo - create a def moveXtx( post to db was successfull )

new_xtx_path = move_path + xtx_names[1].split("/")[-1]
shutil.move(xtx_names[1], new_xtx_path)

returns a boolean done it or not 
if not error message 

"""


