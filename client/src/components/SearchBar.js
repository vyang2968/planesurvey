import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from "react";
import classNames from "classnames";


export default function SearchBar({ className, placeholder, onChange }) {
    const [searchActive, setSearchActive] = useState(false);
    const inputRef = useRef();

    return(
        <Container
            className={classNames(
                className,
            )}
            onClick={() => {
                inputRef.current.focus()
                setSearchActive(true)
            }}
        >
            <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className={classNames(
                    'w-1/12 hover:cursor-pointer',
                    searchActive ? 'hidden' : ''
                )}
            />
            <input 
                placeholder={placeholder}
                className={classNames(
                    'w-11/12 bg-light-gray',
                    searchActive ? 'mx-3' : '',
                    'outline-none'  
                )}
                ref={inputRef}
                onBlur={() => setSearchActive(false)}
                onChange={e => onChange(e.target.value)}
            />
        </Container>
    )
}