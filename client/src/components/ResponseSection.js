import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Container } from "react-bootstrap";

export default function ResponseSection({ resource, className, pagesPerView }) {
    const data = resource.read().content
    const dataLength = data.length

    function obfuscateEmail(email) {
        const atIndex = email.indexOf('@');
        const localPart = email.substring(0, atIndex);
        const domainPart = email.substring(atIndex);

        // Generate a random number of '*' (max is the length of localPart minus 1)
        const starsCount = Math.floor(Math.random() * (localPart.length - 1)) + 1;

        // Replace all characters except the first with '*' (up to the random number of stars)
        const obfuscatedLocalPart = localPart[0] + '*'.repeat(starsCount) + localPart.substring(starsCount + 1);

        // Combine the obfuscated local part with the domain part
        return obfuscatedLocalPart + domainPart;
    }

    return (
        <Container className={className}>
            {data.map((response, index) => (
                <div key={index} className='w-full h-1/3 flex flex-col gap-y-1 lg:grid lg:grid-cols-2 grid-flow-row p-6'>
                    {
                        Object.entries(response).map(([key, value], subIndex) => {
                            let formattedKey = key
                            if (key !== 'id') {
                                formattedKey = formattedKey.replace(/([A-Z])/g, " $1");
                                formattedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
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
                                                typeof (value) === 'object'
                                                    ? Object.values(value).join(', ')
                                                    : key === 'email'
                                                        ? obfuscateEmail(value)
                                                        : key === 'lastName'
                                                            ? value.charAt(0).concat("*".repeat(Math.floor(Math.random() * value.length) + 1))
                                                            : value
                                            )}
                                        </p>
                                    </div>
                                )
                            }
                            return (<></>)
                        })}
                </div>
            ))}
            {dataLength > 0
                ? Array.from({ length: pagesPerView - dataLength }, (_, index) => (
                    <div key={index} className='w-full h-[25dvh]'></div>
                )) : <div
                    className='w-full h-[55dvh] my-auto flex justify-center items-center'
                >
                    <p className="text-lg font-semibold">No items found &nbsp;</p><FontAwesomeIcon icon={faFaceFrown} size="xl" />
                </div>}
        </Container>
    )
}