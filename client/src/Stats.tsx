import { Global, css } from '@emotion/react';
import React, { useEffect, useState } from 'react'
import CountryList from './CovComponents/CountryList';
import GlobalInfo from './CovComponents/GlobalInfo'
import type { ResponseData } from './types';



const Stats: React.FunctionComponent = () => {

const [data, setData] = useState<ResponseData | undefined>(undefined);    


const fetchData = async () => {
   const result = await fetch('https://api.covid19api.com/summary');
   const data: ResponseData = await result.json();

   setData(data);
   console.log(data);
};

    useEffect(() =>{
        fetchData();
    }, [])

    return (
      <div>
          <Global styles={css`
            body{
                background-color: #f1f1f1;
                color: #7d7d7d;
            }
        `} 
        />
        {data ? 
        <>
        <GlobalInfo 
        newConfirmed={data?.Global.NewConfirmed} 
        newDeaths={data?.Global.NewDeaths} 
        newRecovered={data?.Global.NewRecovered}/>
        
        <CountryList countries={data.Countries}/>
        </>
        : "Loading..."}
      </div>
    );
  }
  
  export default Stats;