import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import App from './components/App'
import GlobalStyle from './components/styledComponents/GlobalStyle'

ReactDOM.render(
	<React.Fragment>
		<App />
		<GlobalStyle />
	</React.Fragment>,
	document.getElementById('root')
)

serviceWorker.unregister()
