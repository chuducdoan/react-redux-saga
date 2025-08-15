import { call, put, takeEvery } from "redux-saga/effects";
import {
  createUserPending,
  createUserSuccess,
  fetchUserFailed,
  fetchUserPending,
  fetchUserSuccess,
} from "../user/user.slide";
import { IUser } from "../../types/backend";
import { PayloadAction } from "@reduxjs/toolkit";

const fetchUser = async () => {
  const res = await fetch("http://localhost:8000/users");
  return res.json();
};

const fetchCreateUser = async (email: string, name: string) => {
  const res = await fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      name: name,
    }),
  });
  return res.json();
};

function* handleFetchUser() {
  try {
    const users: IUser[] = yield call(fetchUser);
    yield put(fetchUserSuccess(users));
  } catch (error) {
    yield put(fetchUserFailed());
  }
}

function* handleCreateUser(
  action: PayloadAction<{ email: string; name: string }>
) {
  try {
    // console.log("action", action);
    yield call(fetchCreateUser, action.payload.email, action.payload.name);
    yield put(createUserSuccess());
    yield put(fetchUserPending());
  } catch (error) {
    yield put(fetchUserFailed());
  }
}

function* UserSaga() {
  yield takeEvery(fetchUserPending, handleFetchUser);
  yield takeEvery(createUserPending, handleCreateUser);
}

export default UserSaga;
