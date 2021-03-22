import {TextField as MuiTextField} from '@material-ui/core/'

export default function TextField(props){
  return <MuiTextField 
  {...props}
  InputLabelProps={{
    style: { color: '#e8e8e8' },
  }}
  />
}