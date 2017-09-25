import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Image, Label, Header } from 'semantic-ui-react';
import { formatAgency, getInstructions, formatTransitGraphic } from '../../../utils/journeyHelpers';

const TransitNode = ({ step }) => {
  const agency = formatAgency(step);
  const instructions = getInstructions(step);
  const duration = step.duration;
  const { iconURL, transitLine, lineColor } = formatTransitGraphic(agency, step);

  return (
    <Popup
      trigger={
        <div>
          <Image src={iconURL} style={{ maxHeight: '22px', float: 'left' }} />
          {transitLine ? (
            <Label circular color={lineColor}>
              {transitLine}
            </Label>
          ) : (
            ''
          )}
        </div>
      }
    >
      <Header as="h4">{agency}</Header>
      <p>{instructions}</p>
      <p>{duration}</p>
    </Popup>
  );
};

TransitNode.propTypes = {
  step: PropTypes.shape({
    duration: PropTypes.string,
    instruction: PropTypes.string,
    mode: PropTypes.string,
  }).isRequired,
};

TransitNode.defaultProps = {
  step: { duration: '4 mins', instruction: 'Walk to Some St. Station', mode: 'WALKING' },
};

export default TransitNode;
