import React, {useState} from "react";
import SearchInput from "@features/profileuser/ui/component/SearchInput";
import Details from "@features/profileuser/ui/Details";
import StudentSessionTable from "@features/profileuser/ui/StudentSessionTable.jsx";
import ProfileNav from "@features/profileuser/ui/component/ProfileNav";
import ButtonProfile from "@features/profileuser/ui/component/ButtonProfile";

const ProfileUser = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  
  const onSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div className="h-full">
      <div className="w-full space-y-6 lg:space-y-8">
        {/* Profile Navigation */}
        <ProfileNav />

        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">My profile</h1>
            <p className="text-sm text-gray-500 mt-1 lg:text-base">Summary of personal information.</p>
          </div>
          <ButtonProfile />
        </div>

        {/* Profile Details Section */}
        <div className="min-h-[200px] lg:min-h-[250px]">
          <Details />
        </div>
        
        <hr className="border-t border-gray-200" />
        
        {/* Assessment History Section */}
        <div className="min-h-[300px] lg:min-h-[400px]">
          <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">Assessment History</h2>
          <p className="mt-1 text-sm text-gray-500 mb-6 lg:text-base">Overview of Past Performance.</p>

          <SearchInput
            placeholder="Search by session name"
            onSearchChange={onSearchChange}
            className="mb-4 lg:mb-6"
          />
          
          <div className="mt-4 lg:mt-6">
            <StudentSessionTable 
              searchKeyword={searchKeyword} 
              type="session"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;