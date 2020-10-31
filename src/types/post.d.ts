import Cost from 'cost.d.ts';

export interface Post {
    image?: string;
    text?: string;
    tags?: {
        cost?: Cost;
        with?: string;
        genre?: string;
        time?: string;
    }
}