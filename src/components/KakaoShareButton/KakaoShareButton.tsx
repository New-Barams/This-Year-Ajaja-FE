'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import './index.scss';

interface KakaoShareButtonProps {
  linkURL: string;
}
export default function KakaoShareButton({ linkURL }: KakaoShareButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const kakao = (window as any).Kakao;

  useEffect(() => {
    kakao?.cleanup();
    kakao?.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    return () => {
      kakao?.cleanup();
    };
  }, [kakao]);

  const handleShareWithKakao = () => {
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '올해도 아좌좌',
        description: '올해의 계획을 세우고 서로 응원해요 ',
        //TODO: 이미지 url변경 필요 ;
        imageUrl:
          'http://drive.google.com/uc?export=view&id=1xFVHZYN9kF9mIX8D2LdEN8tQcKUfx3uC',
        imageWidth: 800,
        imageHeight: 300,
        link: {
          mobileWebUrl: linkURL,
          webUrl: linkURL,
        },
      },
      buttons: [
        {
          title: '친구 계획 응원하러 가기',
          link: {
            mobileWebUrl: linkURL,
            webUrl: linkURL,
          },
        },
      ],
    });
  };

  return (
    <>
      <button className="kakao-share-button" onClick={handleShareWithKakao}>
        <Image
          priority
          className="kakao__image"
          src="/kakaoShare.png"
          alt="카카오톡 공유하기 버튼"
          width={20}
          height={20}></Image>
      </button>
    </>
  );
}
