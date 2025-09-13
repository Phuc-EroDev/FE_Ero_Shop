import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    &:focus {
        background-color: #e8f0fe;
    }
    
    @media (max-width: 768px) {
        padding: 6px 10px;
        font-size: 14px;
    }
`   