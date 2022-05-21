import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import http from '../helpers/http'
import {FaSearch} from 'react-icons/fa'
import UsersList from '../components/UsersList'
import Button from '../components/Button'

const Search = () => {  
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const response = await http().get(
          `/api/?page=${page}&results=6`
        );

        setUsers((users) => [...users, ...response.data.results]);
        setErrorMsg('');
      } catch (error) {
        setErrorMsg('Error while loading data. Try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [page]);

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
          setPage(data.info)
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

  const loadMore = () => {
    setPage((page) => page + 1);
  };

    const onSearch = async (event) => {
      event.preventDefault();
      const url = () => `/api/?results=5&page=${search}`
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
      <div className='mt-5 mx-3'>
        <form id='search' name='serach' onSubmit={onSearch} className="border-brown input-group mb-3 rounded mx-auto button-type-name ">
            <input name="search" type="text" className="btn-search-type form-control bg-transparent col-12 col-lg-3"
                placeholder="Search Name" />
            <button className="btn " type="submit" id="button-addon2"><FaSearch /></button>
        </form>
      </div>
      <div className="main-section">
        <UsersList users={users} />
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <div className="load-more text-center my-5">
          <Button onClick={loadMore}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Search