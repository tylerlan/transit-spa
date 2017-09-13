import React from 'react';
import PropTypes from 'prop-types';

import { Popup, Image, Label, Header } from 'semantic-ui-react';

import walkIcon from '../../../images/walk-web-med.png';

import acTransitLogo from '../../../images/transit/ACTransit-logo.png';
import bartLogo from '../../../images/transit/BART-logo.png';
import bgFerryLogo from '../../../images/transit/BlueAndGoldFleet-logo.png';
import boltBusLogo from '../../../images/transit/BoltBus-logo.png';
import caltrainLogo from '../../../images/transit/Caltrain-logo.png';
import greyhoundLogo from '../../../images/transit/Greyhound-logo.png';
import ggTransitLogo from '../../../images/transit/GoldenGateTransit-logo.png';
import samTransLogo from '../../../images/transit/SamTrans-logo.png';
import sfBayFerryLogo from '../../../images/transit/SfBayFerry-logo.png';
import sfmtaLogo from '../../../images/transit/SFMTA-logo.png';
import vtaLogo from '../../../images/transit/VTA-logo.png';

function formatAgency(step) {
  let output = '';
  if (step.mode.includes('WALKING')) {
    output = 'Walk';
  }
  if (step.agency) {
    output = step.agency.replace(/Bay Area Rapid Transit/, 'BART');
  }
  return output;
}

function getInstructions(step) {
  let instr = '';
  if (!step) return instr;

  if (step.shortName) {
    if (step.instruction.startsWith('Bus ')) {
      instr = step.instruction.replace(/^Bus /, `Bus ${step.shortName} `);
    } else {
      instr = `${step.shortName} ${step.instruction}`;
    }
  } else {
    instr = step.instruction;
  }
  instr = instr.replace(/^Walk /, '');
  instr = instr.replace(/San Francisco International Airport/, 'SF Intl. Airport');

  return instr;
}

const TransitNode = ({ step }) => {
  let iconURL;
  let transitLine = null;
  let lineColor = null;

  const agency = formatAgency(step);
  const instructions = getInstructions(step);

  if (step.mode === 'WALKING') {
    iconURL = walkIcon;
  }

  if (step.mode === 'TRANSIT') {
    transitLine = step.line;

    switch (agency) {
      case 'AC Transit':
        iconURL = acTransitLogo;
        break;

      case 'BART':
        iconURL = bartLogo;
        transitLine = step.longName;

        if (step.longName.includes('Pittsburg')) lineColor = 'yellow';
        if (step.longName.includes('Richmond')) lineColor = 'orange';
        if (step.longName.includes('Dublin')) lineColor = 'blue';
        if (step.longName.includes('Warm')) lineColor = 'green';
        break;

      case 'Blue & Gold Fleet':
        iconURL = bgFerryLogo;
        break;

      case 'Bolt Bus':
        iconURL = boltBusLogo;
        transitLine = step.headsign;
        break;

      case 'Caltrain':
        iconURL = caltrainLogo;
        break;

      case 'Greyhound Lines':
        iconURL = greyhoundLogo;
        transitLine = step.headsign;
        break;

      case 'Golden Gate Transit':
        iconURL = ggTransitLogo;
        break;

      case 'SamTrans':
        iconURL = samTransLogo;
        break;

      case 'SF Bay Ferry':
        iconURL = sfBayFerryLogo;
        break;

      case 'SFMTA':
        iconURL = sfmtaLogo;
        break;

      case 'VTA':
        iconURL = vtaLogo;
        break;

      default:
        transitLine = step.line;
    }
  }

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
      <p>{step.duration}</p>
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
