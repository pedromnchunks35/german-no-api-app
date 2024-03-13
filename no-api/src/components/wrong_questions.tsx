import { Question, WrongAnswer, indexing } from "../utils/structs";

type Props = {
    wrongAnswers: WrongAnswer[];
    setMenu: (_menu_index: Number) => void;
    setCounter: (_new_counter: indexing) => void;
    setQuestion: (_new_question: Question) => void;
    setWrongAnswers: (_new_wrong_answers: WrongAnswer[]) => void;
}
export const WrongQuestionsMenu: React.FunctionComponent<Props> = ({ wrongAnswers, setMenu, setCounter, setQuestion, setWrongAnswers }) => {
    const reset = () => {
        setWrongAnswers([]);
        setMenu(0);
        setCounter({
            counter: 0,
            index: 0,
            theme_index: 0
        })
        setQuestion({
            answers: [],
            correct: 0,
            index: 0,
            question: ""
        })
    }
    return (
        <div className="flex flex-col justify-start items-center w-3/5 h-3/5 bg-lime-900 rounded-lg">
            <div className="text-4xl font-bold flex flex-row justify-between p-6">
                <h1 className="">Wrong Questions:</h1>
                <h1 className="text-red-900 ml-2">{wrongAnswers.length}</h1>
            </div>
            <div className="basis-9/12 ml-10 mr-10 w-11/12 bg-zinc-700 overflow-auto">
                <ul>
                    {
                        wrongAnswers.map((wrongAnswer) => {
                            return (
                                <div className="flex flex-col items-center m-6 bg-white">
                                    <h1 className="text-2xl font-bold">Question: {wrongAnswer.question.question}</h1>
                                    <h1 className="text-xl font-bold">Answers:</h1>
                                    <div className="w-full flex flex-row justify-around">
                                        <h1 className="text-red-950 font-bold text-xl">{wrongAnswer.question.answers[Number(wrongAnswer.answer) - 1]}</h1>
                                        <h1 className="text-green-600 font-bold text-xl">{wrongAnswer.question.answers[Number(wrongAnswer.question.correct) - 1]}</h1>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="basis-1/12 w-full flex flex-row justify-center items-center">
                <div onClick={reset} className="cursor-pointer m-8 p-6 bg-black pl-20 pr-20">
                    <h1 className="text-white font-bold text-2xl">Reset</h1>
                </div>
            </div>
        </div>
    )
}