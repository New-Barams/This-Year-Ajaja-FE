import { KAKAO_LOGIN_URL, UN_AUTH_URL } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import './index.scss';
import characters from '/public/loginPage/characters.png';
import kakoLogin from '/public/loginPage/kakao_login_large_wide.png';

export default function LoginPage() {
  return (
    <div className="wrapper">
      <div className="login">
        <div className="login__welcome-text">
          <h1>혹시 신년 계획 세우셨나요?</h1>
          <h1>
            아직이라면,{' '}
            <Image
              className="login__welcome-text--logo"
              src="/this-year-ajaja-logo.svg"
              width={175}
              height={32}
              alt="올해도 아자자"
            />
          </h1>
        </div>
        <div className="login__poster">
          <Image
            priority
            className="login__poster--image"
            src={characters}
            alt="올해도 아좌좌 캐릭터들"
          />
          <p className="login__poster--text">
            나만의 신년 계획을 만들어
            <br />
            리마인드를 받고, 피드백하고, 다른 사람을 응원해 보세요!
          </p>
        </div>
        <div className="login__buttons">
          <Link
            className="login__buttons--kakaoLogin"
            href={KAKAO_LOGIN_URL}
            replace>
            <Image
              className="login__buttons--image"
              src={kakoLogin}
              alt="kakaoLogin"
            />
            <div className="login__buttons--kakaoLogin--alt">
              <span>카카오 로그인</span>
              <span>버튼이 안보이시면 광고차단을 꺼주세요</span>
            </div>
          </Link>
          <Link
            className="login__buttons--unAuth color-origin-gray-200"
            href={UN_AUTH_URL}>
            로그인 하지 않고 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
