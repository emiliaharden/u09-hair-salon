import { useState } from 'react';
import { Input } from '@/components/ui/input'; // Shadcn Input
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'; // Shadcn Select
import { Checkbox } from '@/components/ui/checkbox'; // Shadcn Checkbox
import { Button } from '@/components/ui/button'; // Shadcn Button
import { Label } from '@/components/ui/label'; // Shadcn Label

interface FormField {
    label: string;
    type: string;
    placeholder?: string;
    name: string;
    options?: { value: string; label: string }[]; // För select-fält
}

interface FormComponentProps {
    fields: FormField[];
    buttonText: string;
    onSubmit: (formData: { [key: string]: string | boolean }) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ fields, buttonText, onSubmit }) => {
    const [formData, setFormData] = useState<{ [key: string]: string | boolean }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="flex flex-col space-y-4 p-8 shadow-lg rounded-md max-w-sm w-full" onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <div key={index} className="flex flex-col space-y-1">
                    <Label>{field.label}</Label> {/* Behåller din Label */}
                    {field.type === 'text' && (
                        <Input
                            type="text"
                            placeholder={field.placeholder}
                            name={field.name}
                            onChange={handleChange}
                        />
                    )}
                    {field.type === 'email' && (
                        <Input
                            type="email"
                            placeholder={field.placeholder}
                            name={field.name}
                            onChange={handleChange}
                        />
                    )}
                    {field.type === 'password' && (
                        <Input
                            type="password"
                            placeholder={field.placeholder}
                            name={field.name}
                            onChange={handleChange}
                        />
                    )}
                    {field.type === 'select' && field.options && (
                        <Select onValueChange={(value) => handleSelectChange(field.name, value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={field.placeholder || 'Select an option'} />
                            </SelectTrigger>
                            <SelectContent>
                                {field.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    {field.type === 'checkbox' && (
                        <Checkbox
                            checked={Boolean(formData[field.name])}
                            onCheckedChange={(checked) => setFormData({ ...formData, [field.name]: checked })}
                        />
                    )}
                </div>
            ))}
            <Button type="submit">
                {buttonText}
            </Button>
        </form>
    );
};

export default FormComponent;
