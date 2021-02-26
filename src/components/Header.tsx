import Link from 'next/link';
import React, { FC } from 'react';

const Header: FC = () => {
  return (
    <header>
      <h1>
        <Link href='/'>
          <a>zhangzinn blog</a>
        </Link>
      </h1>
    </header>
  );
};

export default Header;
