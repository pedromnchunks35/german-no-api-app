import { useState } from 'react';
import './App.css';
import { QuestionsMenu } from './components/questions_menu';
import { Config, Question, WrongAnswer, indexing } from './utils/structs';
import { TypeQuestionsMenu } from './components/type_questions_menu';
import { WrongQuestionsMenu } from './components/wrong_questions';
function App() {
  const [config, setConfig] = useState<Config>({
    theme: "",
    random: false,
    number_questions: 0
  })
  const [counter, setCounter] = useState<indexing>({
    counter: 0,
    index: 0,
    theme_index: 0
  });
  //? Menus
  //? Menu 0 - Ask the type of test we want (full test, theme base test or grammar test)
  //? Menu 1 - Making the test happen
  //? Menu 2 - Seeing what we got wrong
  const [menu, setMenu] = useState<Number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [currentQuestion, setQuestion] = useState<Question>({
    index: 0,
    question: "",
    answers: ["", "", "", ""],
    correct: 0
  })
  return (
    <div className='flex flex-row justify-center items-center bg-black h-screen w-full'>
      {
        menu == 0 ?
          (
            <TypeQuestionsMenu setConfig={setConfig} setMenu={setMenu} />
          )
          :
          menu == 1 ?
            (
              <QuestionsMenu setMenu={setMenu} counter={counter} setCounter={setCounter} wrongAnswers={wrongAnswers} config={config} currentQuestion={currentQuestion} setQuestion={setQuestion} setWrongAnswers={setWrongAnswers} />
            )
            :
            (
              <WrongQuestionsMenu setWrongAnswers={setWrongAnswers} wrongAnswers={wrongAnswers} setCounter={setCounter} setMenu={setMenu} setQuestion={setQuestion} />
            )
      }
    </div>
  );
}

export default App;
