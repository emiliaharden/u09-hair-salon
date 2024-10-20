import { useEffect, useState } from 'react'
import { Service, useServiceStore } from '@/store/useServiceStore'
import { API_URL } from '@/config'
import TableComponent from '@/components/table/TableComponent'
import { Button } from '@/components/ui/button'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion' // Import the accordion components

const CreateServiceComponent = () => {
    const { services, setServices } = useServiceStore()
    const [serviceName, setServiceName] = useState('')
    const [serviceDuration, setServiceDuration] = useState(30)
    const [servicePrice, setServicePrice] = useState(0)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_URL}/services`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch services')
                }

                const data = await response.json()

                const mappedServices = data.map((service: any) => ({
                    _id: service._id,
                    name: service.name,
                    duration: service.duration,
                    price: service.price,
                }))

                setServices(mappedServices)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }
        fetchServices()
    }, [setServices])

    const handleCreateService = async () => {
        if (!serviceName || serviceDuration <= 0 || servicePrice <= 0) {
            console.error('Invalid input')
            return
        }

        const roundedDuration = Math.ceil(serviceDuration / 30) * 30

        try {
            const response = await fetch(`${API_URL}/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    name: serviceName,
                    duration: roundedDuration,
                    price: servicePrice,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create service')
            }

            const newService = await response.json()

            const formattedService = {
                _id: newService._id,
                name: newService.name,
                duration: newService.duration,
                price: newService.price,
            }

            setServices([...services, formattedService])

            setServiceName('')
            setServiceDuration(30)
            setServicePrice(0)
        } catch (error) {
            console.error('Error creating service:', error)
        }
    }

    const handleDeleteService = async (serviceId: string) => {
        try {
            const response = await fetch(`${API_URL}/services/${serviceId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to delete service')
            }

            setServices(services.filter((service) => service._id !== serviceId))
        } catch (error) {
            console.error('Error deleting service:', error)
        }
    }

    const handleEditService = async (updatedService: Service) => {
        try {
            const response = await fetch(`${API_URL}/services/${updatedService._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    name: updatedService.name,
                    duration: updatedService.duration,
                    price: updatedService.price,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update service')
            }

            setServices(
                services.map((service) =>
                    service._id === updatedService._id ? updatedService : service
                )
            )
        } catch (error) {
            console.error('Error updating service:', error)
        }
    }

    const serviceColumns = ['name', 'duration', 'price']

    return (
        <div className="container mx-auto mt-6">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <h2 className="text-2xl font-bold">Create New Service</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Service Name
                                </label>
                                <input
                                    type="text"
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter service name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Duration (in minutes)
                                </label>
                                <input
                                    type="number"
                                    value={serviceDuration}
                                    onChange={(e) =>
                                        setServiceDuration(Math.ceil(Number(e.target.value) / 30) * 30)
                                    }
                                    min={30}
                                    step={30}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter duration (must be a multiple of 30)"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                <input
                                    type="number"
                                    value={servicePrice}
                                    onChange={(e) => setServicePrice(Number(e.target.value))}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter price"
                                />
                            </div>
                            <Button variant="default" onClick={handleCreateService}>
                                Create Service
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <h3 className="text-xl font-bold mt-6 mb-4">Available Services</h3>
            <TableComponent<Service>
                data={services}
                columns={serviceColumns}
                onEdit={handleEditService}
                onDelete={handleDeleteService}
            />
        </div>
    )
}

export default CreateServiceComponent
