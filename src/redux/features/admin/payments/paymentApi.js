import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: (params) => ({
        url: "/access/get-all-payments",
        method: "GET",
        params,
      }),
      providesTags: ["payments"],
    }),

    updatePaymentStatus: builder.mutation({
      query: (data) => ({
        url: `/access/update-payment-status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["payments"],
    }),
  }),
});


export const { useGetAllPaymentsQuery, useUpdatePaymentStatusMutation } = paymentApi;
export default paymentApi;
