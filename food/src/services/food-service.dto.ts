export interface IFood{ 
    id: string;
    name: string;
    description: string;
    category:string;
    foodType: string;
    readyTime: number;
    price: number;
    rating:number;
    image:string;
    vendorId: string;
}

export interface FoodPayload{
    productId: string,
    qty:number,
  }