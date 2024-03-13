import themes from "../db/themes.json"
import { Config } from "../utils/structs"
type Props = {
    setConfig: (new_config: Config) => void
    setMenu: (menu: Number) => void
}
export const TypeQuestionsMenu: React.FunctionComponent<Props> = ({ setConfig, setMenu }) => {
    const isNumber = (value: any): Number => {
        return isNaN(value) == true ? 0 : value
    }
    const setConfigButtonClick = () => {
        let theme_selector: HTMLSelectElement = document.getElementById("theme-selection") as HTMLSelectElement
        let random_selector: HTMLSelectElement = document.getElementById("isRandom") as HTMLSelectElement
        let questions_number: HTMLInputElement = document.getElementById("questions-number") as HTMLInputElement
        let real_number = isNumber(questions_number.value)
        setConfig({
            random: (random_selector.value === "1" ? true : false),
            theme: theme_selector.value,
            number_questions: real_number
        })
        setMenu(1);
    }
    return (
        <div className="flex flex-col justify-center items-center w-3/5 h-3/5 bg-lime-900 rounded-lg">
            <h1 className="font-bold text-5xl basis-1/5">Question type</h1>
            <div className="basis-1/5 flex flex-row w-full justify-center">
                <h1 className="font-bold text-3xl m-6">Theme</h1>
                <select id="theme-selection" defaultValue={themes[0]} className="h-2/5 m-6 pl-20 pr-20 font-bold">
                    {
                        themes.map((theme) => {
                            return (
                                <option value={theme}>{theme}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="basis-1/8 flex flex-row w-full justify-center">
                <h1 className="text-3xl font-bold m-6">Should it be random?</h1>
                <select id="isRandom" className="h-2/5 m-6 pl-20 pr-20 font-bold" defaultValue={0}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>
            </div>
            <div className="basis-1/8 m-6 flex flex-row w-full justify-center">
                <h1 className="text-3xl font-bold">Number of questions</h1>
                <input id="questions-number" defaultValue={0} className="ml-6 text-3xl font-bold"></input>
            </div>
            <div onClick={() => { setConfigButtonClick() }} className="cursor-pointer m-16 bg-black pl-20 pr-20 p-6">
                <h1 className="text-white font-bold text-2xl">Submit</h1>
            </div>
        </div>
    )
}