import classNames from 'classnames'
import { Card, Container, Image } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
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
            <Container className='min-w-dvw w-dvw min-h-dvh h-dvh flex items-center justify-center bg-soft-gray text-charcoal'>
                <Card className='w-3/5 h-2/5 sm:h-3/5 flex flex-col justify-center items-center bg-white rounded-xl'>
                    <Container className='w-5/6 sm:w-2/3 lg:w-3/5 h-fit flex flex-col items-center'>
                        <Image src={plane} className='w-5/6 lg:w-2/3' />
                        <h1 className='text-md text-center sm:text-[2.5dvw] font-bold'>Thanks for your response!</h1>
                        <Link
                            className={classNames(
                                'w-fit h-fit p-2 sm:p-4 m-[2dvh] bg-indigo text-white rounded-lg text-sm lg:text-[1.5dvw]',
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