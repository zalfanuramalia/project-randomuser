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
    const dispatch = useDispatch()    

    useEffect(()=>{
        dispatch(getUser)
    }, [dispatch])

    
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