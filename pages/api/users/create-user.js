import { connectToDatabase } from '../../../util/mongodb'
import bcrypt from 'bcrypt'
/**
 * Add a new user to the database
 */
export default async (req, res) => {
	try {
		const { db } = await connectToDatabase()
		// get data from the request
		const { userName, password, firstName, lastName } = JSON.parse(req.body)
		
		const newUser = {
			firstName: firstName.substring(0, 25), // limit size
			lastName: lastName.substring(0, 25), // limit size
			userName,
			password,
			role: 'user',
		}
		// validate data
		if (!validUserName(newUser.userName)) return res.json(userNameNotValidResponse())

		if (!validPassword(newUser.password)) return res.json(passwordNotValidResponse())
		
		//hash the password before saving
		newUser.password = await hashPassword(newUser.password, 10)
	
		// establish the collection we're using
		const usersCollection = db.collection('users')
		// check if the user name already exists in the collection
		const userExistsResult = await userExists(newUser.userName, usersCollection)

		if (userExistsResult) return res.json(userExistsResponse())
		// create a new user
		const user = await createNewUser(newUser, usersCollection)
		// if user creation failed, return error
		if (user.hasError) {
			return res.json(unknownErrorResponse())
		}
		// return the id of the newly created user
		return res.json(userCreatedResponse({ _id: user._id }))
	} catch (err) {
		console.log(err)
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
	errorSource: 'userName',
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
	errorSource: 'userName',
	errorMsg: 'Username must be greater than 5 characters',
})

const passwordNotValidResponse = () => ({
	success: false,
	hasError: true,
	errorSource: 'password',
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
