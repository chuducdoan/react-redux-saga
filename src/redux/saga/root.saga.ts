import { all } from "redux-saga/effects";
import CounterSaga from "./counter.saga";
import UserSaga from "./user.saga";
import authSaga from "./auth.saga";

function* RootSaga() {
  yield all([
    // Add your sagas here
    CounterSaga(), // Call the CounterSaga
    UserSaga(),
    authSaga(),
  ]);
}

export default RootSaga;
