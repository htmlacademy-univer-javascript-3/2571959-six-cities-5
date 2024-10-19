import cn from 'classnames';
import { User } from '../../types/user';

type UserAvatarProps = {
  user: User;
  type: string;
  alt: string;
  size: number;
  wrapperClassName: string;
  imageClassName: string;
  userNameClassName: string;
  statusClassName: string;
  className?: string;
};

export function UserAvatar({
  user,
  type,
  alt,
  className,
  size,
  wrapperClassName,
  imageClassName,
  userNameClassName,
  statusClassName,
}: UserAvatarProps) {
  return (
    <div className={cn(className, 'user')}>
      <div
        className={cn(wrapperClassName, 'user__avatar-wrapper', {
          'offer__avatar-wrapper--pro': type === 'offer' && user.isPro,
        })}
      >
        <img
          className={cn(imageClassName, 'user__avatar')}
          src={user.avatarUrl}
          width={size}
          height={size}
          alt={alt}
        />
      </div>
      <span className={userNameClassName}>{user.name}</span>
      {type === 'offer' && user.isPro && (
        <span className={statusClassName}>Pro</span>
      )}
    </div>
  );
}

export const OfferUserAvatar = (
  props: Pick<UserAvatarProps, 'user' | 'alt' | 'className'>
) => (
  <UserAvatar
    {...props}
    size={74}
    type="offer"
    wrapperClassName="offer__avatar-wrapper"
    imageClassName="offer__avatar"
    userNameClassName="offer__user-name"
    statusClassName="offer__user-status"
    className="offer__host-user"
  />
);

export const ReviewUserAvatar = (
  props: Pick<UserAvatarProps, 'user' | 'alt' | 'className'>
) => (
  <UserAvatar
    {...props}
    type="reviews"
    size={54}
    wrapperClassName="reviews__avatar-wrapper"
    imageClassName="reviews__avatar"
    userNameClassName="reviews__user-name"
    statusClassName="reviews__user-status"
    className="reviews__user"
  />
);
