// components/nodeFields/httpFields.jsx
import React from 'react';
import { Form, Input } from 'antd';

const HttpFields = React.memo(() => (
  <>
    <Form.Item label="URL" name="url">
      <Input />
    </Form.Item>
    <Form.Item label="Method" name="method">
      <Input />
    </Form.Item>
  </>
));

export default HttpFields;
