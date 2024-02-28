import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Row, Col, Popover, Badge } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { OrderUserList } from "../reducer/thunks";
import moment from "moment";
import constant from "../constant/constant";
import ExportCSV from "../components/Excelexport";
import Loader from "../components/Loader";
import { MessageOutlined } from "@ant-design/icons";

const Orders = () => {
  document.title = "Winter Bear";
  document.getElementsByTagName("META")[2].content = "Winter Bear";
  const [searchText, setSearchText] = useState("");

  let userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  const {
    loading: getOrderUserLoading,
    Ordererror: getOrderUserError,
    getOrder: getOrderResponse,
  } = useSelector((state) => state.getOrder);
  console.log(getOrderResponse);
  const [filteredDataSource, setFilteredDataSource] = useState(
    getOrderResponse?.orders || []
  );
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(OrderUserList());
      setFilteredDataSource(getOrderResponse?.orders || []);
    };

    fetchData();
  }, [dispatch]);

  const columns = [
    {
      title: "#Order Id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => text.slice(-6),
    },
    {
      title: "Name",
      dataIndex: ["user", "firstname"],
      key: "name",
    },
    {
      title: "Address",
      dataIndex: ["address", "street"],
      key: "address",
    },
    {
      title: "Price",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Start Date",
      dataIndex: "createdAt",
      key: "startDate",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "status",
      render: (status) => (
        <p
          className={`green-text  ${
            status !== "Completed" ? "yellow-text" : "green-text"
          }`}
        >
          {status}
        </p>
      ),
    },
    {
      title: "Message",
      dataIndex: "exta_message",
      key: "exta_message",
      render: (status) => (
        <Popover
          content={
            <div>
              <p>{status}</p>
            </div>
          }
          title="Message Request"
        >
          <Badge count={1}>
            <MessageOutlined style={{ fontSize: "22px", color: "#08c" }} />
          </Badge>
        </Popover>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Button
          size="small"
          onClick={() => handleViewMore(record)}
          className="View-text"
        >
          View More
        </Button>
      ),
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleSearch = (value) => {
    setSearchText(value);
    // You can filter your data source here based on the search text
    // For example, assuming "user.firstname" is the field you want to filter

    // Update the dataSource with the filtered data
  };

  const handleViewMore = (record) => {
    setSelectedOrder(record);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const modalContent = (
    <div className="p-5 ">
      <p>
        <strong>Name:</strong> {selectedOrder?.user?.firstname}
      </p>
      <p>
        <strong>Address:</strong> {selectedOrder?.address?.street}
      </p>
      <p>
        <strong>Phone Number:</strong> {selectedOrder?.user?.mobilenumber}
      </p>
      <p className="mb-0">&nbsp;</p>
      {selectedOrder?.products.map((product) => (
        <Row key={product._id} gutter={[16, 16]}>
          <Col span={4}>
            <img
              src={`${constant.baseUrl}${product.images[0]}`}
              alt={product.title}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Col>

          <Col span={12}>
            <p>
              <strong>Title:</strong> {product.name}
            </p>

            <p>
              <strong>Delivery Status:</strong> {selectedOrder.paymentStatus}
            </p>
            <p>
              <strong>Payment Mode:</strong> {selectedOrder.delivery}
            </p>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={12}>
                <p className="text-start">
                  <strong>List Price:</strong>
                </p>
              </Col>
              <Col span={12}>
                <p className="text-end">{product.amount}</p>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <p className="text-start">
                  <strong>Selling Price:</strong>
                </p>
              </Col>
              <Col span={12}>
                <p className="text-end">{product.offeramount}</p>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <p className="text-start">
                  <strong>Shipping fee:</strong>
                </p>
              </Col>
              <Col span={12}>
                <p className="text-end">{product.delivery}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
      <Row className="bg-white">
        <Col span={12}>
          <p className="text-start py-3 ps-3">
            <strong>Total Order Amount:</strong>
          </p>
        </Col>
        <Col span={12}>
          <p className="text-end py-3">${selectedOrder?.totalAmount}</p>
        </Col>
      </Row>
    </div>
  );

  const filteredOrders = getOrderResponse?.orders
    ? getOrderResponse.orders.filter((order) =>
        order.user.firstname.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const wscols = [
    {
      wch: Math.max(...filteredOrders.map((customer) => customer._id.length)),
    },
    {
      wch: Math.max(
        ...filteredOrders.map((customer) => customer.user.firstname.length)
      ),
    },
    {
      wch: Math.max(
        ...filteredOrders.map((customer) => customer.user.lastname.length)
      ),
    },
    {
      wch: Math.max(
        ...filteredOrders.map((customer) => customer.user.email.length)
      ),
    },
    {
      wch: Math.max(
        ...filteredOrders.map((customer) => customer.totalAmount.length)
      ),
    },
    // {
    //   wch:
    //     Math.max(...filteredOrders.map((customer) => customer.postcode.length)) + 5
    // }
  ];
  const handleexcel = (item) => {
    console.log(item);
    if (item) {
      const custs = [];
      for (let i = 0; i <= item.length; i++) {
        custs[i] = {
          order_id: item[i]?._id,
          firstName: item[i]?.user?.firstname,
          lastName: item[i]?.user?.lastname,
          email: item[i]?.user?.email,
          address: item[i]?.address?.street,
          price: item[i]?.totalAmount,
        };
      }
      return custs;
    }
  };
  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-md-10 bg-light">
            <div className="main m-4">
              <div className="row p-3">
                <div className="col-md-6 my-2 col-12">
                  <p className="fs-3 fw-semibold text-start col-md-6 col-12">
                    {" "}
                    Order Overview
                  </p>
                </div>
                <div className="overview mt-3 px-3 py-3 bg-white col-md-12">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 d-flex justify-content-between">
                    <div className="text-center mt-2 mb-2 col-md-6 ">
                      {/* <form
                        className=" col-lg-auto mb-3 mb-lg-0 me-lg-3"
                        role="search"
                      >
                        <div className="input-group flex-nowrap bg-secondary-subtle  rounded-pill">
                          <span
                            className="input-group-text border-0 bg-secondary-subtle rounded-pill"
                            id="addon-wrapping"
                          >
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </span>
                         
                        </div>
                      </form> */}
                      <input
                        type="text"
                        className="form-control border-0 bg-secondary-subtle text-secondary searchbox w-50"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="addon-wrapping"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                    <div className="mt-2 col-md-6 text-end">
                      {filteredOrders && (
                        <ExportCSV
                          csvData={handleexcel(filteredOrders)}
                          fileName={"Order Book"}
                          title={"Order List"}
                          wscols={wscols}
                          headers={[
                            "order_id",
                            "firstName",
                            "lastName",
                            "email",
                            "address",
                            "price",
                          ]}
                          headerTitle={[
                            {
                              order_id: "#Order Id",
                              firstName: "First Name",
                              lastName: "First Name",
                              email: "Email",
                              address: "Address",
                              price: "price",
                            },
                          ]}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-md-12">
                  <div className="overview mt-3 px-3 py-3 bg-white">
                    <div className="row row-cols-2 row-cols-sm-4 row-cols-md-5 justify-content-center">
                      <div className="text-center mt-2 mb-2">
                        <button className="delete_button">
                          <i className="fa-solid fa-trash-can" /> Delete
                        </button>
                      </div>
                      <div className="text-center mt-2 mb-2">
                        <button className="action_button">
                          <i className="fa-solid fa-list-check" /> Bulk Action
                        </button>
                      </div>
                      <div className="text-end mt-2 mb-2">
                        <button className="action_button">
                          <i className="fa-solid fa-arrow-up-from-bracket" />{" "}
                          Export
                        </button>
                      </div>
                      <div className="text-end mt-2 mb-2">
                        <button className="action_button">
                          <i className="fa-solid fa-download" /> Export
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="row mx-1">
                <div className="table-responsive py-3 bg-white mt-3">
                  <Table
                    dataSource={filteredOrders}
                    columns={columns}
                    pagination={{
                      pageSize: 10, // Set the number of items per page
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <Modal
        title="Order Details"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={800}
        className="card-body rounded "
      >
        {modalContent}
      </Modal>
      {!getOrderResponse && <Loader />}
    </>
  );
};

export default Orders;
