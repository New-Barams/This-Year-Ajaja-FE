import { AjajaButton, Tag } from '@/components';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import './index.scss';

interface FootprintItemProps {
  id: number;
  iconNumber: number;
  title: string;
  createdAt: string;
  ajajas: number;
  tags: string[];
}

type FootPrintIconMapType = {
  [key: number]: string;
};

const FOOTPRINT_ICON_MAP: FootPrintIconMapType = {
  0: '🤗',
  1: '🗽',
};

export default function FootprintItem({
  id,
  iconNumber,
  title,
  createdAt,
  ajajas,
  tags,
}: FootprintItemProps) {
  return (
    <li key={id}>
      <Link
        href={`/발자취단건조회/${id}`}
        className={classNames(
          'footprint-item',
          'border-origin-secondary',
          'border-round',
        )}>
        <div className={classNames('footprint-item__title', 'font-size-md')}>
          {FOOTPRINT_ICON_MAP[iconNumber] + title}
        </div>
        <div
          className={classNames(
            'footprint-item__createdAt',
            'font-size-xs',
            'color-origin-text-300',
          )}>
          {`${createdAt} 작성`}
        </div>
        <AjajaButton ajajaCount={ajajas} isFilled={true} disabled />
        <div className={classNames('footprint-item__tags')}>
          {tags.map((tagString, idx) => {
            return <Tag key={idx}>{tagString}</Tag>;
          })}
        </div>
      </Link>
    </li>
  );
}
