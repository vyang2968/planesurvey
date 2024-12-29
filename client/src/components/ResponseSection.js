import classNames from "classnames";
import { Container } from "react-bootstrap";

export default function ResponseSection({ resource, className, pagesPerView }) {
    const data = resource.read().content;
    const dataLength = data.length;

    return (
        <Container className={className}>
            {data.map((response, index) => (
                <div key={index} className="w-full h-[180px] grid grid-cols-2 pb-[3%] pt-[2%] pl-[3%] gap-y-[2%]">
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
                                        'flex items-center'
                                    )}
                                >
                                    <p><strong>{key}:</strong> {value}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            ))}
            {Array.from({ length: pagesPerView - dataLength }, (_, index) => (
                <div key={index} className="w-full h-[180px] grid grid-cols-2 pb-[3%] pt-[2%] pl-[3%] gap-y-[2%]"></div>

            ))}
        </Container>
    )
}