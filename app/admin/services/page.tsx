import ServiceForm from './components/ServiceForm'
import ServiceList from './components/ServiceList'

export default function ServicesAdminPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Services</h1>
        <ServiceForm />
        <ServiceList />
      </div>
    </div>
  )
} 