export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-300 rounded mb-4 w-64 mx-auto"></div>
          <div className="h-6 bg-gray-300 rounded w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
