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
    def add_new_data(self, name, time, data_01, data_02):
        def execute_q(query, values):
            if self._cursor is not None:
                self._cursor.execute(query, values)
                self._connection.commit()
            else:
                print("Cursor not found. Check database connection!")
        # - adding direction one measurement data
        query = "INSERT INTO `Measurement`(`ID_station_num`, `start_time`, `end_time`, `direction`, `meas_intervall`, `traff_other`, `traff_pedestrian`, `traff_cyclist`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (name, time[0], time[1], data_01[0], data_01[1], data_01[2], data_01[3], data_01[4])
        execute_q(query, values)
        # - adding direction two measurement data
        query = "INSERT INTO `Measurement`(`ID_station_num`, `start_time`, `end_time`, `direction`, `meas_intervall`, `traff_other`, `traff_pedestrian`, `traff_cyclist`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (name, time[0], time[1], data_02[0], data_02[1], data_02[2], data_02[3], data_02[4])
        execute_q(query, values)

