import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const placeApi = createApi({
  reducerPath: "placeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Reviews"],
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
    uploadPlaceImages: builder.mutation({
      query({ body, id }) {
        return {
          url: `/admin/places/${id}/upload_images`,
          method: "PUT",
          body,
        };
      },
    }),
    deletePlaceImage: builder.mutation({
      query({ body, id }) {
        return {
          url: `/admin/places/${id}/delete_image`,
          method: "PUT",
          body,
        };
      },
    }),
    deletePlace: builder.mutation({
      query(id) {
        return {
          url: `/admin/places/${id}`,
          method: "DELETE",
        };
      },
    }),
    getPlaceReviews: builder.query({
      query(id) {
        return {
          url: `admin/places/reviews?placeId=${id}`,
        };
      },
      providesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query({ id, placeId }) {
        return {
          url: `/admin/places/reviews/?id=${id}&placeId=${placeId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useCanUserReviewQuery,
  useNewPlaceMutation,
  useUpdatePlaceMutation,
  useUploadPlaceImagesMutation,
  useDeletePlaceImageMutation,
  useDeletePlaceMutation,
  useLazyGetPlaceReviewsQuery,
  useDeleteReviewMutation
} = placeApi;
