import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App.jsx';
import { AppContainer } from 'react-hot-loader';

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('app')
	);
};

render(App);

if (module.hot) {
	module.hot.accept('./containers/App.jsx', () => {
		render(App);
	});
}
