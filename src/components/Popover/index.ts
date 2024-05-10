import dynamic from 'next/dynamic';
import { Main, Trigger } from './Popover';

const Content = dynamic(
  () => import('./Popover').then((mod) => mod.ModalContent),
  { ssr: false },
);
export const Popover = { Main, Trigger, Content };
