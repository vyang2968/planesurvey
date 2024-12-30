import { Container, Card, Spinner } from 'react-bootstrap'
import classNames from 'classnames'
import SearchBar from '../../components/SearchBar'
import CustomDropdown from '../../components/CustomDropdown'
import { Suspense, useState, useCallback, startTransition } from 'react'
import CustomPagination from '../../components/CustomPagination'
import ResponseSection from '../../components/ResponseSection'
import useFetchData from '../../hooks/useFetchData'
import ResponseSectionFallback from '../../components/ResponseSectionFallback'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../../components/ErrorFallback'

export default function Search() {
    const filterCategories = ['firstName', 'lastName', 'email', 'age', 'manufacturer', 'airlines', 'response']

    const filterByDefaultText = 'Filter By';
    const sortDefaultText = 'Sort';
    const [filterByActive, setFilterByActive] = useState('firstName');
    const [sortActive, setSortActive] = useState('asc');

    const [searchBarText, setSearchBarText] = useState('')

    const [activePage, setActivePage] = useState(1)
    const [searchActive, setSearchActive] = useState(false)

    const pagesPerView = 3;

    const [resource, fetchResource, error] = useFetchData(
        'http://localhost:8080/responses/search',
        {
            field: filterByActive,
            value: searchBarText,
            page: activePage - 1,
            size: pagesPerView,
            direction: sortActive
        }
    )

    const handlePageChange = useCallback((newPage) => {
        startTransition(() => {
            setActivePage(newPage);
            fetchResource({
                field: filterByActive,
                value: searchBarText,
                page: newPage,
                size: pagesPerView,
                direction: sortActive,
            });
        });
    }, [filterByActive, searchBarText, pagesPerView, sortActive, fetchResource]);

    return (
        <>
            <Container
                className={classNames(
                    'min-w-dvw min-h-dvh flex justify-center items-center text-black m-0 p-0 overflow-hidden',
                    "relative before:absolute before:inset-0 before:bg-[url('assets/plane.jpg')] before:bg-no-repeat before:bg-cover before:blur before:z-[-1] before:bg-right",
                    'before:bg-white before:opacity-60'
                )}
            >
                <Card className='lg:w-3/5 lg:h-[90dvh] bg-white'>
                    <Container className=''>
                        <Card.Title className=''>Responses Search</Card.Title>
                        <Card.Subtitle className=''>Type in the search bar to find responses</Card.Subtitle>
                    </Container>
                    <Card.Body className=''>
                        <Container className=''>
                            <Container className={classNames(
                                searchActive ? 'ring-blue-300 ring ring-2' : ''
                            )}>
                                <SearchBar
                                    className=''
                                    placeholder='search for a response...'
                                    onChange={(text) => setSearchBarText(text)}
                                    onSearchActive={(active) => setSearchActive(active)}
                                    searchActive={searchActive}
                                />
                                <CustomDropdown
                                    className=''
                                    placeholder={filterByDefaultText}
                                    items={filterCategories}
                                    onChange={(active) => setFilterByActive(active)}
                                />
                                <CustomDropdown
                                    className=''
                                    placeholder={sortDefaultText}
                                    items={['asc', 'desc']}
                                    onChange={(active) => setSortActive(active)}
                                />
                            </Container>
                        </Container>
                        {error
                            ? <Container className=''>
                                <ErrorFallback message={'Something went wrong. Please try again later.'}/> 
                            </Container>
                            : <ErrorBoundary fallback={<ErrorFallback message={'Something went wrong. Please try again later.'} />}>
                                <Container className=''>
                                    <Suspense
                                        fallback={
                                            <ResponseSectionFallback
                                                numSections={pagesPerView}
                                                numFields={filterCategories.length}
                                                className=''
                                            />
                                        }
                                    >
                                        <ResponseSection
                                            resource={resource}
                                            pagesPerView={pagesPerView}
                                            className=''
                                        />
                                    </Suspense>
                                </Container>

                                <Suspense fallback={<div></div>}>
                                        <CustomPagination 
                                            resource={resource}
                                            pagesPerView={pagesPerView}
                                            onChange={handlePageChange}
                                            className=''
                                        />
                                    </Suspense>
                            </ErrorBoundary>
                    }
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}