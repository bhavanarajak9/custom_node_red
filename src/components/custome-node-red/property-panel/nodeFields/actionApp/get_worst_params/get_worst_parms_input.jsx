import React, { useState,useMemo } from 'react';
import styled from 'styled-components';
import { Input, Button, Tooltip } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Container = styled.div`
  padding: 12px;
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  margin-top: 16px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 8px;
`;

const InputLabel = styled.label`
  min-width: 60px;
  font-size: 14px;
  color: #333;
`;

const StyledInput = styled(Input)`
  flex: 1;
  background-color: #f5f5f5;
  color: #333;
`;

const AddButton = styled(Button)`
  margin: 12px 0;
  background-color: #7a5af8;
  color: white;
  border: none;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #684df0;
  }
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
`;

const RemoveButton = styled(Button)`
  color: red;
  border: none;
`;

const DataBox = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  font-size: 13px;
  color: #333;
`;

const NodeGroup = styled.div`
  margin-bottom: 10px;
`;

const NodeTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const DataItem = styled.div`
  padding: 4px 8px;
  font-size: 12px;
  color: #444;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const GetWorstParamsInput = ({ inputs = [], onChangeInputs }) => {
  const updateInput = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    onChangeInputs(updated);
  };

  const addInput = () => {
    onChangeInputs([...inputs, `{{ number_${inputs.length + 1} }}`]);
  };

  const removeInput = (index) => {
    if (inputs.length > 1) {
      const updated = inputs.filter((_, i) => i !== index);
      onChangeInputs(updated);
    }
  };

  const insertValue = (value) => {
    const index = inputs.findIndex(val => val === '');
    const target = index !== -1 ? index : inputs.length - 1;
    const updated = [...inputs];
    updated[target] = value;
    onChangeInputs(updated);
  };

  const availableData = useMemo(() => [
    { name: 'counter_1', label: 'Number Counter', value: 250 },
    { name: 'filter_2', label: 'Filter', value: 500 },
    { name: 'total_3', label: 'Sum Total', value: 300 },
  ], []);

  return (
    <Container>
      {inputs.map((val, index) => (
        <InputRow key={index}>
          <InputLabel>Input {index + 1}</InputLabel>
          <StyledInput
            placeholder={`{{ number_${index + 1} }}`}
            value={val}
            onChange={(e) => updateInput(index, e.target.value)}
          />
          {inputs.length > 1 && (
            <Tooltip title="Remove input">
              <RemoveButton
                icon={<MinusCircleOutlined />}
                onClick={() => removeInput(index)}
              />
            </Tooltip>
          )}
        </InputRow>
      ))}

      <Centered>
        <AddButton icon={<PlusOutlined />} onClick={addInput}>
          Add Input
        </AddButton>
      </Centered>

      <SectionTitle>Available Data</SectionTitle>
      <DataBox>
        {availableData.map(({ name, label, value }) => (
          <NodeGroup key={name}>
            <NodeTitle>📦 {name} ({label})</NodeTitle>
            <DataItem onClick={() => insertValue(value)}>
              {value}
            </DataItem>
          </NodeGroup>
        ))}
      </DataBox>
    </Container>
  );
};


export default GetWorstParamsInput;
