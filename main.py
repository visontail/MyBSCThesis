# importing 'file' py file as 'fc' refering to File Class
import file as fc
# importing 'database' py file as 'db'
import database as db


# - newly added .XTX files path:
dir_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files/'
# - already read .XTX files path:
move_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/done/'
# - allowed extesions:
EXTENSIONS = ('.xtx', '.Xtx', '.XTx', '.XtX', '.xTx', '.xTX', '.xtX', '.XTX')


if __name__ == "__main__":  
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
            # - if it is the first one creates file_name object
            if (i == 2):
                data = fc.File(xtx)
            # - using setter to set file_name object
            else:
                data.file_name = xtx
            # - read & sort file
            name, time, data_01, data_02  = fc.File(xtx).read_file()
            # - upload data to database
            success = database.add_new_data(name, time, data_01)

            # - check if data was inserted or not
            if success:
                success = database.add_new_data(name, time, data_02)
                # - check if data was inserted or not
                if success:
                    # - if each direction inserted then move read file
                    fc.moveFile(xtx, move_path)
                else:
                    # - if not then break out of loop
                    print("Something went wrong. Check database!")
                    break
            else:
                # - if not then break out of loop
                print("Something went wrong. Check database!")
                break
        # - close down database connection
        database.disconnect()
        # - delete file_name object
        del fc.File.file_name
else:
    print("Something went wrong. Try again later!")

