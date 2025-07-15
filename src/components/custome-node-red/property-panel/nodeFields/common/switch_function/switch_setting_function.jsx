import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Button } from 'antd';

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
  gap: 8px;
`;

const Label = styled.label`
  min-width: 70px;
  font-size: 14px;
  color: #333;
`;

const StyledInput = styled(Input)`
  flex: 1;
  background-color: #f5f5f5;
  color: #333;
`;

const ConditionBlock = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 6px;
  background: #fff;
`;

const Switchsettingfunction = () => {
  const [form] = Form.useForm();
  const [conditions, setConditions] = useState([
    { input: '', operator: 'is equal to', value: '', logic: 'AND' },
  ]);

  const handleAddCondition = () => {
    setConditions([...conditions, { input: '', operator: 'is equal to', value: '', logic: 'AND' }]);
  };

  return (
    <Form form={form} layout="vertical">
      <InfoText>Route items depending on defined expression or rules</InfoText>

      <FieldRow>
        <Label>Name</Label>
        <Form.Item
          name="name"
          style={{ flex: 1, marginBottom: 0 }}
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <StyledInput placeholder="If else" />
        </Form.Item>
      </FieldRow>

      <ConditionBlock>
        <strong>Conditions</strong>
        {conditions.map((cond, idx) => (
          <div key={idx}>
            {idx > 0 && (
              <Form.Item name={['conditions', idx, 'logic']} style={{ marginBottom: 8 }}>
                <Select defaultValue={cond.logic} style={{ width: 80 }}>
                  <Option value="AND">AND</Option>
                  <Option value="OR">OR</Option>
                </Select>
              </Form.Item>
            )}

            <FieldRow>
              <Form.Item
                name={['conditions', idx, 'input']}
                style={{ marginBottom: 0, flex: 1 }}
              >
                <Input placeholder="Input 1" />
              </Form.Item>

              <Form.Item
                name={['conditions', idx, 'operator']}
                style={{ marginBottom: 0 }}
              >
                <Select defaultValue={cond.operator} style={{ width: 150 }}>
                  <Option value="exists">exists</Option>
                  <Option value="does not exist">does not exist</Option>
                  <Option value="is empty">is empty</Option>
                  <Option value="is not empty">is not empty</Option>
                  <Option value="is equal to">is equal to</Option>
                  <Option value="is not equal to">is not equal to</Option>
                  <Option value="contains">contains</Option>
                  <Option value="does not contain">does not contain</Option>
                  <Option value="starts with">starts with</Option>
                  <Option value="does not start with">does not start with</Option>
                  <Option value="ends with">ends with</Option>
                  <Option value="does not end with">does not end with</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name={['conditions', idx, 'value']}
                style={{ marginBottom: 0, flex: 1 }}
              >
                <Input placeholder={`value ${idx + 1}`} />
              </Form.Item>
            </FieldRow>
          </div>
        ))}

        <Button type="primary" onClick={handleAddCondition} style={{ marginTop: 8 }}>
          Add Condition
        </Button>
      </ConditionBlock>
    </Form>
  );
};

export default Switchsettingfunction;
