import requests
from bs4 import BeautifulSoup
import json
import datetime

response = requests.get('https://republika.co.id/')
soup = BeautifulSoup(response.text, 'html.parser')
print(response.status_code)

# Inisialisasi variabel existingData sebagai array kosong
existingData = []

try:
    # Buka file json untuk dilakukan read
    with open('./python/headlines.json', 'r') as file:
        # Apabila file tidak kosong
        if file.read() != '':
            file.seek(0) # Kembalikan pointer ke awal file
            existingData = json.load(file) # Load data dari file
        file.close()
    # Jika file tidak ditemukan
except FileNotFoundError:
    print('File not found, creating new file...')
    open('./python/headlines.json', 'w').close() # Buat file baru

# Mencari semua div dengan class title dan title-headline pada website
headlines = soup.find_all('li', class_='list-group-item list-border conten1')

# Inisialisasi variabel newData sebagai array kosong
newData = []

# Iterasi setiap elemen yang ditemukan sebagai judul
for headline in headlines:
    caption = headline.find('a').find('div', class_="col-md-9").find('div', class_="caption")
    date = caption.find('div', class_='date')
    kategori = date.find('span')
    obj = {} # Inisialisasi objek baru
    obj['judul'] = caption.find('h3').find('span').text.strip() # Mengisi field judul
    obj['kategori'] = kategori.text.strip() # Mengisi field kategori
    kategori.extract() # Menghapus elemen kategori dari elemen date
    obj['waktuPublish'] = date.text.strip()[2:] # Mengisi field waktuPublish
    obj['waktuScraping'] = datetime.datetime.now().strftime('%Y-%B-%d %H:%M:%S') # Mengisi field waktuScraping
    if obj not in existingData: # Jika objek belum ada di dalam existingData (belum ada dalam file)
        newData.append(obj) # Tambahkan objek ke newData

# Buka file json untuk dilakukan write
with open('./python/headlines.json', 'w') as file:
    existingData.extend(newData) # Gabungkan existingData dengan newData
    json.dump(existingData, file, indent=0) # Tulis existingData ke dalam file
    file.close()