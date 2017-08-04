import React from 'react';
import PropTypes from 'prop-types';

import { Icon, List, Step } from 'semantic-ui-react';

const JourneyVisualization = ({ active, steps }) =>
  (<List.Item>
    <Step.Group>
      {steps.map((step) => {
        let name;
        let title;
        if (step.mode.includes('WALKING')) {
          name = 'blind';
          title = 'Walk';
        }
        if (step.mode.includes('TRANSIT')) {
          name = 'bus';
          title = 'Bus';
        }
        if (step.mode.includes('rail')) {
          name = 'BART';
          title = 'BART';
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
};

JourneyVisualization.defaultProps = {
  active: null,
};

export default JourneyVisualization;
