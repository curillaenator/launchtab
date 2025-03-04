import React from 'react';

const TableColorFill = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        borderBottom: `solid 5px ${color}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '32px',
      }}
    >
      <svg width='33' height='32' viewBox='0 0 33 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M23.2624 19.1354C23.2482 19.118 23.2303 19.104 23.21 19.0944C23.1897 19.0848 23.1676 19.0798 23.1451 19.0798C23.1227 19.0798 23.1005 19.0848 23.0803 19.0944C23.06 19.104 23.0421 19.118 23.0279 19.1354C22.6243 19.612 21.2981 20.9248 21.2981 22.1206C21.2981 23.1585 22.1245 24 23.1432 24C24.1619 24 24.9883 23.1543 24.9883 22.1206C24.9883 20.9248 23.6698 19.612 23.2624 19.1354Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeMiterlimit='10'
        />
        <path
          d='M22.0284 17.2306L13.1337 8.40702C13.0051 8.27801 12.8524 8.17565 12.6842 8.1058C12.5159 8.03595 12.3356 8 12.1535 8C11.9713 8 11.791 8.03595 11.6228 8.1058C11.4546 8.17565 11.3018 8.27801 11.1732 8.40702L10.9753 8.60499C10.8463 8.73356 10.7439 8.88632 10.674 9.05453C10.6042 9.22274 10.5682 9.40309 10.5682 9.58522C10.5682 9.76736 10.6042 9.9477 10.674 10.1159C10.7439 10.2841 10.8463 10.4369 10.9753 10.5655L13.0084 12.5986L15.1995 10.4075L9.31733 16.2812C9.2158 16.3821 9.13544 16.5024 9.08095 16.6348C9.02647 16.7672 8.99896 16.9092 9.00003 17.0524C9.0011 17.1956 9.03074 17.3371 9.08721 17.4687C9.14367 17.6003 9.22583 17.7193 9.32887 17.8188L14.3723 22.6623C14.5736 22.8551 14.8419 22.9624 15.1207 22.9617C15.3995 22.961 15.6672 22.8523 15.8676 22.6584C17.3206 21.2515 20.4151 18.257 20.738 17.9341C20.9609 17.7111 21.4376 17.6612 21.8412 17.6612H21.8528C21.9027 17.6612 21.9515 17.6464 21.9929 17.6186C22.0343 17.5907 22.0665 17.5512 22.0854 17.505C22.1042 17.4588 22.1089 17.408 22.0988 17.3591C22.0886 17.3103 22.0641 17.2655 22.0284 17.2306Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeMiterlimit='10'
        />
      </svg>
    </div>
  );
};

export default TableColorFill;
