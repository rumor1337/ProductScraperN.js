import kurPirkt from '../util/KurPirkt.ts';
import Salidzini from '../util/Salidzini.ts';
import Logger from '../util/Logger.ts';

class Scraper {

    private logger;

    constructor() {
        this.logger = new Logger();
    }

    public async scrape(searchQuery: string) {

        try {
            var salidziniScraper = new Salidzini(searchQuery, 2);
            var salidziniResults: any[] = await salidziniScraper.doRequest();

            var kurpirktScraper = new kurPirkt(searchQuery, 2);
            var kurpirktResults: any[] = await kurpirktScraper.doRequest();

            const allProducts = kurpirktResults.concat(salidziniResults);

            return allProducts;
        } catch(error: any) {
            this.logger.error(`Caught an exception at scrape in Scraper ${error.message}`);
        }

    }

}

export default Scraper;