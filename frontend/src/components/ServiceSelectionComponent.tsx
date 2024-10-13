import { useServiceStore } from '@/store/useServiceStore'
import { useEffect } from 'react'

interface ServiceSelectionProps {
    selectedServices: string[];
    setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>; 
}


const ServiceSelectionComponent: React.FC<ServiceSelectionProps> = ({
    selectedServices,
    setSelectedServices,
}) => {
    const { services, setServices } = useServiceStore();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/services', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }

                const data = await response.json();

                const mappedServices = data.map((service: any) => ({
                    id: service._id,
                    name: service.name,
                    duration: service.duration,
                    price: service.price,
                }));

                setServices(mappedServices);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, [setServices]);

    const handleServiceChange = (serviceId: string) => {
        setSelectedServices((prevSelected: string[]) =>
            prevSelected.includes(serviceId)
                ? prevSelected.filter((id) => id !== serviceId)
                : [...prevSelected, serviceId]
        );
    };

    return (
        <div>
            <h2>Select Services</h2>
            <ul>
                {services.map((service) => (
                    <li key={service.id}>
                        <label>
                            <input
                                type="checkbox"
                                value={service.id}
                                onChange={() => handleServiceChange(service.id)}
                                checked={selectedServices.includes(service.id)}
                            />
                            {service.name} - {service.duration} mins - {service.price} SEK
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceSelectionComponent;
