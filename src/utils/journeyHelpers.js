import walkIcon from '../images/walk-web-med.png';
import acTransitLogo from '../images/transit/ACTransit-logo.png';
import bartLogo from '../images/transit/BART-logo.png';
import bgFerryLogo from '../images/transit/BlueAndGoldFleet-logo.png';
import boltBusLogo from '../images/transit/BoltBus-logo.png';
import caltrainLogo from '../images/transit/Caltrain-logo.png';
import greyhoundLogo from '../images/transit/Greyhound-logo.png';
import ggTransitLogo from '../images/transit/GoldenGateTransit-logo.png';
import samTransLogo from '../images/transit/SamTrans-logo.png';
import sfBayFerryLogo from '../images/transit/SfBayFerry-logo.png';
import sfmtaLogo from '../images/transit/SFMTA-logo.png';
import vtaLogo from '../images/transit/VTA-logo.png';

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

function formatTransitGraphic(agency, step) {
  const output = {
    iconURL: null,
    transitLine: null,
    lineColor: null,
  };

  if (step.mode === 'WALKING') {
    output.iconURL = walkIcon;
  }

  if (step.mode === 'TRANSIT') {
    output.transitLine = step.line;

    switch (agency) {
      case 'AC Transit':
        output.iconURL = acTransitLogo;
        break;

      case 'BART':
        output.iconURL = bartLogo;
        output.transitLine = step.longName;

        if (step.longName.includes('Pittsburg')) output.lineColor = 'yellow';
        if (step.longName.includes('Richmond')) output.lineColor = 'orange';
        if (step.longName.includes('Dublin')) output.lineColor = 'blue';
        if (step.longName.includes('Warm')) output.lineColor = 'green';
        break;

      case 'Blue & Gold Fleet':
        output.iconURL = bgFerryLogo;
        break;

      case 'Bolt Bus':
        output.iconURL = boltBusLogo;
        output.transitLine = step.headsign;
        break;

      case 'Caltrain':
        output.iconURL = caltrainLogo;
        break;

      case 'Greyhound Lines':
        output.iconURL = greyhoundLogo;
        output.transitLine = step.headsign;
        break;

      case 'Golden Gate Transit':
        output.iconURL = ggTransitLogo;
        break;

      case 'SamTrans':
        output.iconURL = samTransLogo;
        break;

      case 'SF Bay Ferry':
        output.iconURL = sfBayFerryLogo;
        break;

      case 'SFMTA':
        output.iconURL = sfmtaLogo;
        break;

      case 'VTA':
        output.iconURL = vtaLogo;
        break;

      default:
        output.transitLine = step.line;
    }
  }

  return output;
}

export { formatAgency, getInstructions, formatTransitGraphic };
