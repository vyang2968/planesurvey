import classNames from "classnames";
import { Container } from "react-bootstrap";
import ErrorFallback from "./ErrorFallback";

export default function ResponseSection({ resource, className, pagesPerView }) {
    const data = resource.read().content
    const dataLength = resource.read().length;
    return (
        <Container className={className}>
            {data.map((response, index) => (
                <div key={index} className="">
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
                                    <p className="line-clamp-4">
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
            {Array.from({ length: pagesPerView - dataLength }, (_, index) => (
                <div key={index} className=""></div>

            ))}
        </Container>
    )
}