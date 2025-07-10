import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Label = styled.label`
  min-width: 120px;
  font-size: 14px;
  color: #333;
  margin-right: 12px;
`;

const StyledInput = styled(Input)`
  flex: 1;
  background-color: #f5f5f5;
  color: #333;
`;

const StyledTextArea = styled(TextArea)`
  background-color: #f5f5f5;
  color: #333;
`;

const AddInputButton = styled(Button)`
  margin-top: 8px;
  margin-bottom: 16px;
`;

const Pythoninputfunction = () => {
  const [inputs, setInputs] = useState([]);

  const handleAddInput = () => {
    setInputs([...inputs, { id: Date.now(), value: '' }]);
  };

  const handleInputChange = (id, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, value } : input
      )
    );
  };

  return (
    <Form layout="vertical">
      <FormRow>
        <Label>Name</Label>
        <StyledInput value="Custom Function" disabled />
      </FormRow>

      <Form.Item label="Python Code:">
        <StyledTextArea rows={6} placeholder="Write your Python code here..." />
      </Form.Item>

      <div style={{ marginBottom: 12 }}>

        <AddInputButton type="dashed" onClick={handleAddInput} block>
          + Add Input
        </AddInputButton>
      </div>

      <Form.Item label="Description:">
        <StyledTextArea
          rows={3}
          placeholder="Run custom Python code"
        />
      </Form.Item>
    </Form>
  );
};

export default Pythoninputfunction;
