import {connectToDatabase} from '../../util/mongodb'

export default async (req, res) => {
  
  const {db} = await connectToDatabase();
  
  const {userName, password} = req.query;

  const newUser = {
    userName: userName,
    password: password,
    role: 'user'
  }

  const usersCollection = db.collection('users')

  usersCollection.deleteMany({})

  const existingUser = await usersCollection.find({userName: userName}).toArray()
  console.log(existingUser)
  if(existingUser.length > 0){
    const responseJson = {
      hasError: true,
      error: 'Username is already taken'
    }

    return res.json(responseJson)
  }


  const result = await usersCollection.insertOne(newUser)

  try {
    const cursor = await db.collection('users').find({userName: userName}).toArray()  
    
    res.json(JSON.stringify(cursor))
    
    
  } catch(err){
    res.json(err)
  }
  
};
