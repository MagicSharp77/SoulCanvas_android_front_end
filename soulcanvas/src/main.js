import {
	createSSRApp
} from "vue";
import 'vant/lib/index.css'

import App from "./App.vue";
import Vant from 'vant'


export function createApp() {
	const app = createSSRApp(App);
	app.use(Vant)
	return {
		app,
	};
}
