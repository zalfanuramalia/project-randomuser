import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const User = ({ name, email, dob, location, picture }) => {
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <div className='text-center '>
                    <Image width={200} height={200} src={picture.medium} alt={name.first} />
                </div>
                <div className="user-details mx-2">
                    <div>
                        <strong>Name:</strong> {name.first} {name.last}
                    </div>
                    <div>
                        <strong>Email:</strong> {email}
                    </div>
                    <div>
                        <strong>Date of Birth:</strong> {dob.date}
                    </div>     
                    <div>
                        <strong>Country:</strong> {location.street.number} {location.state} {location.country} {location.city} {location.postcode}
                    </div>                            
                </div>
            </div>
        </>
    );
};

const UsersList = ({ users }) => {
    return (
        <Row className="user-list">
            {users && users?.map((user) => 
                <Col key={user.login.uuid} >
                    <User {...user} />
                </Col>
            )}
        </Row>
    );
};

export default UsersList