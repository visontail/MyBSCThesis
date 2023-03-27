# Importing module
import mysql.connector


# Class for
class DB():
    # CODE HERE
    pass




#Create database connection
def conn_DB():
    # Creating connection object
    db = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "",
        database = 'VeloClass'
    )
    # check if connection is established
    if db.is_connected():
        print("Database connection established successfully!")
        return db
    else:
        print("Database connection failed!")
        return None

def create_Cursor(db):
    if db:
        cursor = db.cursor()
        return cursor
    else:
        print("Failed to establish database connection.")
        return None
    
db = conn_DB()
cur = create_Cursor(db)


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