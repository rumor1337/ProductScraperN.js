import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import DbManager from '../services/DbManager.ts';
import Scraper from '../services/Scraper.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Express {

    private app = express();
    private port : Number = 8080;
    private dbManager = new DbManager();
    private scraper = new Scraper();

    constructor(port: number) {
        this.port = port;
    }

    public startExpress() {
        this.app.use(express.static(join(__dirname, '../public')));
        this.app.listen(this.port, () => {
            console.log(`[!] Listening on port ${this.port}`)
        });
    }

    public async setRoutes() {
        this.app.get('/api/search', async (req, res) => {
            const searchQuery = String (req.query.q);

            const cache = await this.dbManager.retrieveData(searchQuery);
            var scrapedData;

            if(cache.exists()) return res.json(cache.val());

            scrapedData = await this.scraper.scrape(searchQuery);
            this.dbManager.saveData(searchQuery, scrapedData);

            return res.json(scrapedData);

        });

    }
}

export default Express