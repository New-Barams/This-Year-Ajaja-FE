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
        className={classNames('footprint-item')}>
        <div className={classNames('footprint-item__title')}>
          {iconNumber + title}
        </div>
        <div className={classNames('footprint-item__createAt')}>
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
