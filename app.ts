import kurPirkt from './kurPirkt.ts';
import Salidzini from './salidzini.ts';
import { AceBase } from 'acebase';

const db = new AceBase('scraperData'); 

let searchQuery: string = 'portativais dators';

const retrievedData = await db.ref(searchQuery).get();

// pretty much it for caching 00:39 07.12.25

async function handleData() {

  if(retrievedData.exists()) {
    // self explanatory
    console.log(`[${searchQuery}] read data`);
    return retrievedData.val();
  } else {
    // all scraper calls
    var salidziniScraper = new Salidzini(searchQuery, 1);
    var salidziniResults: any[] = await salidziniScraper.doRequest();

    var kurpirktScraper = new kurPirkt(searchQuery, 1);
    var kurpirktResults: any[] = await kurpirktScraper.doRequest();

    const allProducts = kurpirktResults.concat(salidziniResults);

    // set and return the scraped data
    await db.ref(searchQuery).set(allProducts);
    console.log(`[${searchQuery}] pushed data to .db`);
    return allProducts;
}

}

console.log(handleData());