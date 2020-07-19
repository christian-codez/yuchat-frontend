import React, { useEffect } from 'react';
import Icon from '../icon/Icon';
import M from 'materialize-css';
const FloatingButtonItem = ({
  title,
  icon,
  iconColor,
  colorClass,
  position,
  onClick,
}) => {
  useEffect(() => {
    const tooltipElement = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltipElement);
  }, []);
  return (
    <li onClick={onClick}>
      <a
        data-position={position}
        data-tooltip={title}
        className={`btn-floating  tooltipped ${colorClass}`}>
        <Icon color={iconColor} icon={icon} size='25px' />
      </a>
    </li>
  );
};

export default FloatingButtonItem;
