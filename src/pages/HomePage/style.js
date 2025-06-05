import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    color: #D29B63;
    border: 1px solid #D29B63;
    width: 240px;
    height: 38px;
    margin-bottom: 20px;
    font-weight: 500;
    text-align: center;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}; 
       
    &:hover:not(:disabled) {
        background-color: #D29B63;
        span {
            color: #fff;
        }
    }
    
    &:disabled {
        color: #7a7676;
        border: 1px solid #7a7676;
    }
`

export const WrapperProducts = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 20px;
    flex-wrap: wrap;
`