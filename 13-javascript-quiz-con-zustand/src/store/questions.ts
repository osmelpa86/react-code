import type {Question} from "../types.ts";
import {create} from "zustand/react";
import confetti from 'canvas-confetti';
import {persist, devtools} from "zustand/middleware";
import {getAllQuestions} from "../services/questions.ts";

interface State {
    questions: Question[];
    currentQuestion: number;
    fetchQuestions: (limit: number) => Promise<void>;
    selectAnswer: (questionId: number, answerIndex: number) => void;
    goNexQuestion: () => void;
    goPreviousQuestion: () => void;
    reset: () => void;
}

export const useQuestionsStore = create<State>()(devtools(persist(
    (set, get) => {
        return {
            questions: [],
            currentQuestion: 0,
            fetchQuestions: async (limit: number) => {
                await getAllQuestions().then(res => {
                    const allQuestions = res.sort(() => Math.random() - 0.5).slice(0, limit)
                    set({questions: allQuestions});
                });
            },
            selectAnswer: (questionId: number, answerIndex: number) => {
                const {questions} = get();
                const newQuestions = structuredClone(questions);
                const questionIndex = newQuestions.findIndex(q => q.id === questionId);
                const questionInfo = newQuestions[questionIndex];
                const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
                if (isCorrectUserAnswer) confetti();

                newQuestions[questionIndex] = {
                    ...questionInfo,
                    isCorrectUserAnswer,
                    userSelectedAnswer: answerIndex
                }
                set({questions: newQuestions})
            },
            goNexQuestion: () => {
                const {currentQuestion, questions} = get();
                const nextQuestion = currentQuestion + 1;
                if (nextQuestion < questions.length) {
                    set({currentQuestion: nextQuestion});
                }
            },
            goPreviousQuestion: () => {
                const {currentQuestion} = get();
                const previousQuestion = currentQuestion - 1;
                if (previousQuestion >= 0) {
                    set({currentQuestion: previousQuestion});
                }
            },
            reset: () => {
                set({questions: [], currentQuestion: 0});
            }
        }
    }, {
        name: 'questions',

    }
)));