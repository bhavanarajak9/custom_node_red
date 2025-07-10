import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Form, Select, Switch } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const FormRow = styled.div`
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

const ReadOnlyInput = styled(Input)`
  background-color: #f5f5f5 !important;
  color: #999 !important;
`;

const FullWidthInput = styled(Input)`
  width: 100%;
  background-color: #f5f5f5;
  color: #333;
`;

const HalfWidthSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    background-color: #f5f5f5 !important;
    color: #333 !important;
    border-radius: 4px;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  color: #333;
`;

const AuthBox = styled.div`
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 16px;
`;

const DescriptionLabel = styled.div`
  margin-bottom: 4px;
  font-weight: normal;
  font-size: 14px;
  color: #333;
`;
const StyledInput = styled(Input)`
  flex: 1;
  background-color: #f5f5f5;
  color: #333;
`;

const KafkaTriggerFields = () => {
    const [ssl, setSsl] = useState(true);
    const [auth, setAuth] = useState(true);
    console.log(Form,"form")

    return (
        <>
            <FormRow>
                <Label>Name</Label>
                <Form.Item
                    name="name"
                    style={{ flex: 1, marginBottom: 0 }}
                    rules={[{ required: true, message: 'Please enter a name' }]}
                >
                    <StyledInput placeholder="execute workflow" />
                </Form.Item>
            </FormRow>

            <Form.Item name="topic" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                <FormRow>
                    <Label>Topic</Label>
                    <FullWidthInput placeholder="topic-name" />
                </FormRow>
            </Form.Item>

            <Form.Item name="groupId" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                <FormRow>
                    <Label>Group ID</Label>
                    <FullWidthInput placeholder="wf-kafka-0" />
                </FormRow>
            </Form.Item>

            <Form.Item name="clientId" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                <FormRow>
                    <Label>Client ID</Label>
                    <FullWidthInput placeholder="my-app" />
                </FormRow>
            </Form.Item>

            <Form.Item name="brokers" initialValue="kafka1:9092,kafka:9092" style={{ marginBottom: 0 }}>
                <FormRow>
                    <Label>Brokers</Label>
                    <ReadOnlyInput disabled />
                </FormRow>
            </Form.Item>

            <Form.Item name="ssl" initialValue={ssl} valuePropName="checked" style={{ marginBottom: 0 }}>
                <ToggleRow>
                    <Switch checked={ssl} onChange={setSsl} />
                    <ToggleLabel>SSL</ToggleLabel>
                </ToggleRow>
            </Form.Item>

            <Form.Item name="auth" initialValue={auth} valuePropName="checked" style={{ marginBottom: 0 }}>
                <ToggleRow>
                    <Switch checked={auth} onChange={setAuth} />
                    <ToggleLabel>Authentication</ToggleLabel>
                </ToggleRow>
            </Form.Item>

            {auth && (
                <AuthBox>
                    <Form.Item name="username" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                        <FormRow>
                            <Label>Username</Label>
                            <FullWidthInput placeholder="username" />
                        </FormRow>
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                        <FormRow>
                            <Label>Password</Label>
                            <FullWidthInput type="password" placeholder="password" />
                        </FormRow>
                    </Form.Item>

                    <Form.Item name="saslMechanism" initialValue="Plain" style={{ marginBottom: 0 }}>
                        <FormRow>
                            <Label>SASL Mechanism</Label>
                            <HalfWidthSelect>
                                <Option value="Plain">Plain</Option>
                                <Option value="SCRAM-SHA-256">SCRAM-SHA-256</Option>
                                <Option value="SCRAM-SHA-512">SCRAM-SHA-512</Option>
                            </HalfWidthSelect>
                        </FormRow>
                    </Form.Item>
                </AuthBox>
            )}

            <Form.Item name="description" style={{ marginBottom: 0 }}>
                <div>
                    <DescriptionLabel>Description:</DescriptionLabel>
                    <TextArea
                        placeholder="Run the flow on clicking a button. good for getting started quickly."
                        rows={4}
                        style={{ backgroundColor: '#f5f5f5', color: '#333' }}
                    />
                </div>
            </Form.Item>
        </>
    );
};

export default KafkaTriggerFields;
