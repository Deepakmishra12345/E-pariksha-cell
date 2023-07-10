const {MongoClient} = require('mongodb')
const url= 'mongodb://localhost:27017';
const databaseName='e-ParikshaCell'
const client= new MongoClient(url);

async function dbConnect()
{
    let result = await client.connect();
    db= result.db(databaseName);
    return db.collection('admin');
  
}

const insertData=async ()=>{
   let data = await dbConnect();
  let result = await data.insertMany(
      [
          {name:'Omkar',password:'2002'},
          {name:'Deepak',password:'2003'},
          {name:'Satyam',password:'2001'},
          {name:'Hritik',password:'2000'},

      ]
  )
  if(result.acknowledged)
  {
      console.warn("data is inserted")
  }
}

insertData();