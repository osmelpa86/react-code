const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

//Normal
// export const  getRandomFact = () => {
//   return fetch(CAT_ENDPOINT_RANDOM_FACT)
//     .then((res) => res.json())
//     .then((data) => {
//       const fact = data.fact;
//       return fact;
//     })
//     .catch((err) => {
//       //Tanto si hay un error con la respuesta
//       //como si hay un error con la peticion
//       new Error(err);
//     });
// };

//Asincrona
export const getRandomFact = async () => {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
  const data = await res.json();
  const { fact } = data;
  return fact;
};
