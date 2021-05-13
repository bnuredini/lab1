import React, { useEffect, useState } from "react";
import { Button, Item, ItemMeta, Label, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Country } from "../../app/models/country";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Countries.list().then((response) => {
      let countries: Country[] = [];
      response.forEach((country) => {
        // test.date = test.date.split("T")[0];
        countries.push(country);
      });
      setCountries(countries);
      setLoading(false);
    });
  }, []);

  return (
    <Segment>
      <Item.Group divided>
        {countries.map((country) => (
          <Item key={country.id}>
            <Item.Content>
              <Item.Header as="a">{country.name}</Item.Header>
              {/* <Item.Meta>{country.deaths}</Item.Meta> */}
              <Item.Description>
                <div>Infections: {country.infections}</div>
                <div>Deaths: {country.deaths}</div>
                <div>Recoveries: {country.recoveries}</div>
                <div>Vaccinated: {country.vaccinated}</div>
              </Item.Description>
              <Item.Extra>
                {/* <Button floated="right" content="View" color="blue" />
                <Button floated="right" content="Delete" color="red" /> */}
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
