import { CommentOutlined } from "@ant-design/icons";

const SpeakingHeader = () => {
  return (
    <div className="flex items-center mb-6">
      <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
        <CommentOutlined className="text-3xl text-white" />
      </div>
      <h1 className="text-4xl font-semibold">Speaking Test</h1>
    </div>
  );
};
export default SpeakingHeader;
