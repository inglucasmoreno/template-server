import mongoose from 'mongoose';
import chalk from 'chalk';

const dbConnect = async () => {
    try{     
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/remote-control',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false    
        })
        console.log(chalk.blue('[MongoDB]') + ' - Conexion correcta')
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

export default dbConnect;