import React from 'react';
import { Form, Input } from 'antd';

const FunctionFields = () => (
  <>
    <Form.Item
      label="Function Name"
      name="functionName"
      rules={[{ required: true, message: 'Function name is required' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Code"
      name="code"
      rules={[{ required: true, message: 'Function code is required' }]}
    >
      <Input.TextArea rows={4} />
    </Form.Item>
  </>
);

export default FunctionFields;
