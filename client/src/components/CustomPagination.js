import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Container, PageItem, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import classNames from "classnames";

export default function CustomPagination({ className, resource, pagesPerView, onChange }) { 
    const buttonStyling = "flex justify-center items-center h-1/4 aspect-square p-3 bg-blue-300 text-lg"
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        if (onChange) {
            onChange(activePage);
        }
    }, [activePage, onChange]);

    if (!resource) {
        return <div></div>
    }

    const endPage = Math.ceil(resource.read().totalElements / pagesPerView);

    if (endPage == 0) {
        return <div></div>
    }

    function calculateItems() {
        let list = []
        if (endPage <= pagesPerView + 1) {
            for (let i = 1; i <= endPage; i++) {
                list.push(i);
            }
        } else if (activePage <= pagesPerView && endPage >= pagesPerView + 2) {
            for (let i = 1; i <= pagesPerView; i++) {
                list.push(i);
            }
            list.push('...');
            list.push(endPage)
        } else if (activePage > endPage - pagesPerView) {
            list.push(1)
            list.push('...')
            for (let i = endPage - 4; i <= endPage; i++) {
                list.push(i)
            }
        } else {
            list.push(1)
            list.push('...1')
            list.push(activePage - 1)
            list.push(activePage)
            list.push(activePage + 1)
            list.push('...2')
            list.push(endPage)
        }

        return list
    }


    return (
        <Pagination className={className}>
            <PageItem className="flex justify-center items-center text-center">
                <FontAwesomeIcon 
                    icon={faAngleLeft} 
                    onClick={() => setActivePage(activePage - 1 >= 1 ? activePage - 1 : 1)}
                    className="p-2 pb-1 text-center"/>
            </PageItem>
            <Container className="w-5/6 flex justify-evenly">
                {calculateItems().map(
                    (item) => 
                    <button
                        key={item}
                        className={classNames(
                            item === activePage ? 'font-bold' : '',
                            'w-1/12 flex justify-center items-center'
                        )}
                        onClick={(event) => {
                            if (typeof(item) !== 'string') {
                                setActivePage(item)
                            } else {
                                const prev = Number(event.target.previousSibling.innerHTML)
                                const next = Number(event.target.nextSibling.innerHTML)
                                const middle = Math.floor((prev + next) / 2)
                                setActivePage(middle)
                            }
                        }}
                    >
                        {typeof(item) === 'string' ? "..." : item}
                    </button>
                )}
            </Container>
            <PageItem className="flex justify-center items-center">
                <FontAwesomeIcon 
                    icon={faAngleRight} 
                    onClick={() => setActivePage(activePage + 1 <= endPage ? activePage + 1 : endPage)}
                    className="p-2 pb-1"/>
            </PageItem>
        </Pagination>
    )
}