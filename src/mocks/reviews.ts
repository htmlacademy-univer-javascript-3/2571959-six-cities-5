import { Review } from '../types/review';

export const reviews: Record<string, Review[]> = {
  'a5ab242e-4326-450f-ad1e-4dded7d2526e': [
    {
      id: 'faf794bc-73e2-4119-8c8a-1172134d26a8',
      comment:
        'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
      date: '2024-09-26T21:00:01.385Z',
      rating: 1,
      user: {
        name: 'Christina',
        avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/7.jpg',
        isPro: true,
      },
    },
    {
      id: 'ae3ddf2c-c58a-4d52-9260-03f4e3846dae',
      comment:
        'This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.',
      date: '2024-09-24T21:00:01.385Z',
      rating: 1,
      user: {
        name: 'Isaac',
        avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/9.jpg',
        isPro: false,
      },
    },
  ],
  'c96df6b2-a398-4fb9-bd99-97c92fe145b2': [
    {
      id: '7aeaa70c-fd5c-4fd9-952a-35cf527b7d93',
      comment:
        'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
      date: '2024-09-25T21:00:01.385Z',
      rating: 1,
      user: {
        name: 'Isaac',
        avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/5.jpg',
        isPro: false,
      },
    },
  ],
};
