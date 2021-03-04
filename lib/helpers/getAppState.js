import {connectToDatabase} from '../../util/mongodb'
import {ObjectId} from 'mongodb'


export default async (uid) => {
  try {
    console.log(uid)
    const { db } = await connectToDatabase()
    const usersCollection = db.collection('users')
    
    const currentUser = await usersCollection.findOne(ObjectId(uid))
    
    const friends = await usersCollection
      .find({ _id: { $in: [...currentUser.friends] } })
      .project({ _id: 1, userName: 1, name: 1 })
      .toArray()
  
      return JSON.stringify({
        ...currentUser,
        friends: [...friends]
      })


  }catch(error){
    console.log(error)
  }
}