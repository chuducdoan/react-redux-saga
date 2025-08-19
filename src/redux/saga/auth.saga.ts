import { call, fork, take } from "redux-saga/effects";
import { loginPending, logout } from "../user/user.slide";
import { ILogin } from "../../types/backend";
import { PayloadAction } from "@reduxjs/toolkit";

const authorize = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("login success");
      if (email === "chuducdoan3011@gmail.com" && password === "123456") {
        localStorage.setItem("access_token", "chuducdoan");
        resolve("ok");
      }
      resolve("no thing");
    }, 3000);
  });
};

function* authSaga() {
  console.log("auth saga");
  while (true) {
    const action: PayloadAction<ILogin> = yield take(loginPending);
    // yield call(authorize, action.payload.email, action.payload.password);
    // console.log("run 1");
    // yield take(logout); // đứng lại đây lắng nghe, khi nào dispatch hành động logout nó mới chạy tiếp
    // console.log("run 2");
    // const token = yield call();

    // tạo tiến trình song song trong khi đang thực hiện login chúng ta vẫn có thể thực hiện logout
    yield fork(authorize, action.payload.email, action.payload.password);
    yield take([logout, "Login_ERROR"]);
    console.log("do logout");
  }
}

export default authSaga;
