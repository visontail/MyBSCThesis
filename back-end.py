# Importing module
import mysql.connector

# Creating connection object
db = mysql.connector.connect(
	host = "localhost",
	user = "root",
	password = "",
    database = 'VeloClass'
)
# Printing the connection object
print(db)

cursor = db.cursor()

#cursor.execute ("INSERT INTO `testFirst`( `Date`, `Traffic`, `Value`) VALUES ('2023.01.01','1','1')")
query = "SELECT * FROM testFirst"
cursor.execute  (query)

myresult = cursor.fetchall()

for x in myresult:
    print (x)

