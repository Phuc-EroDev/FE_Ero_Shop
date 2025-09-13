import { Upload } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    margin: -8px auto;
    padding-bottom: 16px;
    background-color: #181818;
`

export const WrapperHeader = styled.h1`
    color: #FDF6EC;
    font-size: 24px;
    padding: 20px 0 10px;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    margin-bottom: 20px;
    
    &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 140px;
        height: 2px;
        background-color: #C68642;
    }
    
    @media (max-width: 768px) {
        font-size: 20px;
        margin-bottom: 10px;
    }
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 420px;
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    gap: 20px;
    background-color: rgba(40, 40, 40, 0.9);
    border: 1px solid rgba(198, 134, 66, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 480px) {
        width: 95%;
        padding: 15px;
    }
`

export const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 16px;
    position: relative;
    
    &:not(:last-child):after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: rgba(100, 100, 100, 0.3);
    }
`

export const WrapperLabel = styled.label`
    color: #FDF6EC;
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 500;
`

export const InputStyle = {
    width: '100%',
    borderRadius: '4px',
    backgroundColor: '#222',
    color: '#FDF6EC',
    border: '1px solid rgba(198, 134, 66, 0.3)',
    height: '36px',
    fontSize: '14px'
}

export const WrapperUploadFile = styled(Upload)`
    .ant-btn {
        background-color: rgba(198, 134, 66, 0.5);
        border: 1px solid #C68642;
        color: #FDF6EC;
        border-radius: 4px;
        height: 32px;
    }
    
    & .ant-upload-list.ant-upload-list-text {
        display: none;
    }
`

export const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 5px;
`

export const AvatarPreview = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #C68642;
`

export const UpdateButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 15px;
    
    button {
        background-color: #C68642;
        border-radius: 4px;
        color: #FDF6EC;
        font-weight: 600;
        border: none;
        height: 36px;
        padding: 0 16px;
    }
    }
    
    button {
        @media (max-width: 480px) {
            width: 100% !important;
            font-size: 14px !important;
        }
    }
`