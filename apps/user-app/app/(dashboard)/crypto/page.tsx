'use client';

import { Card } from '@repo/ui/card';
import CryptoCard from '../../../components/cryptobuysellcard';

export default function HomePage() {
  return (
    <div>
        <div className="flex max-md:justify-center font-extrabold text-3xl text-purple-800 pt-4 pl-4">
          Buy & Sell Crypto
        </div>
      <div className='flex justify-between'>
        <div className="flex pt-4 lg:w-[50vh] lg:h-[30vh] w-96 lg:ml-20">
              <div>
              <div className='flex'>
                <CryptoCard name="CoinBase" url="https://www.coinbase.com/" />
              </div>
              <div className='mt-5'>
                <CryptoCard name="Cypto" url="https://crypto.com/" />
              </div>
            </div>
            <div className='ml-20'>
                <div className='ml-10'>
                <CryptoCard name="CoinDCX" url="https://coindcx.com/" />
                </div>
                <div className='ml-10 mt-5'>
                <CryptoCard name="WazirX" url="https://wazirx.com/" />
                </div>
            </div>
        </div>
        <div className='ml-96'>
          {/* <Card title={"Add Your Wallet"} children={"working on It"}/> */}
        </div>
      </div>
          
    </div>
  );
}
