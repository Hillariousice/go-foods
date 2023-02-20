import dotEnv from 'dotenv'
import {Sequelize} from 'sequelize';

export const db = new Sequelize('app', '', '',{
    storage:"./food.sqlite",
    dialect:"sqlite",
    logging:false
})


if(process.env.NODE_ENV !== "prod"){
    const configFile =`.env.${process.env.NODE_ENV}`
    require('dotenv').config({
        path:configFile
    })
}else{
    dotEnv.config()
}


export const PORT = process.env.PORT as string


export const DB_URL = process.env.DB_URL as string
export const APP_SECRET= process.env.APP_SECRET as string


export const accountSid = process.env.AccountSID as string
export const authToken = process.env.AuthToken as string

export const fromAdminPhone = process.env.fromAdminPhone as string

export const GMAIL_USER=process.env.GMAIL_USER as string
export const GMAIL_PASS=process.env.GMAIL_PASS as string
export const FromAdminMail=process.env.FromAdminMail as string
export const userSubject=process.env.userSubject as string