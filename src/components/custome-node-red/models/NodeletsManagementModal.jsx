import React, { useState } from 'react';
import { Modal, Table, Button, Input, Tooltip, Space } from 'antd';
import { DeleteOutlined, PlusOutlined, ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
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

const NodeletsManagementModal = ({ open, onClose, nodelets, setNodelets }) => {
  const [newNodelet, setNewNodelet] = useState({ name: '', version: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    if (newNodelet.name.trim() && newNodelet.version.trim()) {
      setNodelets([...nodelets, newNodelet]);
      setNewNodelet({ name: '', version: '', description: '' });
      setShowForm(false);
    }
  };

  const handleDelete = (index) => {
    const updated = [...nodelets];
    updated.splice(index, 1);
    setNodelets(updated);
  };

  const updateField = (index, field, value) => {
    const updated = [...nodelets];
    updated[index][field] = value;
    setNodelets(updated);
  };

  const columns = [
    {
      title: 'Node Name',
      dataIndex: 'name',
      render: (_, __, index) => (
        <Input
          value={nodelets[index].name}
          onChange={(e) => updateField(index, 'name', e.target.value)}
        />
      )
    },
    {
      title: 'Version',
      dataIndex: 'version',
      render: (_, __, index) => (
        <Input
          value={nodelets[index].version}
          onChange={(e) => updateField(index, 'version', e.target.value)}
        />
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (_, __, index) => (
        <Input
          value={nodelets[index].description}
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
          <StyledTitle>Nodelets Management</StyledTitle>
          <RightButtons>
            {!showForm ? (
              <>
                <Button type="primary" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </>
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
          dataSource={nodelets}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey={(record, index) => index}
        />
      ) : (
        <FormContainer>
          <Input
            placeholder="Node Name"
            value={newNodelet.name}
            onChange={(e) => setNewNodelet({ ...newNodelet, name: e.target.value })}
          />
          <Input
            placeholder="Version"
            value={newNodelet.version}
            onChange={(e) => setNewNodelet({ ...newNodelet, version: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={newNodelet.description}
            onChange={(e) => setNewNodelet({ ...newNodelet, description: e.target.value })}
          />
          <Space>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="primary" onClick={handleAdd}>Add Nodelet</Button>
          </Space>
        </FormContainer>
      )}
    </Modal>
  );
};

export default NodeletsManagementModal;
