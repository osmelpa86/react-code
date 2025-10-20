import './App.css'
import {Container, Stack, Typography} from "@mui/material";
import {JavaScriptLogo} from "./components/JavaScriptLogo.tsx";
import {Start} from "./components/Start.tsx";
import {useQuestionsStore} from "./store/questions.ts";
import {Game} from "./components/Game.tsx";

function App() {
    const questions = useQuestionsStore(state => state.questions);
    return (
        <main>
            <Container maxWidth="sm">

                <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
                    <JavaScriptLogo/>
                    <Typography component="h1" variant="h2">
                        Javascript Quizz
                    </Typography>
                </Stack>


                {questions.length === 0 && <Start/>}
                {questions.length > 0 && <Game/>}
            </Container>
        </main>
    )
}

export default App