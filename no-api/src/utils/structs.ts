import themes from '../db/themes.json'
import vocabulary from '../db/vocabulary.json'
import grammar from '../db/grammar.json'
import artikel from '../db/artikel.json'
import possesiv from '../db/possesiv.json'
import localePräpositionen from '../db/localePräpositionen.json'
import questions from '../db/questions.json'
import objects from '../db/objects.json'
import actions from '../db/actions.json'
import jahre_zeiten_uhrs_tags from '../db/jahreszeitenUndUhrsUndTags.json'
import family from '../db/family.json'
import land from '../db/land.json'
import directions from '../db/directions.json'
import food from '../db/food.json'
import transports from '../db/transports.json'
import home from '../db/home.json'
import body from '../db/body.json'
import party_times from '../db/partyTimes.json'
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
        case "possesiv":
            return possesiv;
        case "localePräpositionen":
            return localePräpositionen;
        case "questions":
            return questions;
        case "objects":
            return objects;
        case "actions":
            return actions;
        case "jahrezeiten,uhrs und tags":
            return jahre_zeiten_uhrs_tags;
        case "family":
            return family;
        case "land":
            return land;
        case "directions":
            return directions;
        case "food":
            return food;
        case "transports":
            return transports;
        case "home":
            return home;
        case "body":
            return body;
        case "party times":
            return party_times;
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