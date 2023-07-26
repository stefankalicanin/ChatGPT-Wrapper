import express from 'express' ;
import { getCompletionWithPrompt } from "./question.js";

const app = express ();
const port = 3500;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/question', (req, res) => {
  const question = req.query.question
  const theme = req.query.theme
  const theme_meta_data = JSON.parse(req.query.theme_metadata)
  getCompletionWithPrompt(question, theme, theme_meta_data)
  .then(resu  => {
    res.send(resu);
  })
})


