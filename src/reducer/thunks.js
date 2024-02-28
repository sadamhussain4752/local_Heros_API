// thunks.js

import axios from "axios";
import {
  fetchHeaderRequest,
  fetchHeaderSuccess,
  fetchHeaderFailure,
  fetchProductFailure,
  fetchProductRequest,
  fetchProductSuccess,
  fetchStoreFailure,
  fetchStoreRequest,
  fetchStoreSuccess,
  CreateStoreSuccess,
  CreateStoreRequest,
  CreateStoreFailure,
  LoginStoreRequest,
  LoginStoreSuccess,
  LoginStoreFailure,
  ProfileFailure,
  ProfileRequest,
  ProfileSuccess,
  OrderSuccess,
  OrderRequest,
  OrderFailure,
  ProductIdSuccess,
  ProductIdRequest,
  ProductIdFailure,
  AddCardIdRequest,
  AddCardIdSuccess,
  AddCardIdFailure,
  GetAddCardIdRequest,
  GetAddCardIdSuccess,
  GetAddCardIdFailure,
  DeleteAddCardIdRequest,
  DeleteAddCardIdSuccess,
  DeleteAddCardIdFailure,
  EditProductRequest,
  EditProductSuccess,
  EditProductFailure,
  AddProductRequest,
  AddProductSuccess,
  AddProductFailure,
  UserDataRequest,
  UserDataSuccess,
  UserDataFailure,
  BrandIdRequest,
  BrandIdSuccess,
  BrandIdFailure,
  RegistionStoreRequest,
  RegistionStoreSuccess,
  RegistionStoreFailure,
  AdminDataRequest,
  AdminDataSuccess,
  AdminDataFailure,
  DeleteProductRequest,
  DeleteProductSuccess,
  DeleteProductFailure,
  GetOurStaffRequest,
  GetOurStaffSuccess,
  GetOurStaffFailure,
  AddEmployeeRequest,
  AddEmployeeSuccess,
  AddEmployeeFailure,
  GetProfileRequest,
  GetProfileSuccess,
  GetProfileFailure,
  BannerRequestRequest,
  BannerRequestSuccess,
  BannerRequestFailure,
  FAQRequest,
  FAQRequestSuccess,
  FAQRequestFailure,
} from "./actions";
import constant from "../constant/constant";

const Dashboardlist = `${constant.baseUrl}api/order/Dashboardlist`;
const ProductList = `${constant.baseUrl}api/header/allbrandproduct?lang=1`;
const storeListcategories = `${constant.baseUrl}api/category/categories`;
const EditCategory = `${constant.baseUrl}api/category/categories`;
const DeleteCategory = `${constant.baseUrl}api/category/categories`;
const AddCategory = `${constant.baseUrl}api/category/addcategories`;
const Userlogin = `${constant.baseUrl}api/user/login`;
const Userprofile = `${constant.baseUrl}api/product/allProduct`;
const EditUserprofile = `${constant.baseUrl}api/product/Product`;
const DeleteUserprofile = `${constant.baseUrl}api/product/Product`;
const AllUserList = `${constant.baseUrl}api/user/list`;
const AddProduct = `${constant.baseUrl}api/product/addProduct`;
const Useraddress = `${constant.baseUrl}api/order/Orderlist`;
const UserBrandid = `${constant.baseUrl}api/brand/allbrand`;
const AddBrandid = `${constant.baseUrl}api/brand/addbrand`;
const AddEmployessUser = `${constant.baseUrl}api/faq/addfaq`;
const EditEmployessUser = `${constant.baseUrl}api/faq/faq`;
const DeleteEmployessUser = `${constant.baseUrl}api/faq/faq/`;
const EditBrandid = `${constant.baseUrl}api/header/banner`;
const DeleteBrandid = `${constant.baseUrl}api/header/banner`;
const CreateUser = `${constant.baseUrl}api/user/register`;
const EditUser = `${constant.baseUrl}api/user/User`;
const DeleteUser = `${constant.baseUrl}api/user/deleteUser`;
const AdminUserList = `${constant.baseUrl}api/user/adminUser`;
const AddCardProductid = `${constant.baseUrl}api/addcart/createCartItem`;
const GetAddCardProductcard = `${constant.baseUrl}api/addcart/addcartUser`;
const DelAddCardProductcard = `${constant.baseUrl}api/addcart/deleteCartItem`;
const GetStafflist = `${constant.baseUrl}api/faq/allfaq`;
const Getprofilelist = `${constant.baseUrl}api/user/userGetById`;
const Getbannerlist = `${constant.baseUrl}api/header/getbannerlist?lang=1`;
const Getallfaqlist = `${constant.baseUrl}api/faq/allfaq?lang=IN`;
const AddBannerList = `${constant.baseUrl}api/header/addbanner`;

