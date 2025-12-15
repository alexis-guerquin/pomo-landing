import React from 'react';
import styles from './3dbutton.module.css';

type ButtonVariant = 'rectangle' | 'round';
type ButtonColor = 'primary' | 'secondary';
type ButtonTheme = 'light' | 'dark';

interface ThreeDButtonProps {
  onClick?: () => void;
  text?: string;
  enableSound?: boolean;
  variant?: ButtonVariant;
  color?: ButtonColor;
  theme?: ButtonTheme;
  icon?: React.ReactNode;
  pressed?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button';
}

const ThreeDButton: React.FC<ThreeDButtonProps> = ({
  onClick,
  text = '',
  variant = 'rectangle',
  color = 'primary',
  theme = 'light',
  icon,
  pressed = false,
  disabled = false,
  type = 'submit',
}) => {
  const handleClick = () => {
    onClick?.();
  };

  const getButtonClass = () => {
    const baseClass = variant === 'round' ? styles.tdbuttonRound : styles.tdbutton;
    const pressedBaseClass = pressed ? (variant === 'round' ? styles.tdbuttonRoundPressed : styles.tdbuttonPressed) : '';
    
    let colorClass = '';
    let pressedColorClass = '';
    
    if (variant === 'round') {
      if (color === 'primary' && theme === 'dark') {
        colorClass = styles.tdbuttonRoundPrimaryDark;
        pressedColorClass = pressed ? styles.tdbuttonRoundPrimaryDarkPressed : '';
      } else if (color === 'secondary' && theme === 'light') {
        colorClass = styles.tdbuttonRoundSecondaryLight;
        pressedColorClass = pressed ? styles.tdbuttonRoundSecondaryLightPressed : '';
      } else if (color === 'secondary' && theme === 'dark') {
        colorClass = styles.tdbuttonRoundSecondaryDark;
        pressedColorClass = pressed ? styles.tdbuttonRoundSecondaryDarkPressed : '';
      } else {
        // primary light (par défaut pour round)
        colorClass = styles.tdbuttonRoundPrimaryLight;
        pressedColorClass = pressed ? styles.tdbuttonRoundPrimaryLightPressed : '';
      }
    } else {
      // variant rectangle
      if (color === 'primary' && theme === 'dark') {
        colorClass = styles.tdbuttonPrimaryDark;
        pressedColorClass = pressed ? styles.tdbuttonPrimaryDarkPressed : '';
      } else if (color === 'secondary' && theme === 'light') {
        colorClass = styles.tdbuttonSecondaryLight;
        pressedColorClass = pressed ? styles.tdbuttonSecondaryLightPressed : '';
      } else if (color === 'secondary' && theme === 'dark') {
        colorClass = styles.tdbuttonSecondaryDark;
        pressedColorClass = pressed ? styles.tdbuttonSecondaryDarkPressed : '';
      } else {
        // primary light (par défaut pour rectangle)
        colorClass = styles.tdbuttonPrimaryLight;
        pressedColorClass = pressed ? styles.tdbuttonPrimaryLightPressed : '';
      }
    }
    
    return `${baseClass} ${colorClass} ${pressedBaseClass} ${pressedColorClass}`.trim();
  };

  const buttonClass = getButtonClass();

  const renderIcon = () => {
    if (!icon) return null;
    
    // Détermine la classe à appliquer : iconAlone si pas de texte, sinon icon
    const iconClass = !text || text.trim() === '' ? styles.iconAlone : styles.icon;
    
    if (typeof icon === 'function') {
      return <span className={iconClass}></span>;
    }
    return <span className={iconClass}>{icon}</span>;
  };

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {renderIcon()}
      {text && text.trim() !== '' && text}
    </button>
  );
};

export default ThreeDButton;
