// components/nodeFields/triggerFields.jsx
import React from 'react';
import { Form, Input } from 'antd';

const TriggerFields = React.memo(() => (
  <Form.Item label="Trigger Topic" name="topic">
    <Input />
  </Form.Item>
));

export default TriggerFields;
