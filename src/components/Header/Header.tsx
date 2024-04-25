import { Link } from 'react-router-dom';

import './Header.css';
// @ts-ignore
import arrow from '../../pics/icons/arrows_right1.png';
// @ts-ignore
import logo from '../../pics/img/logo.png';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header_container'>
        <div className='header_buttons'>
          <Link className='header_btn garage' to='/'>
            Garage
          </Link>
          <Link className='header_btn winners' to='/winners'>
            Winners
          </Link>
        </div>
        <div className='header_logo_container'>
          <div className='arrow_wrapper'>
            <img className='arrow_img' src={arrow} alt='arrows' />
          </div>
          <div className='logo'>
            <img src={logo} alt='go race logo' />
          </div>
          <div className='arrow_wrapper'>
            <img className='arrow_img' src={arrow} alt='arrows' />
          </div>
        </div>
      </div>
    </header>
  );
};
