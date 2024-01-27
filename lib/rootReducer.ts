import { combineReducers } from "@reduxjs/toolkit";
import { usersReducer } from "./features/users/usersSlice";
import { banksReducer } from "./features/banks/banksSlice";
import { announcementsReducer } from "./features/announcements/announcementsSlice";
import { pendingTransactionsReducer } from "./features/pending-transactions/pendingTransactionsSlice";
import { dialogsReducer } from "./features/dialogs/dialogsSlice";
import { customerReducer } from "./features/customers/customerSlice";
import { accountsReducer } from "./features/accounts/accountsSlice";
import { appBarReducer } from "./features/app-bar/appBarSlice";

const appReducer = combineReducers({
  users: usersReducer,
  banks: banksReducer,
  announcements: announcementsReducer,
  accounts: accountsReducer,
  pendingTransactions: pendingTransactionsReducer,
  dialogs: dialogsReducer,
  customers: customerReducer,
  appBar: appBarReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
