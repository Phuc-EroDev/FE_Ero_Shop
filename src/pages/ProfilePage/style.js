import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #FDF6EC;
    font-size: 18px;
    padding: 4px 0;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #fff;
    width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    gap: 20px;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

export const WrapperLabel = styled.label`
    color: #FDF6EC;
    font-size: 12px;
    line-height: 30px;
    width: 60px;
    text-align: left;
    font-weight: 600;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list.ant-upload-list-text {
        display: none;
    }
`