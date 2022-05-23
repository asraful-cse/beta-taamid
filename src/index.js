import React, {StrictMode, Suspense} from 'react';
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import {StepperProvider} from "./Components/Steppers/Context";
import i18n from "i18next";
import './i18n/config'

import "./index.css";
import "flag-icons/css/flag-icons.min.css";
import App from "./App";
import {Provider} from "react-redux";
import Store from "./redux/store/Store";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/jquery/dist/jquery.min.js";


const loadingMarkup = (
    <div className="py-4 text-center">
        <h2>Loading..</h2>
    </div>
);
// Import axios.js so that it can inject token in every request
require ("./services/axios");
require('dotenv').config()
const rootElement = document.getElementById ("root");

ReactDOM.render (
    <StrictMode>
        <Provider store={Store ()}>
      
            <Suspense fallback={loadingMarkup}>
                <React.StrictMode>
                    <StepperProvider>
                        <App/>
                    </StepperProvider>
                </React.StrictMode>
            </Suspense>
         
        </Provider>
        ,
        <ToastContainer/>
    </StrictMode>,

    rootElement
);

reportWebVitals ();
