import * as moment from 'moment';
import 'moment-timezone';

export interface EntryItem {
    date: Date;
    timestamp: Date;
    id: string;
    description: string;
    categoryName: string;
    categoryId: string;
    amount: number;
    transactionType: string;
    to: string;
    from: string;
    reference: string;
    toAccountNumber: string;
    toSortCode: string;
    status: string;
}

export function toEntryItem(entry: string[]): EntryItem {
    const date = moment(entry[1]);
    const hasOffset = date.utcOffset() === 60;
    const bstTime = (moment as any).tz(date.clone().add(hasOffset ? 1 : 0, 'hour'), 'Europe/London');

    return {
        date: bstTime.format('DD/MM/YYYY'),
        timestamp: bstTime.format('x'),
        id: entry[2],
        description: entry[3],
        categoryName: entry[4],
        categoryId: entry[5],
        amount: parseFloat(entry[6]),
        transactionType: entry[7],
        to: entry[8],
        from: entry[9],
        reference: entry[10],
        toAccountNumber: entry[11],
        toSortCode: entry[12],
        status: entry[13]
    };
}
