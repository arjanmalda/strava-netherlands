import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/tokens';
import Cookies from 'js-cookie';

export const deleteTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};
