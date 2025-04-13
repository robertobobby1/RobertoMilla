import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function chunkify<T>(chunk: T[], itemsPerLine: number): T[][] {
    const chunks: T[][] = [[]];
    let chunkRow = 0;
    for (let index = 0; index < chunk.length; index++) {
        if (index % itemsPerLine === 0 && index !== 0) {
            chunkRow++;
            chunks.push([]);
        }

        chunks[chunkRow][index % itemsPerLine] = chunk[index];
    }
    return chunks;
}

export function randomKeyProp() {
    return (Math.random() + 1).toString(36).substring(7);
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
