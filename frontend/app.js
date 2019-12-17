import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Router
import AppRouter, { history } from "./routers/AppRouter";
// Redux
import configureStore from "./store/configureStore";
import { login, logout } from "./actions/auth";
// Styles
import "./styles/styles.scss";
import "normalize.css/normalize.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// Components
import Loading from "./components/Loading";
// Axios - debug
import { getUserID } from "./services/passport";

const store = configureStore();
store.subscribe(() => {
  console.log(store.getState().auth.uid, typeof store.getState().auth.uid);
});

getUserID().then(spotify_credentials => {
  console.log(spotify_credentials);
  store.dispatch(
    login(spotify_credentials.id, spotify_credentials.access_token)
  );
});

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};
ReactDOM.render(<Loading />, document.getElementById("app"));
renderApp();