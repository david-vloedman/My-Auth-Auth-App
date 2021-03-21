import { CreepsterFont } from './Heading.styles'
import Typography from '@material-ui/core/Typography'

export default function Heading(props) {
	const { text, color, variant } = props

	return (
		<Typography variant={variant || 'h6'} data-test-id={'heading'}>
			<CreepsterFont>{text}</CreepsterFont>
		</Typography>
	)
}
