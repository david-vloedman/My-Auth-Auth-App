import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default function OpenMatchButton({onClick}){
  return (
    <IconButton onClick={onClick}>
      <PlayArrowIcon />
    </IconButton>
  )
}