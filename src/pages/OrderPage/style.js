import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
    background-color: #2a2a2a;
    padding: 16px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    span {
        color: #ffffff;
        font-size: 14px;
        font-weight: 500;
    }
`

export const WrapperLeft = styled.div`
    width: 75%;
    background-color: #2a2a2a;
    border-radius: 8px;
    padding: 20px;
`

export const WrapperListOrder = styled.div`
    margin-top: 16px;
`

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #333333;
    margin-bottom: 12px;
    border-radius: 8px;
    border: 1px solid #444444;
    
    &:hover {
        background-color: #3a3a3a;
    }
`

export const WrapperPriceDiscount = styled.span`
    color: #888888;
    font-size: 12px;
    text-decoration: line-through;
    margin-left: 8px;
`

export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    width: 100px;
    border-radius: 6px;
    border: 1px solid #555555;
    background-color: #444444;
    margin: 0 16px;
    
    button {
        background-color: transparent !important;
        border: none !important;
        color: #D29B63 !important;
        
        &:hover {
            color: #ffffff !important;
            background-color: #D29B63 !important;
        }
    }
`

export const WrapperRight = styled.div`
    width: 23%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const WrapperInfo = styled.div`
    padding: 20px;
    background-color: #2a2a2a;
    border-radius: 8px;
    width: 100%;
    
    div {
        margin-bottom: 12px;
        
        &:last-child {
            margin-bottom: 0;
        }
        
        span {
            color: #ffffff;
            
            &:last-child {
                color: #D29B63;
                font-weight: 600;
            }
        }
    }
`

export const WrapperTotal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #2a2a2a;
    border-radius: 8px;
    border: 2px solid #D29B63;
    
    > span:first-child {
        color: #ffffff;
        font-size: 16px;
        font-weight: 600;
    }
    
    > span:last-child {
        span:first-child {
            color: #D29B63;
            font-size: 24px;
            font-weight: bold;
        }
        
        span:last-child {
            color: #cccccc;
            font-size: 12px;
        }
    }
`