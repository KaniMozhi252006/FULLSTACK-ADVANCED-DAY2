const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const foodModel=require('./models/food');
const PORT=process.env.PORT || 3001;

// mongoose.connect(process.env.MONGOOSE_URI)
mongoose.connect(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ Full MongoDB Error:", err);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/insert',async(req,res)=>{
    const foodName=req.body.foodName;
    const daysSinceIAte=req.body.daysSinceIAte;

    const food=new foodModel({foodName: foodName,daysSinceIAte:daysSinceIAte});
    try{
        await food.save();
        res.status(201).send(`Food item inserted`);
    }
    catch (err){
        res.status(500).send(err);
    }
});

app.get('/read',async(req,res)=>{
    try{
        const foodItems=await foodModel.find({});
        res.status(200).json(foodItems);
    }
    catch(err){
        res.status(500).send(err);
    }
});

app.put('/update',async(req,res)=>{
    const newFoodName=req.body.newFoodName;
    const id=req.body.id;

    try{
        await foodModel.findByIdAndUpdate(id,{foodName:newFoodName});
        res.status(200).send('Food items updated');
    }
    catch(err){
        res.status(500).send(err);
    }
});

app.delete('/delete/:id',async(req,res)=>{
    try{
    const {id}=req.params;
        const deleteItem = await foodModel.findByIdAndDelete(id);
        if(!deleteItem){
            return res.status(404).send('Food item not found');
        }
                res.status(200).send('Food item deleted');

    }
    catch(err){
        res.status(500).send(err);
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`);
});
