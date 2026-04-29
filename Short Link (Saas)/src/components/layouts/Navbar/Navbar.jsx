import { Link } from "react-router";


export function Navbar({options}) {
  return (
    <div className="flex items-center gap-4">
        {
            options.map(option=>(
                <Link className="text-white text-[13px] font-[Inter] hover:text-gray-100 transition-all" key={option.id} to={option.slug}>{option.name}</Link>
            ))
        }
    </div>
  )
}
