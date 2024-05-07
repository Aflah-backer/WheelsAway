import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full absolute z-10 sticky top-0">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link to={'/'}>
          <div className='flex items-center gap-3'> 
          <img width={50} src="/wheelsAway.png" alt="bmw-logo" /> <span className='text-black'>WheelsAway</span>
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
