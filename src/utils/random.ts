export const RandomQuestions = (questions: any, isDebug: boolean) => {
  // 随机排序
  const arrQuestions = isDebug
    ? Object.keys(questions)
    : Object.keys(questions).sort(() => Math.random() - 0.5)
  let newQuestions: any = {}
  arrQuestions.forEach((item) => {
    newQuestions[item] = questions[item]
  })
  console.log(`洗牌后的题目：` + arrQuestions)
  return newQuestions
}
