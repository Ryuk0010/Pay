"use client"
export const TextInput = ({label, placeholder, onChange}: {
    label: string,
    placeholder: string,
    onChange: (value: string) => void
}) => {
    return <div>
        <label className="block mb-2 text-sm fornt-medium text-gray-900">{label}</label>
        <input onChange={(e)=>onChange(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder}></input>
    </div>
}