import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

import logger from "redux-logger";

const store = configureStore({
    reducer: reducer,
    middleware: [logger]
})

export default store;