import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Modal,
  Row,
  Col,
  Switch,
  Form,
  Input,
  Upload,
  Select,
} from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductListUserData,
  EditProductUserData,
  AddProductData,
  fetchStoreCategory,
  GetBrandUserById,
  DeleteProductUserData,
} from "../reducer/thunks";
import moment from "moment";
import constant from "../constant/constant";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { ExclamationCircleFilled, DeleteFilled } from "@ant-design/icons";
import ExportCSV from "../components/Excelexport";
import Loader from "../components/Loader";

const { Option } = Select;
const { confirm } = Modal;

const Products = () => {
  document.title = "Winter Bear";
  document.getElementsByTagName("META")[2].content = "Winter Bear";
  const dispatch = useDispatch();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editData, setEditData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <DeleteFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        dispatch(DeleteProductUserData(record._id))
          .then(() => dispatch(ProductListUserData(1)))
          .catch((error) => console.error("Error:", error));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const { loading: getOrderUserLoading, getproductlist: getOrderResponse } =
    useSelector((state) => state.getproductlist);

  const { loading: getcategoriesLoading, storelist: getcategoriesResponse } =
    useSelector((state) => state.storelist);

  const { loading: EditcategoryLoading, Editcategory: EditcategoryResponse } =
    useSelector((state) => state.storelist);

  const { loading: getUserLoading, GetProductId: GetBrandId } = useSelector(
    (state) => state.GetProductId
  );
  const { loading: editUserLoading, DeleteProductId } = useSelector(
    (state) => state.DeleteProductId
  );

  const handleToggleActive = async (productId, newStatus, updated) => {
    updated.isActive = newStatus; // Update isActive property directly
    updated._id = productId; // Update isActive property directly
    handleSaveEdit(updated);
  };

  const EditModal = ({ visible, data, onClose, onSave }) => {
    const [form] = Form.useForm();

    const handleSave = () => {
      form
        .validateFields()
        .then((values) => {
          onSave(values);
          form.resetFields();
          onClose();
        })
        .catch((errorInfo) => {
          console.log("Validation Failed:", errorInfo);
        });
    };

    return (
      <Modal
        title="Add Products"
        visible={visible}
        onCancel={onClose}
        width={1000}
        maskStyle={{
          backgroundColor: "#rgb(0, 0, 0,0.4)",
        }}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} initialValues={data} className="col-md-12 row">
          {Object.entries(data).map(
            ([key, value]) =>
              key !== "_id" &&
              key !== "createdBy" &&
              key !== "createdAt" &&
              key !== "brand_id" &&
              key !== "__v" && (
                <Form.Item
                  key={key}
                  labelCol={{ span: 24 }}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  className="col-md-4"
                  validateStatus={
                    form.getFieldError(key)?.length > 0 ? "error" : ""
                  }
                  help={form.getFieldError(key)?.join(", ")}
                >
                  {key === "isActive" ? (
                    <Switch
                      size="small"
                      checked={value}
                      onChange={(checked) => {
                        form.setFieldsValue({ [key]: checked });
                        form.validateFields([key]);
                      }}
                    />
                  ) : key === "images" ? (
                    <CustomImageUpload value={value} form={form} />
                  ) : key === "category" ? (
                    <Select placeholder="Select category">
                      {getcategoriesResponse &&
                        getcategoriesResponse.categories &&
                        getcategoriesResponse?.categories.map((item) => (
                          <Option value={item._id}>{item.name}</Option>
                        ))}
                    </Select>
                  )  : key === "lang" ? (
                    <Select placeholder="Select User Type">
                      <Option value="IND">India</Option>
                      <Option value="JPN">Japan</Option>
                      <Option value="KOR">Korea</Option>
                      <Option value="AUS">Australia</Option>
                    </Select>
                  ) : (
                    <Input />
                  )}
                </Form.Item>
              )
          )}
        </Form>
      </Modal>
    );
  };

  useEffect(() => {
    dispatch(ProductListUserData(1));
    dispatch(fetchStoreCategory());
    // dispatch(GetBrandUserById());
    if (EditcategoryResponse) {
      setEditData([]);
      setEditModalVisible(false);
    }
    if (DeleteProductId) {
      setEditData([]);
      setEditModalVisible(false);
    }
  }, [EditcategoryResponse]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ex-Price",
      dataIndex: "exta_add_item",
      key: "exta_add_item",
    },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    // },
    {
      title: "Price",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Stock",
      dataIndex: "availability",
      key: "availability",
    },

    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) =>
        images !== null && (
          <img
            src={`${constant.baseUrl}${images[0]}`}
            alt="Product Image"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />
        ),
    },

    {
      title: "Published",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          size="small"
          onChange={() => handleToggleActive(record._id, !isActive, record)}
        />
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <Button
            type="primary"
            size="small"
            onClick={() => handleEdit(record)}
            className="mx-1 bg-white text-dark shadow-none"
          >
            <i className="fa-regular fa-pen-to-square px-1" />
          </Button>
          <Button
            type="primary"
            size="small"
            // onClick={() => handleEdit(record)}
            onClick={() => showDeleteConfirm(record)}
            className="mx-1 bg-white text-dark shadow-none"
          >
            {" "}
            <i className="fa-solid fa-trash-can px-1" />
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log(record);
    setEditData(record);
    setEditModalVisible(true);
  };

  const CustomImageUpload = ({ value, form }) => {
    console.log({ value, form });
    const [fileList, setFileList] = useState([value]);

    const handleFileChange = ({ fileList }) => {
      setFileList(fileList);
    };

    useEffect(() => {
      form.setFieldsValue({
        images: fileList.map((file) => file.originFileObj),
      });
    }, [fileList, form]);

    return (
      <div>
        <Upload
          accept="image/*"
          fileList={fileList}
          customRequest={({ file, onSuccess }) => {
            setTimeout(() => {
              onSuccess("ok");
            }, 0);
          }}
          onChange={handleFileChange}
          multiple
        >
          <Button icon={<UploadOutlined />}>Upload Images</Button>
        </Upload>
        {fileList.length > 0 && (
          <div style={{ marginTop: 16 }}>
            {fileList.map((file, index) => (
              <img
                key={index}
                src={
                  file?.originFileObj
                    ? URL.createObjectURL(file.originFileObj)
                    : `${constant.baseUrl}${file}`
                }
                alt={`Preview-${index + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  marginRight: "5px",
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleSaveEdit = async (editedData) => {
    console.log(editData, editedData);

    const formData = new FormData();

    formData.append("name", editedData.name);
    formData.append("description", editedData.description);
    formData.append("amount", editedData.amount);
    formData.append("offeramount", editedData.offeramount);
    formData.append("color", editedData.color);
    formData.append("weight", editedData.weight);
    formData.append("dimensions", editedData.dimensions);
    formData.append("sku", editedData.sku);
    formData.append("availability", editedData.availability);
    formData.append("isActive", editedData.isActive);
    formData.append("createdBy", localStorage.getItem("userId"));
    formData.append("category", editedData.category);
    formData.append("qty", editedData.qty);
    formData.append("lang", editedData.lang);
    formData.append("exta_add_item", editedData.exta_add_item);

    // Append each file to the formData
    if (editedData.images && editedData.images.length > 0) {
      editedData.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    if (addModalVisible) {
      await dispatch(
        AddProductData(
          editedData._id === undefined ? editData._id : editedData._id,
          formData
        )
      );
      setAddModalVisible(false);
    } else {
      await dispatch(
        EditProductUserData(
          editedData._id === undefined ? editData._id : editedData._id,
          formData
        )
      );
    }

    setEditData([]);
    dispatch(ProductListUserData(1));

    console.log("Edited Data:", editedData);
  };

  const filteredProducts = getOrderResponse?.products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const categoryMatch =
      !selectedCategory || product.category === selectedCategory;
    const brandMatch = !selectedBrand || product.brand_id === selectedBrand;

    return nameMatch && categoryMatch && brandMatch;
  });

  const handleexcel = (item) => {
    console.log(item);

    if (item) {
      const custs = [];
      for (let i = 0; i < item.length; i++) {
        custs[i] = {
          order_id: item[i]?._id,
          name: item[i]?.name,
          description: item[i]?.description,
          amount: item[i]?.amount,
          offeramount: item[i]?.offeramount,
          qty: item[i]?.qty,
          sku: item[i]?.sku,
          isActive: item[i]?.isActive,
          lang: item[i]?.lang,
          availability: item[i]?.availability,
          createdAt: item[i]?.createdAt.split("T")[0], // Corrected split method
        };
      }
      console.log(custs, "custs");
      return custs;
    }
    return []; // Return an empty array if item is falsy
  };

  const wscols = filteredProducts
    ? [
        {
          wch: Math.max(
            ...filteredProducts.map((product) => product._id.length)
          ),
        },
        {
          wch: Math.max(
            ...filteredProducts.map((product) => (product.name || "").length)
          ),
        },
        {
          wch:
            Math.max(
              ...filteredProducts.map(
                (product) => (product.description || "").length
              )
            ) + 10,
        },
        {
          wch:
            Math.max(
              ...filteredProducts.map(
                (product) => (product.amount || "").toString().length
              )
            ) + 10,
        },
        {
          wch:
            Math.max(
              ...filteredProducts.map(
                (product) => (product.offeramount || "").toString().length
              )
            ) + 10,
        },
        {
          wch:
            Math.max(
              ...filteredProducts.map(
                (product) => (product.qty || "").toString().length
              )
            ) + 6,
        },
        {
          wch:
            Math.max(
              ...filteredProducts.map((product) => (product.sku || "").length)
            ) + 10,
        },
        {
          wch:
            Math.max(
              ...filteredProducts.map(
                (product) => (product.isActive || "").toString().length
              )
            ) + 6,
        },
        {
          wch:
            Math.max(
              ...filteredProducts.map((product) => (product.lang || "").length)
            ) + 8,
        },
        {
          wch:
            Math.max(
              ...filteredProducts.map(
                (product) => (product.availability || "").length
              )
            ) + 10,
        },
        {
          wch:
            Math.max(
              ...filteredProducts.map(
                (product) => (product.createdAt || "").toString().length
              )
            ) + 10,
        },
      ]
    : [];

  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-md-10 bg-light">
            <div className="main px-5 my-5">
              <div className="row g-0">
                <div className="col-md-12">
                  <p className="fs-3 fw-semibold">Invitatory</p>

                  <div className="overview mt-3 px-3 py-3 bg-white">
                    <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4  d-flex justify-content-between">
                      <div className="text-md-start text-center mt-2 mb-2">
                        {/* <button className="action_button">
                          <i className="fa-solid fa-list-check" /> Bulk Action
                        </button> */}
                      </div>
                      <div className="text-start mt-2 mb-2 d-none d-md-block">
                        &nbsp;
                      </div>
                      <div className="text-start mt-2 mb-2 d-none dd-md-block ">
                        &nbsp;
                      </div>
                      {filteredProducts && (
                        <ExportCSV
                          csvData={handleexcel(filteredProducts)}
                          fileName={"Product List"}
                          wscols={wscols}
                          title={"Inventory Management List"}
                          headers={[
                            "Order ID",
                            "Name",
                            "Description",
                            "Amount",
                            "Offer Amount",
                            "Quantity",
                            "SKU",
                            "Active",
                            "Language",
                            "Availability",
                            "Created At",
                          ]}
                          headerTitle={[
                            {
                              _id: "Order ID",
                              name: "Name",
                              description: "Description",
                              amount: "Amount",
                              offeramount: "Offer Amount",
                              qty: "Quantity",
                              sku: "SKU",
                              isActive: "Active",
                              lang: "Language",
                              availability: "Availability",
                              createdBy: "Created At",
                            },
                          ]}
                        />
                      )}
                    </div>
                    <div className="row my-3">
                      <div className="col-md-4 px-4 mb-3">
                        <input
                          type="text"
                          className="form-control border-0 bg-secondary-subtle text-secondary searchbox"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="addon-wrapping"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4 px-4 mb-3">
                        <Select
                          placeholder="Select category"
                          className="form-control border-0 bg-secondary-subtle text-secondary  rounded-pill"
                          value={selectedCategory}
                          onChange={(value) => setSelectedCategory(value)}
                        >
                          {getcategoriesResponse &&
                            getcategoriesResponse.categories &&
                            getcategoriesResponse?.categories.map((item) => (
                              <Option key={item._id} value={item._id}>
                                {item.name}
                              </Option>
                            ))}
                        </Select>
                      </div>
                      <div className="col-md-4 px-4 mb-3">
                        {/* <Select
                          placeholder="Select brands"
                          className="form-control border-0 bg-secondary-subtle text-secondary  rounded-pill"
                          value={selectedBrand}
                          onChange={(value) => setSelectedBrand(value)}
                        >
                          {GetBrandId?.brands.map((item) => (
                            <Option key={item._id} value={item._id}>
                              {item.name}
                            </Option>
                          ))}
                        </Select> */}
                        <div className="text-md-start text-center mt-2 mb-2">
                          <div
                            className={`add-button padding-top mx-3`}
                            style={{ cursor: "pointer" }}
                            onClick={async () => {
                              await setAddModalVisible(true);
                              handleEdit({
                                name: "",
                                description: "",
                                amount: 0,
                                offeramount: 0,
                                images: ["image_url1"],
                                color: "",
                                weight: "",
                                dimensions: "",
                                sku: "",
                                availability: "In Stock",
                                isActive: true,
                                createdBy: localStorage.getItem("userId"), // Replace with an actual user ID
                                category: "", // Replace with an actual category ID
                                qty: 0,
                                lang: "IND", //Japan: JPN ,Korea: KOR ,India: IND ,Australia: AUS
                                exta_add_item: "",
                              });
                            }}
                          >
                            <i className="fa-solid fa-plus px-1" />
                            Add Products
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div
                className="btn add_button"
                onClick={ async() => {
                 await setAddModalVisible(true)
                  handleEdit({
                    name: "",
                    description: "",
                    amount: 0,
                    offeramount: 0,
                    images: ["image_url1"],
                    color: "",
                    weight: "",
                    dimensions: "",
                    sku: "",
                    availability: "In Stock",
                    isActive: true,
                    createdBy: localStorage.getItem("userId"), // Replace with an actual user ID
                    category: "", // Replace with an actual category ID
                    brand_id: "",
                    qty: 0,
                    lang: "IND", //Japan: JPN ,Korea: KOR ,India: IND ,Australia: AUS
                  });
                }}
              >
                Add Products
              </div> */}

              <div className="row mx-1">
                <div className="table-responsive py-3 bg-white mt-3">
                  <Table
                    dataSource={filteredProducts}
                    // dataSource={getOrderResponse?.products}
                    columns={columns}
                    pagination={{
                      pageSize: 10, // Set the number of items per page
                    }}
                  />
                </div>
              </div>
              <EditModal
                visible={editModalVisible}
                data={editData}
                onClose={() => setEditModalVisible(false)}
                onSave={handleSaveEdit}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {!getOrderResponse && <Loader />}
    </>
  );
};

export default Products;
