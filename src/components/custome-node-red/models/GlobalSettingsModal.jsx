// models/GlobalSettingsModal.jsx
import React, { useState } from 'react';
import { Modal, Table, Button, Input, Tooltip, Space } from 'antd';
import { DeleteOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  margin: 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0;
`;

const GlobalSettingsModal = ({ open, onClose, settings, setSettings }) => {
  const [newSetting, setNewSetting] = useState({ name: '', value: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    if (newSetting.name.trim() && newSetting.value.trim()) {
      setSettings([...settings, newSetting]);
      setNewSetting({ name: '', value: '', description: '' });
      setShowForm(false);
    }
  };

  const handleDelete = (index) => {
    const updated = [...settings];
    updated.splice(index, 1);
    setSettings(updated);
  };

  const updateField = (index, field, value) => {
    const updated = [...settings];
    updated[index][field] = value;
    setSettings(updated);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, __, index) => (
        <Input
          value={settings[index].name}
          onChange={(e) => updateField(index, 'name', e.target.value)}
        />
      )
    },
    {
      title: 'Value',
      dataIndex: 'value',
      render: (_, __, index) => (
        <Input
          value={settings[index].value}
          onChange={(e) => updateField(index, 'value', e.target.value)}
        />
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (_, __, index) => (
        <Input
          value={settings[index].description}
          onChange={(e) => updateField(index, 'description', e.target.value)}
        />
      )
    },
    {
      title: 'Action',
      render: (_, __, index) => (
        <Tooltip title="Delete">
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(index)} />
        </Tooltip>
      )
    }
  ];

  return (
    <Modal
      centered
    closable={false} 
      title={
        <ModalHeader>
          <StyledTitle>Global Settings</StyledTitle>
          <RightButtons>
            {!showForm ? (
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowForm(true)}>
                New
              </Button>
            ) : (
              <Button icon={<ArrowLeftOutlined />} onClick={() => setShowForm(false)}>
                Back to List
              </Button>
            )}
            <Button type="text" onClick={() => { setShowForm(false); onClose(); }} style={{ fontSize: 18 }}>
              ✕
            </Button>
          </RightButtons>
        </ModalHeader>
      }
      open={open}
      footer={null}
      onCancel={() => {
        setShowForm(false);
        onClose();
      }}
      width={850}
    >
      {!showForm ? (
        <Table
          dataSource={settings}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey={(record, index) => index}
        />
      ) : (
        <FormContainer>
          <Input
            placeholder="Setting Name"
            value={newSetting.name}
            onChange={(e) => setNewSetting({ ...newSetting, name: e.target.value })}
          />
          <Input
            placeholder="Value"
            value={newSetting.value}
            onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={newSetting.description}
            onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
          />
          <Space>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="primary" onClick={handleAdd}>Add Setting</Button>
          </Space>
        </FormContainer>
      )}
    </Modal>
  );
};

export default GlobalSettingsModal;
