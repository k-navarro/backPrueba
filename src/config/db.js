
const mongoose = require('mongoose');


const urlDb ="mongodb+srv://kevinnavarto:5ROMdjsNFevl0QPU@cluster0.d3ypbsb.mongodb.net/?retryWrites=true&w=majority"

const dbConection =  () =>{

  mongoose.connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
  db.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
  });

}

module.exports= dbConection;

