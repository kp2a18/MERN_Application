


const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        await mongoose.connect('mongodb://food_application:Priya9918!@ac-nqasal3-shard-00-00.p19ve0u.mongodb.net:27017,ac-nqasal3-shard-00-01.p19ve0u.mongodb.net:27017,ac-nqasal3-shard-00-02.p19ve0u.mongodb.net:27017/food_application?ssl=true&replicaSet=atlas-vjfqla-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
        const db = mongoose.connection.db;
        const foodItems = await db.collection("food_items").find({}).toArray();
        const foodCategory = await db.collection("foodCategory").find({}).toArray();

        global.food_items = foodItems;
        console.log(global.food_items);
        global.foodCategory = foodCategory;
        console.log(global.foodCategory);



    }
    catch (error) {

        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }

};

module.exports = mongoDB;




