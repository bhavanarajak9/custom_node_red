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
  min-width: 100px;
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

const LoopSettingsForm = () => {
  return (
    <Form layout="vertical">
      <FieldRow>
        <Label>Name</Label>
        <Form.Item name="name" style={{ flex: 1, marginBottom: 0 }}>
          <StyledInput placeholder="Loop" />
        </Form.Item>
      </FieldRow>

      <FieldRow>
        <Label>Kind</Label>
        <Form.Item name="kind" style={{ flex: 1, marginBottom: 0 }}>
          <StyledSelect defaultValue="Fixed Count">
            <Option value="Fixed Count">Fixed Count</Option>
            <Option value="Condition Based">Condition Based</Option>
            <Option value="For Each">For Each</Option>
          </StyledSelect>
        </Form.Item>
      </FieldRow>

      <FieldRow>
        <Label>Pass Count</Label>
        <Form.Item name="passCount" style={{ flex: 1, marginBottom: 0 }}>
          <StyledInput disabled placeholder="10" />
        </Form.Item>
      </FieldRow>

      <FieldRow>
        <Label>Initial Value</Label>
        <Form.Item name="initialValue" style={{ flex: 1, marginBottom: 0 }}>
          <StyledInput placeholder="1" />
        </Form.Item>
      </FieldRow>

      <FieldRow>
        <Label>Step Value</Label>
        <Form.Item name="stepValue" style={{ flex: 1, marginBottom: 0 }}>
          <StyledInput placeholder="1" />
        </Form.Item>
      </FieldRow>

      <div style={{ marginTop: 12 }}>
        <Label>Description:</Label>
        <Form.Item name="description" style={{ marginBottom: 0 }}>
          <StyledTextArea
            placeholder="Repeats a task in the loop specified times or by a condition or by an iterable enumeration (Array, Typed Array, Object, Map, Set, String)."
            rows={3}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoopSettingsForm;
