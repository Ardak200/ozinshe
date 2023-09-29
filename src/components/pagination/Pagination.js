const Pagination = ({totalPages,currentPage,last,first,empty, onHandlePage}) => {

    const ListPagination = ({totalPages}) => {
        for(let i=0; i<totalPages; i++) {
            return(
                <li className="page-item"><a className="page-link" href="#">{i}</a> </li>
            )
        }
    }
    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className={"page-item " + first && "disabled"}>
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                <ListPagination totalPages={totalPages}/>
      {/*          <li className="page-item"><a className="page-link" href="#">1</a></li>*/}
      {/*          <li className="page-item active">*/}
      {/*<span className="page-link">*/}
      {/*  2*/}
      {/*  <span className="sr-only">(current)</span>*/}
      {/*</span>*/}
      {/*          </li>*/}
      {/*          <li className="page-item"><a className="page-link" href="#">3</a></li>*/}
                <li className={"page-item " + last && "disabled"}>
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination