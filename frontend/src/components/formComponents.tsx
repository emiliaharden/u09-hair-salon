import { useState } from 'react'

interface FormField {
    label: string
    type: string
    placeholder: string
    name: string
}

interface FormComponentProps {
    fields: FormField[]
    buttonText: string
    onSubmit: (formData: { [key: string]: string }) => void
}

const FormComponent: React.FC<FormComponentProps> = ({ fields, buttonText, onSubmit }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <>
            <div>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <label key={index}>
                            {field.label}
                            <input
                                type={field.type}
                                placeholder={field.placeholder}
                                name={field.name}
                                onChange={handleChange}
                            />
                        </label>
                    ))}
                    <button type="submit" className="border rounded">
                        {buttonText}
                    </button>
                </form>
            </div>
        </>
    )
}

export default FormComponent
