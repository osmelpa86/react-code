import {Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography} from "@mui/material";
import {useQuestionsStore} from "../store/questions.ts";
import {type Question, type Question as QuestionType} from "../types.ts";
import SyntaxHighlighter from "react-syntax-highlighter";
import {gradientDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {ArrowBackIosNew, ArrowForwardIos} from "@mui/icons-material";
import {Footer} from "./Footer.tsx";

const getBackgroundColor = (info: QuestionType, index: number) => {
    const {userSelectedAnswer, correctAnswer} = info;
    //Usuario no ha seleccionado nada
    if (userSelectedAnswer == null) return 'transparent';
    //si ya selecciono pero la solucion es incorrecta
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
    //si es la solucion correcta
    if (index === correctAnswer) return 'green'
    //si es la solucion del usuario pero no es correcta
    if (index === userSelectedAnswer) return 'red'

    //si no es ninguna de las anteriores
    return 'transparent'
}

const Question = ({info}: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer);

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    return (
        <Card variant="outlined" sx={{textAlign: 'left', p: 2, marginTop: '16px'}}>
            <Typography variant="h5" component="h5">{info.question}</Typography>
            <SyntaxHighlighter language='javascript' style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>

            <List disablePadding>
                {
                    info.answers.map((answer, index) => (
                        <ListItem key={index} disablePadding divider>
                            <ListItemButton onClick={createHandleClick(index)}
                                            disabled={info.userSelectedAnswer != null}
                                            sx={{backgroundColor: getBackgroundColor(info, index)}}>
                                <ListItemText sx={{textAlign: 'center'}} primary={answer}/>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Card>
    )
}

export const Game = () => {
    const question = useQuestionsStore(state => state.questions);
    const currentQuestion = useQuestionsStore(state => state.currentQuestion);
    const goNexQuestion = useQuestionsStore(state => state.goNexQuestion);
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion);

    const questionInfo = question[currentQuestion];
    return (
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew/>
                </IconButton>
                {currentQuestion + 1}/{question.length}
                <IconButton onClick={goNexQuestion} disabled={currentQuestion >= question.length - 1}>
                    <ArrowForwardIos/>
                </IconButton>
            </Stack>
            <Question info={questionInfo}/>
            <Footer/>
        </>
    )
}