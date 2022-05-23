import React, { useState, useEffect } from 'react'
import API from '../api'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Container, Row, Col } from 'react-bootstrap'
import Back from '../img/back.png'
import styled from 'styled-components'

function Weather() {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${API}&q=London&aqi=no`).then(res => {
            setWeather(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    //DOM Events
    const [input, setInput] = useState("")
    const searchInput = (e) => {
        setInput(e.target.value)
    }

    const searchWeather = () => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${API}&q=${input}`).then(res => {
            setWeather(res.data)
        })
    }
    return (
        <div>
            <Main>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Card className="bg-dark" style={{ width: '18rem' }}>
                                <Card.Img src={Back} alt="Card image" className='back' />
                                <Card.ImgOverlay>
                                    <Card.Title>{weather.location.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{weather.location.country}</Card.Subtitle>
                                    <Card.Text>
                                        <img src={weather.current.condition.icon} alt="" />
                                        <span>{weather.current.condition.text}</span>
                                        <h6>{weather.current.temp_c} Temp_C</h6>
                                        <h6>{weather.current.temp_f} Temp_F</h6>
                                        <i>Local_Time {weather.location.localtime}</i><br />
                                    </Card.Text><br />
                                    <input type="text" onChange={searchInput} placeholder="City or Country name" />
                                    <button onClick={searchWeather}>Find</button>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Main>
        </div>
    )
}

const Main = styled.div`
margin: 5rem 0 0 0;
        .back{
            height: 20rem;
        }

      .bg-dark{
          border:none;
      }

      h6, i{
          color:white;
      }
button{
    margin: 0 0 0 0.5rem;
    border:none;
    border-radius: 5px;
    background: white;
    transition: 0.5s;
    &:hover{
        background: #E1A4E7;
        transition: 0.5s;
    }
}

input {
  border-radius: 5px;
  border:none;

  &:focus{
      outline:none;
  }
}

`
export default Weather