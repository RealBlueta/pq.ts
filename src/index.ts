import { readFileSync } from 'fs';
import Lexer from './lexer';

function usage(): number {
    console.log('Usage:\n  ts-node index.ts [file-name.pq]');
    return 1;
}

process.exit((
    function main(argc: number, argv: string[]): number {
        const args: string[] = argv.slice(2);
        if (args.length < 1) return usage();
        try {
            const contents: string = readFileSync(args[0]).toString();
            const tokens = new Lexer(contents, args[0]).run();
            for (let token of tokens) {
                console.log(token);
            }
        } catch(error: any) {
            throw error;
        }
        return 0;
    }
)(0, process.argv));