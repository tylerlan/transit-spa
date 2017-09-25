import React from 'react';
import PropTypes from 'prop-types';

import { Step } from 'semantic-ui-react';

import TransitNode from './TransitNode';

const JourneyVisualization = ({ steps }) => (
  <Step.Group className="journeyVizColumn">
    {steps.map((step) => {
      const uniqueKey = step.shortName + step.instruction;

      return (
        <Step key={uniqueKey}>
          <TransitNode step={step} />
        </Step>
      );
    })}
  </Step.Group>
);

JourneyVisualization.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

JourneyVisualization.defaultProps = {
  steps: [{}],
};

export default JourneyVisualization;
