# importing 'file' py file as 'fc' refering to File Class
import file.file as fc
# importing 'database' py file as 'db'
import database.database as db
# - importing / using dotenv for storing login data locally
import os
from dotenv import load_dotenv

load_dotenv()

# - newly added .XTX files path:
dir_path = os.getenv('NEW_FILE_PATH')
# - already read .XTX files path:
move_path = os.getenv('OLD_FILE_PATH')

# - database config
host = os.getenv('MYSQL_HOST')
username = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASSWORD')
database = os.getenv('MYSQL_DATABASE')

# - allowed extesions:
EXTENSIONS = ('.xtx', '.Xtx', '.XTx', '.XtX', '.xTx', '.xTX', '.xtX', '.XTX')

print(dir_path)

if __name__ == "__main__":  
    # - read given directory and collects xtx file names
    file_names = fc.readDirectory(dir_path, EXTENSIONS)
    # - check if there is any xtx file in directory
    if (len(file_names) == 0 ):
        print("There's no xTx file in the given directory. Please try again later!")
    else:
        # - create database connection object
        database = db.DataBase(host, username, password, database)
        # - connects to the database
        database.connect()
        i = 0
        data = None
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
            name, time, file_data = data.read_file()

            # - upload data to database ( direction one )
            upload_success = database.add_new_data(f_name.split("/")[-1], name, time, file_data)
            # - check if data was inserted or not
            if upload_success:
                # - if each direction inserted then move read file
                move_success = fc.moveFile(f_name, move_path)
                print("Database has been updated!")
                if not move_success:
                # - if not then break out of loop
                    print("Something went wrong. Check folder!")
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

