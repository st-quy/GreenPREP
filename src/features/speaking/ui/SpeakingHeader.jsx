import { CommentOutlined } from "@ant-design/icons"

const SpeakingHeader = () => {
  return (
    <div className="flex items-center mb-6 mt-6">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
      <CommentOutlined style={{ fontSize: "24px", color: "white" }} />
        </div>
    <h1 className="text-2xl font-bold">Speaking Test</h1>
    </div>
  )
}
export default SpeakingHeader

