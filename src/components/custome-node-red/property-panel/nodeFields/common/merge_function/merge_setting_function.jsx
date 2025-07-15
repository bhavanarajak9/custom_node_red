import React from 'react';
import styled from 'styled-components';
import { Form, Input, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
`;

const Label = styled.label`
  min-width: 130px;
  font-size: 14px;
  color: #333;
`;

const StyledInput = styled(Input)`
  flex: 1;
  background-color: #f5f5f5;
  color: #333;
`;

const StyledSelect = styled(Select)`
  flex: 1;
`;

const StyledTextArea = styled(TextArea)`
  background-color: #f5f5f5;
  color: #333;
`;

const MergeSettingsForm = () => {
  return (
    <Form layout="vertical">
      <FieldRow>
        <Label>Name</Label>
        <Form.Item name="name" style={{ flex: 1, marginBottom: 0 }}>
          <StyledInput disabled placeholder="Merge" />
        </Form.Item>
      </FieldRow>

      <FieldRow>
        <Label>Mode</Label>
        <Form.Item name="mode" style={{ flex: 1, marginBottom: 0 }}>
          <StyledSelect defaultValue="Append">
            <Option value="Append">Append</Option>
            <Option value="Combine">Combine</Option>
            <Option value="Override">Override</Option>
          </StyledSelect>
        </Form.Item>
      </FieldRow>

      <FieldRow>
        <Label>Number of Inputs</Label>
        <Form.Item name="inputs" style={{ flex: 1, marginBottom: 0 }}>
          <StyledInput placeholder="3" />
        </Form.Item>
      </FieldRow>

      <div style={{ marginTop: 12 }}>
        <Label>Description:</Label>
        <Form.Item name="description" style={{ marginBottom: 0 }}>
          <StyledTextArea
            placeholder="Merge data of multiple streams once data from both is available."
            rows={3}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default MergeSettingsForm;
