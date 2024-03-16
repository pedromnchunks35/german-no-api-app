import { useState } from "react";
import themes from "../db/themes.json";
import { Config, WrongAnswer, getCorrectDb, getRandomInt, indexing, Question, getTotalLength, getThemeIndex } from "../utils/structs";
type Props = {
    counter: indexing
    setCounter: (new_counter: indexing) => void
    setMenu: (new_menu: Number) => void
    currentQuestion: Question
    setQuestion: (_new_question: Question) => void
    wrongAnswers: WrongAnswer[];
    setWrongAnswers: (_new_wrong_answers: WrongAnswer[]) => void
    config: Config
}
export const QuestionsMenu: React.FunctionComponent<Props> = ({ counter, setCounter, setMenu, wrongAnswers, config, currentQuestion, setQuestion, setWrongAnswers }) => {
    const answer = async (_answer: Number) => {
        let answer: HTMLElement = document.getElementById("answer-" + _answer) as HTMLElement;
        let correctAnswer: HTMLElement = document.getElementById("answer-" + (Number(currentQuestion.correct))) as HTMLElement;
        let wrong: boolean = false;
        if (currentQuestion.correct == _answer) {
            answer.classList.remove("bg-white");
            answer.classList.add("bg-lime-400");
        } else {
            wrong = true;
            correctAnswer.classList.remove("bg-white");
            correctAnswer.classList.add("bg-lime-400");
            answer.classList.remove("bg-white");
            answer.classList.add("bg-rose-950");
            let new_answer: WrongAnswer[] = wrongAnswers;
            new_answer.push({
                answer: _answer,
                question: currentQuestion
            })
            setWrongAnswers(new_answer)
        }
        setTimeout(() => {
            answer?.classList.remove("bg-lime-400");
            answer?.classList.remove("bg-rose-950");
            answer?.classList.add("bg-white");
            if (correctAnswer?.classList.contains("bg-lime-400")) {
                correctAnswer?.classList.remove("bg-rose-950");
                correctAnswer?.classList.add("bg-white");
            }
            let response: boolean = newQuestion()
            if (!response) {
                setMenu(2)
            }
        }, !wrong ? (0.25 * 1000) : (0.25 * 8000));
    }
    const newQuestion = () => {
        if (config.random) {
            if (config.theme == "full") {
                let random_number: Number = getRandomInt(0, themes.length - 1)
                let db: Question[] = getCorrectDb(themes[Number(random_number)]) as unknown as Question[]
                let random_number_2: Number = getRandomInt(0, db.length - 1)
                let total_length: Number = getTotalLength();
                if (config.number_questions == 0) {
                    if (counter.counter == total_length) {
                        return false
                    } else {
                        setQuestion(db[Number(random_number_2)])
                        setCounter({
                            counter: Number(counter.counter) + 1,
                            theme_index: random_number,
                            index: random_number_2
                        })
                        return true
                    }
                } else {
                    if (counter.counter == config.number_questions) {
                        return false
                    } else {
                        setQuestion(db[Number(random_number_2)])
                        setCounter({
                            counter: Number(counter.counter) + 1,
                            theme_index: random_number,
                            index: random_number_2
                        })
                        return true
                    }
                }
            } else {
                let db: Question[] = getCorrectDb(config.theme) as unknown as Question[]
                let random_number: Number = getRandomInt(0, db.length - 1)
                if (config.number_questions == 0) {
                    if (counter.counter == db.length) {
                        return false
                    } else {
                        setQuestion(db[Number(random_number)])
                        setCounter({
                            counter: Number(counter.counter) + 1,
                            theme_index: random_number,
                            index: getThemeIndex(config.theme) as unknown as number
                        })
                        return true
                    }
                } else {
                    if (counter.counter == config.number_questions) {
                        return false
                    } else {
                        setQuestion(db[Number(random_number)])
                        setCounter({
                            counter: Number(counter.counter) + 1,
                            theme_index: random_number,
                            index: getThemeIndex(config.theme) as unknown as number
                        })
                        return true
                    }
                }
            }
        } else {
            if (config.theme == "full") {
                let db: Question[] = getCorrectDb(themes[Number(counter.theme_index)]) as unknown as Question[];
                let length_current_db = db.length
                if (config.number_questions == 0) {
                    if (counter.theme_index == themes.length - 1 && length_current_db - 1 == counter.index) {
                        return false
                    } else {
                        if (length_current_db - 1 == counter.index) {
                            setCounter({
                                counter: Number(counter.counter) + 1,
                                index: 0,
                                theme_index: Number(counter.theme_index) + 1
                            })
                            db = getCorrectDb(themes[Number(counter.theme_index)]) as unknown as Question[];
                            setQuestion(db[Number(counter.index)])
                            return true
                        } else {
                            setCounter({
                                counter: Number(counter.counter) + 1,
                                index: Number(counter.index) + 1,
                                theme_index: counter.theme_index
                            })
                            setQuestion(db[Number(counter.index)])
                            return true
                        }
                    }
                } else {
                    if (counter.counter == config.number_questions) {
                        return false
                    } else {
                        if (length_current_db - 1 == counter.index) {
                            setCounter({
                                counter: Number(counter.counter) + 1,
                                index: 0,
                                theme_index: Number(counter.theme_index) + 1
                            })
                            db = getCorrectDb(themes[Number(counter.theme_index)]) as unknown as Question[];
                            setQuestion(db[Number(counter.index)])
                            return true
                        } else {
                            setCounter({
                                counter: Number(counter.counter) + 1,
                                index: Number(counter.index) + 1,
                                theme_index: counter.theme_index
                            })
                            setQuestion(db[Number(counter.index)])
                            return true
                        }
                    }
                }
            } else {
                let db: Question[] = getCorrectDb(config.theme) as unknown as Question[];
                if (config.number_questions == 0) {
                    if (db.length - 1 == counter.index) {
                        return false
                    } else {
                        setCounter({
                            counter: Number(counter.counter) + 1,
                            index: Number(counter.index) + 1,
                            theme_index: getThemeIndex(config.theme) as number
                        })
                        setQuestion(db[Number(counter.index)])
                        return true
                    }
                } else {
                    if (config.number_questions == counter.counter || db.length == counter.index) {
                        return false
                    } else {
                        setCounter({
                            counter: Number(counter.counter) + 1,
                            index: Number(counter.index) + 1,
                            theme_index: getThemeIndex(config.theme) as number
                        })
                        setQuestion(db[Number(counter.index)])
                        return true
                    }
                }
            }
        }
    }
    return currentQuestion.correct == 0 ?
        (
            <div className='bg-lime-900 w-3/5 h-3/5 rounded-lg flex flex-col justify-center items-center'>
                <div onClick={newQuestion} className="bg-black">
                    <h1 className="cursor-pointer text-white p-10 pl-20 pr-20 text-2xl font-bold">Start</h1>
                </div>
            </div>
        )
        :
        (
            <div className='bg-lime-900 w-3/5 h-3/5 rounded-lg flex flex-col items-center'>
                <h1 className='basis-1/6 text-6xl font-bold'>German Quizz</h1>
                <h1 className='basis-1/6 text-3xl font-bold'>{currentQuestion.question}</h1>
                <div className='basis-3/6 flex flex-row w-full items-start'>
                    <div className='flex flex-col w-full h-full justify-around items-center'>
                        <div id="answer-1" onClick={() => { answer(1) }} className='bg-white p-6 cursor-pointer'>
                            <h1 className='text-2xl font-bold'>1){currentQuestion.answers[0]}</h1>
                        </div>
                        <div id="answer-2" onClick={() => { answer(2) }} className='bg-white p-6 cursor-pointer'>
                            <h1 className='text-2xl font-bold'>2){currentQuestion.answers[1]}</h1>
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full justify-around items-center'>
                        <div id="answer-3" onClick={() => { answer(3) }} className='bg-white p-6 cursor-pointer'>
                            <h1 className='text-2xl font-bold'>3){currentQuestion.answers[2]}</h1>
                        </div>
                        <div id="answer-4" onClick={() => { answer(4) }} className='bg-white p-6 cursor-pointer'>
                            <h1 className='text-2xl font-bold'>4){currentQuestion.answers[3]}</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
}