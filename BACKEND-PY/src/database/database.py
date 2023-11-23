# Importing module
import mysql.connector

class DataBase():
    """Handling database connection and queries"""
    def __init__(self, host: int, username: str, password, database):
        self._host = host
        self._username = username
        self._password = password
        self._database = database
        self._connection = None
        self._cursor = None
    def connect(self):
        """Handling database connection"""
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
    def disconnect(self):
        """Handling closing down database connection"""
        if self._cursor is not None and self._connection.is_connected():
            self._cursor.close()
            self._connection.close()  
    def add_new_data(self, file, name, time, data):
        """Inset into database by given data
        Args:
                file (string): file's name
                name (string): measuring station's name
                time (list): list containing measurment start and end time
                data (list): list containing measurement data 
        """
        try:
            query = "INSERT INTO `Measurements`(`StationID`, `xtxName`, `Date`, `startTime`, `endTime`, `OtherTraff1`, `PedTraff1`, `CycTraff1`, `OtherTraff2`, `PedTraff2`, `CycTraff2`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            values = (name, file, time[0], time[1], time[2], data[0], data[1], data[2], data[3], data[4], data[5])
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