export const getAllQuestions = async () => {
    const res = await fetch('http://localhost:5173/data.json');
    return await res.json();
}