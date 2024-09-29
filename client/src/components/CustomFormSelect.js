import {Form} from "react-bootstrap";

function CustomFormSelect({options, onChange, onBlur}) {
    return (
        <div className="w-3/6 h-2/5 flex items-center bg-white justify-around rounded-lg relative">
            <Form.Select className="appearance-none pl-2 w-full absolute inset-y-0 left-0" onChange={onChange} onBlur={onBlur}>
                <option selected disabled hidden>{'(select one)'}</option>
                {
                    options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))
                }
            </Form.Select>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-2/12 h-full absolute inset-y-0 right-0 z-10 pr-2">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
        </div>

    )
}

export default CustomFormSelect;