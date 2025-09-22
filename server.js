import express from 'express';
import {GoogleGenAI} from '@google/genai';
import cors from 'cors';
import dotenv from 'dotenv';

const app=express();
const port=5000;

app.use(cors());
app.use(express.json());


const ai=new GoogleGenAI({apiKey:process.env.google_api});

const history=[];

app.post('/chat',async(req,res)=>{
   const {message}=req.body;

   history.push({
     role:"user",
     parts:[{text:message}]
   });

   try{
        const response=await ai.models.generateContent({
          model:"gemini-2.5-flash",
          contents:history
        });
      
       history.push({
        role:'model',
        parts:[{text:response.text}]
       });
       
       res.json({reply: response.text});
   }catch(err){
     console.error(err);
     res.status(500).json({reply:"Something went wrong"})
   }

});

app.listen(port,()=>{
   console.log(`Server running on http://localhost:${port}`);
})