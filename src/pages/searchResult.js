import {Fragment, useEffect, useState} from "react";
import {axiosInstance} from "../modules/categories";
import useQuery from "../defaults/useQuery";
// import {Tab, Tabs,} from "react-bootstrap";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {handleRemove} from "../redux/actions/projects";
import Pagination from "react-js-pagination";
import {useHistory} from "react-router-dom";
import {sliceText} from "../defaults/sliceText";

const SearchResult = () => {

    const query = useQuery();
    const [searchRes, setSearchRes] = useState([]);
    const [value, setValue] = useState(0);
    const history = useHistory();
    const [loading,setLoading] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const search = query.get("search")

    useEffect(() => {
        getSearchResult();
    },[search])

    useEffect(() => {
        if(loading === false) {
            getSearchResult()
        }
    },[loading])



    const getSearchResult = () => {
        axiosInstance.get(`/core/V1/movies/search?credentials=%7B%7D&details=%7B%7D&principal=%7B%7D&search=${search}`)
            .then(
                res => {
                    setSearchRes(res.data)
                }
            )
    }




    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


return (
        <Fragment>
            <div className="d-flex content-header justify-content-between">
                <div className="d-flex align-items-center">
                    <h2 className="heading">Результаты поиска <span className="count">{searchRes.length}</span> </h2>
                </div>
            </div>
            <div className="row d-flex">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} className="tabSearch" aria-label="basic tabs example">
                    <Tab label="Проекты" {...a11yProps(0)} />
                    <Tab label="Категории" {...a11yProps(1)} />
                    <Tab label="Пользователи" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div className="d-flex flex-wrap">
                    {
                        searchRes.map(
                            s => (
                                <div className="projectlist">
                                     <div className="card-block project-card">
                                         {s.poster === null ?<img className="project-banner" onClick={() => history.push(`/projects/${s.id}`)} src="/img/logo.svg" />
                                             : <img className="project-banner" onClick={() => history.push(`/projects/${s.id}`)} src={ s.poster.link} />}
                                         {s.movieType ==="SERIAL" && <div className="season-block">
                                         <p>
                                             {s.seriesCount} бөлім
                                         </p>
                                         </div>
                                         }

                                         <div>
                                            <span onClick={() => history.push(`/projects/${s.id}`)}>
                                                {sliceText(s.name,22)}
                                            </span>
                                             <div className="categoriesList">
                                             <ul>
                                                 {
                                                     s.categories.map(
                                                         (c, index) => (
                                                             <li className={index>1 && 'd-none'}>{sliceText(c.name, 12)}</li>
                                                         )
                                                     )
                                                 }
                                             </ul>
                                             </div>
                                             <div className="d-flex justify-content-between">
                                                 <div className="d-flex view-out">
                                                     <img src="/img/eye.svg" className="view"/>
                                                     <p>{s.watchCount}</p>
                                                 </div>
                                                <div className="modify">
                                                    <img className="modify-icons img-right" src="/img/pen.svg" onClick={() => history.push(`/projects/edit/${s.id}`)}/>
                                                    <img className="modify-icons" src="/img/delete.svg" onClick={(e) => handleRemove(e,null,setLoading)} data-id={s.id}/>
                                                </div>
                                             </div>
                                         </div>
                                     </div>
                                </div>
                            )
                        )
                    }
                </div>

            </TabPanel>
            <TabPanel value={value} index={1}>
                Not found.
            </TabPanel>
            <TabPanel value={value} index={2}>
                Not found.
            </TabPanel>
            </div>
        </Fragment>
        )

}

export default SearchResult;