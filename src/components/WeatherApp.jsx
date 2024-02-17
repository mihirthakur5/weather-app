import { useState, useEffect } from 'react';
import "./WeatherApp.css";
import axios from 'axios';
import { Box, Container, AppBar, Typography, TextField, Card, CardContent, Toolbar, CircularProgress } from '@mui/material'

function WeatherApp() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.trim() !== '') {
      fetchWeatherData();
    }
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=9d4e927b56094ec2bed71934243101&q=${location}&aqi=no`
      );
      setWeatherData({
        image: response.data.current.condition.icon,
        location: response.data.location.name,
        locationCountry: response.data.location.country,
        temperatureC: response.data.current.temp_c,
        temperatureF: response.data.current.temp_f,
        condition: response.data.current.condition.text,
        windSpeed: response.data.current.wind_mph,
        humidity: response.data.current.humidity,
        cloudCoverage: response.data.current.cloud,
        lastUpdated: response.data.current.last_updated,
      });
      setError(null);
    } catch (err) {
      setError('No matching location found');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <AppBar className='header' position="static">
          <Toolbar>
            <Typography variant='h6'>Weather App</Typography>
          </Toolbar>
        </AppBar>
        <Box className='textInput' style={{ marginTop: "20px" }}>
          <TextField
            label="Enter location"
            variant='outlined'
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Box>
        {loading && <CircularProgress style={{ margin: '20px' }} />}
        {error && (
          
            <Typography align='center' sx={{color:"red", m:2}} variant='h3'>{error}</Typography>
          
        )}
        {weatherData && (
          <div style={{ margin: "20px" }}>
            <Typography textAlign="center" variant='h3'>{`${weatherData.location}, ${weatherData.locationCountry}`}</Typography>
          </div>
        )}
        {weatherData && (
          <Card className='card-content'>
            <CardContent>
                <img src={weatherData.image} />
              <Typography className='cardText' variant='h6'>
                <Typography variant='h6'>Temperature</Typography>{`${weatherData.temperatureC}°C/${weatherData.temperatureF}°F`}
              </Typography>
              <Typography className='cardText' variant='h6'>
                <Typography variant='h6'>Condition</Typography>{weatherData.condition}
              </Typography>
              <Typography className='cardText' variant='h6'>
                <Typography variant='h6'>Wind Speed</Typography> {weatherData.windSpeed} km/h
              </Typography>
              <Typography className='cardText' variant='h6'>
                <Typography variant='h6'>Humidity </Typography>{weatherData.humidity}%
              </Typography>
              <Typography className='cardText' variant='h6'>
                <Typography variant='h6'>Cloud Coverage</Typography>{weatherData.cloudCoverage}%
              </Typography>
              <Typography className='cardText' variant='h6'>
                <Typography variant='h6'>Last Updated</Typography>{weatherData.lastUpdated}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  )
}

export default WeatherApp;
