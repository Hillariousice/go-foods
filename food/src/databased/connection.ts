import {db} from '../config/index'


export const databaseConnection = async()=>{
    db.sync().then(()=>{
        console.log("Db connected successfully")
    }).catch(err=>{
        console.log(err)
        console.log('Error =====')
        process.exit(1)
    })
}