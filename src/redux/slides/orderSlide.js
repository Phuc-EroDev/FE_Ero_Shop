import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
};

export const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action?.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem?.product);
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },
    increaseAmountOrderProduct: (state, action) => {
      const idProduct = action?.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
      if (itemOrder) {
        itemOrder.amount += 1;
      }
    },
    decreaseAmountOrderProduct: (state, action) => {
      const idProduct = action?.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
      if (itemOrder) {
        itemOrder.amount -= 1;
      }
    },
    removeOrderProduct: (state, action) => {
      const idProduct = action?.payload;
      const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
      state.orderItems = itemOrder;
    },
    removeMultiOrderProduct: (state, action) => {
      const listIdProduct = action?.payload;
      const itemOrders = state?.orderItems?.filter((item) => !listIdProduct?.includes(item?.product));
      state.orderItems = itemOrders;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addOrderProduct,
  increaseAmountOrderProduct,
  decreaseAmountOrderProduct,
  removeOrderProduct,
  removeMultiOrderProduct,
} = orderReducer.actions;

export default orderReducer.reducer;
