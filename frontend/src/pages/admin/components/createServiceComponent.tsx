import { useEffect, useState } from 'react'
import { useServiceStore } from '@/store/useServiceStore'
import { API_URL } from '@/config';



const CreateServiceComponent = () => {
    const { services, setServices } = useServiceStore();
    const [serviceName, setServiceName] = useState('')
    const [serviceDuration, setServiceDuration] = useState(0)
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
                    id: service._id,
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
        //Kontrollerar att alla fält är ifyllda
        if (!serviceName || serviceDuration <= 0 || servicePrice <= 0) {
            console.error('Invalid input')
            return;
        }

        try {
            const response = await fetch(`${API_URL}/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    name: serviceName,
                    duration: serviceDuration,
                    price: servicePrice,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create service')
            }

            const newService = await response.json()

            const formattedService = {
                id: newService._id,
                name: newService.name,
                duration: newService.duration,
                price: newService.price,
            };

            setServices([...services, formattedService]);

            setServiceName('')
            setServiceDuration(0)
            setServicePrice(0)
        } catch (error) {
            console.error('Error creating service:', error)
        }
    }

    return (
        <div>
            <h2>Create new service</h2>
            <div>
                <label>Service name</label>
                <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                />
            </div>
            <div>
                <label>Duration (in minutes)</label>
                <input
                    type="number"
                    value={serviceDuration}
                    onChange={(e) => setServiceDuration(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(Number(e.target.value))}
                />
            </div>
            <button onClick={handleCreateService}>Create service</button>

            <h3>Avalable services</h3>
            <ul>
                {services.map((service) => (
                    <li key={service.id}>
                        {service.name} - {service.duration} mins - {service.price} SEK
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CreateServiceComponent
