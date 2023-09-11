import { Tooltip } from 'react-tippy';
import 'tippy.js/dist/tippy.css';

function MNITooltip() {
  return (
    <div className="tooltip-container">
      <Tooltip title="Amount of money you take home after taxes." position="right" trigger="mouseenter">
        <button className="circle-button">i</button>
      </Tooltip>
    </div>
  );
}

function MSTooltip() {
    return (
      <div className="tooltip-container">
        <Tooltip title="Amount of all spending including bills, restaurants, groceries, and others." position="right" trigger="mouseenter">
          <button className="circle-button">i</button>
        </Tooltip>
      </div>
    );
  }

  function TATooltip() {
    return (
      <div className="tooltip-container">
        <Tooltip title="All assets you own such as your home, investment accounts, precious metals, etc" position="right" trigger="mouseenter">
          <button className="circle-button">i</button>
        </Tooltip>
      </div>
    );
  }

  function ERTooltip() {
    return (
      <div className="tooltip-container">
        <Tooltip title="The weighted average expected return of all of your assets" position="right" trigger="mouseenter">
          <button className="circle-button">i</button>
        </Tooltip>
      </div>
    );
  }

  function EITooltip() {
    return (
      <div className="tooltip-container">
        <Tooltip title="The price inflation you expect to see over your life" position="right" trigger="mouseenter">
          <button className="circle-button">i</button>
        </Tooltip>
      </div>
    );
  }

  function EAETooltip() {
    return (
      <div className="tooltip-container">
        <Tooltip title="Sometimes known as social security" position="right" trigger="mouseenter">
          <button className="circle-button">i</button>
        </Tooltip>
      </div>
    );
  }

  export { MNITooltip, MSTooltip, TATooltip, ERTooltip, EITooltip, EAETooltip};