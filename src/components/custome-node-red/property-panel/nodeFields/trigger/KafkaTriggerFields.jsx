import React from 'react';
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
    const auth = Form.useWatch('auth');
    const ssl = Form.useWatch('ssl');

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

            <FormRow>
                <Label>Topic</Label>
                <Form.Item name="topic" rules={[{ required: true }]} style={{ flex: 1, marginBottom: 0 }}>
                    <FullWidthInput placeholder="topic-name" />
                </Form.Item>
            </FormRow>

            <FormRow>
                <Label>Group ID</Label>
                <Form.Item name="groupId" rules={[{ required: true }]} style={{ flex: 1, marginBottom: 0 }}>
                    <FullWidthInput placeholder="wf-kafka-0" />
                </Form.Item>
            </FormRow>

            <FormRow>
                <Label>Client ID</Label>
                <Form.Item name="clientId" rules={[{ required: true }]} style={{ flex: 1, marginBottom: 0 }}>
                    <FullWidthInput placeholder="my-app" />
                </Form.Item>
            </FormRow>

            <FormRow>
                <Label>Brokers</Label>
                <Form.Item name="brokers" initialValue="kafka1:9092,kafka:9092" style={{ flex: 1, marginBottom: 0 }}>
                    <ReadOnlyInput disabled />
                </Form.Item>
            </FormRow>

            <ToggleRow>
                <Form.Item name="ssl" initialValue={true} valuePropName="checked" style={{ marginBottom: 0 }}>
                    <Switch />
                </Form.Item>
                <ToggleLabel>SSL</ToggleLabel>
            </ToggleRow>

            <ToggleRow>
                <Form.Item name="auth" initialValue={true} valuePropName="checked" style={{ marginBottom: 0 }}>
                    <Switch />
                </Form.Item>
                <ToggleLabel>Authentication</ToggleLabel>
            </ToggleRow>

            {auth && (
                <AuthBox>
                    <FormRow>
                        <Label>Username</Label>
                        <Form.Item name="username" rules={[{ required: true }]} style={{ flex: 1, marginBottom: 0 }}>
                            <FullWidthInput placeholder="username" />
                        </Form.Item>
                    </FormRow>

                    <FormRow>
                        <Label>Password</Label>
                        <Form.Item name="password" rules={[{ required: true }]} style={{ flex: 1, marginBottom: 0 }}>
                            <FullWidthInput type="password" placeholder="password" />
                        </Form.Item>
                    </FormRow>

                    <FormRow>
                        <Label>SASL Mechanism</Label>
                        <Form.Item name="saslMechanism" initialValue="Plain" style={{ flex: 1, marginBottom: 0 }}>
                            <HalfWidthSelect>
                                <Option value="Plain">Plain</Option>
                                <Option value="SCRAM-SHA-256">SCRAM-SHA-256</Option>
                                <Option value="SCRAM-SHA-512">SCRAM-SHA-512</Option>
                            </HalfWidthSelect>
                        </Form.Item>
                    </FormRow>
                </AuthBox>
            )}

            <Form.Item name="description" style={{ marginBottom: 0 }}>
                <div>
                    <DescriptionLabel>Description:</DescriptionLabel>
                    <Form.Item name="description" style={{ flex: 1, marginBottom: 0 }}>
                        <TextArea
                            placeholder="Run the flow on clicking a button. good for getting started quickly."
                            rows={4}
                            style={{
                                backgroundColor: '#f5f5f5',
                                color: '#333',
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                </div>
            </Form.Item>
        </>
    );
};

export default KafkaTriggerFields;
