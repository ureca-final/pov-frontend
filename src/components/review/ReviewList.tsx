import { useRef, useEffect } from 'react';
import { ReviewListContainer } from './ReviewCard.style';
import { useReviewsQuery } from '../../hooks/queries/useReviewsQuery';
// import ReviewPageSkeleton from '../../pages/Review/ReviewPageSkeleton';

import ReviewCard, { ReviewCardLoading, ReviewCardEmpty } from './ReviewCard';

function ReviewList() {
  const { reviewsData, fetchNextPage, hasNextPage, isFetching } = useReviewsQuery();
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetching]);

  if (isFetching && reviewsData.length === 0) {
    return <ReviewCardLoading />;
  }

  if (!isFetching && reviewsData.length === 0) {
    return <ReviewCardEmpty />;
  }

  return (
    <>
      <ReviewListContainer>
        {reviewsData.map((review) => (
          <ReviewCard key={review.reviewId} {...review} />
        ))}
      </ReviewListContainer>

      {isFetching && <ReviewCardLoading />}
      <div ref={observerRef} />
    </>
  );
}

export default ReviewList;
