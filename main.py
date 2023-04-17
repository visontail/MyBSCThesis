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
    file_names = fc.readDirectory(dir_path, EXTENSIONS)
    # - check if there is any xtx file in directory
    if (len(file_names) == 0 ):
        print("There's no xTx file in the given directory. Please try again later!")
    else:
        # - create database connection object
        database = db.DataBase(host="localhost", username="root", password="", database="BSCthesis")
        # - connects to the database
        database.connect()
        i = 0
        # - gets through every file in the directory
        for f_name in file_names:
            i +=  2
            # - if it is the first one creates file_name object
            if (i == 2):
                data = fc.File(f_name)
            # - using setter to set file_name object
            else:
                data.file_name = f_name
            # - read & sort file
            name, time, data_01, data_02  = data.read_file()
            # - upload data to database ( direction one )
            upload_success = database.add_new_data(name, time, data_01)
            # - check if data was inserted or not
            if upload_success:
                # - upload data to database ( direction two )
                upload_success = database.add_new_data(name, time, data_02)
                # - check if data was inserted or not
                if upload_success:
                    # - if each direction inserted then move read file
                    move_success = fc.moveFile(f_name, move_path)
                    if not move_success:
                        # - if not then break out of loop
                        print("Something went wrong. Check folder!")
                        break
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

