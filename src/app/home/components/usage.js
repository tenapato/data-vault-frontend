import React from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";

export const Usage = ({ title, description, dataUsed, dataLimit, className }) => (
  <div className={`card ${className}`}>
    <CardHeader className="pb-4">
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent>
        <div className="flex m-auto">
            <span className='mr-10'>Data Used: {dataUsed}MB</span>
            <span>Limit: {dataLimit}MB</span>
        </div>
      <div className="h-4 bg-gray-200 rounded-full mt-2">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${(dataUsed / dataLimit) * 100}%` }}
        />
      </div>
    </CardContent>
  </div>
);