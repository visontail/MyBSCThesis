# Importing module
import mysql.connector

# Class for Database
class DataBase():
    def __init__(self, host: str, username: str, password: str, database: str) -> None:
        self._host = host
        self._username = username
        self._password = password
        self._database = database
        self._connection = None
        self._cursor = None
    # Function to establish database connection
    def connect(self):
        try:
            self._connection = mysql.connector.connect(
                host = self._host,
                username = self._username,
                password = self._password,
                database = self._database   
            )   
            # - check if connection is established
            if self._connection.is_connected():
                # - set cursor
                self._cursor = self._connection.cursor()
        # - print out error if connection failed
        except mysql.connector.Error as error:
            print(f' Connection Failed! ,"{error}"')
    # Function for disconnecting from database
    def disconnect(self):
        if self._cursor is not None and self._connection.is_connected():
            self._cursor.close()
            self._connection.close()
    # Function to execute sql query
    def execute_q(self, query: str, value): 
        if self._cursor is not None:
            self._cursor.execute(query,value)
            results = self._cursor.fetchall()
            return results
        else:
            print("Cursor not found. Check database connection!")
    # Simple check - delete later
    def check(self):
        print("This is a check up function")
        print("This is all you got! :D")
        self._cursor.execute(" SELECT * From testFirst")
        result = self._cursor.fetchall()
        for r in result:
            print(r)
        print(cur.rowcount, "details inserted")


# db connection    
db = DataBase(host="localhost", username="root", password="", database="VeloClass")
db.connect()


# db cursor
cur = db._cursor
"""
# SQL Query
sql_query = "INSERT INTO `testFirst`( `Date`, `Traffic`, `Value`) VALUES ('2023.01.01','1','1')"
db.execute_q(sql_query)
db.check()


# Insert with value 
sql = "INSERT INTO Student (Name, Roll_no) VALUES (%s, %s)"
val = ("Ram", "85")
cursor.execute(sql, val)
"""

