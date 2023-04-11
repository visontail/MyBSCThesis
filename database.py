# Importing module
import mysql.connector

# Class for Database
class DataBase():
    def __init__(self, host: str, username: str, password: str, database: str):
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
    def execute_q(self, query, value): 
        if self._cursor is not None:
            self._cursor.execute(query, value)
            results = self._cursor.fetchall()
            return results
        else:
            print("Cursor not found. Check database connection!")

