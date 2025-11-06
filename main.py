import requests
import time
from bs4 import BeautifulSoup

requestQuery = "logitech"
request = requests.get('https://www.kurpirkt.lv/cena.php?q='+requestQuery)
soup = BeautifulSoup(request.text, 'html.parser')

products = []
productEl = soup.find_all('div', class_='precebloks')

for prodTemp in productEl:
    title = prodTemp.find('div', class_='title').text

    price = None
    seller = None
    
    # es ienistu kurpirkt.lv
    # sis ir awful
    # kapec sadi jabut
    # kapec
    # nav velme vienmer parliecinaties vai REKLAMAM ir savadak
    # tiesam nepatik

    # parliecinas vai pirmie 2+ elementi nav reklama un ja ir tad atrod citu attiecigo elementu
    if(prodTemp.find('span', attrs={"itemprop": 'price'}) == None):
        price = prodTemp.find('div', class_='campaignprice').text
    else:
        price = prodTemp.find('span', attrs={"itemprop": 'price'}).text

    # reali awful
    if(prodTemp.find('span', attrs={"itemprop": 'seller'}) == None):
        seller = prodTemp.find('div', class_='campaignname').text
    else:
        seller = prodTemp.find('span', attrs={"itemprop": 'seller'}).text

    # nestradaja savadak idk
    if(prodTemp.find('div', class_='image') == None):
        image = 'https://kurpirkt.lv/img/no_image.gif'
    else:
        imageDiv = prodTemp.find('div', class_='image')
        image = imageDiv.find('img', class_="resimg").src

    prod = {
        'title': title,
        'price': price,
        'seller': seller,
        'image': image
    }
    products.append(prod)

for i in products:
    print(i)

# print(soup.prettify())