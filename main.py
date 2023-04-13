# importing shutil for moving files after reading them
import shutil
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


# MAIN Function
def main():
    # - read given directory and collects xtx file names
    xtx_names = fc.readDirectory(dir_path, EXTENSIONS)
    # - check if there is any xtx file in directory
    if (len(xtx_names) == 0 ):
        print("There's no xTx file in the given directory. Please try again later!")
    else:
        # - create database connection object
        database = db.DataBase(host="localhost", username="root", password="", database="BSCthesis")
        # - connects to the database
        database.connect()
        i = 0
        # - gets through every file in the directory
        for xtx in xtx_names:
            i +=  2
            # - if it is the first one creates object
            if (i == 2):
                data = fc.File(xtx)
            # - then just sets the file_name object
            else:
                data.file_name = xtx
            # - read one file at once
            name, time, data_01, data_02  = fc.File(xtx).read_file()
            # - execute sql query
            success = database.add_new_data(name, time, data_01, data_02)
            if success:
                # - create new path
                new_xtx_path = move_path + xtx.split("/")[-1]
                # - move file
                shutil.move(xtx, new_xtx_path)
            else:
                print("Something went wrong. Check database!")
                break
        # - close down database connection
        database.disconnect()
        # - delete the file's name
        del fc.File.file_name


if __name__ == "__main__":  
    main()


