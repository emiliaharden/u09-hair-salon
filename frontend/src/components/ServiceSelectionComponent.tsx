import { API_URL } from '@/config';
import { useServiceStore } from '@/store/useServiceStore';
import { useEffect } from 'react';
import { Checkbox } from './ui/checkbox';

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
                    _id: service._id,
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
        if (selectedServices.includes(serviceId)) {
            setSelectedServices(selectedServices.filter(id => id !== serviceId));
        } else {
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    return (
        <div>
            <h2>Select Services</h2>
            <ul>
                {services.map((service) => (
                    <li key={service._id} className="flex items-center space-x-3">
                        <Checkbox
                            checked={selectedServices.includes(service._id)}
                            onCheckedChange={() => handleServiceChange(service._id)}
                            id={`service-${service._id}`}
                        />
                        <label htmlFor={`service-${service._id}`} className="cursor-pointer">
                            {service.name} - {service.duration} mins - {service.price} SEK
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceSelectionComponent;
