import { message } from 'antd';
import React, { createContext, useContext } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (mes = 'Success') => {
        messageApi.open({
            type: 'success',
            content: mes,
        });
    };

    const error = (mes = 'Error') => {
        messageApi.open({
            type: 'error',
            content: mes,
        });
    };

    const warning = (mes = 'Warning') => {
        messageApi.open({
            type: 'warning',
            content: mes,
        });
    };

    return (
        <MessageContext.Provider value={{ success, error, warning }}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};