import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchComponentProps {
    onSearch: (searchTerm: string) => void;
    placeholder?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
    onSearch,
    placeholder = 'Search...',
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="flex items-center space-x-2">
            <Input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            <Button onClick={handleClearSearch} variant="outline">
                Clear
            </Button>
        </div>
    );
};

export default SearchComponent;
