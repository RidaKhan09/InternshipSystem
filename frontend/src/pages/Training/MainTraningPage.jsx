import React from 'react';
import Sidebar from '../../components/Sidebar';
import InternshipsSection from '../../pages/Training/TrainingSection';

const MainTrainingPage = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <InternshipsSection/>
    </div>
  );
};

export default MainTrainingPage;