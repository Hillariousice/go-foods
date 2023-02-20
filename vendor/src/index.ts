import express from 'express'
import {PORT} from './config'
import {dbConnection}  from './databased'
import { expressApp } from './express-app'


const StartServer = async() => {
    const app = express()

    await dbConnection()
    await expressApp(app)

    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    }).on('error',(err)=>{
        console.log(err)
        process.exit(1)
    })
}
StartServer()
