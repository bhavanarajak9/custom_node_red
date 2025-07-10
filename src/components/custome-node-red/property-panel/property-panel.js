import React, { useEffect, useState } from 'react';
import { Tabs, Button, Form, Input } from 'antd';
import { SlidersOutlined, SettingOutlined } from '@ant-design/icons';

import FunctionFields from './nodeFields/functionFields';
import TriggerFields from './nodeFields/triggerFields';
import HttpFields from './nodeFields/httpFields';
import ManualTriggerFields from './nodeFields/trigger/ManualTriggerFields';
import SchedulerTriggerFields from'./nodeFields/trigger/SchedulerTriggerFields';
import KafkaTriggerFields from'./nodeFields/trigger/KafkaTriggerFields';

import './propertyPanel.css';
import WebHooksFields from './nodeFields/trigger/WebHookFields';
import Pythonsettingfunction from './nodeFields/common/python_function/python_setting_function';
import Pythoninputfunction from './nodeFields/common/python_function/python_input_function';

const PropertyPanel = ({ node, onUpdateNode }) => {
  const [settingsForm] = Form.useForm();
  const [inputForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('settings');

  // State to store unsaved data for both tabs
  const [localFormState, setLocalFormState] = useState({
    settings: {},
    input: {},
  });

useEffect(() => {
  if (!node) return;
  console.log(node,"node")

  // Extract new values
  const newSettings = node.params?.settings || {};
  const newInput = node.params?.input || {};

  // Reset forms first
  settingsForm.resetFields();
  inputForm.resetFields();

  // Then update form fields
  Promise.resolve().then(() => {
    settingsForm.setFieldsValue(newSettings);
    inputForm.setFieldsValue(newInput);
  });

  // Update local state (optional, for tracking)
  setLocalFormState({
    settings: newSettings,
    input: newInput,
  });

  // Always start from settings tab
  setActiveTab("settings");
}, [node?.id]); // ✅ Depend only on node.id for cleaner behavior


  // When tab changes, save current tab data & load new tab data
  const handleTabChange = async (key) => {
    const currentForm = activeTab === 'settings' ? settingsForm : inputForm;

    try {
      const currentValues = await currentForm.validateFields();
      setLocalFormState((prev) => ({
        ...prev,
        [activeTab]: currentValues,
      }));
    } catch (err) {
      // validation failed, but still continue tab switch
    }

    setActiveTab(key);

    // Load new tab values into form
    const newForm = key === 'settings' ? settingsForm : inputForm;
    newForm.setFieldsValue(localFormState[key] || {});
  };

const handleSave = async () => {
  try {
    const [settingsValues, inputValues] = await Promise.all([
      settingsForm.validateFields().catch(() => ({})),
      inputForm.validateFields().catch(() => ({})),
    ]);

    const updatedParams =
      node.type !== 'trigger'
        ? {
            settings: settingsValues,
            input: inputValues,
          }
        : {
            settings: settingsValues,
          };

    // Update local state
    setLocalFormState(updatedParams);

    // Save to parent node
    onUpdateNode(node.id, {
      ...node,
      params: updatedParams,
    });

  } catch (error) {
    console.error("Validation failed:", error);
  }
};



  const renderSettingsFields = () => {
    const baseId = node?.id.split('-')[0];

    switch (baseId) {
      case 'trigger_manual':
        return <ManualTriggerFields />;
      case 'trigger_schedule':
        return <SchedulerTriggerFields />
      case 'trigger_kafka':
        return <KafkaTriggerFields />
      case 'trigger_webhook':
        return<WebHooksFields />
      case 'common_http':
        return <HttpFields />;
      case 'common_python':
        return < Pythoninputfunction/>
      case 'common_webhook':
      case 'common_time':
        return <FunctionFields />;
      default:
        return <p className="text-gray-400 text-sm">No configurable settings.</p>;
    }
  };

  const renderInputFields = () => {
    const baseId = node?.id.split('-')[0];

    switch (baseId) {
      case 'trigger_manual':
        return <p className="text-gray-400 text-sm">No inputs required for manual trigger.</p>;
      case 'common_http':
      case 'common_python':
        return <Pythonsettingfunction/>
      default:
        return <p className="text-gray-400 text-sm">No input fields defined.</p>;
    }
  };

  if (!node) return <div className="property-panel-empty">Select a node to edit its properties</div>;

return (
  <div >
    <div className="panel-header">Properties</div>
    <div className="">
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        size="small"
        className="custom-tabs"
        items={[
          {
            key: 'settings',
            label: (
              <span>
                <SlidersOutlined style={{ marginRight: 6 }} />
                Settings
              </span>
            ),
            children: (
              <Form form={settingsForm} layout="vertical" className="property-form panel-scroll-wrapper">
                {renderSettingsFields()}
                <Button type="primary" onClick={handleSave} style={{ marginTop: 16 }}>
                  Save
                </Button>
              </Form>
            ),
          },
          node.type !== 'trigger' && {
            key: 'input',
            label: (
              <span>
                <SettingOutlined style={{ marginRight: 6 }} />
                Inputs
              </span>
            ),
            children: (
              <Form form={inputForm} layout="vertical" className="property-form panel-scroll-wrapper">
                {renderInputFields()}
                <Button type="primary" onClick={handleSave} style={{ marginTop: 16 }}>
                  Save
                </Button>
              </Form>
            ),
          },
        ].filter(Boolean)}
      />
    </div>
  </div>
);

};

export default PropertyPanel;
