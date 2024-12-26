import { Container, Card, Pagination, Dropdown } from 'react-bootstrap'
import classNames from 'classnames'
import SearchBar from '../../components/SearchBar'
import CustomDropdown from '../../components/CustomDropdown'
import { Suspense, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import CustomPagination from '../../components/CustomPagination'

export default function Search() {
    const fakeItems = ['test1','test2','test3']
    const fakeFilterCategories = ['cat1', 'cat2', 'cat3']

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
                                <SearchBar className='w-full h-fit bg-light-gray' />
                                <CustomDropdown 
                                    className='w-2/12 h-fit text-center text-nowrap'  
                                    title='filter by' 
                                    items={fakeFilterCategories}
                                />
                                <CustomDropdown 
                                    className='w-2/12 h-fit text-center text-nowrap'  
                                    title='sort'
                                    items={fakeFilterCategories}
                                />
                            </Container>
                        </Container>
                            <Container className='w-full bg-white rounded-xl'>
                                <Suspense>
                                    <Container className='divide-y'>
                                        {fakeItems.map(item => 
                                            <div className='w-full h-[250px] p-4'>{item}</div>
                                        )}
                                    </Container>
                                </Suspense>
                            </Container>
                        <Container className='w-full flex justify-center items-center'>
                            <CustomPagination className='flex flex-row justify-evenly items-center w-4/6' endPage={100} pagesPerView={5}/>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}