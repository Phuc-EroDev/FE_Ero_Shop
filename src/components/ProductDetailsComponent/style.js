import { Col, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled.div`
    width: 64px;
    height: 64px;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const WrapperStyleNameProduct = styled.h1`
    coler: #FDF6EC;
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    world-break: break-word;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: #959392;
`

export const WrapperPriceProduct = styled.div`
    background-color: #3b3a38;
    border-radius: 4px;
`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin: 10px 8px 0 0;
    padding: 10px;
    font-weight: 500;
`

export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    };
    span.change-address {
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        color: #d79334;
    }
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    align-items: center;
`

export const WrapperInputNumber = styled(InputNumber)`
    width: 40px;
    height: 24px;
    .ant-input-number-handler-wrap {
        display: none;
    };
    .ant-input-number-input {
        text-align: center;
    }
`