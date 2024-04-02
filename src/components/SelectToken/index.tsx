import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";

function SelectToken() {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        console.log('clicked');
        setOpen(true)
    }
    const handleClose = () => {
        console.log('clicked');
        setOpen(false)
    }
    return (
        <div>
            <Box
                sx={{display: 'flex', alignItems: 'center', cursor: "pointer"}}
                onClick={handleClick}
            >
                <img src="/images/tokens/BTC.svg" alt="" style={{width: '24px', height: '24px'}} />
                <Typography ml="8px" variant="body1">SOL</Typography>
                <KeyboardArrowDownIcon style={{color: '#fff'}}/>
            </Box>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    Use Google's location service?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SelectToken;
