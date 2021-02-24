import { connectToDatabase } from '../../../util/mongodb'
import bcrypt from 'bcrypt'
/**
 * Add a new user to the database
 */
export default async (req, res) => {
	try {
		const { db } = await connectToDatabase()

		const { userName, password } = req.query

		const newUser = {
			userName: userName,
			password: await hashPassword(password, 10),
			role: 'user',
		}

		const usersCollection = db.collection('users')

		const userExistsResult = await userExists(userName, usersCollection)

		if (userExistsResult) return res.json(userExistsResponse())

		const user = await createNewUser(newUser, usersCollection)

		if (user.hasError) {
			return res.json(unknownErrorResponse())
		}

		return res.json(userCreatedResponse({ _id: user._id }))
	} catch (err) {
		res.json(err)
	}
}

const createNewUser = async (user, collection) => {
	const result = await collection.insertOne(user)

	if (result.insertedId) {
		return collection.findOne(result.insertedId)
	}
	return { hasError: true }
}

const userExists = async (userName, collection) => {
	const existingUser = await collection.find({ userName: userName }).toArray()
	
	return existingUser.length > 0
}

const userExistsResponse = () => ({
	hasError: true,
	success: false,
	errorMsg: 'Username already exists',
})

const userCreatedResponse = (userData) => ({
	success: true,
	hasError: false,
	...userData,
})

const unknownErrorResponse = () => ({
	hasError: false,
	success: false,
})

const hashPassword = async (password, saltRounds) => {
	try{
		const hashedPW = await bcrypt.hash(password, saltRounds)
		return hashedPW
	} catch (err){
		console.log(err)
	}
	
}