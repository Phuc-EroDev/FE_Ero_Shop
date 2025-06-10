import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  orderItemsSelected: [],
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
      const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct);
      if (itemOrder) {
        itemOrder.amount += 1;
      }
      if (itemOrderSelected) {
        itemOrderSelected.amount += 1;
      }
    },
    decreaseAmountOrderProduct: (state, action) => {
      const idProduct = action?.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
      const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct);
      if (itemOrder) {
        itemOrder.amount -= 1;
      }
      if (itemOrderSelected) {
        itemOrderSelected.amount -= 1;
      }
    },
    removeOrderProduct: (state, action) => {
      const idProduct = action?.payload;
      const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
      const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct);
      state.orderItems = itemOrder;
      state.orderItemsSelected = itemOrderSelected;
    },
    removeMultiOrderProduct: (state, action) => {
      const listChecked = action?.payload;
      const itemOrders = state?.orderItems?.filter((item) => !listChecked?.includes(item?.product));
      const itemOrdersSelected = state?.orderItemsSelected?.filter((item) => !listChecked?.includes(item?.product));
      state.orderItems = itemOrders;
      state.orderItemsSelected = itemOrdersSelected;
    },
    selectedOrder: (state, action) => {
      const listChecked = action?.payload;
      const orderSelected = [];
      state.orderItems.forEach((orderItem) => {
        if (listChecked?.includes(orderItem?.product)) {
          orderSelected.push(orderItem);
        }
      });
      state.orderItemsSelected = orderSelected;
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
  selectedOrder,
} = orderReducer.actions;

export default orderReducer.reducer;
