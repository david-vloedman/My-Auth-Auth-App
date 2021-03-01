import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import fetchJson from './fetchJson'

import cookie from 'js-cookie'

export function useUser({
	redirectTo = false,
	redirectIfFound = false,
} = {}) {
	const { data: user, mutate: mutateUser } = useSWR('/api/session/user')
	const router = useRouter()

	useEffect(() => {
		// if no redirect needed, just return (example: already on /dashboard)
		// if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
		if (!redirectTo || !user) return
		console.log(redirectIfFound && !user?.loggedIn)
		if (
			// If redirectTo is set, redirect if the user was not found.
			(redirectTo && !redirectIfFound && !user?.loggedIn) ||
			// If redirectIfFound is also set, redirect if the user was found
			(redirectIfFound && user?.loggedIn)
		) {
			router.push(redirectTo)
		}
	}, [user, redirectIfFound, redirectTo])

	return { user, mutateUser }
}

function getRedirectTo() {
  if (typeof window !== 'undefined' && window.location) {
    return window.location
  }
  return {}
}

// export const withUser = (WrappedComponent) => {
// 	const Wrapper = (props) => {
// 		const { setUser } = useAuth()
// 		const [token, setToken] = useState()
// 		const [userId, setUserId] = useState()
// 		const [shouldFetchUser, setShouldFetchUser] = useState()

// 		const router = useRouter()

// 		const cookieUserId = cookie.get('userId')
// 		const cookieToken = cookie.get('token')

// 		const fetchWithToken = async (url, token) => {
// 			try {
// 				const res = await fetchJson(url, {
// 					method: 'GET',
// 					headers: { 'x-access-token': token },
// 				})
// 				return await res.json()
// 			} catch (error) {
// 				return {}
// 			}
// 		}

// 		const { data: fetchedUser } = useSWR(
// 			shouldFetchUser ? [`api/users/${userId}`, token] : null,
// 			fetchWithToken
// 		)

// 		useEffect(() => {
// 			const redirect = getRedirectTo()

// 			if (cookieToken && cookieUserId) {
// 				setToken(cookieToken)
// 				setUserId(cookieUserId)
// 				setShouldFetchUser(true)
// 			} else {
// 				router.push('/login')
// 			}
// 		}, [fetchedUser])

// 		useEffect(() => {
// 			if(fetchedUser){
// 				setUser(fetchedUser)
// 			}
// 		}, [fetchedUser])

// 		return <WrappedComponent {...props} />
// 	}

// 	return Wrapper
// }
