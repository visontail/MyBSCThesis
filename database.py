# Importing module
import mysql.connector


# Class for
class DataBase():
    def __init__(self, host, username, password, database):
        self._host = host
        self._username = username
        self._password = password
        self._database = database
        self._connection = None

    def connect(self):
        try:
            self._connection = mysql.connector.connect(
                host = self._host,
                username = self._username,
                password = self._password,
                database = self._database   
            )   
            # check if connection is established
            if self._connection.is_connected():
                print("Database connection established successfully!")
        except mysql.connector.Error as error:
            print(f' Connection Failed! ,"{error}"')

def create_Cursor(db):
    if db:
        cursor = db.cursor()
        return cursor
    else:
        print("Failed to establish database connection.")
        return None

# db connection    
db = DataBase(host="localhost", username="root", password="password", database="mydb")
db.connect()

# db cursor
cur = ""

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