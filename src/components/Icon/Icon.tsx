import { Color, FontSize, IconName } from '@/types';
import classNames from 'classnames';
import './index.scss';

const ICON_NAME_MAP = {
  PLUS: 'add',
  CREATE_NEW_PLAN: 'stylus',
  FEEDBACK: 'edit_note',
  OTHER_PLAN: 'explore',
  HOME: 'home',
  PROFILE: 'account_circle',
  LOGIN: 'login',
  NOTIFICATION_ON: 'notifications',
  NOTIFICATION_OFF: 'notifications_off',
  PLAN_OPEN: 'lock_open',
  PLAN_CLOSE: 'lock',
  ITEM_OPEN: 'expand_more',
  ITEM_CLOSE: 'expand_less',
  ERROR: 'error',
  WARNING: 'warning',
  AJAJA: 'local_fire_department',
  REFRESH: 'refresh',
  HELP: 'help',
  DROP_DOWN: 'arrow_drop_down',
  DROP_UP: 'arrow_drop_up',
  CLOSE: 'close',
  CHECKED: 'check_box',
  UN_CHECKED: 'check_box_outline_blank',
  FLUTTER_DASH: 'flutter_dash',
  RAVEN: 'raven',
  POTTED_PLANT: 'potted_plant',
  FLIGHT: 'flight',
  GLOBE: 'globe',
  SOCIAL_LEADERBOARD: 'social_leaderboard',
  STRATEGY: 'strategy',
  TROPHY: 'trophy',
  STAR: 'star',
  FAVORITE: 'favorite',
  ARROW_UP: 'arrow_upward',
  COPY: 'content_copy',
  ARROW_RIGHT: 'subdirectory_arrow_right',
  CANCEL: 'cancel',
  SEARCH: 'search',
  SHARE: 'share',
};

interface IconProps {
  name: IconName;
  size?: FontSize;
  color?: Color;
  isFilled?: boolean;
  classNameList?: string[];
}

export default function Icon({
  name,
  size = '2xl',
  color = 'orange-300',
  isFilled = false,
  classNameList = [],
}: IconProps) {
  return (
    <span
      className={classNames(
        'icon',
        'material-symbols-rounded',
        `font-size-${size}`,
        `color-origin-${color}`,
        { 'icon--isFilled': isFilled },
        classNameList,
      )}>
      {ICON_NAME_MAP[name]}
    </span>
  );
}
