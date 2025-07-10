import React from 'react';
import styled from 'styled-components';
import { Input, Select, Form } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

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
  border-radius: 4px;
  min-width: 200px;
  background-color: #f5f5f5;
  color: #333;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    background-color: #f5f5f5 !important;
    color: #333 !important;
    border-radius: 4px;
  }
`;

const DescriptionLabel = styled.div`
  margin-bottom: 4px;
  font-weight: normal;
  font-size: 14px;
  color: #333;
`;

const SchedulerTriggerFields = React.memo(() => (
  <>

    <FieldRow>
      <Label>Name</Label>
      <Form.Item
        name="name"
        style={{ flex: 1, marginBottom: 0 }}
        rules={[{ required: true, message: 'Please enter a name' }]}
      >
        <StyledInput placeholder="execute workflow" />
      </Form.Item>
    </FieldRow>



    <FieldRow>
      <Label>Trigger Interval</Label>
      <Form.Item
        name="intervalUnit"
        style={{ flex: 1, marginBottom: 0 }}
        rules={[{ required: true, message: 'Please select interval type' }]}
      >
        <StyledSelect placeholder="Select unit">
          <Option value="Seconds">Seconds</Option>
          <Option value="Minutes">Minutes</Option>
          <Option value="Hours">Hours</Option>
        </StyledSelect>
      </Form.Item>
    </FieldRow>


    <FieldRow>
      <Label>Between Triggers</Label>
      <Form.Item
        name="intervalValue"
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: 'Enter interval value' }]}
      >
        <StyledInput type="number" />
      </Form.Item>
    </FieldRow>

    <div>
      <DescriptionLabel>Description:</DescriptionLabel>
      <Form.Item name="description">
        <TextArea
          rows={4}
          placeholder="Enter any notes..."
          style={{ backgroundColor: '#f5f5f5', color: '#333' }}
        />
      </Form.Item>
    </div>
  </>
));

export default SchedulerTriggerFields;
