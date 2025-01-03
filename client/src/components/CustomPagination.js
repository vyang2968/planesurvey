import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Container, PageItem, Pagination } from "react-bootstrap";

export default function CustomPagination({ className, resource, pagesPerView, onChange, currentPage }) {
    if (!resource) {
        return <div></div>;
    }

    const endPage = resource.read().totalPages;

    if (endPage === 0) {
        return <div></div>;
    }

    function calculateItems() {
        const list = [];
        
        if (endPage <= pagesPerView + 2) {
            // Case 1: All pages fit within the view
            for (let i = 1; i <= endPage; i++) {
                list.push(i);
            }
        } else if (currentPage <= pagesPerView) {
            // Case 2: Current page is within the initial range
            for (let i = 1; i <= pagesPerView; i++) {
                list.push(i);
            }
            list.push('...');
            list.push(endPage);
        } else if (currentPage > endPage - pagesPerView) {
            // Case 3: Current page is within the last range
            list.push(1);
            list.push('...');
            for (let i = endPage - (pagesPerView - 1); i <= endPage; i++) {
                list.push(i);
            }
        } else {
            // Case 4: Current page is somewhere in the middle
            list.push(1);
            list.push('...');
            const halfView = Math.floor(pagesPerView / 2);
            for (let i = currentPage - halfView; i <= currentPage + halfView; i++) {
                list.push(i);
            }
            list.push('...');
            list.push(endPage);
        }
    
        return list;
    }
    

    return (
        <Pagination className={className}>
            <PageItem className="flex justify-center items-center text-center">
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    onClick={() => {
                        const newPage = Math.max(currentPage - 1, 1);
                        if (onChange && newPage !== currentPage) {
                            onChange(newPage);
                        }
                    }}
                    className="p-2 pb-1 text-center"
                />
            </PageItem>
            <Container className="w-5/6 flex justify-evenly">
                {calculateItems().map((item) => (
                    <button
                        key={item}
                        className={classNames(
                            item === currentPage ? 'font-bold' : '',
                            'w-1/12 flex justify-center items-center'
                        )}
                        onClick={(event) => {
                            if (typeof item !== 'string') {
                                if (onChange && item !== currentPage) {
                                    onChange(item);
                                }
                            } else {
                                const prev = Number(event.target.previousSibling.innerHTML);
                                const next = Number(event.target.nextSibling.innerHTML);
                                const middle = Math.floor((prev + next) / 2);
                                if (onChange && middle !== currentPage) {
                                    onChange(middle);
                                }
                            }
                        }}
                    >
                        {typeof item === 'string' ? "..." : item}
                    </button>
                ))}
            </Container>
            <PageItem className="flex justify-center items-center">
                <FontAwesomeIcon
                    icon={faAngleRight}
                    onClick={() => {
                        const newPage = Math.min(currentPage + 1, endPage);
                        if (onChange && newPage !== currentPage) {
                            onChange(newPage);
                        }
                    }}
                    className="p-2 pb-1"
                />
            </PageItem>
        </Pagination>
    );
}
