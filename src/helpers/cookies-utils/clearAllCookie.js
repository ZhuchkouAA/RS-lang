import deleteCookie from './deleteCookie';
import { TOKEN, USERID } from '../../constants/cookiesNames';

const clearAllCookie = () => {
  deleteCookie(TOKEN);
  deleteCookie(USERID);
};

export default clearAllCookie;
