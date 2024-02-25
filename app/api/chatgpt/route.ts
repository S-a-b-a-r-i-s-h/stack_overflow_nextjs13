// import { NextResponse } from "next/server";

// export const POST = async (request: Request) => {
//     const { question } = await request.json();

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are a knowlegeable assistant that provides quality information.'
//           }, {
//             role: 'user',
//             content: `Tell me ${question}`
//           }
//         ]
//       })
//     })

//     const responseData = await response.json();
//     console.log('Response:', responseData);
//     const reply = responseData.choices[0].message.content;
//     console.log('Reply:', reply);
//     return NextResponse.json({ reply })
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message })
//     }
// }

// import { NextResponse } from "next/server";

// export const POST = async (request: Request) => {
//     const { question } = await request.json();

//     try {
//         const response = await fetch('https://api.gemini.ai/v1/text', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${process.env.GEMINI_API_KEY}`
//             },
//             body: JSON.stringify({
//                 prompt: `Tell me ${question}`,
//                 temperature: 0.3, // Adjust temperature as needed
//                 max_tokens: 64 // Adjust max_tokens as needed
//             })
//         });

//         const responseData = await response.json();
//         console.log('Response:', responseData);
//         const reply = responseData.text;
//         console.log('Reply:', reply);

//         return NextResponse.json({ reply });
//     } catch (error: any) {
//         console.error('Error generating text:', error);
//         return NextResponse.json({ error: 'An error occurred while generating text.' });
//     }
// };

// import { GoogleGenerativeAI } from "@google/generative-ai";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const { question } = await request.json();
    const API_KEY: string = `${process.env.GEMINI_API_KEY}`;
    
    try {
        // const genAI = new GoogleGenerativeAI(JSON.stringify(API_KEY));
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = question;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        // console.log(text);
        return NextResponse.json({ text });
        // return text;
    } catch (error: any) {
        console.error('Error generating text:', error);
        return NextResponse.json({ error: 'An error occurred while generating text.' });
    }
};




// const API_KEY = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(JSON.stringify(API_KEY));

// async function run() {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = 

//   const result = await model.generateContent(prompt);
//   const response = result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();