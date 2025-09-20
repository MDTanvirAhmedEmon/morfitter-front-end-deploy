import { baseApi } from "@/redux/api/baseApi";

const TermsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTerms: builder.query({
      query: () => ({
        url: `/policy-term/terms`,
        method: "GET",
      }),
      providesTags: ["terms"],
    }),

    addTerms: builder.mutation({
      query: (data) => ({
        url: `/policy-term/create-terms`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),

    updateTerms: builder.mutation({
      query: ({ id, data }) => ({
        url: `/policy-term/terms/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),

    getHelpCenter: builder.query({
      query: (params) => ({
        url: `/policy-term/help-center`,
        method: "GET",
        params
      }),
    }),

    getSubscription: builder.query({
      query: (params) => ({
        url: `/policy-term/subscription`,
        method: "GET",
        params
      }),
    }),
  }),
});

export const { useGetTermsQuery, useAddTermsMutation, useUpdateTermsMutation, useGetHelpCenterQuery, useGetSubscriptionQuery } = TermsApi;

export default TermsApi;
