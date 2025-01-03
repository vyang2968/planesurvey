import classNames from 'classnames'
import { Suspense, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { ErrorBoundary } from 'react-error-boundary'
import { Helmet } from 'react-helmet-async'
import CustomDropdown from '../../components/CustomDropdown'
import CustomPagination from '../../components/CustomPagination'
import ErrorFallback from '../../components/ErrorFallback'
import ResponseSection from '../../components/ResponseSection'
import ResponseSectionFallback from '../../components/ResponseSectionFallback'
import SearchBar from '../../components/SearchBar'
import useFetchData from '../../hooks/useFetchData'

export default function Search() {
    const filterCategories = ['firstName', 'lastName', 'email', 'age', 'manufacturer', 'airlines', 'response']

    const filterByDefaultText = 'Filter By';
    const sortDefaultText = 'Sort';
    const [filterByActive, setFilterByActive] = useState('firstName');
    const [sortActive, setSortActive] = useState('asc');

    const [searchBarText, setSearchBarText] = useState('')

    const [activePage, setActivePage] = useState(1)
    const [searchActive, setSearchActive] = useState(false)

    const pagesPerView = window.innerWidth >= 640 ? 3 : 2;
    const [resource, fetchResource, error] = useFetchData(
        '/responses/search',
        {
            field: filterByActive,
            value: searchBarText,
            page: activePage - 1,
            size: pagesPerView,
            direction: sortActive
        },
        process.env.REACT_APP_BASE_URL
    );

    return (
        <>
            <Helmet>
                <title>Plane Survey</title>
                <meta name='description' content='survey for everything aviation related' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" type="image/png" href={''} />
            </Helmet>
            <Container
                className={classNames(
                    'min-w-dvw min-h-dvh flex justify-center items-center text-black m-0 p-0 overflow-hidden',
                    "relative before:absolute before:inset-0 before:bg-[url('assets/plane.jpg')] before:bg-no-repeat before:bg-cover before:blur before:z-[-1] before:bg-right",
                    'before:bg-white before:opacity-60'
                )}
            >
                <Card className='w-4/5 sm:w-3/5 sm:min-h-[90dvh] h-auto my-[5dvh] flex flex-col justify-center items-center bg-soft-gray rounded-xl'>
                    <Container className='w-5/6 my-[5dvh] flex flex-col justify-between items-center'>
                        <Container className='w-full mb-[3dvh] flex flex-col gap-y-1 sm:gap-y-[1dvh]'>
                            <Card.Title className='w-full text-3xl sm:text-5xl font-bold text-indigo text-center'>Responses Search</Card.Title>
                            <Card.Subtitle className='w-full text-xs sm:text-base text-center'>Type in the search bar to find responses</Card.Subtitle>
                        </Container>
                        <Card.Body className='w-full h-auto flex flex-col justify-between'>
                            <Container className={classNames(
                                'w-full h-[4dvh] sm:h-[5dvh] flex items-center bg-light-gray rounded-xl divide-x-2 text-xs sm:text-base',
                                searchActive ? 'ring-blue-300 ring ring-2' : ''
                            )}>
                                <SearchBar
                                    className='w-full h-full flex items-center px-1'
                                    placeholder='search for a response...'
                                    onChange={(text) => {
                                        setSearchBarText(text)
                                        setActivePage(1)
                                    }}
                                    onSearchActive={(active) => setSearchActive(active)}
                                    searchActive={searchActive}
                                />
                                <CustomDropdown
                                    className='w-1/6 h-full px-2 sm:m-0'
                                    placeholder={filterByDefaultText}
                                    items={filterCategories}
                                    onChange={(active) => setFilterByActive(active)}
                                />
                                <CustomDropdown
                                    className='w-1/6 h-full px-2'
                                    placeholder={sortDefaultText}
                                    items={['asc', 'desc']}
                                    onChange={(active) => setSortActive(active)}
                                />
                            </Container>
                            <ErrorBoundary fallback={
                                <ErrorFallback
                                    message={'Something went wrong. Please try again later.'}
                                    className='w-full h-[55dvh] my-[3dvh] flex justify-center items-center text-center rounded-xl bg-white font-bold'
                                />
                            }>
                                <Container className='w-full h-auto my-[3dvh] flex flex-col justify-center items-center rounded-xl bg-white'>
                                    <Suspense
                                        fallback={
                                            <ResponseSectionFallback
                                                numSections={pagesPerView}
                                                numFields={filterCategories.length}
                                                className='w-5/6 sm:w-11/12 h-[55dvh] flex flex-col justify-around'
                                            />
                                        }
                                    >
                                        <ResponseSection
                                            resource={resource}
                                            pagesPerView={pagesPerView}
                                            className='w-full h-auto divide-y-2 text-sm sm:text-base'
                                        />
                                    </Suspense>
                                </Container>
                                <Suspense fallback={<div></div>}>
                                    <CustomPagination
                                        resource={resource}
                                        pagesPerView={pagesPerView}
                                        onChange={(page) => setActivePage(page)}
                                        className='w-full sm:w-2/3 flex m-auto'
                                    />
                                </Suspense>
                            </ErrorBoundary>
                        </Card.Body>
                    </Container>
                </Card>
            </Container>
        </>
    )
}