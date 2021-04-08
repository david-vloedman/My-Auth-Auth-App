import Head from 'next/head'
import ChessContainer from 'components/containers/ChessContainer/ChessContainer'

export default function friends(props) {
	return (
		<div>
			<Head>
				<title>Chess</title>
			</Head>
			<ChessContainer />
		</div>
	)
}

