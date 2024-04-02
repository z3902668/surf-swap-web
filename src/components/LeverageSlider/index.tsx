import { styled, alpha } from '@mui/system';
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';
import { indigo, grey}  from '@material-ui/core/colors';

export const marks = [
  {
    value: 1,
    label: '1x',
  },
  {
    value: 2.5,
    label: '2.5x',
  },
  {
    value: 5.0,
    label: '5x',
  },
  {
    value: 7.5,
    label: '7.5x',
  },
  {
    value: 10,
    label: '10x',
  },
];


const LeverageSlider = styled(BaseSlider)(
  ({ theme }) => `
  color: #0ABAB5;
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &.${sliderClasses.disabled} {
    pointer-events: none;
    cursor: default;
    color: #fff;
    opacity: 0.4;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: -6px;
    width: 14px;
    height: 14px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: #0ABAB5;
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover {
      box-shadow: 0 0 0 6px ${alpha(indigo[900], 0.3,)};
    }

    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 8px ${alpha(indigo[400],0.5,)};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 8px ${alpha(indigo[200],0.5,)};
      outline: none;
      transform: scale(1.2);
    }
  }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 99%;
    background-color: #fff;
    transform: translateX(-50%);
  }

  & .${sliderClasses.markActive} {
    background-color: #0ABAB5;
  }

  & .${sliderClasses.markLabel} {
    font-weight: 600;
    font-size: 12px;
    position: absolute;
    top: 24px;
    transform: translateX(-50%);
    margin-top: 8px;
  }
`,
);

export default LeverageSlider;
