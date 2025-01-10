const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    try{
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB successfully!");
    }catch(error){
        console.log("Error connecting to MongoDB:",error);
    }
}

main().then((res)=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to mongoDB: ",err);
});

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"677ce79863b65df3608987d6"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();