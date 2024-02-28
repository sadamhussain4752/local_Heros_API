import { Modal, Button, Upload, message, Input, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import constant from "../constant/constant";
import { useState, createRef } from "react";

const GalleryModal = ({ visible, onClose, title, itemvalues }) => {
  const formRef = createRef(); // Create a form reference

  const [loginData, setLoginData] = useState({
    title: "", // Initial value for title
    description: "", // Initial value for description
  });
  console.log(itemvalues);
  const props = {
    beforeUpload: (file) => {
      // Add custom logic for file validation if needed
      console.log("beforeUpload", file);
      return false;
    },
  };

  // Placeholder functions, replace them with your actual implementation
  const handleLogin = (values) => {
    console.log("Login form values:", values);
  };

  const handleTitleChange = (e) => {
    console.log("Title changed:", e.target.value);
  };

  const handleDescriptionChange = (e) => {
    console.log("Description changed:", e.target.value);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleUpload = () => {
    // Add logic for handling file upload
    message.success("Upload successful");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Gallery"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpload}>
          Submit
        </Button>,
      ]}
    >
      <p className="fs-3 text-center">{title}</p>
      <div className="row">
        {/* Add your images here */}
        {title === "About" && (
          <>
            <Form
              requiredMark={false}
              onFinish={handleLogin}
              ref={formRef}
              initialValues={loginData}
            >
              <Form.Item
                name="title"
                label="Title" // Use the title from itemvalues for the label
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter the title",
                  },
                ]}
              >
                <Input
                  className="form-control text-input"
                  placeholder="Title" // Use the title from itemvalues for the placeholder
                  value={loginData.title}
                  onChange={handleTitleChange} // Add a function to handle title changes
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description" // Use the description from itemvalues for the label
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter the description",
                  },
                ]}
              >
                <Input
                  className="form-control text-input"
                  placeholder="Description" // Use the description from itemvalues for the placeholder
                  value={loginData.description}
                  onChange={handleDescriptionChange} // Add a function to handle description changes
                />
              </Form.Item>

              {/* Rest of the form remains unchanged */}
              {/* ... */}
            </Form>
          </>
        )}
        {title === "Banner" &&
          itemvalues &&
          itemvalues.map((items, index) => (
            <div className="col px-3" key={index}>
              {/* {console.log(`${constant.baseUrl}${items.imageUrl}`)} */}
              <img
                src={`${constant.baseUrl}${items.imageUrl}`}
                className="img-fluid"
                alt={`Gallery Image ${index + 1}`}
              />
            </div>
          ))}
      </div>
      <div className="row my-3">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default GalleryModal;
