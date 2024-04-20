import './Header.css';
// @ts-ignore
import arrow from '../../imgs/icons/arrows_right1.png';
// @ts-ignore
import logo from '../../imgs/img/logo.png';

interface HeaderProps {
  showWinnersBlock: () => void;
  showGarageBlock: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  showWinnersBlock,
  showGarageBlock,
}) => {
  return (
    <header className='header'>
      <div className='header_container'>
        <div className='header_buttons'>
          <button onClick={showGarageBlock} className='header_btn garage'>
            Garage
          </button>
          <button onClick={showWinnersBlock} className='header_btn winners'>
            Winners
          </button>
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
