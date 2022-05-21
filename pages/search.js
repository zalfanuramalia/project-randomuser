import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import http from '../helpers/http'
import {FaSearch, FaChevronLeft, FaChevronRight} from 'react-icons/fa'

const Search = () => {   
    const [users, setUsers] = useState([])
    const [page, setPage] = useState({})
    const [errorMsg, setErrorMsg] = useState(null)

    const getUserSearch = async (url) => {
        const { data } = await http().get(url)
        setUsers(data?.results)
        setPage(data?.pageInfo)
    }

    useEffect(() => {
        getUserSearch(`/api/?results=50`)
    }, [])

    const getNextData = async (url, replace = false) => {
        try {
            setErrorMsg(null)
            const { data } = await http().get(url)
            if (replace) {
                if (!Array.isArray(data.results)) {
                    data.results = [data.results]
                }
                setUsers(data?.results)
            } else {
                setUsers([
                    ...data.results
                ])
            }
            setPage(data.pageInfo)
        } catch (e) {
            if (e.message.includes('404')) {
                setErrorMsg('Data not found!')
                setUsers([])
                setPage({
                    next: null
                })
            }
        }
    }    

    const onSearch = async (event) => {
        event.preventDefault();
        const url = () => `/api/?results=50&search=${search}`
        const search = event.target.elements["search"].value
        await getNextData(url(search), true)
    }
    return (
        <>
            <Head>
                <title>Search</title>
                <meta name="description" content="Next Coffee for You" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Container>
                <div className='mt-5'>
                    <form id='search' name='serach' onSubmit={onSearch} className="border-brown input-group mb-3 rounded mx-auto button-type-name ">
                        <input name="search" type="text" className="btn-search-type form-control bg-transparent col-12 col-lg-3"
                            placeholder="Search Name" />
                        <button className="btn " type="submit" id="button-addon2"><FaSearch /></button>
                    </form>
                </div>
                <Row>
                    {errorMsg &&
                        <div className="alert alert-warning fade show" role="alert">
                            <strong>{errorMsg}</strong>
                        </div>
                    }
                    <Col sm={12}>
                        <div className='d-flex justify-content-between'>
                            {page !== null && <button onClick={() => getNextData(page)} className='btn '><p><FaChevronLeft />View Prev </p></button>}
                            {page !== null && <button onClick={() => getNextData(page)} className='btn '><p>View Next <FaChevronRight /></p></button>}
                        </div>
                    </Col>
                    {users?.map((datas, idx)=> {
                        return (
                            <Col key={String(datas.email)}>
                                <div id="img-object-home" className='mx-5 my-5' shadow-lg img-thumbnail bg-pallet-4>
                                <div className='d-flex justify-content-center align-items-center position-relative'>
                                    <Image className='' width={200} height={200} src={datas.picture.medium} alt='Image' />
                                </div>
                                <p className='text-center'>{datas.name.title} {datas.name.first} {datas.name.last}</p>
                                <p className='text-center'>{datas.email}</p>
                                <p className='text-center'>{datas.dob.date}</p>
                                <p className='text-center'>{datas.location.name} {datas.location.street.number} {datas.location.state} {datas.location.country} {datas.location.city} {datas.location.postcode}</p>
                            </div>
                            </Col>
                        )
                    })}
                    
                </Row>
            </Container>
        </>
    )
}

export default Search