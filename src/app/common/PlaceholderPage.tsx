import React from 'react';

interface PlaceholderProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <div className="container-fluid p-4">
      <div className="card p-5 text-center">
        <h2 className="text-muted">{title} - Module Under Development</h2>
      </div>
    </div>
  );
};
