'use client';
import React from 'react';
import { data } from '../../data/packagesData';

interface Props {
  id: string;
}

export function CostBreakdown({ id }: Props) {
  const d = data.find((d) => d.id === id)!;
  const { visa, flights, hotel } = d.costBreakdown;

  return (
    <div className="border-white-secondary border-roundness w-full border bg-white px-5 py-4">
      <h2 className="mb-4 text-lg font-semibold text-black/70 2xl:text-lg">Cost Breakdown</h2>

      <div className="mb-4 flex h-2.5 w-full overflow-hidden">
        <div className="bg-[#A78BFA]" style={{ width: `${visa.percentage}%` }} /> {/* Purple */}
        <div className="bg-[#60A5FA]" style={{ width: `${flights.percentage}%` }} /> {/* Blue */}
        <div className="bg-[#34D399]" style={{ width: `${hotel.percentage}%` }} />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <div className="text-gray flex items-center gap-1.5 text-sm 2xl:text-base">
          <span className="h-2.5 w-2.5 rounded-full bg-[#A78BFA]" />
          <span>Visa</span>
          <span className="font-medium text-black/80">₹{visa.amount.toLocaleString('en-IN')}</span>
          <span>({visa.percentage}%)</span>
        </div>

        <div className="text-gray flex items-center gap-1.5 text-sm 2xl:text-base">
          <span className="h-2.5 w-2.5 rounded-full bg-[#60A5FA]" />
          <span>Flights</span>
          <span className="font-medium text-black/80">
            ₹{flights.amount.toLocaleString('en-IN')}
          </span>
          <span>({flights.percentage}%)</span>
        </div>

        <div className="text-gray flex items-center gap-1.5 text-sm 2xl:text-base">
          <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
          <span>Hotel</span>
          <span className="font-medium text-black/80">₹{hotel.amount.toLocaleString('en-IN')}</span>
          <span>({hotel.percentage}%)</span>
        </div>
      </div>
    </div>
  );
}

export default CostBreakdown;
