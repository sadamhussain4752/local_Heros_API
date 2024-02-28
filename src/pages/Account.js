import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Modal, Row, Col, Form, Input, Result } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  EditUserData,
  GetprofileListById,
  OrderUserList,
} from "../reducer/thunks";
import moment from "moment";
import constant from "../constant/constant";
import Loader from "../components/Loader";

const Account = () => {
  document.title = "Winter Bear";
  document.getElementsByTagName("META")[2].content = "Winter Bear";
  const formRef = useRef();
  const [form] = Form.useForm();
  const [uploads, setupload] = useState(false);
  let userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  const {
    loading: getOrderUserLoading,
    Ordererror: getOrderUserError,
    GetProfileList: getOrderResponse,
  } = useSelector((state) => state.GetProfileList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(GetprofileListById(userId));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch, userId]);
  const showMessage = () => {
    console.log("working");
  };
  const handleLogin = async (values) => {
    if (values.firstname && values.lastname) {
      let body = {
        firstname: values.firstname,
        lastname: values.lastname,
        mobilenumber: values.mobilenumber,
        email: values.email,
        password: getOrderResponse?.User.password,
        UserType: getOrderResponse?.User.UserType,
        lang: getOrderResponse?.User.lang,
        verified: getOrderResponse?.User.verified, //Japan: JPN ,Korea: KOR ,India: IND ,Australia: AUS
      };
      // Dispatch the loginUserData action
      await dispatch(EditUserData(getOrderResponse?.User._id, body));
      console.log(body);
      setupload(!uploads);
    } else {
      // Handle validation errors or show a message to the user
      console.error("Please enter valid data for registration");
    }
  };

  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-md-10 bg-light">
            <div className="main px-5 my-5">
              <div className="row">
                <p className="fs-3 fw-semibold"> Account Setting</p>

                <div className="col-md-12 row">
                  <div className="col-md-4 bg-white p-4 m-2">
                    {getOrderResponse && getOrderResponse?.User && (
                      <div className="p-3">
                        <Form
                          form={form}
                          initialValues={getOrderResponse?.User}
                          onFinish={handleLogin}
                          requiredMark={false}
                        >
                          {Object.entries(getOrderResponse?.User).map(
                            ([key, value]) =>
                              key !== "__v" &&
                              key !== "_id" &&
                              key !== "UserType" &&
                              key !== "username" &&
                              key !== "verified" &&
                              key !== "lang" &&
                              key !== "OTPNumber" &&
                              key !== "password" && (
                                <Form.Item
                                  key={key}
                                  labelCol={{ span: 24 }}
                                  label={
                                    key.charAt(0).toUpperCase() + key.slice(1)
                                  }
                                  name={key}
                                  rules={[
                                    {
                                      required: true,
                                      message: `Please enter ${key}`,
                                    },
                                    // Add more validation rules as needed
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              )
                          )}
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="button pb-2 text-center h-25"
                            >
                              Update
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 bg-white p-4 m-2 h-75"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title=""
        visible={uploads}
        onCancel={() => {
          setupload(!uploads);
        }}
        footer={[]}
      >
        <Result
          status="success"
          title="Successfully Upload Profile"
          subTitle="please wait"
          extra={[
            <Button
              type="primary"
              onClick={() => {
                setupload(!uploads);
              }}
              key="console"
            >
              Close
            </Button>,
          ]}
        />
      </Modal>

      <Footer />
      {!getOrderResponse && <Loader/>}

    </>
  );
};

export default Account;
