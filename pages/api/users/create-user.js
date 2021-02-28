import { connectToDatabase } from '../../../util/mongodb'
import bcrypt from 'bcrypt'
/**
 * Add a new user to the database
 */
export default async (req, res) => {
	try {
		const { db } = await connectToDatabase()

		const body = JSON.parse(req.body)
		console.log(body)
		const { userName, password, firstName } = JSON.parse(req.body)

		if (!validUserName(userName)) {
			return res.json(userNameNotValidResponse())
		}

		if (!validPassword(password)) {
			return res.json(passwordNotValidResponse())
		}

		const newUser = {
			name: firstName,
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

const userNameNotValidResponse = () => ({
	success: false,
	hasError: true,
	errorMsg: 'Username must be greater than 5 characters',
})

const passwordNotValidResponse = () => ({
	success: false,
	hasError: true,
	errorMsg: 'Password must be greater than 8 characters',
})

const unknownErrorResponse = () => ({
	hasError: true,
	success: false,
	errorMsg: 'Cannot create user at this time.',
})

const hashPassword = async (password, saltRounds) => {
	try {
		const hashedPW = await bcrypt.hash(password, saltRounds)
		return hashedPW
	} catch (err) {
		console.log(err)
	}
}

const validPassword = (password) => {
	return password.length > 8
}

const validUserName = (userName) => {
	return userName.length > 5
}
