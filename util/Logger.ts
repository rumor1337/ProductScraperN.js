import chalk from 'chalk';
import * as fs from 'fs';

class Logger {

    public time() {
        
        const date = new Date();

        const hours = String(date.getHours());
        const minutes = String(date.getMinutes());
        const seconds = String(date.getSeconds());

        return `${hours}:${minutes}:${seconds}`;

    }

    public info(text: any) {
        console.log(`${chalk.magenta(this.time())} ${chalk.bold(text)}`);
        this.log(`${this.time()} Info: ${text} \n`);
    }

    public warn(text: any) {
        console.warn(`${chalk.magenta(this.time())} ${chalk.bgYellow(text)}`);
        this.log(`${this.time()} Warning: ${text} \n`);
    }

    public error(text: any) {
        console.error(`${chalk.magenta(this.time())} ${chalk.red.bold(text)}`);
        this.log(`${this.time()} Error: ${text} \n`);
    }

    public log(data: any) {

        const path: string = "output.log";

        try {
            fs.appendFileSync(path, data);
        } catch(error: any) {
            this.error(`An error occured in logger at log: ${error}`);
        }

    }


}

export default Logger;