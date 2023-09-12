import random
import os

from dotenv import load_dotenv
load_dotenv()

path = os.getenv('DEMO_FILE_PATH')
file_name = 'demo-data'
demo_xtx = path + file_name
n = int(input("How many demo data file you need? \n"))
station_ID = input("Provide the Station's ID! \n")
date = input("Provide the date! (date format example: 20230915) \n")
clock = 10

for x in range(n):
    with open(demo_xtx + str(x) +".xtx", 'w') as file:
        other_traff = random.randint(0, 9)
        ped_traff = random.randint(0, 9)
        cyc_traff = random.randint(0, 9)
        demo_data_lines = [
            "V0 200 001 XTX Data Format version 2.00",
        ]
        #   add station's ID
        demo_data_lines.append("H1 " + station_ID)
        #
        demo_data_lines.append("H4 01 02 VELOCLASS MXV2018047 UEH_0120.2 Merfoldko")
        #   add date
        demo_data_lines.append("H6 " + date + " "+ str(clock) +"0000 " + date + " " + str(clock+1) +"0000 " + date + " 095709 " + date + " "+ str(clock) +"0000 " + date + " " + str(clock+1) +"0000 ")
        #   add remainging
        demo_data_lines.append("L0 02 02 L M")
        demo_data_lines.append("90 60 60 77 01")
        demo_data_lines.append("H9")
        #   add date + demo data, direction 1
        demo_data_lines.append("90 0 " + date + " 11 60 01 000" + str(other_traff) + " 000" + str(ped_traff) + " 000" + str(cyc_traff))
        #   add date + demo data, direction 2
        demo_data_lines.append("90 0 " + date + " 11 60 02 000" + str(other_traff) + " 000" + str(ped_traff) + " 000" + str(cyc_traff))
        demo_data = "\n".join(demo_data_lines)
        file.write(demo_data)
        clock += 1
    print(" Demo data has been created! ")
