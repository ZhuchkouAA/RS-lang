import deleteCookie from './deleteCookie';
import { token, userId } from '../../constants/cookiesNames';

const clearAllCookie = () => {
  deleteCookie(token);
  deleteCookie(userId);
};

export default clearAllCookie;
