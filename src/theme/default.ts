import { createTheme, ThemedProps } from '@mui/material';

let defaultLightTheme = createTheme({
    palette: {
        primary: {
            main: '#0ABAB5'
        }
    },
    spacing: 1,
    typography: {
        fontSize: 16,
        subtitle1: {
            color: "#fff"
        }
    },
    components: {
        MuiButton: {
            styleOverrides:{
                root: {
                    textTransform: 'none',
                    color: '#fff',
                    borderRadius: '14px'
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#fff"
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    'input': {
                        textAlign: 'right'
                    }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#10141f',
                    boxShadow: '0 8px 20px rgba(0,0,0,.6)'
                    // color: '#000'
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                '.Mui-disabled': {
                    backgroundColor: '#545d5d !important'
                }
            }
        }
    }
});

export default defaultLightTheme;
