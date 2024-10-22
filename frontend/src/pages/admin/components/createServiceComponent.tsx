import { useEffect, useState } from 'react'
import { Service, useServiceStore } from '@/store/useServiceStore'
import { API_URL } from '@/config'
import TableComponent from '@/components/table/TableComponent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' // Shadcn Input
import { Label } from '@/components/ui/label' // Shadcn Label
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select' // Shadcn Select
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion'

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
                                <Label>Service Name</Label>
                                <Input
                                    type="text"
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                    placeholder="Enter service name"
                                />
                            </div>
                            <div className="mb-4">
                                <Label>Duration (in minutes)</Label>
                                <Select
                                    onValueChange={(value) => setServiceDuration(Number(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="30">30 minutes</SelectItem>
                                        <SelectItem value="60">1 hour</SelectItem>
                                        <SelectItem value="90">1.5 hours</SelectItem>
                                        <SelectItem value="120">2 hours</SelectItem>
                                        <SelectItem value="180">3 hours</SelectItem>
                                        <SelectItem value="240">4 hours</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mb-4">
                                <Label>Price</Label>
                                <Select onValueChange={(value) => setServicePrice(Number(value))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select price" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="100">100 SEK</SelectItem>
                                        <SelectItem value="200">200 SEK</SelectItem>
                                        <SelectItem value="300">300 SEK</SelectItem>
                                        <SelectItem value="400">400 SEK</SelectItem>
                                        <SelectItem value="500">500 SEK</SelectItem>
                                        <SelectItem value="1000">1000 SEK</SelectItem>
                                        <SelectItem value="2000">2000 SEK</SelectItem>
                                        <SelectItem value="2500">2500 SEK</SelectItem>
                                        <SelectItem value="3000">3000 SEK</SelectItem>
                                        <SelectItem value="3500">3500 SEK</SelectItem>
                                        <SelectItem value="4000">4000 SEK</SelectItem>
                                        <SelectItem value="4500">4500 SEK</SelectItem>
                                        <SelectItem value="5000">5000 SEK</SelectItem>
                                        <SelectItem value="6000">6000 SEK</SelectItem>
                                    </SelectContent>
                                </Select>
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
