import { v4 as uuidv4 } from "uuid";
import { FoodAttributes,FoodInstance  } from "../model";



export class FoodRepository{
  
    async CreateFood({id,name,
        description,
        category,
        foodType,
        readyTime,
        price,
        rating,
        image,vendorId}:FoodAttributes){
        try{
            const food = new FoodInstance({id,name,
                description,
                category,
                foodType,
                readyTime,
                price,
                rating,
                image,vendorId}) 
            
            return food
        }catch(err){
            console.log(err)
        }
    }
    async FindById(id: string ) {
        return await FoodInstance.findOne({where:{id:id}});
      }
   
}