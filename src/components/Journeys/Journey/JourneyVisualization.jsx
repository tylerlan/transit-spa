import React from 'react';
import PropTypes from 'prop-types';

import { Icon, List, Step } from 'semantic-ui-react';

const JourneyVisualization = ({ active, steps }) =>
  (<List.Item>
    <Step.Group>
      {steps.map((step, index) => {
        let name;
        let title;

        if (step.mode === 'WALKING' && index !== 0) return null;

        if (step.mode.includes('WALKING')) {
          name = 'blind';
          title = 'Walk';
        }

        if (step.mode === 'TRANSIT') {
          name = step.instruction.includes('rail') ? 'subway' : 'bus';
          title = step.instruction.includes('rail') ? 'Train' : 'Bus';
        }

        return (
          <Step disabled={active} key={step.instruction}>
            <Icon name={name} size="big" />
            <Step.Content title={title} />
          </Step>
        );
      })}
    </Step.Group>
  </List.Item>);

JourneyVisualization.propTypes = {
  active: PropTypes.bool.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

JourneyVisualization.defaultProps = {
  active: null,
  steps: [{}],
};

export default JourneyVisualization;
