import React, { useEffect, useState } from 'react';
import { Tabs, Button, Form, Input } from 'antd';
import { SlidersOutlined, SettingOutlined } from '@ant-design/icons';

import FunctionFields from './nodeFields/functionFields';
import TriggerFields from './nodeFields/triggerFields';
import HttpFields from './nodeFields/httpFields';
import ManualTriggerFields from './nodeFields/trigger/ManualTriggerFields';
import SchedulerTriggerFields from './nodeFields/trigger/SchedulerTriggerFields';
import GetWorstParamsSettings from './nodeFields/actionApp/get_worst_params/get_worst_parms_settings';
import GetWorstParamsInput from './nodeFields/actionApp/get_worst_params/get_worst_parms_input';
import KafkaTriggerFields from './nodeFields/trigger/KafkaTriggerFields';
import RootCauseAnalystInput from './nodeFields/actionApp/root_cause_analysis/root_cause_analyst_inputs';
import RootCauseAnalystSettings from './nodeFields/actionApp/root_cause_analysis/root_cause_analyst_setting';
import WebHooksFields from './nodeFields/trigger/WebHookFields';

import './propertyPanel.css';

const PropertyPanel = ({ node, onUpdateNode }) => {
  const [settingsForm] = Form.useForm();
  const [inputForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('settings');

  const [localFormState, setLocalFormState] = useState({
    settings: {},
    input: {},
  });

  // Watch inputsArray safely at component level
  const watchedInputsArray = Form.useWatch('inputsArray', inputForm) || [];

  useEffect(() => {
    if (!node) return;

    const newSettings = node?.settings || {};
    const newInput = node?.input || {};
    const inputsArray = newInput.inputsArray ?? [''];

    settingsForm.resetFields();
    inputForm.resetFields();

    Promise.resolve().then(() => {
      settingsForm.setFieldsValue(newSettings);
      inputForm.setFieldsValue({
        ...newInput,
        inputsArray,
      });
    });

    setLocalFormState({
      settings: newSettings,
      input: {
        ...newInput,
        inputsArray,
      },
    });

    setActiveTab('settings');
  }, [node?.id]);

  const handleTabChange = async (key) => {
    const currentForm = activeTab === 'settings' ? settingsForm : inputForm;

    try {
      const currentValues = await currentForm.validateFields();
      setLocalFormState((prev) => ({
        ...prev,
        [activeTab]: currentValues,
      }));
    } catch (err) {
      // ignore validation error on tab switch
    }

    setActiveTab(key);
    const newForm = key === 'settings' ? settingsForm : inputForm;
    newForm.setFieldsValue(localFormState[key] || {});
  };

  const handleSave = async () => {
    try {
      const [settingsValues, inputValues] = await Promise.all([
        settingsForm.validateFields().catch(() => ({})),
        inputForm.validateFields().catch(() => ({})),
      ]);

      const updatedNode =
        node.type !== 'trigger'
          ? {
              ...node,
              settings: settingsValues,
              input: {
                ...inputValues,
                inputsArray: inputValues.inputsArray || [],
              },
            }
          : {
              ...node,
              settings: settingsValues,
            };

      setLocalFormState({
        settings: settingsValues,
        input: updatedNode.input,
      });

      onUpdateNode(node.id, updatedNode);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const renderSettingsFields = () => {
    const baseId = node?.id?.split('-')[0];

    switch (baseId) {
      case 'trigger_manual':
        return <ManualTriggerFields />;
      case 'trigger_schedule':
        return <SchedulerTriggerFields />;
      case 'trigger_kafka':
        return <KafkaTriggerFields />;
      case 'trigger_webhook':
        return <WebHooksFields />;
      case 'common_http':
        return <HttpFields />;
      case 'action_worst_param':
        return <GetWorstParamsSettings />;
      case 'action_rca':
        return <RootCauseAnalystSettings />;
      case 'common_python':
      case 'common_webhook':
      case 'common_time':
        return <FunctionFields />;
      default:
        return <p className="text-gray-400 text-sm">No configurable settings.</p>;
    }
  };

  const renderInputFields = () => {
    const baseId = node?.id?.split('-')[0];

    switch (baseId) {
      case 'trigger_manual':
        return <p className="text-gray-400 text-sm">No inputs required for manual trigger.</p>;
      case 'action_worst_param':
        return (
          <Form.Item
            label="Inputs"
            name="inputsArray"
            rules={[{ required: true, message: 'Please provide at least one input.' }]}
          >
            <GetWorstParamsInput
              inputs={watchedInputsArray}
              onChangeInputs={(newInputs) => {
                inputForm.setFieldsValue({ inputsArray: newInputs });
              }}
            />
          </Form.Item>
        );
      case 'action_rca':
        return (
          <Form.Item
            label="Inputs"
            name="inputsArray"
            rules={[{ required: true, message: 'Please provide at least one input.' }]}
          >
            <RootCauseAnalystInput
              inputs={watchedInputsArray}
              onChangeInputs={(newInputs) => {
                inputForm.setFieldsValue({ inputsArray: newInputs });
              }}
            />
          </Form.Item>
        );
      case 'common_http':
      case 'common_python':
        return (
          <>
            <Form.Item label="Input Key" name="inputKey" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Input Value" name="inputValue" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </>
        );
      default:
        return <p className="text-gray-400 text-sm">No input fields defined.</p>;
    }
  };

  if (!node) {
    return <div className="property-panel-empty">Select a node to edit its properties</div>;
  }

  return (
    <div>
      <div className="panel-header">Properties</div>
      <Tabs
        destroyInactiveTabPane={false}
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
              <Form
                form={settingsForm}
                layout="vertical"
                className="property-form panel-scroll-wrapper"
              >
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
              <Form
                form={inputForm}
                layout="vertical"
                className="property-form panel-scroll-wrapper"
              >
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
  );
};

export default PropertyPanel;
