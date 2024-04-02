import { styled } from '@mui/system';
// import { Tabs } from '@mui/base/Tabs';
import { indigo }  from '@material-ui/core/colors';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';

export const Tab = styled(BaseTab)`
  color: white;
  cursor: pointer;
  /* font-size: 0.875rem; */
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  /* margin: 6px; */
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #333;
  }

  &:focus {
    color: #fff;
    outline: 1px solid #0ABAB5;
  }

  &.${tabClasses.selected} {
    background-color: #333;
    color: #0ABAB5;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-size: 0.875rem;
`;

export const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: #101010;
  border: 1px solid #1A1A1A;
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 4px;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.4)' : 'rgba(0,0,0, 0.2)'
  };
  `,
);
