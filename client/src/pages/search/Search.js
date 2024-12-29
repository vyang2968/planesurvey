import { Container, Card, Spinner } from 'react-bootstrap'
import classNames from 'classnames'
import SearchBar from '../../components/SearchBar'
import CustomDropdown from '../../components/CustomDropdown'
import { Suspense, useState, useEffect, startTransition } from 'react'
import CustomPagination from '../../components/CustomPagination'
import axios from 'axios'
import ResponseSection from '../../components/ResponseSection'
import useFetchData from '../../hooks/useFetchData'
import ResponseSectionFallback from '../../components/ResponseSectionFallback'
import Skeleton from 'react-loading-skeleton'

export default function Search() {
    const fakeItems = ['test1','test2','test3'];
    const fakeFilterCategories = ['cat1', 'cat2', 'cat3'];

    const filterCategories = ['firstName', 'lastName', 'email', 'age', 'manufacturer', 'airlines', 'response']

    const filterByDefaultText = 'filter by';
    const sortDefaultText = 'sort';
    const [filterByActive, setFilterByActive] = useState('firstName');
    const [sortActive, setSortActive] = useState('asc');

    const [searchBarText, setSearchBarText] = useState('')

    const [activePage, setActivePage] = useState(1)

    const pagesPerView = 3;

    const [resource, refetch] = useFetchData(
        'http://localhost:8080/responses/search/all',
        {
            field: filterByActive,
            page: activePage - 1,
            size: pagesPerView,
            direction: sortActive
        }
    )

    const handlePageChange = (newPage) => {
        startTransition(() => {
            setActivePage(newPage)
            refetch({
                field: filterByActive,
                page: activePage - 1,
                size: pagesPerView, 
                direction: sortActive
            })
        })
    }

    // useEffect(() => {
    //     axios.get(
    //         'http://localhost:8080/responses/search',
    //         {
    //             headers: { 'Content-Type': 'application/json' },
    //             withCredentials: true,
    //             params: {
    //                 field: filterByActive,
    //                 value: searchBarText,
    //                 page: activePage - 1,
    //                 size: pagesPerView,
    //                 direction: sortActive
    //             }
    //         }
    //     ).then((res) => {
    //         setData(res.data.content);
    //         setTotalItems(res.data.totalElements);
    //     }).catch((error) => {
    //         console.error(error);
    //     })
    // }, [activePage, filterByActive, searchBarText, sortActive])

    return(
        <>
            <Container 
                className={classNames(
                    'min-w-dvw min-h-dvh flex justify-center items-center text-black m-0 p-0 overflow-hidden',
                    "relative before:absolute before:inset-0 before:bg-[url('assets/plane.jpg')] before:bg-no-repeat before:bg-cover before:blur before:z-[-1] before:bg-right",
                    'before:bg-white before:opacity-60'
                )}
            >
                <Card className='min-w-3/5 w-4/5 lg:w-3/5 h-auto rounded-3xl my-[5%] flex justify-center items-center bg-soft-gray flex-col text-charcoal'>
                    <Container className='text-indigo text-cente w-5/6 pt-[5%] text-center'>
                        <Card.Title className='text-3xl mb-1 lg:mb-0.5 lg:text-5xl font-bold'>Responses Search</Card.Title>
                        <Card.Subtitle className='text-xs lg:text-base text-charcoal'>Type in the search bar to find responses</Card.Subtitle>
                    </Container>
                    <Card.Body className='w-5/6 py-[3%] space-y-[3%]'>
                        <Container className='w-full h-fit rounded-xl flex justify-center items-center bg-white text-soft-black'>
                            <Container className='w-full h-fit flex flex-row items-center bg-light-gray rounded-xl m-4 divide-x'>
                                <SearchBar 
                                    className='w-full h-fit bg-light-gray' 
                                    placeholder='search for a response...'
                                    onChange={(text) => setSearchBarText(text)}
                                />
                                <CustomDropdown 
                                    className='w-2/12 h-fit text-center text-nowrap'  
                                    placeholder={filterByDefaultText}
                                    items={filterCategories}
                                    onChange={(active) => setFilterByActive(active)}

                                />
                                <CustomDropdown 
                                    className='w-2/12 h-fit text-center text-nowrap'  
                                    placeholder={sortDefaultText}
                                    items={fakeFilterCategories}
                                    onChange={(active) => setSortActive(active)}
                                />
                            </Container>
                        </Container>
                        <Container className='w-full bg-white rounded-xl'>
                            <Suspense 
                                fallback={
                                    <ResponseSectionFallback numSections={pagesPerView} numFields={8} className={'w-full h-fit divide-y-2'}/>
                                }
                            >
                                <ResponseSection 
                                    className='w-full h-fit divide-y-2'
                                    resource={resource}
                                    pagesPerView={pagesPerView}
                                />
                            </Suspense>
                        </Container>
                            <Container className='w-full flex justify-center items-center'>
                                <Suspense fallback={''}>
                                    <CustomPagination 
                                        className='flex flex-row justify-evenly items-center w-4/6' 
                                        resource={resource} 
                                        pagesPerView={pagesPerView}
                                        onChange={(page) => handlePageChange(page)}
                                    />
                                </Suspense>
                            </Container>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}