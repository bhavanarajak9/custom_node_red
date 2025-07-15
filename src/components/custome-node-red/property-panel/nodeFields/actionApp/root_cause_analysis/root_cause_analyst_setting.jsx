import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Form, Checkbox, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
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

const DescriptionLabel = styled.div`
  margin-bottom: 4px;
  font-weight: normal;
  font-size: 14px;
  color: #333;
`;

const RootCauseAnalystSettings = React.memo(() => {
    const [authChecked, setAuthChecked] = useState(true);

    return (
        <>
            <FieldRow>
                <Label>Name</Label>
                <Form.Item
                    name="name"
                    style={{ flex: 1, marginBottom: 0 }}
                >
                    <StyledInput value="Root Cause Analysis" />
                </Form.Item>
            </FieldRow>

            <FieldRow>
                <Label>URL</Label>
                <Form.Item
                    name="url"
                    style={{ flex: 1, marginBottom: 0 }}
                    rules={[{ required: true, message: 'Please enter a URL' }]}
                >
                    <StyledInput placeholder="Enter URL" />
                </Form.Item>
            </FieldRow>

            <FieldRow>
                <Label>Aanlysis Methods</Label>
                <Form.Item
                    name="method"
                    style={{ flex: 1, marginBottom: 0 }}
                    rules={[{ required: true, message: 'Please select a method' }]}
                >
                    <Select placeholder="Select Method">
                        <Option value="Method A">Method A</Option>
                        <Option value="Method B">Method B</Option>
                        <Option value="Method C">Method C</Option>
                    </Select>
                </Form.Item>
            </FieldRow>

            <FieldRow>
                <Form.Item
                    name="useAuth"
                    valuePropName="checked"
                    initialValue={true}
                    style={{ marginBottom: 0 }}
                >
                    <Checkbox
                        style={{ color: '#333' }}
                        checked={authChecked}
                        onChange={(e) => setAuthChecked(e.target.checked)}
                    >
                        Use authentication
                    </Checkbox>
                </Form.Item>
            </FieldRow>

            {authChecked && (
                <FieldRow>
                    <Label>Secret</Label>
                    <Form.Item
                        name="secret"
                        style={{ flex: 1, marginBottom: 0 }}
                        rules={[{ required: true, message: 'Please enter a secret' }]}
                    >
                        <StyledInput placeholder="Enter secret" />
                    </Form.Item>
                </FieldRow>
            )}

            <div style={{ marginTop: 12 }}>
                <DescriptionLabel>Description:</DescriptionLabel>
                <Form.Item name="description" style={{ marginBottom: 0 }}>
                    <StyledTextArea rows={4} placeholder="Enter description" />
                </Form.Item>
            </div>
        </>
    );
});

export default RootCauseAnalystSettings