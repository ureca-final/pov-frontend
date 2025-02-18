export const SIGN_UP_HEADER_TEXTS = {
  nickname: {
    title: { firstLine: ['닉네임', '을'], secondLine: '입력해주세요' },
    description: '어떤 이름으로 불리고 싶으신가요?',
  },
  birth: {
    title: { firstLine: ['생년월일', '을'], secondLine: '입력해주세요' },
    description: '연령대에 맞는 영화 추천을 위해 사용돼요.',
  },
  favorGenre: {
    title: { firstLine: ['관심있는 장르', '를'], secondLine: '선택해주세요' },
    description: '최소 1개 이상의 장르를 선택해주세요.',
  },
  complete: {
    title: { firstLine: ['회원가입', '이'], secondLine: '완료됐어요' },
    description: '환영해요!',
  },
} as const;
