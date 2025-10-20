import {Button} from "@mui/material"
import {useQuestionsStore} from "../store/questions.ts";

const LIMIT_QUESTIONS = 10;
export const Start = () => {
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions);

    const hadleClick = () => {
        void fetchQuestions(LIMIT_QUESTIONS);
    }

    return (
        <Button
            onClick={hadleClick}
            variant="contained">!Empezar!
        </Button>
    )
}