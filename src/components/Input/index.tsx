import * as React from 'react';
import { Input as BaseInput } from '@mui/base/Input';
import { styled } from '@mui/system';
import { indigo }  from '@material-ui/core/colors';
const Input = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return <BaseInput style={{width: '100%'}} slots={{ input: InputElement }} {...props} ref={ref} />;
});


const InputElement = styled('input')(
  ({ theme }) => `
//   min-width: 260px;
  width: 100%;
  box-sizing: border-box;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 4px;
  border-radius: 8px;
  color: #ffffff;
  background: #333;
  border: none;
  text-align: right;
  font-size: 16px;
//   border: 1px solid ${indigo[200]};


  &::placeholder {
    color: #ffffff;
  }

  &:hover {
    border-color: ${indigo[400]};
  }

//   &:focus {
//     border-color: ${indigo[400]};
//     box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? indigo[600] : indigo[200]};
//   }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export default Input;
