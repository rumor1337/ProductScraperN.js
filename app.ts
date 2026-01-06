import Scraper from './services/Scraper.ts';
import Express from './services/express/Express.ts';
import SortUtil from './util/SortUtil.ts';

class app {

    public express = new Express(8080);
    private scraper = new Scraper();
    public sortUtil = new SortUtil();

    constructor() {
        this.express.setRoutes();
        this.express.startExpress();
    }

}

new app();

