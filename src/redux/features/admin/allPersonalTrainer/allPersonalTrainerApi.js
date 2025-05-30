"use client";
import { baseApi } from "@/redux/api/baseApi";

const allPersonalTrainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getallPersonalTrainer: builder.query({
      query: (params) => ({
        url: "/trainer/dashboard",
        method: "GET",
        params,
      }),
      providesTags: ["user-management"],
    }),
  }),
});

export const { useGetallPersonalTrainerQuery } = allPersonalTrainerApi;

export default allPersonalTrainerApi;
