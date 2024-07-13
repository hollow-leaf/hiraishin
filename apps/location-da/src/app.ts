import express from 'express';
import cors from 'cors'
import {submit, extract} from './submit'
const app = express();

console.log('Server started on port 3000');
const corsOptions = {
  origin: [
    '*'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
  
app.use(express.json())
app.use(cors());
 
app.post('/add_data',async function (req, res) {
    const req_data = req.body
    await submit(req_data)
    console.log(req_data)
})

app.post('/extract_data', async function (req, res) {
    const req_data = req.body
    await extract(req_data.blockHash, req_data.txhash)
})

const server = app.listen(8080, function () {
  const host = (server.address() as any)?.address 
  const port = (server.address() as any)?.port;
 
  console.log("Listen in: http://%s:%s", host, port)
 
})