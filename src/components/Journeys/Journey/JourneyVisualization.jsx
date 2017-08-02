import React from 'react';
import PropTypes from 'prop-types';

import { Icon, List, Step } from 'semantic-ui-react';

const JourneyVisualization = ({ active }) =>
  (<List.Item>
    <Step.Group>
      <Step disabled={active}>
        <Icon name="blind" size="big" />
        <Step.Content title="Walk" description="5 min to Montgomery St" />
      </Step>

      <Step disabled={active}>
        <Icon name="subway" size="big" />
        <Step.Content title="BART" description="30 min to SFO Int'l Airport" />
      </Step>
    </Step.Group>
  </List.Item>);

JourneyVisualization.propTypes = {
  active: PropTypes.bool.isRequired,
};

JourneyVisualization.defaultProps = {
  active: null,
};

export default JourneyVisualization;
