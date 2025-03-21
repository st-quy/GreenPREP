import { WarningOutlined } from "@ant-design/icons";
import { Button } from "antd";

/**
 * ConfirmTestSubmissionModal Component
 *
 *{boolean} visible - Determines whether the modal is visible (true: shown, false: hidden).
 *{ReactNode} title - The title of the dialog, can be a string or JSX.
 *{ReactNode} description - The message/content inside the dialog, can be a string or JSX.
 *{function} onSubmit - Callback function triggered when the user clicks "Submit".
 *{function} onCancel - Callback function triggered when the user clicks "Cancel".
 *{boolean} showCancel - Whether to show the "Cancel" button (default: true).
 *{string} actionClassName - Optional class for customizing the action buttons container.
 */

export default function ConfirmTestSubmissionModal({
  visible,
  onSubmit,
  onCancel,
  showCancel = true,
  actionClassName = "",
  title = "Are you sure you want to submit test?",
  description = `After you submit your test, you will no longer have access to the
          questions, nor will you be able to review or make any changes to your
          answers.`,
}) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-10">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-3 mb-4">
          {/* Warning icon */}
          <WarningOutlined className="text-amber-500 text-3xl" />
          {/* Heading */}
          <h1 className="text-xl font-medium text-center">{title}</h1>
        </div>

        {/* Warning message */}
        <div className="text-gray-600 mb-6">{description}</div>

        {/* Action buttons */}
        <div
          className={`flex justify-between md:justify-end gap-3 ${actionClassName}`}
        >
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
