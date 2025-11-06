import requests
import time
from bs4 import BeautifulSoup
import re

requestQuery = "kalkulators"
request = requests.get('https://www.kurpirkt.lv/cena.php?q='+requestQuery)
soup = BeautifulSoup(request.text, 'html.parser')

products = []

# sis ir horrible
pagesT = soup.find('font', attrs={
    'color': '#888888'
})
pages = int(re.findall(r'\d+',pagesT.text)[0])

def findEl(productEl):
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

        imageTemp = prodTemp.find('div', class_='image').find('img')
        image = 'https://kurpirkt.lv' + imageTemp['src']

        prod = {
            'title': title,
            'price': price,
            'seller': seller,
            'image': image
        }
        products.append(prod)

    for i in products[:5]:
        print(i)

for i in range(1, pages):
    i+=1
    if(i == 1):
        request = requests.get('https://www.kurpirkt.lv/cena.php?q='+requestQuery)
        soup = BeautifulSoup(request.text, 'html.parser')

        productEl = soup.find_all('div', class_='precebloks')
        findEl(productEl)
        i+=1
    else:
        request = requests.get('https://www.kurpirkt.lv/cena.php?q='+requestQuery+'&page='+str(pages))
        soup = BeautifulSoup(request.text, 'html.parser')

        productEl = soup.find_all('div', class_='precebloks')
        findEl(productEl)
        i+=1

# print(soup.prettify())