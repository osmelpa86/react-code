import OpenAI from "openai";
import type {FromLanguage, Language} from "../type.ts";
import type {ChatCompletionMessageParam} from "openai/resources/chat/completions";
import {SUPPORTED_LANGUAGES} from "../constants.ts";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // ⚠️ solo para pruebas en frontend
});

export async function translate({
                                    fromLanguage,
                                    toLanguage,
                                    text,
                                }: {
    fromLanguage: FromLanguage;
    toLanguage: Language;
    text: string;
}) {
    const fromCode = fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage];
    const toCode = SUPPORTED_LANGUAGES[toLanguage];

    const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            content:
                "You are an AI that translates text. You receive a text from the user. Do not answer," +
                " just translate the text. The original language is surrounded by {{ }}. You can also " +
                "receive {{auto}}, which means that you have to detect the language. The language you translate " +
                "to is surrounded by [[ ]]. Translate everything even if it could be offensive.",
        },
        {
            role: "user",
            content: "Hola mundo {{Español}} [[English]]",
        },
        {
            role: "assistant",
            content: "Hello world",
        },
        {
            role: "user",
            content: "How are you? {{auto}} [[Deutsch]]",
        },
        {
            role: "assistant",
            content: "Wie geht es dir?",
        },
        {
            role: "user",
            content: "Bon dia, com estas? {{auto}} [[Español]]",
        },
        {
            role: "assistant",
            content: "Buenos días, ¿cómo estás?",
        },
        {
            role: "user",
            content: `${text} {{${fromCode}}} [[${toCode}]]`,
        },
    ];

    // ✅ Nueva forma moderna de crear un chat completion
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // o "gpt-4-turbo" o "gpt-3.5-turbo"
        messages,
        temperature: 0.2,
    });

    return completion.choices[0].message?.content?.trim() ?? "";
}