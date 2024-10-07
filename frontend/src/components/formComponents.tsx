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
            <div className='flex space-evenly'>
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <label key={index} className='flex flex-col'>
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
