import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../redux/actions/user'
import Head from 'next/head'
import http from '../helpers/http'
import {FaSearch} from 'react-icons/fa'
import Link from 'next/link'

const User = () => {
    const {user} = useSelector(state=>state)
    const [users, setUsers] = useState([])
    const [page, setPage] = useState({})
    const dispatch = useDispatch()    

    const getUserSearch = async (url) => {
        const { data } = await http().get(url)
        setUsers(data?.results)
        // setPage(data?.pageInfo)
    }

    useEffect(() => {
        getUserSearch(`/api/?results=50`)
    }, [])

    useEffect(()=>{
        dispatch(getUser)
    }, [dispatch])

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
        <title>Users</title>
        <meta name="description" content="Next Coffee for You" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Link href="search">
            <button className="btn " type="submit" id="button-addon2"><FaSearch /></button>
        </Link>
        <Container>
            <Row>
                {user.data?.map((datas, idx)=>{
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

export default User