export const fetchDashboardlistData = () => async (dispatch) => {
  dispatch(fetchHeaderRequest());

  try {
    const response = await axios.get(Dashboardlist);
    dispatch(fetchHeaderSuccess(response.data));
  } catch (error) {
    dispatch(fetchHeaderFailure(error.message));
  }
};

export const fetchProductData = () => async (dispatch) => {
  dispatch(fetchProductRequest());

  try {
    const response = await axios.get(ProductList);
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductFailure(error.message));
  }
};
export const fetchStoreCategory = () => async (dispatch) => {
  dispatch(fetchStoreRequest());

  try {
    const response = await axios.get(storeListcategories);
    dispatch(fetchStoreSuccess(response.data));
  } catch (error) {
    dispatch(fetchStoreFailure(error.message));
  }
};

export const EditCategoryData = (id, body) => async (dispatch) => {
  dispatch(CreateStoreRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.put(`${EditCategory}/${id}`, body);
    dispatch(CreateStoreSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(CreateStoreFailure(error.response.data.error));
  }
};

export const DeleteCategoryData = (id, body) => async (dispatch) => {
  dispatch(CreateStoreRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.delete(`${DeleteCategory}/${id}`);
    dispatch(CreateStoreSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(CreateStoreFailure(error.response.data.error));
  }
};
export const AddCategoryData = (id, body) => async (dispatch) => {
  dispatch(CreateStoreRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(`${AddCategory}`, body);
    dispatch(CreateStoreSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(CreateStoreFailure(error.response.data.error));
  }
};

export const LoginUserData = (body) => async (dispatch) => {
  dispatch(LoginStoreRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(Userlogin, body);
    dispatch(LoginStoreSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(LoginStoreFailure(error.response.data.message));
  }
};
export const CreateUserData = (body) => async (dispatch) => {
  dispatch(RegistionStoreRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(CreateUser, body);
    dispatch(RegistionStoreSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(RegistionStoreFailure(error.response.data));
  }
};

export const EditUserData = (id, body) => async (dispatch) => {
  dispatch(RegistionStoreRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.put(`${EditUser}/${id}`, body);
    dispatch(RegistionStoreSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(RegistionStoreFailure(error.response.data.message));
  }
};

export const DeleteUserData = (id, body) => async (dispatch) => {
  dispatch(RegistionStoreRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.delete(`${DeleteUser}/${id}`);
    dispatch(RegistionStoreSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(RegistionStoreFailure(error.response.data.message));
  }
};
export const ProductListUserData = (body) => async (dispatch) => {
  dispatch(ProfileRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${Userprofile}?lang=${body}`);
    dispatch(ProfileSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(ProfileFailure(error.response.data.message));
  }
};

export const EditProductUserData = (body, bodypass) => async (dispatch) => {
  dispatch(EditProductRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.put(`${EditUserprofile}/${body}`, bodypass);
    dispatch(EditProductSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(EditProductFailure(error.response.data.message));
  }
};

export const DeleteProductUserData = (body, bodypass) => async (dispatch) => {
  dispatch(DeleteProductRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.delete(`${DeleteUserprofile}/${body}`);
    dispatch(DeleteProductSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(DeleteProductFailure(error.response.data.message));
  }
};

export const AddProductData = (body, bodypass) => async (dispatch) => {
  dispatch(AddProductRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(`${AddProduct}`, bodypass);
    dispatch(AddProductSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(AddProductFailure(error.response.data.message));
  }
};

export const UserListData = (body) => async (dispatch) => {
  dispatch(UserDataRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${AllUserList}`);
    dispatch(UserDataSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(UserDataFailure(error.response.data.message));
  }
};
export const AdminUserLists = (body) => async (dispatch) => {
  dispatch(AdminDataRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${AdminUserList}`);
    dispatch(AdminDataSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(AdminDataFailure(error.response.data.message));
  }
};

export const OrderUserList = () => async (dispatch) => {
  dispatch(OrderRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${Useraddress}`);
    dispatch(OrderSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(OrderFailure(error.response.data.message));
  }
};
export const GetBrandUserById = (body) => async (dispatch) => {
  dispatch(ProductIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${Getbannerlist}`);
    dispatch(ProductIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(ProductIdFailure(error.response.data.message));
  }
};

export const AddBrandUserById = (body) => async (dispatch) => {
  dispatch(BrandIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(`${AddBannerList}`, body);
    dispatch(BrandIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(BrandIdFailure(error.response.data.message));
  }
};
export const EditBrandUserById = (id, body) => async (dispatch) => {
  dispatch(BrandIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.put(`${EditBrandid}/${id}`, body);
    dispatch(BrandIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(BrandIdFailure(error.response.data.message));
  }
};
export const DeleteBrandUserById = (id, body) => async (dispatch) => {
  dispatch(BrandIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.delete(`${DeleteBrandid}/${id}`);
    dispatch(BrandIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(BrandIdFailure(error.response.data.message));
  }
};
export const AddCardProductById = (body) => async (dispatch) => {
  dispatch(AddCardIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(AddCardProductid, body);
    dispatch(AddCardIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(AddCardIdFailure(error.response.data.message));
  }
};
export const GetAddCardProductById = (body) => async (dispatch) => {
  dispatch(GetAddCardIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${GetAddCardProductcard}/${body}`);
    dispatch(GetAddCardIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(GetAddCardIdFailure(error.response.data.message));
  }
};
export const DeleteAddCardProductById = (body) => async (dispatch) => {
  dispatch(DeleteAddCardIdRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.delete(`${DelAddCardProductcard}/${body}`);
    dispatch(DeleteAddCardIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(DeleteAddCardIdFailure(error.response.data.message));
  }
};
export const GetstaffListById = (body) => async (dispatch) => {
  dispatch(GetOurStaffRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${GetStafflist}`);
    dispatch(GetOurStaffSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(GetOurStaffFailure(error.response.data.message));
  }
};
export const GetprofileListById = (id) => async (dispatch) => {
  dispatch(GetProfileRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.get(`${Getprofilelist}/${id}`);
    dispatch(GetProfileSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(GetProfileFailure(error.response.data.message));
  }
};

export const AddEmployeesById = (body) => async (dispatch) => {
  dispatch(AddEmployeeRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.post(`${AddEmployessUser}`, body);
    dispatch(AddEmployeeSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(AddEmployeeFailure(error.response.data.message));
  }
};

export const EditEmployeesById = (id, body) => async (dispatch) => {
  dispatch(AddEmployeeRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.put(`${EditEmployessUser}/${id}`, body);
    dispatch(AddEmployeeSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(AddEmployeeFailure(error.response.data.message));
  }
};

export const DeleteEmployeesById = (id, body) => async (dispatch) => {
  dispatch(AddEmployeeRequest());

  try {
    // Send the POST request with the provided body data
    const response = await axios.delete(`${DeleteEmployessUser}/${id}`, body);
    dispatch(AddEmployeeSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(AddEmployeeFailure(error.response.data.message));
  }
};

export const fetchStorebanner = (id) => async (dispatch) => {
  dispatch(BannerRequestRequest());

  try {
    const response = await axios.get(`${Getbannerlist}?lang=${id}`);
    dispatch(BannerRequestSuccess(response.data));
  } catch (error) {
    dispatch(BannerRequestFailure(error.message));
  }
};

export const fetchFaqlist = (id) => async (dispatch) => {
  dispatch(FAQRequest());

  try {
    const response = await axios.get(`${Getallfaqlist}`);
    dispatch(FAQRequestSuccess(response.data));
  } catch (error) {
    dispatch(FAQRequestFailure(error.message));
  }
};
