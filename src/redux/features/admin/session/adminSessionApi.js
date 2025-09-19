import { baseApi } from "@/redux/api/baseApi";

const adminSessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSessionForAdmin: builder.query({
      query: (params) => ({
        url: `/session/admin`,
        method: "GET",
        params
      }),
      providesTags: ['session']
    }),

    blockUnblockSession: builder.mutation({
      query: (id) => ({
        url: `/session/block-unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["session"],
    }),

    createUpdateSocial: builder.mutation({
      query: (data) => ({
        url: `/policy-term/social`,
        method: "PATCH",
        body: data
      }),
    }),

    getSocialLinks: builder.query({
      query: () => ({
        url: `/policy-term/social`,
        method: "GET",
      }),
    }),

  }),
});

export const { useGetAllSessionForAdminQuery, useBlockUnblockSessionMutation, useCreateUpdateSocialMutation, useGetSocialLinksQuery } = adminSessionApi;

export default adminSessionApi;
