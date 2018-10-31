import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const TemplateValuesContext = React.createContext({
  title: 'bem vindo ao nubank',
  subtitle: 'estamos dobrando o seu limite, because of reasons'
})

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <TemplateValuesContext.Consumer>
        {value => (
          <html>
            <Head>
              <title>My page</title>
              {this.props.styleTags}
            </Head>
            <body>
              <div>
                <span> {value.title} </span>
                <span> {value.subtitle} </span>
              </div>
              <Main />
              <NextScript />
            </body>
          </html>
          )
        }
      </TemplateValuesContext.Consumer>
    )
  }
}
