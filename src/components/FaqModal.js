import { Modal, Button, Input, Form } from "antd";
import { useState, useEffect } from "react";

const FaqModal = ({ visible, onClose, title, itemvalues }) => {
  const [form] = Form.useForm();

  const [faqData, setFaqData] = useState( [
    {
      question: "",
      answer: "",
      isActive: true,
    },
  ]);

  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    if (itemvalues) {
      setFaqData(itemvalues.questionsAndAnswers);
    }
  }, [itemvalues]);

  const handleUpload = () => {
    console.log("Submitting:", faqData);
    onClose();
  };

  const handleTitleChange = (e) => {
    setFaqData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...faqData];
    updatedQuestions[index].question = e.target.value;
    setFaqData((prevData) => ({
      ...prevData,
      questionsAndAnswers: updatedQuestions,
    }));
  };

  const handleAnswerChange = (index, e) => {
    const updatedQuestions = [...faqData.questionsAndAnswers];
    updatedQuestions[index].answer = e.target.value;
    setFaqData((prevData) => ({
      ...prevData,
      questionsAndAnswers: updatedQuestions,
    }));
  };

  const handleAddQuestion = () => {
    setFaqData((prevData) => ({
      ...prevData,
      questionsAndAnswers: [
        ...prevData.questionsAndAnswers,
        { question: "", answer: "" },
      ],
    }));
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...faqData.questionsAndAnswers];
    updatedQuestions.splice(index, 1);
    setFaqData((prevData) => ({
      ...prevData,
      questionsAndAnswers: updatedQuestions,
    }));
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
      <p className="fs-3 text-center">{itemvalues.title || ""}</p>

      {itemvalues && (
        <Form form={form} initialValues={itemvalues.questionsAndAnswers}>
          {itemvalues.questionsAndAnswers.map((qa, index) => (
            <div key={index}>
              <Form.Item
                labelCol={{ span: 24 }}
                label={`Question ${index + 1}`}
                name={['questionsAndAnswers', index, 'question']}
              >
                <Input
                  onChange={(e) => handleQuestionChange(index, e)}
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label={`Answer ${index + 1}`}
                name={['questionsAndAnswers', index, 'answer']}
              >
                <Input
                  onChange={(e) => handleAnswerChange(index, e)}
                />
              </Form.Item>

              <Button type="link" onClick={() => handleRemoveQuestion(index)}>
                Remove Question
              </Button>
            </div>
          ))}

          <Button type="dashed" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </Form>
      )}
    </Modal>
  );
};

export default FaqModal;
