
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../../../util/mongodb'
/**
 *  Read a user from the database
 */
export default async (req, res) => {
  try{

    const { db } = await connectToDatabase()

    const {uid} = req.query

    const user = await db.collection('users').findOne(ObjectId(uid))

    res.json(resultsWrapper(user))

  } catch(err){
    console.log(err)
    res.json(JSON.stringify(err))
  }
}

const resultsWrapper = (results) => {
  return{
    count: results.length,
    results: results || []
  }
}