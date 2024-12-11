import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import type { ReviewsResponse, ReviewDetailDataResponse } from '../../types/reviews';
import { getReviews, getMyReviews, getDetailReview } from '../../apis/review/getReviews';

export const useReviewsQuery = () => {
  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<ReviewsResponse, Error>({
    queryKey: ['reviews'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getReviews(pageParam);

      // 응답 데이터 검증
      if (!response || !response.data || !response.data.reviews) {
        throw new Error('Invalid API response structure');
      }

      return response;
    },
    getNextPageParam: (lastPage) => {
      // 안전한 데이터 접근
      const reviews = lastPage?.data?.reviews;
      if (!reviews) return undefined;
      return reviews.last ? undefined : reviews.number + 1;
    },
    initialPageParam: 0,
  });

  // 모든 페이지 데이터를 평탄화
  const reviewsData =
    data?.pages.flatMap((page) => page?.data?.reviews?.content || []) || [];

  return { reviewsData, isFetching, hasNextPage, fetchNextPage };
};

export const useMyReviewsQuery = () => {
  const { data: reviewsData } = useQuery<ReviewsResponse>({
    queryKey: ['myReviews'],
    queryFn: getMyReviews
  });
  
  return { reviewsData };
};

export const useReviewDetailQuery = (movieId: string, reviewId: string) => {
  const { data: reviewData } = useQuery<ReviewDetailDataResponse>({
    queryKey: ['movies', movieId, 'reviews', reviewId],
    queryFn: () => getDetailReview(movieId, reviewId)
  });
  
  return { reviewData };
};