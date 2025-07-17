import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
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
import Pythonsettingfunction from './nodeFields/common/python_function/python_setting_function';
import Pythoninputfunction from './nodeFields/common/python_function/python_input_function';
import './propertyPanel.css';
import Switchsettingfunction from './nodeFields/common/switch_function/switch_setting_function';
import MailSettingsForm from './nodeFields/common/send_mail/send_mail_function';
import LoopSettingsForm from './nodeFields/common/Loop/loop_setting_function';
import Loopinputfunction from './nodeFields/common/Loop/loop_input_function';
import MergeSettingsForm from './nodeFields/common/merge_function/merge_setting_function';

const PropertyPanel = forwardRef(({ node, onUpdateNode }, ref) => {
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

  useImperativeHandle(ref, () => ({
    handleSave,
  }));

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
        return < Pythonsettingfunction />
      case 'common_webhook':
      case 'common_time':
        return <FunctionFields />;
      case 'common_switch':
      case 'common_filter':
        return <Switchsettingfunction />
      case 'common_send_mail':
        return <MailSettingsForm />
      case 'common_loop':
        return <LoopSettingsForm />
      case 'common_merge':
        return <MergeSettingsForm />
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
      case 'common_switch':
      case 'common_filter':
      case 'common_python':
      case 'common_merge':
      case 'common_send_mail':
        return (
          <Form.Item
            label="Inputs"
            name="inputsArray"
            rules={[{ required: true, message: 'Please provide at least one input.' }]}
          >
            <Pythoninputfunction
              inputs={watchedInputsArray}
              onChangeInputs={(newInputs) => {
                inputForm.setFieldsValue({ inputsArray: newInputs });
              }}
            />
          </Form.Item>
        );
      case 'common_loop':
        return (
          <Form.Item
            label="Input"
            name="inputsArray"
            rules={[{ required: true, message: 'Please provide at least one input.' }]}
          >
            <Loopinputfunction
              inputs={watchedInputsArray}
              onChangeInputs={(newInputs) => {
                inputForm.setFieldsValue({ inputsArray: newInputs });
              }}
            />
          </Form.Item>);
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
              </Form>
            ),
          },
        ].filter(Boolean)}
      />
    </div>
  );
});

export default PropertyPanel;
