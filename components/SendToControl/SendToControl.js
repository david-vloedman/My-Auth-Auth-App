import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '../input/TextField/TextField'

export default function SendToControl(props) {
	const { options, onChange } = props
  
	return (
		<Autocomplete
			{...props}
			options={options}
			getOptionLabel={(option) => option.userName}
			onInputChange={onChange}
      name={'sendToField'}
      id={'sendToField'}
			renderInput={(params) => (
				<TextField
					{...params}
					label={'Send to'}
				
				/>
			)}
		/>
	)
}
