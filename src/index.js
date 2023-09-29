import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import App from "./App";
import 'font-awesome/css/font-awesome.css';
import "simple-toaster/src/simple-toaster.sass"

const renderApp = () =>ReactDOM.render(<App />, document.getElementById("root"));

renderApp();