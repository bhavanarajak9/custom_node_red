import React from 'react';
import styled from 'styled-components';
import { Input, Select, Form } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Label = styled.label`
  min-width: 100px;
  font-size: 14px;
  color: #333;
  margin-right: 12px;
`;

const StyledInput = styled(Input)`
  flex: 1;
  background-color: #f5f5f5;
  color: #333;
`;

const StyledSelect = styled(Select)`
  flex: 1;
  background-color: #f5f5f5;
  .ant-select-selector {
    background-color: #f5f5f5 !important;
    color: #333;
  }
`;

const DescriptionLabel = styled.div`
  margin-bottom: 4px;
  font-weight: normal;
  font-size: 14px;
  color: #333;
`;

const WebHooksFields = React.memo(() => {
  return (
    <>
      <InfoText>This node does not have any parameters.</InfoText>

      <FieldRow>
        <Label>Http Method</Label>
        <Form.Item
          name="httpMethod"
          style={{ flex: 1, marginBottom: 0 }}
          rules={[{ required: true, message: 'Please select a method' }]}
        >
          <StyledSelect>
            <Option value="POST">POST</Option>
            <Option value="UPDATE">UPDATE</Option>
            <Option value="GET">GET</Option>
          </StyledSelect>
        </Form.Item>
      </FieldRow>

      <FieldRow>
        <Label>Path</Label>
        <Form.Item
          name="path"
          style={{ flex: 1, marginBottom: 0 }}
          rules={[{ required: true, message: 'Path is required' }]}
        >
          <StyledInput placeholder="/" />
        </Form.Item>
      </FieldRow>

      <div style={{ marginTop: 12 }}>
        <DescriptionLabel>Description:</DescriptionLabel>
        <Form.Item name="description" style={{ marginBottom: 0 }}>
          <TextArea
            placeholder="Run the flow on clicking a button. Good for getting started quickly."
            rows={4}
            style={{ backgroundColor: '#f5f5f5', color: '#333' }}
          />
        </Form.Item>
      </div>
    </>
  );
});

export default WebHooksFields;
