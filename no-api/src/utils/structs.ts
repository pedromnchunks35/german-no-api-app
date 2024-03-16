import themes from '../db/themes.json'
import vocabulary from '../db/vocabulary.json'
import grammar from '../db/grammar.json'
import artikel from '../db/artikel.json'
export type WrongAnswer = {
    question: Question
    answer: Number
}
export type Config = {
    theme: string
    random: boolean
    number_questions: Number
}
export type indexing = {
    index: Number
    theme_index: Number
    counter: Number
}
export type Question = {
    index: Number
    question: string
    answers: string[]
    correct: Number
}
export const getCorrectDb = (theme: string) => {
    switch (theme) {
        case "grammar":
            return grammar;
        case "vocabulary":
            return vocabulary;
        case "artikel":
            return artikel;
        default:
            return vocabulary;
    }
}

const randomFloat: number = Math.random();
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTotalLength() {
    let total_length: Number = 0;
    for (let i = 0; i < themes.length; i++) {
        let db: Question[] = getCorrectDb(themes[i]) as unknown as Question[];
        total_length = Number(total_length) + Number(db.length);
    }
    return total_length;
}

export function getThemeIndex(theme: string) {
    for (let i = 0; i < themes.length; i++) {
        if (themes[i] === theme) {
            return i;
        }
    }
}