const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config(); // Loads variables from a .env file

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE_URL;

mongoose.connect(DB).then(() => {
    console.log('✅ DB connection successful!');
}).catch(err => console.log('❌ DB connection error:', err));

app.listen(PORT, () => {
    console.log(`🚀 Server is flying on http://localhost:${PORT}`);
});







// Replace with your string from Atlas (or put it in a .env file!)
//const DB = "mongodb+srv://user:pass@cluster.mongodb.net/myStore?retryWrites=true&w=majority";
//const DB = "mongodb+srv://sudhirdahal_db:<db_password>@cluster0.nkqxng9.mongodb.net/?appName=Cluster0"