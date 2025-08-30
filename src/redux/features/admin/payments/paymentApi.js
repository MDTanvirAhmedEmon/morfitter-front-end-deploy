import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: (params) => ({
        url: "/access/get-all-payments",
        method: "GET",
        params,
      }),
    }),
  }),
});


export const { useGetAllPaymentsQuery } = paymentApi;
export default paymentApi;
