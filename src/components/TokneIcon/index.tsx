import { Typography } from "@mui/material";

type Props = {
    symbol: string;
}
export default function TokenIcon({ symbol }: Props) {
    return (
        <div
            style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'center'
            }}
        >
            <img
                src={`./images/tokens/${symbol}.png`}
                alt=""
                style={{
                    width: '20px',
                    borderRadius: '50%',
                }}
            />
            <Typography fontSize="14px">{symbol}</Typography>
        </div>
    )
}
