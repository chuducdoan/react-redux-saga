import { all } from "redux-saga/effects";
import CounterSaga from "./counter.saga";
import UserSaga from "./user.saga";

function* RootSaga() {
  yield all([
    // Add your sagas here
    CounterSaga(), // Call the CounterSaga
    UserSaga(),
  ]);
}

export default RootSaga;
