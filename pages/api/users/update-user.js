import { connectToDatabase } from '../../../util/mongodb'
/**
 * Update an existing user in the DB
 */
export default async (req, res) => {
	try {
		const { db } = await connectToDatabase()

    const { query, propsToUpdate } = req.body
    
    if(!query || !propsToUpdate) return res.json({error: "no params"})

		const update = { $set: propsToUpdate}

    const result = await db.collection('users').findOneAndUpdate(query, update)

    res.json(result.toArray())
    
	} catch (err) {
    console.log(err)
    res.json(err)
	}
}
