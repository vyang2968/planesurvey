import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import { memo } from "react";

export default function ResponseSection({ resource, className, pagesPerView }) {
    console.log(resource)
    console.log(resource.read())
    const data = resource.read().content
    const dataLength = data.length
    return (
        <Container className={className}>
            {data.map((response, index) => (
                <div key={index} className='w-full h-1/3 flex flex-col gap-y-1 sm:grid sm:grid-cols-2 grid-flow-row p-6'>
                    {
                        Object.entries(response).map(([key, value], subIndex) => {
                        if (key !== 'id') {
                            key = key.replace(/([A-Z])/g, " $1");
                            key = key.charAt(0).toUpperCase() + key.slice(1);
                            return (
                                <div
                                    key={subIndex}
                                    className={classNames(
                                        key.toLowerCase() === 'airlines' || key.toLowerCase() === 'response' ? 'col-span-2' : '',
                                        
                                    )}
                                >
                                    <p className="line-clamp-3">
                                        <strong>{key}:</strong>
                                        {' '.concat(
                                            typeof(value) === 'object' 
                                            ? Object.values(value).join(', ')
                                            : value
                                        )}
                                    </p>
                                </div>
                            )
                        }
                    })}
                </div>
            ))}
            {dataLength > 0 
                ? Array.from({ length: pagesPerView - dataLength }, (_, index) => (
                <div key={index} className='w-full h-[25dvh]'></div>
                )) : <div 
                        className='w-full h-[55dvh] my-auto flex justify-center items-center'
                    >
                        <p className="text-lg font-semibold">No items found &nbsp;</p><FontAwesomeIcon icon={faFaceFrown} size="xl"/>
                    </div>}
        </Container>
    )   
}