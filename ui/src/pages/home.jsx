import React from 'react';
import { Whisper } from '../assets/svg/Whisper'

import './home.css';

const Home = () => {
  return (
    <div className="container">  
      <div className='navigation'>
        <div className='whisper'>
          <Whisper />
        </div>
        <div className='navbarGroup'>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0593 6.66846C13.3695 6.66846 14.6261 7.18926 15.5526 8.1163C16.479 9.04333 16.9995 10.3007 16.9995 11.6117C17.0027 12.5847 16.7152 13.5365 16.1742 14.345L16.9995 16.5549L14.2214 16.0548C13.5532 16.3808 12.8202 16.5518 12.0769 16.5549C11.3335 16.558 10.5991 16.3932 9.92819 16.0729C9.25733 15.7526 8.66736 15.2848 8.20226 14.7046C7.73715 14.1245 7.40888 13.4467 7.24194 12.7219C7.07499 11.9971 7.07364 11.244 7.23802 10.5186C7.4024 9.79323 7.72825 9.11432 8.19128 8.53246C8.65432 7.9506 9.24262 7.48081 9.91234 7.15807C10.5821 6.83533 11.3159 6.66797 12.0593 6.66846Z" fill="#2D1313" stroke="#2D1313" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.5557 3.73384C11.7243 2.75375 10.5837 2.03821 9.29271 1.68685C8.00172 1.3355 6.6246 1.3658 5.35308 1.77355C4.08156 2.1813 2.97893 2.9462 2.19869 3.96176C1.41846 4.9773 0.999458 6.19298 1.00003 7.4395C0.996203 8.62439 1.37452 9.78335 2.08646 10.7677L1.00003 13.444L3.61733 13.0094" stroke="#2D1313" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

          Groups
        </div>
      </div>
      <div className='content'>
          <div className='contentTitle'>
            Whisper your secrets securely
          </div>
          <div className='contentText'>
            The secure chat app for privacy and trust, knowing your secrets are always protected.
          </div>
          <div className='contentButton'>
              + Create a group
          </div>
      </div>
    </div>
  )
};

export default Home;
