import { postLogin } from '@/apis/client/postLogin';
import { COOKIE_MAX_AGE } from '@/constants/cookie';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function useOauthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const way = searchParams.get('way');
  const code = searchParams.get('code');

  useEffect(() => {
    if (way === 'login' && code) {
      (async () => {
        try {
          const { data: tokens } = await postLogin(code);
          setCookie('auth', tokens, { maxAge: COOKIE_MAX_AGE });
          const previousPage = window.sessionStorage.getItem('prev');
          previousPage ? router.replace(previousPage) : router.replace('/home');
        } catch (error) {
          alert('로그인에 실패했습니다. 잠시 후 시도해주세요');
          router.replace('/login');
        } finally {
          window.sessionStorage.removeItem('prev');
        }
      })();
    } else if (way === 'logout') {
      deleteCookie('auth');
      router.replace('/login');
    } else {
      router.replace('/');
    }
  }, [router, code, way]);

  return { way };
}
