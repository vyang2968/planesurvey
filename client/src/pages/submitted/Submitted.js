import classNames from 'classnames'
import { Card, Container, Image } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import plane from '../../assets/checkplane.png'

export default function Submitted() {
    return (
        <>
            <Helmet>
                <title>Plane Survey</title>
                <meta name='description' content='survey for everything aviation related' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" type="image/png" href={''} />
            </Helmet>
            <Container className='w-dvw h-dvh flex items-center justify-center bg-soft-gray text-charcoal'>
                <Card className='w-3/5 h-3/5 bg-white rounded-lg shadow-lg flex items-center flex-col' >
                    <Container className='h-full w-4/5 flex flex-col items-center justify-center'>
                        <Image src={plane} className='w-1/2 sm:w-3/4 xl:w-1/2 lg:w-1/2' />
                        <h1 className='text-sm md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl w-fit mb-[3%]'>Thanks for your response!</h1>
                        <Link
                            className={classNames(
                                'p-[3%] lg:p-[2%] bg-indigo w-fit h-fit rounded-lg font-medium text-white shadow-md text-xs md:text-lg',
                                'active:brightness-[90%] hover:brightness-125'
                            )}
                            to={'/search'}
                        >
                            Search Responses
                        </Link>
                    </Container>
                </Card>
            </Container>
        </>
    )
}