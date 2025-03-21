import { useLocation } from "react-router-dom";
import CountdownTimer from "../../shared/ui/CountdownTimer";

const Introduct = () => {
  // Lấy thông tin `state` từ URL nếu có, sử dụng `useLocation` của React Router
  // const location = useLocation();

  // Lấy giá trị `testDuration` từ state (nếu có), nếu không có thì mặc định là 30 phút
  // const testDuration = location.state?.testDuration || 1800;

  return (
    <div className="flex justify-center items-center content-center">
      {/* Hiển thị bộ đếm ngược thời gian, khi hết giờ sẽ hiển thị cảnh báo "Time out!" */}
      {/* <CountdownTimer duration={testDuration} onTimeUp={() => alert("Time out!")} /> */}
    </div>
  );
};

export default Introduct;
