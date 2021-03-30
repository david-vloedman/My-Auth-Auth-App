import Document from 'next/document'
import Head from 'next/head'
import { ServerStyleSheet as StyledComponentsSheet } from 'styled-components'
import { ServerStyleSheets as MaterialUiSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const styledComponentSheet = new StyledComponentsSheet()
		const materialUiSheets = new MaterialUiSheets()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						styledComponentSheet.collectStyles(
							materialUiSheets.collect(<App {...props} />)
						),
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{materialUiSheets.getStyleElement()}
						{styledComponentSheet.getStyleElement()}
					</>
				),
			}
		} finally {
			styledComponentSheet.seal()
		}
	}
}
