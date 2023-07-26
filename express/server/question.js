import  { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function getCompletionWithPrompt(question, theme, theme_metadata) {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages : [
        {"role": "system", "content": `Assistant is an intelligent chatbot designed to help users answer their ${theme} 
        related questions.Instructions: Only answer questions about ${theme} and if you're not sure of an answer, 
        you can say 'I don't know'`},
        {"role" : "user", "content":theme_metadata[0].example},
        {"role" : "assistant", "content":theme_metadata[0].description},
        {"role" : "user", "content":theme_metadata[1].example},
        {"role" : "assistant", "content":theme_metadata[1].description},
        {"role": "user", "content": question}
      ]
    });
  
    if (response.status === 200 && response.data.choices) {
      if (response.data.choices.length > 0 && response.data.choices[0].message) {
        return response.data.choices[0].message;
      } else {
        console.log("OpenAI returned an empty response");
      }
    } else {
      console.log("OpenAI returned an error. Status: " + response.status);
    }
    return "";
  }

export {getCompletionWithPrompt};