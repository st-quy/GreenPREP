import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "@features/profileuser/ui/component/SearchInput";
import Details from "@features/profileuser/ui/Details";
import StudentSessionTable from "@features/profileuser/ui/StudentSessionTable.jsx";
import ProfileNav from "@features/profileuser/ui/component/ProfileNav";
import ButtonProfile from "@features/profileuser/ui/component/ButtonProfile";
import ProfileUpdate from "@features/profileuser/ui/component/ProfileUpdate";
import ChangePassword from "@features/profileuser/ui/component/ChangePassword";
import { getUserFromToken, getDataFromApi } from "../../shared/lib/utils/auth";

const ProfileUser = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Sử dụng React Query để fetch user data
  const { data: userData, isLoading, error, refetch } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const decodedUser = getUserFromToken();
      if (!decodedUser?.userId) {
        throw new Error('No user ID found in token');
      }

      const response = await getDataFromApi(decodedUser.userId);
      if (!response) {
        throw new Error('No response from API');
      }

      return {
        fullName: `${response.firstName || ''} ${response.lastName || ''}`.trim(),
        email: response.email || '',
        studentCode: response.studentCode || '',
        phoneNumber: response.phoneNumber || '',
        class: response.class || '',
        password: response.password || ''
      };
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });

  const onSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    refetch(); // Refetch data khi modal đóng
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
    refetch(); // Refetch data khi password modal đóng
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
          <ButtonProfile 
            onUpdateProfile={() => setIsModalOpen(true)}
            onChangePassword={() => setIsPasswordModalOpen(true)}
          />
          <ProfileUpdate 
            isOpen={isModalOpen}
            onClose={handleModalClose}
            userData={userData}
            loading={isLoading}
            error={error?.message}
          />

          <ChangePassword 
            isOpen={isPasswordModalOpen}
            onClose={handlePasswordModalClose}
            userData={userData}
          />
        </div>

        {/* Profile Details Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 min-h-[200px] lg:min-h-[250px] 2xl:min-h-[300px] lg:p-6 2xl:p-8">
          <Details 
            userData={userData}
            loading={isLoading}
            error={error?.message}
          />
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