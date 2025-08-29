import { message } from 'antd';

const success = (mes = 'Success') => {
  console.log('mes: ', mes);
  message.success(mes);
};

const error = (mes = 'Error') => {
  console.log('mes: ', mes);
  message.error(mes);
};

const warning = (mes = 'Warning') => {
  message.warning(mes);
};

export { success, error, warning };

// import { message } from 'antd';

// const [messageApi, contextHolder] = message.useMessage();

// // console.log(contextHolder);

// const success = (mes = 'Success') => {
//   messageApi.open({
//     type: 'success',
//     content: mes,
//   });
// };

// const error = (mes = 'Error') => {
//   messageApi.open({
//     type: 'error',
//     content: mes,
//   });
// };

// const warning = (mes = 'Warning') => {
//   messageApi.open({
//     type: 'warning',
//     content: mes,
//   });
// };

// export { success, error, warning, contextHolder };
