import chalk        from 'chalk';
// import * as moment  from 'moment';
import moment from 'moment'

export class Logger {

    public static logLevel = 4;

    private static timeNow(): string {
        let momentDate = moment();

        return momentDate.format('HH:mm:ss');
    };

    public static trace(msg: string) {
        if (this.logLevel < 4) return;
        console.log(`[${this.timeNow()} | TRACE] ${chalk.bgCyanBright.white(msg)}`);
    };

    public static log(msg: string) {
        if (this.logLevel < 3) return;
        console.log(`[${this.timeNow()} | LOG] ${msg}`);
    };

    public static warn(msg: string) {
        if (this.logLevel < 2) return;
        console.log(`[${this.timeNow()} | WARN] ${chalk.bgYellow.black(msg)}`);
    };

    public static error(msg: string) {
        if (this.logLevel < 1) return;
        console.log(`[${this.timeNow()} | ERROR] ${chalk.bgRed(msg)}`);
    };
}
