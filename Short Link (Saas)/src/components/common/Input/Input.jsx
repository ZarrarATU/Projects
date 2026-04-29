import { useId } from "react"

export function Input({
    label,
    type,
    placeholder = '',
    className = 'text-black',
    ...props
}) {

    const id = useId()

    return (
        <div className="flex flex-col justify-center gap-1">
            {label && <label className="font-[Ubuntu] font-semibold" htmlFor={id}>{label}</label>}
            <input className={className} id={id} type={type} placeholder={placeholder} {...props} />
        </div>
    )
}
