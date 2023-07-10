const {MongoClient} = require('mongodb')
const url= 'mongodb://localhost:27017';
const databaseName='e-ParikshaCell'
const client= new MongoClient(url);

async function dbConnect()
{
    let result = await client.connect();
    db= result.db(databaseName);
    return db.collection('faculty');
  
}

const insertData=async ()=>{
   let data = await dbConnect();
  let result = await data.insertMany(
      [
        {username:'Suman',password:'Suman@2002'},
        {username:'Kreeti',password:'Kreeti@2003'},
        {username:'Poulami',password:'Poulami@2001'},
        {username:'Shradha',password:'Shradha@2000'},
        {username:'Mandar',password:'Mandar@2004'},
        {username:'Sheena',password:'Sheena@2005'},
        {username:'Nilima',password:'Nilima@2006'},
        {username:'Vaishali',password:'Vaishali@2000'},

      ]
  )
  if(result.acknowledged)
  {
      console.warn("data is inserted")
  }
}

insertData();