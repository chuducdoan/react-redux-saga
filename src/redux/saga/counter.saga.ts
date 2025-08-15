import { put, takeEvery } from "redux-saga/effects";
import {
  decreaseSagaFinish,
  increaseSagaFinish,
} from "../counter/counter.slide";

function* handleIncrease(action: any) {
  yield put(increaseSagaFinish({ value: 2 })); // Giả sử bạn muốn tăng giá trị của state
}

function* handleDecrease(action: any) {
  yield put(decreaseSagaFinish({ value: 2 }));
}

function* CounterSaga() {
  yield takeEvery("counter/incrementSagaStart", handleIncrease); // lắng nghe hành động counter/increment khi đc dispatch thì sẽ thực thi handleSaga
  yield takeEvery("counter/decreaseSagaStart", handleDecrease);
}

export default CounterSaga;
