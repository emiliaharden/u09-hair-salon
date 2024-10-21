import { API_URL } from '@/config';
import { useServiceStore } from '@/store/useServiceStore'
import { useEffect } from 'react'

interface ServiceSelectionProps {
    selectedServices: string[];
    setSelectedServices: (services: string[]) => void;
}

const ServiceSelectionComponent: React.FC<ServiceSelectionProps> = ({
    selectedServices,
    setSelectedServices,
}) => {
    const { services, setServices } = useServiceStore();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_URL}/services`, {
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
                    _id: service._id, // Använd _id här
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
        // Kontrollera om den valda tjänsten redan finns i selectedServices
        if (selectedServices.includes(serviceId)) {
            // Om den finns, ta bort den från listan
            setSelectedServices(selectedServices.filter(id => id !== serviceId));
        } else {
            // Om den inte finns, lägg till den
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    return (
        <div>
            <h2>Select Services</h2>
            <ul>
                {services.map((service) => (
                    <li key={service._id}>
                        <label>
                            <input
                                type="checkbox"
                                value={service._id} // Använd _id som value
                                onChange={() => handleServiceChange(service._id)} // Justera för _id
                                checked={selectedServices.includes(service._id)} // Kontrollera med _id
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
