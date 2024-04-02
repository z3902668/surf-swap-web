import styled from "@emotion/styled";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { indigo }  from '@material-ui/core/colors';
import SolanaLogo from "../../assets/images/solana.svg";

const WrapperHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #101010;
    /* height: 60px;
    line-height: 60px; */
    color: #fff;
    padding: 10px 20px;
`

function Header() {
    return (
        <WrapperHeader>
            <img src={SolanaLogo} alt="SolanaLogo" style={{width: '150px'}} />
            <WalletMultiButton />
        </WrapperHeader>
    )
};

export default Header;
