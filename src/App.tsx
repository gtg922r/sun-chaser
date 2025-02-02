import React, { useState, useEffect } from 'react';
import './App.css';
import LeafletMap from './components/LeafletMap';
import { LatLng, latLng } from 'leaflet';
import Compass from './components/Compass';
import SunCalc from 'suncalc';
import { FaGithub, FaRunning, FaSun } from 'react-icons/fa';

function App() {
  const defaultPosition: LatLng = latLng(37.3688, -122.0363);
  const [markerPosition, setMarkerPosition] = useState<LatLng>(defaultPosition);
  const [selectedDate, setSelectedDate] = useState<string>('2024-06-28');
  const [selectedCompass, setSelectedCompass] = useState<number>(90);
  const [cityName, setCityName] = useState<string>('Loading...');
  const [shadowFlipTime, setShadowFlipTime] = useState<string>('1:08pm');

  const calculateShadowFlipTime = (coords: LatLng, facingHeading: number, date: string): string => {
    const shadowHeading = (facingHeading + 90) % 360;
    const dateObj = new Date(date);
    const times = SunCalc.getTimes(dateObj, coords.lat, coords.lng);
    
    const sunPositionAtHeading = (date: Date, lat: number, lng: number) => {
      const sunPos = SunCalc.getPosition(date, lat, lng);
      const sunAzimuth = (sunPos.azimuth * 180 / Math.PI + 360) % 360; // Convert from radians to degrees
      return sunAzimuth;
    };

    const findShadowFlipTime = (coords: LatLng, heading: number, date: Date) => {
      let flipTime = null;
      for (let hour = times.sunrise.getHours(); hour <= times.sunset.getHours(); hour++) {
        for (let minute = 0; minute < 60; minute++) {
          const testDate = new Date(date);
          testDate.setHours(hour, minute);
          const sunAzimuth = sunPositionAtHeading(testDate, coords.lat, coords.lng);
          if (Math.abs(sunAzimuth - heading) < 1 || Math.abs(sunAzimuth - (heading + 180) % 360) < 1) {
            flipTime = testDate;
            break;
          }
        }
        if (flipTime) break;
      }
      return flipTime;
    };

    const flipTime = findShadowFlipTime(coords, shadowHeading, dateObj);
    if (!flipTime) {
      return 'No shadow flip time found';
    }

    return flipTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const fetchCityName = async () => {
      setCityName('Loading...');
      const name = await getCityName(markerPosition);
      setCityName(name);
      // setCityName("Sunnyvale")
    };
    fetchCityName();
  }, [markerPosition]);

  useEffect(() => {
    const flipTime = calculateShadowFlipTime(markerPosition, selectedCompass, selectedDate);
    setShadowFlipTime(flipTime);
  }, [markerPosition, selectedCompass, selectedDate]);

  const handleMapClick = (coords: LatLng) => {
    setMarkerPosition(coords);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleCompassChange = (newAngle: number) => {
    setSelectedCompass(newAngle);
  };

  const getCityName = async (coords: LatLng): Promise<string> => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`);
    const data = await response.json();
    return data.address.city || data.address.town || data.address.village || 'Unknown location';
  };

  
  return (
    <div id="windowMain" className="flex flex-col items-center justify-center h-screen w-screen bg-base-100">
      <div className="w-4/5 min-w-[512px] max-w-[768px] font-light text-sm pl-1 text-gray-300 flex flex-row">
        <div className='flex-grow-0 flex flex-row items-center hover:text-gray-500'><FaSun className='' /><FaRunning className='mx-1' /><i>sun chaser</i></div>
        <div className='flex-grow'></div>
        <div className='flex-grow-0 flex flex-row items-center hover:text-gray-500'><a href="https://github.com/gtg922r/sun-chaser">github | RyanC</a><a href="https://github.com/gtg922r/sun-chaser"><FaGithub className='ml-2' /></a></div>
      </div>
      <div id="appMain" className="bg-base-200 w-4/5 h-5/6 min-w-[512px] min-h-[512px] max-w-[768px] max-h-[1024px] rounded-xl shadow-lg relative overflow-hidden">       
        <div id="overlayMain" className="w-full h-full grid grid-cols-[1fr_12rem] grid-rows-[12rem_max-content_1fr_max-content] absolute top-0 left-0 z-[1000] gap-6 p-6 pointer-events-none">
          <div id="compassPanel" className="bg-base-100 col-start-2 shadow-md pointer-events-auto rounded-full overflow-hidden p-4">
            <Compass angle={selectedCompass} onChange={handleCompassChange} />
          </div>
          <div id="datePickerPanel" className="bg-base-100 col-start-2 rounded-lg shadow-md pointer-events-auto p-2">
            <input 
              type="date" 
              id="datePicker" 
              name="trip-start" 
              className="w-full input text-lg" 
              value={selectedDate} 
              onChange={handleDateChange} 
            />
          </div>
          <div id="infoPanel" className="bg-base-100 p-4 col-span-2 col-start-1 row-start-4 shadow-md rounded-lg pointer-events-auto">
            <div id="infoPanelInput" className="text-sm flex flex-row">
              <div className="flex flex-col w-1/3 justify-center p-2 items-center">
                {/* <div className="text-sm text-gray-500">Location</div> */}
                {/* <div className="text-2xl font-bold">{cityName}</div> */}
                {/* <input type="text" className="input input-lg text-3xl font-bold" value={cityName} readOnly /> */}
                <div className="text-3xl font-bold">{cityName}</div>
              </div>
              <div className="flex flex-col w-1/3 justify-center p-2 items-center">
                {/* <div className="text-sm text-gray-500">Location</div> */}
                {/* <div className="text-2xl font-bold">{cityName}</div> */}
                {/* <input type="text" className="input input-lg text-3xl font-bold" value={cityName} readOnly /> */}
                <div className="text-3xl font-bold">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric'})}</div>
              </div>              
              <div className="stat w-1/3 place-items-center">
                <div className="stat-title">Shadow Flip</div>
                <div className="stat-value text-primary text-3xl">{shadowFlipTime}</div>
                <div className="stat-desc">When facing {selectedCompass.toFixed(0)}°</div>
              </div>                              
            </div>
          </div>
        </div>        
        <LeafletMap markerPosition={markerPosition} onMapClick={handleMapClick} />
      </div>
    </div>
  )
}

export default App
