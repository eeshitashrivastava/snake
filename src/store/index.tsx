import {
    createStore,
    applyMiddleware
} from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import watcherSagas from "./sagas";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcherSagas);
export default store;

//to define type of state when using `useSelector` or `useDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector` to avoid defining type of state
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//if we only have one reducer we can directly define the type of state with the interface it is defined with instead of RootState 