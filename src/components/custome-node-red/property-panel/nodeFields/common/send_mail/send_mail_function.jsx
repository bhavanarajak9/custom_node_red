import React from 'react';
import styled from 'styled-components';
import { Form, Input, Switch } from 'antd';

const { TextArea } = Input;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
`;

const Label = styled.label`
  min-width: 120px;
  font-size: 14px;
  color: #333;
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

const Section = styled.div`
  margin-bottom: 16px;
`;

const MailSettingsForm = () => {
  return (
    <Form layout="vertical">
      <Section>
        <FieldRow>
          <Label>Name</Label>
          <Form.Item name="name" style={{ flex: 1, marginBottom: 0 }}>
            <StyledInput placeholder="send mail" />
          </Form.Item>
        </FieldRow>

        <FieldRow>
          <Label>User</Label>
          <Form.Item name="user" style={{ flex: 1, marginBottom: 0 }}>
            <StyledInput />
          </Form.Item>
        </FieldRow>

        <FieldRow>
          <Label>Password</Label>
          <Form.Item name="password" style={{ flex: 1, marginBottom: 0 }}>
            <StyledInput type="password" />
          </Form.Item>
        </FieldRow>

        <FieldRow>
          <Label>Host</Label>
          <Form.Item name="host" style={{ flex: 1, marginBottom: 0 }}>
            <StyledInput />
          </Form.Item>
        </FieldRow>

        <FieldRow>
          <Label>Port</Label>
          <Form.Item name="port" style={{ flex: 1, marginBottom: 0 }}>
            <StyledInput />
          </Form.Item>
        </FieldRow>

        <FieldRow>
          <Label>SSL/TLS</Label>
          <Form.Item name="ssl" valuePropName="checked" style={{ marginBottom: 0 }}>
            <Switch />
          </Form.Item>
        </FieldRow>

        <FieldRow>
          <Label>Client Host Name</Label>
          <Form.Item name="clientHost" style={{ flex: 1, marginBottom: 0 }}>
            <StyledInput />
          </Form.Item>
        </FieldRow>

        <FieldRow>
          <Label>From</Label>
          <Form.Item name="from" style={{ flex: 1, marginBottom: 0 }}>
            <StyledInput />
          </Form.Item>
        </FieldRow>

        <FieldRow>
          <Label>To</Label>
          <Form.Item name="to" style={{ flex: 1, marginBottom: 0 }}>
            <StyledInput />
          </Form.Item>
        </FieldRow>

        <FieldRow>
          <Label>Subject</Label>
          <Form.Item name="subject" style={{ flex: 1, marginBottom: 0 }}>
            <StyledInput />
          </Form.Item>
        </FieldRow>

        <Section>
          <Label>Message:</Label>
          <Form.Item name="message" style={{ marginBottom: 0 }}>
            <StyledTextArea rows={3} />
          </Form.Item>
        </Section>

        <Section>
          <Label>Description:</Label>
          <Form.Item name="description" style={{ marginBottom: 0 }}>
            <StyledTextArea
              placeholder="Sends the contents as an email"
              rows={2}
            />
          </Form.Item>
        </Section>
      </Section>
    </Form>
  );
};

export default MailSettingsForm;
