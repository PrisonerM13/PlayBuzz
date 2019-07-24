import Quiz from './models/Quiz';

const quizesCache = new Map<string, Quiz>();
let quizList: string[] = [];

//#region PUBLIC API
export const getQuizList = async () => {
  if (quizList.length === 0 || quizesCache.size < quizList.length) {
    console.log('getData');
    await getData();
  }
  return Array.from(quizesCache.values(), quiz => quiz.header);
};

export const getQuiz = async (id: string) => {
  if (!quizesCache.has(id)) {
    console.log('getData');
    await getData();
  }
  return quizesCache.get(id);
};
//#endregion PUBLIC API

async function getData() {
  if (quizList.length === 0) {
    quizList = await getList();
  }

  const promises = quizList.map(fileName =>
    fetch(`${process.env.PUBLIC_URL}/data/${fileName}.json`)
      .then(data => data.json().catch(err => err))
      .then(quiz => quizesCache.set(quiz.header.id, new Quiz(quiz)))
      .catch(err => err),
  );

  await Promise.all(promises);
}

async function getList() {
  const data = await fetch(`${process.env.PUBLIC_URL}/data/index.json`);
  return data.json();
}
