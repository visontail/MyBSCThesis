# MyBSCThesis

## *Introduction*
I will be doing a web interface for a bicycle counter project. The main goal is to collect data from files, which are generated by the counter itself and process those informations to a database. Then create a web platform to display the daily, monthly, etc. averages and view them in a map using Google's API.


## *Main Parts*
This full-stack project will consist of 3 part:
- [x] **Python code** —> *to read data from files*
- [ ] **Database** -> *to store data*
- [ ] **Front-End** —> *to show the gathered data*


## *What does the python code do?*
The code main purpose is to list out all the files, which are important to us then read them and sort the information. After doing that it will upload it to a database and store it there.

The code is consist of 3 python files:
- [x] **main.py** —> where the program runs
- [x] **file.py** -> where the file reading happens
- [x] **database.py** -> where the database communication happens


In both **'file.py', 'database.py'** files are *a class and functions*, which are used in the **'main.py'**.

### **PART ONE - GATHERING DATA**

In **'file.py'** python file:

- Function **'readDirectory()'** has two input parameter: *a str 'path'* and *a tuple 'ext'*.
  - **the 'path' string** should be the folder's path, where we store the given files. **The 'ext' tuple** on the other hand is cointaing all the possible file extensions ( like '.txt', '.png', '.xls', etc. )
  - given these input parameters, the function reads through the given folder using an *'os.scandir()'*[^1] and lists out all the files' names, which are matching with the given *tuple 'ext'* extensions
  - they will be stored in *a 'files' variable* and that's what the function is returning as well
 
- Function **'moveFile()'** has also two input parameter: *a str 'name'* and *a str 'path'*.
  - **the 'name' string** should be the file's name, and **the 'path' string** should be the folder's path, where the file will be stored after it's read.
  - using these parameters the function creates the file's new path
  - after that the function moves the file to the new folder using *'shutil.move()'*[^2]
  - at the end it compares the new destination with the 'shutil.move()' returned destination to check if the file movement was correct or not and *returns boolean* according to it

- Class **'File'**:
  - has an *'__init__()'* function which has *a string 'name'* input parameter besides *'self'*
  - has *a 'getter', a 'setter' and a 'deleter'* which the code's using to get, set and delete file_name object -> *file's name*
    - *'getter'* -> * @property 'file_name()'*
    - *'setter'* -> * @file_name.setter 'file_name()'*
    - *'deleter'* -> * @file_name.deleter 'file_name()'*
  - besides these the class also has **a 'read_file()' function** as well
    - this function performs the actual *'file reading and information sorting'* part of the code
    - it creates *a 'lines' list* to stores file's information
    - it opens the file using the *'with open()'*[^3] then a for loop reads through the file line by line and stores each line into *an 'info' variable* first and then put it in the *a 'lines' list* created earlier.
    - after doing that it's sorting the information to: * a 'meas_name', a 'meas_time', a 'data_01' and a 'data_02' variables * also these are what the function returns
    - *the 'meas_time'* also converts a part of the given information stored in *a 'lines' list* to datetime format to fit in to the database, it uses *the 'datetime.strptime()' function*[^4]
    - *IMPORTANT NOTE:* the sorting method is only applies to this specific project and only to these specific data files created by the counter device

### **PART TWO - STORING INFORMATION** 

In **'database.py'** python file:

- Class **'DataBase'**:
  - the *'__init__()'* function has *a string 'host'*, *a string 'username'*, *a string 'password'*, *a string 'database'* input attributes besides *'self'* and the database object also has *'a connection and cursor attribute*' which are None by default.
  - the *'connect()' function*:
    - is for to establish database connection with the give databse object it uses a try method where it connects to the database with *'mysql.connector.connect()'*[^5]
    - if it is connected successfully it will create a cursor for later use
    - the except method will print a message with the error if the database connection wasn't established
  - the *'disconnect()' function*:
    - is closing down the database connection if a cursor was created and the connection was established earlier
  - the *'add_new_data()' function*:
    - has three input parameters besides self, *name, time, data* these refer to the variables returned by the File.read_file() function
    - it's also using a try method, where is *a 'query' string*, which holds an sql INSERT query and *a 'values' tuple*, which holds the values for the sql query above from the given input parameters
    - after these are created it will execute the query if the cursor was created earlier with *the 'execute()'  function*, commits all with *the 'commit()' function* then *returns true*
    - if the cursor wasn't created then it will print a message with the error and *returns false*
    - the except method will print a message with the error
    

### **PART THREE - RUNNING THE CODE**

In **'main.py'** python file:

- First, it's importing two files ( *'file.py' -> 'fc', 'database.py'* -> 'db' )
- Then creates *two strings 'dir_path', 'move_path'* and *a tuple 'EXTENSIONS'*
  - *'dir_path'* to store folder's path where the data files are
  - *'move_path'* to store folder's path where read files will be stored
  - *'EXTENSIONS'* to store the allowed files' extensions
- Then checks if *'__name__'* is *'__main__'* to avoid other imported scripts to run
  - if this is the case then creates * a 'file_names' tuple variable* where it stores files's names, which were returned by *the 'fc.readDirectory()' function*
  - then it checks if the *'file_names'* length is not 0 to make sure there was any files in the folder with the given extension
  - if there was then it creates *a databse object* using *'db.Database()'*, stores it in * a 'database' variable* then it connects with *the 'connect()' function*
  - also it creates *an 'i' variable* and sets it 0, this will be the for loops step counter
  - for loop: -> get through every file's name in *'file_names'*
    - first, it adds 2 to the *'i'* step counter then checks if this is the first step, if it is, then it will create *a file object* using *'fc.File()'* and stores it in *'data' variable*, on every other step it just simply changes the file's name with *the setter* using *'file_name'*
    - then runs *the 'read_file()' function* to read file, sort information and stores return values in *'name', 'time', 'data_01', 'data_02'*
    - after that it will upload the first part of the sorted information into the database using *the 'add_new_data()' function* and stores the boolean value in *a 'upload_success' variable*, then it check if the upload went well or not, if it uploaded it will upload the second part of the data as well and repeat the same process by overwriting *the 'upload_success' variable* and checking if it is true
    - if true then moves the file from the current folder to another folder where read files are stored using * the 'fc.moveFile()' function* and checks this as well if it happend or not
    - if any process of the uploading part or file moving part went wrong the code will break out from the for loop and print an error message
  - Finally, it will close the database connection using *the 'disconnect()' function* and delete *the file object* using *the deleter*
- If it is other then *'__main__'* then it will print an error message

## *How does the database look like?*


[^1]: This is an imported function from the 'os' library.
[^2]: This is an imported function from the 'shutil' library.
[^3]: This is a built-in function.
[^4]: This is an imported function from the 'datetime' library.
[^5]: This is an imported function from the 'mysql.connector' library.
