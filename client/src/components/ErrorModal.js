import { Container } from 'react-bootstrap';
import Portal from './Portal'
import { faPlaneCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ErrorModal({ isOpen, onClose, className }) {
    if (!isOpen) {
        return null;
    }

    return (
        <Portal className={className}>
            <div className="w-full h-full fixed inset-0 bg-black opacity-70 z-50"></div>
            <div className="w-full h-full fixed top-1/2 left-1/2 z-50">
                <Container className='w-8/12 md:w-5/12 h-auto translate-x-[-50%] translate-y-[-50%] flex justify-center items-center bg-white rounded-lg'>
                    <div className='w-10/12 h-full flex flex-col justify-space-between items-center py-10 gap-y-6 text-charcoal'>
                        <FontAwesomeIcon icon={faPlaneCircleXmark} size='5x' className='text-black' />
                        <div className='text-center'>
                            <h1 className='text-3xl font-bold text-indigo'>Error</h1>
                            <p>Oops, something went wrong. Please try again.</p>
                        </div>
                        <button className='w-fit py-2 px-[5dvw] bg-indigo text-white rounded-lg text-bold' onClick={onClose}>Close</button>
                    </div>
                </Container>
            </div>
        </Portal>
    )
}