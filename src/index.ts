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
            const file_name = args[0];
            if (!file_name.endsWith('.pq')) {
                console.log('You can only run files that end in \'.pq\'.');
                return 1;
            }
            const contents: string = readFileSync(file_name).toString();
            const tokens = new Lexer(contents, file_name).run();
            for (let token of tokens) {
                console.log(token);
            }
        } catch(error: any) {
            throw error;
        }
        return 0;
    }
)(0, process.argv));