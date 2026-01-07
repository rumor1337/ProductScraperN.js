import { AceBase } from 'acebase';
import Logger from '../util/Logger.ts';

class DbManager {

    private db: AceBase;
    private logger;

    constructor() {
        this.db = new AceBase('scraperData');
        this.logger = new Logger();
    }

    public async retrieveData(query: string) {
        try {
            var retrievedData = await this.db.ref(query.toLowerCase()).get();
            this.logger.info(`[${query}] retrieved data`);
            return retrievedData;
        } catch(error: any) {
            this.logger.error(`Caught an exception at retrieveData in DbManager. ${error.message}`);
        }
    }

    public async saveData(query: string, data: any[]) {
        try {
            await this.db.ref(query.toLowerCase()).set(data);
            this.logger.info(`[${query}] saved data`);
        } catch(error: any) {
            this.logger.warn(`Caught an exception at saveData in DbManager. ${error.message}`);
            return;
        }
    }

}

export default DbManager;