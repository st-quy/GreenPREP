import { Button } from "antd";
import { IoWarningOutline } from "react-icons/io5";

/**
 * ConfirmTestSubmissionModal Component
 * Hiển thị hộp thoại xác nhận trước khi người dùng gửi bài kiểm tra.
 *
 * {boolean} visible - Trạng thái hiển thị modal (true: hiển thị, false: ẩn).
 * {function} onSubmit - Hàm callback được gọi khi người dùng nhấn "Submit".
 * {function} onCancel - Hàm callback được gọi khi người dùng nhấn "Cancel".
 * {boolean}showCancel - Cho phép hiển thị hoặc ẩn nút "Cancel" (mặc định: true).
 */

export default function ConfirmationDialog({
  visible,
  onSubmit,
  onCancel,
  showCancel = true,
}) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-10">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-3 mb-4">
          {/* Warning icon */}
          <IoWarningOutline className="text-amber-500 text-3xl" />
          {/* Heading */}
          <h1 className="text-xl font-medium text-center">
            Are you sure you want to submit test?
          </h1>
        </div>

        {/* Warning message */}
        <p className="text-gray-600 mb-6">
          After you submit your test, you will no longer have access to the
          questions, nor will you be able to review or make any changes to your
          answers.
        </p>

        {/* Action buttons */}
        <div className="flex justify-between md:justify-end gap-3">
          {showCancel && (
            <Button
              size="large"
              shape="round"
              onClick={onCancel}
              className="border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
          )}
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={onSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
