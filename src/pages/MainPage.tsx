import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import CustomFilter from './../components/CustomFilter/index';
import { fetchCars } from '../utils';
import { CarType } from '../types';
import Card from '../components/Card';
import { useSearchParams } from 'react-router-dom';
import { fuels, years } from './../constants/index';
import ShowMore from '../components/ShowMore';

const MainPage = () => {
  const [cars, setCars] = useState<CarType[]>([]);

  const [params] = useSearchParams();

  useEffect(() => {
    const paramsObj = Object.fromEntries(params.entries());
    fetchCars(paramsObj).then((res: CarType[]) => setCars(res));
  }, [params]);

  return (
    <div>
      <div
        id="catalogue"
        className="padding-x padding-y max-width"
      >
        <div className="home__text-container mt-20">
          <h1 className="text-4xl font-extrabold">Car Catalog</h1>
          <p>Discover cars you might like !</p>
        </div>
        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="Fuel Type" options={fuels} />
            <CustomFilter title="Year of production" options={years} />
          </div>
        </div>

        {!cars || cars.length < 1 ? (
          <div className="home__error-container">
            <h2>Sorry , No Results Found</h2>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {cars.map((car, i) => (
                <Card key={i} car={car} />
              ))}
            </div>
            <ShowMore />
          </section>
        )}
      </div>
    </div>
  );
};

export default MainPage;
