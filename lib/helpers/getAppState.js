import {connectToDatabase} from '../../util/mongodb'
import {ObjectId} from 'mongodb'


export default async (uid) => {
  try {
    console.log(uid)
    const { db } = await connectToDatabase()
    const usersCollection = db.collection('users')
    
    const currentUser = await usersCollection.findOne(ObjectId(uid))
    console.log(currentUser, "CURRENT USER")
    if(currentUser.friends){
      const friends = await usersCollection
      .find({ _id: { $in: [...currentUser.friends] } })
      .project({ _id: 1, userName: 1, name: 1 })
      .toArray()
    
      console.log(currentUser)
      return JSON.stringify({
        ...currentUser,
        friends: friends ? [...friends] : []
      })
    }

    return JSON.stringify({
      ...currentUser
    })
   


  }catch(error){
    console.log(error)
  }
}