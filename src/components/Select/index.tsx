import * as React from 'react';
import clsx from 'clsx';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { indigo, grey}  from '@material-ui/core/colors';

import {
  useSelect,
  SelectOptionDefinition,
  SelectProvider,
} from '@mui/base/useSelect';
import { useOption } from '@mui/base/useOption';
import { styled } from '@mui/system';


const Root = styled('div')`
  position: relative;
`;

const Toggle = styled('div')`
    display: flex;
    align-items: center;
    color: #fff;
    cursor: pointer;
    font-weight: 500;
`

const Listbox = styled('ul')(
  ({ theme }) => `
  padding: 10px;
  border-radius: 6px;
  background: #101010;
  border: 1px solid #2a2a2a;
  box-sizing: border-box;
  min-width: 130px;
  position: absolute;
  height: auto;
  width: 100%;
  overflow: auto;
  z-index: 1;
  outline: 0px;
  list-style: none;

  &.hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s step-end;
  }
  `,
);

const Option = styled('li')(
  ({ theme }) => `
    padding: 10px 0;
    color: #fff;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
  `,
);

interface Props {
  options: SelectOptionDefinition<string>[];
  value?: string | null
  defaultValue?: string,
  placeholder?: string
  onChange?: (v: string | null) => void,
}

interface OptionProps {
  children?: React.ReactNode;
  className?: string;
  value: string;
  disabled?: boolean;

}

function renderSelectedValue(
  value: string | null,
  options: SelectOptionDefinition<string>[],
) {
  const selectedOption = options.find((option) => option.value === value);

  return selectedOption ? `${selectedOption.label}` : null;
}

function CustomOption(props: OptionProps) {
  const { children, value, className, disabled = false } = props;
  const { getRootProps, highlighted } = useOption({
    value,
    disabled,
    label: children,
  });

  return (
    <Option
      {...getRootProps()}
      className={clsx({ highlighted }, className)}
      style={{ '--color': value } as any}
    >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={`./images/tokens/${value}.png`} alt="" style={{width: '20px', borderRadius: '50%'}} />
          <span style={{ marginLeft: '6px' }}>{children}</span>
        </div>
    </Option>
  );
}

export default function CustomSelect({ value, options, placeholder, defaultValue, onChange }: Props) {
  const listboxRef = React.useRef<HTMLUListElement>(null);
  const [listboxVisible, setListboxVisible] = React.useState(false);

  const { getButtonProps, getListboxProps, contextValue, value: inValue } = useSelect<
    string,
    false
  >({
    listboxRef,
    onOpenChange: setListboxVisible,
    open: listboxVisible,
    defaultValue: defaultValue,
  });

  React.useEffect(() => {
    onChange && onChange(inValue)
  }, [inValue]);

  return (
    <Root>
      <Toggle {...getButtonProps()} style={{ '--color': value } as any}>
        <img src={`./images/tokens/${inValue}.png`} alt="" style={{width: '20px', borderRadius: '50%', marginRight: '4px'}} />
        {renderSelectedValue(inValue, options) || (
          <span className="placeholder">{placeholder ?? ' '}</span>
        )}
        <KeyboardArrowDownIcon/>
      </Toggle>
      <Listbox
        {...getListboxProps()}
        aria-hidden={!listboxVisible}
        className={listboxVisible ? '' : 'hidden'}
      >
        <SelectProvider value={contextValue}>
          {options.map((option) => {
            return (
              <CustomOption key={option.value} value={option.value}>
                {option.label}
              </CustomOption>
            );
          })}
        </SelectProvider>
      </Listbox>
    </Root>
  );
}
