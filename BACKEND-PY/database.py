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
            
    # Function for adding new data to database        
    def add_new_data(self, name, time, data):
        try:
            query = "INSERT INTO `Measurements`(`stationID`, `startTime`, `endTime`, `Direction`, `MeasIntervall`, `OtherTraff`, `PedestrianTraff`, `CyclistTraff`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            values = (name, time[0], time[1], data[0], data[1], data[2], data[3], data[4])
            if self._cursor is not None:
                    self._cursor.execute(query, values)
                    self._connection.commit()
                    return True
            else:
                print("Cursor not found. Check database connection!")
                return False
            
        except mysql.connector.Error as mysql_error:
            print(f"Error executing query: {mysql_error}")
            return False