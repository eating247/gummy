// components/Footer.tsx
import React from 'react';

function Footer(): React.JSX.Element {
  return (
    <div className="text-center mt-12 text-sm text-gray-500">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="font-semibold text-gray-700 mb-2">✅ What's Included</h4>
        <p className="mb-2">
          All prices include delivery, pickup, disposal fees, weight allowance,
          administrative charges, environmental fees, fuel surcharge, and taxes.
        </p>
        <p className="text-purple-600 font-semibold">
          No hidden fees guaranteed! 🍬
        </p>
      </div>
    </div>
  );
}

export default Footer;
