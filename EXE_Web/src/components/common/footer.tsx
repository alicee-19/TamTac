import logo from '@/assets/full-logo-white.svg';

import { Mail, MapPin, Phone } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

// import './Footer.css';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-primary to-[#F17732] text-white'>
      <div className='container mx-auto p-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Logo and Tagline */}
          <div className='flex flex-col items-start'>
            <div className='flex items-center space-x-3 mb-4'>
              <img src={logo} alt='Tấm Tắc Logo' className='relative p-2' />
            </div>
            <div className='mt-6 flex mx-auto space-x-4'>
              <Link to='#' className='hover:opacity-80 transition-opacity'>
                <div className='bg-white/20 rounded-full p-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
                  </svg>
                </div>
              </Link>
              <Link to='#' className='hover:opacity-80 transition-opacity'>
                <div className='bg-white/20 rounded-full p-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                    <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className='text-xl font-semibold mb-4 pb-2 border-b border-white/20'>Thông tin</h3>
            <ul className='space-y-3'>
              <li>
                <Link to='/about' className='hover:underline transition-all inline-block'>
                  Về Tấm Tắc
                </Link>
              </li>
              <li>
                <Link to='/story' className='hover:underline transition-all inline-block'>
                  Chuyện Cơm Tấm
                </Link>
              </li>
              <li>
                <Link to='/news' className='hover:underline transition-all inline-block'>
                  Tin tức & Khuyến mãi
                </Link>
              </li>
              <li>
                <Link to='/career' className='hover:underline transition-all inline-block'>
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className='text-xl font-semibold mb-4 pb-2 border-b border-white/20'>Dịch vụ</h3>
            <ul className='space-y-3'>
              <li>
                <Link to='/order' className='hover:underline transition-all inline-block'>
                  Đặt hàng
                </Link>
              </li>
              <li>
                <Link to='/franchise' className='hover:underline transition-all inline-block'>
                  Nhượng quyền
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className='text-xl font-semibold mb-4 pb-2 border-b border-white/20'>Liên hệ</h3>
            <ul className='space-y-4'>
              <li className='flex items-start'>
                <MapPin className='mr-3 h-5 w-5 mt-0.5 flex-shrink-0' />
                <span>Lô E2a-7, Đường D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh</span>
              </li>
              <li className='flex items-center'>
                <Phone className='mr-3 h-5 w-5 flex-shrink-0' />
                <a href='tel:0902123456' className='hover:underline transition-all'>
                  0902-123-456
                </a>
              </li>
              <li className='flex items-center'>
                <Mail className='mr-3 h-5 w-5 flex-shrink-0' />
                <a href='mailto:cskh@tamtac.com' className='hover:underline transition-all'>
                  cskh@tamtac.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-white/80 text-sm mb-4 md:mb-0'>Copyright © 2025 Tấm Tắc. Tất cả quyền được bảo lưu.</p>
          <div className='flex space-x-6'>
            <Link to='/privacy' className='text-white/80 text-sm hover:text-white transition-colors'>
              Chính sách bảo mật
            </Link>
            <Link to='/terms' className='text-white/80 text-sm hover:text-white transition-colors'>
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
