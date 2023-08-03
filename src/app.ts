import express, { Application, Request, Response } from 'express'
const app: Application = express()
const port = 3000
import cors from 'cors';


app.use(cors());

// parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Testing purpose
app.get('/', (req: Request, res: Response) => {
    res.send('Working successfully')
})

export default app;