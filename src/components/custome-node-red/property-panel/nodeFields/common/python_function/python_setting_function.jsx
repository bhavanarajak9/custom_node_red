import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';

const Container = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 6px;
  width: 100%;
  max-width: 400px;
`;

const SectionTitle = styled.h4`
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
`;

const InputGroup = styled.div`
  margin-bottom: 12px;
`;

const StyledInput = styled(Input)`
  background-color: #f5f5f5;
  color: #333;
`;

const AddButton = styled(Button)`
  background-color: #6c5ce7;
  color: white;
  border: none;
  margin-top: 4px;

  &:hover {
    background-color: #5a4bcf;
    color: white;
  }
`;

const AvailableDataBox = styled.div`
  margin-top: 16px;
  border: 1px dashed #ccc;
  padding: 8px;
  height: 80px;
  background-color: #fafafa;
`;

const Pythonsettingfunction = () => {
  const [inputs, setInputs] = useState([{ id: 1, value: '' }]);

  const handleAddInput = () => {
    setInputs([...inputs, { id: Date.now(), value: '' }]);
  };

  const handleInputChange = (id, value) => {
    setInputs(inputs.map(input => input.id === id ? { ...input, value } : input));
  };

  return (
    <Container>
      <SectionTitle>Inputs</SectionTitle>
      {inputs.map((input, index) => (
        <InputGroup key={input.id}>
          <label>{`Input ${index + 1}`}</label>
          <StyledInput
            placeholder="{{ $item.value }}"
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
          />
        </InputGroup>
      ))}
      <AddButton block onClick={handleAddInput}>Add Input</AddButton>

      <SectionTitle style={{ marginTop: 20 }}>Available Data</SectionTitle>
      <AvailableDataBox>
        {/* Future drag-and-drop elements go here */}
        Drag nodes/data here
      </AvailableDataBox>
    </Container>
  );
};

export default Pythonsettingfunction;
