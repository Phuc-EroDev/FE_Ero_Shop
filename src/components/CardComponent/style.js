import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
      width: 200px;
      height: 200px;
    },
    position: relative;

    .ant-card-body {
        padding: 10px;
        background-color: #dfdedd;
    }
`

export const StyleNameProduct = styled.div`
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #171414;
`

export const WrapperReportText = styled.div`
    font-size: 10px;
    color: #171414;
    display: flex;
    align-items: center;
    margin-top: 6px;
`

export const WrapperPriceText = styled.div`
    color: #e53030;
    font-size: 16px;
    font-weight: 500;
`

export const WrapperDiscountText = styled.span`
    color: #f54141;
    font-size: 12px;
    font-weight: 500;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: #959392;
`