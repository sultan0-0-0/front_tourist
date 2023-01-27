import { combineReducers, createStore } from 'redux';
import blogReducer from './blog-reducer';

const reducers = combineReducers({
  blogReducer,
});

const store = createStore(reducers);

export default store;
