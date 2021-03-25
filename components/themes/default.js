import { createMuiTheme } from '@material-ui/core/styles'


export const themeOptions = {
	palette: {
		type: 'dark',
		primary: {
			main: '#484848',
		},
		secondary: {
			main: '#acbd48',
		},
		error: {
			main: '#ff1600',
		},
		textPrimary: {
			main: '#e8e8e8'
		}
	},
	typography: {
		h1: {
			fontFamily: 'Bebas Neue',
		},
    h2: {
			fontFamily: 'Bebas Neue',
		},
		fontFamily: 'Bebas Neue',
		body1: {
			fontFamily: 'Open Sans',
		},
		body2: {
			fontFamily: 'Open Sans',
		},
		button: {
			fontFamily: 'Open Sans',
		},
		caption: {
			fontFamily: 'Open Sans',
		},
		overline: {
			fontFamily: 'Open Sans',
		},
	},
}

const defaultTheme = createMuiTheme(themeOptions)

export default defaultTheme
