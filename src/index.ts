import { parse, unparse } from 'papaparse';
import fs = require('fs');
import { toEntryItem, EntryItem } from './entry-item';

main();

function main() {
    const args = process.argv.slice(2, process.argv.length);
    const inputPath = args[0];
    const outputPath = args[1];

    const file = fs.readFileSync(inputPath, 'utf8');
    const parsed = parse(file).data;

    const cols = parsed.slice(0, 1)[0];
    const rows = parsed.slice(1, -1).map(toEntryItem);

    writeFile(outputPath, getOutputCsv(rows, cols));
}

function getOutputCsv(rows: EntryItem[], cols: string[]) {
    return unparse([getOutputColumns(cols), ...getOutputRows(rows)]);
}

function getOutputRows(rows: EntryItem[]) {
    const balance = getBalance(rows);

    return rows.map((row, index) => {
        return (Object as any).values(row).concat(index === 0 ? [balance] : []);
    })
}

function getOutputColumns(columns: string[]): string[] {
    return [...columns, 'Balance'];
}

function getBalance(items: EntryItem[], precision = 2): number {
    const balance = items.reduce((acc: number, item: EntryItem) => {
        return acc + item.amount;
    }, 0).toFixed(precision);

    return parseFloat(balance);
}

function writeFile(path: string, content: string) {
    fs.writeFileSync(path || 'generated.csv', content);
}
