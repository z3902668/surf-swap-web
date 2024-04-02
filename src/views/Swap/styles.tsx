import styled from "@emotion/styled";
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    padding-top: 50px;
    box-sizing: border-box;
    height: calc(100vh - 68px);
`
export const TradeBox = styled.div`
    width: 400px;
    border-radius: 21.2px;
    padding: 30px;
    background-color: #101010;
`

export const LiquidityBox = styled.div`
    width: 400px;
    border-radius: 21.2px;
    padding: 30px;
    background-color: #101010;
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 20px;
`

export const Card = styled.div`
    padding: 20px 18px;
    border-radius: 14px;
    border: 1px solid #1A1A1A;
`
export const InputBox = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 14px;
    border-radius: 14px;
    background-color: #333;
    border: 1px solid #1A1A1A;
`

export const LeverageBox = styled.div`
    padding: 6px 16px;
    border: 1px solid #0ABAB5;
    background-color: rgba(10, 186, 181, 0.15);
    font-size: 18px;
    font-weight: 800;
    border-radius: 12px;
    color: #fff;
    min-width: 30px;
    text-align: center;
`

export const ExchangeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #0ABAB5;
    border-radius: 50%;
`

export const TradeLayout = styled.div`
    display: flex;
    gap: 20px;
`
export const PostionBox = styled.div`
    padding: 20px 18px;
    border-radius: 14px;
    border: 1px solid #1A1A1A;
`

export const Flex = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 14px;
`
