import classNames from "classnames";

export default function ResponseSectionFallback({ numSections, numFields, className }) {
    return (
        <div
            className={className}
        >
            {Array.from({ length: numSections }, (_, index) => (
                <div
                    key={index}
                    className="w-full h-full flex flex-col justify-evenly gap-y-1 lg:grid lg:grid-cols-2 lg:grid-flow-row py-4"
                >
                    {Array.from({ length: numFields }, (_, index) => (
                        <div
                            key={index}
                            className={classNames(
                                'animate-pulse h-3 bg-soft-gray rounded-xl',
                                index >= numFields - 2 ? 'w-full col-span-2' : 'w-2/3'
                            )}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}