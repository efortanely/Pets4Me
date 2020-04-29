import React from 'react';
import { Shelter, Address } from '../../models/Shelter';
import { isNullOrUndefined } from 'util';

type MapMediaProps = {
    shelter: Shelter,
}

const getApiShelterAddress = (address: Address) => {
    if(isNullOrUndefined(address)) {
        return ""
    }
      
    return `${address.address1 + " " || ""}${address.city + " " || ""}${address.state + " " || ""}${address.postcode || ""}`
}

export const MapMedia = ({ shelter }: MapMediaProps) => <iframe 
    className = "mapMedia"
    title="Shelter Map"
    frameBorder={0}
    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAcxUQ8b7HOIKB6WvrBp_vsmIwlyKju8SA
    &q=${getApiShelterAddress(shelter.address)}`}>
</iframe>