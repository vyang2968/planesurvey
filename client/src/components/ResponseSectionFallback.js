import classNames from "classnames";
import { Card, Container, Placeholder } from "react-bootstrap";

export default function ResponseSectionFallback({ numSections, numFields, className }) {
    return (
        <div
            className={className}
        >
            {Array.from({ length: numSections }, (_, index) => (
                <div 
                    key={index} 
                    className="w-full h-[180px] grid grid-cols-2 pb-[3%] pt-[2%] pl-[3%] gap-y-[2%]"
                >
                    {Array.from({ length: numFields }, (_, index) => (
                        <div 
                            key={index}
                            className={classNames(
                                'animate-pulse h-3 bg-soft-gray rounded-xl',
                                index >= numFields - 2 ? 'w-11/12 col-span-2' : 'w-2/3'
                            )}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}