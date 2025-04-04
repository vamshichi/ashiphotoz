import VideoForm from './components/VideoForm'
import VideoList from './components/VideoList'

export default function VideosAdminPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Videos</h1>
        <VideoForm />
        <VideoList />
      </div>
    </div>
  )
} 