

class FileReader:
    def __init__(self,path):
        self.path = path
    
    def read_file(self):
        lines = []
        with open(filename, "r", encoding='utf-8') as file:
            for line in file:
                info = line.strip().split()
                lines.append(info)
        info = [lines[1],lines[2],lines[3],lines[-1],lines[-2]]
        data = []
        dev_info = {
            'Állomásszám': info[0][1],
            'Műszer gyári szám': info[1][4]
        }
        data.append(dev_info)
        mes_info = {
            'Mérés kezdete': info[2][1] + ' ' + info[2][2],
            'Mérés vége': info[2][3] + ' ' + info[2][4],
            'Irány 1': info[-1][0] + ' ' + info[-1][4] + ' ' + info[-1][5] + ' ' + info[-1][6] + ' ' + info[-1][7]+ ' ' + info[-1][8],
            'Irány 2': info[-2][0] + ' ' + info[-2][4] + ' ' + info[-2][5] + ' ' + info[-2][6] + ' ' + info[-2][7]+ ' ' + info[-2][8],
        }
        data.append(mes_info)

        return data
    
    def sort_info(self):
        pass


class Data(FileReader):
    pass    

# - newly added .XTX files path:
file_path = '/Users/visontaileo/Desktop/szakdoga/PROGRAM/MyBSCThesis/files/'


filename = file_path + 'test.xtx'

file = FileReader(filename)

d = file.read_file()



print(d)



"""
with open(filename, "r", encoding='utf-8') as file:
            lines = [line.strip() for line in file]
            data_lines = [lines[1],lines[2],lines[3],lines[-1],lines[-2]]
            imp_info = [item.split(" ") for item in data_lines]
            # Device information
            dev_data = [imp_info[0][1],imp_info[1][4]]
            # Measurement data
            mes_data = [imp_info[-2],imp_info[-1]]
        return dev_data, mes_data

"""