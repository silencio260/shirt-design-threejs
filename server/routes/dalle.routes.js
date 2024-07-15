import express, { response } from 'express'
import * as dotenv from 'dotenv'

import OpenAIApi from 'openai'

dotenv.config()

const router = express.Router()

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY
})


router.route('/').get((req, res) => {
    res.status(200).json({message: "Hello from DALL.E Route"})
})

router.route('/').post(async( req, res) => {
    try {

        const { prompt } = req.body

        const response = await openai.createImage({
            prompt,
            n: 1, 
            size: '1024x1024',
            response_format: 'b64_json'
        })

        const image = response.data.data[0].b64_json;

        res.status(200).json({ phone: image})
        
    } catch (error) {
        console.log(error)
        return  res.status(500).json({message: "Something went wrong"})
    }
})

export default router
