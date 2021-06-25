import { useRouter } from 'next/router'

export default function OpenMatch({ matchId, OpenMatchButton }) {
  const router = useRouter()
	const onClick = () => {
    router.push(`/chess?mid=${matchId}`)
	}

	return <OpenMatchButton onClick={onClick} />
}
