import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const placeApi = createApi({
  reducerPath: "placeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    canUserReview: builder.query({
      query(id) {
        return {
          url: `/reviews/can_review?placeId=${id}`,
        };
      },
    }),
    postReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews ",
          method: "PUT",
          body,
        };
      },
    }),
    newPlace: builder.mutation({
      query(body) {
        return {
          url: "/admin/places",
          method: "POST",
          body,
        };
      },
    }),
    updatePlace: builder.mutation({
      query({ body, id }) {
        return {
          url: `/admin/places/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  usePostReviewMutation,
  useCanUserReviewQuery,
  useNewPlaceMutation,
  useUpdatePlaceMutation,
} = placeApi;
