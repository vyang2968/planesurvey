import classNames from "classnames";

export default function ResponseSectionFallback({ numSections, numFields, className }) {
    return (
        <div
            className={className}
        >
            {Array.from({ length: numSections }, (_, index) => (
                <div
                    key={index}
                    className="w-full h-auto grid grid-cols-2 gap-y-[1dvh] sm:gap-y-[1.5dvh]"
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