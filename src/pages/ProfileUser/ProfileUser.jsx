import React, {useState, useEffect} from "react";
import SearchInput from "@features/profileuser/ui/component/SearchInput";
import Details from "@features/profileuser/ui/Details";
import StudentSessionTable from "@features/profileuser/ui/StudentSessionTable.jsx";
import ProfileNav from "@features/profileuser/ui/component/ProfileNav";
import ButtonProfile from "@features/profileuser/ui/component/ButtonProfile";
import ProfileUpdate from "@features/profileuser/ui/component/ProfileUpdate";
import ChangePassword from  "@features/profileuser/ui/component/ChangePassword";
import { getUserFromToken, getDataFromApi } from "../../utils/auth";

const ProfileUser = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Lấy userId từ token
        const decodedUser = getUserFromToken();
        if (!decodedUser?.userId) {
          throw new Error('No user ID found in token');
        }

        // Gọi API để lấy thông tin chi tiết
        const response = await getDataFromApi(decodedUser.userId);
        console.log('API Response:', response);

        // Format dữ liệu từ API response
        const formattedUserData = {
          fullName: `${response.data.firstName || ''} ${response.data.lastName || ''}`.trim(),
          email: response.data.email || '',
          studentId: response.data.studentId || '',
          phoneNumber: response.data.phoneNumber || 'Not provided',
          className: response.data.className || ''
        };

        setUserData(formattedUserData);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const onSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };


  return (
    <div className="h-full">
      <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8 2xl:space-y-10">
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
            onClose={() => setIsModalOpen(false)}
            userData={userData}
            loading={loading}
            error={error}
          />

          <ChangePassword 
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
          />
        </div>

        {/* Profile Details Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 min-h-[200px] lg:min-h-[250px] 2xl:min-h-[300px] lg:p-6 2xl:p-8">
          <Details 
            userData={userData}
            loading={loading}
            error={error}
          />
        </div>
        
        <hr className="border-t border-gray-200" />
        
        {/* Assessment History Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 min-h-[300px] lg:min-h-[400px] 2xl:min-h-[500px] lg:p-6 2xl:p-8">
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