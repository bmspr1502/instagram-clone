import { combineReducers } from "redux";
import { user } from "./users";
import { users } from "./usersData";

const Reducers = combineReducers({
  userState: user,
  usersState: users,
});

export default Reducers;
