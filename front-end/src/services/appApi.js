import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create the api

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    // signup
    signup: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),

    // login
    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    // creating product
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        body: product,
        method: "POST",
      }),
    }),

    // delete product
    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `/products/${product_id}`,
        body: {
          user_id,
        },
        method: "DELETE",
      }),
    }),

    // update product
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        body: product,
        method: "PATCH",
      }),
    }),

    // add to cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/products/add-to-cart",
        body: cartInfo,
        method: "POST",
      }),
    }),
    // remove from cart
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: "/products/remove-from-cart",
        body,
        method: "POST",
      }),
    }),

    // create order
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
    }),

    // cancel order
    cancelOrder: builder.mutation({
      query: ({ orderId, userId, products }) => ({
        url: `/orders/${orderId}`,
        body: {
          userId,
          products,
        },
        method: "DELETE",
      }),
    }),

    // edit order
    editOrder: builder.mutation({
      query: ({ orderId, returnDate, takeBookDate }) => ({
        url: `/orders/${orderId}/edit`,
        body: {
          returnDate,
          takeBookDate,
        },
        method: "PATCH",
      }),
      params: {
        orderId: "string",
      },
    }),

    // edit order
    deleteUser: builder.mutation({
      query: ({ userId, admin }) => ({
        url: `/users/${userId}/delete-user`,
        body: {
          admin,
        },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCancelOrderMutation,
  useEditOrderMutation,
  useDeleteUserMutation,
} = appApi;

export default appApi;
