import deleteCookie from './deleteCookie';
import { TOKEN, USER_ID } from '../../constants/cookiesNames';

const clearAllCookie = () => {
  deleteCookie(TOKEN);
  deleteCookie(USER_ID);
};

export default clearAllCookie;
