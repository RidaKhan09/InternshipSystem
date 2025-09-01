import React from 'react';
import Sidebar from '../../components/Sidebar';
import InternshipsSection from '../../pages/InternshipTable/InternshipsSection';

const MainIntern = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <InternshipsSection/>
    </div>
  );
};

export default MainIntern;