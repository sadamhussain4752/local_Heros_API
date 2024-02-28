// rootReducer.js

import { combineReducers } from 'redux';
import dataReducer from './reducer';

const rootReducer = combineReducers({
  data: dataReducer,
  productlist: dataReducer,
  storelist: dataReducer,
  Editcategory: dataReducer,
  loginData: dataReducer,
  getproductlist: dataReducer,
  getUserDatalist: dataReducer,
  getOrder: dataReducer,
  GetProductId: dataReducer,
  GetAddcardRes: dataReducer,
  GetAddcardUserRes: dataReducer,
  DeleteAddcardUserRes: dataReducer,
  GetBrandId: dataReducer,
  createData: dataReducer,
  GetStorelist: dataReducer,
  EditproductbyId: dataReducer,
  DeleteProductId: dataReducer,
  GetStaffList: dataReducer,
  addStaffList: dataReducer,
  GetProfileList: dataReducer,
  GetBannerList: dataReducer,
  GetFaqList: dataReducer,
});

export default rootReducer;
