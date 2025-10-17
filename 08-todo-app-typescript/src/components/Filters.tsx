import type {FilterProps, FilterValue} from "../types/types";
import {FILTERS_BUTTONS} from "../consts.ts";


export const Filters = ({filterSelected, handleFilterChange}: FilterProps) => {
    const handleClick = (filter: FilterValue) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        handleFilterChange(filter)
    }

    return (
        <ul className="filters">
            {
                Object.entries(FILTERS_BUTTONS).map(([key, {href, literal}]) => {
                    const isSelected = key === filterSelected
                    const className = isSelected ? 'selected' : ''

                    return (
                        <li key={key}>
                            <a href={href}
                               className={className}
                               onClick={handleClick(key as FilterValue)}>{literal}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}